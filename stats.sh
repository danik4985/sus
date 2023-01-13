#!/bin/bash

lines=0

FILES_FOUND=0

function count {
	for i in "$1"/*; do
		[[ -d "$i" ]] && count "$i"
		[[ -f "$i" ]] && (( lines+=$(wc -l "$i" | awk '{ print $1 }') ))
	done
}

function countFiles {
	for i in "$1"/*; do
		[[ -d "$i" ]] && countFiles "$i"
		[[ -f "$i" ]] && (( FILES_FOUND++ ))
	done
}

count "src"
countFiles "src"

echo "The code has $lines lines in $FILES_FOUND typescript files that take up $(du -hs "src" | awk '{ print $1 }')"
