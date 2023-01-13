import * as crypto from 'crypto'

export const createRandomSeed = () =>
	Buffer
		.from(crypto.randomBytes(128).toString('hex') + JSON.stringify(crypto.randomBytes(64).toJSON()))
		.toString('base64')
		.split('G')
		.reverse()
		.join('G')
		.split('')
		.reverse()
		.join('')
