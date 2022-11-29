import { cfg } from '../config/cfg'

const sus = (x: boolean | string) => x ? (typeof x === 'string' ? `/*${x}*/` : '/*sus*/') : ''

export function applyLines(text: string) {
	var start: string, end: string

	start = sus(cfg().format.lineStart)
	end = sus(cfg().format.lineEnd)

	return text.split('\n').map(i => start + i + end).join('\n')
}