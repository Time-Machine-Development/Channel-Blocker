//htmlData and url are defined by bug/js/controller.js which is attached by and receives their values by background/bug_report.js after a bug was issued
let htmlData;
let url;

document.getElementById("downloadReportBtn").addEventListener('click', async function (event) {
    let useragent = navigator.userAgent;
    let language = navigator.language;
    let languages = navigator.languages;

	let manifest = browser.runtime.getManifest();
    let addOnVersion = manifest.version;

    let d = new Date();
    let date = d.getDate() + "." + (d.getMonth() + 1) + "." + d.getFullYear();

    let name = document.getElementById("nameInput").value;
    let email = document.getElementById("emailInput").value;
    let bugDescription = document.getElementById("bugDescriptionInput").value;

    download(`<!--
date: "${date}",
browser: "${useragent}",
language: "${language}",
languages: "${languages}",
CB version: "${addOnVersion}",
name: "${name}",
email: "${email}",
bugDescribtion: "${bugDescription}",
url: "${url}"
-->

${htmlData}`, "CBreport " + d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate() + ".html" ,".html");
});
