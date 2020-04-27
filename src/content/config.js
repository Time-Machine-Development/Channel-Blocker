//a reflection of await STORAGE.get(CONTENT_UI_STORAGE_ID)[CONTENT_UI_STORAGE_ID] in background
let contentUIConfig;

{
	SENDER = "content_config";

	function createContentUIConfigRequestMsg(){
		return {
			sender: SENDER,
			receiver: "background_storage_content_ui",
			info: "content_ui_config_request"
		};
	}

	//init. contentUIConfig with its default values
	contentUIConfig = Object.assign({}, DEFAULT_CONTENT_UI_CONFIG);

	//init. CSS for block-buttons
	initBlockBtnCSS();

	//update contentUIConfig with its current values
	browser.runtime.sendMessage(createContentUIConfigRequestMsg())
	.then((updatedContentUIConfig) => {
		contentUIConfig = updatedContentUIConfig;

		updateBlockBtnCSS();
	});

	/*
	INSTALLING LISTENER FOR MESSAGES FROM background-scripts
	*/

	browser.runtime.onMessage.addListener((msg, sender) => {
		if(msg.receiver !== SENDER)
			return;

		if(msg.info === "content_ui_storage_modified"){
			/* msg.content is of the form:
			{
				content_ui_id: <Content UI ID>,
				content_ui_config_val: <Content UI Config Value>
			}
			where <Content UI ID> is of Object.values(ContentUI).
			*/

			if(msg.sender === "background_storage_content_ui"){
				contentUIConfig[msg.content.content_ui_id] = msg.content.content_ui_config_val;

				updateBlockBtnCSS();
			}
		}
	});
}
