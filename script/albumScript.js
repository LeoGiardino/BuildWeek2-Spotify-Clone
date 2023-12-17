/* album_url = "https://striveschool-api.herokuapp.com/api/deezer/album/725251"; */

album_url = "https://striveschool-api.herokuapp.com/api/deezer/album/";

let album_id = "725251";


const urlParams = new URLSearchParams(window.location.search);
const album_url = urlParams.get("album_url");

if (album_url) {
    album_id = album_url.split("/").pop();

    if (urlParams.has('id')) {
        const num = urlParams.get('id');

        album_id = num;
    }
}

console.log(artistid);

const freccia_sinistra = document.querySelector(".sinistra");
const freccia_destra = document.querySelector(".destra");

freccia_sinistra.addEventListener("click", () => {
    window.history.back();
})

freccia_destra.addEventListener("click", () => {
    window.history.forward();
})


const centroLouis = document.querySelector(".centroLouis");
const bi_x_lg = document.querySelector(".bi-x-lg");
const amici = document.querySelector(".amici");

bi_x_lg.addEventListener("click", () => {
    bi_x_lg.closest(".colonnaDestra").style.display = "none";
    centroLouis.classList.add("col-9");

})

amici.addEventListener("click", () => {
    bi_x_lg.closest(".colonnaDestra").style.display = "block";
    centroFelipe.classList.remove("col-9");
})


function albumFetch(album_id) {

    fetch(album_url + album_id, { method: "GET" })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.error('Errore :', response);
                throw new Error('Bad request');
            }
        }).then(albumData => {
            console.log(albumData.nb_fan);
            compilareHtmlAlbum(albumData);
            
            let tracklistUrl = albumData.tracklist; 
            return fetch(tracklistUrl)
        })
        .then(response2 => response2.json())
        .then(trackData => { 
            console.log("Tracklist: ", trackData);
            compilareHtmlTracklist(trackData.data); 
        })
        .catch(error => console.log("Error " + error))
}



console.log("Album: ");
albumFetch(album_id);


function compilareHtmlAlbum(albumData) { 
    let imgAlbum = document.getElementById("#imgAlbum");
    imgAlbum.src = albumData.picture_xl;

    let albumTitle = document.querySelector(".albumTitle")
    albumTitle.textContent = albumData.title;

    let albumIconImg = document.getElementById("#albumIconImg");
    albumIconImg.src = albumData.picture_xl;

    let albumDescription = document.querySelector(".albumDescription")
    albumDescription.textContent = albumDescription.title;
    
    let albumFans = document.getElementById(".albumAscolti");
    albumFans.textContent = albumData.nb_fan.toLocaleString('it-IT') + " ascoltati mensili";
}


function compilareHtmlTracklist(params) {
    
}