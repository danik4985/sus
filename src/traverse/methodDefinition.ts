import { cfg } from '../config/cfg'
import { comment } from '../obfuscate/comment'
import { obfuscateName } from '../obfuscate/obfuscateName'
import { stringObf } from '../obfuscate/stringObf'
import { assignmentExpression } from './assignmentExpression'
import { rightExpression } from './rightExpression'
import { traverse } from './traverse'

export function methodDefinition(expr: any) {
	var data = ''

	if (expr.async) {
		data += 'async '
		data += comment(2)
	}

	data += '[' + comment(2)

	if (expr.computed) {
		data += rightExpression(expr.key)
	} else {
		data += stringObf(expr.key.name, cfg().transforms.keyObfuscationLevel)
	}

	data += ']' + comment(3) + '('

	;(expr.value.params as any[]).forEach((i) => {
		if (i.type === 'Identifier') {
			var pname: string = i.name
			if (cfg().transforms.obfuscateNames) pname = obfuscateName(pname)
			data += pname + comment(3) + ',' + comment(3)
		} else if (i.type === 'AssignmentExpression') {
			data += assignmentExpression(i) + comment(3) + ',' + comment(3)
		}
	})

	data += '){'
	data += traverse(expr.value.body.body)
	data += '}'

	return data
}