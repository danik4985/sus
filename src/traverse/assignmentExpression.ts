import { comment } from '../obfuscate/comment'
import { leftExpression } from './leftExpression'
import { rightExpression } from './rightExpression'

export function assignmentExpression(expr: any, data = '') {
	const { left, right, operator } = expr

	// console.log(left, right, operator)

	data += comment(2)
	data += leftExpression(left)
	data += comment(3) + operator + comment(3)
	data += rightExpression(right)

	return data
}