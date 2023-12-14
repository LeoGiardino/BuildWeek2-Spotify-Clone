let urlAlbum = "https://striveschool-api.herokuapp.com/api/deezer/album/"
let urlArtist = "https://striveschool-api.herokuapp.com/api/deezer/artist/"
let urlSearch = "https://striveschool-api.herokuapp.com/api/deezer/search?q="
let idAlbum = "75621062";
let idArtist = "412";
console.log("object");

prova();

function prova () {

    for(let i=90; i<110; i++){
        fetch( `https://striveschool-api.herokuapp.com/api/deezer/artist/${i}`, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(json => {
    
            console.log("album", json.tracklist);
        })
        .catch(error => console.log(i, error))
    }
}



fetch(urlArtist + idArtist, {
    method: 'GET',
})
    .then(response => response.json())
    .then(json => {

        console.log("artist", json);
    })
    .catch(error => console.log(error))


fetch(" https://striveschool-api.herokuapp.com/api/deezer/artist/412/top?limit=10", {
    method: 'GET',
})
    .then(response => response.json())
    .then(json => {

        console.log("trackList100",json);
    })
    .catch(error => console.log(error))




fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=black-sabbath", {
    method: 'GET',
})
    .then(response => response.json())
    .then(json => {

        console.log("search", json);
    })
    .catch(error => console.log(error))