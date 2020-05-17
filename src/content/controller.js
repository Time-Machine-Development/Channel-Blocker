	//all observers that are currently active
	let curObservers = [];

	//current context to make an update if a "filter_storage_modified"-message is received
	let curContext;

	//if updateObservers was invoked by controller.js before the config was "ready" this function is invoked
	function updateObserversAfterInit(){
		//remove all old btns
		for (let btn of document.getElementsByClassName("cb_block_button")) {
			btn.remove();
		}

		//the curContext is not included in FILTERED_PAGES, but there are some Observer active -> updateObservers
		if(curObservers.length > 0 && !contentUIConfig[ContentUI.FILTERED_PAGES].includes(curContext)){
			updateObservers();
		//the curContext is included in FILTERED_PAGES, but there are no Observer active -> updateObservers
		}else if(curObservers.length === 0 && contentUIConfig[ContentUI.FILTERED_PAGES].includes(curContext)){
			updateObservers();
		}
	}

	//removes all old observers and creates new observers based on the current yt-context
	function updateObservers(){

		//disconnects all currently active observers
		while(curObservers.length > 0){
			curObservers.pop().disconnect();
		}

		
		
		console.log("curContext", Object.keys(YTContext).find(key => YTContext[key] === curContext));
		console.log("contentUIConfig", contentUIConfig);

		if(!contentUIConfig[ContentUI.FILTERED_PAGES].includes(curContext)){
			
			return;
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
		
		//WatchPage(https://www.youtube.com/feed/subscriptions)
		if(curContext === YTContext.SUBSCRIPTIONS){
			curObservers = createSubscriptionsObservers();
		}
		
		//WatchPage(https://www.youtube.com/gaming)
		if(curContext === YTContext.GAMING){
			curObservers = createGamingObservers();
		}
		
		//WatchPage(https://www.youtube.com/feed/library)
		if(curContext === YTContext.LIBRARY){
			curObservers = createLibraryObservers();
		}
		
		//WatchPage(https://www.youtube.com/feed/history)
		if(curContext === YTContext.HISTORY){
			curObservers = createHistoryObservers();
		}
		
		//WatchPage(https://www.youtube.com/learning)
		if(curContext === YTContext.LEARNING){
			curObservers = createLearningObservers();
		}

		//WatchPage(https://m.youtube.com)
		if(curContext === YTContext.MOBILE_HOME){
			curObservers = createMobileHomeObservers();
		}

		//WatchPage(https://m.youtube.com/feed/trending)
		if(curContext === YTContext.MOBILE_TRENDING){
			curObservers = createMobileTrendingObservers();
		}

		//WatchPage(https://m.youtube.com/results?search_query=<INPUT>)
		if(curContext === YTContext.MOBILE_SEARCH){
			curObservers = createMobileSearchObservers();
		}

		//WatchPage(https://m.youtube.com/watch?v=<ID>)
		if(curContext === YTContext.MOBILE_VIDEO){
			curObservers = createMobileVideoObservers();
		}
	}

{
	const SENDER = "content_controller";

	function createContextRequestMsg(){
		return {
			sender: SENDER,
			receiver: "background_url_update",
			info: "context_request"
		};
	}

	//requests initial context and afterwards update observers (for the first time on this tab-id)
	async function init(){
		//request initial context (and register this tab as a yt-tab in background as a side-effect)
		curContext = await browser.runtime.sendMessage(createContextRequestMsg());

		//update observers
		$(document).ready(() => {
			updateObservers();
			alreadyUpdatedObservers = true;
		});
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
