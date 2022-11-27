import { rand } from '../util/rand'

export function numberObfLvl2(num: number) {
	if (num === 0) {
		const numer = rand(1, 9999999999)

		if (rand(0, 10) % 2) {
			return numer.toString(10) + '-0x0_' + numer.toString(16)
		} else {
			return '0x0_' + numer.toString(16) + '-' + numer.toString(10)
		}
	} else if (num > 0) {
		const p1 = rand(0, num)
		const p2 = num - p1

		if (rand(0, 10) % 2) {
			return p1.toString(10) + '+0x0_' + p2.toString(16)
		} else {
			return '0x0_' + p1.toString(16) + '+' + p2.toString(10)
		}
	} else {
		const p1 = rand(num, 0)
		const p2 = num + p1

		if (rand(0, 10) % 2) {
			return p2.toString(10) + '-0x0_' + p1.toString(16)
		} else {
			return '0x0_' + p2.toString(16) + '-' + p1.toString(10)
		}
	}
}