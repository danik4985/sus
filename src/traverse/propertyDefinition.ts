import { cfg } from "../config/cfg"
import { comment } from "../obfuscate/comment"
import { stringObf } from "../obfuscate/stringObf"
import { rightExpression } from "./rightExpression"

export function propertyDefinition(expr: any) {
	var data = ''

	data += '[' + comment(2)

	if (expr.computed) {
		data += rightExpression(expr.key)
	} else {
		data += stringObf(expr.key.name, cfg().transforms.keyObfuscationLevel)
	}

	data += ']' + comment(3)

	if (expr.value) {
		data += '=' + comment(3) + rightExpression(expr.value)
	}

	return data
}