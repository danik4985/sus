import * as NpmApi from 'npm-api'
import * as kolorist from 'kolorist'
import * as Cache from 'node-cache'

import { fill } from '../util/fill'
import { calcLength } from '../util/calcLength'
import { VERSION } from './constants'

export function printVersionInfo(version: [ string, string ]) {
	const string = `There is an ${kolorist.red('update')} avalible
Version ${kolorist.yellow(version[0])} --> ${kolorist.bold(kolorist.green(version[1]))}
  ${kolorist.magenta(kolorist.bold('How to install:'))}
  Simply run ${kolorist.inverse('npm install -g ' + kolorist.lightBlue('sus-obfuscator'))}`

	var maxL = 0
	string.split('\n').forEach((i) => { if (i.length > maxL) maxL = i.length })
	maxL += 4

	const top = `┏${fill(maxL, '━')}┓` // Voxel#6991
	const bottom = `┗${fill(maxL, '━')}┛` // majorsopa#0001

	console.log(top)
	string.split('\n').forEach((i) => { console.log('┃', i + fill(maxL - calcLength(i) - 2, ' '), '┃') })
	console.log(bottom)
}

export async function checkVersion() {
	const cache = new Cache()

	const lc = cache.get('checked_for_update')

	if (lc) {
		return { currentVersion: VERSION, latestVersion: VERSION }
	}

	const currentVersion = VERSION
	const npm = new NpmApi()

	const repo = npm.repo('sus-obfuscator')
	const _package = await repo.package()
	const latestVersion = _package.version

	cache.set('checked_for_update', true, 1800)

	return { currentVersion, latestVersion }
}