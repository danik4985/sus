import { comment } from "../obfuscate/comment"
import { postElseExpr } from "./postElseExpr"
import { rightExpression } from "./rightExpression"
import { traverse } from "./traverse"

export function whileStatement(expr: any) {
	var data = 'while'

	data += comment(2) + '('
	data += rightExpression(expr.test)
	data += comment(3) + ')'

	if (expr.body.type === 'BlockStatement') {
		data += '{' + traverse(expr.body.body) + ';}'
	} else {
		data += postElseExpr(expr.body) + ';'
	}

	return data
}