
	function check(checkValues){
		notifyBackgroundPage(checkValues)
		return false;
	}

	function checkVideoTitle(videoTitle, checkedNode){
		console.log("Title: " + videoTitle.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim());
		let checkValues = {
			title: videoTitle.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim(),
			checkedNode: checkedNode
		};
		notifyBackgroundPage(checkValues);
		return false;
	}
	
	function checkUserChannelName(userChannelName, checkedNode){
		console.log("Name: " + userChannelName.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim());
		let checkValues = {
			name: userChannelName.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim(),
			checkedNode: checkedNode
		};
		notifyBackgroundPage(checkValues);
		return false;
	}
	
	function checkCommentContent(commentContent, checkedNode){
		console.log("Comment: " + commentContent);
		let checkValues = {
			comment: commentContent,
			checkedNode: checkedNode
		};
		notifyBackgroundPage(checkValues);
		return false;
	}
	
	async function notifyBackgroundPage(checkValues) {
		let checkedNode = checkValues.checkedNode ;
		checkValues.checkedNode = undefined;
		let sending = await browser.runtime.sendMessage(checkValues);
		console.log(sending);
		if(sending.isBlocked){
			checkedNode.remove();
		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	