import { rand } from './rand'

export function randComment() {
	const comments: string[] = [
		'sus',
		'amogus',
		'gay popbob sex dupe',
		'à¶ sus à¶',
		'à¶susà¶',
		'ðà¶ðà¶ð',
		'\u202E',
		'sus\u202E',
		'amogus\u202E',
		'gay popbob sex dupe\u202E',
		'à¶ sus à¶\u202E',
		'à¶susà¶\u202E',
		'ðà¶ðà¶ð\u202E',
		's\u202Eus',
		'amog\u202Eus',
		'gay\u202E popbob sex dupe',
		'à¶ su\u202Es à¶',
		'à¶\u202Esusà¶',
		'ðà¶ð\u202Eà¶ð',
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