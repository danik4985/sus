import { cfg } from '../config/cfg'
import { warn } from '../log/warn'
import { numberObfLvl1 } from './numberObfLvl1'
import { numberObfLvl2 } from './numberObfLvl2'
import { numberObfLvl3 } from './numberObfLvl3'

export function numberObf(num: number, lvl?: number) {
	const l = lvl ?? cfg().transforms.numberObfLevel

	var str: string

	     if (l === 0) str = num.toString()
	else if (l === 1) str = numberObfLvl1(num)
	else if (l === 2) str = numberObfLvl2(num)
	else if (l === 3) str = numberObfLvl3(num)

	if (l > 0 && cfg().transforms.checkNumbers) {
		const n = eval(str)
		if (n !== num) {
			warn(`numberObf(num, lvl=${l}): malformed number (${num}) -> (${n})`)
			return numberObf(num, l - 1)
		}
	}

	return str
}