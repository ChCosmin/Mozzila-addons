//vars
let imagesObject = $('img');
var bigImg = [],
    uniqueSrc = [],
    uniqueImgs = [];

//element styles
browser.storage.sync.get("scale").then((rez) => {
    imageStyle = {
        "-webkit-transform": `scale(${rez.scale})`,
        "transform": `scale(${rez.scale})`
    };
});
browser.storage.sync.get("radioGalery").then((rez) => {
    switch (rez.radioGalery) {
        case '1':
            galleryStyle = {
                "width": "100%",
                "box-sizing": "border-box",
                "margin": "20px",
                "border": "3px inset"
            };
            break;
        case '2':
            galleryStyle = {
                "width": "47%",
                "box-sizing": "border-box",
                "margin": "20px",
                "border": "3px inset"
            };
            break;
        case '3':
            galleryStyle = {
                "width": "31%",
                "box-sizing": "border-box",
                "margin": "20px",
                "border": "3px inset"
            };
            break;
        case '4':
            galleryStyle = {
                "width": "22.5%",
                "box-sizing": "border-box",
                "margin": "20px",
                "border": "3px inset"
            };
            break;
        default:
            console.log("Error")
    }

});
browser.storage.sync.get("titleColor").then((rez) => {
    headerStyle = {
        "width": "100%",
        "text-align": "center",
        "margin": "30px 0",
        "font-size": "3em",
        "padding": "5px 0",
        "color": `${rez.titleColor}`,
        "border": "10px solid darkgray",
        "border-style": "inset dashed",
        "border-radius": "10px 10px 0 0",
        'text-shadow': '4px 4px 5px #000000'
    };
});
const containerStyle = {
        "position": "fixed",
        "top": "0",
        "left": "0",
        "height": "100%",
        "width": "100%",
        "background-color": "rgba(0,0,0,0.8)",
        'z-index': "999999999"
    },
    closeBtnStyle = {
        "position": "fixed",
        "bottom": '0',
        "right": '0',
        "width": '100px',
        "height": '100px',
        "border-radius": '20px 0 0 0',
        "font-size": "30px",
        'background': '#3C4057',
        'border': '1px solid #3C4057',
        'font-weight': '700',
        'color': "#ffffff"
    },
    wrapperStyle = {
        "position": "fixed",
        "top": "50%",
        "left": "50%",
        "width": "auto",
        "height": "auto",
        "transform": "translate(-50%,-50%)"
    },
    galleryContainerStyle = {
        "position": "absolute",
        "top": "0",
        "left": "0",
        "height": "100%",
        "width": "100%"
    },
    galleryWrapStyle = {
        "display": "flex",
        "flex-wrap": "wrap",
        "padding": "30px 30px 30px 40px"
    },
    favBtnStyle = {
        "position": "fixed",
        "bottom": '0',
        "left": '0',
        "width": '100px',
        "height": '100px',
        "border-radius": '0 20px 0 0',
        "background-color": "#C0C0C0",
        "color": "#000000"
    },
    favMsgStyle = {
        'position': 'fixed',
        'bottom': '50px',
        'height': '70px',
        'color': 'white',
        'font-size': '0.8em'
    },
    imgWrapStyle = {
        'border': '10px solid darkgray',
        'display': 'flex',
        'flex-wrap': 'wrap',
        'padding': '20px',
        'border-style': 'inset double',
        'border-radius': '10px',
        "justify-content": "space-around",
        "width": '100%'
    },
    dnlBtnStyle = {
        "position": "fixed",
        "bottom": '0',
        "right": '6%',
        "width": '200px',
        "height": '100px',
        "border-radius": '20px 20px 0 0',
        "color": "#ffffff",
        "font-size": "20px",
        'background': '#3C4057',
        'border': '1px solid #3C4057',
        'font-weight': '700'
    };

//create elements
var popContainer = $("<div></div>").css(containerStyle),
    targetWrap = $("<div></div>").attr("id", "wrap").css(wrapperStyle),
    closeBtn = $("<button>X</button>").css(closeBtnStyle),
    tabHeader = $("<h1></h1>"),
    favBtn = $("<button></button>").css(favBtnStyle),
    favIcon = browser.extension.getURL("icons/fav-star.png"),
    favImg = $("<img>").attr({
        src: favIcon,
        height: "50px",
        width: "50px"
    });


//purify
function escapeHTML(str) {
    return str.replace(/[&"'<>]/g, (m) => escapeHTML.replacements[m]);
};
escapeHTML.replacements = {
    "&": "&amp;",
    '"': "&quot;",
    "'": "&#39;",
    "<": "&lt;",
    ">": "&gt;"
};

//capitalise first letter of string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

//clear body
function removeEverything() {
    while (document.body.firstChild) {
        document.body.firstChild.innerHTML = '';
        document.body.firstChild.remove();
    }
}

//filter images, show only those w/ height > 150px
var imageList = Object.keys(imagesObject).map(function (key) {
    if (imagesObject[key].height > 150) {
        bigImg.push(imagesObject[key].src);
    }
})

//filter out the duplicates
function unique(list) {
    var result = [];
    $.each(list, function (i, e) {
        if ($.inArray(e, result) == -1) result.push(e);
    });
    result.map(function (e) {
        let a = $('<img>').attr('src', e);
        uniqueImgs.push(a[0]);
    })
}

//render gallery
function insertGallery() {
    removeEverything();
    browser.runtime.sendMessage({
        isGallery: 'isGallery'
    });
    unique(bigImg);
    var galleryContainer = $('<div></div>').css(galleryContainerStyle),
        galleryWrap = $("<div id='galleryWrap'></div>").css(galleryWrapStyle),
        imgWrap = $("<div></div>").css(imgWrapStyle),
        title = capitalizeFirstLetter(escapeHTML(document.title));
    $(tabHeader).css(headerStyle);
    $(tabHeader).text('All of - ' + title + "'s - loaded images");
    $(uniqueImgs).css(galleryStyle);
    $(galleryWrap).append(tabHeader);
    $(galleryWrap).append(imgWrap);
    $(imgWrap).append(uniqueImgs);
    $(galleryContainer).append(galleryWrap);
    document.body.appendChild(galleryContainer[Object.keys(galleryContainer)[0]]);
    let getImages = $('img')
    browser.storage.sync.get().then((rez) => {
        $('body').css("background-color", rez.color);
        if (rez.onoff[1] === "enabled") {
            zoomOn(getImages);
        } else if (rez.onoff[1] === "disabled") {
            zoomOff(getImages);
        }
    });
}

//zoom 
function pop(img) {
    // browser.runtime.sendMessage({
    //     poped: 'poped'
    // })
    let dnlBtn = $('<button>Download</button>').css(dnlBtnStyle),
        dnlBtnWrap = $('<a></a>').attr({
            "href": escapeHTML(img.src),
            "download": escapeHTML(img.src)
        });
    dnlBtnWrap.html(dnlBtn);
    $(img).css(imageStyle);
    browser.storage.sync.get().then((x) => {
        if (x.gallery === "true") {
            $(img).css('transform', `scale(${parseInt(x.scale)+1})`);
            $(img).parent().css('left', '60%');
        }
    });
    targetWrap[Object.keys(targetWrap)[0]].innerHTML = '';
    targetWrap.append(img);
    popContainer.append(targetWrap);
    favBtn.html(favImg);
    browser.storage.sync.get('imgLink').then((imgList) => {
        if (imgList.imgLink.includes(img.src)) {
            $(favBtn).css({
                'background-color': "#90EE90",
                'border': "1px solid rgb(144, 238, 144)"
            });
            $(favBtn).addClass('faved');
        } else {
            $(favBtn).css({
                'background-color': "#C0C0C0",
                "border": "1px solid #C0C0C0"
            });
            $(favBtn).removeClass('faved');
        }
    });
    popContainer.append(favBtn);
    popContainer.append(closeBtn);
    popContainer.append(dnlBtnWrap);
    document.body.append(popContainer[0]);

    closeBtn.click(function (e) {
        $(e.target).parent().remove();
        $(popContainer).empty();
        $(targetWrap).empty();
    })

    favBtn.click(function (e) {
        if ($(e.target).hasClass('faved')) {
            const favMsg = $('<span id="unsaved">Deleted from favorites</span>').css(favMsgStyle);
            let favLink = $('#wrap img')[0].src;
            $(e.target).removeClass('faved');
            $(e.target).css('background-color', "#C0C0C0");
            $(e.target).parent().append(favMsg);
            $(favMsg).fadeOut(2000);
            browser.runtime.sendMessage({
                removeLink: favLink
            });
        } else {
            const favMsg = $('<span id="saved">Saved to favorites!</span>').css(favMsgStyle);
            let favLink = $('#wrap img')[0].src;
            $(e.target).addClass('faved');
            $(e.target).css('background-color', "#90EE90");
            $(e.target).parent().append(favMsg);
            $(favMsg).fadeOut(2000);
            browser.runtime.sendMessage({
                imgLink: favLink
            });
        }
    })
}

// activate zoom
function zoomOn(list) {
    browser.storage.sync.get("delay").then((rez) => {
        let myTimeout;
        list.mouseenter(function (e) {
            if (e.target.height > 50) {
                $(e.target).css("border", '3px solid yellow');
                myTimeout = setTimeout(function () {
                    var targetCloneObj = $(e.target).clone();
                    var actualClone = targetCloneObj[Object.keys(targetCloneObj)[0]];
                    $(actualClone).css("border", 'none');
                    pop(actualClone);
                }, rez.delay);
            }

        }).mouseleave(function (e) {
            $(e.target).css("border", 'none');
            clearTimeout(myTimeout);
        })
    })
}

//disable zoom
function zoomOff(list) {
    $(list).off("mouseenter");
}

function refresh() {
    location.reload();
    browser.runtime.sendMessage({
        isGallery: 'isntGallery'
    });
}

//master func that listens to messages
function menuList(request) {
    let key = Object.keys(request)[0];
    switch (key) {

        case "gallery":
            browser.runtime.sendMessage({
                notif: 'notifGallery'
            });
            insertGallery();

            break;

        case "clear":
            browser.runtime.sendMessage({
                notif: 'notifClear'
            });
            refresh();

            break;

        case "disabled":
            browser.storage.sync.get().then((x) => {
                browser.runtime.sendMessage({
                    notif: 'notifDisable'
                });
                if (x.gallery === "true") {
                    let getImages = $('img');
                    zoomOff(getImages);
                } else {
                    zoomOff(imagesObject);
                }

            })

            break;

        case "enabled":
            browser.storage.sync.get().then((x) => {
                browser.runtime.sendMessage({
                    notif: 'notifEnable'
                });
                if (x.gallery === "true") {
                    let getImages = $('img');
                    zoomOn(getImages);
                } else {
                    zoomOn(imagesObject);
                }

            })

            break;

        case "pageRefresh":
            browser.storage.sync.get().then((x) => {
                browser.runtime.sendMessage({
                    isGallery: 'isntGallery'
                });
                if (x.onoff[1] === "enabled") {
                    zoomOn(imagesObject);
                } else if (x.onoff[1] === "disabled") {
                    zoomOff(imagesObject);
                }
            })
            break;
        default:
            alert("Something went wrong! Please notify the problem at cosmin.chinde@gmail.com");
    }
}

//send signal every time page refreshes
if (performance.navigation.type == 1) {
    browser.runtime.sendMessage({
        refreshed: 'refreshed'
    });
} else {
    console.info("This page is not reloaded");
}

browser.runtime.onMessage.addListener(menuList);