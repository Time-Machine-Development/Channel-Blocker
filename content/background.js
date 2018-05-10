
	var blockedUser = ['ChildishGambinoVEVO', 'DieLochis', 'Deutschland sucht den Superstar', 'Ah Nice', 'Goal Deutschland', 'BILD FUSSBALL']

	function handleMessage(request, sender, sendResponse) {
		if(request.toBlock !== undefined){
			console.log("block: " + request.toBlock);
			blockedUser.push(request.toBlock);
			console.log(blockedUser);
		}
		let blocked = false;
		if(blockedUser.includes(request.name)){
			blocked = true;
		}
		sendResponse({isBlocked: blocked});
	}

	browser.runtime.onMessage.addListener(handleMessage);
	
	//sender: SENDER,
	//receiver: "config_content_updater",
	//"event": {
	//	type: type,
	//	oregin: oregin,
	//	input: input
	//}