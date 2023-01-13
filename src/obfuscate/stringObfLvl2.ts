import { A_FNC_NAME } from '../main'
import { comment } from './comment'
import { stringObfLvl1 } from './stringObfLvl1'

export function stringObfLvl2(str: string) {
	if (str.length < 6) return stringObfLvl1(str)

	const mid = Math.floor(str.length / 2)
	const segs = [ str.slice(0, mid), str.slice(mid) ]

	return `${A_FNC_NAME()}(${comment(3)}${stringObfLvl1(segs[1])}${comment(3)},
		${comment(3)}${stringObfLvl1(segs[0])}${comment(3)})`.replace('\n', '')
}