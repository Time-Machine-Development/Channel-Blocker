#!/bin/bash

#print error and exit if not executed inside folder */ytc
if [[ $(pwd | grep -v -E "ytc$") ]]; then
	echo "ERROR: needs to be executed on */ytc"
	exit
fi

#clean
./tools/clean.sh

#make
./tools/make.sh
