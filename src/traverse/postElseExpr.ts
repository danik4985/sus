import { doWhileStatement } from './doWhileStatement'
import { expressionStatement } from './expressionStatement'
import { fancyForStatement } from './fancyForStatement'
import { forStatement } from './forStatement'
import { ifStatement } from './ifStatement'
import { returnStatement } from './returnStatement'
import { rightExpression } from './rightExpression'
import { variableDeclaration } from './variableDeclaration'
import { whileStatement } from './whileStatement'

export function postElseExpr(expr: any) {
	if (expr.type === 'ExpressionStatement') {
		return expressionStatement(expr) + ';'
	} else if (expr.type === 'VariableDeclaration') {
		return variableDeclaration(expr) + ';'
	} else if (expr.type === 'ReturnStatement') {
		return returnStatement(expr) + ';'
	} else if (expr.type === 'IfStatement') {
		return ifStatement(expr) + ';'
	} else if (expr.type === 'WhileStatement') {
		return whileStatement(expr) + ';'
	} else if (expr.type === 'DoWhileStatement') {
		return doWhileStatement(expr) + ';'
	} else if (expr.type === 'ForStatement') {
		return forStatement(expr) + ';'
	} else if (expr.type === 'ForInStatement' || expr.type === 'ForOfStatement') {
		return fancyForStatement(expr) + ';'
	}
	// last resort:
	return rightExpression(expr)
}