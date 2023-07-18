import * as espree from 'espree'
import * as kolorist from 'kolorist'

import { cfg } from '../config/cfg'
import { error } from '../log/error'

export function parseAndCatchErrors(str: string) {
	try {
		return espree.parse(str, { ecmaVersion: cfg().input.esVersion, comment: true })
	} catch (e) {
		const { lineNumber, column } = e

		error(e.message)
		console.error('      ' + kolorist.italic(kolorist.bold(str.split('\n')[lineNumber-1])))
		console.error('Here: ' + new Array(column).join(' ') + kolorist.yellow('^'))
	}
}