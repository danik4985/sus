import { comment } from '../obfuscate/comment'
import { stringObf } from '../obfuscate/stringObf'
import { rightExpression } from './rightExpression'

export function templateString({ quasis, expressions }: any) {
	// console.log({ quasis, expressions })

	var data = comment(2)

	const mapped = (quasis as any[]).map((i, n) => {
		var res = stringObf(i.value.raw) + comment(3)

		// console.log({ i, n, res, e: expressions[n] })

		if (expressions[n]) {
			// console.log(expressions[n], rightExpression(expressions[n]))
			res += '+(' + comment(3) + rightExpression(expressions[n]) + ')'
		}
		return res
	})

	data += mapped.join('+')
	data += comment(1)

	// console.log(data)

	return data
}