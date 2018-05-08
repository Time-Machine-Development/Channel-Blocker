#!/bin/bash
for i in $(find . | grep "\.js$" | grep -v "shared"); do
	tmp=$(cat -n $i | grep -E "USERS_CONTAINER_IDS|REGEXS_CONTAINER_IDS|CONTAINER_IDS")
	tmp=$(cat -n $i | grep -E "\"blocked_users\"|\"title_regexs\"|\"name_regexs\"|\"comment_regexs\"")

	if [ $(echo $tmp | wc -m) != "1" ]
	then
		echo $i:
		cat -n $i | grep -E "USERS_CONTAINER_IDS|REGEXS_CONTAINER_IDS|CONTAINER_IDS"
		cat -n $i | grep -E "\"blocked_users\"|\"title_regexs\"|\"name_regexs\"|\"comment_regexs\""
	fi
done
