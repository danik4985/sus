import { comment } from '../obfuscate/comment'
import { rightExpression } from './rightExpression'

export function continueStatement(expr: any) {
	if (expr.label) {
		return comment(3) + 'continue ' + comment(2) + rightExpression(expr.label)
	} else return comment(3) + 'continue'
}