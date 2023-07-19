import { cfg } from '../config/cfg'
import { warn } from '../log/warn'
import { comment } from '../obfuscate/comment'
import { numberObf } from '../obfuscate/numberObf'
import { numberObfLvl1 } from '../obfuscate/numberObfLvl1'
import { obfuscateName } from '../obfuscate/obfuscateName'
import { Randomizer } from '../random/Randomizer'
import { shuffleArray } from '../util/suffleArray'
import { rightExpression } from './rightExpression'
import { traverse } from './traverse'

export function obfuscateFlow(ast: any[]) {
	// console.log('Obfuscating flow', new Error().stack)
	warn('Flow obfuscation is currently experimental')

	// First, we need to flatten the tree
	// Currently we have something like
	//      - Instruction
	//      - Instruction
	//      - If statement
	//        -> if subinstruction
	//        -> if subinstruction
	//      - Instruction
	//      - While statement
	//        -> while subinstruction
	//        -> while subinstruction
	//        -> while subinstruction
	//      - Instruction
	// And we need something like
	//      - Instruction
	//      - Instruction
	//      - If not (condition) go to Label1
	//      - if subinstruction
	//      - if subinstruction
	//   [Label1]
	//      - Instruction
	//   [Label2]
	//      - If not (condition) go to Label3
	//      - while subinstruction
	//      - while subinstruction
	//      - while subinstruction
	//      - go to Label2
	//   [Label3]
	//      - Instruction
	// We however need to put the labels into a separate map { [label]: instruction# }
	//  because then all the instructions will be put into one switch, each having its
	//  own branch
	// We however do need to represent the *go to* instruction as a statement, so
	//  we hereby introduce JumpStatement { label: string, condition: Node, negate: boolean }
	// Labels are strings and not numbers because we will have to recurse a lot and this
	//  should hopefully make it easier for us

	const flattened: any[] = []
	const labels: { [id: string]: number } = {}
	const declareVars = new Map<string, boolean>() // <name, let>

	function traverseBranch(tree: any[], order: number, suffix = '', startLabel?: string, endLabel?: string) {
		// FIXME: implement break and continue statements
		tree.forEach((i, n) => {
			if (i.type === 'IfStatement') {
				// if stetement
				const label = `if.${order}.${n}.${suffix}`

				flattened.push({ type: 'JumpStatement', condition: i.test, label, negate: true })

				if (i.consequent.type === 'BlockStatement') traverseBranch(i.consequent.body, order+1, 'IF')
				else traverseBranch([ i.consequent ], order+1, 'IF')

				labels[label] = flattened.length

				if (i.alternate) {
					const label2 = `if.${order}.${n}.${suffix}.end`
					labels[label] = flattened.length
					flattened.push({ type: 'JumpStatement', label: label2 })
					if (i.alternate.type === 'BlockStatement') traverseBranch(i.alternate.body, order+1, 'ELSE')
					else traverseBranch([ i.alternate ], order+1, 'ELSE')
					labels[label2] = flattened.length
				}
				// if statement end
			} else if (i.type === 'WhileStatement') {
				// while statement
				const startLabel = `while.${order}.${n}.${suffix}.start`
				const endLabel = `while.${order}.${n}.${suffix}.end`

				labels[startLabel] = flattened.length

				flattened.push({ type: 'JumpStatement', condition: i.test, label: endLabel, negate: true })

				if (i.body.type === 'BlockStatement') traverseBranch(i.body.body, order+1, 'WHILE', startLabel, endLabel)
				else traverseBranch([ i.body ], order+1, 'WHILE', startLabel, endLabel)

				flattened.push({ type: 'JumpStatement', label: startLabel })

				labels[endLabel] = flattened.length
				// while statement end
			} else if (i.type === 'DoWhileStatement') {
				// do while statement
				const label = `dowhile.${order}.${n}.${suffix}`
				const endlabel = `dowhile.${order}.${n}.${suffix}.end`
				
				labels[label] = flattened.length

				if (i.body.type === 'BlockStatement') traverseBranch(i.body.body, order+1, 'DOWHILE', label, endlabel)
				else traverseBranch([ i.body ], order+1, 'DOWHILE', label, endlabel)

				flattened.push({ type: 'JumpStatement', label, condition: i.test, negate: false })

				labels[endlabel] = flattened.length
				// do while statement end
			} else if (i.type === 'ForStatement') {
				// for statement
				if (i.init) {
					if (i.init.type === 'VariableDeclaration') traverseBranch([ i.init ], order+1, 'FORINIT')
					else flattened.push({ type: 'ExpressionStatement', expression: i.init })
				}

				const startLabel = `for.${order}.${n}.${suffix}.start`
				const endLabel = `for.${order}.${n}.${suffix}.end`

				labels[startLabel] = flattened.length

				flattened.push({ type: 'JumpStatement', condition: i.test, label: endLabel, negate: true })

				if (i.body.type === 'BlockStatement') traverseBranch(i.body.body, order+1, 'FOR', startLabel, endLabel)
				else traverseBranch([ i.body ], order+1, 'FOR', startLabel, endLabel)

				if (i.update) flattened.push({ type: 'ExpressionStatement', expression: i.update })
				flattened.push({ type: 'JumpStatement', label: startLabel })

				labels[endLabel] = flattened.length
				// for statement end
			} else if (i.type === 'ForInStatement' || i.type === 'ForOfStatement') {
				// for in/of statement
				const kvn = `_kv_${n}x${order}x${suffix}`
				const ivn = `_iv_${n}x${order}x${suffix}`

				// const ${kvn} = Object.keys(${i.right})
				flattened.push({
					type: 'VariableDeclaration',
					declarations: [
						{
							type: 'VariableDeclarator',
							id: { type: 'Identifier', name: kvn },
							init: {
								type: 'CallExpression',
								callee: {
									type: 'MemberExpression',
									object: { type: 'Identifier', name: 'Object' },
									property: { type: 'Identifier', name: (i.type === 'ForInStatement') ? 'keys' : 'values' }
								},
								arguments: [ i.right ]
							}
						}
					],
					kind: 'const'
				})

				// let ${ivn} = 0
				flattened.push({
					type: 'VariableDeclaration',
					declarations: [
						{
							type: 'VariableDeclarator',
							id: { type: 'Identifier', name: ivn },
							init: { type: 'Literal', value: 0, raw: '0' }
						}
					],
					kind: 'let'
				})

				const startLabel = `forio.${order}.${n}.${suffix}.start`
				const endLabel = `forio.${order}.${n}.${suffix}.end`

				labels[startLabel] = flattened.length

				flattened.push({
					type: 'JumpStatement',
					condition: {
						type: 'BinaryExpression',
						left: { type: 'Identifier', name: ivn },
						operator: '<',
						right: {
							type: 'MemberExpression',
							object: { type: 'Identifier', name: kvn },
							property: { type: 'Identifier', value: 'length' }
						}
					},
					label: endLabel,
					negate: true
				})

				if (i.left.type === 'VariableDeclaration') {
					//data += variableDeclaration(expr.left)
					i.left.declarations[0].init = {
						type: 'MemberExpression',
						object: { type: 'Identifier', name: kvn },
						property: { type: 'Identifier', name: ivn },
						computed: true
					}
					flattened.push(i.left)
				} else if (i.left.type === 'Identifier') {
					//if (cfg().transforms.obfuscateNames) data += obfuscateName(expr.left.name)
					//else data += i.left.name
					flattened.push({
						type: 'ExpressionStatement',
						expression: {
							type: 'AssignmentExpression',
							operator: '=',
							left: i.left,
							right: {
								type: 'MemberExpression',
								object: { type: 'Identifier', name: kvn },
								property: { type: 'Identifier', name: ivn },
								computed: true
							}
						}
					})
				} else {
					warn(`Unsupported expression type in obfuscateFlow(ast) => traverseBranch(tree) => tree[${n}].left : ${i.left.type}`)
				}

				if (i.body.type === 'BlockStatement') traverseBranch(i.body.body, order+1, 'FORIO', startLabel, endLabel)
				else traverseBranch([ i.body ], order+1, 'FORIO', startLabel, endLabel)

				// ${ivn}++
				flattened.push({
					type: 'UpdateExpression',
					operator: '++',
					prefix: false,
					argument: { type: 'Identifier', name: ivn }
				})
				flattened.push({ type: 'JumpStatement', label: startLabel })

				labels[endLabel] = flattened.length

				// for in/of statement end
			} else if (i.type === 'SwitchStatement') {
				console.log('switch') // TODO: switch statement
			} else if (i.type === 'LabeledStatement') {
				// seriously fuck off
				warn(`Labeled statements are currently unsupported in flow obfuscation [${n}]`)
			} else if (i.type === 'ClassDeclaration') {
				// fuck off
				warn(`Class declarations are currently unsupported in flow obfuscation [${n}]`)
			} else if (i.type === 'FunctionDeclaration') {
				// really just fuck off
				warn(`Function declarations are currently unsupported in flow obfuscation [${n}]`)
			} else if (i.type === 'BreakStatement') {
				flattened.push({ type: 'JumpStatement', label: endLabel })
			} else if (i.type === 'ContinueStatement') {
				flattened.push({ type: 'JumpStatement', label: startLabel })
			} else if (i.type === 'VariableDeclaration') {
				(i.declarations as any[]).forEach((j) => {
					if (declareVars.has(j.id.name)) warn(`Redeclaration of variable ${j.id.name} - skipping!`)
					else declareVars.set(j.id.name, i.kind !== 'var')

					if (j.init) flattened.push({
						type: 'ExpressionStatement',
						expression: {
							type: 'AssignmentExpression',
							operator: '=',
							left: j.id,
							right: j.init
						}
					})
				})
			} else flattened.push(i) // its a normal statement with no children (hopefully)
		})
	}

	traverseBranch(ast, 0)

	//console.log(flattened)
	//console.log(labels)

	// Now we need to declare all the variables
	var data = ''

	const vdkv = [...declareVars.entries()]
	const letvars = vdkv.filter(([_, t]) => t).map(([v]) => v)
	const normalvars = vdkv.filter(([_, t]) => !t).map(([v]) => v)

	if (normalvars.length) {
		data += 'var ' + comment(1)
		normalvars.forEach((j, o) => {
			if (cfg().transforms.obfuscateNames) j = obfuscateName(j)
			data += j + comment(3)
			if (normalvars[o+1]) data += ','
		})
		data += comment(2) + ';'
	}

	if (letvars.length) {
		data += 'let ' + comment(1)
		letvars.forEach((j, o) => {
			if (cfg().transforms.obfuscateNames) j = obfuscateName(j)
			data += j + comment(3)
			if (letvars[o+1]) data += ','
		})
		data += comment(2) + ';'
	}

	// Now now need a list of random unique values (len=flattened.length+1)
	const set = new Set<number>()
	while (set.size < (flattened.length + 1)) set.add(Randomizer.INSTANCE.rand(Number.MIN_SAFE_INTEGER, Number.MAX_SAFE_INTEGER))
	const numbers = [...set.values()]

	// Now we need to form the switch statement

	const iteratorName = obfuscateName('flow obf ' + Date.now() + flattened.length)
	const randmod = Randomizer.INSTANCE.rand(10, 800)

	// var ${iteratorName} = ${numbers[0] + randmod};
	data += 'var ' + iteratorName + comment(2) + '=' + comment(2) + numberObfLvl1(numbers[0] + randmod) + ';'
	// while (${iteratorName} !== ${numbers[-1]}) {
	data += 'while' + comment(1) + '((' + comment(3) + numberObfLvl1(numbers[numbers.length - 1])
	data += comment(3) + ')!==' + comment(1) + iteratorName
	data += '){' + comment(3)
	// ${iteratorName} = ${iteratorName} - ${randMod};
	data += iteratorName + comment(3) + '=' + iteratorName + comment(3) + '-' + comment(1) + numberObfLvl1(randmod) + ';'
	// switch (${iteratorName}) {
	data += 'switch' + comment(1) + '(' + comment(3) + iteratorName + '){' + comment(2)

	// shuffle flattened but keep n
	const shuffled: [ any, number ][] = shuffleArray(flattened.map((i, n) => [ i, n ]))

	shuffled.forEach(([ i, n ]) => {
		const thisInstNum = numbers[n]
		const nextInstNum = numbers[n+1]

		data += 'case ' + comment(3) + numberObfLvl1(thisInstNum) + ':'

		if (i.type === 'JumpStatement') {
			const a = iteratorName + comment(3) + '=' + comment(1) + numberObfLvl1(randmod + numbers[labels[i.label]]) + ';'
			const b = comment(1) + iteratorName + comment(3) + '=' + comment(1) + numberObfLvl1(nextInstNum + randmod) + ';'

			if (i.condition) {
				data += 'if' + comment(3) + '('
				data += rightExpression(i.condition)
				data += ')' + comment(2) + '{'	
			}

			// a:
			//data += iteratorName + comment(3) + '=' + comment(1)
			//data += numberObfLvl1(randmod + numbers[labels[i.label]]) + ';'
			if (i.negate) data += b
			else data += a

			if (i.condition) {
				// b:
				//data += '}' + comment(3) + 'else' + comment(1) + '{'
				//data += iteratorName + comment(3) + '=' + comment(1) + numberObfLvl1(nextInstNum + randmod) + ';}'
				data += '}else{'
				if (i.negate) data += a
				else data += b
				data += '}'
			}
		} else {
			data += traverse([ i ], '', false)
			// ${iteratorName} = ${nextInstNum + randmod};
			data += iteratorName + comment(3) + '=' + comment(1) + numberObfLvl1(nextInstNum + randmod) + ';'
		}

		data += 'break;'
	})

	data += '}}'

	return data
}