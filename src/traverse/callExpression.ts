import { comment } from '../obfuscate/comment'
import { rightExpression } from './rightExpression'

export function callExpression(expr: any) {
	var data = '('

	data += comment(3)
	data += rightExpression(expr.callee)
	data += ')' + comment(2) // + '('

	if (expr.optional) data += '?.'
	
	data += '('

	// console.log(expr, data)
	
	;(expr.arguments as any[]).forEach((i) => {
		data += comment(3) + rightExpression(i) + comment(3) + ',' + comment(3)
	})

	data += ')'


	// console.log('   :', expr, rightExpression(expr.callee))

	return data
}