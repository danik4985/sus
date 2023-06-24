import { cfg } from '../config/cfg'

export function numberObfLvl1(num: number) {
	return (cfg().transforms.noES2021Syntax ? '0x0' : '0x0_') + num.toString(16)
}