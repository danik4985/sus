import * as kolorist from 'kolorist'

export function warn(warn: string) {
	console.warn(kolorist.yellow('[WARNING]'), kolorist.white(warn))
}