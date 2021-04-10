import { rand } from './rand'

export function randComment() {
	const comments: string[] = [
		'sus',
		'amogus',
		'gay popbob sex dupe',
		'ඞ sus ඞ',
		'ඞsusඞ',
		'𓆏ඞ𓆏ඞ𓆏'
	]

	const str = comments[rand(0, (comments.length - 1))]
	const s = [
		(rand(0, 2) % 2 === 0) ? ' ' : '',
		(rand(0, 2) % 2 === 0) ? ' ' : ''
	]

	return `/*${s[0]}${str}${s[1]}*/`
}