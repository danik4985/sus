import { cfg } from '../config/cfg'
import { warn } from '../log/warn'
import { obfuscateName } from '../obfuscate/obfuscateName'
import { memberExpression } from './memberExpression'

export function leftExpression(expr: any, warnMsg = true): string {
	// console.log(expr)

	if (expr.type === 'Identifier') {
		if (cfg().transforms.obfuscateNames) return obfuscateName(expr.name)
		return expr.name
	} else if (expr.type === 'MemberExpression') {
		return memberExpression(expr)
	} else if (expr.type === 'ThisExpression') {
		return 'this'
	} else if (warnMsg) warn(`Unknown expression type in leftExpression(e) : ${expr.type}`)

	return null
}