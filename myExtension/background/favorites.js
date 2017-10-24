var favHeaderStyle = {
    "width": "100%",
    "text-align": "center",
    "margin": "30px 0 0 0",
    "font-size": "3em",
    "padding": "10px 0",
    "border": "10px solid darkgray",
    "border-style": "inset dashed",
    "border-radius": "10px 10px 0 0",
    'text-shadow': '4px 4px 5px #000000',
}
const favContainerStyle = {
    "position": "absolute",
    "top": "0",
    "left": "0",
    "height": "100%",
    "width": "100%"
};
const favWrapStyle = {
    "display": "flex",
    "flex-wrap": "wrap",
    "padding": "30px 30px 30px 40px"
};
browser.storage.sync.get("favRadioGalery").then((rez) => {
    switch(rez.favRadioGalery) {
        case '1':
        favStyle = {
            "width": "100%",
            "box-sizing": "border-box",
            "margin": "20px",
            "border": "3px inset"
        };
            break;
        case '2':
        favStyle = {
            "width": "47%",
            "box-sizing": "border-box",
            "margin": "20px",
            "border": "3px inset"
        };
            break;
        case '3':
        favStyle = {
            "width": "31%",
            "box-sizing": "border-box",
            "margin": "20px",
            "border": "3px inset"
        };
            break;
        case '4':
        favStyle = {
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
const btnDel = {
    'height': "30px",
    'width': "300px",
    "font-size": "20px",
    'margin': '0px auto 10px',
    "border": "none",
    "border-radius": "0 0 10px 10px",
    "background-color": "#E8E8E8"
}
const notifStyle = {
    "display": "block",
    "width": "100%",
    "text-align": "center",
    "margin": "0",
    "font-size": "0.3em"
}
const imgWrapStyle = {
    'border': '10px solid darkgray',
    'display': 'flex',
    'flex-wrap': 'wrap',
    'padding': '20px',
    'border-style': 'inset double',
    'border-radius': '10px',
    "justify-content": "space-around",
    "width": "100%"
}

var favHeader = $('<h1></h1>');
var notif = $('<h5></h5>');
var sidebar = $('<button>Delete images</button>');

function deleteButton() {
    $('.favImg').on("dblclick", function (e) {
        if($(e.target).hasClass('selected')){
            $(e.target).removeClass('selected');
            $(e.target).css("border", "3px inset");
        } else {
            $(e.target).addClass('selected');
            $(e.target).css("border", "3px solid blue");
        }            
    })
    spawnDelBtn();
}

function spawnDelBtn() {
    $(sidebar).css(btnDel);
    $("h1").after(sidebar);
    
    browser.storage.sync.get('imgLink').then((imgList) => {
        $(sidebar).on("click", function () {
            var tempList = [];
            var delList = []
            var unselectedImgs = document.querySelectorAll('img:not(.selected)');
            var selectedImgs = document.querySelectorAll('.selected');            
            unselectedImgs.forEach(function (e) {
                tempList.push(e.src);
            })
            browser.storage.sync.set({imgLink: tempList});
            $(selectedImgs).remove();
        })
    })
}

function insertFavorites() {
    var favContainer = $('<div></div>').css(favContainerStyle);
    var favWrap = $("<div></div>").css(favWrapStyle);
    var imgWrap = $("<div id='imgWrap'></div>").css(imgWrapStyle);
    $(favHeader).css(favHeaderStyle);
    $(favHeader).append('Your favorite images');
    $(favWrap).append(favHeader);
    $(notif).css(notifStyle);
    $(notif).append("Double click images to select them for removal");
    $(favHeader).append(notif);
    browser.storage.sync.get("favTitleColor").then((rez) => {
        $(favHeader).css("color", rez.favTitleColor);
        $(notif).css('color', rez.favTitleColor);
    });
    browser.storage.sync.get("favColor").then((rez) => {
        $('body').css("background-color", rez.favColor);
    });
    $(favWrap).append(imgWrap);
    $(favContainer).append(favWrap);
    browser.storage.sync.get("imgLink").then((imgList) => {
        if(imgList.imgLink.length === 0){    
            $(imgWrap).css("border","none");
        }
        $('body').append(favContainer);          
        imgList.imgLink.map(function (e) {
            var img = $('<img class="favImg">').attr('src', e);
            $(img).css(favStyle);
            $(imgWrap).append(img);
        })
        deleteButton();        
    })

}


document.addEventListener('DOMContentLoaded', insertFavorites);

