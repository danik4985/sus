import * as chalk from 'chalk'
import { HelpText, Version } from './defaults'

export function printHelp() {
	console.log(chalk.cyan.bold('sus'), '| The "epic" javascript obfuscator')
	console.log(HelpText)
	console.log(chalk.bold('Usage:'), chalk.inverse(' sus <args> '))

	process.exit(0)
}

export function printVersion() {
	console.log(chalk.cyan.bold('sus'), '| The "epic" javascript obfuscator')
	console.log('Version:', chalk.bold(Version), '\n')
	console.log(chalk.dim('Licensed under MIT License'))
	console.log(chalk.dim('Built with tsc version 4.2.4'))

	process.exit(0)
}