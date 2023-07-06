const endpoint = "http://ws.audioscrobbler.com/2.0/";
const leftChoose = $("#left-choose");
const rightChoose = $("#right-choose");
const chooseAlbums = $(".main-album img");
const albumColums = Array.from($(".leftside2 .album img").add($(".rightside2 .album img")))
    .concat(Array.from($(".leftside3 .album img").add($(".rightside3 .album img"))))
    .concat(Array.from($(".leftside4 .album img").add($(".rightside4 .album img"))));
const albumElements = $(".leftside .album img").add($(".rightside .album img"));
const leftLabel = $("#left-label");
const rightLabel = $("#right-label");
const leftArtist = $("#left-artist");
const rightArtist = $("#right-artist");

let albums = []; 
let curIndex = 0;
let chooseIndex = 2;

// Event listeners
leftChoose.on("click", () => {
    choose("left")
});
rightChoose.on("click", () => {
    choose("right")
});

// Load data on ready
$(document).ready(function(){  
    addAlbumMargins();
     getTopAlbums().then(function(topAlbums){
        setup(topAlbums);
    }).catch(function(error) {
        console.log(error);
    });  
})

// Initial setup
function setup(topAlbums){
    albums = topAlbums.topalbums["album"];
    placeAlbumImages(topAlbums);
    $(leftLabel).html(albums[0].name);
    $(rightLabel).html(albums[1].name);
    $(leftArtist).html(albums[0].artist["name"]);
    $(rightArtist).html(albums[1].artist["name"]);
}

function setLabels(){
    
}

// Add extra spacing to albums
function addAlbumMargins(){
    let albums = $(".rightside .album").add($(".leftside .album"));
    for (let i = 1; i < albums.length; i += 2) {
        $(albums[i]).addClass("extra-margin");
    }
}

// Retrieve data via lastfm API
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

// Place initial album images 
function placeAlbumImages(topAlbums){
    for(let i=0; i < albumElements.length; i++){
        $(albumElements[i]).attr("src", topAlbums.topalbums["album"][i].image[1]["#text"]);
    }
    $(chooseAlbums[0]).attr("src", albums[0].image[2]["#text"])
    $(chooseAlbums[1]).attr("src", albums[1].image[2]["#text"])
}

// Handle choosing
function choose(direction) {

    if(direction === "left"){
        $(albumColums[curIndex]).attr("src", $(chooseAlbums[0]).attr("src"));
    }
    else if(direction === "right"){
        $(albumColums[curIndex]).attr("src", $(chooseAlbums[1]).attr("src"));
    }

    curIndex++;

    let newAlbum1;
    let newAlbum2;

    if(chooseIndex < 16){
        newAlbum1 = albums[chooseIndex].image[2]["#text"]
        newAlbum2 = albums[chooseIndex+1].image[2]["#text"]
        $(leftLabel).html(albums[chooseIndex].name)
        $(rightLabel).html(albums[chooseIndex+1].name)
        $(leftArtist).html(albums[chooseIndex].artist["name"])
        $(rightArtist).html(albums[chooseIndex+1].artist["name"])
    }else{
        newAlbum1 = $(albumColums[chooseIndex - 16]).attr('src')
        newAlbum2 = $(albumColums[chooseIndex - 15]).attr('src')
    }


    $(chooseAlbums[0]).attr("src", newAlbum1);
    $(chooseAlbums[1]).attr("src", newAlbum2);

    chooseIndex += 2;

}


