/**
			sus obfuscator - sussify your javascript!
			Copyright (C) 2022 danik

			This program is free software: you can redistribute it and/or modify
			it under the terms of the GNU General Public License as published by
			the Free Software Foundation, either version 3 of the License, or
			(at your option) any later version.

			This program is distributed in the hope that it will be useful,
			but WITHOUT ANY WARRANTY; without even the implied warranty of
			MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
			GNU General Public License for more details.

			You should have received a copy of the GNU General Public License
			along with this program.  If not, see <https://www.gnu.org/licenses/>.
*/

import * as commander from 'commander'
import * as fs from 'fs'
import * as espree from 'espree'
import * as kolorist from 'kolorist'

import { cfg } from './config/cfg'
import { error } from './log/error'
import { traverse } from './traverse/traverse'
import { REDONE_PAIRS } from './obfuscate/obfuscateName'
import { checkVersion, printVersionInfo } from './program/checkVersion'
import { HELP_TEXT, VERSION } from './program/constants'

const program = new commander.Command()

program
	.option('-i, --input <file>', 'Input file')
	.option('-o, --output <file>', 'Output file')
	.option('-c, --config <file>', 'Config file')
	.option('-h, --help', 'Get help')
	.option('-v, --version', 'Get the version')

program.helpOption(false)

const opts = program.parse().opts()

const { input, output, config, help, version } = opts

if (help) {
	console.log(HELP_TEXT)
	process.exit(0)
}

if (version) {
	console.log(VERSION)
	process.exit(0)
}

if (!input) {
	error('You must specify an input', true)
	process.exit(1)
}

if (!output) {
	error('You must specify an output', true)
	process.exit(1)
}

if (!config) {
	error('You must specify a config file', true)
	process.exit(1)
}

const vcheckPromise = checkVersion()

export const CONFIG_PATH = config

const string = String(fs.readFileSync(input))
const ast = espree.parse(string, { ecmaVersion: cfg().input.esVersion })

// console.log(util.inspect(ast, false, Infinity, true))

console.log(kolorist.white('Obfuscating ' + kolorist.green(input) + ' with sus ' + kolorist.yellow(VERSION)))
const t = Date.now()

const obf = traverse(ast.body)
const mapped = REDONE_PAIRS.map(([og, n]) => `const ${n}=${og}`).join(';')

const result = `
function řඞŘ(řඞŘඞ, řඞŘඞř) { return řඞŘඞř + řඞŘඞ };Řඞř=Boolean;ŘඞřŘ=Array;
${mapped};
řŘඞřŘ=RegExp;
${obf};
`

console.log(kolorist.white('Done in ' + kolorist.magenta((Date.now() - t) + ' ms')))

fs.writeFileSync(output, result)

;(async () => {
	var { currentVersion, latestVersion } = await vcheckPromise
	currentVersion = currentVersion.slice(1)
	if (currentVersion !== latestVersion) printVersionInfo([ currentVersion, latestVersion ])
})()