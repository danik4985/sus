import { Randomizer } from '../random/Randomizer'

export function shuffleArray<T>(arr: T[]): T[] {
	for (let i = arr.length - 1; i > 0; i--) {
		const j = Math.floor(Randomizer.INSTANCE.randUnder1() * (i + 1))
		;[arr[i], arr[j]] = [arr[j], arr[i]]
	}

	return arr
}