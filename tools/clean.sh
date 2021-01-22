#!/bin/bash

#print error and exit, if not executed inside the project root directory
if ! [[ -d "tools" ]]; then
	echo "ERROR: needs to be executed in the project root directory"
	exit
fi

rm -r ./build
rm -r ./bin
