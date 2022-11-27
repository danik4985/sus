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
	ast.forEach((i) => {
		if (i.type === 'FunctionDeclaration') {
			data += drawFunction(i)
		} else if (i.type === 'ExpressionStatement') {
			data += expressionStatement(i) + ';\n'
		} else if (i.type === 'VariableDeclaration') {
			data += variableDeclaration(i) + ';\n'
		} else if (i.type === 'ReturnStatement') {
			data += returnStatement(i) + ';\n'
		} else if (i.type === 'IfStatement') {
			data += ifStatement(i) + ';\n'
		} else if (i.type === 'WhileStatement') {
			data += whileStatement(i) + ';\n'
		} else if (i.type === 'DoWhileStatement') {
			data += doWhileStatement(i) + ';\n'
		} else if (i.type === 'ForStatement') {
			data += forStatement(i) + ';\n'
		} else if (i.type === 'ForInStatement' || i.type === 'ForOfStatement') {
			data += fancyForStatement(i) + ';\n'
		} else if (i.type === 'ClassDeclaration') {
			data += drawClass(i) + ';\n'
		}
	})

	return data
}