/**
			sus obfuscator - sussify your javascript!
			Copyright (C) 2023 danik

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
import * as kolorist from 'kolorist'

import { cfg } from './config/cfg'
import { error } from './log/error'
import { traverse } from './traverse/traverse'
import { addObfuscated, REDONE_PAIRS, updateRedo } from './obfuscate/obfuscateName'
import { checkVersion, printVersionInfo } from './program/checkVersion'
import { HELP_TEXT, VERSION } from './program/constants'
import { applyLines } from './obfuscate/applyLines'
import { applyArt } from './obfuscate/applyArt'
import { Randomizer } from './random/Randomizer'
import { generateProxyFunction } from './obfuscate/generateProxyFunction'
import { StringToArrayExtr } from './obfuscate/StringToArrayExtr'
import { parseAndCatchErrors } from './util/parseAndCatchErrors'

var aFnName: string
var bFnName: string
var rFnName: string
var eFnName: string

export const A_FNC_NAME = () => aFnName
export const B_FNC_NAME = () => bFnName
export const R_FNC_NAME = () => rFnName
export const E_FNC_NAME = () => eFnName

export var CONFIG_PATH: string

async function main() {
	const { attachComments } = await import('estree-util-attach-comments')

	const program = new commander.Command()

	program
		.option('-i, --input <file>', 'Input file')
		.option('-o, --output <file>', 'Output file')
		.option('-c, --config <file>', 'Config file')
		.option('-s, --logseed', 'Print out the seed at the end')
		.option('-n, --noupdate', 'Don\'t check for updates')
		.option('-h, --help', 'Get help')
		.option('-v, --version', 'Get the version')

	program.helpOption(false)

	const opts = program.parse().opts()

	const { input, output, config, help, version, logseed, noupdate } = opts

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

	const vcheckPromise = noupdate ? null : checkVersion()

	CONFIG_PATH = config

	const string = String(fs.readFileSync(input))
	const ast = parseAndCatchErrors(string)

	if (!ast) return

	new Randomizer(cfg().input.seed)

	attachComments(ast.body, ast.comments)

	// console.log(require('util').inspect(ast, false, Infinity, true))

	console.log(kolorist.white('Obfuscating ' + kolorist.green(input) + ' with sus ' + kolorist.yellow(VERSION)))
	const t = Date.now()

	StringToArrayExtr.init()

	aFnName = Randomizer.INSTANCE.randIName(64)
	bFnName = Randomizer.INSTANCE.randIName(64)
	rFnName = Randomizer.INSTANCE.randIName(64)
	eFnName = Randomizer.INSTANCE.randIName(64)

	updateRedo()

	addObfuscated('Array', rFnName)
	addObfuscated('RegExp', eFnName)

	const headerFncName1 = Randomizer.INSTANCE.randIName(64)
	const headerFncName2 = Randomizer.INSTANCE.randIName(64)

	addObfuscated(null, headerFncName1)
	addObfuscated(null, headerFncName2)

	const proxyFnc = generateProxyFunction(A_FNC_NAME(), headerFncName1, headerFncName2)

	const obf = traverse(ast.body)
	const mapped = REDONE_PAIRS.map(([og, n]) => `const ${n}=${og}`).join(';')

	//function /*řඞŘ*/${A_FNC_NAME()}(řඞŘඞ, řඞŘඞř){return řඞŘඞř + řඞŘඞ }

	const result = `
	${proxyFnc};const ${B_FNC_NAME()}=Boolean;${StringToArrayExtr.generateHeader()}
	${mapped};
	const ${rFnName} = Array;const ${eFnName}=RegExp;
	${obf};
	`

	var finalResult = result

	if (cfg().format.removeEmptyLines)
		while (finalResult.includes('\n\n')) finalResult = finalResult.replaceAll('\n\n', '\n')
	if (cfg().format.shrink) finalResult = finalResult.replaceAll('\n', ';')

	finalResult = applyLines(finalResult)
	finalResult = applyArt(finalResult)

	console.log(kolorist.white('Done in ' + kolorist.magenta((Date.now() - t) + ' ms')))

	if (logseed) {
		console.log('\tObfuscation seed is ' + kolorist.green(cfg().input.seed))
	}

	fs.writeFileSync(output, finalResult)

	if (noupdate) return
	var { currentVersion, latestVersion } = await vcheckPromise
	currentVersion = currentVersion.slice(1)
	if (currentVersion !== latestVersion) printVersionInfo([ currentVersion, latestVersion ])
}

(async () => {
	await main()
})()