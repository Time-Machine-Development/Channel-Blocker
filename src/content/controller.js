{
	const SENDER = "content_controller";

	//all filters that are currently active
	const CUR_FILTERS = new Array();

	//current context to make an update if a "filter_storage_modified"-message is received
	let curContext;

	//creates a "context_request"-message for background_url_update
	function createContextRequestMsg(){
		return {
			sender: SENDER,
			receiver: "background_url_update",
			content: "context_request"
		};
	}

	//creates a "block_btn_visibility_request"-message for background_config_storage
	function createBlockBtnVisibilityRequestMsg(){
		return {
			sender: SENDER,
			receiver: "background_config_storage",
			content: "block_btn_visibility_request"
		};
	}

	//removes all old filters and creates new filters, based on the current yt-context
	function updateFilters(){
		//detaches all currently active filters
		for(actFilter of CUR_FILTERS){
			if(actFilter !== undefined){
				actFilter.detach();
			}
		}

		//Start/TrendsPage(https://www.youtube.com/ , https://www.youtube.com/feed/trending)
		if(curContext === YTContext.HOME || curContext === YTContext.TRENDING){
			let selectList = document.getElementsByClassName("style-scope ytd-section-list-renderer");
			for(elem of selectList){
				if(elem.id === "contents"){
					CUR_FILTERS.push(new StartContentFilter(elem));
				}
			}
		}

		//SearchPage(https://www.youtube.com/results?search_query=<INPUT>)
		if(curContext === YTContext.SEARCH || curContext === YTContext.CHANNEL_VIDEOS || curContext === YTContext.CHANNEL_HOME){
			for(elem of document.getElementsByClassName("style-scope ytd-two-column-search-results-renderer")){
				if(elem.tagName === "YTD-SECTION-LIST-RENDERER"){
					CUR_FILTERS.push(new SearchPageStartFilter(elem));
				}
			}
		}

		//WatchPage(https://www.youtube.com/watch?v=<ID>)
		if(curContext === YTContext.VIDEO){
			let list = document.getElementsByTagName("ytd-app");
			for(elem of list){
				CUR_FILTERS.push(new VideoPageAppFilter(elem));
			}
		}
	}

	/*
	INSTALLING LISTENER FOR MESSAGES FROM background-scripts
	*/

	browser.runtime.onMessage.addListener((msg) => {
		if(msg.receiver !== "content_controller")
			return;

		if(msg.sender === "background_filter_storage"){
			/* msg.content is of the form:
			"filter_storage_modified"
			*/

			if(msg.content === "filter_storage_modified"){
				//note that animationSpeed is declared and init. in checker_module
				animationSpeed = 1000;

				//wait for document to be ready
				$(document).ready(updateFilters());
			}
		}

		if(msg.sender === "background_url_update"){
			/* msg.content is of the form:
			{
				info: "context_switch",
				context: <context>
			}
			where <context> is a value of YTCONTEXT or undefined
			*/

			if(msg.content.info === "context_switch"){
				//note that animationSpeed is declared and init. in checker_module
				animationSpeed = 0;

				//update current context
				curContext = msg.content.context;

				//wait for document to be ready
				$(document).ready(updateFilters());
			}
		}

		if(msg.sender === "background_config_storage"){
			/* msg.content is of the form:
			{
				info: "block_btn_visibility_modified",
				block_btn_visibility: <bbv>
			}
			where <bbv> is boolean
			*/

			if(msg.content === "block_btn_visibility_modified"){
				//TODO: react to changes of the block_btn_visibility
			}
		}
	});

	//requests initial context and the initial visibility of block-btn, afterwards update filters (for the first time on this tab-id)
	async function init(){
		//request initial context (and register this tab as a yt-tab in background as a side-effect)
		curContext = await browser.runtime.sendMessage(createContextRequestMsg());

		//TODO: request initial visibility of block-btn
		//??? = await browser.runtime.sendMessage(createBlockBtnVisibilityRequestMsg());

		//wait for document to be ready
		$(document).ready(updateFilters());
	}

	init();
}