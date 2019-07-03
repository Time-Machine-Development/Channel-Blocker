#!/bin/bash

#print error and exit, if not executed inside folder */ytc
if [[ $(pwd | grep -v -E "ytc$") ]]; then
	echo "ERROR: needs to be executed in */ytc"
	exit
fi

rm -r ./build
rm -r ./bin
