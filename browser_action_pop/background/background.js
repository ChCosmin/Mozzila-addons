function escapeHTML(str) { return str.replace(/[&"'<>]/g, (m) => ({ "&": "&amp;", '"': "&quot;", "'": "&#39;", "<": "&lt;", ">": "&gt;" })[m]); }

function getData(request, sender, sendResponse){
    var param = request.input;
    var url = 'http://carcompanion.16mb.com/backend/script.php?q=';
    $.getJSON(url+param, function(data){
        var actualData = escapeHTML(data.results);
        browser.tabs.executeScript(null, {file:"/content_scripts/rainbow.js"})
        
        var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
        gettingActiveTab.then((tabs) => {
            browser.tabs.sendMessage(tabs[0].id, {'data' : actualData});
        }); 
    })
}   

browser.runtime.onMessage.addListener(getData);


// ascult onMsg de la rainbow.js 
// trimit mesajul la functia getData()
// fac ajax call la serviciu cu url + msg prrimit de la content script input
// parsez mesajul primit de la ajax call
// raspund content scriptului mesajului de mai sus