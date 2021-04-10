#!/bin/bash

echo -e "\e[31mBuilding for NPM\e[0m"
echo -e "\e[33m1.\e[0m Collecting data"

read -p "Version: " version

echo -e "\e[33m1.\e[0m \e[35mDONE\e[0m Collecting data"

echo -e "\e[33m2.\e[0m Building"

[[ ! -d "out" ]] && mkdir out
tsc

echo -e "\e[33m2.\e[0m \e[35mDONE\e[0m Building"

echo -e "\e[33m3.\e[0m Copying source code"

for i in out/*; do
	echo -e "\e[2mCopying $i\e[0m"
	cp "$i" "NPM Release/$(basename $i)"
	echo -e "\e[A\e[2mCopied $i\e[0m"
done

echo -e "\e[33m3.\e[0m \e[35mDONE\e[0m Copying source code"

echo -e "\e[33m4.\e[0m Getting package.json ready"

node util.js setversion $version

echo -e "\e[33m4.\e[0m \e[35mDONE\e[0m Getting package.json ready"

echo -e "\e[33m5.\e[0m Copying package files"

cp "package.json" "NPM Release/package.json"
cp "package-lock.json" "NPM Release/package-lock.json"

echo -e "\e[33m5.\e[0m \e[35mDONE\e[0m Copying package files"

echo -e "\e[1;32mDONE\e[0;32m in $SECONDS seconds. Ready to \e[7m npm release \e[0m"