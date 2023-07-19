import { comment } from '../obfuscate/comment'
import { Randomizer } from '../random/Randomizer'
import { forConditionSection } from './forConditionSection'
import { getThis, thisStack } from './leftExpression'
import { postElseExpr } from './postElseExpr'
import { traverse } from './traverse'

export function forStatement(expr: any) {
	var data = ''

	const newthis = Randomizer.INSTANCE.randIName(64)
	
	data += `const ${comment(3)}${newthis}${comment(3)}=${comment(2)}${getThis()};`
	
	thisStack.push(newthis)
	
	data += '(function(){'

	data += comment(2)
	if (expr.init) data += forConditionSection(expr.init) + ';'
	data += comment(2) + 'while('
	data += expr.test ? forConditionSection(expr.test) : 'true'
	data += comment(1) + ')'

	if (expr.body.type === 'BlockStatement') {
		data += '{' + traverse(expr.body.body) + ';\n'
		if (expr.update) data += forConditionSection(expr.update) + '}'
	} else {
		data += '{' + postElseExpr(expr) + ';\n' + forConditionSection(expr.update) + '}'
	}

	data += '})'
	data += comment(1) + '()'

	thisStack.pop()

	return data
}