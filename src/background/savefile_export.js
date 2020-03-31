{
	const SENDER = "background_savefile_export";

	async function exportSaveFile() {
		let jFile = await STORAGE.get();

		return JSON.stringify(jFile, null, 2);
	}

	/*
	INSTALLING LISTENER FOR MESSAGES FROM config-scripts
	*/

	browser.runtime.onMessage.addListener((msg, sender) => {
		if (msg.receiver !== SENDER)
			return;

		if (msg.sender === "config_config_user_interaction" || msg.sender === "bug_user_interaction") {
			/* msg is of the form:
			content = "savefile_export_request";
			*/
			if (msg.content === "savefile_export_request") {
				return new Promise((resolve) => {
					resolve(exportSaveFile());
				});
			}
		}
	});
}
