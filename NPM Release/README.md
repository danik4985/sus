# sus

![amogus](https://pbs.twimg.com/profile_images/1360028157177397249/a0ypQ9W7_400x400.jpg)

A stupid cringe amogus themed javascript obfuscator. Written in typescript.

## Installation
Linux & MacOS:
```bash
sudo npm install -g sus-obfuscator
```
Sh*tdows:
```cmd
npm install -g sus-obfuscator
```

## Usage
There is no `--help` flag, I'll make it later
The CLI usage is `sus <args>`
Arguments:
```
-i --input [file]        Input file
-o --output [file]       Output file
-v --verbose             Set, if you want verbose output
-c --config [file]       Specify a YAML config file (more about that later)
-v --version             Prints version
-h --help                Shows help
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

## Github
[danik4985/sus](https://github.com/danik4985/sus)