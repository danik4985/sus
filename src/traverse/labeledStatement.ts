import { rightExpression } from './rightExpression'
import { traverse } from './traverse'

export function labeledStatement(expr: any) {
	var data = rightExpression(expr.label) + ':'

	data += traverse([ expr.body ])

	return data
}