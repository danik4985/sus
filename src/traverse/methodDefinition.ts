import { cfg } from '../config/cfg'
import { parseAndPushOV, shiftOV } from '../config/configOverride'
import { warn } from '../log/warn'
import { comment } from '../obfuscate/comment'
import { obfuscateName } from '../obfuscate/obfuscateName'
import { stringObfLvl1 } from '../obfuscate/stringObfLvl1'
import { joinComments } from '../util/joinComments'
import { arrayPattern } from './arrayPattern'
import { assignmentExpression } from './assignmentExpression'
import { objectPattern } from './objectPattern'
import { rightExpression } from './rightExpression'
import { traverse } from './traverse'

export function methodDefinition(expr: any) {
	var data = ''

	if (expr.static) {
		data += 'static '
		data += comment(2)
	}

	if (expr.async) {
		data += 'async '
		data += comment(2)
	}

	if (expr.key.type === 'Identifier' && expr.key.name === 'constructor') {
		data += comment(2) + 'constructor' + comment(2) + '('
	} else {
		data += '[' + comment(2)

		if (expr.computed) {
			data += rightExpression(expr.key)
		} else if (expr.key.type === 'Identifier') {
			data += stringObfLvl1(expr.key.name) //stringObf(expr.key.name, cfg().transforms.keyObfuscationLevel)
		} else if (expr.key.type === 'Literal') {
			data += stringObfLvl1(expr.key.value)
		}
	
		data += ']' + comment(3) + '('
	}

	;(expr.value.params as any[]).forEach((i, n) => {
		if (i.type === 'Identifier') {
			var pname: string = i.name
			if (cfg().transforms.obfuscateNames) pname = obfuscateName(pname)
			data += pname + comment(3) + ',' + comment(3)
		} else if (i.type === 'AssignmentPattern') {
			data += assignmentExpression({ operator: '=', ...i }) + comment(3) + ',' + comment(3)
		} else if (i.type === 'ObjectPattern') {
			data += objectPattern(i) + comment(3) + ',' + comment(3)
		} else if (i.type === 'ArrayPattern') {
			data += arrayPattern(i) + comment(3) + ',' + comment(3)
		} else warn(`Unknown expression type in methodDefinition(e) => e.value.params[${n}] : ${i.type}`)
	})

	const hasConfig = parseAndPushOV(joinComments(expr))

	data += '){'
	data += traverse(expr.value.body.body)
	data += '}'

	if (hasConfig) shiftOV()

	return data
}