#!/bin/bash

echo "good luck everybody!! (family guy reel reference)"

rm -rf "out_test"
cp -r "out" "out_test"

for i in out_test/**/*.js; do
	echo "Obfuscating $i"
	node out/main.js -i "$i" -o "$i" -c config.yml -n
done

echo "Obfuscating out_test/main.js"
node out/main.js -i "out_test/main.js" -o "out_test/main.js" -c config.yml -n

echo "ALL DONE IN $SECONDS seconds"
