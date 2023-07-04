const endpoint = "http://ws.audioscrobbler.com/2.0/";
const leftChoose = $("#left-choose");
const rightChoose = $("#right-choose");

let topAlbums;

leftChoose.on("click", choose);
rightChoose.on("click", choose);

$(document).ready(function(){  
    addAlbumMargins();
     getTopAlbums().then(function(topAlbums){
        placeAlbumImages(topAlbums);
    }).catch(function(error) {
        console.log(error);
    });  
})

function addAlbumMargins(){
    let albums = $(".rightside .album").add($(".leftside .album"));
    for (let i = 1; i < albums.length; i += 2) {
        $(albums[i]).addClass("extra-margin");
    }
}

function getTopAlbums(user="lukaschou", period = "overall", limit="16", apiKey="f8a5d3891863166d8eedf981ab16d679"){
    return new Promise(function(resolve, reject){
        $.ajax({
            url: endpoint + "?method=user.gettopalbums" + `&api_key=${apiKey}` + `&user=${user}` + `&period=${period}`
                + `&limit=${limit}` + `&format=json`,
            contentType: "application/json",
            dataType: 'json',
            success: function(result){
                resolve(result);
            },
            error: function(error){
                reject(error);
            }
        })
    }) 
}

function placeAlbumImages(topAlbums){
    let albumElements = $(".leftside .album img").add($(".rightside .album img"));
    let chooseAlbums = $(".main-album img");

    for(let i=0; i < albumElements.length; i++){
        $(albumElements[i]).attr("src", topAlbums.topalbums["album"][i].image[1]["#text"]);
    }

    $(chooseAlbums[0]).attr("src", topAlbums.topalbums["album"][0].image[2]["#text"])
    $(chooseAlbums[1]).attr("src", topAlbums.topalbums["album"][1].image[2]["#text"])


}

function choose() {
    
}


