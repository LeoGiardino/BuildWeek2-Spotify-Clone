let urlAlbum = "https://striveschool-api.herokuapp.com/api/deezer/album/"
let idAlbum = "75621062";
let idAlbumProva = "12207660"

fetch(urlAlbum + idAlbum, {
    method: 'GET',
})
.then(response => response.json())
.then(jsonAlbum => {
    console.log("album", jsonAlbum);
    albumPage(jsonAlbum)
})


function albumPage(album) {

    //Sezione principale Album 
    document.querySelector(".copertinaAlbumLarge").src = album.artist.picture_xl
    document.querySelector(".copertinaAlbumSmall").src = album.cover_medium
    let albumTitle = document.querySelector(".albumInfo .albumName")
    albumTitle.innerText = album.title
    let artistAlbumName = document.querySelector(".artistAlbumName")
    artistAlbumName.innerText = album.artist.name

    let tracksAlbum = document.querySelector(".tracksAlbumContainer")
    console.log(tracksAlbum);
    //Tracks 
    for (let t= 0; t< album.tracks.data.length; t++) {

            const row = document.createElement('div');
            row.classList.add('row', 'mb-3');
            
            const ore = Math.floor(album.tracks.data[t].duration / 100);
            const minuti = album.tracks.data[t].duration % 100;
            const orarioFormat = ore + ':' + (minuti < 10 ? '0' : '') + minuti;

            row.setAttribute('data-indice-originale', t + 1);
            row.indiceOriginale = t + 1; 
            row.innerHTML =
            `
                <div class="col-1 indice">${t + 1}</div>
                <div class="col-5 d-flex flex-column">
                    ${album.tracks.data[t].title}
                    <span class="featuringTracks"> ${album.artist.name} </span>
                </div>
                <div class="col-1"></div>
                <div class="col-3"> ${album.tracks.data[t].rank} </div>
                <div class="col-2">${orarioFormat}</div>
            `
            tracksAlbum.appendChild(row);

            const indice = row.querySelector('.indice');
            let isPlaying = false;

            row.addEventListener('mouseover', function () {
                if (!isPlaying) {
                    indice.innerHTML = '<i class="bi bi-play-fill fs-5"></i>';
                }
            });
    
            row.addEventListener('mouseout', function () {
                if (!isPlaying) {
                    // Ripristina l'indice originale
                    indice.textContent = row.indiceOriginale;
                }
            });

        } /* Fine For Tracks */
}