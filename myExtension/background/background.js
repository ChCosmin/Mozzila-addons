function addToStorage(request){
    if(request.imgLink){
        browser.storage.sync.get("imgLink").then((list) => {
            let tempList = list.imgLink;
            tempList.push(request.imgLink);
            browser.storage.sync.set({
                imgLink: tempList
            });
        })       
    } else if(request.removeLink){
        browser.storage.sync.get("imgLink").then((list) => {
            let tempList = list.imgLink.reverse();
            var x = tempList.indexOf(request.removeLink)
            if(x !== -1){
                tempList.splice(x, 1);
            }
            browser.storage.sync.set({
                imgLink: tempList
            });
            
        })
    } 
}

function initStorage(){
    browser.storage.sync.get().then((x)=>{
        if(Object.keys(x).length === 0 && x.constructor === Object){
            browser.storage.sync.set({
                delay: "2000",
                color: "#ffffff",
                scale: "1.5",
                titleColor: "#000000",
                favColor: "#ffffff",
                favTitleColor: "#000000",
                radioGalery: "2",
                favRadioGalery: "2",
                imgLink: []
            });
        }
    })
}
document.addEventListener('DOMContentLoaded', initStorage);
browser.runtime.onMessage.addListener(addToStorage);