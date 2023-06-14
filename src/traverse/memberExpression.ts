import { cfg } from "../config/cfg"
import { obfuscateName } from "../obfuscate/obfuscateName"
import { stringObf } from "../obfuscate/stringObf"
import { awaitExpression } from "./awaitExpression"
import { rightExpression } from "./rightExpression"

export function memberExpression({ object, property, computed, optional }) {
	var data = '('

	if (object.type === 'MemberExpression') {
		data += memberExpression(object)
	} else if (object.type === 'Identifier') {
		const name = object.name
		data += cfg().transforms.obfuscateNames ? obfuscateName(name) : name
	} else if (object.type === 'AwaitExpression') {
		data += '(' + awaitExpression(object) + ')'
	} else {
		data += rightExpression(object)
	}

	data += ')'

	if (optional) data += '?.'

	data += '['

	if (computed) {
		data += rightExpression(property)
	} else {
		data += stringObf(property.name, cfg().transforms.keyObfuscationLevel)
	}

	data += ']'

	return data
}