import { A_FNC_NAME } from '../main'
import { comment } from './comment'
import { stringObfLvl2 } from './stringObfLvl2'

export function stringObfLvl3(str: string) {
	if (str.length < 14) return stringObfLvl2(str)

	const mid = Math.floor(str.length / 2)
	const segs = [ str.slice(0, mid), str.slice(mid) ].map(i => stringObfLvl2(i))

	return `${A_FNC_NAME()}(${comment(3)}${segs[1]}${comment(3)},${comment(3)}${segs[0]}${comment(3)})`
}