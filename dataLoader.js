let allRecettes = [];

function loadRecettes() {
    const filePath = 'Recettes.json';
    const request = new XMLHttpRequest();

    request.open('GET', filePath, true);

    request.onload = function() {

        if (request.status === 200) {

            try {
                const data = JSON.parse(request.responseText);
                allRecettes = data;

                console.log(`✅ ${allRecettes.length} recettes chargées.`);

                if (typeof displayRecettes === 'function') {
                    displayRecettes(allRecettes);
                }

                if (typeof setupFilterListeners === 'function' && typeof displayRecettes === 'function') {
                    setupFilterListeners(allRecettes, displayRecettes);
                    console.log("✅ Écouteurs de filtres initialisés.");
                } else {
                    console.error("❌ Problème d'initialisation : setupFilterListeners ou displayRecettes n'est pas défini.");
                }

            } catch (e) {
                console.error('❌ Erreur de lecture JSON:', e);
                displayErrorMessage('Impossible d\'interpréter les données de recettes.');
            }

        } else {
            console.error(`❌ Erreur HTTP ${request.status} lors du chargement de ${filePath}`);
            displayErrorMessage('Impossible de charger les recettes (Erreur serveur ou fichier manquant).');
        }
    };

    request.onerror = function() {
        console.error('❌ Erreur réseau lors du chargement des données.');
        displayErrorMessage('Erreur réseau. Vérifiez votre connexion.');
    };

    request.send();
}

loadRecettes();