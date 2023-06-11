import { cfg } from '../config/cfg'
import { warn } from '../log/warn'
import { comment } from '../obfuscate/comment'
import { obfuscateName } from '../obfuscate/obfuscateName'
import { objectPattern } from './objectPattern'
import { rightExpression } from './rightExpression'

export function variableDeclarator({ id, init }) {
	var data = ''

	if (id.type === 'Identifier') {
		data += cfg().transforms.obfuscateNames ? obfuscateName(id.name) : id.name
	} else if (id.type === 'ObjectPattern') {
		data += objectPattern(id)
	} else if (id.type === 'ArrayPattern') {

	} else warn(`Unknown expression type in variableDeclarator(e) => e.id : ${id.type}`)

	if (init) {
		data += comment(2) + '=' + comment(2)
		data += rightExpression(init)
	}

	return data
}