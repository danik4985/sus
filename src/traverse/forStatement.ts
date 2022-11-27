import { comment } from '../obfuscate/comment'
import { forConditionSection } from './forConditionSection'
import { postElseExpr } from './postElseExpr'
import { traverse } from './traverse'

export function forStatement(expr: any) {
	var data = '(function(){'

	data += comment(2)
	data += forConditionSection(expr.init) + ';'
	data += comment(2) + 'while('
	data += forConditionSection(expr.test)
	data += comment(1) + ')'

	if (expr.body.type === 'BlockStatement') {
		data += '{' + traverse(expr.body.body) + ';\n'
		data += forConditionSection(expr.update) + '}'
	} else {
		data += '{' + postElseExpr(expr) + ';\n' + forConditionSection(expr.update) + '}'
	}

	data += '})'
	data += comment(1) + '()'

	return data
}