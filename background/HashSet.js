function HashSet(){
}

HashSet.prototype.add = function(key, val){
	//add key as property with value val to this object
	this[key] = val;
}

HashSet.prototype.remove = function(key){
	//try to delete key (will only be removed if it exists)
	delete this[key];
}

HashSet.prototype.contains = function(key){
	//return true if key exists as property in this object
	return this.hasOwnProperty(key);
}

HashSet.prototype.matches = function(str){
	//return true if str matches a property(interpreted as regex) of this object
	for(let key of Object.keys(this)){
		if((new RegExp(key)).test(str))
			return true;
	}

	return false;
}

HashSet.prototype.keys = function(){
	return Object.keys(this);
}

HashSet.prototype.values = function(){
	return Object.values(this);
}
