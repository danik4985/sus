import { cfg } from '../config/cfg'
import { comment } from '../obfuscate/comment'
import { obfuscateName } from '../obfuscate/obfuscateName'
import { postElseExpr } from './postElseExpr'
import { rightExpression } from './rightExpression'
import { traverse } from './traverse'
import { variableDeclaration } from './variableDeclaration'

export function fancyForStatement(expr: any) {
	const theKeyword = expr.type === 'ForInStatement' ? 'in' : 'of'

	var data = 'for(' + comment(2)
	
	if (expr.left.type === 'VariableDeclaration') {
		data += variableDeclaration(expr.left)
	} else if (expr.left.type === 'Identifier') {
		if (cfg().transforms.obfuscateNames) data += obfuscateName(expr.left.name)
		else data += expr.left.name
	} else {
		data += rightExpression(expr.left)
	}

	// console.log(expr)

	data += ' ' + comment(2) + theKeyword + ' ' + comment(3)
	data += rightExpression(expr.right) + comment(3) + ')'

	if (expr.body.type === 'BlockStatement') {
		data += '{' + traverse(expr.body.body) + ';}'
	} else {
		data += postElseExpr(expr.body) + ';'
	}

	return data
}