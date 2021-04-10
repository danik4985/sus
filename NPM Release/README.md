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

## Github
[danik4985/sus](https://github.com/danik4985/sus)