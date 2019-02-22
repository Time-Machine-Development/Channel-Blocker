#!/bin/bash

#print error and exit if not executed inside folder */ytc
if [[ $(pwd | grep -v -E "ytc$") ]]; then
	echo "ERROR: needs to be executed on */ytc"
	exit
fi

#copy src to build
cp -r ./src ./build

#writing all *.js files without comments from ./src into ./build (exclude jquery-3.3.1.min.js)
for i in $(find ./src | grep -v "jquery-3\.3\.1\.min\.js" | grep "\.js$" | grep -v "build"); do
	j=./build/$(echo $i| cut -c 7-)

	#pcregrep -h -v -M -e "^\h*\/\*((.|\n)*?)\*\/\h*$" $i 		-> remove multi-line comments
	#pcregrep -h -v -e "^\h*//.*$"						-> remove single-line comments
	#cat -s											-> reduce adjacent muliple empty lines to a single empty line
	pcregrep -h -v -M -e "^\h*\/\*((.|\n)*?)\*\/\h*$" $i | pcregrep -h -v -e "^\h*//.*$" | cat -s > $j

	#check for "=="/"!=" in ./build
	if [[ $(grep -n -E "([^!=]==[^=]|!=[^=])" $j) ]]; then
    		echo "WARNING: used '!='/'==' in $j:"
		grep -n -E "([^!=]==[^=]|!=[^=])" $j
		echo
	fi

	#check for possible comments in ./build
	if [[ $(grep -n -E "^[^\"]*(//|/\*)" $j) ]]; then
    		echo "WARNING: possible comments in $j:"
		grep -n -E "^[^\"]*(//|/\*)" $j
		echo
	fi


done

#create directory for final project file
mkdir ./bin

#create zip from build inside bin folder
cd ./build
zip -r -q -FS ../bin/ytc.xpi *
cd ..

echo "MAKE DONE - 110101"
