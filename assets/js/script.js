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

async function getMovie(categorie, page){
    let movies = []
    let i = 1
    let hasNext = true
    while(hasNext && i <= page){
        let url = `http://127.0.0.1:8000/api/v1/titles/?genre=${categorie}&page=${i}&sort_by=-imdb_score`
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
        movies = movies.concat(data.results)

        if(!data.next){
            hasNext = false
        } else {
            i++
        }
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


function html(name, i){
    let html =  `
    <div class="col mt-5">
        <div class="image-container">
            <img id="${name}-${i}-img"  alt="Affiche du film" class="home-img">
            <div class="overlay">
                <h3 id="${name}-${i}-overlay-title" class="overlay-title"></h3>
                <button id="${name}-overlay-btn-${i}" class="overlay-btn">Détails</button>
            </div>
            <div id="${name}-${i}-modal" class="modal">
                <div id="${name}-${i}-modal-content" class="custom-modal-content">
                    <div class="custom-modal-header">
                        <div class="custom-modal-close" id="custom-modal-close-${i}">&times;</div>
                        <h2 id="${name}-${i}-modal-title" class="custom-modal-title"></h2>
                        <p id="${name}-${i}-first-line" class="custom-modal-info"></p>
                        <p id="${name}-${i}-second-line" class="custom-modal-info"></p>
                        <p id="${name}-${i}-third-line" class="custom-modal-info"></p>
                        <p id="${name}-${i}-fourth-line" class="custom-modal-info"></p>
                        <p><br></p>
                        <p class="directors ">Réalisé par :</p>
                        <p id="${name}-${i}-fifth-line" class="directors-list"></p>
                    </div>
                    <div class="custom-modal-image">
                        <img id="${name}-${i}-modal-img" alt="Affiche du film" class="modal-img">
                    </div>
                    <div class="custom-modal-resume">
                        <p id="${name}-${i}-modal-resume"></p>
                    </div>
                    <div class="custom-modal-actors">
                        <p class="with">Avec:</p>
                        <p id="${name}-${i}-modal-actors" class="actors-list"></p>
                    </div>
                    <div class="custom-modal-footer">
                        <button id ="${name}-${i}-modal-close" class="close">Fermer</button>
                    </div>
                </div>
            </div>
        </div>
    </div>`
    return html
}
function htmlModal(prefix, index, movie, movieDataIMDB) {
    const sep = index !== null && index !== "" ? `-${index}-` : `-`

    const setText = (suffix, content) => {
        const element = document.getElementById(`${prefix}${sep}${suffix}`)
        if (element) element.textContent = content
    }

    const setImg = (suffix, src) => {
        const element = document.getElementById(`${prefix}${sep}${suffix}`)
        if (element) element.src = src
    }

    try {
        setImg("modal-img", movie.image_url)
    } catch (error) {
        setImg("modal-img", "./assets/img/imgnotfound.png")
    }

    setText("modal-title", movie.title)
    setText("first-line", `${movie.year} - ${movie.genres}`)
    setText("second-line", `${movieDataIMDB.Runtime} (${movieDataIMDB.Country})`)
    setText("third-line", `IMDB score : ${movie.imdb_score}/10`)
    setText("fourth-line", `Recettes au box-office : ${movieDataIMDB.BoxOffice}`)
    setText("fifth-line", movie.directors)
    setText("modal-actors", movie.actors)
    setText("modal-resume", `Resumé : ${movieDataIMDB.Plot}`)
}

//First Best Movie

function firstBestMovie(){
    const bestMovieModal = document.getElementById("best-movie-modal");
    const bestMovieBtn = document.getElementById("best-movie-btn-details");
    const bestMoviecloseBtn = document.querySelector("#best-movie-modal-close");
    const customModalClose = document.querySelector("#custom-modal-close")

    bestMovieBtn.addEventListener("click", async function() {
        bestMovieModal.style.display = "flex"
        let movieData = await bestMovie(1)
        let movie = movieData[0]
        let idPrefix = "tt0"
        let id = movie.id
        let imdbID = idPrefix + id
        let movieDataIMDB = await getDataIMDB(imdbID)
        htmlModal("best-movie", "", movie, movieDataIMDB)
    })

    bestMoviecloseBtn.addEventListener("click", function() {
        bestMovieModal.style.display = "none" 
    })

    customModalClose.addEventListener("click", function() {
        bestMovieModal.style.display = "none"
    })
    window.addEventListener("click", function(event) {
        if (event.target === bestMovieModal) {
            bestMovieModal.style.display = "none"
        }
    })
}

firstBestMovie()

//Best movie 1-6 category
function bestMovieCategory() {
    document.addEventListener("DOMContentLoaded", async function () {
        let movieData = await bestMovie(2)
        for (let i = 1; i <= 6; i++) {
            let movie = movieData[i]
            let idPrefix = "tt0"
            let id = movie.id
            let imdbID = idPrefix + id
            let movieDataIMDB = await getDataIMDB(imdbID)
            let container = document.getElementById("row-best-movie")
            let modalHTML = html("best-movie", i)

            container.insertAdjacentHTML("beforeend", modalHTML)
            
            try {
                let response = await fetch(movie.image_url)
                document.getElementById(`best-movie-${i}-img`).src = movie.image_url
            } catch(error){
                document.getElementById(`best-movie-${i}-img`).src = "./assets/img/imgnotfound.png"
            }
            
            document.getElementById(`best-movie-${i}-overlay-title`).textContent = movie.title
            
            let modal = document.getElementById(`best-movie-${i}-modal`)
            let detailBtn = document.getElementById(`best-movie-overlay-btn-${i}`)
            let modalClose = document.getElementById(`best-movie-${i}-modal-close`)
            let customModalClose = document.getElementById(`custom-modal-close-${i}`)
    
            if (detailBtn){
                detailBtn.addEventListener("click", async function() {
                    modal.style.display = "flex"
                    if(movie) {
                        htmlModal("best-movie", i, movie, movieDataIMDB)
                    } else {
                        console.warn(`Aucune donnée pour le film ${i}`)
                    }
            }
        )

            modalClose.addEventListener("click", function() {
                modal.style.display = "none"
            })

            customModalClose.addEventListener("click", function() {
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
            let container = document.getElementById("contentContainer-best-movie")
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
        let movieData = await getMovie("Sci-Fi", 2)
        for (let i = 1; i <= 6; i++) {
            let movie = movieData[i - 1]
            let idPrefix = "tt0"
            let id = movie.id
            let imdbID = idPrefix + id
            let movieDataIMDB = await getDataIMDB(imdbID)
            let modalHTML = html("first-category", i)
    
            container.insertAdjacentHTML("beforeend", modalHTML)
            
            try {
                let response = await fetch(movie.image_url)
                document.getElementById(`first-category-${i}-img`).src = movie.image_url
            } catch(error){
                document.getElementById(`first-category-${i}-img`).src = "./assets/img/imgnotfound.png"
            }
            
            document.getElementById(`first-category-${i}-overlay-title`).textContent = movie.title

            let modal = document.getElementById(`first-category-${i}-modal`)
            let detailBtn = document.getElementById(`first-category-overlay-btn-${i}`)
            let modalClose = document.getElementById(`first-category-${i}-modal-close`)
            let customModalClose = document.getElementById(`custom-modal-close-${i}`)
    
            if (detailBtn){
                detailBtn.addEventListener("click", async function() {
                    modal.style.display = "flex"
                    if(movie) {
                        htmlModal("first-category", i, movie, movieDataIMDB)
                    } else {
                        console.warn(`Aucune donnée pour le film ${i}`)
                    }
                }
            )
            modalClose.addEventListener("click", function() {
                modal.style.display = "none"
            })
            
            customModalClose.addEventListener("click", function(){
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
            let container = document.getElementById("contentContainer-first-category")
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
        let movieData = await getMovie("Action", 2)
        for (let i = 1; i <= 6; i++) {
            let movie = movieData[i - 1]
            let idPrefix = "tt0"
            let id = movie.id
            let imdbID = idPrefix + id
            let movieDataIMDB = await getDataIMDB(imdbID)
            let modalHTML = html("second-category", i)
    
            container.insertAdjacentHTML("beforeend", modalHTML)

            try {
                let response = await fetch(movie.image_url)
                document.getElementById(`second-category-${i}-img`).src = movie.image_url
            } catch(error){
                document.getElementById(`second-category-${i}-img`).src = "./assets/img/imgnotfound.png"
            }

            document.getElementById(`second-category-${i}-overlay-title`).textContent = movie.title

            let modal = document.getElementById(`second-category-${i}-modal`)
            let detailBtn = document.getElementById(`second-category-overlay-btn-${i}`)
            let modalClose = document.getElementById(`second-category-${i}-modal-close`)
            let customModalClose = document.getElementById(`custom-modal-close-${i}`)
    
            if (detailBtn){
                detailBtn.addEventListener("click", async function() {
                    modal.style.display = "flex"
                    if(movie) {
                        htmlModal("second-category", i, movie, movieDataIMDB)
                    } else {
                        console.warn(`Aucune donnée pour le film ${i}`)
                    }
                }
            )
            modalClose.addEventListener("click", function() {
                modal.style.display = "none"
            })

            customModalClose.addEventListener("click", function() {
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
            let container = document.getElementById("contentContainer-second-category")
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

async function othersCategory(category, page) {
    const container = document.getElementById("category-info")
    container.innerHTML = ""

    const movies = await getMovie(category, page)
    const nbrElement = movies.length
    const maxItems = Math.min(6, nbrElement)

    for (let i = 0; i < maxItems; i++) {
        let modalHTML = html("others-category", i)
        container.insertAdjacentHTML("beforeend", modalHTML)
    }
}

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
        document.getElementById("category-info").style.display = "flex"
        document.getElementById("toggleButton-select-1").style.display = "inline-block"
        othersCategory(category, 2)
        let movieData = await getMovie(category, 2)
        for(let i = 0; i <= 5; i++) {
            let movie = movieData[i]
            try {
                let response = await fetch(movie.image_url)
                document.getElementById(`others-category-${i}-img`).src = movie.image_url
            } catch(error){
                document.getElementById(`others-category-${i}-img`).src = "./assets/img/imgnotfound.png"
            }

            document.getElementById(`others-category-${i}-overlay-title`).textContent = movie.title
            let modal = document.getElementById(`others-category-${i}-modal`)
            let detailBtn = document.getElementById(`others-category-overlay-btn-${i}`)
            let modalClose = document.getElementById(`others-category-${i}-modal-close`)
            let customModalClose = document.getElementById(`custom-modal-close-${i}`)
    
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
                                document.getElementById(`others-category-${i}-second-line`).textContent = `${movieDataIMDB.Runtime} (${movieDataIMDB.Country})`
                                document.getElementById(`others-category-${i}-third-line`).textContent = `IMDB score : ${movie.imdb_score}/10`
                                document.getElementById(`others-category-${i}-fourth-line`).textContent = `Recettes au box-office : ${movieDataIMDB.BoxOffice}`
                                document.getElementById(`others-category-${i}-fifth-line`).textContent = movie.directors
                                document.getElementById(`others-category-${i}-modal-actors`).textContent = movie.actors
                                document.getElementById(`others-category-${i}-modal-resume`).textContent = movieDataIMDB.Plot
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
        
            customModalClose.addEventListener("click", function(){
                modal.style.display = "none"
            })

            window.addEventListener("click", function(event) {
                if (event.target === modal) {
                    modal.style.display = "none"
                        }
                    }
                )
            }
            document.getElementById("toggleButton-select-1").addEventListener("click", function() {
                let container = document.getElementById("contentContainer-others-1")
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

