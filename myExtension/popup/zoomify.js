var galleryBtn = $('#gallery');
var clearBtn = $('#clear');
var optionsBtn= $('#options');
var favoritesBtn = $('#favorites');

$(galleryBtn[Object.keys(galleryBtn)[0]]).on("click", function(){    
    var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
    gettingActiveTab.then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {gallery : ''});
    });
    $(galleryBtn[Object.keys(galleryBtn)[0]]).off("click");
})

$(clearBtn[Object.keys(clearBtn)[0]]).on("click", function(){    
    var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
    gettingActiveTab.then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {clear : ''});
    });
    $(galleryBtn[Object.keys(galleryBtn)[0]]).on("click", function(){    
        var gettingActiveTab = browser.tabs.query({active: true, currentWindow: true});
        gettingActiveTab.then((tabs) => {
            browser.tabs.sendMessage(tabs[0].id, {gallery : ''});
        });
        $(galleryBtn[Object.keys(galleryBtn)[0]]).off("click");
    })
})

$(optionsBtn[Object.keys(optionsBtn)[0]]).on("click", function(){    
    browser.runtime.openOptionsPage();
    location.reload();
})

$(favoritesBtn[Object.keys(favoritesBtn)[0]]).on("click", function(){
    var favURL = browser.extension.getURL("background/favorites.html");
    browser.tabs.create({url: favURL});
})
