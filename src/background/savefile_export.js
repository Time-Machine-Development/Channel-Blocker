{
	const SENDER = "savefile_export";

	async function exportSaveFile() {
		var d = new Date();
		let jFile = {};

		jFile[0] = await STORAGE.get("0");
		jFile[1] = await STORAGE.get("1");
		jFile[2] = await STORAGE.get("2");
		jFile[3] = await STORAGE.get("3");
		jFile[4] = await STORAGE.get("4");
		jFile["config"] = await STORAGE.get("config");

		for (let i = 0; i < 5; i++) {
			jFile[i] = jFile[i][i];
		}
		jFile["config"] = jFile["config"].config;

		let blob = new Blob([JSON.stringify(jFile, null, 2)], {
				type: 'application/json'
			});

		let objUrl = URL.createObjectURL(blob);

		browser.downloads.download({
			url: objUrl,
			filename: "ChannelBlocker " + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + ".save",
			conflictAction: 'uniquify',
			saveAs: true

		});
	}

	/*
	INSTALLING LISTENER FOR MESSAGES FROM config-scripts
	 */

	browser.runtime.onMessage.addListener((msg, sender) => {
		if (msg.receiver !== SENDER)
			return;

		if (msg.sender === "config_config_user_interaction") {
			/* msg is of the form:{
			content = "savefile_export_request";
			}
			 */

			if (msg.content.info === "savefile_export_request") {
				exportSaveFile();
			}
		}
	});
}
