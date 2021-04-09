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

There is no `--help` flag, I'll make it later
The CLI usage is `sus <args>`
Arguments:
```
-i --input [file]        Input file
-o --output [file]       Output file
-v --verbose             Set, if you want verbose output
-c --config [file]       Specify a YAML config file (more about that later)
```

## YAML Config
An example config file:
```yml
ignore:
  - mc
  - registerScript

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

### Contributing

I don't know how contributing works

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

There is a lot of issues, some described above. If you find a different issue, put it to the issues tab.