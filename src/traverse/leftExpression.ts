import { cfg } from '../config/cfg'
import { warn } from '../log/warn'
import { obfuscateName } from '../obfuscate/obfuscateName'
import { arrayPattern } from './arrayPattern'
import { memberExpression } from './memberExpression'
import { objectPattern } from './objectPattern'

export const thisStack: string[] = []

export const getThis = () => thisStack[thisStack.length - 1] ?? 'this'

export function leftExpression(expr: any, warnMsg = true): string {
	if (!expr) {
		warn(`${expr} passed to leftExpression(e), stack trace follows:`)
		console.log((new Error()).stack)
	}

	if (expr.type === 'Identifier') {
		if (cfg().transforms.obfuscateNames) return obfuscateName(expr.name)
		return expr.name
	} else if (expr.type === 'MemberExpression') {
		return memberExpression(expr)
	} else if (expr.type === 'ThisExpression') {
		return getThis()
	} else if (expr.type === 'ObjectPattern') {
		return objectPattern(expr)
	} else if (expr.type === 'ArrayPattern') {
		return arrayPattern(expr)
	} else if (warnMsg) warn(`Unknown expression type in leftExpression(e) : ${expr.type}`)

	return null
}