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
		let regEx;

		if(this[key] === RegExType.CASE_INSENSITIVE){
			regEx = new RegExp(key, "i");
		}else if(this[key] == RegExType.CASE_SENSITIVE){
			/* note that '==' was used instead of '==='
			which is necessary because of older versions of YTC which did not allow case-insensitive regular expressions
			the value was always set to 'true' instead of RegExType.CASE_SENSITIVE */
			regEx = new RegExp(key);
		}

		if(regEx.test(str))
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
