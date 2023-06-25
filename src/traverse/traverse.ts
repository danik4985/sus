import { doWhileStatement } from './doWhileStatement'
import { drawClass } from './drawClass'
import { drawFunction } from './drawFunction'
import { expressionStatement } from './expressionStatement'
import { fancyForStatement } from './fancyForStatement'
import { forStatement } from './forStatement'
import { ifStatement } from './ifStatement'
import { returnStatement } from './returnStatement'
import { variableDeclaration } from './variableDeclaration'
import { whileStatement } from './whileStatement'

export function traverse(ast: any[], data = '') {
	var shouldAddComma = false

	ast.forEach((i, n) => {
		if (i.type === 'FunctionDeclaration') {
			data += drawFunction(i)
		} else if (i.type === 'ExpressionStatement') {
			data += expressionStatement(i)
			shouldAddComma = ast[n + 1]?.type === 'ExpressionStatement'
		} else if (i.type === 'VariableDeclaration') {
			data += variableDeclaration(i)
		} else if (i.type === 'ReturnStatement') {
			data += returnStatement(i)
		} else if (i.type === 'IfStatement') {
			data += ifStatement(i)
		} else if (i.type === 'WhileStatement') {
			data += whileStatement(i)
		} else if (i.type === 'DoWhileStatement') {
			data += doWhileStatement(i)
		} else if (i.type === 'ForStatement') {
			data += forStatement(i)
		} else if (i.type === 'ForInStatement' || i.type === 'ForOfStatement') {
			data += fancyForStatement(i)
		} else if (i.type === 'ClassDeclaration') {
			data += drawClass(i)
		}

		data += shouldAddComma ? ',' : ';\n'
		shouldAddComma = false
	})

	return data
}