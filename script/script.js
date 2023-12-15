let urlAlbum = "https://striveschool-api.herokuapp.com/api/deezer/album/"
let urlArtist = "https://striveschool-api.herokuapp.com/api/deezer/artist/"
let urlSearch = "https://striveschool-api.herokuapp.com/api/deezer/search?q="
let idAlbum = "75621062";
let idArtist = "412";
console.log("object");



fetch(`https://striveschool-api.herokuapp.com/api/deezer/album/366045987`, {
    method: 'GET',
})
    .then(response => response.json())
    .then(json => {
        console.log("album", json);
        prova(json);
    })
    .catch(error => console.log(error))



    let i =Math.floor(Math.random()*100);
    console.log(i);
    let h = 0;
    for(let j=i; j<i+10;j++){
        fetch(urlArtist + `${j}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(json => {
                if(h<5 && json.picture_medium !== "https://e-cdns-images.dzcdn.net/images/artist//250x250-000000-80-0-0.jpg"){
                    longCards(json);
                    h++;
                }
                
                console.log("artist", j, json);
            })
            .catch(error => console.log(error))
            console.log(j);
    }


    function longCards(data) {

        const contenitore = document.querySelector(".longCard");

        

        let div = document.createElement("div");
        div.classList.add("card");
        div.style.width = "18%";
        div.innerHTML = 
        `
        <img src="${data.picture_medium}" class="card-img-top" alt="...">
        <div class="card-body">
            <p class="card-title">${data.name}</p>
            <p class="card-text">Artist</p>
        </div>
        
        `
        contenitore.appendChild(div);

        const carte = document.querySelectorAll(".longCard > .card");

        console.dir(carte[h]);
        carte[h].children[0].addEventListener("click", () => {
            onArtist(data.tracklist);
        })

        carte[h].children[1].children[0].addEventListener("click", () => {
            onArtist(data.tracklist);
        })
    }

    function onArtist (tracks) {
        console.log(tracks);
    }





function prova(json) {
    const titoloBC = document.querySelector(".card-title");
    titoloBC.textContent = json.title;

    const imgBC = document.querySelector(".imgBC");
    imgBC.src = json.cover;

    const text1 = document.querySelector(".card-text1");
    let arr = [];

    for (let i = 0; i < json.contributors.length; i++) {
        let x = json.contributors[i].name;
        arr.push(x);
    }

    const contributorsText = arr.join(', ');

    text1.textContent = contributorsText;

    console.log(arr);

    const playPause = document.querySelector("#playPause");

    const muteButton = document.getElementById("muteButton");
    const audio = new Audio(json.tracks.data[0].preview);

    const volumeControl = document.getElementById("customRange1");

    const playBC = document.querySelector(".playBC");

    let isPlaying = false;


    function music (){
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

        if(volumeValue < 0.5){
            if(volumeValue == 0){
                muteButton.innerHTML = '<i class="bi bi-volume-mute-fill"></i>';
            }else{
                muteButton.innerHTML = '<i class="bi bi-volume-down-fill"></i>';
            }       
        }else if(volumeValue > 0.5){
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


// fetch(urlArtist + idArtist, {
//     method: 'GET',
// })
//     .then(response => response.json())
//     .then(json => {

//         console.log("artist", json);
//     })
//     .catch(error => console.log(error))


// fetch(" https://striveschool-api.herokuapp.com/api/deezer/artist/412/top?limit=1", {
//     method: 'GET',
// })
//     .then(response => response.json())
//     .then(json => {

//         console.log("trackList100", json);
//     })
//     .catch(error => console.log(error))




// fetch("https://striveschool-api.herokuapp.com/api/deezer/search?q=viola", {
//     method: 'GET',
// })
//     .then(response => response.json())
//     .then(json => {

//         console.log("search", json);
//     })
//     .catch(error => console.log(error))