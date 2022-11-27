import { cfg } from '../config/cfg'
import { stringObfLvl1 } from './stringObfLvl1'
import { stringObfLvl2 } from './stringObfLvl2'
import { stringObfLvl3 } from './stringObfLvl3'

export function stringObf(str: string, ovL?: number) {
	const l = ovL ?? cfg().transforms.stringObfLevel

	// console.log('::::', str, l)

	if (l === 0) return JSON.stringify(str)
	if (l === 1) return stringObfLvl1(str)
	if (l === 2) return stringObfLvl2(str)
	if (l === 3) return stringObfLvl3(str)
}