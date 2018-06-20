#!/bin/bash

#has to be executed from inside folder ytc

#clean
./tools/clean.sh

#copy src to build
cp -r ./src ./build

#writing all files without comments from ./src into ./build
for i in $(find ./src | grep "\.js$" | grep -v "build"); do
	j=./build/$(echo $i| cut -c 7-)
	pcregrep -h -v -e "^[^\"]*//(.)*$" $i | pcregrep -h -v -M -e "^[^\"]*/\*(.|\n)*\*/$" > $j
done

#create directory for final project file
mkdir ./bin

#create zip from build inside bin folder
cd ./build
zip -r -FS ../bin/ytc.xpi *
cd ..
