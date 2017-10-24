var galleryBtn = $('#gallery');
var clearBtn = $('#clear');
var optionsBtn = $('#options');
var favoritesBtn = $('#favorites');
var onoffBtn = $('#onoff');

function sendMsg(key, msg){
    var gettingActiveTab = browser.tabs.query({
        active: true,
        currentWindow: true
    });
    gettingActiveTab.then((tabs) => {
        browser.tabs.sendMessage(tabs[0].id, {
            [key]: [msg]
        });
    });
}
function restorePopup() {
    var gettingItem = browser.storage.sync.get('onoff');
    gettingItem.then((res) => {
        var result = res.onoff;
        if (result[1] === 'enabled') {
            $(onoffBtn).text('Zoom ENABLED');
            onoffBtn.addClass('enabled');
        } else if (result[1] === 'disabled') {
            $(onoffBtn).text('Zoom DISABLED');
            onoffBtn.addClass('disabled');
        } else {
            alert("Something went wrong! Please notify the problem at cosmin.chinde@gmail.com");
        }
    });
    return galleryBtn, clearBtn, optionsBtn, favoritesBtn, onoffBtn;
}

$(galleryBtn[Object.keys(galleryBtn)[0]]).on("click", function () {
    sendMsg('gallery','');
    $(galleryBtn[Object.keys(galleryBtn)[0]]).off("click");
})

$(clearBtn[Object.keys(clearBtn)[0]]).on("click", function () {
    sendMsg('clear','');
    $(galleryBtn[Object.keys(galleryBtn)[0]]).on("click", function () {
        sendMsg('gallery','')
        $(galleryBtn[Object.keys(galleryBtn)[0]]).off("click");
    })
})

$(optionsBtn[Object.keys(optionsBtn)[0]]).on("click", function () {
    browser.runtime.openOptionsPage();
    location.reload();
})

$(favoritesBtn[Object.keys(favoritesBtn)[0]]).on("click", function () {
    var favURL = browser.extension.getURL("background/favorites.html");
    browser.tabs.create({
        url: favURL
    });
})

$(onoffBtn[Object.keys(onoffBtn)[0]]).on("click", function () {
    let onoffValue = onoffBtn[0].classList;
    if ($(onoffBtn)[0].classList.contains("disabled")) {
        onoffBtn.text('Zoom ENABLED');
        onoffBtn.removeClass('disabled').addClass('enabled');
        sendMsg('enabled','');
        browser.storage.sync.set({
            onoff: onoffValue
        });
    } else if ($(onoffBtn)[0].classList.contains("enabled")) {
        onoffBtn.text('Zoom DISABLED');
        onoffBtn.removeClass('enabled').addClass('disabled');
        sendMsg('disabled','');
        browser.storage.sync.set({
            onoff: onoffValue
        });
    } else {
        console.log("Neither enabled nor disabled")
    }
})

document.addEventListener('DOMContentLoaded', restorePopup);