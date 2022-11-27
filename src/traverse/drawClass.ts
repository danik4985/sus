import { cfg } from "../config/cfg"
import { comment } from "../obfuscate/comment"
import { obfuscateName } from "../obfuscate/obfuscateName"
import { methodDefinition } from "./methodDefinition"
import { propertyDefinition } from "./propertyDefinition"

export function drawClass(expr: any) {
	var data = 'class'

	data += comment(1) + ' '

	if (cfg().transforms.obfuscateNames) {
		data += obfuscateName(expr.id.name)
	} else {
		data += expr.id.name
	}

	data += '{' + comment(2)

	;(expr.body.body as any[]).forEach((i) => {
		if (i.type === 'PropertyDefinition') {
			data += propertyDefinition(i) + ';\n'
		} else if (i.type === 'MethodDefinition') {
			data += methodDefinition(i) + ';\n'
		}
	})

	data += '}' + comment(1)

	return data
}