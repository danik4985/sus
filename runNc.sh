#!/bin/bash

# Create folder if needed
[[ ! -d out/ ]] && mkdir out

# Compile
tsc

# Obfuscate each file
for i in out/*; do
	node out/main.js --input "$i" --output "test-obfuscator/$(basename $i)" --config config.yml # --verbose
done

# Run the obfuscated compiler
node test-obfuscator/main.js $@