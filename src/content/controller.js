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

	//removes all old observers and creates new observers based on the current yt-context
	function updateObservers(){

		//disconnects all currently active observers
		while(curObservers.length > 0){
			curObservers.pop().disconnect();
		}

		//HomePage(https://www.youtube.com/)
		if(curContext === YTContext.HOME){
			curObservers = createHomeObservers();
		}

		//TrendsPage(https://www.youtube.com/feed/trending)
		if(curContext === YTContext.TRENDING){
			curObservers = createTrendingObservers();
		}

		//SearchPage(https://www.youtube.com/results?search_query=<INPUT>)
		if(curContext === YTContext.SEARCH){
			curObservers = createSearchObservers();
		}

		//ChannelVideosPage(https://www.youtube.com/(user|channel)/<USER/CHANNEL ID>
		if(curContext === YTContext.CHANNEL_HOME){
			curObservers = createChannelHomeObservers();
		}

		//ChannelVideosPage(https://www.youtube.com/(user|channel)/<USER/CHANNEL ID>/videos
		if(curContext === YTContext.CHANNEL_VIDEOS){
			curObservers = createChannelVideosObservers();
		}

		//WatchPage(https://www.youtube.com/watch?v=<ID>)
		if(curContext === YTContext.VIDEO){
			curObservers = createVideoObservers();
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

			if(msg.sender === "background_storage_filter"){
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
