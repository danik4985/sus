import { cfg } from '../config/cfg'
import { comment } from '../obfuscate/comment'
import { obfuscateName } from '../obfuscate/obfuscateName'
import { assignmentExpression } from './assignmentExpression'
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

	;(fnblock.params as any[]).forEach((i) => {
		if (i.type === 'Identifier') {
			var pname: string = i.name
			if (cfg().transforms.obfuscateNames) pname = obfuscateName(pname)
			data += pname + comment(3) + ',' + comment(3)
		} else if (i.type === 'AssignmentExpression') {
			data += assignmentExpression(i) + comment(3) + ',' + comment(3)
		}
	})

	data += ')' + comment(2) + '{'
	data += traverse(fnblock.body.body)
	data += comment(3) + '}' + comment(1)

	return data
}