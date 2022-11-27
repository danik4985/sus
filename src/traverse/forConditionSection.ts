import { assignmentExpression } from './assignmentExpression'
import { rightExpression } from './rightExpression'
import { variableDeclaration } from './variableDeclaration'

export function forConditionSection(expr: any) {
	if (expr.type === 'VariableDeclaration') {
		return variableDeclaration(expr)
	} else if (expr.type === 'AssignmentExpression') {
		return assignmentExpression(expr)
	}

	// last resort
	return rightExpression(expr)
}