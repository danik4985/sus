import { cfg } from '../config/cfg'
import { AMOGUS, EPIC_ART } from '../program/art'

export function applyArt(data: string) {
	if (cfg().format.amogus.start) data = AMOGUS + '\n' + data
	if (cfg().format.amogus.end) data += '\n' + AMOGUS
	if (cfg().format.epicEndArt) data += '\n' + EPIC_ART

	return data
}