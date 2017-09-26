var button = document.querySelectorAll('.wrapper > button:not(#insert)');
var insert = document.getElementById('insert');

var sendMsg = function(){
    browser.tabs.executeScript(null, {file:"/content_scripts/rainbow.js"});

    var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
    gettingActiveTab.then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {'insert' : ''});
    });
    insert.removeEventListener("click", sendMsg);               
}

insert.addEventListener("click", sendMsg);

for(var i=0;i<button.length;i++){
    button[i].addEventListener('click', function(e){
        var getColor = e.target.id;
        browser.tabs.executeScript(null, {file:"/content_scripts/rainbow.js"});

        var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
        gettingActiveTab.then((tabs) => {
            browser.tabs.sendMessage(tabs[0].id, {'color' : getColor});
        });            
    })
}
