function HashSet(){
}

HashSet.prototype.add = function(str, val){
	//add str as property to this object
	this[str] = val;
}

HashSet.prototype.remove = function(str){
	//set the property which represents the given str to undefined
	delete this[str];
}

HashSet.prototype.contains = function(str){
	//return true if str exists as property in this object
	return (this[str] !== undefined);
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
