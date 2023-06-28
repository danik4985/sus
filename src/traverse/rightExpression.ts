import { cfg } from '../config/cfg'
import { warn } from '../log/warn'
import { obfuscateName } from '../obfuscate/obfuscateName'
import { anonFunction } from './anonFunction'
import { arrayExpression } from './arrayExpression'
import { assignmentExpression } from './assignmentExpression'
import { awaitExpression } from './awaitExpression'
import { binaryExpression } from './binaryExpression'
import { callExpression } from './callExpression'
import { chainExpression } from './chainExpression'
import { conditionalExpression } from './conditionalExpression'
import { importExpression } from './importExpression'
import { leftExpression } from './leftExpression'
import { literalExpression } from './literalExpression'
import { memberExpression } from './memberExpression'
import { newExpression } from './newExpression'
import { objectExpression } from './objectExpression'
import { sequenceExpression } from './sequenceExpression'
import { templateString } from './templateString'
import { unaryExpression } from './unaryExpression'
import { updateExpression } from './updateExpression'

export function rightExpression(expr: any) {
	const maybeLeft = leftExpression(expr, false)
	if (maybeLeft !== null) return maybeLeft

	if (expr.type === 'Literal') {
		return literalExpression(expr)
	} else if (expr.type === 'BinaryExpression' || expr.type === 'LogicalExpression') {
		return binaryExpression(expr)
	} else if (expr.type === 'Identifier') {
		return cfg().transforms.obfuscateNames ? obfuscateName(expr.name) : expr.name
	} else if (expr.type === 'ObjectExpression') {
		return objectExpression(expr)
	} else if (expr.type === 'FunctionExpression' || expr.type === 'ArrowFunctionExpression') {
		return anonFunction(expr)
	} else if (expr.type === 'CallExpression') {
		return callExpression(expr)
	} else if (expr.type === 'ArrayExpression') {
		return arrayExpression(expr)
	} else if (expr.type === 'UpdateExpression') {
		return updateExpression(expr)
	} else if (expr.type === 'ConditionalExpression') {
		return conditionalExpression(expr)
	} else if (expr.type === 'AwaitExpression') {
		return awaitExpression(expr)
	} else if (expr.type === 'TemplateLiteral') {
		return templateString(expr)
	} else if (expr.type === 'UnaryExpression') {
		return unaryExpression(expr)
	} else if (expr.type === 'MemberExpression') {
		return memberExpression(expr)
	} else if (expr.type === 'NewExpression') {
		return newExpression(expr)
	} else if (expr.type === 'SequenceExpression') {
		return sequenceExpression(expr)
	} else if (expr.type === 'AssignmentExpression') {
		return '(' + assignmentExpression(expr) + ')'
	} else if (expr.type === 'ChainExpression') {
		return chainExpression(expr)
	} else if (expr.type === 'ImportExpression') {
		return importExpression(expr)
	} else warn(`Unknown expression type in rightExpression(e) : ${expr.type}`)
}