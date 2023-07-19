import * as seedrandom from 'seedrandom'

export class Randomizer {
	private seeded: seedrandom.PRNG
	public static INSTANCE: Randomizer

	constructor(seed: string) { 
		this.seeded = seedrandom(seed)
		Randomizer.INSTANCE = this
	}

	public rand(min: number, max: number) {
		return Math.floor(this.seeded.double() * (max - min + 1) ) + min
	}

	public randUnder1() {
		return this.seeded.double()
	}

	public randBool(): boolean {
		return this.seeded.int32() % 2 === 0
	}

	public randIName(len: number, chars = 'řඞŘ') {
		const charset = chars.split('')
		var result = ''

		for (let i = 0; i < len; i++) {
			result += charset[this.rand(0, charset.length - 1)]	
		}

		return result
	}
}