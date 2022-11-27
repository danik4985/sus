import { cfg } from '../config/cfg'
import { comment } from '../obfuscate/comment'
import { obfuscateName } from '../obfuscate/obfuscateName'
import { rightExpression } from './rightExpression'

export function variableDeclarator({ id, init }) {
	var data = cfg().transforms.obfuscateNames ? obfuscateName(id.name) : id.name

	if (init) {
		data += comment(2) + '=' + comment(2)
		data += rightExpression(init)
	}

	return data
}