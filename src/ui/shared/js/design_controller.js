{
    const SENDER = "shared_design_controller";

	function createConfigValueRequestMsg(configId) {
		return {
			sender: SENDER,
			receiver: "background_config_storage",
			info: "config_value_request",
			content: {
				config_id: configId
			}
		};
	}

    //request the design of this page
    async function requestDesignStyle(){
        let val = await browser.runtime.sendMessage(createConfigValueRequestMsg(ConfigId.CONFIG_PAGE_DESIGN));
        changePageDesign(val);
    }

    //change the css-style of the config page
    function changePageDesign(configValue) {
        if (configValue === "0") {
            document.getElementById("css").href = "../../shared/css/dark_root.css";
        } else if (configValue === "1") {
            document.getElementById("css").href = "../../shared/css/light_root.css";
        }
    }

    //start a request for the design of the page
    requestDesignStyle();
}
