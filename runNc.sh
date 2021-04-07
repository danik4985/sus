#!/bin/bash

# Create folder if needed
[[ ! -d out/ ]] && mkdir out

# Compile
tsc

# Obfuscate each file
for i in out/*; do
	node out/main.js "$i" "test-obfuscator/$(basename $i)"
done

# Run the obfuscated compiler
node test-obfuscator/main.js $@