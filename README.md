# sus

![amogus](https://pbs.twimg.com/profile_images/1360028157177397249/a0ypQ9W7_400x400.jpg)

An epic amogus themed javascript obfuscator. Written in typescript. And now rewritten to be actually good!

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

* `npm >= 8.19`
* `node >= 17`

It will probably work with lower versions too, but it is being developed and tested on these versions.

### Installing

[sus can be installed from NPM](https://www.npmjs.com/package/sus-obfuscator)

```sh
npm install -g sus-obfuscator
```

### Usage

The CLI usage is `sus <args>`

Arguments:

```
-i --input [file]        Input file
-o --output [file]       Output file
-c --config [file]       Specify a YAML config file (more about that later)
   --version             Prints version
-h --help                Shows help
```

### YAML Config

An example config file:

```yml
transforms:
    obfuscateNames: true
    obfuscateBooleans: true

    keyObfuscationLevel: 2
    stringObfLevel: 3
    numberObfLevel: 3

    ignore: [ 'myImportedVariable' ]

		webMode: false

format:
    amogus:
        start: true
        end: false


    epicEndArt: true

    lineStart: true
    lineEnd: false

    removeEmptyLines: true
    shrink: false
    commentFrequency: 2


input:
    esVersion: 2023
```

#### Transforms

**`obfuscateNames`**`:boolean` - If names (variable names, function names, class names) should get renamed

**`obfuscateBooleans`**`:boolean` - If booleans should get obfuscated

**`keyObfuscationLevel`**`:0~3` - How heavily to obfuscate keys of objects

**`stringObfLevel`**`:0~3` - How heavily to obfuscate strings

**`numberObfLevel`**`:0~3` - How heavily to obfuscate numbers

**`ignore`**`:string[]` - Which identifiers to ignore when obfuscating names

**`removeEmptyLines`**`:boolean` - Remove any potential empty lines from the result

**`shrink`**`:boolean` - Make the result be one line only

**`commentFrequency`**`:0~3` - How frequent should random distractive comments be

**`webMode`**`:boolean` - Set this to true if you are obfuscating for the web

#### Format

**`amogus.start`**`:boolean` - Add amogus ascii art to the start of the code

**`amogus.end`**`:boolean` - Add amogus ascii art to the end of the code

**`epicEndArt`**`:boolean` - Add epic jerma sus ascii art to the end of the code

**`lineStart`**`:boolean | string[]` - Add *sus* or your string to the start of each line

**`lineEnd`**`:boolean | string[]` - Add *sus* or your string to the end of each line

#### Input

**`esVersion`**`:number` - The ECMAscript version of your JS source code

### Contributing

If you know how to fix any issue or improve anything, please contribute

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

There are some issues. If you find any, plese put them to the issues tab. I am working on fixing them. It is recomended to test your obfuscated code before releasing it.

### Contact

If you have any questions, or need support, you can contact me here *(sorted from most to least preffered)*:

<!--
- ![image](https://cdn.discordapp.com/attachments/828296508746366986/830515428731125821/Webp.net-resizeimage.png) `danik#4985`
- ![image](https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT934Wi_Omrf8QNQnXVh94lKyoRF8Nu576htndDDLwBwlC2tRrUCED_ge5eIUZKgcQQTWc&usqp=CAU) `@danik4985:matrix.org`
-->

- <img src="https://preview.redd.it/6spnrz1it4071.png?auto=webp&s=0057b0108d50a8782b03802d7f12aafcb7776829" height="25"> `danik#4985`
- <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT934Wi_Omrf8QNQnXVh94lKyoRF8Nu576htndDDLwBwlC2tRrUCED_ge5eIUZKgcQQTWc&usqp=CAU" height="25"> `@danik4985:matrix.org`
- <img src="https://upload.wikimedia.org/wikipedia/en/3/35/Geometry_Dash_Logo.PNG" height="25"> `susdanik`

### License

```
sus obfuscator - sussify your javascript!
Copyright (C) 2022 danik

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program.  If not, see <https://www.gnu.org/licenses/>.
```