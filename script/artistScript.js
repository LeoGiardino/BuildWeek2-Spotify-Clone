// Aggiunte tipo creaAmici e altre cosine mlmlml---------------------------------
let indiceAlbum = 0;
let urlSearch = "https://striveschool-api.herokuapp.com/api/deezer/search?q="
let label = [
    "Syco Music",
    "Atlantic Records",
    "Columbia Records",
    "BMG",
    "Interscope Records",
    "Epic Records",
    "Motown",
    "Sub Pop",
    "Arista Records",
    "Roc Nation",
    "Wind-Up Records",
    "Geffen Records",
    "Nuclear Blast",
    "Fueled by Ramen",
    "Metal Blade Records",
    "Napalm Records",
    "Season of Mist",
    "Relapse Records",
    "Earache Records",
    "Peaceville Records",
    "AFM Records",
    "Unique Leader Records",
    "Mighty Music",
    "Debemur Morti Productions",
    "Agonia Records",
    "Eisenwald",
    "Scarlet Records",
    "Capitol Records",
    "Elektra Records",
    "Island Records",
    "Imperial Records",
    "Warner Bros. Records",
    "Chrysalis Records",
    "Blue Note Records",
    "United Artists Records",
    "Virgin Records",
    "A&M Records",
];
let parola1 = label.splice(Math.floor(Math.random() * label.length), 1)[0];
let amicissimi = [
    ["Anna Cerasoli"],
    ["Gregorio Vecchio"],
    ["Monica Misciagna"],
    ["Louis Djembou"],
    ["Leo Giardino"],
    ["Felipe Carrasco"]
];

fetch(urlSearch + `label:"${parola1}"`, {
    method: 'GET',
})
    .then(response => response.json())
    .then(json => {
        console.log("label", `${parola1}`, json);
        creaAmici(json.data);
    })
    .catch(error => console.log(error))


function creaAmici(tracce) {
    console.log("dono dentro creaAmici");
    let contenitoreAmici = document.querySelectorAll(".amici")[1];
    console.log(contenitoreAmici);
    let indiceCanzoneCasuale;
    for (let i = 0; i < 6; i++) {
        indiceCanzoneCasuale = Math.floor(Math.random() * tracce.length);
        contenitoreAmici.innerHTML += ` <div class="d-flex amico">
                <a href="" class="imgAmico">
                    <img src="https://liceoberchet.edu.it/ricerche/geo5d_04/America_Nord/Canada/immagini/ghiottone4.jpg" alt=""
                        class="rounded-circle" style="width:2.4em ">
                </a>
                <div class="container-fluid pe-0">
                    <ul>
                        <li class="d-flex ">
                        <a href="#" class="nomeAmico">${amicissimi.splice(Math.floor(Math.random() * amicissimi.length), 1)[0]}</a>
                        <span class="ms-auto truncate-text">
                    4 ore
                </span></li>
                        <li><a href="#" class="tracciaAmico">${tracce[indiceCanzoneCasuale].title_short}</a><i class="bi bi-dot"></i><a
                                href="">${tracce[indiceCanzoneCasuale].artist.name}</a></li>
                        <li><i class="bi bi-music-note-beamed me-1"></i><a href=""
                                class="album amico">${tracce[indiceCanzoneCasuale].album.title}</a></li>
                    </ul>
                </div>
                `
    }


}









// const ARTIST_URL = "https://striveschool-api.herokuapp.com/api/deezer/artist/412/top?limit=50"; //
const ARTIST_URL = "https://striveschool-api.herokuapp.com/api/deezer/artist/";
const ultimoPezzoUrl = "top?limit=1000";
const urlParams = new URLSearchParams(window.location.search);
let artistid = "65409";

if (urlParams.has('id')) {
    const num = urlParams.get('id');
    artistid = num;
}

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
    let numeroTracce;
    let tracce;

    fetch(ARTIST_URL + artistid, { method: "GET" }) //Primo fetch
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                console.error('Error en la respuesta:', response);
                throw new Error('Bad request');
            }
        }).then(artistData => { //Qui lavorare con primo fetch 
            console.log("artista;", artistData);
            compilareHtmlArtist(artistData);
            //inserire primo contenuto
            let tracklistUrl = artistData.tracklist + ultimoPezzoUrl; //secondo URL per Fetch
            return fetch(tracklistUrl)
            
        })
        .then(response2 => response2.json())
        .then(trackData => { //Qui lavorare con secondo fetch 
            console.log("Tracklist: ", trackData.data);
            tracce = [...trackData.data];
            console.log("Tracce", tracce);
            compilareHtmlTracklist(trackData.data); //si deve entrare nel oggeto con .data
            //inserire secondo contenuto
            let x = trackData.data[0].artist.name;
            let y = x.replace(/ /g, '-');

            let thirdUrl = `https://striveschool-api.herokuapp.com/api/deezer/search?q=${y}`; //terzo URL per Fetch trackData.data[0].artist.name;
            console.log(thirdUrl);
            return fetch(thirdUrl)
        }).then(response3 => response3.json())
        .then(dato => {
            tracce = [...tracce, ...dato.data];
            discografia1(tracce);
        })
        .catch(error => console.log(error))
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

document.addEventListener("DOMContentLoaded", () => {
    let listaNascosta = document.querySelector(".listaNascosta");
    let mostraNasconti = document.querySelector(".mostraListaNascosta");

    mostraNasconti.addEventListener("click", () => {
        if (listaNascosta.classList.contains("d-none")) {
            mostraNasconti.innerText = "Mostra meno";
            listaNascosta.classList.remove("d-none");
        } else {
            mostraNasconti.innerText = "Visualizza Altro";
            listaNascosta.classList.add("d-none");
        }
    })
    console.log(document.querySelector("h4.mostraAltro"));

        document.querySelector("h4.mostraAltro").addEventListener("click", () => {
            mostraRigaNascosta();
        });


        document.querySelector("p.mostraMeno ").addEventListener("click", () => {
            nascondiRigaNascosta();
        });
})
/* 
- FUNZIONE MODIFIGHE :
- AGGIUNTO INDEX AGLI LI
- AGGIUNTO PLAY ALL HOVER (LI)
- BRANI RIPRODUCIBILI, UNO ALLA VOLTA
*/


function compilareHtmlTracklist(trackData) {
    console.log(trackData);
    let cont;
    let audioCorrente = null;
    let rowCorrente = null;

    for (let i = 0; i < trackData.length; i++) {
        if (i < 5) {
            cont = document.querySelector(".listaPrincipale");
        } else {

            cont = document.querySelector(".listaNascosta");
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

/* function discografia(data) {
    const contenitore = document.querySelector(".longCard");
    

    for (let i = 0; i < data.length; i++) {
        if(i == 5){
            break;
        }
    let div = document.createElement("div");
    div.classList.add("card");
    div.style.width = "18%";
    div.innerHTML = `
                <a href="#" class=""><img src="${data[i].album.cover_medium}" class="card-img-top " alt="..."></a> 
                <button class="playHoverLongCard position-absolute">
                <i class="bi bi-play-fill"></i>
            </button>       
                <div class="card-body">
                    <p class="card-title truncate-text"><a href="#" class="text-decoration-none text-white">${data[i].album.title}</a></p>
                    <p class="card-text"><a href="#" class="text-decoration-none text-white">${data[i].artist.name}</a></p>
                  
                </div>        
                `
    contenitore.appendChild(div);

    }
} */

function discografia1(tracce) {
    let giàMesso = false;
    let albumMessi = [];
    tracce.forEach(ele => {
        for (const j of albumMessi) {
            if (ele.album.id == j) {
                giàMesso = true;
                break
            }
        }
        if (!giàMesso && ele.artist.id == artistid) {
            albumMessi.push(ele.album.id);
            mettoAlbumNascosti(ele);
            if (indiceAlbum < 4) {
                mettoAlbum(ele);
            }
            indiceAlbum++;
        }
        giàMesso = false;
    });
}



function mettoAlbum(data) {
    const contenitore = document.querySelector(".longCard.visibile");
    let div = document.createElement("div");
    div.classList.add("card");
    div.style.width = "22%";
   
    div.innerHTML = `
                <a href="#" class=""><img src="${data.album.cover_medium}" class="card-img-top " alt="..."></a> 
                <button class="playHoverLongCard position-absolute">
                <i class="bi bi-play-fill"></i>
            </button>       
                <div class="card-body">
                    <p class="card-title truncate-text"><a href="#" class="text-decoration-none text-white">${data.album.title}</a></p>
                    <p class="card-text"><a href="#" class="text-decoration-none text-white">${data.artist.name}</a></p>
                  
                </div>        
                `
    contenitore.appendChild(div);
    const carte = document.querySelectorAll(".longCard > .card");
    carte[indiceAlbum].addEventListener("click", () => {

    })

}


function mettoAlbumNascosti(data) {
    const contenitore = document.querySelector(".carteNascoste");
    let div = document.createElement("div");
    div.classList.add("card");
    div.classList.add("mb-3");
    div.style.width = "22%";
    div.innerHTML = `
                <a href="#" class=""><img src="${data.album.cover_medium}" class="card-img-top " alt="..."></a> 
                <button class="playHoverLongCard position-absolute">
                <i class="bi bi-play-fill"></i>
            </button>       
                <div class="card-body">
                    <p class="card-title truncate-text"><a href="#" class="text-decoration-none text-white">${data.album.title}</a></p>
                    <p class="card-text"><a href="#" class="text-decoration-none text-white">${data.artist.name}</a></p>
                  
                </div>        
                `
    contenitore.appendChild(div);
    const carte = document.querySelectorAll(".card");
    carte[indiceAlbum].addEventListener("click", () => {

    })

}




function mostraRigaNascosta() {
    let colonnaNascosta = document.querySelector(".colonnaNascosta")
    document.querySelector(".colonnaPrincipale").classList.add("d-none")
    colonnaNascosta.classList.remove('d-none');
}

function nascondiRigaNascosta() {
    console.log("sono in mostraMeno");
    let colonnaNascosta = document.querySelector(".colonnaNascosta")
    document.querySelector(".colonnaPrincipale").classList.remove('d-none');
    colonnaNascosta.classList.add("d-none");
}

function creaCardLaterale(data) {

}