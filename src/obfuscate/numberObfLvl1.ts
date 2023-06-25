import { cfg } from '../config/cfg'

export function numberObfLvl1(num: number) {
	return ((num < 0) ? '-' : '') + (cfg().transforms.noES2021Syntax ? '0x0' : '0x0_') + Math.abs(num).toString(16)
}