async function bestMovie(page){
    let movie = []

    for (let i = 1; i <= page; i++){
        let url = `http://127.0.0.1:8000/api/v1/titles/?sort_by=-imdb_score&page=${i}`
        const r = await fetch(url, {
            method: "Get",
            headers: {
                "Accept": "application/json"
            }
        })
        if (!r.ok) {
            throw new Error('Impossible de se connecter au serveur')
        }
        const data = await r.json()
        movie = movie.concat(data.results)
    }
    return movie
}

async function getMovie(categorie, page) {
    let movies = []

    for (let i = 1; i <= page; i++){
        let url = `http://127.0.0.1:8000/api/v1/titles/?genre=${categorie}&page=${i}&sort_by=-imdb_score`
        const r = await fetch(url, {
            method: "GET",
            headers: {
                "Accept": "application/json"
            }
        })
        if (!r.ok) {
            throw new Error("Impossible de se connecter au serveur")
        }
        const data = await r.json()
        movies = movies.concat(data.results)
    }
    return movies
}

async function getDataIMDB(id) {
    const r = await fetch(`http://www.omdbapi.com/?apikey=ab6f1b46&i=${id}&plot=full`, {
        method: "GET",
        headers: {
            "Accept" : "application/json"
        }
    })
    if (!r.ok){
        throw new Error("Impossible de se connecter au serveur")
    }

    return r.json()
}

async function acceuilBestMovie() {
    let movieData = await bestMovie(1)
    let movie = movieData[0]
    let idPrefix = "tt0"
    let id = movie.id
    let imdbID = idPrefix + id
    let movieDataIMDB = await getDataIMDB(imdbID)
    document.getElementById("best-movie-title").textContent = movie.title
    document.getElementById("best-movie-img").src = movie.image_url
    document.getElementById("best-movie-resume").textContent = movieDataIMDB.Plot
}
acceuilBestMovie()

//Bouton voir plus et voir moins




//First Best Movie

const bestMovieModal = document.getElementById("best-movie-modal");
const bestMovieBtn = document.getElementById("best-movie-btn-details");
const bestMoviecloseBtn = document.querySelector("#best-movie-modal-close");

bestMovieBtn.addEventListener("click", async function() {
    bestMovieModal.style.display = "flex"
    let movieData = await bestMovie(1)
    let movie = movieData[0]
    let idPrefix = "tt0"
    let id = movie.id
    let imdbID = idPrefix + id
    let movieDataIMDB = await getDataIMDB(imdbID)
    document.getElementById("best-movie-modal-img").src = movie.image_url
    document.getElementById("best-movie-modal-title").textContent = movie.title
    document.getElementById("best-movie-first-line").textContent = `${movie.year} - ${movie.genres} `
    document.getElementById("best-movie-second-line").textContent = movieDataIMDB.Runtime, movieDataIMDB.Country
    document.getElementById("best-movie-third-line").textContent = `IMDB score : ${movie.imdb_score}`
    document.getElementById("best-movie-fourth-line").textContent = `Recettes au box-office : ${movieDataIMDB.BoxOffice}`
    document.getElementById("best-movie-fifth-line").textContent = movie.directors
    //document.getElementById("best-movie-modal-pegi").textContent = movie.genres
    document.getElementById("best-movie-modal-actors").textContent = `Acteurs : ${movie.actors}`
    document.getElementById("best-movie-modal-resume").textContent = `Resumé : ${movieDataIMDB.Plot}`
})

bestMoviecloseBtn.addEventListener("click", function() {
    bestMovieModal.style.display = "none";  
})

window.addEventListener("click", function(event) {
    if (event.target === bestMovieModal) {
        bestMovieModal.style.display = "none";
    }
})

//Best movie 1-6 category
function bestMovieCategory() {
    document.addEventListener("DOMContentLoaded", async function () {
    
        for (let i = 1; i <= 6; i++) {
            let movieData = await bestMovie(2)
            let movie = movieData[i]
            let idPrefix = "tt0"
            let id = movie.id
            let imdbID = idPrefix + id
            let movieDataIMDB = await getDataIMDB(imdbID)
            let container = document.getElementById("row-best-movie")
            let modalHTML = `
            <div class="col mt-5">
                <div class="image-container">
                    <img id="best-movie-${i}-img" src="" width="400em" alt="">
                    <div class="overlay" id="best-movie-${i}-details-btn">Détails</div>
                        <div id="best-movie-${i}-modal" class="modal">
                            <div id="best-movie-${i}-custom-modal-content" class="custom-modal-content">
                                <div class="custom-modal-header">
                                    <div class="modal-infos">
                                        <h2 id="best-movie-${i}-modal-title"></h2>
                                        <p id="best-movie-${i}-first-line"></p>
                                        <p id="best-movie-${i}-second-line"></p>
                                        <p id="best-movie-${i}-third-line"></p>
                                        <p id="best-movie-${i}-fourth-line"></p>
                                        <p>Réalisé par :</p>
                                        <p id="best-movie-${i}-fifth-line"></p>
                                    </div>
                                    <div class="modal-image">
                                        <img id="best-movie-${i}-modal-img" src="">
                                    </div>
                                </div>
                                <div class="custom-modal-body">
                                    <p id="best-movie-${i}-modal-resume"></p>
                                    <p id="best-movie-${i}-modal-actors"></p>
                                </div>
                                <div class="custom-modal-footer">
                                    <button id ="best-movie-${i}-modal-close" class="close" class="text-center">Fermer</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`

            container.insertAdjacentHTML("beforeend", modalHTML)
            document.getElementById(`best-movie-${i}-img`).src = movie.image_url
    
            let modal = document.getElementById(`best-movie-${i}-modal`)
            let detailBtn = document.getElementById(`best-movie-${i}-details-btn`)
            let modalClose = document.getElementById(`best-movie-${i}-modal-close`)
    
            if (detailBtn){
                detailBtn.addEventListener("click", async function() {
                    modal.style.display = "flex"
                    if(movie) {
                        document.getElementById(`best-movie-${i}-modal-img`).src = movie.image_url
                        document.getElementById(`best-movie-${i}-modal-title`).textContent = movie.title
                        document.getElementById(`best-movie-${i}-first-line`).textContent = `${movie.year} - ${movie.genres} `
                        document.getElementById(`best-movie-${i}-second-line`).textContent = movieDataIMDB.Runtime, movieDataIMDB.Country
                        document.getElementById(`best-movie-${i}-third-line`).textContent = `IMDB score : ${movie.imdb_score}`
                        document.getElementById(`best-movie-${i}-fourth-line`).textContent = `Recettes au box-office : ${movieDataIMDB.BoxOffice}`
                        document.getElementById(`best-movie-${i}-fifth-line`).textContent = movie.directors
                        //document.getElementById(`best-movie-${i}-modal-pegi`).textContent = movie.genres
                        document.getElementById(`best-movie-${i}-modal-actors`).textContent = `Acteurs : ${movie.actors}`
                        document.getElementById(`best-movie-${i}-modal-resume`).textContent = `Resumé : ${movieDataIMDB.Plot}`
                    } else {
                        console.warn(`Aucune donnée pour le film ${i}`)
                    }
            }
        )
            modalClose.addEventListener("click", function() {
                modal.style.display = "none"
            })
    
            window.addEventListener("click", function(event) {
                if (event.target === modal) {
                    modal.style.display = "none"
                }
            })
            } else {
            console.warn(`Bouton details introuvable pour le film ${i}`)
            }
            
        }
        document.getElementById("toggleButton-best-movie").addEventListener("click", function() {
            let container = document.getElementById("contentContainer")
            let isExpanded = container.classList.contains("show-all")

            if (isExpanded) {
                container.classList.remove("show-all")
                this.textContent = "Voir plus"
            } else {
                container.classList.add("show-all")
                this.textContent = "Voir moins"
            }
        })
    })
}
bestMovieCategory()


//Sci-Fi 1-6 category
function firstCategory() {
    document.addEventListener("DOMContentLoaded", async function () {
        let container = document.getElementById("row-first-category")
    
        for (let i = 1; i <= 6; i++) {
            let movieData = await getMovie("Sci-Fi", 2)
            let movie = movieData[i - 1]
            let idPrefix = "tt0"
            let id = movie.id
            let imdbID = idPrefix + id
            let movieDataIMDB = await getDataIMDB(imdbID)
            let modalHTML = `
                <div class="col mt-5">
                    <div class="image-container">
                        <img id="first-category-${i}-img" src="" width="400em" alt=""> 
                        <div class="overlay" id="first-category-${i}-details-btn">Détails</div>
                            <div id="first-category-${i}-modal" class="modal">
                                <div id="first-category-${i}-custom-modal-content" class="custom-modal-content">
                                    <div class="custom-modal-header">
                                        <div class="modal-infos">
                                            <h2 id="first-category-${i}-modal-title"></h2>
                                            <p id="first-category-${i}-first-line"></p>
                                            <p id="first-category-${i}-second-line"></p>
                                            <p id="first-category-${i}-third-line"></p>
                                            <p id="first-category-${i}-fourth-line"></p>
                                            <p>Réalisé par :</p>
                                            <p id="first-category-${i}-fifth-line"></p>
                                        </div>
                                        <div class="modal-image">
                                            <img id="first-category-${i}-modal-img" src="">
                                        </div>
                                    </div>
                                    <div class="custom-modal-body">
                                        <p id="first-category-${i}-modal-resume"></p>
                                        <p id="first-category-${i}-modal-actors"></p>
                                    </div>
                                    <div class="custom-modal-footer">
                                        <button id ="first-category-${i}-modal-close" class="close" class="text-center">Fermer</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>`
    
    
            container.insertAdjacentHTML("beforeend", modalHTML)
            document.getElementById(`first-category-${i}-img`).src = movie.image_url
    
            let modal = document.getElementById(`first-category-${i}-modal`)
            let detailBtn = document.getElementById(`first-category-${i}-details-btn`)
            let modalClose = document.getElementById(`first-category-${i}-modal-close`)
    
            if (detailBtn){
                detailBtn.addEventListener("click", async function() {
                    modal.style.display = "flex"
                    if(movie) {
                        document.getElementById(`first-category-${i}-modal-img`).src = movie.image_url
                        document.getElementById(`first-category-${i}-modal-title`).textContent = movie.title
                        document.getElementById(`first-category-${i}-first-line`).textContent = `${movie.year} - ${movie.genres} `
                        document.getElementById(`first-category-${i}-second-line`).textContent = movieDataIMDB.Runtime, movieDataIMDB.Country
                        document.getElementById(`first-category-${i}-third-line`).textContent = `IMDB score : ${movie.imdb_score}`
                        document.getElementById(`first-category-${i}-fourth-line`).textContent = `Recettes au box-office : ${movieDataIMDB.BoxOffice}`
                        document.getElementById(`first-category-${i}-fifth-line`).textContent = movie.directors
                        //document.getElementById(`first-category-${i}-modal-pegi`).textContent = movie.genres
                        document.getElementById(`first-category-${i}-modal-actors`).textContent = `Acteurs : ${movie.actors}`
                        document.getElementById(`first-category-${i}-modal-resume`).textContent = `Resumé : ${movieDataIMDB.Plot}`
                    } else {
                        console.warn(`Aucune donnée pour le film ${i}`)
                    }
                }
            )
            modalClose.addEventListener("click", function() {
                modal.style.display = "none"
            })
    
            window.addEventListener("click", function(event) {
                if (event.target === modal) {
                    modal.style.display = "none"
                }
            })
            } else {
            console.warn(`Bouton details introuvable pour le film ${i}`)
            }
        }
        document.getElementById("toggleButton-first-category").addEventListener("click", function() {
            let container = document.getElementById("contentContainer")
            let isExpanded = container.classList.contains("show-all")

            if (isExpanded) {
                container.classList.remove("show-all")
                this.textContent = "Voir plus"
            } else {
                container.classList.add("show-all")
                this.textContent = "Voir moins"
            }
        })
    })
}
firstCategory()

//Action 1-6 category
function secondCategory(){
    document.addEventListener("DOMContentLoaded", async function () {
        let container = document.getElementById("row-second-category")
    
        for (let i = 1; i <= 6; i++) {
            let movieData = await getMovie("Action", 2)
            let movie = movieData[i - 1]
            let idPrefix = "tt0"
            let id = movie.id
            let imdbID = idPrefix + id
            let movieDataIMDB = await getDataIMDB(imdbID)
            let modalHTML = `
            <div class="col mt-5">
                <div class="image-container">
                    <img id="second-category-${i}-img" src="" width="400em" alt=""> 
                    <div class="overlay" id="second-category-${i}-details-btn">Détails</div>
                        <div id="second-category-${i}-modal" class="modal">
                            <div id="second-category-${i}-custom-modal-content" class="custom-modal-content">
                                <div class="custom-modal-header">
                                    <div class="modal-infos">
                                        <h2 id="second-category-${i}-modal-title"></h2>
                                        <p id="second-category-${i}-first-line"></p>
                                        <p id="second-category-${i}-second-line"></p>
                                        <p id="second-category-${i}-third-line"></p>
                                        <p id="second-category-${i}-fourth-line"></p>
                                        <p>Réalisé par :</p>
                                        <p id="second-category-${i}-fifth-line"></p>
                                    </div>
                                    <div class="modal-image">
                                        <img id="second-category-${i}-modal-img" src="">
                                    </div>
                                </div>
                                <div class="custom-modal-body">
                                    <p id="second-category-${i}-modal-resume"></p>
                                    <p id="second-category-${i}-modal-actors"></p>
                                </div>
                                <div class="custom-modal-footer">
                                    <button id ="second-category-${i}-modal-close" class="close" class="text-center">Fermer</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>`
    
    
            container.insertAdjacentHTML("beforeend", modalHTML)
            document.getElementById(`second-category-${i}-img`).src = movie.image_url
    
            let modal = document.getElementById(`second-category-${i}-modal`)
            let detailBtn = document.getElementById(`second-category-${i}-details-btn`)
            let modalClose = document.getElementById(`second-category-${i}-modal-close`)
    
            if (detailBtn){
                detailBtn.addEventListener("click", async function() {
                    modal.style.display = "flex"
                    if(movie) {
                        document.getElementById(`second-category-${i}-modal-img`).src = movie.image_url
                        document.getElementById(`second-category-${i}-modal-title`).textContent = movie.title
                        document.getElementById(`second-category-${i}-first-line`).textContent = `${movie.year} - ${movie.genres} `
                        document.getElementById(`second-category-${i}-second-line`).textContent = movieDataIMDB.Runtime, movieDataIMDB.Country
                        document.getElementById(`second-category-${i}-third-line`).textContent = `IMDB score : ${movie.imdb_score}`
                        document.getElementById(`second-category-${i}-fourth-line`).textContent = `Recettes au box-office : ${movieDataIMDB.BoxOffice}`
                        document.getElementById(`second-category-${i}-fifth-line`).textContent = movie.directors
                        //document.getElementById(`second-category-${i}-modal-pegi`).textContent = movie.genres
                        document.getElementById(`second-category-${i}-modal-actors`).textContent = `Acteurs : ${movie.actors}`
                        document.getElementById(`second-category-${i}-modal-resume`).textContent = `Resumé : ${movieDataIMDB.Plot}`
                    } else {
                        console.warn(`Aucune donnée pour le film ${i}`)
                    }
                }
            )
            modalClose.addEventListener("click", function() {
                modal.style.display = "none"
                })
            window.addEventListener("click", function(event) {
                if (event.target === modal) {
                    modal.style.display = "none"
                }
            })
            } else {
            console.warn(`Bouton details introuvable pour le film ${i}`)
            }
        }
        document.getElementById("toggleButton-second-category").addEventListener("click", function() {
            let container = document.getElementById("contentContainer")
            let isExpanded = container.classList.contains("show-all")

            if (isExpanded) {
                container.classList.remove("show-all")
                this.textContent = "Voir plus"
            } else {
                container.classList.add("show-all")
                this.textContent = "Voir moins"
            }
        })
    })
}
secondCategory()

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
                                <div id="others-category-${i}-custom-modal-content" class="custom-modal-content">
                                    <div class="custom-modal-header">
                                        <div class="modal-infos">
                                            <h2 id="others-category-${i}-modal-title"></h2>
                                            <p id="others-category-${i}-first-line"></p>
                                            <p id="others-category-${i}-second-line"></p>
                                            <p id="others-category-${i}-third-line"></p>
                                            <p id="others-category-${i}-fourth-line"></p>
                                            <p>Réalisé par :</p>
                                            <p id="others-category-${i}-fifth-line"></p>
                                        </div>
                                        <div class="modal-image">
                                            <img id="others-category-${i}-modal-img" src="">
                                        </div>
                                    </div>
                                    <div class="custom-modal-body">
                                        <p id="others-category-${i}-modal-resume"></p>
                                        <p id="others-category-${i}-modal-actors"></p>
                                    </div>
                                    <div class="custom-modal-footer">
                                        <button id ="others-category-${i}-modal-close" class="close" class="text-center">Fermer</button>
                                    </div>
                                </div>
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
    select.addEventListener("change", async function () {
        let selectedCategoryId = select.value
        let selectedCategory = categories.find(cat => cat.id == selectedCategoryId)
        let category = selectedCategory.name
        for(let i = 0; i <= 5; i++) {
            let movieData = await getMovie(category, 2)
            let movie = movieData[i]
            document.getElementById(`others-category-${i}-img`).src = movie.image_url
            let modal = document.getElementById(`others-category-${i}-modal`)
            let detailBtn = document.getElementById(`others-category-${i}-details-btn`)
            let modalClose = document.getElementById(`others-category-${i}-modal-close`)
    
            if (detailBtn){
                detailBtn.addEventListener("click", async function() {
                    modal.style.display = "flex"
                        try {
                            let idPrefix = "tt0"
                            let id = movie.id
                            let imdbID = idPrefix + id
                            let movieDataIMDB = await getDataIMDB(imdbID)
                            if(movie) {
                                document.getElementById(`others-category-${i}-modal-img`).src = movie.image_url
                                document.getElementById(`others-category-${i}-modal-title`).textContent = movie.title
                                document.getElementById(`others-category-${i}-first-line`).textContent = `${movie.year} - ${movie.genres} `
                                document.getElementById(`others-category-${i}-second-line`).textContent = movieDataIMDB.Runtime, movieDataIMDB.Country
                                document.getElementById(`others-category-${i}-third-line`).textContent = `IMDB score : ${movie.imdb_score}`
                                document.getElementById(`others-category-${i}-fourth-line`).textContent = `Recettes au box-office : ${movieDataIMDB.BoxOffice}`
                                document.getElementById(`others-category-${i}-fifth-line`).textContent = movie.directors
                                //document.getElementById(`others-category-${i}-modal-pegi`).textContent = movie.genres
                                document.getElementById(`others-category-${i}-modal-actors`).textContent = `Acteurs : ${movie.actors}`
                                document.getElementById(`others-category-${i}-modal-resume`).textContent = `Resumé : ${movieDataIMDB.Plot}`
                            } else {
                                console.warn(`Aucune donnée pour le film ${i}`)
                            }
                        } catch(error) {
                            console.error("Erreur lors du chargement des données")
                        }
                    }
                )
            }else {
                console.warn(`Bouton details introuvable pour le film ${i}`)
            
                }
            modalClose.addEventListener("click", function() {
                modal.style.display = "none"
            })
        
            window.addEventListener("click", function(event) {
                if (event.target === modal) {
                    modal.style.display = "none"
                        }
                    }
                )
            }
            document.getElementById("toggleButton-others-category").addEventListener("click", function() {
                let container = document.getElementById("contentContainer")
                let isExpanded = container.classList.contains("show-all")
    
                if (isExpanded) {
                    container.classList.remove("show-all")
                    this.textContent = "Voir plus"
                } else {
                    container.classList.add("show-all")
                    this.textContent = "Voir moins"
                }
            })
        }
    )
}
getAllCategories().catch(error => console.error(error))

