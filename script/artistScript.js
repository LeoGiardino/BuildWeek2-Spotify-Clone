// const ARTIST_URL = "https://striveschool-api.herokuapp.com/api/deezer/artist/412/top?limit=50"; //
const ARTIST_URL = "https://striveschool-api.herokuapp.com/api/deezer/artist/";

/* we need to pass an ID to make this beaty work */
let artistid = "465";

// Ottieni i parametri di query dalla URL
const urlParams = new URLSearchParams(window.location.search);

    // Controlla se il parametro 'dato' è presente
    if (urlParams.has('id')) {
      // Recupera il valore del parametro 'dato'
      const num = urlParams.get('id');
  
      artistid = num;
    }

console.log(artistid);

const leftArrow = document.querySelector(".lefty");
const rightArrow = document.querySelector(".righty");

leftArrow.addEventListener("click", () => {
    window.history.back();
})

rightArrow.addEventListener("click", () => {
    window.history.forward();
})

const x = document.querySelector(".bi-x-lg");
const centroFelipe = document.querySelector(".centroFelipe");
const amici = document.querySelector(".amici");


x.addEventListener("click", () => {
    x.closest(".colonnaDestra").style.display = "none";
    centroFelipe.classList.add("col-9");

})

amici.addEventListener("click", () => {
    x.closest(".colonnaDestra").style.display = "block";
    centroFelipe.classList.remove("col-9");
})




function artistFetch(artistid) {

    fetch(ARTIST_URL + artistid, { method: "GET" }) //Primo fetch
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.error('Error en la respuesta:', response);
                throw new Error('Bad request');
            }
        }).then(artistData => { //Qui lavorare con primo fetch
            console.log(artistData.nb_fan);
            compilareHtmlArtist(artistData);
            //inserire primo contenuto
            let tracklistUrl = artistData.tracklist; //secondo URL per Fetch
            return fetch(tracklistUrl)
        })
        .then(response2 => response2.json())
        .then(trackData => { //Qui lavorare con secondo fetch 
            console.log("Tracklist: ", trackData);
            compilareHtmlTracklist(trackData.data); //si deve entrare nel oggeto con .data
            //inserire secondo contenuto
        })
        .catch(error => console.log("Error " + error))
}



console.log("artist: ");
artistFetch(artistid);


function compilareHtmlArtist(artistData) {  /*Collegato con il primo fetch  */
    let artistName = document.getElementById("artistName")
    artistName.textContent = artistData.name;

    console.log(artistData);

    let artistBanner = document.getElementById("bannerArtist");
    artistBanner.src = artistData.picture_xl;

    let fansArtist = document.getElementById("fansArtist");
    fansArtist.textContent = artistData.nb_fan.toLocaleString('it-IT') /*METODO PER I PUNTINI DEL NUMERO */ + " ascoltatori mensili";



}


/* 
- FUNZIONE MODIFIGHE :
- AGGIUNTO INDEX AGLI LI
- AGGIUNTO PLAY ALL HOVER (LI)
- BRANI RIPRODUCIBILI, UNO ALLA VOLTA
*/


function compilareHtmlTracklist(trackData) {
    console.log(trackData);

    const cont = document.querySelector(".bg-transparent");
    let audioCorrente = null;
    let rowCorrente = null;

    for (let i = 0; i < trackData.length; i++) {
        if(i == 5){
            break;
        }
        const row = document.createElement('div');
        row.classList.add('row', 'mb-3');

        const ore = Math.floor(trackData[i].duration / 100);
        const minuti = trackData[i].duration % 100;
        const orarioFormat = ore + ':' + (minuti < 10 ? '0' : '') + minuti;

        // Memorizza l'indice originale come attributo dati
        row.setAttribute('data-indice-originale', i + 1);

        // Memorizza l'indice originale come variabile nel contesto della riga
        row.indiceOriginale = i + 1;

        row.innerHTML =
            `
            <div class="col-1 text-end ms-3 d-flex align-items-center justify-content-end play">
                <span class="indice">${i + 1}</span>
            </div>
            <div class="col-1 ps-0 pe-2 me-4">
                <img src="${trackData[i].album.cover_small}" alt="Song ${i + 1}" class="rounded"
                    style="width: 50px; height: 50px; object-fit: cover;">
            </div>
            <div class="col-5 truncate-text d-flex align-items-center px-0">
                <span class="truncate-text mb-0 title">${trackData[i].title}</span>
            </div>
            <div class="col-3 d-flex align-items-center colAscolti">
                <span class="ascolti">${trackData[i].rank.toLocaleString('it-IT')}</span>
            </div>
            <div class="col-md-1 col-3 d-flex align-items-center justify-content-center">
                <span class="durata text-center">${orarioFormat}</span>
            </div>
        `;

        const indice = row.querySelector('.indice');
        const title = row.querySelector('.title');
        const play = row.querySelector('.play');
        const audio = new Audio(trackData[i].preview);
        let isPlaying = false;

        row.addEventListener('mouseover', function () {
            if (!isPlaying) {
                indice.innerHTML = '<i class="bi bi-play-fill fs-4"></i>';
            }
        });

        row.addEventListener('mouseout', function () {
            if (!isPlaying) {
                // Ripristina l'indice originale
                indice.textContent = row.indiceOriginale;
            }
        });

        play.addEventListener("click", () => {
            if (audioCorrente && audioCorrente !== audio) {
                audioCorrente.pause();
                audioCorrente.currentTime = 0;
                isPlaying = false;
                // Ripristina l'indice originale e il colore del titolo
                rowCorrente.querySelector('.indice').textContent = rowCorrente.indiceOriginale;
                rowCorrente.querySelector('.title').classList.remove('text-success');
            }

            if (!isPlaying) {
                audio.play().then(() => {
                    isPlaying = true;
                    audioCorrente = audio;
                    rowCorrente = row;
                    indice.innerHTML = '<i class="bi bi-pause-circle-fill fs-4"></i>';
                    title.classList.add('text-success'); // Aggiunge la classe per il colore verde
                }).catch(error => {
                    console.error("Errore durante la riproduzione dell'audio:", error);
                });
            } else {
                audio.pause();
                isPlaying = false;
                indice.innerHTML = '<i class="bi bi-play-fill"></i>';
               // title.classList.remove('text-success'); // Rimuove la classe per il colore verde
            }
        });

        audio.addEventListener('error', function (event) {
            console.error(`Errore durante il caricamento o la riproduzione dell'audio per la traccia ${i + 1}:`, event.message);
        });

        cont.appendChild(row);
    }
}







compilareHtmlTracklist(trackData);




// function compilareHtmlTracklist(trackData) {
//     let parentUl = document.getElementById('parentUl');
//     parentUl.innerHTML = "";

//     trackData.forEach((td, index) => {
//         let li = document.createElement('li');
//         li.classList.add('list-group-item', 'd-flex', 'align-items-center', 'bg-transparent');

//         let trackDataHtml = `<span class="mr-5 px-3 text-lightgray">${index + 1}</span>
//             <img src=${td.album.cover_small} alt="Song 1" class="rounded"
//                 style="width: 50px; height: 50px; object-fit: cover;">
//             <div class="ml-3 text-white d-flex ">
//                 <div class="font-weight-bold d-flex  mb-0 "><p class="px-4 mt-3">${td.title}</p></div>
//                 <div class="px-5 d-none d-md-block"><p class="px-4 mt-3 text-lightgray ">${td.rank.toLocaleString('it-IT')}</p></div>
//                 <div class="px-5 d-none d-xl-block"><p class="px-4 mt-3 text-lightgray">${td.duration}</p> </div>
//             </div>`;

//         const audio = new Audio(td.preview);

//         li.innerHTML = trackDataHtml;
//         let isPlaying = false;

//         const span = li.querySelector('.text-lightgray');

//         // Salva l'originalText in una variabile locale
//         const originalText = span.textContent;

//         li.addEventListener('mouseover', function () {
//             span.innerHTML = '<i class="bi bi-play-fill"></i>';
//         });

//         li.addEventListener('mouseout', function () {
//             span.textContent = originalText;
//         });

//         span.addEventListener("click", () => {
//             if (!isPlaying) {
//                 audio.play().then(() => {
//                     isPlaying = true;
//                     span.innerHTML = '<i class="bi bi-pause-circle-fill"></i>';
//                 }).catch(error => {
//                     console.error("Errore durante la riproduzione dell'audio:", error);
//                 });
//             } else {
//                 audio.pause();
//                 isPlaying = false;
//                 span.innerHTML = '<i class="bi bi-play-fill"></i>';
//             }
//         });

//         audio.addEventListener('error', function (event) {
//             console.error(`Errore durante il caricamento o la riproduzione dell'audio per la traccia ${index + 1}:`, event);
//         });

//         parentUl.appendChild(li);
//     });
// }







compilareHtmlTracklist();