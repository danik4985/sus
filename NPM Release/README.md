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
```

## YAML Config
The .yml config file has 2 fields: `ignored[]` and `removeEmptyLines`.
And example config file:
```yml
ignore:
  - mc
  - registerScript

removeEmptyLines: true
```

## Github
[danik4985/sus](https://github.com/danik4985/sus)