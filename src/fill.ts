export function fill(sequence: string, amount: number) {
	var _s = ''
	for (let i = 0; i < amount; i++) { _s += sequence }
	return _s
}