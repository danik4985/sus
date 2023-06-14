import { rightExpression } from './rightExpression'

export function chainExpression(expr: any) {
	// console.log(expr)

	// uhh im pretty sure that basically all the optionals are wrapped in this, but the optional attr
	// is still set, so returning rightExpression(expr.expression) and then each function handling
	// its optionality on its own is ideal

	return rightExpression(expr.expression)
}