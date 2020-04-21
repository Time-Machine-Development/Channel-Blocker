//a reflection of await STORAGE.get("config") in background, containing all and only key/value-pairs which are content-related
let contentConfig;

{
	SENDER = "content_config";

	function createContentConfigRequestMsg(){
		return {
			sender: SENDER,
			receiver: "background_config_storage",
			info: "content_config_request"
		};
	}

	//returns an object containing the same key/value-pairs as DEFAULT_CONFIG, excluding all where key represents a non-content-related configId
	function createContentConfigFromDefaultConfig(){
		return Object.entries(ConfigId).reduce((acc, [key, val]) => {
			if(key.substr(0, 7) === "CONTENT"){
				acc[val] = DEFAULT_CONFIG[val];
			}

			return acc;
		},
		{});
	}

	//init. contentConfig with its default values
	contentConfig = createContentConfigFromDefaultConfig();

	//update contentConfig with its current values
	browser.runtime.sendMessage(createContentConfigRequestMsg()).then((updatedContentConfig) => {
		contentConfig = updatedContentConfig;
		console.log(contentConfig);
	});

	//init. CSS for block-buttons
	try {
		initBlockBtnCSS();
	} catch (error) {
		console.log(error);
	}

	/*
	INSTALLING LISTENER FOR MESSAGES FROM background-scripts
	*/

	browser.runtime.onMessage.addListener((msg, sender) => {
		if(msg.receiver !== SENDER)
			return;

		if(msg.info === "content_config_storage_modified"){
			/* msg.content is of the form:
			{
				config_id: <Config ID>,
				config_val: <Config Value>
			}
			where <Config ID> is of Object.values(ConfigId) and is content-related.
			*/

			if(msg.sender === "background_config_storage"){
				contentConfig[msg.content.config_id] = msg.content.config_val;

				updateBlockBtnCSS();
				console.log(contentConfig);
			}
		}
	});
}
