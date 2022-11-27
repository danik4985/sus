import { cfg } from '../config/cfg'
import { comment } from '../obfuscate/comment'
import { obfuscateName } from '../obfuscate/obfuscateName'
import { assignmentExpression } from './assignmentExpression'
import { rightExpression } from './rightExpression'
import { traverse } from './traverse'

export function anonFunction(expr: any, data = '') {
	if (expr.async) {
		data += 'async '
		data += comment(1)
	}

	data += 'function('

	;(expr.params as any[]).forEach((i) => {
		if (i.type === 'Identifier') {
			var pname: string = i.name
			if (cfg().transforms.obfuscateNames) pname = obfuscateName(pname)
			data += pname + comment(3) + ',' + comment(3)
		} else if (i.type === 'AssignmentExpression') {
			data += assignmentExpression(i) + comment(3) + ',' + comment(3)
		}
	})

	data += '){'

	if (expr.body.type === 'BlockStatement') {
		data += traverse(expr.body.body) + ';'
	} else {
		data += 'return ' + comment(2) + '(' + rightExpression(expr.body) + ');'
	}

	data += comment(3) + '}' + comment(1)

	return data
}