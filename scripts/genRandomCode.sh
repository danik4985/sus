#!/bin/bash

n=$1

echo -n '' > "$2"

for((i=0;i<n;i++)); do
	rs=$(cat /dev/urandom | tr -dc 'a-zA-Z' | fold -w 32 | head -n 1)
	echo "const $rs = $(shuf -i1-1000 -n1)" >> "$2"
	echo "console.log($rs)" >> "$2"
done

echo "Done is $SECONDS seconds"