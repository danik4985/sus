import { cfg } from '../config/cfg'
import { obfuscateName } from '../obfuscate/obfuscateName'
import { memberExpression } from './memberExpression'

export function leftExpression(expr: any): string {
	// console.log(expr)

	if (expr.type === 'Identifier') {
		if (cfg().transforms.obfuscateNames) return obfuscateName(expr.name)
		return expr.name
	} else if (expr.type === 'MemberExpression') {
		return memberExpression(expr)
	}

	return null
}