import { comment } from '../obfuscate/comment'
import { variableDeclarator } from './variableDeclarator'

export function variableDeclaration(expr: any, data = '') {
	data += expr.kind
	data += comment(2)
	data += ' '

	const strings = (expr.declarations as any[]).map(i => variableDeclarator(i))

	data += strings.join(',')

	return data
}