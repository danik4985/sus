import { R_FNC_NAME } from "../main";
import { comment } from "../obfuscate/comment";
import { rightExpression } from "./rightExpression";

export function arrayExpression(expr: any) {
	var data = R_FNC_NAME() + '('

	;(expr.elements as any[]).forEach((i) => {
		data += rightExpression(i) + comment(3) + ',' + comment(3)
	})

	data += ')'

	return data
}