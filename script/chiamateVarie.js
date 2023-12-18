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




fetch('https://striveschool-api.herokuapp.com/api/deezer/search?q=viola', {
    method: 'GET',
})
    .then(response => response.json())
    .then(json => {

        console.log("search", json);
    })
    .catch(error => console.log(error))



fetch('https://striveschool-api.herokuapp.com/api/deezer/search?q=queen& top?limit=1000', {
    method: 'GET',
})
    .then(response => response.json())
    .then(json => {

        console.log("search prova", json);
    })
    .catch(error => console.log(error))





/* chiamateCasuali();
let i = 0;
function chiamateCasuali() {
    timerInterval = setInterval(() => {
        fetch(urlSearch + `${paroleMetal[Math.floor(Math.random()*paroleMetal.length)]}`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(json => {
                if (!json.error) {
                    console.log("album", i, json);
                    i++;
                }
            })
            .catch(error => console.log(i, error))
        
        if (i === paroleMetalSoft.length-1) {
            onTimesUp();

        }
    }, 3000);
}
function onTimesUp() {
    clearInterval(timerInterval);

}
 */


let arrayParole = [
    'Melody',
    'Harmony',
    'Echoes',
    'Wanderer',
    'Enchant',
    'Whisper',
    'Mystic',
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
    'Tranquility',
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
    'Starlight',
    'Sylvan',
    'Sublime',
    'Luminescent',
    'Velvet',
    'Halcyon',
    'Pristine',
    'Enrapture',
    'Cerulean',
    'Silhouette',
    'Darkness',
    'Fire',
    'Sacrifice',
    'Warrior',
    'Blood',
    'Eternal',
    'Demon',
    'Steel',
    'Thunder',
    'Victory',
    'Shadow',
    'Rage',
    'Chaos',
    'Sorrow',
    'Crypt',
    'Storm',
    'Skull',
    'Battle',
    'Iron',
    'Witch',
    'Serpent',
    'Grave',
    'Angel',
    'Reaper',
    'Immortal',
    'Doom',
    'Nightmare',
    'Blade',
    'Raven',
    'Kingdom',
    'Mystic',
    'Abyss',
    'Torture',
    'Tempest',
    'Hate',
    'Crimson',
    'Throne',
    'Casket',
    'Fear',
    'Twilight',
    'Beast',
    'Majesty',
    'Labyrinth',
    'Legacy',
    'Necropolis',
    'Whisper',
    'Hellfire',
    'Oracle'
]




let paroleMetalSoft = [
    'Melody',
    'Harmony',
    'Echoes',
    'Wanderer',
    'Enchant',
    'Whisper',
    'Mystic',
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
    'Radiance',
    'Breeze',
    'Infinite',
    'Harbor',
    'Peaceful',
    'Tranquility',
    'Soothing',
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
    'Starlight',
    'Sylvan',
    'Sublime',
    'Luminescent',
    'Velvet',
    'Halcyon',
    'Pristine',
    'Enrapture',
    'Cerulean',
    'Silhouette'
]

let paroleMetal = [
    'Darkness',
    'Fire',
    'Sacrifice',
    'Warrior',
    'Blood',
    'Eternal',
    'Demon',
    'Steel',
    'Thunder',
    'Victory',
    'Shadow',
    'Rage',
    'Chaos',
    'Sorrow',
    'Crypt',
    'Storm',
    'Skull',
    'Battle',
    'Iron',
    'Witch',
    'Serpent',
    'Grave',
    'Angel',
    'Reaper',
    'Immortal',
    'Doom',
    'Nightmare',
    'Blade',
    'Raven',
    'Kingdom',
    'Mystic',
    'Abyss',
    'Torture',
    'Tempest',
    'Hate',
    'Crimson',
    'Throne',
    'Casket',
    'Fear',
    'Twilight',
    'Beast',
    'Majesty',
    'Labyrinth',
    'Legacy',
    'Necropolis',
    'Whisper',
    'Hellfire',
    'Oracle'
];

/* let label = [
    "Universal Music Group (UMG)",
    "Warner Music Group",
    "Atlantic Records",
    "Columbia Records",
    "BMG",
    "Interscope Records",
    "RCA Records",
    "Def Jam Recordings",
    "Epic Records",
    "Motown",
    "Sub Pop",
    "Arista Records",
    "Dreamville",
    "Cash Money Records",
    "Roc Nation",
    "XL Recordings",
    "Wind-Up Records",
    "Jive Records",
    "Geffen Records",
    "Nuclear Blast",
    "Fueled by Ramen",
    "4AD",
    "Century Media Records",
    "Roadrunner Records",
    "Metal Blade Records",
    "Napalm Records",
    "Season of Mist",
    "Relapse Records",
    "Earache Records",
    "Nuclear War Now! Productions",
    "Prosthetic Records",
    "Peaceville Records",
    "AFM Records",
    "Rise Above Records",
    "Unique Leader Records",
    "Mighty Music",
    "Lifeforce Records",

    "Debemur Morti Productions",
    "Agonia Records",
    "Eisenwald",
    "Scarlet Records",
    "Capitol Records",
    "Elektra Records",
    "Island Records",
    "Stax Records",
    "Decca Records",
    "Mercury Records",
    "Vee-Jay Records",
    "Imperial Records",
    "MCA Records",
    "Warner Bros. Records",
    "Chrysalis Records",
    "Blue Note Records",
    "United Artists Records",
    "Sire Records",
    "Virgin Records",
    "Polydor Records",
    "A&M Records",
    "Sunset Records",
];
 */

let caseMetal = [
    "Nuclear Blast",
    "Century Media Records",
    "Roadrunner Records",
    "Metal Blade Records",
    "Napalm Records",
    "Season of Mist",
    "Relapse Records",
    "Earache Records",
    "Nuclear War Now! Productions",
    "Prosthetic Records",
    "Peaceville Records",
    "AFM Records",
    "Inside Out Music",
    "Rise Above Records",
    "Unique Leader Records",
    "Mighty Music",
    "Lifeforce Records",
    "Black Lodge Records",
    "Debemur Morti Productions",
    "Agonia Records",
    "Eisenwald",
    "Scarlet Records",
    "Relapse Records",
];



/* 
chiamateCasuali();
let i = 0;
function chiamateCasuali() {
    timerInterval = setInterval(() => {
        fetch(urlSearch+`label:"${caseMetal[i]}"`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(json => {
                if (!json.error) {
                    console.log("label", caseMetal[i], json);
                    i++;
                }
            })
            .catch(error => console.log(i, error))
        
        if (i === caseMetal.length-1) {
            onTimesUp();

        }
    }, 3000);
}
function onTimesUp() {
    clearInterval(timerInterval);

}
 */
let caseRock = [
    "Atlantic Records",
    "Capitol Records",
    "RCA Records",
    "Elektra Records",
    "Island Records",
    "Stax Records",
    "Columbia Records",
    "Decca Records",
    "Mercury Records",
    "Vee-Jay Records",
    "Imperial Records",
    "MCA Records",
    "Warner Bros. Records",
    "Epic Records",
    "Chrysalis Records",
    "Arista Records",
    "Motown",
    "Blue Note Records",
    "United Artists Records",
    "Sire Records",
    "Virgin Records",
    "Polydor Records",
    "A&M Records",
    "Sunset Records",
];

const label = [ 
    "Geffen Records",
    "Interscope Records",
    "Columbia Records",
    "Atlantic Records",
    "Island Records",
    "Epic Records",
    "RCA Records",
    "Virgin Records",
    "Arista Records",
    "BMG",
    "Motown",
    "Syco Music",
    "Elektra Records",
   
  ];
  
  
    


chiamateCasuali();
let i = 0;
function chiamateCasuali() {
    timerInterval = setInterval(() => {
        fetch(urlSearch + `label:"${label[i]}"`, {
            method: 'GET',
        })
            .then(response => response.json())
            .then(json => {
                if (!json.error) {
                    console.log("label", label[i], json);
                    stampaNomi(json.data);
                    i++;
                }
            })
            .catch(error => console.log(i, error))

        if (i === label.length - 1) {
            onTimesUp();

        }
    }, 4000);
}
function onTimesUp() {
    clearInterval(timerInterval);

}
function stampaNomi(tracce) {
    let nomeGiàPresente = false;
    let ripetizioni = []; 
    let nomi = [];
    console.log(label[i] + "----------------------------------------------------------------------");
    tracce.forEach(ele => {
        nomeGiàPresente = false;
        for (let i = 0; i < nomi.length; i++) {
            if (nomi[i] == ele.artist.name) {
                ripetizioni[i] = ripetizioni[i] + 1;
                nomeGiàPresente = true;
                break
            }
        }
        if (!nomeGiàPresente) {
            nomi.push(ele.artist.name);
            ripetizioni.push(1);

        }
    });
    console.log(nomi.length);
    for (let i = 0; i < nomi.length; i++) {
        console.log(nomi[i] + " E' PRESENTE "+ ripetizioni[i]);
    }

}