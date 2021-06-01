# sus

![amogus](https://pbs.twimg.com/profile_images/1360028157177397249/a0ypQ9W7_400x400.jpg)

A cringe amogus themed javascript obfuscator. Written in typescript.

### Why use `sus`?

Sus provides better obfuscation than other obfuscators. It might require trying the obfuscation with different configs, but its worth it. It uses lots of different obfuscation methods and is much harder to read then obfuscators like [obfuscator.io](https://obfuscator.io). It is also much harder to deobfuscate then other obfuscators:

#### [JsNice](http://jsnice.org)

![image](https://media.discordapp.net/attachments/828296508746366986/830495757802274886/Snimek_z_2021-04-10_19-33-18.png?width=580&height=425)

#### [dcode.fr](https://www.dcode.fr/javascript-unobfuscator)

![image](https://media.discordapp.net/attachments/828296508746366986/830496040448819230/Snimek_z_2021-04-10_19-34-28.png?width=312&height=116)

#### [deog.sigr.io](https://deo.sigr.io/)

![image](https://media.discordapp.net/attachments/828296508746366986/830496502380101723/Snimek_z_2021-04-10_19-36-26.png?width=1024&height=68)

#### [codeamaze](https://codeamaze.com/code-beautifier/javascript-deobfuscator)

Magages to eversoslightly prettify it, but code is still overall unreadable because of all the obfuscation methods used.

### Dependencies

System dependencies:

* `npm >= 7.5`
* `node >= 14`

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
amogus: [ true, false ]
lineStart: true
fakeCode: true
```

**`ignore`**:`string[]` - Keys that dont get renamed

**`removeEmptyLines`**:`boolean` - Remove blank lines from result *(doesn't work when `shrink` is true)*

**`shrink`**:`boolean` - Make the code one line

**`amogus`**:`boolean[2]` - Add amogus ascii art on *[0]* start and *[1]* end

**`lineStart`**:`string | boolean` - Adds your *string* or *ඞsusඞ* as a block comment to the start of each line

**`redo`**:`string[]` - Keys that get renamed on the start, that were imported invisibly
**`fakeCode`**:`boolean` - Add fake code snippets

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

# Contact
If you have any questions, or need support, you can contact me here:
- ![image](https://cdn.discordapp.com/attachments/828296508746366986/830515428731125821/Webp.net-resizeimage.png) `danik#4985`
- ![image](https://cdn.discordapp.com/attachments/828296508746366986/830516009487433758/Webp.net-resizeimage_1.png) [u/deaddanik](https://www.reddit.com/user/deaddanik)