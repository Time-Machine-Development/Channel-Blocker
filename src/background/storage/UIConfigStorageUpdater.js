function UIConfigStorageUpdater(storage){
	this.storage = storage;
	this.UIConfig = {};
}

UIConfigStorageUpdater.prototype.update = async function(partUIConfig){
	Object.assign(this.UIConfig, partUIConfig);

	await STORAGE.set({
		"config": this.UIConfig
	});
}
