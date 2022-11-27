export function calcLength(str: string) {
	const _str = str.split(/\u001B\[[0-9]{1,2}m/gm).join('')
	return _str.length
}