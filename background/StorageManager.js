function StorageManager(storage){
	this.storage = storage;
	this.sets = {};

	for(let id of CONTAINER_IDS)
		this.sets[id] = new HashSet();
}

StorageManager.prototype.initSets = async function(){
	for(let id of CONTAINER_IDS){
		try{
			Object.assign(this.sets[id], await storage.get(id));
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

/* (id, content) is blocked <=>
id is blocked OR
(id is not excluded AND content is blocked by regex)
*/
StorageManager.prototype.isBlocked = function(input){
	if(input.type === "user_id")
		return this.sets["blocked_users"].contains(input.id);

	if(input.type === "user_name")
		return
			this.sets["blocked_users"].contains(input.id) ||
			((!this.sets["excluded_users"].contains(input.id)) &&
			this.sets["name_regexs"].matches(input.content))
		;

	if(type === "video_title")
		return
			this.sets["blocked_users"].contains(input.id) ||
			((!this.sets["excluded_users"].contains(input.id)) &&
			this.sets["title_regexs"].matches(input.content))
		;

	if(type === "comment_content")
		return
			this.sets["blocked_users"].contains(input.id) ||
			((!this.sets["excluded_users"].contains(input.id)) &&
			this.sets["comment_regexs"].matches(input.content))
		;
}

StorageManager.prototype.updateStorage = async function(containerId){
	await this.storage.set({containerId: this.sets[containerId]});
}
