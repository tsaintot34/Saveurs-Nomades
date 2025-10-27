function displayRecettes(recettes) {
    const container = document.getElementById('recipesContainer')
    
    container.innerHTML = ""

    for (let i = 0; i < recettes.length; i++) {
        const recette = recettes[i]
        
        let ingredientsHTML = "<ul>"
        for (let j = 0; j < recette.ingrédients.length; j++) {
            const ingredientLigne = recette.ingrédients[j]
            ingredientsHTML += "<li>" + ingredientLigne + "</li>"
        }
        ingredientsHTML += "</ul>"
    
        const image = recette.photo ? recette.photo : 'images/Default.webp'
        
        const cardHTML = `
            <article class="recipe-card">
                <img src="${image}" alt="${recette.nomRecette}">
                <div id="card-content">
                    <div class="card-header">
                        <div id="card-title">
                            <h2>${recette.nomRecette}</h2>
                            <p class="description">${recette.description}</p>
                        </div>
                    </div>
                    <div class="card-body"> 
                        <div id="card-meta">
                            <p class="country"><strong>Pays :</strong> ${recette.pays}</p>
                            <p class="difficulty"><strong>Difficulté:</strong> ${recette.difficulté}</p>
                            <button class="card-button" data-recipe-id="${recette.id}">Voir la recette</button>
                        </div>                               
                        <div class="ingredients">
                            <h3>Ingrédients :</h3>
                            ${ingredientsHTML}
                        </div>
                    </div>
                </div>
            </article>
        `
        
        // Utiliser insertAdjacentHTML pour des raisons de performance, bien que pour ce cas 'innerHTML +=' fonctionne.
        container.insertAdjacentHTML('beforeend', cardHTML)
    }
    
    // Appel essentiel pour attacher les écouteurs APRÈS l'insertion des boutons
    setupModalListeners(recettes)
}


function setupModalListeners(recettes) {
    // S'assurer de sélectionner uniquement les boutons dans le conteneur principal si nécessaire
    const buttons = document.querySelectorAll('#recipesContainer .card-button')
    
    buttons.forEach(button => {
        button.addEventListener('click', (event) => {
            const recipeId = parseInt(event.target.dataset.recipeId, 10)
            
            const selectedRecipe = recettes.find(r => r.id === recipeId)
            
            if (selectedRecipe) {
                displayRecipeModal(selectedRecipe)
            } else {
                displayErrorMessage(`Recette ID ${recipeId} introuvable.`)
            }
        })
    })
}

function displayRecipeModal(recette) {
    let ingredientsHTML = "<ul>"
    for (const ingredientLigne of recette.ingrédients) {
        ingredientsHTML += "<li>" + ingredientLigne + "</li>"
    }
    ingredientsHTML += "</ul>"

    const image = recette.photo ? recette.photo : 'images/Default.webp'

    const modalHTML = `
        <div id="recipeModal" class="modal-overlay">
            <div class="modal-content">
                <button class="close-button">&times;</button>
                
                <h1>${recette.nomRecette} (${recette.pays})</h1>
                
                <img src="${image}" alt="${recette.nomRecette}">

                <h2>Description</h2>
                <p>${recette.description}</p>
                
                <h3>Catégories</h3>
                <p>
                    <strong>Générale :</strong> ${recette.categorie} | 
                    <strong>Spécifique :</strong> ${recette['sous-categorie']}
                </p>

                <h3>Difficulté</h3>
                <p>${recette.difficulté}</p>
                
                <h2>Ingrédients</h2>
                ${ingredientsHTML}
                
                <h2>Préparation</h2>
                <p>${recette.préparation}</p>
                
            </div>
        </div>
    `
    
    const existingModal = document.getElementById('recipeModal')
    if (existingModal) {
        existingModal.remove()
    }
    
    document.body.insertAdjacentHTML('beforeend', modalHTML)

    const modal = document.getElementById('recipeModal')
    const closeButton = modal.querySelector('.close-button')

    closeButton.addEventListener('click', () => {
        modal.remove()
    })

    modal.addEventListener('click', (event) => {
        // La condition vérifie si on clique sur l'overlay (l'élément parent avec l'ID 'recipeModal')
        // et non pas sur un élément enfant à l'intérieur du contenu de la modale.
        if (event.target.id === 'recipeModal') {
            modal.remove()
        }
    })
}

function displayErrorMessage(message) {
    console.error("UI Manager Erreur :", message) 
}