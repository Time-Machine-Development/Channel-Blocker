//TODO: following code will be reworked in feature/import_export (greatly depends on config.html)
//
// {
// 	const SENDER = "config_import_savefile";
//
// 	function sendMessage(type, origin, input){
// 		browser.runtime.sendMessage(
// 			{
// 				sender: SENDER,
// 				receiver: "background_controller_storage",
// 				"event": {
// 					type: 	type,
// 					origin: origin,
// 					input: 	input
// 				}
// 			}
// 		);
// 	}
//
// 	//Get the choosen file and read it as text
// 	function startRead(event) {
// 		let file = document.getElementById('fileLoaderBtn').files[0];
// 		if(file){
// 			let fileReader = new FileReader();
//
// 			fileReader.readAsText(file, "UTF-8");
//
// 			fileReader.onload = onLoad;
// 		}
// 	}
//
// 	//If file is Loaded
// 	function onLoad(event) {
// 		let fileString = event.target.result;
// 		let jsonSaveFile = JSON.parse(fileString);
//
// 		for(let key in jsonSaveFile){
// 			sendMessage("addRange", key, jsonSaveFile[key]);
// 		}
// 	}
//
// 	//Check if the file-APIs are supported.
// 	if (window.File && window.FileReader && window.FileList && window.Blob) {
// 	  	//The file-APIs are supported.
// 		document.getElementById('fileLoaderBtn').addEventListener('change', startRead, false);
// 	} else {
// 		//The file-APIs are supported.
// 		alert('The file-APIs are not supported. You are not able to import.');
// 	}
// }