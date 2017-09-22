
var button = document.querySelectorAll('.wrapper > button');
console.log(button);

// $.ajax()

for(var i=0;i<button.length;i++){
    button[i].addEventListener('click', function(e){
        var getColor = e.target.id;
        // var css = "body { background-color:"+getColor+"}";

        browser.tabs.executeScript(null, {file:"/content_scripts/rainbow.js"});

        var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
        gettingActiveTab.then((tabs) => {
          browser.tabs.sendMessage(tabs[0].id, {css: getColor});
        });            
    })
}
