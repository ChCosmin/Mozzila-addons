//messange sending template
function sendMsg(key, msg) {
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

//onMessage function
function addToStorage(request) {
    if (request.imgLink) {
        browser.storage.sync.get("imgLink").then((list) => {
            let tempList = list.imgLink;
            tempList.push(request.imgLink);
            browser.storage.sync.set({
                imgLink: tempList
            });
        })
    } else if (request.removeLink) {
        browser.storage.sync.get("imgLink").then((list) => {
            let tempList = list.imgLink.reverse();
            var x = tempList.indexOf(request.removeLink)
            if (x !== -1) {
                tempList.splice(x, 1);
            }
            browser.storage.sync.set({
                imgLink: tempList
            });

        })
    }

    if (request.isGallery === 'isGallery') {
        browser.storage.sync.set({
            gallery: "true"
        });
    } else if (request.isGallery === 'isntGallery' || request.refreshed === "refreshed") {
        browser.storage.sync.set({
            gallery: "false"
        });
    }

    if (request.refreshed === "refreshed") {
        sendMsg('pageRefresh', '')
    }

    var notifMsg = ['notifGallery', 'notifEnable', 'notifDisable', 'notifFavorites', 'notifClear']
    if (notifMsg.includes(request.notif)) {
        var title = browser.i18n.getMessage("extensionTitle");
        var content = browser.i18n.getMessage(request.notif);
        browser.notifications.create(request.notif, {
            "type": "basic",
            "iconUrl": browser.extension.getURL("./icons/zoomimg-48.png"),
            "title": title,
            "message": content
        })
    }
}

//clear notifications 3 secconds after it apperead
function clearNotification(itemId) {
    browser.notifications.getAll().then((all) => {
        setTimeout(function() {
           browser.notifications.clear(itemId); 
        }, 3000);
    })
}


function initStorage() {
    browser.storage.sync.get().then((x) => {
        if (Object.keys(x).length === 0 && x.constructor === Object) {
            browser.storage.sync.set({
                delay: "2000",
                color: "#ffffff",
                scale: "1.5",
                titleColor: "#000000",
                favColor: "#ffffff",
                favTitleColor: "#000000",
                radioGalery: "2",
                favRadioGalery: "2",
                onoff: ["button", "disabled"],
                imgLink: [],
                gallery: "false"
            });
        }
    })
}

//shortcut commands
function shortcuts(command) {
    if (command === 'toggle-onoff') {
        browser.storage.sync.get().then((x) => {
            if (x.onoff[1] === 'enabled') {
                browser.storage.sync.set({
                    onoff: ['button', 'disabled']
                })
                sendMsg('disabled', 'disabled');
            } else if (x.onoff[1] === 'disabled') {
                browser.storage.sync.set({
                    onoff: ['button', 'enabled']
                })
                sendMsg('enabled', 'enabled')
            }
        })
    }

    if (command === 'toggle-gallery') {
        browser.storage.sync.get().then((x) => {
            if (x.gallery === "false") {
                sendMsg('gallery', '')
            } else if (x.gallery === "true") {
                sendMsg('clear', '')
            }
        })

    }

    if (command === 'toggle-favorites') {
        var favURL = browser.extension.getURL("background/favorites.html");
        browser.tabs.create({
            url: favURL
        });
    }

    if (command === 'toggle-options') {
        browser.runtime.openOptionsPage();
        location.reload();
    }
}

document.addEventListener('DOMContentLoaded', initStorage);
browser.notifications.onShown.addListener(clearNotification);
browser.commands.onCommand.addListener(shortcuts);
browser.runtime.onMessage.addListener(addToStorage);