import { cfg } from '../config/cfg'
import { warn } from '../log/warn'
import { breakStatement } from './breakStatement'
import { continueStatement } from './continueStatement'
import { doWhileStatement } from './doWhileStatement'
import { drawClass } from './drawClass'
import { drawFunction } from './drawFunction'
import { expressionStatement } from './expressionStatement'
import { fancyForStatement } from './fancyForStatement'
import { forStatement } from './forStatement'
import { ifStatement } from './ifStatement'
import { labeledStatement } from './labeledStatement'
import { obfuscateFlow } from './obfuscateFlow'
import { returnStatement } from './returnStatement'
import { switchStatement } from './switchStatement'
import { tryStatement } from './tryStatement'
import { variableDeclaration } from './variableDeclaration'
import { whileStatement } from './whileStatement'

export function traverse(ast: any[], data = '', of?: boolean) {
	if (of ?? cfg().transforms.obfuscateFlow) return obfuscateFlow(ast)
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
		} else if (i.type === 'SwitchStatement') {
			data += switchStatement(i)
		} else if (i.type === 'BreakStatement') {
			data += breakStatement(i)
		} else if (i.type === 'ContinueStatement') {
			data += continueStatement(i)
		} else if (i.type === 'LabeledStatement') {
			data += labeledStatement(i)
		} else if (i.type === 'TryStatement') {
			data += tryStatement(i)
		} else warn(`Unknown expression type in traverse(ast) => ast[${n}] : ${i.type}`)

		data += shouldAddComma ? ',' : ';\n'
		shouldAddComma = false
	})

	return data
}