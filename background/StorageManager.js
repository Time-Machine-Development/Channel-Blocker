function StorageManager(storage){
	this.storage = storage;
	this.sets = {};

	for(let cId of Object.values(ContainerId))
	this.sets[cId] = new HashSet();
}

StorageManager.prototype.initSets = async function(){
	for(let cId of Object.values(ContainerId)){
		try{
			Object.assign(this.sets[cId], await storage.get(cId));
		}catch(storageErr){
			//do nothing (keep set with ID id empty) if set does not exist in storage
		}
	}
}

//returns false <=> this already contained str as key
StorageManager.prototype.add = function(containerId, str){
	let ret = !this.sets[containerId].hasOwnProperty(str);

	this.sets[containerId].add(str);
	this.updateStorage(containerId);

	return ret;
}

//return false <=> this did not contained str as key
StorageManager.prototype.remove = function(containerId, str){
	let ret = this.sets[containerId].hasOwnProperty(str);

	this.sets[containerId].remove(str);
	this.updateStorage(containerId);

	return ret;
}

StorageManager.prototype.getHashSet = function(containerId){
	return this.sets[containerId];
}

StorageManager.prototype.isBlocked = function(input){
	//if input.name exists in list of BLOCKED_USERS, return true
	if(this.sets[ContainerId.BLOCKED_USERS].contains(input.name))
		return true;

	//input.name exists in list of EXCLUDED_USERS, return false
	if(this.sets[ContainerId.EXCLUDED_USERS].contains(input.name))
		return false;

	//if input.additional.content matches any RegEx in RegEx-list of NAME_REGEXS, return true
	if(this.sets[ContainerId.NAME_REGEXS].matches(input.name))
		return true;

	//if input.additional is not defined, return false
	if(input.additional === undefined)
		return false;

	if(input.additional.type === RegExBlockType.COMMENT){
		//... in RegEx-list of COMMENT_REGEXS, return true, otherwise false

		return this.sets[ContainerId.COMMENT_REGEXS].matches(input.additional.content);
	}else if(input.additional.type === RegExBlockType.TITLE){
		//... in RegEx-list of TITLE_REGEXS, return true, otherwise false

		return this.sets[ContainerId.TITLE_REGEXS].matches(input.additional.content);
	}
}

StorageManager.prototype.updateStorage = async function(containerId){
	await this.storage.set({containerId: this.sets[containerId]});
}
