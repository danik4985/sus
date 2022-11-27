import { comment } from '../obfuscate/comment'
import { rightExpression } from './rightExpression'

export function updateExpression({ operator, prefix, argument }) {
	if (prefix) {
		return operator + comment(1) + rightExpression(argument)
	} else {
		return rightExpression(argument) + comment(1) + operator
	}
}