#!/bin/bash

#lazy creating all directories
mkdir $1/build
mkdir $1/build/content
mkdir $1/build/config
mkdir $1/build/config/js
mkdir $1/build/background
mkdir $1/build/shared

#writing all files without comments from $1 (reference to source folder) into ./build
for i in $(find $1 | grep "\.js$" | grep -v "build"); do
	j=$1/build/$(echo $i| cut -c 3-)
	pcregrep -h -v -e "^[^\"]*//(.)*$" $i | pcregrep -h -v -M -e "^[^\"]*/\*(.|\n)*\*/$" > $j
done

#TODO create zip from ./build
