import { Randomizer } from '../random/Randomizer'
import { comment } from './comment'
import { numberObfLvl2 } from './numberObfLvl2'

export function numberObfLvl3(num: number) {
	const xorMoment = Randomizer.INSTANCE.rand(3, 9999)
	const numer = num ^ xorMoment

	return `(${numberObfLvl2(numer)})${comment(3)}^${comment(3)}(${numberObfLvl2(xorMoment)})`
}