import { cfg } from '../config/cfg'
import { Randomizer } from '../random/Randomizer'

export function numberObfLvl2(num: number) {
	const U = cfg().transforms.noES2021Syntax ? '' : '_'

	if (num === 0) {
		const numer = Randomizer.INSTANCE.rand(1, 9999999999)

		if (Randomizer.INSTANCE.rand(0, 10) % 2) {
			return numer.toString(10) + '-0x0' + U + numer.toString(16)
		} else {
			return '0x0' + U + numer.toString(16) + '-' + numer.toString(10)
		}
	} else if (num > 0) {
		const p1 = Randomizer.INSTANCE.rand(0, num)
		const p2 = num - p1

		if (Randomizer.INSTANCE.rand(0, 10) % 2) {
			return p1.toString(10) + '+0x0' + U + p2.toString(16)
		} else {
			return '0x0' + U + p1.toString(16) + '+' + p2.toString(10)
		}
	} else {
		const p1 = Randomizer.INSTANCE.rand(num, 0) // (num = -50, p1 = -30)
		const p2 = num - p1 // (p2 = -20)

		if (Randomizer.INSTANCE.rand(0, 10) % 2) {
			return p1.toString(10) + '-0x0' + U + Math.abs(p2).toString(16)
		} else {
			return '-0x0' + U + Math.abs(p1).toString(16) + '+' + p2.toString(10)
		}
	}
}