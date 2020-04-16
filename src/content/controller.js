{
	const SENDER = "content_controller";

	//all observers that are currently active
	let curObservers = [];

	//current context to make an update if a "filter_storage_modified"-message is received
	let curContext;

	function createContextRequestMsg(){
		return {
			sender: SENDER,
			receiver: "background_url_update",
			info: "context_request"
		};
	}

	/*function createConfigValueRequestMsg(configId){
		return {
			sender: SENDER,
			receiver: "background_config_storage",
			info: "config_value_request",
			content: {
				config_id: configId
			}
		};
	}*/

	//removes all old observers and creates new observers based on the current yt-context
	function updateObservers(){

		//disconnects all currently active observers
		while(curObservers.length > 0){
			curObservers.pop().disconnect();
		}

		//Start(https://www.youtube.com/)
		if(curContext === YTContext.HOME){

		}

		//TrendsPage(https://www.youtube.com/feed/trending)
		if(curContext === YTContext.TRENDING){

		}

		//RecommendedPage(https://www.youtube.com/feed/recommended)
		if(curContext === YTContext.RECOMMENDED){

		}

		//SearchPage(https://www.youtube.com/results?search_query=<INPUT>)
		if(curContext === YTContext.SEARCH || curContext === YTContext.CHANNEL_VIDEOS || curContext === YTContext.CHANNEL_HOME){

		}

		//WatchPage(https://www.youtube.com/watch?v=<ID>)
		if(curContext === YTContext.VIDEO){
			curObservers = createVideoPageObservers();
		}
	}

	//requests initial context and afterwards update observers (for the first time on this tab-id)
	async function init(){
		//request initial context (and register this tab as a yt-tab in background as a side-effect)
		curContext = await browser.runtime.sendMessage(createContextRequestMsg());

		//update observers
		$(document).ready(updateObservers());
	}

	/*
	INSTALLING LISTENER FOR MESSAGES FROM background-scripts
	*/

	browser.runtime.onMessage.addListener((msg) => {
		if(msg.receiver !== SENDER)
			return;

		if(msg.info === "filter_storage_modified"){
			/* msg.content is of the form:
			undefined
			*/

			if(msg.sender === "background_filter_storage"){
				//update observers
				$(document).ready(updateObservers());
			}
		}

		if(msg.info === "context_switch"){
			/* msg.content is of the form:
			{
				context: <Context>
			}
			where <Context> is of Object.values(YTContext) or undefined.
			*/

			if(msg.sender === "background_url_update"){
				//update current context
				curContext = msg.content.context;

				//update observers
				$(document).ready(updateObservers());
			}
		}

		/*if(msg.info === "block_btn_modified"){
			/* msg.content is of the form:
			{
				block_btn_visibility: <Block Button visibility>
			}
			where <Block Button visibility> is of type Boolean.
			*//*

			if(msg.sender === "background_config_storage"){
				//requests initial context and the initial visibility of block-btn, afterwards update filters (for the first time on this tab-id)
				init();
			}
		}*/

		/*if(msg.info === "animation_speed_modified"){
			/* msg.content is of the form:
			{
				animation_speed: <Animation Speed>
			}
			where <Animation Speed> is of type Number.
			*//*

			if(msg.sender === "background_config_storage"){
				curAnimationSpeed = msg.content.animation_speed;
			}
		}*/

		if(msg.info === "html_data_request"){
			/* msg.content is of the form:
            undefined
            */

			if(msg.sender === "background_bug_report"){
				return new Promise((resolve) => {
                    resolve(document.querySelector("html").outerHTML);
                });
			}
		}
	});

	init();
}
