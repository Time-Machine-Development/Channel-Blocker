//htmlData and url are defined by bug/js/controller.js which is attached by and receives their values by background/bug_report.js after a bug was issue
let htmlData;
let url;

document.getElementById("downloadReportBtn").addEventListener('click', async function (event) {
    let useragent = navigator.userAgent;
    let language = navigator.language;
    let languages = navigator.languages;

	let manifest = browser.runtime.getManifest();
    let addOnVersion = manifest.version;

    let d = new Date();
    let date = d.getDate() + "_" + (d.getMonth() + 1) + "_" + d.getFullYear() + "_" + d.getHours() + "_" + d.getMinutes() + "_" + d.getSeconds();

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

${htmlData}`, "CB_Bug_" + date + ".html" ,".html");
});
