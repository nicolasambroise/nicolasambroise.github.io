# Bookmarklet : Vérification de l'accessibilité des sites AEM

## Installation du bookmarklet

Affichage dans une fenêtre modale des non-conformités au RGAA, des nice-to-have ainsi que des recommandations pour le rédacteur.

Pour installer le Bookmarklet il suffit de **glisser le lien** présent sur [cette page](https://nicolasambroise.github.io/a11y/install_bookmarklet.html) dans votre barre de favori. 

Alternative possible, faire un clic droit sur votre barre de favori et sélectionner "Ajouter un favori" puis copier-coller la ligne ci-dessous dans le champ URL

`javascript:(function(){document.body.appendChild(document.createElement('script')).src='https://nicolasambroise.github.io/a11y/script.js';})();`

## Liste des Checks
1. Configuration des composants AEM
	- Breadcrumb
	- Menu des langues
	- Menu de navigation
	- Tooltip
2. Images
	- Alternative textuelle sur toutes les images informatives
	- Attributs des svg de décoration 
	- Attribut Alt vide sur les images de search logique
	- Les images de décoration ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle
	- Alternative textuelle courte et concise
3. Liens
	- Suffixe "Nouvelle fenêtre" sur les liens externe
	- Attribut title vide
	- Attribut title reprend à minimum le contenu textuel
4. Formulaire et Autocomplete
	- Autocomplete sur les champs classique
	- Présence d'une étiquette (label)
5. Balises vides
6. Listes
7. Hierarchie des titres
	- Heading caché au outil d'assistance 
	- Heading simulé
	- Présence de saut de titre
8. Tableau
	- Attribut de tableau de mise en forme
	- Attribut de tableau informatif
9. TabIndex
	- Absance de tabindex positif
10. Balises/attributs obsolètes
11. Changement de langue 
12. Intitulé des boutons
13. Plan du site incomplet
14. Cadres
15. Animation Lottie