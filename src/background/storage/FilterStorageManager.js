function FilterStorageManager(storage){
	this.storage = storage;
	this.sets = {};

	for(let ft of Object.values(FilterType)){
		this.sets[ft] = new HashSet();
	}
}

FilterStorageManager.prototype.initSets = async function(){
	for(let ft of Object.values(FilterType)){
		let storageContainer = await this.storage.get(String(ft));
		Object.assign(this.sets[ft], storageContainer[String(ft)]);
	}
}

//returns true <=> this not already contained str as key with value val <=> this changed
FilterStorageManager.prototype.add = function(filterType, str, val){
	let exists = this.sets[filterType].hasOwnProperty(str) && this.sets[filterType][str] === val;

	this.sets[filterType].add(str, val);
	this.updateStorage(filterType);

	return !exists;
}

//return true <=> this contained str as key
FilterStorageManager.prototype.remove = function(filterType, str){
	let exists = this.sets[filterType].hasOwnProperty(str);

	this.sets[filterType].remove(str);
	this.updateStorage(filterType);

	return exists;
}

FilterStorageManager.prototype.getHashSet = function(filterType){
	return this.sets[filterType];
}

FilterStorageManager.prototype.isBlocked = function(input){
	/* input is of the form:
	{
	 	info: "is_blocked_request",
		user_channel_name: <user/channel>,
		[additional: {
			type: <t>,
			content: <content>
		}]
 	}
	where <t> is ("comment"|"title")
	*/

	//if input.user_channel_name is defined check if it is blocked
	if(input.user_channel_name !== undefined){
		//if input.name exists in list of BLOCKED_USERS, return true
		if(this.sets[FilterType.BLOCKED_USERS].contains(input.user_channel_name))
			return true;

		//if input.name exists in list of EXCLUDED_USERS, return false
		if(this.sets[FilterType.EXCLUDED_USERS].contains(input.user_channel_name))
			return false;

		//if input.additional.content matches any RegEx in RegEx-list of NAME_REGEXS, return true
		if(this.sets[FilterType.NAME_REGEXS].matches(input.user_channel_name))
			return true;
	}

	//if input.additional is not defined, return false
	if(input.additional === undefined)
		return false;

	if(input.additional.type === "comment"){
		//... in RegEx-list of COMMENT_REGEXS, return true, otherwise false

		return this.sets[FilterType.COMMENT_REGEXS].matches(input.additional.content);
	}else if(input.additional.type === "title"){
		//... in RegEx-list of TITLE_REGEXS, return true, otherwise false

		return this.sets[FilterType.TITLE_REGEXS].matches(input.additional.content);
	}
}

FilterStorageManager.prototype.updateStorage = async function(filterType){
	let storageUpdate = {};
	storageUpdate[filterType] = this.sets[filterType];
	await this.storage.set(storageUpdate);
}
