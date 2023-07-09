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

let index = 0;
let curIndex = 0;
let chooseIndex = 0;

let albums = []; 
let options = [];
let columnAlbums = [];


// Event listeners
leftChoose.on("click", () => {
    choose("left")
});
rightChoose.on("click", () => {
    choose("right")
});

// Load data on ready
$(document).ready(function(){  
    console.log(apiKey);
    addAlbumMargins();
     getTopAlbums().then(function(topAlbums){
        // Initial setup
        albums = topAlbums.topalbums["album"];
        setup();
        placeAlbumImages(topAlbums);
        setChooseAlbums();
    }).catch(function(error) {
        console.log(error);
    });  
})

function setup(){
    shuffleAlbums();
}

function shuffleAlbums(){
    let currentIndex = albums.length,  randomIndex;

    while (currentIndex != 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      [albums[currentIndex], albums[randomIndex]] = [
        albums[randomIndex], albums[currentIndex]];
    }
  
    return albums;
}

// Set artist and album name labels 
function setLabels(){
    if(chooseIndex < 16){
        $(leftLabel).html(albums[chooseIndex].name)
        $(rightLabel).html(albums[chooseIndex+1].name)
        $(leftArtist).html(albums[chooseIndex].artist["name"])
        $(rightArtist).html(albums[chooseIndex+1].artist["name"])
    }else{
        $(leftLabel).html(columnAlbums[index].name)
        $(rightLabel).html(columnAlbums[index+1].name)
        $(leftArtist).html(columnAlbums[index].artist["name"])
        $(rightArtist).html(columnAlbums[index+1].artist["name"])
    }
}

// set album images in choose section
function setChooseAlbums(){
    let newAlbum1;
    let newAlbum2;

    if(chooseIndex < 16){
        newAlbum1 = albums[chooseIndex];
        newAlbum2 = albums[chooseIndex+1];
        options.push(newAlbum1);
        options.push(newAlbum2);
    }else{
        newAlbum1 = columnAlbums[index];
        newAlbum2 = columnAlbums[index+1];
        options.push(newAlbum1);
        options.push(newAlbum2);
    }

    // Create promises for each image loading process
    const image1Promise = new Promise((resolve) => {
        const image1 = new Image();
        image1.onload = function() {
        resolve();
        };
        image1.src = newAlbum1.image[2]["#text"];
    });
  
    const image2Promise = new Promise((resolve) => {
        const image2 = new Image();
        image2.onload = function() {
        resolve();
        };
        image2.src = newAlbum2.image[2]["#text"];
    });
  
    // Wait for both promises to resolve
    Promise.all([image1Promise, image2Promise]).then(() => {
        // Both images have finished loading
        $(chooseAlbums[0]).attr("src", newAlbum1.image[2]["#text"]);
        $(chooseAlbums[1]).attr("src", newAlbum2.image[2]["#text"]);
        // Set the image labels only after they laod
        setLabels();
        // increment necessary indices for other functions
        chooseIndex += 2;
        if (chooseIndex > 16) {
            index += 2;
        }
  });
}

// Add extra spacing to albums
function addAlbumMargins(){
    let albums = $(".rightside .album").add($(".leftside .album"));
    for (let i = 1; i < albums.length; i += 2) {
        $(albums[i]).addClass("extra-margin");
    }
}

// Retrieve data via lastfm API
function getTopAlbums(user="lukaschou", period = "7day", limit="16", key = apiKey){
    return new Promise(function(resolve, reject){
        $.ajax({
            url: endpoint + "?method=user.gettopalbums" + `&api_key=${key}` + `&user=${user}` + `&period=${period}`
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

// Place initial album images in left and right rows
function placeAlbumImages(topAlbums){
    for(let i=0; i < albumElements.length; i++){
        $(albumElements[i]).attr("src", topAlbums.topalbums["album"][i].image[1]["#text"]);
    }
}

// Handle choosing
function choose(direction) {

    if(index < 14){
        if(direction === "left"){
            $(albumColums[curIndex]).attr("src", $(chooseAlbums[0]).attr("src"));
            columnAlbums.push(options[0]);
        }
        else if(direction === "right"){
            $(albumColums[curIndex]).attr("src", $(chooseAlbums[1]).attr("src"));
            columnAlbums.push(options[1]);
        }
    
        options = [];
    
        setChooseAlbums();
        curIndex++;
    }
    else{
        winning(direction);
    }
}

function winning(direction){
    let winner;

    if(direction === "left"){
        winner = options[0]
        $(rightChoose).remove();
    }
    else if(direction === "right"){
        winner = options[1]
        $(leftChoose).remove();
    }
}

/*
-Hide API key; DONE
-SYNC UP loading (labels and imgs);
-RESET button
    -reset function

-FORM at start for user info (iFrame?)
    -username, album limit(16-100), period, api key (optional), randomization

-CSS (animations)
-Clean up code
*/
