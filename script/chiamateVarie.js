let urlAlbum = "https://striveschool-api.herokuapp.com/api/deezer/album/"
let urlArtist = "https://striveschool-api.herokuapp.com/api/deezer/artist/"
let urlSearch = "https://striveschool-api.herokuapp.com/api/deezer/search?q="
let idAlbum = "75621062";
let idArtist = "412";
console.log("object");


fetch(urlAlbum + idAlbum, {
    method: 'GET',
})
    .then(response => response.json())
    .then(json => {

        console.log("album", json);
    })
    .catch(error => console.log(error))


fetch(urlArtist + idArtist, {
    method: 'GET',
})
    .then(response => response.json())
    .then(json => {

        console.log("artist", json);
    })
    .catch(error => console.log(error))


fetch(" https://striveschool-api.herokuapp.com/api/deezer/artist/412/top?limit=1000", {
    method: 'GET',
})
    .then(response => response.json())
    .then(json => {

        console.log("tracklist", json);
    })
    .catch(error => console.log(error))




fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=queen", {
    method: 'GET',
})
    .then(response => response.json())
    .then(json => {

        console.log("search", json);
    })
    .catch(error => console.log(error))


    
    fetch(urlAlbum+"725251", {
        method: 'GET',
    })
        .then(response => response.json())
        .then(json => {
    
            console.log("search", json);
        })
        .catch(error => console.log(error))
    
    



/* chiamateCasuali() ;

function chiamateCasuali() {
    timerInterval = setInterval(() => {

        fetch(urlAlbum + `${i}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(json => {

                console.log("album", i, json);
            })
            .catch(error => console.log(error))

        i++;
        if (i === 10) {
            onTimesUp();
        }
    },);
}
function onTimesUp() {
    clearInterval(timerInterval);

} */
/* let i =Math.floor(Math.random()*100);
console.log(i);
for(let j=i; j<i+20;j++){
    fetch(urlArtist + `${j}`, {
        method: 'GET',
    })
        .then(response => response.json())
        .then(json => {

            console.log("artist", j, json);
        })
        .catch(error => console.log(error))
        console.log(j);
} */