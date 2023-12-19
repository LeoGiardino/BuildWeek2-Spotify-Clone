let urlAlbum = "https://striveschool-api.herokuapp.com/api/deezer/album/"
let urlArtist = "https://striveschool-api.herokuapp.com/api/deezer/artist/"
let urlSearch = "https://striveschool-api.herokuapp.com/api/deezer/search?q="
let idAlbum = "75621062";
let idArtist = "412";
let indiceRigaAlbum = 1;
let indiceRigaNascosta = 1;
let indiceArtisti = 0;

let artistiMessi = [];
let primaChiamata = [];
let arrayParole = [
    'Melody',
    'Harmony',
    'Echoes',
    'Wanderer',
    'Enchant',
    'Serenade',
    'Starlight',
    'Dreamer',
    'Embrace',
    'Ethereal',
    'Celestial',
    'Gentle',
    'Aurora',
    'Calm',
    'Tranquil',
    'Lullaby',
    'Breeze',
    'Infinite',
    'Harbor',
    'Reflection',
    'Serene',
    'Velvet',
    'Heavenly',
    'Grace',
    'Cascade',
    'Cherish',
    'Luminous',
    'Tender',
    'Harbour',
    'Glisten',
    'Cradle',
    'Whimsical',
    'Calmness',
    'Sylvan',
    'Sublime',
    'Luminescent',
    'Velvet',
    'Halcyon',
    'Pristine',
    'Enrapture',
    'Cerulean',
    'Silhouette',
    'Mystic',
    'Abyss',
    'Tempest',
    'Majesty',
    'Legacy',
    'Oracle',
    'Radiant',
    'Epic',
    'Vivid',
    'Lively',
    'Celebrate',
    'Spark',
    'Rhythm',
    'Energetic',
    'Pulse',
    'Sway',
    'Radiate',
    'Shimmer',
    'Spiral',
    'Pinnacle',
    'Venture',
    'Jubilant',
    'Expanse',
    'Verve',
    'Glow',
    'Vortex',
    'Stellar',
    'Reverie',
    'Serenity',
    'Vivid',
    'Radiant',
    'Blissful',
    'Ecstasy',
    'Lively',
    'Radiate',
    'Sparkle',
    'Ecliptic',
    'Solar',
    'Pinnacle',
    'Celebrate',
    'Sway',
    'Spark',
    'Vivid',
    'Uplift',
    'Jubilant',
    'Expanse',
    'Verve',
    'Glow',
    'Vortex',
    'Stellar',
    'Reverie',
    'Crescent',
    'Joyful',
    'Spirited',
    'Vivid',
    'Radiant',
    'Blissful',
    'Lively',
    'Upbeat',
    'Vibrant',
    'Sparkle',
    'Ecliptic',
    'Mirage',
    'Sunrise'
];

document.addEventListener("DOMContentLoaded", () => {
    const leftArrow = document.querySelector(".lefty");
    const rightArrow = document.querySelector(".righty");
    leftArrow.addEventListener("click", () => {
        window.history.back().history.back();
    })
    rightArrow.addEventListener("click", () => {
        window.history.forward();
    })


    //----------------------Gregorio che aggiunge cose ----------------------------------------

    let mostraAltro = document.querySelectorAll(".mostraAltro");
    for (let i = 0; i < mostraAltro.length; i++) {
        mostraAltro[i].addEventListener("click", () => {
            mostraRigaNascosta(i);
        })
    }

    let mostraMeno = document.querySelectorAll(".mostraMeno p");
    
    for (let i = 0; i < mostraMeno.length; i++) {
        mostraMeno[i].addEventListener("click", () => {
            nascondiRigaNascosta(i);
        })
    }

})


//----------------------------------- Prima chiamata --------------------------------------------------------------------
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
let numeroArtistiDiversi;

fetch(urlSearch + `label:"${parola1}"`, {
    method: 'GET',
})
    .then(response => response.json())
    .then(json => {
        console.log("label", `${parola1}`, json);
        console.log(json);
        primaChiamata = [...json.data];
        numeroArtistiDiversi = contaArtisti(json.data);
        prendoArtisti();
    })
    .catch(error => console.log(error))

function prendoArtisti() {
    let giàMesso = false;
    let posizioneCasuale;
    while (indiceArtisti < 4) {
        posizioneCasuale = Math.floor(Math.random() * primaChiamata.length);
        for (const ele of artistiMessi) {
            try {
                if (primaChiamata[posizioneCasuale].artist.id == ele) {
                    giàMesso = true;
                    break
                }
            } catch (error) {
                giàMesso = true;
            }
        }

        if (!giàMesso && primaChiamata[posizioneCasuale].artist !== undefined && primaChiamata[posizioneCasuale].album !== undefined) {
            artistiMessi.push(primaChiamata[posizioneCasuale].artist.id);
            mettoArtistiNascosti(primaChiamata[posizioneCasuale]);
            mettoArtisti(primaChiamata.splice(posizioneCasuale, 1)[0]);
            indiceArtisti++;
        }
        giàMesso = false;
    }
    while ( (indiceArtisti < numeroArtistiDiversi) && (indiceArtisti >= 4)) {
        console.log("sono dentro il secondo while");
        posizioneCasuale = Math.floor(Math.random() * primaChiamata.length);
        for (const ele of artistiMessi) {
            try {
                if (primaChiamata[posizioneCasuale].artist.id == ele) {
                    giàMesso = true;
                    break
                }
            } catch (error) {
                giàMesso = true;
            }
        }
        if (!giàMesso && primaChiamata[posizioneCasuale].artist !== undefined && primaChiamata[posizioneCasuale].album !== undefined) {
            artistiMessi.push(primaChiamata[posizioneCasuale].artist.id);
            mettoArtistiNascosti(primaChiamata.splice(posizioneCasuale, 1)[0]);
            indiceArtisti++;
        }
        giàMesso = false;




    }
}


function mettoArtisti(data) {
    const contenitore = document.querySelector(".longCard");
    let div = document.createElement("div");
    div.classList.add("card");
    div.style.width = "22%";
    div.innerHTML = `
            <a href="#" class=""><img src="${data.artist.picture_medium}" class="card-img-top rounded-circle" alt="..."></a>        
            <div class="card-body pb-1">
                <p class="card-title "><a href="#" class="text-decoration-none text-white">${data.artist.name}</a></p>
                <p class="card-text">Artist</p>
                <button class="playHoverLongCard position-absolute">
                    <i class="bi bi-play-fill"></i>
                </button>
            </div>`
    contenitore.appendChild(div);
    const carte = document.querySelectorAll(".longCard > .card");
    carte[indiceArtisti].addEventListener("click", () => {
        onArtist(data.artist.id);
    })
}

function mettoArtistiNascosti(data) {
    console.log("Sono dentro mettoArtistiNascosti");
    const contenitore = document.querySelectorAll(`.carteNascoste`)[0]
    let div = document.createElement("div");
    div.classList.add("card");
    div.classList.add("mb-3");
    div.style.width = "22%";
    div.innerHTML = `
            <a href="#" class=""><img src="${data.artist.picture_medium}" class="card-img-top rounded-circle" alt="..."></a>        
            <div class="card-body pb-1">
                <p class="card-title "><a href="#" class="text-decoration-none text-white">${data.artist.name}</a></p>
                <p class="card-text">Artist</p>
                <button class="playHoverLongCard position-absolute">
                    <i class="bi bi-play-fill"></i>
                </button>
            </div>`
    contenitore.appendChild(div);
    const carte = contenitore.querySelectorAll(".card");
    carte[carte.length - 1].addEventListener("click", () => {
        onArtist(data.artist.id);
    })
}


function contaArtisti(tracce) {
    let idGiàPresente = false;
    let ripetizioni = [];
    let nomi = [];
    tracce.forEach(ele => {
        idGiàPresente = false;
        for (let i = 0; i < nomi.length; i++) {
            if (nomi[i] == ele.artist.id) {
                ripetizioni[i] = ripetizioni[i] + 1;
                idGiàPresente = true;
                break
            }
        }
        if (!idGiàPresente) {
            nomi.push(ele.artist.id);
            ripetizioni.push(1);

        }
    });
    console.log(nomi);
    console.log(nomi.length);
    return nomi.length;

}

function onArtist(tracks) {
    window.location.href = `artist-page-copy.html?id=${encodeURIComponent(tracks)}`;
}


//----------------------------------------- Seconda Chiamata -------------------------------------------
let parola2 = arrayParole[Math.floor(Math.random() * arrayParole.length)];
let indiceAlbum = 0;
let albumMessi = [];
let tracceAlbum1 = [];
let numeroArtistiDiversi2;

fetch(urlSearch + `${parola2}`, {
    method: 'GET',
})
    .then(response => response.json())
    .then(json => {
        console.log(`${parola2}`, json);
        tracceAlbum1 = [...json.data];
        numeroArtistiDiversi2 = contaArtisti(json.data);
        prendoAlbum1(json.data);
    })
    .catch(error => console.log(error))


function prendoAlbum1() {
    mettoCanzonciona(tracceAlbum1[Math.floor(Math.random())*tracceAlbum1.length]);
    let giàMesso = false;
    let posizioneCasuale;
    while (indiceAlbum < 4) {
        posizioneCasuale = Math.floor(Math.random() * tracceAlbum1.length);
        for (const ele of albumMessi) {
            try {
                if (tracceAlbum1[posizioneCasuale].artist.id == ele) {
                    giàMesso = true;
                    break
                }
            } catch (error) {
                giàMesso = true;
            }
        }
        if (!giàMesso) {
                albumMessi.push(tracceAlbum1[posizioneCasuale].artist.id);
                mettoAlbumNascosti1(tracceAlbum1[posizioneCasuale]);            
                mettoAlbum1(tracceAlbum1.splice(posizioneCasuale, 1)[0]);
                indiceAlbum++;
           
        }
        giàMesso = false;
    }
    while ( (indiceAlbum < numeroArtistiDiversi2) && (indiceAlbum >= 4)) {
        console.log("sono nel while aiuto");
        posizioneCasuale = Math.floor(Math.random() * tracceAlbum1.length);
        for (const ele of albumMessi) {
            try {
                if (tracceAlbum1[posizioneCasuale].artist.id == ele) {
                    giàMesso = true;
                    break
                }
            } catch (error) {
                giàMesso = true;
            }
        }
        if (!giàMesso) {
            albumMessi.push(tracceAlbum1[posizioneCasuale].artist.id);
            mettoAlbumNascosti1(tracceAlbum1.splice(posizioneCasuale, 1)[0]);            
            indiceAlbum++;
        }
        giàMesso = false;
    }
}

function mettoAlbum1(data) {
    const contenitore = document.querySelector(".longCard2");
    let div = document.createElement("div");
    div.classList.add("card");
    div.style.width = "22%";
    div.innerHTML = `
                <a href="#" class=""><img src="${data.album.cover_medium}" class="card-img-top " alt="..."></a> 
                <button class="playHoverLongCard position-absolute">
                <i class="bi bi-play-fill"></i>
            </button>       
                <div class="card-body">
                    <p class="card-title truncate-text"><a href="#" class="text-decoration-none text-white">
                    ${data.album.title}</a></p>
                    <p class="card-text"><a href="#" class="text-decoration-none text-white">${data.artist.name}</a></p>
                  
                </div>        
                `
    contenitore.appendChild(div);
    const carte = document.querySelectorAll(".longCard2 > .card");
    carte[indiceAlbum].addEventListener("click", () => {

    })
}

function mettoAlbumNascosti1(data) {
    const contenitore = document.querySelectorAll(`.carteNascoste`)[1];
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
                    <p class="card-title truncate-text"><a href="#" class="text-decoration-none text-white">
                    ${data.album.title}</a></p>
                    <p class="card-text"><a href="#" class="text-decoration-none text-white">${data.artist.name}</a></p>
                  
                </div>        
                `
    contenitore.appendChild(div);
    const carte = contenitore.querySelectorAll(".card");
    carte[carte.length - 1].addEventListener("click", () => {
    })
}

function mettoCanzonciona(data) {
    const titoloBC = document.querySelector(".card-title");
    titoloBC.textContent = data.title;
    const imgBC = document.querySelector(".imgBC");
    imgBC.src = data.album.cover;
    const text1 = document.querySelector(".card-text1");
    text1.textContent = data.artist.name;
    const playPause = document.querySelector("#playPause");
    const muteButton = document.getElementById("muteButton");
    const audio = new Audio(data.preview);
    const volumeControl = document.getElementById("customRange1");
    const playBC = document.querySelector(".playBC");
    let isPlaying = false;
    function music() {
        if (!isPlaying) {
            audio.play();
            isPlaying = true;
            playBC.textContent = "Pause";
            playPause.innerHTML = '<i class="bi bi-pause-circle-fill"></i>';
        } else {
            audio.pause();
            isPlaying = false;
            playBC.textContent = "Play";
            playPause.innerHTML = '<i class="bi bi-play-circle-fill"></i>';
        }
    }
    playBC.addEventListener("click", music);
    // Aggiunto l'evento "input" per il controllo del volume
    volumeControl.addEventListener("input", () => {
        // Ottieni il valore corrente del controllo del volume (è un valore tra 0 e 100)
        const volumeValue = volumeControl.value / 100;

        if (volumeValue < 0.5) {
            if (volumeValue == 0) {
                muteButton.innerHTML = '<i class="bi bi-volume-mute-fill"></i>';
            } else {
                muteButton.innerHTML = '<i class="bi bi-volume-down-fill"></i>';
            }
        } else if (volumeValue > 0.5) {
            muteButton.innerHTML = '<i class="bi bi-volume-up-fill"></i>';
        }
        // Normalizza il valore del volume da 0 a 1
        // L'elemento audio in JavaScript utilizza un valore di volume compreso tra 0 e 1
        // Quindi, dividiamo il valore del controllo del volume per 100 per normalizzarlo in questo intervallo
        // Ad esempio, se il valore del controllo del volume è 50, volumeValue sarà 0.5
        audio.volume = volumeValue;

    });


    playPause.addEventListener("click", () => {

        if (!isPlaying) {
            audio.play();
            isPlaying = true;
            playPause.innerHTML = '<i class="bi bi-pause-circle-fill"></i>';
        } else {
            audio.pause();
            isPlaying = false;
            playPause.innerHTML = '<i class="bi bi-play-circle-fill"></i>';
        }
    });

    // Aggiunto l'evento "click" per il controllo del muto
    muteButton.addEventListener("click", () => {
        // Inverti lo stato di muto dell'elemento audio
        audio.muted = !audio.muted;

        // Aggiorna dinamicamente l'icona in base allo stato di muto
        if (audio.muted) {
            // Se l'audio è muto, cambia l'icona a "volume-mute"
            muteButton.innerHTML = '<i class="bi bi-volume-mute-fill"></i>';
        } else {
            // Se l'audio non è muto, torna all'icona normale
            muteButton.innerHTML = '<i class="bi bi-volume-down-fill"></i>';
        }
    });

}




/* --------------- Terza Chiamata ------------------------------------*/
parola1 = label.splice(Math.floor(Math.random() * label.length), 1)[0];
let numeroArtistiDiversi3;
let amici = [
    ["Anna Cerasoli"],
    ["Gregorio Vecchio"],
    ["Monica Misciagna"],
    ["Louis Djembou"],
    ["Leo Giardino"],
    ["Felipe Carrasco"]
];
let albumMessi2 = [];
let tracceAlbum2 = [];
let indiceAlbum2 = 0;
fetch(urlSearch + `label:"${parola1}"`, {
    method: 'GET',
})
    .then(response => response.json())
    .then(json => {
        console.log("label", `${parola1}`, json);
        tracceAlbum2 = [...json.data];
        numeroArtistiDiversi3=contaArtisti(json.data);
        prendoAlbum2();
        creaAmici(json.data);
    })
    .catch(error => console.log(error))

function prendoAlbum2() {
    let giàMesso = false;
    let posizioneCasuale;
    while (indiceAlbum2 < 4) {
        posizioneCasuale = Math.floor(Math.random() * tracceAlbum2.length);
        for (const ele of albumMessi2) {
            try {
                if (tracceAlbum2[posizioneCasuale].album.title == ele) {
                    giàMesso = true;
                    break
                }
            } catch (error) {
                giàMesso = true;
            }
        }
        if (!giàMesso) {
            try {
                albumMessi2.push(tracceAlbum2[posizioneCasuale].album.title);
                mettoAlbumNascosti2(tracceAlbum2[posizioneCasuale]);
                mettoAlbum2(tracceAlbum2.splice(posizioneCasuale, 1)[0]);
                indiceAlbum2++;
            } catch (error) {
            }
        }
        giàMesso = false;
    }
    while ( (indiceAlbum2 < numeroArtistiDiversi3) && (indiceAlbum2 >= 4)) {
        console.log("sono nel while aiuto");
        posizioneCasuale = Math.floor(Math.random() * tracceAlbum2.length);
        for (const ele of albumMessi2) {
            try {
                if (tracceAlbum2[posizioneCasuale].artist.id == ele) {
                    giàMesso = true;
                    break
                }
            } catch (error) {
                giàMesso = true;
            }
        }
        if (!giàMesso) {
            albumMessi2.push(tracceAlbum2[posizioneCasuale].artist.id);
            mettoAlbumNascosti2(tracceAlbum2.splice(posizioneCasuale, 1)[0]);            
            indiceAlbum2++;
        }
        giàMesso = false;
    }
}



function mettoAlbum2(data) {
    const contenitore = document.querySelector(".longCard3");
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
    const carte = document.querySelectorAll(".longCard3 > .card");
    carte[indiceAlbum2].addEventListener("click", () => {
        onArtist(data.album.id);
    })
 
}

function mettoAlbumNascosti2(data) {
    const contenitore = document.querySelectorAll(".carteNascoste")[2];
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
    const carte = contenitore.querySelectorAll(".card");
    carte[carte.length-1].addEventListener("click", () => {

    })
    
}

function creaAmici(tracce) {
    console.log("dono dentro creaAmici");
    let contenitoreAmici = document.querySelector(".amici");
    console.log(contenitoreAmici);
    let indiceCanzoneCasuale;
    for (let i = 0; i < 6; i++) {
        indiceCanzoneCasuale = Math.floor(Math.random() * tracce.length);
        contenitoreAmici.innerHTML += ` <div class="d-flex amico">
            <a href="" class="imgAmico">
                <img src="../assets/imgs/colleghi/pax.jpg" alt=""
                    class="rounded-circle" style="width:2.4em ">
            </a>
            <div class="container-fluid pe-0">
                <ul>
                    <li class="d-flex ">
                    <a href="#" class="nomeAmico">${amici.splice(Math.floor(Math.random() * amici.length), 1)[0]}</a>
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


function mostraRigaNascosta(i) {
    let righeNascoste = document.querySelectorAll(".rigaNascosta")
    document.querySelector(".finestrona").classList.add("d-none")
    righeNascoste[i].classList.remove('d-none');
}

function nascondiRigaNascosta(i) {
    console.log("sono in mostraMeno");
    let righeNascoste = document.querySelectorAll(".rigaNascosta")
    document.querySelector(".finestrona").classList.remove('d-none');
    righeNascoste[i].classList.add("d-none");
}
