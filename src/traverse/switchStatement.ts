import { warn } from '../log/warn'
import { comment } from '../obfuscate/comment'
import { rightExpression } from './rightExpression'
import { traverse } from './traverse'

export function switchStatement(expr: any) {
	var res = ''

	res += 'switch' + comment(1) + '('
	res += rightExpression(expr.discriminant) + ')' + comment(2) + '{\n'

	;(expr.cases as any[]).forEach((i, n) => {
		if (i.type !== 'SwitchCase') {
			warn(`Unknown expression type in switchStatement(expr) => expr.cases[${n}] : ${i.type}`)
			return
		}

		if (i.test) {
			res += 'case(' + comment(2) + rightExpression(i.test) + ')'
			res += comment(3) + ':\n'
		} else {
			res += comment(3) + 'default' + comment(2) + ':'
		}

		res += traverse(i.consequent) + '\n;'
	})

	res += '}'

	return res
}