{
	const SENDER = "config_config_user_interaction";

	function createConfigValueSetMsg(configId, configVal) {
		return {
			sender: SENDER,
			receiver: "background_config_storage",
			info: "config_value_set",
			content: {
				config_id: configId,
				config_val: configVal
			}
		};
	}

	function createConfigValueResetMsg() {
		return {
			sender: SENDER,
			receiver: "background_config_storage",
			info: "config_value_reset"
		};
	}

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

	function createSavefileExportRequestMsg() {
		return {
			sender: SENDER,
			receiver: "background_savefile_export",
			info: "savefile_export_request"
		};
	}

	//handle the event from the DesignSelect
	//send a massage to the background to activate/deactivate the page design
	function configPageDesignSelectHandler(e) {
		//tell the user agent that if the event does not get explicitly handled
		e.preventDefault();

		//send a msg to the background_config_storage to activate/deactivate the advanced view
		browser.runtime.sendMessage(createConfigValueSetMsg(ConfigId.CONFIG_PAGE_DESIGN, document.getElementById("DesignSelect").value));
	}

	//handle the event from the configAdvancedViewCheckbox
	//send a massage to the background to activate/deactivate the advanced view
	function configAdvancedViewCheckboxHandler(e) {
		//tell the user agent that if the event does not get explicitly handled
		e.preventDefault();

		//send a msg to the background_config_storage to activate/deactivate the advanced view
		browser.runtime.sendMessage(createConfigValueSetMsg(ConfigId.CONFIG_ADVANCED_VIEW, document.getElementById("configAdvancedViewCheckbox").checked));
	}

	//handle the event from the configPopupCheckbox
	//send a massage to the background to activate/deactivate the Popup
	function configPopupCheckboxHandler(e) {
		//tell the user agent that if the event does not get explicitly handled
		e.preventDefault();
		//send a msg to the background_config_storage to activate/deactivate the BtnVisibility
		browser.runtime.sendMessage(createConfigValueSetMsg(ConfigId.USE_POPUP, document.getElementById("configPopupCheckbox").checked));
	}

	//handle the event from the configBtnVisibilityCheckbox
	//send a massage to the background to activate/deactivate the BtnVisibility
	function configBtnVisibilityCheckboxHandler(e) {
		//tell the user agent that if the event does not get explicitly handled
		e.preventDefault();
		//send a msg to the background_config_storage to activate/deactivate the BtnVisibility
		browser.runtime.sendMessage(createConfigValueSetMsg(ConfigId.CONTENT_BLOCK_BTN_VISIBILITY, document.getElementById("configBtnVisibilityCheckbox").checked));
	}

	//handle the event from the configBlockVideosOnVideopageCheckbox
	//send a massage to the background to activate/deactivate blocking on videopage
	function configBlockVideosOnVideopageCheckboxHandler(e) {
		//tell the user agent that if the event does not get explicitly handled
		e.preventDefault();
		//send a msg to the background_config_storage to activate/deactivate blocking on videopage
		browser.runtime.sendMessage(createConfigValueSetMsg(ConfigId.CONTENT_BLOCK_VIDEOS_ON_VIDEOPAGE_VISIBILITY, document.getElementById("configBlockVideosOnVideopageCheckbox").checked));
	}

	//handle the event from the configBtnColor
	//send a massage to the background to change the color of the block btns
	function configBtnColorHandler(e) {
		//tell the user agent that if the event does not get explicitly handled
		e.preventDefault();
		//send a msg to the background_config_storage to change the color of the block btns
		browser.runtime.sendMessage(createConfigValueSetMsg(ConfigId.CONTENT_BLOCK_BTN_COLOR, document.getElementById("configBtnColor").value));
	}

	//handle the event from the configAnimationSpeedSlider
	//send a massage to the background to change the size of the block btns
	function configAnimationSpeedSliderHandler(e) {
		//tell the user agent that if the event does not get explicitly handled
		e.preventDefault();
		//send a msg to the background_config_storage to change the size of the block btns
		browser.runtime.sendMessage(createConfigValueSetMsg(ConfigId.CONTENT_ANIMATION_SPEED, document.getElementById("configAnimationSpeedSlider").value));
	}

	//handle the event from the configBtnSizeSliderHandler
	//send a massage to the background to change the size of the block btns
	function configBtnSizeSliderHandler(e) {
		//tell the user agent that if the event does not get explicitly handled
		e.preventDefault();
		//send a msg to the background_config_storage to change the size of the block btns
		browser.runtime.sendMessage(createConfigValueSetMsg(ConfigId.CONTENT_BLOCK_BTN_SIZE, document.getElementById("configBtnSizeSlider").value));
	}

	//handle the event from the exportBtn
	//send a massage to the background to export a savefile
	async function exportBtnHandler() {
		//export the savefile;
		let d = new Date();
		let savefileJSON = await browser.runtime.sendMessage(createSavefileExportRequestMsg());
		download(savefileJSON, "ChannelBlocker " + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + ".save" ,".save");
	}

	//handle the event from the resetBtn
	//reset
	function resetBtnHandler() {
		browser.runtime.sendMessage(createConfigValueResetMsg());
	}

	//set all configboxes unviable and set the selected configboxe viable
	function containerSelectHandler() {
		document.getElementById("0").style.display = "none";
		document.getElementById("1").style.display = "none";
		document.getElementById("2").style.display = "none";
		document.getElementById("3").style.display = "none";
		document.getElementById("4").style.display = "none";

		let selectValue = document.getElementById("containerSelect").value;
		document.getElementById(selectValue).style.display = "block";
	}

	//change the css-style of the config page
	function changePageDesign(configValue) {
		document.getElementById("DesignSelect").value = configValue;
		if (configValue === "0") {
            document.getElementById("css").href = "../../shared/css/dark_root.css";
        } else if (configValue === "1") {
            document.getElementById("css").href = "../../shared/css/light_root.css";
		}
	}

	//show the advanced view and display the right filterbox
	function changeAdvancedView(configValue) {
		document.getElementById("configAdvancedViewCheckbox").value = configValue;
		if (configValue) {
			document.getElementById("containerHeadline").style.display = "none";
			document.getElementById("containerSelect").style.display = "block";
			containerSelectHandler();
		} else {
			document.getElementById("containerHeadline").style.display = "block";
			document.getElementById("containerSelect").style.display = "none";

			document.getElementById("0").style.display = "block";
			document.getElementById("1").style.display = "none";
			document.getElementById("2").style.display = "none";
			document.getElementById("3").style.display = "none";
			document.getElementById("4").style.display = "none";
		}
		document.getElementById("configAdvancedViewCheckbox").checked = configValue;
	}


	//change the configPopupCheckbox
	function changePopup(configValue) {
		document.getElementById("configPopupCheckbox").value = configValue;
		document.getElementById("configPopupCheckbox").checked = configValue;
	}

	//change the configBtnVisibilityCheckbox
	function changeBtnVisibility(configValue) {
		document.getElementById("configBtnVisibilityCheckbox").value = configValue;
		document.getElementById("configBtnVisibilityCheckbox").checked = configValue;
	}

	//change the configBlockVideosOnVideopageCheckbox
	function changeBlockVideosOnVideopage(configValue) {
		document.getElementById("configBlockVideosOnVideopageCheckbox").value = configValue;
		document.getElementById("configBlockVideosOnVideopageCheckbox").checked = configValue;
	}

	//change the configBtnColor
	function changeBtnColor(configValue) {
		document.getElementById("configBtnColor").value = configValue;
			document.getElementById("cpBtn").style.background = configValue;
		document.getElementById("showColorBtn").style.stroke = configValue;
	}

	//change the animationSpeed
	function changeAnimationSpeed(configValue) {
		document.getElementById("configAnimationSpeedSlider").value = configValue;
	}

	//change the configBtnSizeSlider
	function changeBtnSize(configValue) {
		document.getElementById("configBtnSizeSlider").value = configValue;
		document.getElementById("showSizeBtn").style.width = configValue * 0.01 + "em";
	}

	/*
	INSTALLING LISTENER FOR EVENTS FROM userinteraction
	 */

	//define behavior for changing the DesignSelect
	document.getElementById("DesignSelect").onchange = function (event) {
		configPageDesignSelectHandler(event);
	};

	//define behavior for clicking the configAdvancedViewCheckbox
	document.getElementById("configAdvancedViewCheckbox").addEventListener('click', function (event) {
		configAdvancedViewCheckboxHandler(event);
	});

	//define behavior for clicking the configPopupCheckbox
	document.getElementById("configPopupCheckbox").addEventListener('click', function (event) {
		configPopupCheckboxHandler(event);
	});

	//define behavior for clicking the configBtnVisibilityCheckbox
	document.getElementById("configBtnVisibilityCheckbox").addEventListener('click', function (event) {
		configBtnVisibilityCheckboxHandler(event);
	});

	//define behavior for clicking the configBlockVideosOnVideopageCheckbox
	document.getElementById("configBlockVideosOnVideopageCheckbox").addEventListener('click', function (event) {
		configBlockVideosOnVideopageCheckboxHandler(event);
	});

	//define behavior for changing the color
	document.getElementById("configBtnColor").onchange = configBtnColorHandler;

	//define behavior for changing the configBtnSizeSlider
	document.getElementById("configBtnSizeSlider").onchange = configBtnSizeSliderHandler;

	//define behavior for changing the configAnimationSpeedSlider
	document.getElementById("configAnimationSpeedSlider").onchange = configAnimationSpeedSliderHandler;

	//define behavior for changing the containerSelect
	document.getElementById("containerSelect").onchange = containerSelectHandler;

	//define behavior for exportBtn
	document.getElementById("exportBtn").addEventListener('click', exportBtnHandler);

	//define behavior for exportBtn
	document.getElementById("resetBtn").addEventListener('click', resetBtnHandler);

	//send a config_value_request
	async function initRequests() {
		let val = await browser.runtime.sendMessage(createConfigValueRequestMsg(ConfigId.CONFIG_PAGE_DESIGN));
		changePageDesign(val);

		//AdvancedView
		val = await browser.runtime.sendMessage(createConfigValueRequestMsg(ConfigId.CONFIG_ADVANCED_VIEW));
		changeAdvancedView(val);


		val = await browser.runtime.sendMessage(createConfigValueRequestMsg(ConfigId.USE_POPUP));
		changePopup(val);

		val = await browser.runtime.sendMessage(createConfigValueRequestMsg(ConfigId.CONTENT_BLOCK_BTN_VISIBILITY));
		changeBtnVisibility(val);

		val = await browser.runtime.sendMessage(createConfigValueRequestMsg(ConfigId.CONTENT_BLOCK_VIDEOS_ON_VIDEOPAGE_VISIBILITY));
		changeBlockVideosOnVideopage(val);

		val = await browser.runtime.sendMessage(createConfigValueRequestMsg(ConfigId.CONTENT_BLOCK_BTN_COLOR));
		changeBtnColor(val);

		val = await browser.runtime.sendMessage(createConfigValueRequestMsg(ConfigId.CONTENT_BLOCK_BTN_SIZE));
		changeBtnSize(val);


		val = await browser.runtime.sendMessage(createConfigValueRequestMsg(ConfigId.CONTENT_ANIMATION_SPEED));
		changeAnimationSpeed(val);
	}

	initRequests();

	/*
	INSTALLING LISTENER FOR MESSAGES FROM background-scripts
	 */

	browser.runtime.onMessage.addListener((msg, sender) => {
		if (msg.receiver !== SENDER)
			return;

		if (msg.sender === "background_config_storage") {
			if (msg.content.info === "config_storage_modified") {
				/* msg.content is of the form:{
				info: "config_storage_modified",
				config_id: <cid>,
				config_val: <cval>
				}
				where <cid> is a value of ConfigId
				 */

				//react on config-storage modification
				if (msg.content.config_id === ConfigId.CONFIG_PAGE_DESIGN) {
					changePageDesign(msg.content.config_val);
				} else if (msg.content.config_id === ConfigId.CONFIG_ADVANCED_VIEW) {
					changeAdvancedView(msg.content.config_val);
				} else if (msg.content.config_id === ConfigId.USE_POPUP) {
					changePopup(msg.content.config_val);
				} else if (msg.content.config_id === ConfigId.CONTENT_BLOCK_BTN_VISIBILITY) {
					changeBtnVisibility(msg.content.config_val);
				} else if (msg.content.config_id === ConfigId.CONTENT_BLOCK_VIDEOS_ON_VIDEOPAGE_VISIBILITY) {
					changeBlockVideosOnVideopage(msg.content.config_val);
				} else if (msg.content.config_id === ConfigId.CONTENT_BLOCK_BTN_COLOR) {
					changeBtnColor(msg.content.config_val);
				} else if (msg.content.config_id === ConfigId.CONTENT_BLOCK_BTN_SIZE) {
					changeBtnSize(msg.content.config_val);
				} else if (msg.content.config_id === ConfigId.CONTENT_BLOCK_BTN_SIZE) {
					changeAnimationSpeed(msg.content.config_val);
				}
			}
		}
	});
}
