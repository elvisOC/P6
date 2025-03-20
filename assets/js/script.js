async function bestMovie (){
    const r = await fetch('http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score', {
        method: "Get",
        headers: {
            "Accept": "application/json"
        }
    })
    if (!r.ok) {
        throw new Error('Impossible de se connecter au serveur')
    }
    return r.json()
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
    if (!r.ok) {
        throw new Error('Impossible de se connecter au serveur')
    }
    return r.json()
}

async function bestMovie2 (){
    const r = await fetch('http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&page=2', {
        method: "Get",
        headers: {
            "Accept": "application/json"
        }
    })
    if (!r.ok) {
        throw new Error('Impossible de se connecter au serveur')
    }
    return r.json()
}

async function bestMovieSciFi(){
    const r = await fetch("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&genre=Sci-Fi", {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    })
    if (!r.ok) {
        throw new Error('Impossible de se connecter au serveur')
    }
    return r.json()
}

async function bestMovieSciFi2(){
    const r = await fetch("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&genre=Sci-Fi&page=2", {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    })
    if (!r.ok) {
        throw new Error('Impossible de se connecter au serveur')
    }
    return r.json()
}

async function bestMovieAction(){
    const r = await fetch("http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&genre=Action", {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    })
    if (r.ok === true) {
        return r.json()
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
    if (!r.ok) {
        throw new Error("Impossible de se connecter au serveur")
    }
    return r.json()
}

async function otherCategory(category){
    const r = await fetch(`http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&genre=${category}`, {
        method: "GET",
        headers: {
            "Accept": "application/json"
        }
    })
    if (!r.ok) {
        throw new Error("Impossible de se connecter au serveur")
    }
    return r.json()
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
                            document.getElementById(`second-category-${i}-modal-boxoffice`).textContent = `Box-Office : ${movieDataIMDB.BoxOffice}`
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
                        console.log(movie)
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
                            document.getElementById(`second-category-${i}-modal-boxoffice`).textContent = `Box-Office : ${movieDataIMDB.BoxOffice}`
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
})

//Autres 1
async function getAllCategories() {
    let url = "http://127.0.0.1:8000/api/v1/genres";
    let categories = []

    while (url) {
        const r = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        });

        if (!r.ok) {
            throw new Error("Impossible de se connecter au serveur")
        }

        const data = await r.json()
        categories = categories.concat(data.results) 

        url = data.next
    }

    addCategoriesToSelect(categories)
}

document.addEventListener("DOMContentLoaded", function(){
    const container = document.getElementById("category-info")
    for (let i = 0; i <= 5; i++){
        let modalHTML = `
                <div class="col mt-5">
                    <div class="image-container">
                        <img id="others-category-${i}-img" src="" width="400em" alt="">
                        <div class="overlay" id="others-category-${i}-details-btn">Détails</div>
                        <div id="others-category-modal-container"></div>
                    <div id="others-category-${i}-modal" class="modal">
                            <div id="others-category-${i}-modal-content "class="modal-content">
                                <span id="others-category-${i}-modal-close" class="close">&times;</span>
                                <h2>Détails du film</h2>
                                <p id="others-category-${i}-modal-text"></p>
                                <img id="others-category-${i}-modal-img" src="">
                                <p id="others-category-${i}-modal-title"></p>
                                <p id="others-category-${i}-modal-genre"></p>
                                <p id="others-category-${i}-modal-sortie"></p>
                                <p id="others-category-${i}-modal-pegi"></p>
                                <p id="others-category-${i}-modal-score"></p>
                                <p id="others-category-${i}-modal-director"></p>
                                <p id="others-category-${i}-modal-actors"></p>
                                <p id="others-category-${i}-modal-duree"></p>
                                <p id="others-category-${i}-modal-pays"></p>
                                <p id="others-category-${i}-modal-boxoffice"></p>
                                <p id="others-category-${i}-modal-resume"></p>
                            </div>
                        </div>
                    </div>
                </div>`
            container.insertAdjacentHTML("beforeend", modalHTML)
    }})

function addCategoriesToSelect(categories) {
    const select = document.getElementById("autres-select-1")
    categories.forEach(category => {
        const option = document.createElement("option")
        option.value = category.id
        option.textContent = category.name
        select.appendChild(option)
    })
    let selectedCategoryDiv = document.createElement("div")
    selectedCategoryDiv.id = "selected-category"
    select.parentNode.appendChild(selectedCategoryDiv)
    
    select.addEventListener("change", async function () {
        let selectedCategoryId = select.value
        let selectedCategory = categories.find(cat => cat.id == selectedCategoryId)
        let category = selectedCategory.name
        document.getElementById("selected-category").setAttribute("data-value", `${category}`)
        movieData = await otherCategory(category) 
        movie = movieData.results
        for(let i = 0; i < 5; i++) {
            document.getElementById(`others-category-${i}-img`).src = movie[i].image_url
            let modal = document.getElementById(`others-category-${i}-modal`)
            let detailBtn = document.getElementById(`others-category-${i}-details-btn`)
            let modalClose = document.getElementById(`others-category-${i}-modal-close`)
            let modalText = document.getElementById(`others-category-${i}-modal-text`)
    
            if (detailBtn){
                detailBtn.addEventListener("click", async function() {
                    modal.style.display = "flex"
                    if (i <= 4){
                        try {
                            let movieData = await otherCategory(category)
                            let movie = movieData.results[i]
                            let idPrefix = "tt0"
                            let id = movie.id
                            let imdbID = idPrefix + id
                            let response = await fetch(`http://www.omdbapi.com/?apikey=ab6f1b46&i=${imdbID}&plot=full`)
                            let movieDataIMDB = await response.json()
                            if(movie) {
                                document.getElementById(`others-category-${i}-modal-img`).src = movie.image_url
                                document.getElementById(`others-category-${i}-modal-title`).textContent = `Titre : ${movie.title}`
                                document.getElementById(`others-category-${i}-modal-genre`).textContent = `Genre(s) : ${movie.genres}`
                                document.getElementById(`others-category-${i}-modal-sortie`).textContent = `Date de sortie : ${movie.year}`
                                //document.getElementById(`others-category-${i}-modal-pegi`).textContent = movie.genres
                                document.getElementById(`others-category-${i}-modal-score`).textContent = `Score IMDB : ${movie.imdb_score}`
                                document.getElementById(`others-category-${i}-modal-director`).textContent = `Réalisateur(s) : ${movie.directors}`
                                document.getElementById(`others-category-${i}-modal-actors`).textContent = `Acteurs : ${movie.actors}`
                                document.getElementById(`others-category-${i}-modal-duree`).textContent = `Durée : ${movieDataIMDB.Runtime}`
                                document.getElementById(`others-category-${i}-modal-pays`).textContent = `Pays : ${movieDataIMDB.Country}`
                                document.getElementById(`others-category-${i}-modal-boxoffice`).textContent = `Box-Office : ${movieDataIMDB.BoxOffice}`
                                document.getElementById(`others-category-${i}-modal-resume`).textContent = `Resumé : ${movieDataIMDB.Plot}`
                            } else {
                                console.warn(`Aucune donnée pour le film ${i}`)
                            }
                        } catch(error) {
                            console.error("Erreur lors du chargement des données")
                        }
                    } else {
                        try {
                            let movieData = await bestMovieAction2()
                            let movie = movieData.results[i - 5]
                            console.log(movie)
                            let idPrefix = "tt0"
                            let id = movie.id
                            let imdbID = idPrefix + id
                            let response = await fetch(`http://www.omdbapi.com/?apikey=ab6f1b46&i=${imdbID}&plot=full`)
                            let movieDataIMDB = await response.json()
                            if(movie) {
                                document.getElementById(`others-category-${i}-modal-img`).src = movie.image_url
                                document.getElementById(`others-category-${i}-modal-title`).textContent = `Titre : ${movie.title}`
                                document.getElementById(`others-category-${i}-modal-genre`).textContent = `Genre(s) : ${movie.genres}`
                                document.getElementById(`others-category-${i}-modal-sortie`).textContent = `Date de sortie : ${movie.year}`
                                //document.getElementById(`others-category-${i}-modal-pegi`).textContent = movie.genres
                                document.getElementById(`others-category-${i}-modal-score`).textContent = `Score IMDB : ${movie.imdb_score}`
                                document.getElementById(`others-category-${i}-modal-director`).textContent = `Réalisateur(s) : ${movie.directors}`
                                document.getElementById(`others-category-${i}-modal-actors`).textContent = `Acteurs : ${movie.actors}`
                                document.getElementById(`others-category-${i}-modal-duree`).textContent = `Durée : ${movieDataIMDB.Runtime}`
                                document.getElementById(`others-category-${i}-modal-pays`).textContent = `Pays : ${movieDataIMDB.Country}`
                                document.getElementById(`others-category-${i}-modal-boxoffice`).textContent = `Box-Office : ${movieDataIMDB.BoxOffice}`
                                document.getElementById(`others-category-${i}-modal-resume`).textContent = `Resumé : ${movieDataIMDB.Plot}`
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
    })
}

getAllCategories().catch(error => console.error(error))
