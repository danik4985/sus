import * as randomstring from 'randomstring'

import { fill } from './fill'
import { rand } from './rand'
import { randComment } from './randComment'

export class FakeCodeManager {
	private map = {}
	private _map: string[] = []
	private lastGen = 0
	private nextGen = rand(1, 3)

	constructor() {
		
	}

	private newKey(id: string) {
		var rs = randomstring.generate({ length: 64, charset: 'řඞŘ' })
		while (this._map.includes(rs))
			{ rs = randomstring.generate({ length: 64, charset: 'řඞŘ' }) }

		this._map.push(rs)
		this.map[id] = rs

		return rs
	}

	private randVal() {
		const type = rand(0, 2)
		switch (type) {
			case 0: // String
				return JSON.stringify(randomstring.generate(rand(2, 8)))
			case 1:
				return rand(0, rand(0, 69420))
			case 2:
				return Number(`${(rand(0, rand(0, 69420)))}.${(rand(0, rand(0, 69420)))}`)
		}
	}

	private randFloat(min: number, max: number) {
		return Number(
			rand(min, max)
			+ '.'
			+ rand(0, 99999)
		)
	}

	public gen_arr() {
		const members = rand(2, 18)
		const actions = rand(1, 5)
		var _arr = []

		for (let i = 0; i < members; i++) {
			_arr.push(this.randVal())
		}

		const arr = JSON.stringify(_arr)
		const name = this.newKey(randomstring.generate(rand(5, 16)))

		var str = `var ${name} = ${arr};`

		for (let i = 0; i < actions; i++) {
			const _act = rand(0, 2)

			switch (_act) {
				case 0:
					str += `\n${name}${randComment()}["push"](${this.randVal()});`
				case 1:
					str += `\n${name}["shift"]${randComment()}();`
					break
				case 2:
					str += `\n${name}["pop"]${randComment()}();`
					break
			}
		}

		return str
	}

	public gen_string(_name?: string) {
		var str = ''
		const name = _name || this.newKey(randomstring.generate(rand(5, 16)))
		const actions = rand(1, 5)

		if (!_name) str += `var ${name} = ${JSON.stringify(randomstring.generate(rand(1, 69)))};`

		for (let i = 0; i < actions; i++) {
			const act = rand(0, 2)
			switch (act) {
				case 0:
					str += `\n${name}=${name}["slice"]${randComment()}(${rand(0, 69)});`
					break
				case 1:
					str += `\n${name}=${name}${randComment()}["substring"](${rand(0, 69)});`
					break
				case 2:
					str +=
						`\n${name}${randComment()}+=${JSON.stringify(randomstring.generate(rand(5, 17)))};`
					break
			}
		}

		return str
	}

	public gen_trycatch() {
		var str = 'try {'
		const acts = rand(1, 3)
		const errKey = this.newKey(randomstring.generate(rand(5, 16)))

		for (let i = 0; i < acts; i++) {
			str += `\n${this.generate(true)}${randComment()}`
		}

		str += `\n} ${randComment()} catch (${errKey}) ${randComment()} {`
		str += this.gen_string(errKey)
		str += '}'

		return str
	}

	public gen_math() {
		var str = ''
		const name = this.newKey(randomstring.generate(rand(5, 16)))
		const actions = rand(4, 10)

		str += `var ${name}=${this.randFloat(1, 99999)};`

		for (let i = 0; i < actions; i++) {
			const _r = rand(0, 3)

			switch (_r) {
				case 0:
					str += `\n${name}${randComment()}=${name}+(${this.randFloat(-100, 100)});`
					break
				case 1:
					str += `\n${name}${randComment()}=${name}-(${this.randFloat(-100, 100)});`
					break
				case 2:
					str += `\n${name}${randComment()}=${name}/(${this.randFloat(-100, 100)});`
					break
				case 3:
					str += `\n${name}${randComment()}=${name}*(${this.randFloat(-100, 100)});`
					break
			}
		}

		return str
	}

	public gen_embeded() {
		var str = `((${randComment()})=>{${randComment()}`
		const acts = rand(0, 4)

		for (let i = 0; i < acts; i++) {
			str += '\n'
			str += this.generate(true)
		}

		str += `\n})(${randComment()})`

		return str
	}

	public generate(force?: boolean) {
		this.lastGen++

		if (this.lastGen === this.nextGen
		 || force === true) {
			
			if (this.lastGen === this.nextGen) {
				this.lastGen = 0
				this.nextGen = rand(1, 3)
			}

			const _r = rand(0, 4)
			switch (_r) {
				case 0:
					return this.gen_arr()
				case 1:
					return this.gen_string()
				case 2:
					return this.gen_trycatch()
				case 3:
					return this.gen_math()
				case 4:
					return this.gen_embeded()
				default:
					return this.gen_arr()
			}
		} else {
			return ''
		}
	}
}