{
	const SENDER = "bug_controller";

	//creates "url_request"-message for background_bug_report
	function createURLRequestMsg() {
		return {
			sender: SENDER,
			receiver: "background_bug_report",
			content: "url_request"
		};
	}

	//creates "html_data_request"-message for background_bug_report
	function createHTMLDataRequestMsg() {
		return {
			sender: SENDER,
			receiver: "background_bug_report",
			content: "html_data_request"
		};
	}

	//creates a "savefile_export_request"-message for background_savefile_export
	function createSavefileExportRequestMsg() {
	    return {
	        sender: SENDER,
	        receiver: "background_savefile_export",
	        content: "savefile_export_request"
	    };
	}
}
