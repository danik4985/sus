import { cfg } from '../config/cfg'
import { numberObfLvl1 } from './numberObfLvl1'
import { numberObfLvl2 } from './numberObfLvl2'
import { numberObfLvl3 } from './numberObfLvl3'

export function numberObf(num: number, lvl?: number) {
	const l = lvl ?? cfg().transforms.numberObfLevel

	if (l === 0) return num
	if (l === 1) return numberObfLvl1(num)
	if (l === 2) return numberObfLvl2(num)
	if (l === 3) return numberObfLvl3(num)
}