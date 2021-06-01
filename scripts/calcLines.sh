#!/bin/bash
total=0
files=0

function _read() {
	for i in $1/*; do
		[[ -f "$i" ]] && let total+=$(wc -l "$i" | awk '{ print $1 }')
		[[ -f "$i" ]] && let files++

		[[ -d "$i" ]] && _read "$i"
	done
}

_read 'src'

echo "Files: $files | Lines: $total"