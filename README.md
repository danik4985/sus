# sus

![amogus](https://pbs.twimg.com/profile_images/1360028157177397249/a0ypQ9W7_400x400.jpg)

A stupid cringe amogus themed javascript obfuscator. Written in typescript.

### Dependencies

System dependencies:

* `npm >= 7.5`
* `node >= 14`
* `tsc >= 4.2`

Recomended:

* `Bash >= 4.0`

### Installing

[sus can be installed from NPM](https://www.npmjs.com/package/sus-obfuscator)

Linux & MacOS:
```bash
sudo npm install -g sus-obfuscator
```
Sh*tdows:
```cmd
npm install -g sus-obfuscator
```

### Usage

The CLI usage is `sus <args>`

Arguments:
```
-i --input [file]        Input file
-o --output [file]       Output file
-v --verbose             Set, if you want verbose output
-c --config [file]       Specify a YAML config file (more about that later)
   --version             Prints version
-h --help                Shows help
```

## YAML Config
An example config file:
```yml
ignore:
  - mc
  - registerScript

redo:
	- variable
	- autoInvisibleImport

removeEmptyLines: true
shrink: false
amogus: [ true, false ],
lineStart: true
```

**`ignore`**:`string[]` - Keys that dont get renamed

**`removeEmptyLines`**:`boolean` - Remove blank lines from result *(doesn't work when `shrink` is true)*

**`shrink`**:`boolean` - Make the code one line

**`amogus`**:`boolean[2]` - Add amogus ascii art on *[0]* start and *[1]* end

**`lineStart`**:`string | boolean` - Adds your *string* or *ඞsusඞ* as a block comment to the start of each line

**`redo`**:`string[]` - Keys that get renamed on the start, that were imported invisibly

### Contributing

If you know how to fix any issue, please contribute

#### Im not sure how contributing works, so here is the default git *thing*
```
echo "# sus" >> README.md
git init
git add README.md
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/danik4985/sus.git
git push -u origin main
```

```
git remote add origin https://github.com/danik4985/sus.git
git branch -M main
git push -u origin main
```

### Issues

There are some issues. If you find any, plese put them to the issues tab. I am working on fixing them. Sometimes, you need to obfuscate again. It is higly recomended to test your obfuscated code before releasing it.