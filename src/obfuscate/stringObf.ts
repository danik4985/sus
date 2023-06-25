import { cfg } from '../config/cfg'
import { warn } from '../log/warn'
import { Randomizer } from '../random/Randomizer'
import { stringObfLvl1 } from './stringObfLvl1'
import { stringObfLvl2 } from './stringObfLvl2'
import { stringObfLvl3 } from './stringObfLvl3'
import { StringToArrayExtr } from './StringToArrayExtr'

export function stringObf(str: string, ovL?: number, extractToArray?: boolean) {
	const l = ovL ?? cfg().transforms.stringObfLevel
	const toArray = extractToArray ?? (cfg().transforms.extractStringsToArray === 'Random')
		? Randomizer.INSTANCE.randBool()
		: cfg().transforms.extractStringsToArray

	// console.log('::::', str, l)

	if (l === 0) return JSON.stringify(str)

	if (toArray) {
		return StringToArrayExtr.add(str)
	} else {
		if (l === 1) return stringObfLvl1(str)
		if (l === 2) return stringObfLvl2(str)
		if (l === 3) return stringObfLvl3(str)
	}

	warn(`stringObf(${str}) about to return undefined, l = ${l}; ovL = ${ovL}`)
}