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

async function bestMovieDataIMDB() {
    const movieData = await bestMovie()
    const imdbTitle = movieData.results[0].title
    const r = await fetch(`http://www.omdbapi.com/?apikey=ab6f1b46&t=${imdbTitle}&plot=full`, {
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

async function bestMovieAction(){
    const r = await fetch("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&genre=Action", {
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

async function bestMovieAction2(){
    const r = await fetch("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&genre=Action&page=2", {
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
bestMovieDataIMDB().then(movieDataIMDB => document.getElementById("best-movie-resume").textContent = movieDataIMDB.Plot)

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

for (let i = 0; i < 5; i++) {
    bestMovieAction().then(movie => document.getElementById(`second-category-${i + 1}`).src = movie.results[i].image_url)
}
for (let i = 0; i < 1; i++) {
    bestMovieAction2().then(movie => document.getElementById(`second-category-${i + 6}`).src = movie.results[i].image_url)
}

const bestMovieModal = document.getElementById("best-movie-modal");
const bestMovieBtn = document.getElementById("best-movie-btn-details");
const bestMoviecloseBtn = document.querySelector("#best-movie-modal-close");

//First Best Movie

bestMovieBtn.addEventListener("click", async function() {
    bestMovieModal.style.display = "flex"
    let movieData = await bestMovie()
    let movie = movieData.results[0]
    let idPrefix = "tt0"
    let id = movie.id
    let imdbID = idPrefix + id
    const response = await fetch(`http://www.omdbapi.com/?apikey=ab6f1b46&i=${imdbID}&plot=full`)
    const movieDataIMDB = await response.json()
    document.getElementById("best-movie-modal-img").src = movie.image_url
    document.getElementById("best-movie-modal-title").textContent = `${movie.title}`
    document.getElementById("best-movie-modal-genre").textContent = `Genre(s) : ${movie.genres}`
    document.getElementById("best-movie-modal-sortie").textContent = `Date de sortie : ${movie.year} `
    //document.getElementById("best-movie-modal-pegi").textContent = movie.genres
    document.getElementById("best-movie-modal-score").textContent = `Score IMDB : ${movie.imdb_score}`
    document.getElementById("best-movie-modal-director").textContent = `Réalisateur(s) : ${movie.directors}`
    document.getElementById("best-movie-modal-actors").textContent = `Acteurs : ${movie.actors}`
    document.getElementById("best-movie-modal-duree").textContent = `Durée : ${movieDataIMDB.Runtime}`
    document.getElementById("best-movie-modal-pays").textContent = `Pays : ${movieDataIMDB.Country}`
    document.getElementById("best-movie-modal-boxoffice").textContent = `Box-Office : ${movieDataIMDB.BoxOffice}`
    document.getElementById("best-movie-modal-resume").textContent = `Resumé : ${movieDataIMDB.Plot}`
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
                    <p id="best-movie-${i}-modal-boxoffice"></p>
                    <p id="best-movie-${i}-modal-resume"></p>
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
                if (i <= 4){
                    try {
                        let movieData = await bestMovie()
                        let movie = movieData.results[i]
                        const idPrefix = "tt0"
                        let id = movie.id
                        let imdbID = idPrefix + id
                        let response = await fetch(`http://www.omdbapi.com/?apikey=ab6f1b46&i=${imdbID}&plot=full`)
                        let movieDataIMDB = await response.json()
                        if(movie) {
                            document.getElementById(`best-movie-${i}-modal-img`).src = movie.image_url
                            document.getElementById(`best-movie-${i}-modal-title`).textContent = `Titre : ${movie.title}`
                            document.getElementById(`best-movie-${i}-modal-genre`).textContent = `Genre(s) : ${movie.genres}`
                            document.getElementById(`best-movie-${i}-modal-sortie`).textContent = `Date de sortie : ${movie.year}`
                            //document.getElementById(`best-movie-${i}-modal-pegi`).textContent = movie.genres
                            document.getElementById(`best-movie-${i}-modal-score`).textContent = `Score IMDB : ${movie.imdb_score}`
                            document.getElementById(`best-movie-${i}-modal-director`).textContent = `Réalisateur(s) : ${movie.directors}`
                            document.getElementById(`best-movie-${i}-modal-actors`).textContent = `Acteurs : ${movie.actors}`
                            document.getElementById(`best-movie-${i}-modal-duree`).textContent = `Durée : ${movieDataIMDB.Runtime}`
                            document.getElementById(`best-movie-${i}-modal-pays`).textContent = `Pays : ${movieDataIMDB.Country}`
                            document.getElementById(`best-movie-${i}-modal-boxoffice`).textContent = `Box-Office : ${movieDataIMDB.BoxOffice}`
                            document.getElementById(`best-movie-${i}-modal-resume`).textContent = `Resumé : ${movieDataIMDB.Plot}`
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
                        let idPrefix = "tt0"
                        let id = movie.id
                        let imdbID = idPrefix + id
                        let response = await fetch(`http://www.omdbapi.com/?apikey=ab6f1b46&i=${imdbID}`)
                        let movieDataIMDB = await response.json()
                        if(movie) {
                            document.getElementById(`best-movie-${i}-modal-img`).src = movie.image_url
                            document.getElementById(`best-movie-${i}-modal-title`).textContent = `Titre : ${movie.title}`
                            document.getElementById(`best-movie-${i}-modal-genre`).textContent = `Genre(s) : ${movie.genres}`
                            document.getElementById(`best-movie-${i}-modal-sortie`).textContent = `Date de sortie : ${movie.year}`
                            //document.getElementById(`best-movie-${i}-modal-pegi`).textContent = movie.genres
                            document.getElementById(`best-movie-${i}-modal-score`).textContent = `Score IMDB : ${movie.imdb_score}`
                            document.getElementById(`best-movie-${i}-modal-director`).textContent = `Réalisateur(s) : ${movie.directors}`
                            document.getElementById(`best-movie-${i}-modal-actors`).textContent = `Acteurs : ${movie.actors}`
                            document.getElementById(`best-movie-${i}-modal-duree`).textContent = `Durée : ${movieDataIMDB.Runtime}`
                            document.getElementById(`fbest-movie-${i}-modal-pays`).textContent = `Pays : ${movieDataIMDB.Country}`
                            document.getElementById(`best-movie-${i}-modal-boxoffice`).textContent = `Box-Office : ${movieDataIMDB.BoxOffice}`
                            document.getElementById(`best-movie-${i}-modal-resume`).textContent = `Resumé : ${movieDataIMDB.Plot}`
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
    let container = document.getElementById("first-category-modal-container")

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
                    <p id="first-category-${i}-modal-boxoffice"></p>
                    <p id="first-category-${i}-modal-resume"></p>
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
                        let idPrefix = "tt0"
                        let id = movie.id
                        let imdbID = idPrefix + id
                        let response = await fetch(`http://www.omdbapi.com/?apikey=ab6f1b46&i=${imdbID}&plot=full`)
                        let movieDataIMDB = await response.json()
                        if(movie) {
                            document.getElementById(`first-category-${i}-modal-img`).src = movie.image_url
                            document.getElementById(`first-category-${i}-modal-title`).textContent = `Titre : ${movie.title}`
                            document.getElementById(`first-category-${i}-modal-genre`).textContent = `Genre(s) : ${movie.genres}`
                            document.getElementById(`first-category-${i}-modal-sortie`).textContent = `Date de sortie : ${movie.year}`
                            //document.getElementById(`first-category-${i}-modal-pegi`).textContent = movie.genres
                            document.getElementById(`first-category-${i}-modal-score`).textContent = `Score IMDB : ${movie.imdb_score}`
                            document.getElementById(`first-category-${i}-modal-director`).textContent = `Réalisateur(s) : ${movie.directors}`
                            document.getElementById(`first-category-${i}-modal-actors`).textContent = `Acteurs : ${movie.actors}`
                            document.getElementById(`first-category-${i}-modal-duree`).textContent = `Durée : ${movieDataIMDB.Runtime}`
                            document.getElementById(`first-category-${i}-modal-pays`).textContent = `Pays : ${movieDataIMDB.Country}`
                            document.getElementById(`first-category-${i}-modal-boxoffice`).textContent = `Box-Office : ${movieDataIMDB.BoxOffice}`
                            document.getElementById(`first-category-${i}-modal-resume`).textContent = `Resumé : ${movieDataIMDB.Plot}`
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
                        let idPrefix = "tt0"
                        let id = movie.id
                        let imdbID = idPrefix + id
                        let response = await fetch(`http://www.omdbapi.com/?apikey=ab6f1b46&i=${imdbID}&plot=full`)
                        let movieDataIMDB = await response.json()
                        if(movie) {
                            document.getElementById(`first-category-${i}-modal-img`).src = movie.image_url
                            document.getElementById(`first-category-${i}-modal-title`).textContent = `Titre : ${movie.title}`
                            document.getElementById(`first-category-${i}-modal-genre`).textContent = `Genre(s) : ${movie.genres}`
                            document.getElementById(`first-category-${i}-modal-sortie`).textContent = `Date de sortie : ${movie.year}`
                            //document.getElementById(`first-category-${i}-modal-pegi`).textContent = movie.genres
                            document.getElementById(`first-category-${i}-modal-score`).textContent = `Score IMDB : ${movie.imdb_score}`
                            document.getElementById(`first-category-${i}-modal-director`).textContent = `Réalisateur(s) : ${movie.directors}`
                            document.getElementById(`first-category-${i}-modal-actors`).textContent = `Acteurs : ${movie.actors}`
                            document.getElementById(`first-category-${i}-modal-duree`).textContent = `Durée : ${movieDataIMDB.Runtime}`
                            document.getElementById(`first-category-${i}-modal-pays`).textContent = `Pays : ${movieDataIMDB.Country}`
                            document.getElementById(`first-category-${i}-modal-boxoffice`).textContent = `Box-Office : ${movieDataIMDB.BoxOffice}`
                            document.getElementById(`first-category-${i}-modal-resume`).textContent = `Resumé : ${movieDataIMDB.Plot}`
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

//Action 1-6 category
document.addEventListener("DOMContentLoaded", function () {
    let container = document.getElementById("second-category-modal-container")

    for (let i = 1; i <= 6; i++) {
        let modalHTML = `
            <div id="second-category-${i}-modal" class="modal">
                <div id="second-category-${i}-modal-content" class="modal-content">
                    <span id="second-category-${i}-modal-close" class="close">&times;</span>
                    <h2>Détails du film</h2>
                    <p id="second-category-${i}-modal-text"></p>
                    <img id="second-category-${i}-modal-img" src="">
                    <p id="second-category-${i}-modal-title"></p>
                    <p id="second-category-${i}-modal-genre"></p>
                    <p id="second-category-${i}-modal-sortie"></p>
                    <p id="second-category-${i}-modal-pegi"></p>
                    <p id="second-category-${i}-modal-score"></p>
                    <p id="second-category-${i}-modal-director"></p>
                    <p id="second-category-${i}-modal-actors"></p>
                    <p id="second-category-${i}-modal-duree"></p>
                    <p id="second-category-${i}-modal-pays"></p>
                    <p id="second-category-${i}-modal-boxoffice"></p>
                    <p id="second-category-${i}-modal-resume"></p>
                </div>
            </div>`


        container.insertAdjacentHTML("beforeend", modalHTML)

        let modal = document.getElementById(`second-category-${i}-modal`)
        let detailBtn = document.getElementById(`second-category-${i}-details-btn`)
        let modalClose = document.getElementById(`second-category-${i}-modal-close`)
        let modalText = document.getElementById(`second-category-${i}-modal-text`)

        if (detailBtn){
            detailBtn.addEventListener("click", async function() {
                modal.style.display = "flex"
                if (i <= 5){
                    try {
                        let movieData = await bestMovieAction()
                        let movie = movieData.results[i - 1]
                        let idPrefix = "tt0"
                        let id = movie.id
                        let imdbID = idPrefix + id
                        let response = await fetch(`http://www.omdbapi.com/?apikey=ab6f1b46&i=${imdbID}&plot=full`)
                        let movieDataIMDB = await response.json()
                        if(movie) {
                            document.getElementById(`second-category-${i}-modal-img`).src = movie.image_url
                            document.getElementById(`second-category-${i}-modal-title`).textContent = `Titre : ${movie.title}`
                            document.getElementById(`second-category-${i}-modal-genre`).textContent = `Genre(s) : ${movie.genres}`
                            document.getElementById(`second-category-${i}-modal-sortie`).textContent = `Date de sortie : ${movie.year}`
                            //document.getElementById(`second-category-${i}-modal-pegi`).textContent = movie.genres
                            document.getElementById(`second-category-${i}-modal-score`).textContent = `Score IMDB : ${movie.imdb_score}`
                            document.getElementById(`second-category-${i}-modal-director`).textContent = `Réalisateur(s) : ${movie.directors}`
                            document.getElementById(`second-category-${i}-modal-actors`).textContent = `Acteurs : ${movie.actors}`
                            document.getElementById(`second-category-${i}-modal-duree`).textContent = `Durée : ${movieDataIMDB.Runtime}`
                            document.getElementById(`second-category-${i}-modal-pays`).textContent = `Pays : ${movieDataIMDB.Country}`
                            document.getElementById(`fsecond-category-${i}-modal-boxoffice`).textContent = `Box-Office : ${movieDataIMDB.BoxOffice}`
                            document.getElementById(`second-category-${i}-modal-resume`).textContent = `Resumé : ${movieDataIMDB.Plot}`
                        } else {
                            console.warn(`Aucune donnée pour le film ${i}`)
                        }
                    } catch(error) {
                        console.error("Erreur lors du chargement des données")
                    }
                } else {
                    try {
                        let movieData = await bestMovieAction2()
                        let movie = movieData.results[i - 6]
                        let idPrefix = "tt0"
                        let id = movie.id
                        let imdbID = idPrefix + id
                        let response = await fetch(`http://www.omdbapi.com/?apikey=ab6f1b46&i=${imdbID}&plot=full`)
                        let movieDataIMDB = await response.json()
                        if(movie) {
                            document.getElementById(`second-category-${i}-modal-img`).src = movie.image_url
                            document.getElementById(`second-category-${i}-modal-title`).textContent = `Titre : ${movie.title}`
                            document.getElementById(`second-category-${i}-modal-genre`).textContent = `Genre(s) : ${movie.genres}`
                            document.getElementById(`second-category-${i}-modal-sortie`).textContent = `Date de sortie : ${movie.year}`
                            //document.getElementById(`second-category-${i}-modal-pegi`).textContent = movie.genres
                            document.getElementById(`second-category-${i}-modal-score`).textContent = `Score IMDB : ${movie.imdb_score}`
                            document.getElementById(`second-category-${i}-modal-director`).textContent = `Réalisateur(s) : ${movie.directors}`
                            document.getElementById(`second-category-${i}-modal-actors`).textContent = `Acteurs : ${movie.actors}`
                            document.getElementById(`second-category-${i}-modal-duree`).textContent = `Durée : ${movieDataIMDB.Runtime}`
                            document.getElementById(`second-category-${i}-modal-pays`).textContent = `Pays : ${movieDataIMDB.Country}`
                            document.getElementById(`fsecond-category-${i}-modal-boxoffice`).textContent = `Box-Office : ${movieDataIMDB.BoxOffice}`
                            document.getElementById(`second-category-${i}-modal-resume`).textContent = `Resumé : ${movieDataIMDB.Plot}`
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