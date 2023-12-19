
const API_URL = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
let searchPerformed = false; //controlla la vista


function searchQuery(query){
    searchPerformed=true;
    showDetails();
    
    let encodedQuery = encodeURIComponent(query) //Importante per formattare correttamente la query (spazi, caratteri, ecc.)
    
    fetch(API_URL + encodedQuery, {method:'GET'})
    .then(response => {
        if(response.ok) {
            return response.json();
        } else {
            console.error('Error:', response);
            throw new Error('Bad request');
        }

    })
    .then(searchData =>{
        console.log("SearchData: ",searchData);
        //inserire To show
        
        discografia(searchData.data);
        compilarePiuRelevante(searchData.data);
        
        //inserire compilareHtmlSearch, searchData come parametro
        let tracklistUrl = searchData.data[0].artist.tracklist;
        console.log(tracklistUrl); //secondo URL per Fetch
        return fetch(tracklistUrl)
    })
    .then(response2 => response2.json())
    .then(trackData => { //Qui lavorare con secondo fetch (tracklist)
        console.log("Tracklist: ", trackData);
        //inserire secondo contenuto
        compilareBrani(trackData.data);
        
        
        
    })
    .catch(error => console.log("Error " + error))
}



function basicSearch(){
    
    let searchForm = document.getElementById('search');
    
    
    searchForm.addEventListener('submit', (e)=>{
        e.preventDefault();
        showDetails();
        let searchInput = searchForm.querySelector('input[type="search"]');
        let userQuery = searchInput.value;
        console.log("Userquery:" + userQuery);
        searchQuery(userQuery);
        

    })

}

basicSearch();




function compilarePiuRelevante(searchData){ //Compilazione HTML Prima Parte
    const artistId = searchData[0].artist.id;
    const artistUrl = `artist-page-copy.html?id=${artistId}`;

    let imgPiuRelevante = document.getElementById('imgPiuRelevante');
    imgPiuRelevante.setAttribute('src', searchData[0].artist.picture_medium);
    wrapElementWithLink(imgPiuRelevante, artistUrl);

    let nomePiuRelevante = document.getElementById('nomePiuRelevante');
    nomePiuRelevante.textContent = searchData[0].artist.name;

    let searchInput = document.querySelector('input[type="search"]');
    let userQuery = searchInput.value;
    let risultatoNome = document.getElementById('risultatoNome');
    risultatoNome.textContent = "Con " + userQuery;


}

function wrapElementWithLink(element, url) {
    let link = document.createElement('a');
    link.href = url;
    link.appendChild(element.cloneNode(true));
    element.parentNode.replaceChild(link, element);
}

function compilareBrani(trackData){ //Compilazione HTML Seconda Parte
    let trackBrani = document.getElementById('ulBraniParent');
    trackBrani.innerHTML = "";

    for(let i=0; i<trackData.length; i++){
        if(i == 5){
            break;
        }
        const ore = Math.floor(trackData[i].duration / 100);
        const minuti = trackData[i].duration % 100;
        const orarioFormat = ore + ':' + (minuti < 10 ? '0' : '') + minuti;
        
            // let trackLi = `
            // <div class="card mb-3" style="max-width: 600px;">
            //     <div class="row g-0">
            //         <div class="col-md-4">
            //         <img src=${trackData[i].album.cover_medium} class="img-fluid rounded-start" alt="...">
            //         </div>
            //         <div class="col-md-8">
            //         <div class="card-body d-flex">
            //             <h5 class="card-title">${trackData[i].title}</h5>
            //             <p class="card-text">${trackData[i].artist.name}</p>
            //             <p class="card-text"><small class="text-muted">${orarioFormat}</small></p>
            //         </div>
            //         </div>
            //     </div>
            //     </div>`


                let trackLi = `
            <div class="col-3"><img class="w-75" src=${trackData[i].album.cover_medium}></div>
            <div class="col-6 pBrani"> <p class="mb-0" >${trackData[i].title}</p>
            <p class="mb-0">${trackData[i].artist.name}</p></div>
            <div class="col-3"><p class="pBrani">${orarioFormat}</p></div>
            `
            
            trackBrani.innerHTML += trackLi;
        

    }
        
    
}

function discografia(data) {
    const contenitore = document.getElementById("longCard");
    contenitore.innerHTML=`<div class="col-12 mb-2 ml-4"><h3><p id="risultatoNome">Rage against the machine</p></h3> `

    const albumesSet = new Set(); //

    for (let i = 0; i < data.length; i++) {
        if (albumesSet.size === 5) {
            break;
        }
        const album = data[i].album;

        if (!albumesSet.has(album.id)) {
            albumesSet.add(album.id);

    //         let div = document.createElement("div");
        
    // div.classList.add("card");
    // div.style.width = "18%";

    // div.innerHTML = `
    //             <a href="artist-page-copy.html?id=${data[i].artist.id}" class=""><img src="${data[i].album.cover_medium}" class="card-img-top " alt="..."></a> 
    //             <button class="playHoverLongCard position-absolute">
    //             <i class="bi bi-play-fill"></i>
    //         </button>       
    //             <div class="card-body">
    //                 <p class="card-title truncate-text"><a href="#" class="text-decoration-none text-white">${data[i].album.title}</a></p>
    //                 <p class="card-text"><a href="#" class="text-decoration-none text-white">${data[i].artist.name}</a></p>
                  
    //             </div>        
    //             `
    let infoAlbum = `
    <div class="card d-flex cardPlayl col-3" style="width: 10rem;" >
    <a href="artist-page-copy.html?id=${data[i].artist.id}" class=""><img src="${data[i].album.cover_medium}" class="card-img-top" alt="..."></a> 
    <button class="playPCard position-absolute">
        <i class="bi bi-play-fill"></i>
    </button>
    <div class="card-body">
      <p class="card-title">${data[i].album.title}</p>
      <p class="card-text">${data[i].artist.name}</p>
     
    </div>
    </div>
    `
            contenitore.innerHTML += infoAlbum;
    // contenitore.appendChild(div);

    }


}
    
}   


function showDetails(){
    let toShow = document.getElementById("toShow");
    if (searchPerformed) {
        
        toShow.classList.remove("d-none");
    }
}


