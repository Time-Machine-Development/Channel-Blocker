	
	function blockUserChannel (userChannelName){
		console.log(userChannelName + " blocked!");
		alert(userChannelName + " blocked!");
		let sending = browser.runtime.sendMessage({toBlock:userChannelName});
	}
	

	