import { rightExpression } from './rightExpression'

export function binaryExpression({ left, right, operator }) {
	return `(${rightExpression(left)})${operator}(${rightExpression(right)})`
}