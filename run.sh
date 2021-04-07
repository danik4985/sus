#!/bin/bash

# Create folder if needed
[[ ! -d out/ ]] && mkdir out

# Compile
tsc

# Run
node out/main.js $@