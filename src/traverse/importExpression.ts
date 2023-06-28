import { rightExpression } from './rightExpression'

export function importExpression(expr: any) {
	return `import(${rightExpression(expr.source)})`
}