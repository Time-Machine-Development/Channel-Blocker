#!/bin/bash

#has to be executed from inside folder ytc

#lazy creating all directories for build files
mkdir ./build
mkdir ./build/content
mkdir ./build/config
mkdir ./build/config/js
mkdir ./build/background
mkdir ./build/shared

#writing all files without comments from ./src (reference to source folder) into ./build
for i in $(find ./src | grep "\.js$" | grep -v "build"); do
	j=./build/$(echo $i| cut -c 7-)
	pcregrep -h -v -e "^[^\"]*//(.)*$" $i | pcregrep -h -v -M -e "^[^\"]*/\*(.|\n)*\*/$" > $j
done

#copy manifest.json to ./build
cp ./src/manifest.json ./build/manifest.json

#copy ./src/config/config.html and ./src/config/style.css to ./build
cp ./src/config/config.html ./build/config/config.html
cp ./src/config/style.css ./build/config/style.css

#create directory for final project file
mkdir ./bin

#create zip from build inside bin folder
cd build
zip -r -FS ../bin/ytc.xpi *
cd ..
