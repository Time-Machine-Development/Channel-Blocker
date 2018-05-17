#!/bin/bash

#lazy creating all directories
mkdir ./build
mkdir ./build/content
mkdir ./build/config
mkdir ./build/config/js
mkdir ./build/background
mkdir ./build/shared

#writing all files without comments from $1 (reference to source folder) into ./build
for i in $(find ./src | grep "\.js$" | grep -v "build"); do
	j=./build/$(echo $i| cut -c 7-)
	pcregrep -h -v -e "^[^\"]*//(.)*$" $i | pcregrep -h -v -M -e "^[^\"]*/\*(.|\n)*\*/$" > $j
done

#TODO create zip from ./build and move result to ./bin
