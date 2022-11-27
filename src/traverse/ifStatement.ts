import { comment } from '../obfuscate/comment'
import { postElseExpr } from './postElseExpr'
import { rightExpression } from './rightExpression'
import { traverse } from './traverse'

export function ifStatement(expr: any) {
	var data = 'if'

	data += comment(2) + '('
	data += rightExpression(expr.test)
	data += ')' + comment(2)

	// console.log(expr, data)
	// console.log(expr)

	if (expr.consequent.type === 'BlockStatement') {
		data += '{' + traverse(expr.consequent.body) + ';}'
	} else {
		data += '{' + postElseExpr(expr.consequent) + ';}'
	}

	if (expr.alternate) {
		data += ' else '

		if (expr.alternate.type === 'BlockStatement') {
			data += '{' + traverse(expr.alternate.body) + ';}'
		} else {
			data += '{' + postElseExpr(expr.alternate) + ';}'
		}
	}

	return data
}