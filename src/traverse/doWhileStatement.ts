import { comment } from "../obfuscate/comment"
import { postElseExpr } from "./postElseExpr"
import { rightExpression } from "./rightExpression"
import { traverse } from "./traverse"

export function doWhileStatement(expr: any) {
	var data = 'do ' + comment(2)

	if (expr.body.type === 'BlockStatement') {
		data += '{' + comment(1) + traverse(expr.body.body) + ';}'
	} else {
		data += postElseExpr(expr.body) + ';'
	}

	data += comment(2) + 'while(' + comment(2)
	data += rightExpression(expr.test)
	data += comment(3) + ')'

	return data
}