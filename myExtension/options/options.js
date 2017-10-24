function saveOptions(e) {
    e.preventDefault();
    let tempDelay = document.querySelector("#optionsDelay").value,
        tempColor = document.querySelector("#optionsColor").value,
        tempScale = document.querySelector("#optionsScale").value,
        tempTitleColor = document.querySelector("#optionsTitleColor").value,
        tempRadio = document.querySelector('input[name=imgNr]:checked').value,
        favRadio = document.querySelector('input[name=favImgNr]:checked').value,
        favColor = document.querySelector("#favColor").value,
        favTitleColor = document.querySelector("#favTitleColor").value;
    browser.storage.sync.set({
        delay: tempDelay,
        color: tempColor,
        scale: tempScale,
        titleColor: tempTitleColor,
        favColor: favColor,
        favTitleColor: favTitleColor,
        radioGalery: tempRadio,
        favRadioGalery: favRadio
    });
}

function restoreOptions() {
    var gettingItem = browser.storage.sync.get();
    gettingItem.then((res) => {
        document.querySelector("#optionsDelay").value = res.delay;
        document.querySelector("#optionsScale").value = res.scale;
        document.querySelector("#optionsColor").value = res.color;;
        document.querySelector("#optionsTitleColor").value = res.titleColor;
        document.querySelector(`input[name=imgNr][value="${res.radioGalery}"]`).checked = true;
        document.querySelector(`input[name=favImgNr][value="${res.favRadioGalery}"]`).checked = true;
        document.querySelector("#favColor").value = res.favColor;
        document.querySelector("#favTitleColor").value = res.favTitleColor;
    });

}

document.addEventListener('DOMContentLoaded', restoreOptions);
document.querySelector("form").addEventListener("submit", saveOptions);