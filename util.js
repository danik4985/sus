const fs = require('fs')

const command = process.argv[2]

process.argv.shift()
process.argv.shift()
process.argv.shift()
const args = process.argv

if (!command) {
	console.log('No command specified')
	process.exit(1)
}

function setVersion() {
	var obj = JSON.parse(String(fs.readFileSync('package.json')))
	obj.version = args[0]
	fs.writeFileSync('package.json', JSON.stringify(obj, null, '\t'))
}

if (command === 'setversion') {
	setVersion()
	process.exit(0)
}