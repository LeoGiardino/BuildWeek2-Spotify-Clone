// const ARTIST_URL = "https://striveschool-api.herokuapp.com/api/deezer/artist/412/top?limit=50"; //
const ARTIST_URL = "https://striveschool-api.herokuapp.com/api/deezer/artist/";

/* we need to pass an ID to make this beaty work */
let artistid = "1";

function artistFetch(artistid){

    fetch(ARTIST_URL + artistid, {method:"GET"}) //Primo fetch
    .then(response => {
        if (response.ok) {
            return response.json();    
    }  else {
        console.error('Error en la respuesta:', response);
        throw new Error('Bad request');
    }
    })  .then(artistData =>{ //Qui lavorare con primo fetch
        console.log(artistData.nb_fan);
        compilareHtmlArtist(artistData);
        //inserire primo contenuto
        let tracklistUrl = artistData.tracklist; //secondo URL per Fetch
        return fetch(tracklistUrl)
    })
        .then(response2 => response2.json())
        .then(trackData =>{ //Qui lavorare con secondo fetch 
            console.log("Tracklist: ", trackData);
            compilareHtmlTracklist(trackData.data); //si deve entrare nel oggeto con .data
            //inserire secondo contenuto
        })
        .catch(error => console.log("Error " + error))
    }



console.log("artist: ");
artistFetch(artistid);


function compilareHtmlArtist (artistData){  /*Collegato con il primo fetch  */
    let artistName = document.getElementById("artistName")
    artistName.textContent = artistData.name;

    let artistBanner = document.getElementById("bannerArtist");
    artistBanner.src = artistData.picture_xl;

    let fansArtist = document.getElementById("fansArtist");
    fansArtist.textContent = artistData.nb_fan.toLocaleString('it-IT') /*METODO PER I PUNTINI DEL NUMERO */ + " ascoltatori mensili";



}

function compilareHtmlTracklist(trackData){
    let parentUl = document.getElementById('parentUl');
    parentUl.innerHTML = "";
    
    trackData.forEach(td =>{
       
        let trackDataHtml = `<li class="list-group-item d-flex align-items-center bg-transparent">
            <span class="mr-5 px-3 text-lightgray">1</span>
            <img src=${td.album.cover_small} alt="Song 1" class="rounded"
            style="width: 50px; height: 50px; object-fit: cover;">
            <div class="ml-3 text-white d-flex ">
            <div class="font-weight-bold d-flex  mb-0 "><p class="px-4 mt-3">${td.title}</p></div>
            <div class="px-5 d-none d-md-block"><p class="px-4 mt-3 text-lightgray ">${td.rank.toLocaleString('it-IT')}</p></div>
            <div class="px-5 d-none d-xl-block"><p class="px-4 mt-3 text-lightgray">${td.duration}</p> </div>
         </div>
        </li>`
        parentUl.innerHTML += trackDataHtml;
    })
}


compilareHtmlTracklist();