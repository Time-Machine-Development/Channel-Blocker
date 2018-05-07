
	function check(checkValues){
		return false;
	}

	function checkVideoTitle(videoTitle){
		console.log("Title: " + videoTitle.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim());
		return false;
	}
	
	function checkUserChannelName(userChannelName){
		console.log("Name: " + userChannelName.replace(/[\n\r]+|[\s]{2,}/g, ' ').trim());
		return false;
	}
	
	function checkCommentContent(commentContent){
		console.log("Comment: " + commentContent);
		return false;
	}