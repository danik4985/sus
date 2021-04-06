#!/bin/bash

# Create folder if needed
[[ ! -f out/ ]] && mkdir out

# Compile
tsc

# Run
node out/main.js $@