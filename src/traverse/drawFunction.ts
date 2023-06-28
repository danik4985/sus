import { cfg } from '../config/cfg'
import { parseAndPushOV, shiftOV } from '../config/configOverride'
import { warn } from '../log/warn'
import { comment } from '../obfuscate/comment'
import { obfuscateName } from '../obfuscate/obfuscateName'
import { joinComments } from '../util/joinComments'
import { arrayPattern } from './arrayPattern'
import { assignmentExpression } from './assignmentExpression'
import { objectPattern } from './objectPattern'
import { traverse } from './traverse'

export function drawFunction(fnblock: any, data = '') {
	if (fnblock.async) {
		data += 'async'
		data += ' '
		data += comment(1)
	}

	data += 'function '
	data += comment(1)
	
	var name: string = fnblock.id.name
	if (cfg().transforms.obfuscateNames) name = obfuscateName(name)

	data += name
	data += comment(2)
	data += '('

	;(fnblock.params as any[]).forEach((i, n) => {
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
		} else warn(`Unknown expression type in methodDefinition(e) => e.params[${n}] : ${i.type}`)
	})

	const hasConfig = parseAndPushOV(joinComments(fnblock))

	data += ')' + comment(2) + '{'
	data += traverse(fnblock.body.body)
	data += comment(3) + '}' + comment(1)

	if (hasConfig) shiftOV()

	return data
}