import * as kolorist from 'kolorist'

export function error(err: string, helpMsg = false) {
	console.error(kolorist.red('[ERROR]'), kolorist.white(err))

	if (helpMsg) console.log(kolorist.dim('Use the ' + kolorist.bold('--help') + ' flag for help'))
}