import { comment } from '../obfuscate/comment'
import { postElseExpr } from './postElseExpr'
import { rightExpression } from './rightExpression'
import { traverse } from './traverse'

function modIfStatement(expr: any) {
	var data = 'if'

	data += comment(2) + '('
	data += rightExpression(expr.test)
	data += ')' + comment(2)

	// console.log(expr, data)
	// console.log(expr)

	if (expr.consequent.type === 'BlockStatement') {
		data += '{' + comment(2) + traverse(expr.consequent.body) + ';}'
	} else {
		data += '{return ' + comment(2) + postElseExpr(expr.consequent) + ';}'
	}

	if (expr.alternate) {
		data += ' else ' + comment(1)

		if (expr.alternate.type === 'BlockStatement') {
			data += '{' + comment(2) + traverse(expr.alternate.body) + ';}'
		} else {
			data += '{return ' + comment(2) + postElseExpr(expr.alternate) + ';}'
		}
	}

	return data
}

export function conditionalExpression(expr: any) {
	var data = '(() => {'
	data += modIfStatement(expr)
	data += '})()'
	return data
}