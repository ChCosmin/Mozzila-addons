//vars
var myTimeout;
var imagesObject = $('img');
var bigImg = [];
let uniqueSrc = [];
var uniqueImgs = [];


//element styles
browser.storage.sync.get("scale").then((rez) => {
    imageStyle = {
        "-webkit-transform": `scale(${rez.scale})`,
        "transform": `scale(${rez.scale})`
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
};
const closeBtnStyle = {
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
};
const wrapperStyle = {
    "position": "fixed",
    "top": "50%",
    "left": "50%",
    "width": "auto",
    "height": "auto",
    "transform": "translate(-50%,-50%)"
};
const galleryContainerStyle = {
    "position": "absolute",
    "top": "0",
    "left": "0",
    "height": "100%",
    "width": "100%"
};
const galleryWrapStyle = {
    "display": "flex",
    "flex-wrap": "wrap",
    "padding": "30px 30px 30px 40px"
};
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
const favBtnStyle = {
    "position": "fixed",
    "bottom": '0',
    "left": '0',
    "width": '100px',
    "height": '100px',
    "border-radius": '0 20px 0 0',
    "background-color": "#C0C0C0",
    "color": "#000000"
}
const favMsgStyle = {
    'position': 'fixed',
    'bottom': '50px',
    'height': '70px',
    'color': 'white',
    'font-size': '0.8em'
}
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
const imgWrapStyle = {
    'border': '10px solid darkgray',
    'display': 'flex',
    'flex-wrap': 'wrap',
    'padding': '20px',
    'border-style': 'inset double',
    'border-radius': '10px',
    "justify-content": "space-around",
    "width": '100%'
}
const dnlBtnStyle = {
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
}

//create elements
var popContainer = $("<div></div>").css(containerStyle);
var targetWrap = $("<div></div>").attr("id", "wrap").css(wrapperStyle);
var closeBtn = $("<button>X</button>").css(closeBtnStyle);
var tabHeader = $("<h1></h1>");
var favBtn = $("<button></button>").css(favBtnStyle);
var favIcon = browser.extension.getURL("icons/fav-star.png");
var favImg = $("<img>").attr({
    src: favIcon,
    height: "50px",
    width: "50px"
});

//purify
function escapeHTML(str) { return str.replace(/[&"'<>]/g, (m) => escapeHTML.replacements[m]); }
escapeHTML.replacements = { "&": "&amp;", '"': "&quot;", "'": "&#39;", "<": "&lt;", ">": "&gt;" };
//capitalise first letter of string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
//clear body
function removeEverything() {
    while (document.body.firstChild) {
        document.body.firstChild.remove();
    }
}
//filter images, show only those w/ height > 100
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
    unique(bigImg);
    var galleryContainer = $('<div></div>').css(galleryContainerStyle);
    var galleryWrap = $("<div></div>").css(galleryWrapStyle);
    var imgWrap = $("<div></div>").css(imgWrapStyle);
    var title = capitalizeFirstLetter(escapeHTML(document.title));
    $(tabHeader).css(headerStyle);
    $(tabHeader).text('All of - ' + title + "'s - loaded images");
    browser.storage.sync.get("color").then((rez) => {
        $('body').css("background-color", rez.color);
    });
    $(uniqueImgs).css(galleryStyle);
    $(galleryWrap).append(tabHeader);
    $(galleryWrap).append(imgWrap);
    $(imgWrap).append(uniqueImgs);
    $(galleryContainer).append(galleryWrap);
    document.body.appendChild(galleryContainer[Object.keys(galleryContainer)[0]]);
}
//zoom 
function pop(img) {
    let dnlBtn = $('<button><button>').css(dnlBtnStyle);
    dnlBtn.text("Download");
    let dnlBtnWrap = $('<a></a>');
    dnlBtnWrap.append(dnlBtn);
    dnlBtnWrap.attr({
        "href": img.src,
        "download": img.src
    });
    $(img).css(imageStyle);
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
        $(targetWrap).empty();
    })

    favBtn.click(function (e) {
        if ($(e.target).hasClass('faved')) {
            const favMsg = $('<span id="unsaved">Deleted from favorites</span>').css(favMsgStyle);
            let favLink = $('#wrap img')[0].src;
            $(e.target).css('background-color', "#C0C0C0");
            $(e.target).removeClass('faved');
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
// zoom delay
browser.storage.sync.get("delay").then((rez) => {
    imagesObject.mouseenter(function (e) {
        $(e.target).css("border", '3px solid yellow');
        myTimeout = setTimeout(function () {
            var targetCloneObj = $(e.target).clone();
            var actualClone = targetCloneObj[Object.keys(targetCloneObj)[0]];
            $(actualClone).css("border", 'none');
            pop(actualClone);
        }, rez.delay);
    }).mouseleave(function (e) {
        $(e.target).css("border", 'none');
        clearTimeout(myTimeout);
    })
})
//master func that listens to messajes
function menuList(request) {
    let key = Object.keys(request)[0];
    switch (key) {
        case "gallery":
            removeEverything();
            insertGallery();
            break;
        case "clear":
            location.reload();
            break;
        default:
            alert(" Something went wrong...ops :( ")
    }
}

browser.runtime.onMessage.addListener(menuList);