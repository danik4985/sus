import { cfg } from '../config/cfg'
import { Randomizer } from '../random/Randomizer'
import { comment } from './comment'
import { numberObf } from './numberObf'
import { addObfuscated } from './obfuscateName'
import { stringObfLvl1 } from './stringObfLvl1'

export class StringToArrayExtr {
	private static arr: string[]
	private static fncName: string
	private static arrayName: string
	private static indexMod: number

	public static init() {
		this.arr = []
		this.fncName = Randomizer.INSTANCE.randIName(64)
		this.arrayName = Randomizer.INSTANCE.randIName(64)
		this.indexMod = (cfg().transforms.stringArrObfLevel > 1) ? Randomizer.INSTANCE.rand(-256, 256) : 0

		addObfuscated(null, this.fncName)
		addObfuscated(null, this.arrayName)
	}

	public static add(str: string) {
		const at = this.arr.findIndex(i => i === str)
		if (at >= 0) return this.createCallForIndex(at)

		if (cfg().transforms.addFakeStringsToArray) {
			const randoms = Randomizer.INSTANCE.rand(0, (cfg().transforms.stringArrObfLevel - 1) * 4)

			for (let i = 0; i < randoms; i++) this.arr.push(Randomizer.INSTANCE.randIName(
				Randomizer.INSTANCE.rand(1, 25),
				'qwertzuiopasdfghjklyxcvbnmQWERTZUIOASDHJKLYXCVBNM7894561230.-_'
			))
		}
		
		this.arr.push(str)

		return this.createCallForIndex(this.arr.length - 1)
	}

	public static createCallForIndex(index: number) {
		const l = cfg().transforms.stringArrObfLevel
		const nl = Math.max(0, cfg().transforms.numberObfLevel - 1)
		const v = index - this.indexMod

		if (l === 0 || l === 1) return `(${this.arrayName})${comment(3)}[${numberObf(v, nl)}]`
		if (l === 2) return `(${this.fncName})${comment(3)}(${
			numberObf(Randomizer.INSTANCE.rand(-800, 800), nl)},${numberObf(v, nl)})`
		if (l === 3) {
			const xor = Randomizer.INSTANCE.rand(1, 800)
			return `(${this.fncName})${comment(3)}(${numberObf(xor, nl)},${comment(2)}${numberObf(v ^ xor, nl)})`
		}
	}

	public static generateHeader() {
		const l = cfg().transforms.stringArrObfLevel

		if (l === 0) return (this.arr.length > 0) ? this.generateLvl1Header() : ''
		if (l === 1) return this.generateLvl1Header()
		if (l === 2) return this.generateLvl2Header()
		if (l === 3) return this.generateLvl3Header()
	}

	private static generateLvl1Header() {
		const stringifiedArr = this.arr.map(i => stringObfLvl1(i)).join(',')
		return `const ${comment(1)}${this.arrayName}=${comment(1)}[${comment(2)}${stringifiedArr}${comment(3)}];`
	}

	private static generateLvl2Header() {
		const stringifiedArr = this.arr.reverse().map(i => stringObfLvl1(i)).join(',')
		const arrMax = this.arr.length - 1
		const a = Randomizer.INSTANCE.randIName(64)
		const x = Randomizer.INSTANCE.randIName(64)
		return `const ${comment(1)}${this.arrayName}=${comment(1)}[${comment(2)}${stringifiedArr}${comment(3)}];
		function ${comment(1)}${this.fncName}${comment(2)}(${Randomizer.INSTANCE.randIName(64)},${comment(3)}${x})${comment(2)}{
			const ${comment(2)}${a}=(${x})+(${numberObf(this.indexMod)});
			return${comment(1)}(${this.arrayName}[(${comment(2)}${numberObf(arrMax)})-(${comment(3)}${a})]);
		};`
	}

	private static generateLvl3Header() {
		const stringifiedArr = this.arr.reverse().map(i => stringObfLvl1(i)).join(',')
		const arrMax = this.arr.length - 1
		const a = Randomizer.INSTANCE.randIName(64)
		const b = Randomizer.INSTANCE.randIName(64)
		const x = Randomizer.INSTANCE.randIName(64)
		const y = Randomizer.INSTANCE.randIName(64)
		return `const ${comment(1)}${this.arrayName}=${comment(1)}[${comment(2)}${stringifiedArr}${comment(3)}];
		function ${comment(1)}${this.fncName}${comment(2)}(${x},${comment(3)}${y})${comment(2)}{
			const ${comment(2)}${b}=(${y})^(${comment(3)}${x});
			const ${comment(2)}${a}=(${b})+(${numberObf(this.indexMod)});
			return${comment(1)}(${this.arrayName}[(${comment(2)}${numberObf(arrMax)})-(${comment(3)}${a})]);
		};`
	}

}