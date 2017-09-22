function changeColor(color){  
    $("body").css("background-color",color.css);
}

//inject input in page cu handle de onChange



browser.runtime.onMessage.addListener(changeColor);