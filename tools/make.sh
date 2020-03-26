#!/bin/bash

#print error and exit, if not executed inside folder */ytc
if [[ $(pwd | grep -v -E "ytc$") ]]; then
	echo "ERROR: needs to be executed in */ytc"
	exit
fi

#copy src to build
cp -r ./src ./build

#writing all *.js files without comments from ./src into ./build (exclude jquery-3.3.1.min.js, browser-polyfill\.min\.js)
for i in $(find ./src  | grep -v "browser-polyfill\.min\.js" | grep -v "jquery-3\.4\.1\.min\.js" | grep "\.js$" | grep -v "build"); do
	j=./build/$(echo $i| cut -c 7-)

	#pcregrep -h -v -M -e "^\h*\/\*((.|\n)*?)\*\/\h*$" $i	-> remove multi-line comments
	#pcregrep -h -v -e "^\h*//.*$"							-> remove single-line comments
	#cat -s													-> reduce adjacent muliple empty lines to a single empty line
	pcregrep -h -v -M -e "^\h*\/\*((.|\n)*?)\*\/\h*$" $i | pcregrep -h -v -e "^\h*//.*$" | cat -s > $j

	#check for "console.log"s in ./src
	if [[ $(grep -n -E "console\.log" $i) ]]; then
		log="$log◼ $i\\n\e[38;5;248m$(grep -n -E "console\.log" $i)\e[0m\\n\\n"
	fi

	#check for "console.err"s in ./src
	if [[ $(grep -n -E "console\.error" $i) ]]; then
		err="$err◼ $i\\n\e[38;5;248m$(grep -n -E "console\.err" $i)\e[0m\\n\\n"
	fi

	#check for try-and-catch-blocks (with empty catch-block) in ./build
	if [[ $(pcregrep -M -n -e "\h*try(.|\n)*?catch([^\{\}])*?\{\s*?}\h*" $j) ]]; then
		try_catch="$try_catch◼ $j\\n\e[38;5;248m$(pcregrep -M -n -e "\h*try(.|\n)*?catch([^\{\}])*?\{\s*?}\h*" $j)\e[0m\\n\\n"
	fi

	#check for "=="/"!=" in ./src
	if [[ $(grep -n -E "([^!=]==[^=]|!=[^=])" $i) ]]; then
		equal="$equal◼ $i\\n\e[38;5;248m$(grep -n -E "([^!=]==[^=]|!=[^=])" $i)\e[0m\\n\\n"
	fi

	#check for possible comments in ./build
	if [[ $(grep -n -E "^[^\"]*(//|/\*)" $j) ]]; then
		comment="$comment◼ $j\\n\e[38;5;248m$(grep -n -E "^[^\"]*(//|/\*)" $j)\e[0m\\n\\n"
	fi

	#check for 'var' declarations in ./src
	if [[ $(grep -n -E "var " $i) ]]; then
		var="$var◼ $i\\n\e[38;5;248m$(grep -n -E "var" $i)\e[0m\\n\\n"
	fi
done

#print console.log warnings, if at least one warning exists
if [[ $log ]]; then
	echo -e "\e[38;5;37mWARNING: used console.log(·) in\e[0m"
	printf "$log"
	echo
fi

#print console.error warnings, if at least one warning exists
if [[ $err ]]; then
	echo -e "\e[38;5;37mWARNING: used console.error(·) in\e[0m"
	printf "$err"
	echo
fi

#print try-and-catch-blocks warnings, if at least one warning exists
if [[ $try_catch ]]; then
	echo -e "\e[38;5;37mWARNING: try-and-catch-block with empty catch-block in\e[0m"
	printf "$try_catch"
	echo
fi

#print '!='/'==' warnings, if at least one warning exists
if [[ $equal ]]; then
	echo -e "\e[38;5;37mWARNING: used '!='/'==' in\e[0m"
	printf "$equal"
	echo
fi

#print comment warnings, if at least one warning exists
if [[ $comment ]]; then
	echo -e "\e[38;5;37mWARNING: possible comment(s) in\e[0m"
	printf "$comment"
	echo
fi

#print 'var' warnings, if at least one warning exists
if [[ $var ]]; then
	echo -e "\e[38;5;37mWARNING: used 'var' instead of 'let' in\e[0m"
	printf "$var"
	echo
fi

#create directory for final project file
mkdir ./bin

#create .xpi(zip) from build inside bin folder
cd ./build
zip -r -q -FS ../bin/ytc.xpi *
zip -r -q -FS ../bin/ytc.zip *
cd ..

echo -e "\e[1mMAKE DONE - 110101\e[0m"
