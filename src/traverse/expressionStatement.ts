import { assignmentExpression } from './assignmentExpression'
import { awaitExpression } from './awaitExpression'
import { callExpression } from './callExpression'
import { rightExpression } from './rightExpression'

export function expressionStatement(state: any, data = '') {
	if (typeof state.directive === 'string') {
		return JSON.stringify(state.directive) // support "use strict"
	} else if (state.expression.type === 'AssignmentExpression') {
		return assignmentExpression(state.expression, data)
	} else if (state.expression.type === 'CallExpression') {
		return callExpression(state.expression)
	} else if (state.expression.type === 'AwaitExpression') {
		return awaitExpression(state.expression)
	}

	// last fallback
	return rightExpression(state.expression)
}