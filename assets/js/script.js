async function bestMovie (){
    const r = await fetch('http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score', {
        method: "Get",
        headers: {
            "Accept": "application/json"
        }
    })
    if (r.ok === true) {
        return r.json();
    }
    throw new Error('Impossible de se connecter au serveur')
}
async function bestMovie2 (){
    const r = await fetch('http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&page=2', {
        method: "Get",
        headers: {
            "Accept": "application/json"
        }
    })
    if (r.ok === true) {
        return r.json();
    }
    throw new Error('Impossible de se connecter au serveur')
}
async function bestMovieSciFi(){
    const r = await fetch("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&genre=Sci-Fi", {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    })
    if (r.ok === true) {
        return r.json();
    }
    throw new Error("Impossible de se connecter au serveur")
}

async function bestMovieSciFi2(){
    const r = await fetch("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&genre=Sci-Fi&page=2", {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    })
    if (r.ok === true) {
        return r.json();
    }
    throw new Error("Impossible de se connecter au serveur")
}

bestMovie().then(movie => document.getElementById("best-movie-title").textContent = movie.results[0].title)
bestMovie().then(movie => document.getElementById("best-movie-img").src = movie.results[0].image_url)

for (let i = 1; i < 5; i++){
    bestMovie().then(movie => document.getElementById(`best-movie-${i}`).src = movie.results[i].image_url)
}

for (let i = 0; i < 2; i++) {
    bestMovie2().then(movie => document.getElementById(`best-movie-${i + 5}`).src = movie.results[i].image_url)
}

for (let i = 0; i < 5; i++) {
    bestMovieSciFi().then(movie => document.getElementById(`first-category-${i + 1}`).src = movie.results[i].image_url)
}
for (let i = 0; i < 1; i++) {
    bestMovieSciFi2().then(movie => document.getElementById(`first-category-${i + 6}`).src = movie.results[i].image_url)
}

const bestMovieModal = document.getElementById("best-movie-modal");
const bestMovieBtn = document.getElementById("best-movie-btn-details");
const bestMoviecloseBtn = document.querySelector("#best-movie-modal-close");

//First Best Movie

bestMovieBtn.addEventListener("click", async function() {
    bestMovieModal.style.display = "flex"
    document.getElementById("best-movie-modal-text").textContent = "Voici les informations détaillées !"
    let movieData = await bestMovie()
    let movie = movieData.results[0]
    document.getElementById("best-movie-modal-img").src = movie.image_url
    document.getElementById("best-movie-modal-title").textContent = `Titre : ${movie.title}`
    document.getElementById("best-movie-modal-genre").textContent = `Genre(s) : ${movie.genres}`
    document.getElementById("best-movie-modal-sortie").textContent = `Date de sortie : ${movie.year} `
    //document.getElementById("best-movie-modal-pegi").textContent = movie.genres
    document.getElementById("best-movie-modal-score").textContent = `Score IMDB : ${movie.imdb_score}`
    document.getElementById("best-movie-modal-director").textContent = `Réalisateur(s) : ${movie.directors}`
    document.getElementById("best-movie-modal-actors").textContent = `Acteurs : ${movie.actors}`
    //document.getElementById("best-movie-modal-duree").textContent = movie.directors
    //document.getElementById("best-movie-modal-pays").textContent = movie.directors
    //document.getElementById("best-movie-modal-boxoffice").textContent = movie.results[0].directors
    //document.getElementById("best-movie-modal-resume").textContent = movie.results[0].directors
});

bestMoviecloseBtn.addEventListener("click", function() {
    bestMovieModal.style.display = "none";  
});

window.addEventListener("click", function(event) {
    if (event.target === bestMovieModal) {
        bestMovieModal.style.display = "none";
    }
});

//Best movie 1-6 category

document.addEventListener("DOMContentLoaded", function () {
    let container = document.getElementById("best-movie-modal-container")

    for (let i = 1; i <= 6; i++) {
        let modalHTML = `
            <div id="best-movie-${i}-modal" class="modal">
                <div id="best-movie-${i}-modal-content" class="modal-content">
                    <span id="best-movie-${i}-modal-close" class="close">&times;</span>
                    <h2>Détails du film</h2>
                    <p id="best-movie-${i}-modal-text"></p>
                    <img id="best-movie-${i}-modal-img" src="">
                    <p id="best-movie-${i}-modal-title"></p>
                    <p id="best-movie-${i}-modal-genre"></p>
                    <p id="best-movie-${i}-modal-sortie"></p>
                    <p id="best-movie-${i}-modal-pegi"></p>
                    <p id="best-movie-${i}-modal-score"></p>
                    <p id="best-movie-${i}-modal-director"></p>
                    <p id="best-movie-${i}-modal-actors"></p>
                    <p id="best-movie-${i}-modal-duree"></p>
                    <p id="best-movie-${i}-modal-pays"></p>
                    <p "best-movie-${i}-modal-boxoffice"></p>
                    <p "best-movie-${i}-modal-resume"></p>
                </div>
            </div>`


        container.insertAdjacentHTML("beforeend", modalHTML)

        let modal = document.getElementById(`best-movie-${i}-modal`)
        let detailBtn = document.getElementById(`best-movie-${i}-details-btn`)
        let modalClose = document.getElementById(`best-movie-${i}-modal-close`)
        let modalText = document.getElementById(`best-movie-${i}-modal-text`)

        if (detailBtn){
            detailBtn.addEventListener("click", async function() {
                modal.style.display = "flex"
                modalText.textContent = "Voici les informations détaillées !"
                if (i <= 4){
                    try {
                        let movieData = await bestMovie()
                        let movie = movieData.results[i]
                        if(movie) {
                            document.getElementById(`best-movie-${i}-modal-img`).src = movie.image_url
                            document.getElementById(`best-movie-${i}-modal-title`).textContent = `Titre : ${movie.title}`
                            document.getElementById(`best-movie-${i}-modal-genre`).textContent = `Genre(s) : ${movie.genres}`
                            document.getElementById(`best-movie-${i}-modal-sortie`).textContent = `Date de sortie : ${movie.year}`
                            //document.getElementById(`best-movie-${i}-modal-pegi`).textContent = movie.genres
                            document.getElementById(`best-movie-${i}-modal-score`).textContent = `Score IMDB : ${movie.imdb_score}`
                            document.getElementById(`best-movie-${i}-modal-director`).textContent = `Réalisateur(s) : ${movie.directors}`
                            document.getElementById(`best-movie-${i}-modal-actors`).textContent = `Acteurs : ${movie.actors}`
                            //document.getElementById("best-movie-modal-duree").textContent = movie.directors
                            //document.getElementById("best-movie-modal-pays").textContent = movie.directors
                            //document.getElementById("best-movie-modal-boxoffice").textContent = movie.directors
                            //document.getElementById("best-movie-modal-resume").textContent = movie.directors
                        } else {
                            console.warn(`Aucune donnée pour le film ${i}`)
                        }
                    } catch(error) {
                        console.error("Erreur lors du chargement des données")
                    }
                } else {
                    try {
                        let movieData = await bestMovie2()
                        let movie = movieData.results[i - 5]
                        if(movie) {
                            document.getElementById(`best-movie-${i}-modal-img`).src = movie.image_url
                            document.getElementById(`best-movie-${i}-modal-title`).textContent = `Titre : ${movie.title}`
                            document.getElementById(`best-movie-${i}-modal-genre`).textContent = `Genre(s) : ${movie.genres}`
                            document.getElementById(`best-movie-${i}-modal-sortie`).textContent = `Date de sortie : ${movie.year}`
                            //document.getElementById(`best-movie-${i}-modal-pegi`).textContent = movie.genres
                            document.getElementById(`best-movie-${i}-modal-score`).textContent = `Score IMDB : ${movie.imdb_score}`
                            document.getElementById(`best-movie-${i}-modal-director`).textContent = `Réalisateur(s) : ${movie.directors}`
                            document.getElementById(`best-movie-${i}-modal-actors`).textContent = `Acteurs : ${movie.actors}`
                            //document.getElementById("best-movie-modal-duree").textContent = movie.directors
                            //document.getElementById("best-movie-modal-pays").textContent = movie.directors
                            //document.getElementById("best-movie-modal-boxoffice").textContent = movie.directors
                            //document.getElementById("best-movie-modal-resume").textContent = movie.directors
                        } else {
                            console.warn(`Aucune donnée pour le film ${i}`)
                        }
                    } catch(error) {
                        console.error("Erreur lors du chargement des données")
                    }
                }

        })
        
        modalClose.addEventListener("click", function() {
            modal.style.display = "none"
        });

        window.addEventListener("click", function(event) {
            if (event.target === modal) {
                modal.style.display = "none"
            }
        });
        } else {
        console.warn(`Bouton details introuvable pour le film ${i}`)
        }
    }
});



//Sci-Fi 1-6 category
document.addEventListener("DOMContentLoaded", function () {
    let container = document.getElementById("best-movie-modal-container")

    for (let i = 1; i <= 6; i++) {
        let modalHTML = `
            <div id="first-category-${i}-modal" class="modal">
                <div id="first-category-${i}-modal-content" class="modal-content">
                    <span id="first-category-${i}-modal-close" class="close">&times;</span>
                    <h2>Détails du film</h2>
                    <p id="first-category-${i}-modal-text"></p>
                    <img id="first-category-${i}-modal-img" src="">
                    <p id="first-category-${i}-modal-title"></p>
                    <p id="first-category-${i}-modal-genre"></p>
                    <p id="first-category-${i}-modal-sortie"></p>
                    <p id="first-category-${i}-modal-pegi"></p>
                    <p id="first-category-${i}-modal-score"></p>
                    <p id="first-category-${i}-modal-director"></p>
                    <p id="first-category-${i}-modal-actors"></p>
                    <p id="first-category-${i}-modal-duree"></p>
                    <p id="first-category-${i}-modal-pays"></p>
                    <p "first-category-${i}-modal-boxoffice"></p>
                    <p "first-category-${i}-modal-resume"></p>
                </div>
            </div>`


        container.insertAdjacentHTML("beforeend", modalHTML)

        let modal = document.getElementById(`first-category-${i}-modal`)
        let detailBtn = document.getElementById(`first-category-${i}-details-btn`)
        let modalClose = document.getElementById(`first-category-${i}-modal-close`)
        let modalText = document.getElementById(`first-category-${i}-modal-text`)

        if (detailBtn){
            detailBtn.addEventListener("click", async function() {
                modal.style.display = "flex"
                modalText.textContent = "Voici les informations détaillées !"
                if (i <= 5){
                    try {
                        let movieData = await bestMovieSciFi()
                        let movie = movieData.results[i - 1]
                        if(movie) {
                            document.getElementById(`first-category-${i}-modal-img`).src = movie.image_url
                            document.getElementById(`first-category-${i}-modal-title`).textContent = `Titre : ${movie.title}`
                            document.getElementById(`first-category-${i}-modal-genre`).textContent = `Genre(s) : ${movie.genres}`
                            document.getElementById(`first-category-${i}-modal-sortie`).textContent = `Date de sortie : ${movie.year}`
                            //document.getElementById(`first-category-${i}-modal-pegi`).textContent = movie.genres
                            document.getElementById(`first-category-${i}-modal-score`).textContent = `Score IMDB : ${movie.imdb_score}`
                            document.getElementById(`first-category-${i}-modal-director`).textContent = `Réalisateur(s) : ${movie.directors}`
                            document.getElementById(`first-category-${i}-modal-actors`).textContent = `Acteurs : ${movie.actors}`
                            //document.getElementById("first-category-modal-duree").textContent = movie.directors
                            //document.getElementById("first-category-modal-pays").textContent = movie.directors
                            //document.getElementById("first-category-modal-boxoffice").textContent = movie.directors
                            //document.getElementById("first-category-modal-resume").textContent = movie.directors
                        } else {
                            console.warn(`Aucune donnée pour le film ${i}`)
                        }
                    } catch(error) {
                        console.error("Erreur lors du chargement des données")
                    }
                } else {
                    try {
                        let movieData = await bestMovieSciFi2()
                        let movie = movieData.results[i - 6]
                        if(movie) {
                            document.getElementById(`first-category-${i}-modal-img`).src = movie.image_url
                            document.getElementById(`first-category-${i}-modal-title`).textContent = `Titre : ${movie.title}`
                            document.getElementById(`first-category-${i}-modal-genre`).textContent = `Genre(s) : ${movie.genres}`
                            document.getElementById(`first-category-${i}-modal-sortie`).textContent = `Date de sortie : ${movie.year}`
                            //document.getElementById(`first-category-${i}-modal-pegi`).textContent = movie.genres
                            document.getElementById(`first-category-${i}-modal-score`).textContent = `Score IMDB : ${movie.imdb_score}`
                            document.getElementById(`first-category-${i}-modal-director`).textContent = `Réalisateur(s) : ${movie.directors}`
                            document.getElementById(`first-category-${i}-modal-actors`).textContent = `Acteurs : ${movie.actors}`
                            //document.getElementById("first-category-modal-duree").textContent = movie.directors
                            //document.getElementById("first-category-modal-pays").textContent = movie.directors
                            //document.getElementById("first-category-modal-boxoffice").textContent = movie.directors
                            //document.getElementById("first-category-modal-resume").textContent = movie.directors
                        } else {
                            console.warn(`Aucune donnée pour le film ${i}`)
                        }
                    } catch(error) {
                        console.error("Erreur lors du chargement des données")
                    }
                }

        })
        
        modalClose.addEventListener("click", function() {
            modal.style.display = "none"
        });

        window.addEventListener("click", function(event) {
            if (event.target === modal) {
                modal.style.display = "none"
            }
        });
        } else {
        console.warn(`Bouton details introuvable pour le film ${i}`)
        }
    }
});