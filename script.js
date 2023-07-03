const endpoint = "http://ws.audioscrobbler.com/2.0/";

$(document).ready(function(){  
    addAlbumMargins();
})

function addAlbumMargins(){
    let albums = $(".album");
    console.log(albums);

    for (let i = 1; i < albums.length; i += 2) {
        $(albums[i]).addClass("extra-margin");
    }

}


function getTopAlbums(user="gamingrocks69", period = "overall", limit="16", apiKey=""){
    console.log(apiKey)
    $.ajax({
        url: endpoint + "?method=user.gettopalbums" + `&api_key=${apiKey}` + `&user=${user}` + `&period=${period}`
            + `&limit=${limit}` + `&format=json`,
        contentType: "application/json",
        dataType: 'json',
        success: function(result){
            console.log(result);
        },
        error: function(){
            console.log("Error")
        }
    })
}

function placeAlbumImages(){

}

