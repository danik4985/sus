import * as toml from 'toml'

import { cfg } from './cfg'
import { __cfg } from './loadConfig'
import { warn } from '../log/warn'

export function parseAndPushOV(data: string): boolean {
	const lines = data.trim().split('\n')
		.map(i => i.trim())
		.filter(i => /^(\*\s+)?\s*@sus\s+/gm.test(i))
		.map(i => i.slice(i.indexOf('@sus') + 4).trim())

	if (lines.length === 0) return false

	const object = JSON.parse(JSON.stringify(cfg()))

	lines.forEach((i) => {
		try {
			Object.assign(object.transforms, toml.parse(i))
		} catch {
			warn('Error parsing config override: ' + i)
		}
	})

	__cfg.push(object)

	return true
}

export function shiftOV() {
	__cfg.pop()
}
