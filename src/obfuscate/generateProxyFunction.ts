import { Randomizer } from '../random/Randomizer'
import { comment } from './comment'
import { numberObf } from './numberObf'

export function generateProxyFunction(name: string, v1: string, v2: string) {
	const decoyArray = new Array(Randomizer.INSTANCE.rand(15, 50))
	const selectedIndex = Randomizer.INSTANCE.rand(0, decoyArray.length - 1)
	const randomConstant = Randomizer.INSTANCE.rand(5, 80)

	for (let i = 0; i < decoyArray.length; i++) {
		decoyArray[i] = Randomizer.INSTANCE.rand(-17836, 17836) // i asked my mom to say a random big number xd
	}

	// console.log(decoyArray, { selectedIndex, randomConstant })

	const result = decoyArray[selectedIndex] - randomConstant
	const stringifiedArray = decoyArray.map(i => '(' + numberObf(i) + ')').join(',' + comment(3))

	return `
	const ${v1}${comment(3)}=${comment(2)}[${stringifiedArray}]${comment(1)};
	const ${v2}${comment(3)}=${comment(2)}!((${v1}[${
		selectedIndex}]-${comment(2)}${randomConstant}) === ${result});
	function ${comment(3)}${name}(řඞŘඞ, řඞŘඞř)${comment(2)} {
		if (${v2}) {return${comment(1)}(String(Object));}
		else {return(${comment(2)}řඞŘඞř + řඞŘඞ);}
	};
	`
}