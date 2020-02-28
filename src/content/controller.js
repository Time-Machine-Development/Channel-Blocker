//public variable for the menu. curChanelName is the name of the channel where the user last opend the menu
let curChanelName = undefined;

{
	const SENDER = "content_controller";

	//all filters that are currently active
	const CUR_FILTERS = new Array();

	//current context to make an update if a "filter_storage_modified"-message is received
	let curContext;
	let curAnimationSpeed = 1000;

	//creates a "context_request"-message for background_url_update
	function createContextRequestMsg(){
		return {
			sender: SENDER,
			receiver: "background_url_update",
			content: "context_request"
		};
	}

	//creates a request-message for background_config_storage
	function createRequestMsg(request){
		return {
			sender: SENDER,
			receiver: "background_config_storage",
			content: request
		};
	}

	function updateMenuBtn(){
		//CSS for menuBtn
		let css = '\
		#cb_menuButtonDiv{\
			 min-width: 200px;\
		}\
		\
		#cb_menuButton:hover{\
			 background: var(--yt-menu-hover-backgound-color);\
		}\
		\
		#cb_menuButton{\
			width: 100%;\
			color: var(--yt-spec-text-primary);\
			height: 36px;\
			background: var(--paper-listbox-background-color, var(--primary-background-color));\
			border: none;\
			font-size: 1.4rem;\
			font-weight: 400;\
			line-height: 2.1rem;\
			font-family: var(--paper-font-subhead_-_font-family);\
			cursor: pointer;\
		}';
	  	let style = document.createElement('style');

	  	if (style.styleSheet) {
			style.styleSheet.cssText = css;
	  } else {
			style.appendChild(document.createTextNode(css));
	  }
	  document.getElementsByTagName('head')[0].appendChild(style);
	  CUR_FILTERS.push(new PopupFilter(document.getElementsByTagName("YTD-POPUP-CONTAINER")[0]));
	}

	//removes all old filters and creates new filters, based on the current yt-context
	function updateFilters(){
		//detaches all currently active filters
		for(actFilter of CUR_FILTERS){
			if(actFilter !== undefined){
				actFilter.detach();
			}
		}

		//remove all cbbuttons
		for(btn of document.getElementsByTagName("button")){
			if(btn.id === "cb_button"){
				btn.remove();
			}
		}

		//Setup the menuBtnFilter
		updateMenuBtn();

		//Start(https://www.youtube.com/)
		if(curContext === YTContext.HOME){
			//new designed Startpage
			for(let newElem of document.getElementsByClassName("style-scope ytd-two-column-browse-results-renderer")){
				if(newElem.id !== "primary")continue;
				CUR_FILTERS.push(new StartPrimaryFilter(newElem));
			}
		}

		//TrendsPage(https://www.youtube.com/feed/trending)
		if(curContext === YTContext.TRENDING){
			let selectList = document.getElementsByClassName("style-scope ytd-app");
			for(elem of selectList){
				if(elem.id === "page-manager"){
					CUR_FILTERS.push(new PersistentAppFilter(elem));
				}
			}
		}

		//RecommendedPage(https://www.youtube.com/feed/recommended)
		if(curContext === YTContext.RECOMMANDED){
			let selectList = document.getElementsByClassName("style-scope ytd-app");
			for(elem of selectList){
				if(elem.id === "page-manager"){
					CUR_FILTERS.push(new PersistentAppFilter(elem));
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

	//requests initial context and the initial visibility of block-btn, afterwards update filters (for the first time on this tab-id)
	async function init(){

		//request initial context (and register this tab as a yt-tab in background as a side-effect)
		curContext = await browser.runtime.sendMessage(createContextRequestMsg());
		//request initial visibility of block-btn
		//showBtns is used in button_lib
		showBtns = await browser.runtime.sendMessage(createRequestMsg("block_btn_visibility_request"));
		//request initial color of block-btn
		//btnColor is used in button_lib
		btnColor = await browser.runtime.sendMessage(createRequestMsg("block_btn_color_request"));
		//request initial size of block-btn
		//btnSize is used in button_lib
		btnSize = await browser.runtime.sendMessage(createRequestMsg("block_btn_size_request")) * 0.01;
		//request initial blockVideosOnVideopage
		//blockVideosOnVideopage is used in checker_module
		blockVideosOnVideopage = await browser.runtime.sendMessage(createRequestMsg("block_videos_on_videopage_request"));
		//request initial animationSpeed
		//blockVideosOnVideopage is used in checker_module
		curAnimationSpeed = parseInt(await browser.runtime.sendMessage(createRequestMsg("animation_speed_request")));

		//wait for document to be ready
		$(document).ready(updateFilters());
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
				animationSpeed = curAnimationSpeed;

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
				info: "block_btn_modified",
				block_btn_visibility: <bbv>
			}
			where <bbv> is boolean
			*/

			if(msg.content.info === "block_btn_modified"){
				//requests initial context and the initial visibility of block-btn, afterwards update filters (for the first time on this tab-id)
				init();
			}else if(msg.content.info === "animation_speed_modified"){
				curAnimationSpeed = parseInt(msg.content.animation_speed);
			}
		}
	});

	init();
}
