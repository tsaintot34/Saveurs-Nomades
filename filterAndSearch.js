function filterAndSearch(toutesLesRecettes) {
    const rechercheTexte = document.getElementById('searchInput').value.toLowerCase().trim();
    const filtrePays = document.getElementById('countryFilter').value.toLowerCase();
    const filtreCategorie = document.getElementById('categoryFilter').value.toLowerCase();
    const filtreSousCategorie = document.getElementById('underCategoryFilter').value.toLowerCase();
    const filtreDifficulte = document.getElementById('difficultyFilter').value.toLowerCase();

    return toutesLesRecettes.filter(recette => {
        const correspondAuTexte =
            recette.nomRecette.toLowerCase().includes(rechercheTexte) ||
            recette.description.toLowerCase().includes(rechercheTexte) ||
            recette.ingrédients.some(ing => ing.toLowerCase().includes(rechercheTexte));

        if (!correspondAuTexte) {
            return false;
        }

        if (filtrePays && recette.pays.toLowerCase() !== filtrePays) {
            return false;
        }

        if (filtreCategorie && recette.catégorie.toLowerCase() !== filtreCategorie) {
            return false;
        }

        if (filtreDifficulte && recette.difficulté.toLowerCase() !== filtreDifficulte) {
            return false;
        }

        if (filtreSousCategorie) {
             const listeSousCategories = Array.isArray(recette.sousCatégories)
                 ? recette.sousCatégories.map(sc => sc.toLowerCase())
                 : [recette.sousCatégorie.toLowerCase()];

             if (!listeSousCategories.includes(filtreSousCategorie)) {
                return false;
             }
        }

        return true;
    });
}


function setupFilterListeners(allRecettes, displayRecettes) {
    if (!allRecettes || allRecettes.length === 0) {
        console.warn("Attention : Le tableau de recettes n'est pas encore prêt.");
    }

    const elementsAEcouter = [
        document.getElementById('searchInput'),
        document.getElementById('countryFilter'),
        document.getElementById('categoryFilter'),
        document.getElementById('underCategoryFilter'),
        document.getElementById('difficultyFilter')
    ];

    const gererChangementFiltre = () => {
        const recettesFiltrees = filterAndSearch(allRecettes);
        displayRecettes(recettesFiltrees);
    };

    elementsAEcouter.forEach(element => {
        if (element) {
            const typeEvenement = element.id === 'searchInput' ? 'input' : 'change';
            element.addEventListener(typeEvenement, gererChangementFiltre);
        } else {
            console.error(`Problème: Je ne trouve pas l'élément avec l'ID.`);
        }
    });
}