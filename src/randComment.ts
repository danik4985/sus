import { rand } from './rand'

export function randComment() {
	const comments: string[] = [
		'sus',
		'amogus',
		'gay popbob sex dupe',
		'ඞ sus ඞ',
		'ඞsusඞ',
		'𓆏ඞ𓆏ඞ𓆏',
		'\u202E',
		'sus\u202E',
		'amogus\u202E',
		'gay popbob sex dupe\u202E',
		'ඞ sus ඞ\u202E',
		'ඞsusඞ\u202E',
		'𓆏ඞ𓆏ඞ𓆏\u202E',
		's\u202Eus',
		'amog\u202Eus',
		'gay\u202E popbob sex dupe',
		'ඞ su\u202Es ඞ',
		'ඞ\u202Esusඞ',
		'𓆏ඞ𓆏\u202Eඞ𓆏',
		'sigma balls',
		'\u202Esigma balls',
		'sigma \u202Eballs',
		'sigma pog!!!!!!!!',
		'\u202Esigma pog!!!!!!!!',
		'sigma \u202Epog!!!!!!!!',
		
		'sugoma',
		'epud xes bobpop yag',
		'sllab amgis',
		'!!!!!!!!gop amgis'
	]

	const str = comments[rand(0, (comments.length - 1))]
	const s = [
		(rand(0, 2) % 2 === 0) ? ' ' : '',
		(rand(0, 2) % 2 === 0) ? ' ' : ''
	]

	return `/*${s[0]}${str}${s[1]}*/`
}