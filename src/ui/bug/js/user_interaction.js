const SENDER = "bug_user_interaction";

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

document.getElementById("readMoreLink").addEventListener("click", function(){
    $("#readMoreBlock").slideToggle(200);
});

document.getElementById("downloadReportBtn").addEventListener('click', async function (event) {

    let name = document.getElementById("nameInput").value;
    let email = document.getElementById("emailInput").value;
    let bugDescription = document.getElementById("bugDescriptionInput").value;

    if(bugDescription.length < 5){
        document.getElementById("bugDescriptionErrText").style.display = "block";
        document.getElementById("bugDescriptionInput").setCustomValidity("Please describe the bug in (at least) a few words.");
        return;
    }

	let url = await browser.runtime.sendMessage(createURLRequestMsg());
	let htmlData = await browser.runtime.sendMessage(createHTMLDataRequestMsg());
	let savefileJSON = await browser.runtime.sendMessage(createSavefileExportRequestMsg());

    let useragent = navigator.userAgent;
    let language = navigator.language;
    let languages = navigator.languages;

	let manifest = browser.runtime.getManifest();
    let addOnVersion = manifest.version;

    let d = new Date();
    let date = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear() + " " + d.getHours() + ":" + d.getMinutes() + ":" + d.getSeconds();
    let filename = "CB_Bug_" + d.getDate() + "_" + (d.getMonth() + 1) + "_" + d.getFullYear() + "_" + d.getHours() + "_" + d.getMinutes() + "_" + d.getSeconds() + ".html";

    download(`<!--
date: "${date}",
browser: "${useragent}",
language: "${language}",
languages: "${languages}",
CB version: "${addOnVersion}",
name: "${name}",
email: "${email}",
bugDescription: "${bugDescription}",
url: "${url}",
config: ${savefileJSON}
-->

${htmlData}`, filename, ".html");
});
