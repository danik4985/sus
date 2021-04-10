import * as NpmApi from 'npm-api'
import * as chalk from 'chalk'

import { Version } from './defaults'
import { fill } from './fill'
import { calcLength } from './calcLength'

function printVersionInfo(version: [ string, string ]) {
	const string = chalk`There is an {red update} avalible
Version {yellow ${version[0]}} --> {bold.green ${version[1]}}

{magenta How to install:}
Simply run {inverse ${(process.platform === 'win32') ? '' : 'sudo '}npm install -g }{inverse.blue sus-obfuscator}`

	var maxL = 0
	string.split('\n').forEach((i) => { if (i.length > maxL) maxL = i.length })
	maxL += 4

	const top = `┏${fill('━', maxL)}┓` // Voxel#6991
	const bottom = `┗${fill('━', maxL)}┛` // majorsopa#0001

	console.log(top)
	string.split('\n').forEach((i) => { console.log('┃', i + fill(' ', maxL - calcLength(i) - 2), '┃') })
	console.log(bottom)
}

export async function checkVersion() {
	const currentVersion = Version
	const npm = new NpmApi()

	const repo = npm.repo('sus-obfuscator')
	const _package = await repo.package()
	const latestVersion = _package.version

	if (currentVersion != latestVersion) printVersionInfo([ currentVersion, latestVersion ])
}