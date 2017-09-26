function doStuff(request, sender, sendResponse){

    if (request["color"]){
        changeColor(request.color);
    } else if(request["data"]){
        showData(request.data);
    } else {
        insertInput();
    }

}

function changeColor(color){ 
   $("body").css("background-color",color);   
}

function insertInput(){   
    var input = $('<input id="search" type="text">');
    $('header *').first().append(input);
    input.keyup(getInputData);
}

function getInputData(){   
    var inputData = $('#search').val();  
    browser.runtime.sendMessage({'input': inputData}).then(showData);
}

function showData(message){
    var inputWrap = $('<div id="inputContent" style="font:20px; color: red"></div>');
    $('#search').parent().append(inputWrap);
    inputWrap.empty();
    inputWrap.html(message);
   
}

browser.runtime.onMessage.addListener(doStuff);


// implementarea functiei getInputData()
// trimitere msg la bg.js cu continutul inputlui 
// prmire rasp de la bg.js
// afisare rasp de la bg.js folosing jquery.innerHTML
