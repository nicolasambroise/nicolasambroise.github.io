// Variables config globale
const debug_flag = true; // true -> affiche les logs

// Add JS & CSS files for custom dialog modal
// - double sécurité pour que ce sript puisse également être appelé par l'extention chrome
if(!document.body.classList.contains('modal-injected')){
	let cssModal = document.getElementById('injected-css');
	if (cssModal === null) {
	  cssModal = document.createElement('link');
	  cssModal.id = 'injected-css';
	  cssModal.rel = 'stylesheet';
	  cssModal.href = 'https://nicolasambroise.github.io/a11y/js-modal.css?v=' + Date.now();
	  document.getElementsByTagName('head')[0].appendChild(cssModal);
	}

	let jsModal = document.getElementById('injected-js');
	if (jsModal === null) {
	  jsModal = document.createElement('script');
	  jsModal.id = 'injected-js';
	  jsModal.src = 'https://nicolasambroise.github.io/a11y/js-modal.js?v=' + Date.now();
	  document.getElementsByTagName('head')[0].appendChild(jsModal);
	}
}

// Current URL
const currentUrl = window.location.href;
if(debug_flag) console.log(currentUrl);

if(!currentUrl.includes(".public.lu") && !currentUrl.includes(".gouvernement.lu") && !currentUrl.includes(".etat.lu")){
  alert("Ce Bookmarklet est à utiliser seulement sur les sites étatiques luxembourgeois");
}
// Init result message
let result_crit = "";
let result_nc = "";
let result_nth = "";
let result_dev = "";

/*- -------------------------------------------------------------------------------- */

/* 🗸 NIA-01 AEM Component 
- vérifie les points concernant la configuration des composants AEM suivant :  Intitulé de bouton menu,  Breadcrumb, Tooltip, Menu langue, Recherche, Vidéo, Menu
*/

	// A. Position de bouton menu
	const nia01a_nodes = document.querySelectorAll('button.anchor[data-destination^="#headernav"]:not(.anchor-close)');
	let nia01a_flag = false;
	if(nia01a_nodes && nia01a_nodes.length > 0){
		if(debug_flag) console.log("[nia01a] Boucle sur les "+nia01a_nodes.length + " ancres detectés sur cette page");
		for(let i = 0; i < nia01a_nodes.length; i++){
			if(nia01a_nodes[i].parentElement.tagName != 'NAV' && nia01a_nodes[i].parentElement.parentElement.tagName != 'NAV'){
				// --> Todo : remplacer par un .closest(nav) plus propre ici
				setItemOutline(nia01a_nodes[i],"red","nia01a");
				nia01a_flag = true;
			}
		}
	}
	if(nia01a_flag == true) {
	  result_dev += "<li><a href='#' data-destination='nia01a' class='result-focus'>01-A</a> : Présence du bouton d'ouverture du menu en dehors de la balise nav</li>";
	}

	// B. Breadcrumb
	const nia01b_nodes = document.querySelectorAll('nav[id^=breadcrumb-] .cmp-breadcrumb__list > .cmp-breadcrumb__item:not([aria-current="page"]):last-child');
	if(nia01b_nodes && nia01b_nodes.length > 0 && isItemsVisible(nia01b_nodes)){
	  result_dev += "<li><a href='#' data-destination='nia01b' class='result-focus'>01-B</a> : Absence de l'attribut aria-current sur le dernier item du fils d'ariane --> Vérifier dans les propriétés de la page que celle-ci n'est pas cachée dans la navigation.</li>";
	  setItemsOutline(nia01b_nodes,"red","nia01b");
	}

	// C. Tooltip
	const nia01c_nodes = document.querySelectorAll('.search-view');
	if(nia01c_nodes && nia01c_nodes.length > 0 && isItemsVisible(nia01c_nodes)){
	  result_nc += "<li><a href='#' data-destination='nia01c' class='result-focus'>01-C</a> : Présence de tooltip non accessible sur les résultats de recherches [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-10-13-1' target='_blank'>RGAA 10.13.1</a>]</li>";
	  setItemsOutline(nia01c_nodes,"red","nia01c");
	}

	// D. Menu langue
	const nia01d_nodes = document.querySelectorAll('nav[id^="language-"]:not([aria-label])');
	if(nia01d_nodes && nia01d_nodes.length > 0 && isItemsVisible(nia01d_nodes)){
	  result_nc += "<li><a href='#' data-destination='nia01d' class='result-focus'>01-D</a> : Absence de l'aria-label sur le menu de selection de langue (à ajouter dans le cqdialog)</li>";
	  setItemsOutline(nia01d_nodes,"red","nia01d");
	}

	// E. Video player
	const nia01e_nodes = document.querySelectorAll('.cmp-multiplayer .player_img img[alt="Lire la vidéo Youtube, voir légende ci-après"][lang]:not([lang="fr"])');
	if(nia01e_nodes && nia01e_nodes.length > 0 && isItemsVisible(nia01e_nodes)){
	  result_dev += "<li><a href='#' data-destination='nia01e' class='result-focus'>01-E</a> : Traduction manquante dans le composant Multimedia Player</li>";
	  setItemsOutline(nia01e_nodes,"orange","nia01e");
	}
	
	// F. Menu -- Todo

/* 🗸 02 Images : Thématique RGAA 1

Vérification de plusieurs points concernant les images : 
o	Présence d’un attribut alt sur toutes les images 
o	Vérification des attributs des svg, 
o	Alt vide sur les images de search logique. 
o	Absence de copyright/caption/légende sur une image Core V3,
o	Images v1 légendés presence du aria-label sur le figure */

	// A. Présence d’un attribut alt sur toutes les images 
	const nia02a1_nodes = document.querySelectorAll('img:not([alt]):not([src^="//cdn.public.lu/guichet-lu/pictures/maps/"]):not([aria-label]):not([aria-labelledby]):not([title]), [role="image"]:not([aria-label]):not([aria-labelledby])');
	if(nia02a1_nodes && nia02a1_nodes.length > 0 && isItemsVisible(nia02a1_nodes)){
	  result_nc += "<li><a href='#' data-destination='nia02a1' class='result-focus'>02-A</a> : Présence de " + nia02a1_nodes.length + " images sans alternative textuelle [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-1-1-1' target='_blank'>RGAA 1.1.1</a>]</li>";
	  setItemsOutline(nia02a1_nodes,"red","nia02a1");
	}
	
	const nia02a2_nodes = document.querySelectorAll('img:not([alt]):not([src^="//cdn.public.lu/guichet-lu/pictures/maps/"])');
	if(nia02a2_nodes && nia02a2_nodes.length > 0 && isItemsVisible(nia02a2_nodes)){
	  result_nth += "<li><a href='#' data-destination='nia02a2' class='result-focus'>02-A</a> : Présence de " + nia02a2_nodes.length + " images sans attribut alt</li>";
	  setItemsOutline(nia02a2_nodes,"yellow","nia02a2");
	}

	// B. Vérification des attributs des svg, 
	const nia02b1_nodes = document.querySelectorAll('svg:not([aria-hidden="true"]):not(.iconset)'); 
	const nia02b2_nodes = document.querySelectorAll('svg:not([focusable="false"]):not(.iconset)');
	if(nia02b1_nodes && nia02b1_nodes.length > 0 && isItemsVisible(nia02b1_nodes)){
	  result_nc += "<li><a href='#' data-destination='nia02b1' class='result-focus'>02-B</a> : Absence de certains attributs sur des SVG (aria-hidden=true)</li>";
	  setItemsOutline(nia02b1_nodes,"red","nia02b1");
	}
	if(nia02b2_nodes && nia02b2_nodes.length > 0 && isItemsVisible(nia02b2_nodes)){
	  result_nth += "<li><a href='#' data-destination='nia02b2' class='result-focus'>02-B</a> : Absence de certains attributs sur des SVG (focusable=false)</li>";
	  setItemsOutline(nia02b2_nodes,"orange","nia02b2");
	}
	
	const nia02b3_nodes = document.querySelectorAll('svg[role="img"]:not([title]):not([aria-labelledby]):not([aria-label])');
	if(nia02b3_nodes && nia02b3_nodes.length > 0 && isItemsVisible(nia02b3_nodes)){
	  result_nc += "<li><a href='#' data-destination='nia02b3' class='result-focus'>02-B</a> : Les images vectorielle porteuse d'information doivent posséder une alternative textuelle [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-1-1-5' target='_blank'>RGAA 1.1.5</a>]</li>";
	  setItemsOutline(nia02b3_nodes,"red","nia02b3");
	}
	
	const nia02b4_nodes = document.querySelectorAll('svg[aria-hidden="true"][aria-label], svg[aria-hidden="true"][aria-labelledby]');
	if(nia02b4_nodes && nia02b4_nodes.length > 0 && isItemsVisible(nia02b4_nodes)){
	  result_nc += "<li><a href='#' data-destination='nia02b4' class='result-focus'>02-B</a> : Les images vectorielle de décoration ne doivent pas posséder une alternative textuelle [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-1-2-4' target='_blank'>RGAA 1.2.4</a>]</li>";
	  setItemsOutline(nia02b4_nodes,"red","nia02b4");
	}
	
	const nia02b5_nodes = document.querySelectorAll('svg[aria-hidden="true"] title, svg[aria-hidden="true"] desc');
	let nia02b5_flag = false;
	if(nia02b5_nodes && nia02b5_nodes.length > 0){
		for(let i = 0; i < nia02b5_nodes.length; i++){
			if(isItemsVisible(nia02b5_nodes[i]) && ((nia02b5_nodes[i].hasAttribute('title') && nia02b5_nodes[i].getAttribute('title').length > 0) || (nia02b5_nodes[i].hasAttribute('desc') && nia02b5_nodes[i].getAttribute('desc').length > 0))){
				setItemOutline(nia02b5_nodes[i],"red","nia02b5");
				nia02b5_flag = true;
			}
		}
	}
	if(nia02b5_flag == true){
		result_nc += "<li><a href='#' data-destination='nia02b5' class='result-focus'>02-B</a> : Les images vectorielle de décoration ne doivent pas posséder une alternative textuelle dans des balises 'title' ou 'desc' [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-1-2-4' target='_blank'>RGAA 1.2.4</a>]</li>";
	}
	
	// C. Alt vide sur les images de search logique. 
	const nia02c_nodes = document.querySelectorAll('.cmp-focus img:not([alt=""])');
	if(nia02c_nodes && nia02c_nodes.length > 0 && isItemsVisible(nia02c_nodes)){
	  result_dev += "<li><a href='#' data-destination='nia02c' class='result-focus'>02-C</a> : Présence de " + nia02a_nodes.length + " image de search-logic sans attribut alt</li>";
	  setItemsOutline(nia02c_nodes,"red","nia02c");
	}

	// D. Absence de copyright/caption/légende sur une image Core V3
	const nia02d_nodes = document.querySelectorAll('.cmp-image[data-cmp-hook-image="imageV3"] .cmp-image__title');
	if(nia02d_nodes && nia02d_nodes.length > 0 && isItemsVisible(nia02d_nodes)){
	  result_dev += "<li><a href='#' data-destination='nia02d' class='result-focus'>02-D</a> : Présence d'un caption non lié à son image (image v3)</li>";
	  setItemsOutline(nia02d_nodes,"red","nia02d");
	}
	
	// E. Images v1 légendés presence du aria-label sur le figure
	const nia02e_nodes = document.querySelectorAll('figure[data-cmp-hook-image="figure"] figcaption');
	if(nia02e_nodes && nia02e_nodes.length > 0 && isItemsVisible(nia02e_nodes)){
	  result_dev += "<li><a href='#' data-destination='nia02e' class='result-focus'>02-E</a> : Les captions des images ne sont pas correctement restitué (image v1)</li>";
	  setItemsOutline(nia02e_nodes,"red","nia02e");
	}
	
	// F. Vérification sur les images atypique
	const nia02f1_nodes = document.querySelectorAll('area:not([aria-label]):not([alt])');
	if(nia02f1_nodes && nia02f1_nodes.length > 0 && isItemsVisible(nia02f1_nodes)){
	  result_nc += "<li><a href='#' data-destination='nia02f1' class='result-focus'>02-F</a> : Les zones d'image réactive porteuse d'information doivent avoir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-1-1-2' target='_blank'>RGAA 1.1.2</a>]</li>";
	  setItemsOutline(nia02f1_nodes,"red","nia02f1");
	}
	
	const nia02f2_nodes = document.querySelectorAll('input[type="image"]:not([alt]):not([aria-label]):not([aria-labelledby]):not([title])');
	if(nia02f2_nodes && nia02f2_nodes.length > 0 && isItemsVisible(nia02f2_nodes)){
	  result_nc += "<li><a href='#' data-destination='nia02f2' class='result-focus'>02-F</a> : Les boutons de type image (balise input avec attribut type=image doivent avoir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-1-1-3' target='_blank'>RGAA 1.1.3</a>]</li>";
	  setItemsOutline(nia02f2_nodes,"red","nia02f2");
	}
	
	const nia02f3_nodes = document.querySelectorAll('object[type^="image/"]:not([role="img"]):not([aria-label]):not([aria-labelledby]):not([title])');
	if(nia02f3_nodes && nia02f3_nodes.length > 0 && isItemsVisible(nia02f3_nodes)){
	  result_nc += "<li><a href='#' data-destination='nia02f3' class='result-focus'>02-F</a> : Les images objects porteuses d'information doivent avoir une alternative textuelle - à vérifier manuellement la présence d'un mécaniseme de remplacement [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-1-1-6' target='_blank'>RGAA 1.1.6</a>]</li>";
	  setItemsOutline(nia02f3_nodes,"red","nia02f3");
	}

	const nia02f4_nodes = document.querySelectorAll('embed[type^="image/"]:not([role="img"]):not([aria-label]):not([aria-labelledby]):not([title])');
	if(nia02f4_nodes && nia02f4_nodes.length > 0 && isItemsVisible(nia02f4_nodes)){
	  result_nc += "<li><a href='#' data-destination='nia02f4' class='result-focus'>02-F</a> : Les images embarquée porteuses d'information doivent avoir une alternative textuelle - à vérifier manuellement la présence d'un mécaniseme de remplacement [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-1-1-7' target='_blank'>RGAA 1.1.7</a>]</li>";
	  setItemsOutline(nia02f4_nodes,"red","nia02f4");
	}

	const nia02f5_nodes = document.querySelectorAll('canvas[type^="image/"]:not([role="img"]):not([aria-label]):not([aria-labelledby])');
	if(nia02f5_nodes && nia02f5_nodes.length > 0 && isItemsVisible(nia02f5_nodes)){
	  result_nc += "<li><a href='#' data-destination='nia02f5' class='result-focus'>02-F</a> : Les images bitmap (balise canvas) porteuses d'information doivent avoir une alternative textuelle - à vérifier manuellement la présence d'un mécaniseme de remplacement [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-1-1-8' target='_blank'>RGAA 1.1.8</a>]</li>";
	  setItemsOutline(nia02f5_nodes,"red","nia02f5");
	}
	
	// G. Les images de décoration ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle
	const nia02g1_nodes = document.querySelectorAll('img:where([alt=""],[aria-hidden="true"],[role="presentation"],[role="none"]):where([aria-label][aria-labelledby][title])');
	if(nia02g1_nodes && nia02g1_nodes.length > 0 && isItemsVisible(nia02g1_nodes)){
	  result_nc += "<li><a href='#' data-destination='nia02g1' class='result-focus'>02-G</a> : Les images de décoration ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-1-2-1' target='_blank'>RGAA 1.2.1</a>] </li>";
	  setItemsOutline(nia02g1_nodes,"red","nia02g1");
	}
	
	const nia02g2_nodes = document.querySelectorAll('area:not([href]):where([alt=""],[aria-hidden="true"],[role="presentation"],[role="none"]):where([aria-label],[aria-labelledby],[title])');
	if(nia02g2_nodes && nia02g2_nodes.length > 0 && isItemsVisible(nia02g2_nodes)){
	  result_nc += "<li><a href='#' data-destination='nia02g2' class='result-focus'>02-G</a> : Les zone non cliquable de décoration ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-1-2-2' target='_blank'>RGAA 1.2.2</a>] </li>";
	  setItemsOutline(nia02g2_nodes,"red","nia02g2");
	}
	
	const nia02g3_nodes = document.querySelectorAll('object[type^="image/"][aria-hidden="true"]:where([aria-label],[aria-labelledby],[title])');
	if(nia02g3_nodes && nia02g3_nodes.length > 0 && isItemsVisible(nia02g3_nodes)){
	  result_nc += "<li><a href='#' data-destination='nia02g3' class='result-focus'>02-G</a> : Les images object de décoration ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-1-2-3' target='_blank'>RGAA 1.2.3</a>] </li>";
	  setItemsOutline(nia02g3_nodes,"red","nia02g3");
	}
	
	const nia02g4_nodes = document.querySelectorAll('canvas[aria-hidden="true"]:where([aria-label],[aria-labelledby],[title])');
	if(nia02g4_nodes && nia02g4_nodes.length > 0 && isItemsVisible(nia02g4_nodes)){
	  result_nc += "<li><a href='#' data-destination='nia02g4' class='result-focus'>02-G</a> : Les images bitmap de décoration (canvas) ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-1-2-5' target='_blank'>RGAA 1.2.5</a>] </li>";
	  setItemsOutline(nia02g4_nodes,"red","nia02g4");
	}
	
	const nia02g5_nodes = document.querySelectorAll('embed[type^="image/"][aria-hidden="true"]:where([aria-label],[aria-labelledby],[title])');
	if(nia02g5_nodes && nia02g5_nodes.length > 0 && isItemsVisible(nia02g5_nodes)){
	  result_nc += "<li><a href='#' data-destination='nia02g4' class='result-focus'>02-G</a> : Les images embarquées de décoration ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-1-2-6' target='_blank'>RGAA 1.2.6</a>] </li>";
	  setItemsOutline(nia02g5_nodes,"red","nia02g5");
	}
	
	const nia02g6_nodes = document.querySelectorAll('object[type^="image/"][aria-hidden="true"]');
	let nia02g6_flag = false;
	if(nia02g6_nodes && nia02g6_nodes.length > 0){
	  for(let i = 0; i < nia02g6_nodes.length; i++){
	    if(isItemVisible(nia02g6_nodes[i]) && nia02g6_nodes[i].textContent.length > 0){
		  setItemOutline(nia02g6_nodes[i],"red","nia02g6");
		  nia02g6_flag = true;
		}
	  }
	}
	if(nia02g6_flag == true){
		 result_nc += "<li><a href='#' data-destination='nia02g6' class='result-focus'>02-G</a> : Les images object de décoration ne doivent pas avoir de contenu alternatif présent entre ses balises [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-1-2-3' target='_blank'>RGAA 1.2.3</a>] </li>";
	}
	
	const nia02g7_nodes = document.querySelectorAll('canvas[aria-hidden="true"]');
	let nia02g7_flag = false;
	if(nia02g7_nodes && nia02g7_nodes.length > 0){
	  for(let i = 0; i < nia02g7_nodes.length; i++){
	    if(isItemVisible(nia02g7_nodes[i]) && nia02g7_nodes[i].textContent.length > 0){
		  setItemOutline(nia02g7_nodes[i],"red","nia02g7");
		  nia02g7_flag = true;
		}
	  }
	}
	if(nia02g7_flag == true){
		 result_nc += "<li><a href='#' data-destination='nia02g7' class='result-focus'>02-G</a> : Les images bitmap de décoration (canvas) ne doivent pas avoir de contenu alternatif présent entre ses balises [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-1-2-3' target='_blank'>RGAA 1.2.3</a>] </li>";
	}
	
	// H. L'alternative doit être courte et concise - estimation max 150 caractères
	const nia02h_nodes = document.querySelectorAll(':where(img,svg,canvas,embed[type^="image/"],object[type^="image/"]):where([alt],[aria-label],[aria-labelledby],[title]):not([aria-hidden="true"]):not([role="presentation"]):not([role="none"])');
	let nia02h_flag = false;
	let nia02h_lang = "", nia02h_label = "";
	if(nia02h_nodes && nia02h_nodes.length > 0){
		if(debug_flag) console.log("[nia02h] Boucle sur les "+nia02h_nodes.length + " images informatives detectées sur cette page");
		for(let i = 0; i < nia02h_nodes.length; i++){
			nia02h_lang = nia02h_nodes[i].closest('[lang]').getAttribute('lang')
			if(nia02h_nodes[i].hasAttribute("aria-labelledby")){
				nia02h_label = document.querySelectorAll("[id='"+nia02h_nodes[i].getAttribute("aria-labelledby")+"']");
				if(!nia02h_label || nia02h_label.length != 1){
					setItemOutline(nia02h_nodes[i],"red","nia02h1");
					result_nc += "<li><a href='#' data-destination='nia02h1' class='result-focus'>02-H</a> : Problème de référence introuvable ur un attribut aria-labelledby</li>";
				}
				else if(sanitizeText(nia02h_label[0].textContent,nia02h_lang).length > 150){
					setItemOutline(nia02h_nodes[i],"yellow","nia02h");
					nia02h_flag = true;
				}
			}
			else if(nia02h_nodes[i].hasAttribute("aria-label") && sanitizeText(nia02h_nodes[i].getAttribute("aria-label"),nia02h_lang).length > 150){
				setItemOutline(nia02h_nodes[i],"yellow","nia02h");
				nia02h_flag = true;
			}
			else if(nia02h_nodes[i].hasAttribute("alt") && sanitizeText(nia02h_nodes[i].getAttribute("alt"),nia02h_lang).length > 150){
				setItemOutline(nia02h_nodes[i],"yellow","nia02h");
				nia02h_flag = true;
			}
			else if(nia02h_nodes[i].hasAttribute("title") && sanitizeText(nia02h_nodes[i].getAttribute("title"),nia02h_lang).length > 150){
				setItemOutline(nia02h_nodes[i],"yellow","nia02h");
				nia02h_flag = true;
			}
		}
	}
	if(nia02h_flag == true) {
	  result_nth += "<li><a href='#' data-destination='nia02h' class='result-focus'>02-H</a> : Présence d'alternative textuelle trop longue [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-1-3-9' target='_blank'>RGAA 1.3.9</a>]</li>";
	}
	
	
	
/* 🗸 NIA-03 Lien - Thématique RGAA 6
 - Liste des liens internes et externe, affichage des attributs title des liens et vérification d’erreurs courantes.
 */

	// A. Verification de la présence du suffix sur les liens externe
	const nia03a_nodes = document.querySelectorAll('html[lang="fr"] a[target="_blank"]:not([title$="Nouvelle fenêtre"]):not(.mapboxgl-ctrl-logo), html[lang="fr"] a[title$="- Nouvelle fenêtre"]:not([target="_blank"]), html[lang="en"] a[target="_blank"]:not([title$="- New window"]):not(.mapboxgl-ctrl-logo),html[lang="en"] a[title$="- New window"]:not([target="_blank"]), html[lang="de"] a[target="_blank"]:not([title$="- Neues Fenster"]):not(.mapboxgl-ctrl-logo),html[lang="de"] a[title$="- Neues Fenster"]:not([target="_blank"]),html[lang="lb"] a[target="_blank"]:not([title$="- Nei Fënster"]):not(.mapboxgl-ctrl-logo),html[lang="lb"] a[title$="- Nei Fënster"]:not([target="_blank"])');
	if(nia03a_nodes && nia03a_nodes.length > 0 && isItemsVisible(nia03a_nodes)){
	  result_dev += "<li><a href='#' data-destination='nia03a' class='result-focus'>03-A</a> : Vérifier la présence de suffixe sur les liens externes</li>";
	 if(nia03a_nodes && nia03a_nodes.length > 0 && isItemsVisible(nia03a_nodes)) setItemsOutline(nia03a_nodes,"red","nia03a");
	}

	// B. Verification de titre vide
	const nia03b_nodes = document.querySelectorAll('a[title=" "],a[title="Nouvelle fenêtre"],a[title="- Nouvelle fenêtre"],a[title$="Nouvelle fenêtre - Nouvelle fenêtre"]');
	if(nia03b_nodes && nia03b_nodes.length > 0 && isItemsVisible(nia03b_nodes)){
	  result_nc += "<li><a href='#' data-destination='nia03b' class='result-focus'>03-B</a> : Vérifier qu'il n'y a pas de lien avec un titre vide [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-6.1.1' target='_blank'>RGAA 6.1.1</a>]</li>";
	  setItemsOutline(nia03b_nodes,"red","nia03b");
	}

	// C. Probleme de lang
	const nia03c_nodes = document.querySelectorAll('html:not([lang="fr"]) a[title$="- Nouvelle fenêtre"], html:not([lang="en"]) a[title$="- New window"], html:not([lang="de"]) a[title$="- Neues Fenster"], html:not([lang="lb"]) a[title$="- Nei Fënster"]');
	if(nia03c_nodes && nia03c_nodes.length > 0 && isItemsVisible(nia03c_nodes)){
	  for(let i = 0; i < nia02g7_nodes.length; i++){
		  result_nc += "<li><a href='#' data-destination='nia03c' class='result-focus'>03-C</a> : Présence du suffixe 'Nouvelle fenêtre' sur une page non rédiger en français (de même pour les autres langues)</li>";
		  setItemsOutline(nia03c_nodes,"orange","nia03c");
		}
	}
	
	// D. Présence d'un conflit dans les attribut de liens
	const nia03d_nodes = document.querySelectorAll('a[aria-label][aria-labelledby]');
	if(nia03d_nodes && nia03d_nodes.length > 0 && isItemsVisible(nia03d_nodes)){
	  result_nc += "<li><a href='#' data-destination='nia03d' class='result-focus'>03-D</a> : Présence d'un conflit dans les attributs des liens</li>";
	  setItemsOutline(nia03d_nodes,"red","nia03d");
	}

	// E. Vérifier que le title reprend à minimum le contenu textuel
	const nia03e_nodes = document.querySelectorAll("a[title]");
	let nia03e_flag = false;
	let nia03e_content = "", nia03e_title = "", nia03e_lang = "";
	if(nia03e_nodes && nia03e_nodes.length > 0){
		if(debug_flag) console.log("[nia03e] Boucle sur les "+nia03e_nodes.length + " liens detectés sur cette page");
		for(let i = 0; i < nia03e_nodes.length; i++){
			nia03e_lang = nia03e_nodes[i].closest('[lang]').getAttribute('lang')
			nia03e_title = sanitizeText(nia03e_nodes[i].getAttribute("title"),nia03e_lang);
			nia03e_content = sanitizeText(nia03e_nodes[i].innerText,nia03e_lang);
			if(!nia03e_title.includes(nia03e_content)){
				if(debug_flag) console.log("%cERROR","font-weight:700;color:darkred","["+nia03e_title+"] VS ["+nia03e_content+"] ");
				setItemOutline(nia03e_nodes[i],"red","nia03e");
				nia03e_flag = true;
			}
		}
	}
	if(nia03e_flag == true) {
	  result_nc += "<li><a href='#' data-destination='nia03e' class='result-focus'>03-E</a> : Présence de liens dont l'attribut title ne reprend pas le contenu textuel [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-6-1-5' target='_blank'>RGAA 6.1.5</a>]</li>";
	}
	
	// F. Chaque lien a t'il un intitulé
	const nia03f_nodes = document.querySelectorAll('a,[role="link"]');
	let nia03f_flag = false;
	let nia03f_lang = "";
	if(nia03f_nodes && nia03f_nodes.length > 0){
		if(debug_flag) console.log("[nia03f] Boucle sur les "+nia03f_nodes.length + " liens detectés sur cette page");
		for(let i = 0; i < nia03f_nodes.length; i++){
			nia03f_lang = nia03f_nodes[i].closest('[lang]').getAttribute('lang')
			//Ni dans l'attribut title, ni dans le contenu textuel, ni dans l'attribut alt des images enfants
			if( !(nia03f_nodes[i].hasAttribute("title") && sanitizeText(nia03f_nodes[i].getAttribute("title"),nia03f_lang).length > 0) && sanitizeText(nia03f_nodes[i].innerText).length == 0 && nia03f_nodes[i].querySelectorAll('img:not([alt=""]):not([aria-hidden="true"]):not([hidden])').length == 0){
				setItemOutline(nia03f_nodes[i],"red","nia03f");
				nia03f_flag = true;
			}
		}
	}
	if(nia03f_flag == true) {
	  result_nc += "<li><a href='#' data-destination='nia03f' class='result-focus'>03-F</a> : Présence de liens dont le contenu est vide [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-6-1-5' target='_blank'>RGAA 6.1.5</a>]</li>";
	}
	
	// G. Présence de liens sans href
	const nia03g_nodes = document.querySelectorAll('a:not([href])');
	if(nia03g_nodes && nia03g_nodes.length > 0 && isItemsVisible(nia03g_nodes)){
	  result_dev += "<li><a href='#' data-destination='nia03g' class='result-focus'>03-G</a> : Présence d'un lien sans destination</li>";
	  setItemsOutline(nia03g_nodes,"red","nia03g");
	}

/* 🗸 NIA-04 Formulaire - Thématique RGAA 11
- Autocomplete : Mise en avant des champs de formulaire avec un attribut autocomplete et vérification de la présence des attributs autocomplete pertinent sur les champs de formulaire classique */

	if(currentUrl.includes("contact.html")){

		// A. Champ générique 
		const nia04a1_nodes = document.querySelectorAll('input[name="name"]:not([autocomplete="family-name"]), input[name="lastname"]:not([autocomplete="family-name"])');
		if(nia04a1_nodes && nia04a1_nodes.length > 0){
		  result_nc += "<li><a href='#' data-destination='nia04a1' class='result-focus'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (name) - utiliser 'family-name' [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-11-13-1' target='_blank'>RGAA 11.13.1</a>]</li>";
		  setItemsOutline(nia04a1_nodes,"red","nia04a1");
		}
		const nia04a2_nodes = document.querySelectorAll('input[name="firstname"]:not([autocomplete="given-name"])');
		if(nia04a2_nodes && nia04a2_nodes.length > 0){
		  result_nc += "<li><a href='#' data-destination='nia04a2' class='result-focus'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (firstname) - utiliser 'given-name' [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-11-13-1' target='_blank'>RGAA 11.13.1</a>]</li>";
		  setItemsOutline(nia04a2_nodes,"red","nia04a2");
		}
		const nia04a3_nodes = document.querySelectorAll('input[type="email"]:not([autocomplete="email"])');
		if(nia04a3_nodes && nia04a3_nodes.length > 0){
		  result_nc += "<li><a href='#' data-destination='nia04a3' class='result-focus'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (email) - utiliser 'email' [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-11-13-1' target='_blank'>RGAA 11.13.1</a>]</li>";
		  setItemsOutline(nia04a3_nodes,"red","nia04a3");
		}
		const nia04a4_nodes = document.querySelectorAll('input[type="tel"]:not([autocomplete="tel"]), input[name="phone"]:not([autocomplete="tel"])');
		if(nia04a4_nodes && nia04a4_nodes.length > 0){
		  result_nc += "<li><a href='#' data-destination='nia04a4' class='result-focus'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (phone) - utiliser 'tel' [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-11-13-1' target='_blank'>RGAA 11.13.1</a>]</li>";
		  setItemsOutline(nia04a4_nodes,"red","nia04a4");
		}
		const nia04a5_nodes = document.querySelectorAll('input[name="postal"]:not([autocomplete="postal-code"]),input[type="postal-code"]:not([autocomplete="postal-code"])');
		if(nia04a5_nodes && nia04a5_nodes.length > 0){
		  result_nc += "<li><a href='#' data-destination='nia04a5' class='result-focus'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (postal) - utiliser 'postal-code' [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-11-13-1' target='_blank'>RGAA 11.13.1</a>]</li>";
		  setItemsOutline(nia04a5_nodes,"red","nia04a5");
		}
		const nia04a6_nodes = document.querySelectorAll('input[name="country"]:not([autocomplete="country-name"]), select[name="country"]:not([autocomplete="country"])');
		if(nia04a6_nodes && nia04a6_nodes.length > 0){
		  result_nc += "<li><a href='#' data-destination='nia04a6' class='result-focus'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (country) - utiliser 'country-name' ou 'country' [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-11-13-1' target='_blank'>RGAA 11.13.1</a>]</li>";
		  setItemsOutline(nia04a6_nodes,"red","nia04a6");
		}
		const nia04a7_nodes = document.querySelectorAll('input[name="matricule"][autocomplete]');
		if(nia04a7_nodes && nia04a7_nodes.length > 0 ){
		  result_nc += "<li><a href='#' data-destination='nia04a7' class='result-focus'>04-A</a> : Attribut erronée sur des champs formulaire (matricule) - Enlever l'attribut [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-11-13-1' target='_blank'>RGAA 11.13.1</a>]</li>";
		  setItemsOutline(nia04a7_nodes,"red","nia04a7");
		}
		const nia04a8_nodes = document.querySelectorAll('input[name="city"]:not([autocomplete="address-level2"]), input[name="ville"]:not([autocomplete="address-level2"])');
		if(nia04a8_nodes && nia04a8_nodes.length > 0){
		  result_nc += "<li><a href='#' data-destination='nia04a8' class='result-focus'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (ville) - Utiliser 'address-level2' [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-11-13-1' target='_blank'>RGAA 11.13.1</a>]</li>";
		  setItemsOutline(nia04a8_nodes,"red","nia04a8");
		}
		const nia04a9_nodes = document.querySelectorAll('textarea[name="adresse"]:not([autocomplete="street-address"]), input[name="adresse"]:not([autocomplete="street-address"]), input[name="street"]:not([autocomplete="street-address"])');
		if(nia04a9_nodes && nia04a9_nodes.length > 0 ){
		  result_nc += "<li><a href='#' data-destination='nia04a9' class='result-focus'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (adresse) - Utiliser 'street-address' [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-11-13-1' target='_blank'>RGAA 11.13.1</a>]</li>";
		  setItemsOutline(nia04a9_nodes,"red","nia04a9");
		}
		const nia04a10_nodes = document.querySelectorAll('input[name="organisation"]:not([autocomplete="organization"]), input[name="organization"]:not([autocomplete="organization"])');
		if(nia04a10_nodes && nia04a10_nodes.length > 0 ){
		  result_nc += "<li><a href='#' data-destination='nia04a10' class='result-focus'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (organisation) - utiliser 'organization' [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-11-13-1' target='_blank'>RGAA 11.13.1</a>]</li>";
		  setItemsOutline(nia04a10_nodes,"red","nia04a10");
		}
		const nia04a11_nodes = document.querySelectorAll('input[name="fonction"]:not([autocomplete="organization-title"]), input[name="function"]:not([autocomplete="organization-title"])');
		if(nia04a11_nodes && nia04a11_nodes.length > 0 ){
		  result_nc += "<li><a href='#' data-destination='nia04a11' class='result-focus'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (function) - utiliser 'organization-title' [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-11-13-1' target='_blank'>RGAA 11.13.1</a>]</li>";
		  setItemsOutline(nia04a11_nodes,"red","nia04a11");
		}
		
		
		// B. Vérifier le format sur l'email
		const nia04b_nodes = document.querySelectorAll('input[type="email"]');
		let nia04b_flag = false;
		let nia04b_id = "", nia04b_desc = "", nia04b_label = "", nia04b_help = "";
		if(nia04b_nodes && nia04b_nodes.length > 0){
			if(debug_flag) console.log("[nia04b] Boucle sur les "+nia04b_nodes.length + " champs email detectés sur cette page");
			for(let i = 0; i < nia04b_nodes.length; i++){
				nia04b_id = "", nia04b_desc = "", nia04b_label = "", nia04b_help = "";
				nia04b_id = nia04b_nodes[i].getAttribute("id");
				nia04b_desc = nia04b_nodes[i].getAttribute("aria-describedby");
				if(nia04b_id && nia04b_id != ""){
					nia04b_label = document.querySelector("label[for='"+nia04b_id+"']");
					if(!nia04b_label){
						setItemOutline(nia04b_nodes[i],"red","nia04b");
						nia04b_flag = true;
					}
				}
				if(nia04b_desc && nia04b_desc != ""){
					nia04b_help = document.querySelector("[id="+nia04b_desc+"]");
					if(!nia04b_help){
						setItemOutline(nia04b_nodes[i],"red","nia04b");
						nia04b_flag = true;
					}
				}
				if((nia04b_label && nia04b_label != "" && nia04b_label.innerText.match(/^\S+@\S+\.\S+$/)) || (nia04b_help && nia04b_help != "" && nia04b_help.innerText.match(/^\S+@\S+\.\S+$/))){
					setItemOutline(nia04b_nodes[i],"red","nia04b");
					nia04b_flag = true;
				}
			}
		}
		if(nia04b_flag == true) {
		  result_nc += "<li><a href='#' data-destination='nia04b' class='result-focus'>04-B</a> : Présence de champs email sans exemple de format [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-11-10-5' target='_blank'>RGAA 11.10.5</a>]</li>";
		}
		
		// C. Check intitulé bouton envoi 
		const nia04c_btn = document.querySelector('html[lang="fr"] form button.cmp-form-button[type="SUBMIT"][name="preview"]');
		if(nia04c_btn && nia04c_btn.textContent != "Prévisualiser puis envoyer" ){
		  result_nth += "<li><a href='#' data-destination='nia04c' class='result-focus'>04-C</a> : Vérifier si le bouton de soumission possède bien la notion de prévisualisation' [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-11-12-1' target='_blank'>RGAA 11.12.1</a>]</li>";
		  setItemsOutline(nia04c_btn,"yellow","nia04c");
		}
	}

	// C. Vérifier si les champs ont bien un label
	const nia04d_nodes = document.querySelectorAll("input:not([aria-label]):not([aria-labelledby]):not([type='hidden']):not([type='submit']):not([type='reset']):not([type='button']), select:not([aria-label]):not([aria-labelledby]), textarea:not([aria-label]):not([aria-labelledby])");
	let nia04d_flag = false;
	let nia04d_label = "", nia04d_id = "";
	if(nia04d_nodes && nia04d_nodes.length > 0){
		if(debug_flag) console.log("[nia04d] Boucle sur les "+nia04d_nodes.length + " champs detectés sur cette page");
		for(let i = 0; i < nia04d_nodes.length; i++){
			nia04d_id = nia04d_nodes[i].getAttribute("id");
			if(!nia04d_id || nia04d_id == ""){
				setItemOutline(nia04d_nodes[i],"red","nia04d");
				nia04d_flag = true;
			}
			else{
				nia04d_label = document.querySelectorAll("label[for='"+nia04d_id+"']");
				if(!nia04d_label || nia04d_label.length != 1){
					setItemOutline(nia04d_nodes[i],"red","nia04d");
					nia04d_flag = true;
				}
			}
		}
	}
	if(nia04d_flag == true) {
	  result_nc += "<li><a href='#' data-destination='nia04d' class='result-focus'>04-D</a> : Présence de champs sans ou avec plus d'un label [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-11-1-1' target='_blank'>RGAA 11.1.1</a>]</li>";
	}


	// E. fieldset avec legend
	const nia04e_nodes = document.querySelectorAll('fieldset');
	let nia04e_flag = false;
	if(nia04e_nodes && nia04e_nodes.length > 0){
		if(debug_flag) console.log("[nia04e] Boucle sur les "+nia04e_nodes.length + " fielset detectés sur cette page");
		for(let i = 0; i < nia04e_nodes.length; i++){
			if(isItemVisible(nia04e_nodes[i])){
				if(nia04e_nodes[i].firstChild.tagName && nia04e_nodes[i].firstChild.tagName == "LEGEND"){
					// OK
				}
				else if(nia04e_nodes[i].firstChild.firstChild && nia04e_nodes[i].firstChild.firstChild.tagName && nia04e_nodes[i].firstChild.firstChild.tagName == "LEGEND"){
					// La balise légend est encapsulée dans un container
				}
				else if(sanitizeText(nia04e_nodes[i].firstChild.textContent) == "" && nia04e_nodes[i].firstChild.nextSibling && nia04e_nodes[i].firstChild.nextSibling.tagName == "LEGEND") {
					// Présence d'un élément décoratif avant la balise légende ( un \n, un pseudo-elem, etc.)
				}
				else{
					setItemsOutline(nia04e_nodes[i],"yellow","nia04e");
					nia04e_flag = true;
				}
			}
		}
	}
	if(nia04e_flag == true) {
		result_nc += "<li><a href='#' data-destination='nia04e' class='result-focus'>04-E</a> : Absence de la légende dans un filedset [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-11-6-1' target='_blank'>RGAA 11.6.1</a>]'</li>";
	}

	// F. Required ou aria-required="true" possède un asterisque dans le label
	const nia04f_nodes = document.querySelectorAll('form [required], form [aria-required="true"]');
	const nia04f_desc = document.querySelectorAll('.cmp-form__mandatory-text')
	let nia04f_flag = false;
	let nia04f_id, nia04f_label;
	if(nia04f_nodes && nia04f_nodes.length > 0){
		if(debug_flag) console.log("[nia04f] Boucle sur les "+nia04f_nodes.length + " champs obligatoire detectés sur cette page");
		for(let i = 0; i < nia04f_nodes.length; i++){
			if(isItemVisible(nia04f_nodes[i])){
				nia04f_id = nia04f_nodes[i].getAttribute("id");
				if(!nia04f_id || nia04f_id == ""){
					setItemOutline(nia04f_nodes[i],"red","nia04f");
					nia04f_flag = true;
				}
				else{
					nia04f_label = document.querySelectorAll("label[for='"+nia04f_id+"']");
					if(!nia04f_label || nia04f_label.length == 0){
						setItemOutline(nia04f_nodes[i],"red","nia04f");
						nia04f_flag = true;
					}
					else if(!(nia04f_label[0].textContent).includes("*")){
						setItemOutline(nia04f_nodes[i],"red","nia04f");
						nia04f_flag = true;
					}
				}
			}
		}
		if(nia04f_desc.length == 0){
			result_nc += "<li>04-F : Absence d'indication de la signification de l'astrisque sur un champ obligatoire [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-11-10-1' target='_blank'>RGAA 11.10.1</a>]</li>";
		}
	}
	if(nia04f_flag == true) {
		result_nc += "<li><a href='#' data-destination='nia04f' class='result-focus'>04-F</a> : Absence d'astrisque sur un champ obligatoire [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-11-10-1' target='_blank'>RGAA 11.10.1</a>]'</li>";
	}

	// G. Pas d'autocomplete sur les champs radio/checkbox
	const nia04g_nodes = document.querySelectorAll('input[type="checkbox"][autocomplete]:not([autocomplete="off"]),input[type="radio"][autocomplete]:not([autocomplete="off"])');
	if(nia04g_nodes && nia04g_nodes.length > 0 && isItemsVisible(nia04g_nodes)){
	  result_nc += "<li><a href='#' data-destination='nia04g' class='result-focus'>04-G</a> : Présence d'autocomplete sur un champ de type 'checkbox' ou 'Radiobutton' [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-11-13-1' target='_blank'>RGAA 11.13.1</a>]</li>";
	  setItemsOutline(nia04g_btn,"red","nia04g");
	}

	// H. Todo 11.5 --> Champ et étiquette accolé en recupérant les positions ?


/* 🗸 NIA-05 Element Obligatoire - Thématique RGAA 8
- Empty : Mise en avant des balises et paragraphes vides
*/

	// A. Bloc vide
	//const nia05a_nodes = document.querySelectorAll('body *:not(.ol-attribution) > *:not(:where(div, br, hr, img, svg, use, path, circle, rect, i, time[datetime], iframe, canvas, script, td, input, textarea, select, option, [aria-hidden="true"], source, meta, .mapboxgl-ctrl-logo)):empty');
	const nia05a_nodes = document.querySelectorAll('*:not(.ol-attribution) > :where(p, span, td, th, strong, em, a, q, blockquote, aside, ul):not([aria-hidden="true"]):not(.mapboxgl-ctrl-logo):empty');
	let nia05a_container = "";
	if(nia05a_nodes && nia05a_nodes.length > 0 && isItemsVisible(nia05a_nodes)){
	  result_nc += "<li><a href='#' data-destination='nia05b' class='result-focus'>05-A</a> : Présence de balise vide [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-8-9-1' target='_blank'>RGAA 8.9.1</a>]</li>";
	  for(let i = 0; i < nia05a_nodes.length; i++){
			if(isItemVisible(nia05a_nodes[i])){
				setItemOutline(nia05a_nodes[i],"red","nia05a");
				nia05a_container = nia05a_nodes[i].parentElement;
				nia05a_container.style.outline = "3px dotted red";
				nia05a_container.style.outlineOffset = "-2px";
			}
		}
	}

    // B. Bloc vide avec $nbsp; ou \n
	//const nia05b_nodes = document.querySelectorAll('body *:not(.ol-attribution) > *:not(:where(div, br, hr, img, svg, use, path, circle, rect, i, time[datetime], iframe, canvas, script, td, input, textarea, select, option, [aria-hidden="true"], source, meta, .mapboxgl-ctrl-logo))');
	const nia05b_nodes = document.querySelectorAll('*:not(.ol-attribution):not([aria-hidden="true"]) > :where(p, span, td, th, strong, em, a, q, blockquote, aside, ul):not([aria-hidden="true"]):not(.mapboxgl-ctrl-logo):not(:empty)');
	let nia05b_flag = false;
	let nia05b_clean_node = "", nia05b_container = "", nia05b_lang = "";
	if(nia05b_nodes && nia05b_nodes.length > 0){
		if(debug_flag) console.log("[nia05b] Boucle sur les " + nia05b_nodes.length + " elements détéctés sur cette page");
		for(let i = 0; i < nia05b_nodes.length; i++){
			if(nia05b_nodes[i].childElementCount == 0){
				nia05b_lang = nia05b_nodes[i].closest('[lang]').getAttribute('lang');
				//nia05b_clean_node = nia05b_nodes[i].innerText.replaceAll(/\s/g,'').replace(/\n|\r|-|,|\|/g, "").replace(/  +/g, " ").trim();
				nia05b_clean_node = sanitizeText(nia05b_nodes[i].innerText, nia05b_lang);
				//console.log(nia05b_nodes[i].innerText +" --> "+ nia05b_clean_node);
				if(nia05b_clean_node == "" && isItemVisible(nia05b_nodes[i])){
					setItemOutline(nia05b_nodes[i],"red","nia05b");
					nia05b_container = nia05b_nodes[i].parentElement;
					nia05b_container.style.outline = "3px dotted red";
					nia05b_container.style.outlineOffset = "-2px";
					nia05b_flag = true;
				}
			}
		}
	}
	if(nia05b_flag == true) {
	  result_nc += "<li><a href='#' data-destination='nia05b' class='result-focus'>05-B</a> : Présence de balises vides (ou avec un contenu assimilable à vide) [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-8-9-1' target='_blank'>RGAA 8.9.1</a>]</li>";
	}
	
	// C. Doctype
	const nia05c_doctype = new XMLSerializer().serializeToString(document.doctype);
	if(nia05c_doctype != "<!DOCTYPE html>"){
		result_dev += "<li><a href='#' data-destination='nia05c' class='result-focus'>05-C</a> : Vérifier qu'un doctype est correctement déclaré [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-8-1-1' target='_blank'>RGAA 8.1.1</a>]</li>";
	}
	
	// D. Page title
	const nia05d_title = document.title;
	if(nia05d_title == ""){
		result_nc += "<li><a href='#' data-destination='nia05d' class='result-focus'>05-D</a> : Vérifier qu'un titre de page est défini [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-8-5-1' target='_blank'>RGAA 8.5.1</a>]</li>";
	}
	
	// E. Changement de sens de lecture
	const nia05e1_nodes = document.querySelectorAll('[dir]:not([dir="rtl"]):not([dir="ltr"])');
	if(nia05e1_nodes && nia05e1_nodes.length > 0 && isItemsVisible(nia05e1_nodes)){
	  result_dev += "<li><a href='#' data-destination='nia05e1' class='result-focus'>05-E</a> : Vérifier la valeur de définition du sens de lecture [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-8-10-2' target='_blank'>RGAA 8.10.2</a>]</li>";
	  setItemsOutline(nia05e1_nodes,"red","nia05e1");
	}
	
	const nia05e2_nodes = document.querySelectorAll('[dir="rtl"]');
	const nia05e2_rtl_isocode = ["ar", "ara", "arc", "ae", "ave", "egy", "he", "heb", "nqo", "pal", "phn", "sam", "syc", "syr", "fa", "per", "fas", "ku", "kur", "dv", "ha" , "khw", "ks", "pa", "ur", "yi"];
	let nia05e2_flag = false;
	let nia05e2_lang;
	if(nia05e2_nodes && nia05e2_nodes.length > 0 && isItemsVisible(nia05e2_nodes)){
	  for(let i = 0; i < nia05e2_nodes.length; i++){
		  nia05e2_lang = nia05e2_nodes[i].closest('[lang]').getAttribute('lang');
		  if (nia05e2_rtl_isocode.indexOf(nia05e2_lang) < 0) {
			  setItemOutline(nia05e2_nodes[i],"red","nia05e2");
			  nia05e2_flag = true;
		  }
	  }
	}
	if(nia05e2_flag == true){
	  result_nc += "<li><a href='#' data-destination='nia05e2' class='result-focus'>05-E</a> : Présence d'élément avec un sens de lecture de droite vers la gauche [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-8-10-2' target='_blank'>RGAA 8.10.2</a>]</li>";
	}
	
	// F. Id dupliqué
	const nia05f_nodes = document.querySelectorAll('[id]:not(script):not(link)');
	let nia05f_flag = false;
	let nia05f_ids = {};
	let nia05f_currentId;
	if(nia05f_nodes && nia05f_nodes.length > 0){
		if(debug_flag) console.log("[nia05f] Boucle sur les " + nia05f_nodes.length + " id détéctés sur cette page");
		for(let i = 0; i < nia05f_nodes.length; i++){
			nia05f_currentId = nia05f_nodes[i].id ? nia05f_nodes[i].id : "undefined";
			if(isNaN(nia05f_ids[nia05f_currentId])) {
				nia05f_ids[nia05f_currentId] = 0;
			}
			else{
				nia05f_flag = true;
				setItemOutline(nia05f_nodes[i],"red","nia05f");
			}
			nia05f_ids[nia05f_currentId]++;
		}
	}
	if(nia05f_flag == true){
	  console.log(nia05f_ids);
	  result_dev += "<li><a href='#' data-destination='nia05f' class='result-focus'>05-F</a> : Présence d'Id dupliqué [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-8-2-1' target='_blank'>RGAA 8.2.1</a>]</li>";
	}
	
	// G. Todo--> Govbar

/* 🗸 NIA-06 Structure de l'information - Thématique RGAA 9 
- Landmark
- List : Mise en avant des listes */

	// A. Vérifier qu'il n'y a pas de role sur les container de liste
	const nia06a_nodes = document.querySelectorAll('ul[role]:not([role="list"]),ol[role]:not([role="list"]),li[role]:not([role="listitem"]),dl[role]:not([role="listitem"])');
	if(nia06a_nodes && nia06a_nodes.length > 0 && isItemsVisible(nia06a_nodes)){
	  result_dev += "<li><a href='#' data-destination='nia06a' class='result-focus'>06-A</a> : Vérifier qu'il n'y a pas de role sur les container de liste [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-9-3-1' target='_blank'>RGAA 9.3.1</a>]</li>";
	  setItemsOutline(nia06a_nodes,"red","nia06a");
	}
	
	// B. Vérifier que le liste <ul> et <ol> ne contienne que des <li> ou [role="listitem"]
	const nia06b_nodes = document.querySelectorAll(':where(ul,ol,[role="list"]) > *:not(li):not([role="listitem"])');
	if(nia06b_nodes && nia06b_nodes.length > 0){
	  result_nc += "<li><a href='#' data-destination='nia06b' class='result-focus'>06-B</a> : Présence d'un élement non autorisé dans une liste [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-9-3-1' target='_blank'>RGAA 9.3.1</a>]</li>";
	  setItemsOutline(nia06b_nodes,"red","nia06b");
	}
	
	// --> Todo : landmark 9.2.1
	
	// C. Vérifier que la zone d’en-tête est structurée au moyen d’un élément <header> ;
	// <header class="page-header" role="banner">
	const nia06c_nodes = document.querySelector('header.page-header[role="banner"]');
	if(nia06c_nodes == null){
		result_dev += "<li>06-C : Il y a un problème avec la structuration du header [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-9-2-1' target='_blank'>RGAA 9.2.1</a>]</li>";
	}
	
	// D. Vérifier que les zones de navigation principales et secondaires sont structurées au moyen d’un élément <nav> ;
	// <nav class="page-headernav" role="navigation" aria-label="Menu principal" id="headernav">
	const nia06d_nodes = document.querySelectorAll('nav.page-headernav[role="navigation"]');
	if(nia06d_nodes == null){
		result_dev += "<li>06-D : Il y a un problème avec la structuration de la navigation [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-9-2-1' target='_blank'>RGAA 9.2.1</a>]</li>";
	}
	
	// E. Vérifier que l’élément <nav> n’est pas utilisé en dehors de la structuration des zones de navigation principales et secondaires ;
	const nia06e1_nodes = document.querySelectorAll('nav:not([role="navigation"])');
	if(nia06e1_nodes && nia06e1_nodes.length > 0 && isItemsVisible(nia06e1_nodes)){
	  result_nc += "<li><a href='#' data-destination='nia06e1' class='result-focus'>06-E</a> : Présence d'une zone de navigation sans attribut role</li>";
	  setItemsOutline(nia06e1_nodes,"red","nia06e1");
	}
	
	/*
	Les principales barres de navigation (critère 12.2) sont :
	Un menu de navigation ;
	Un fil d’ariane ;
	Une liste de navigation d’une liste de résultats ;
	Des liens d’évitement.
	
	Il existe différents types de menu de navigation (critère 12.1 et critère 12.2) :
	Menu de navigation principal ;
	Menu de sous-rubrique ;
	Menu contextuel ;
	Table des matières concernant un ensemble de pages.
	*/
	const nia06e2_nodes = document.querySelectorAll('*:not(.page-langs):not(.right-part) > nav:not(.page-headernav):not(.page-headernavmobile):not(.cmp-breadcrumb):not(.page-localnav)');
	if(nia06e2_nodes && nia06e2_nodes.length > 0&& isItemsVisible(nia06e2_nodes)){
	  result_nc += "<li><a href='#' data-destination='nia06e2' class='result-focus'>06-E</a> : Présence d'une balise nav utilisé en dehors d'une zone de navigation [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-9-2-1' target='_blank'>RGAA 9.2.1</a>]</li>";
	  setItemsOutline(nia06e2_nodes,"red","nia06e2");
	}
	
	// F. Vérifier que la zone de contenu principal est structurée au moyen d’un élément <main> ;
	// Si le document possède plusieurs éléments <main>, vérifier qu’un seul de ces éléments est visible (les autres occurrences de l’élément sont pourvues d’un attribut hidden) ;
	// <main id="main" class="page-main " role="main">
	
	const nia06f1_nodes = document.querySelectorAll('main:not([role="main"])');
	if(nia06f1_nodes && nia06f1_nodes.length > 0 && isItemsVisible(nia06f1_nodes)){
	  result_nth += "<li><a href='#' data-destination='nia06f1' class='result-focus'>06-F</a> : Présence d'une zone de contenu principal sans attribut role</li>";
	  setItemsOutline(nia06f1_nodes,"red","nia06f1");
	}
	
	const nia06f2_nodes = document.querySelectorAll('main');
	let nia06f2_counter = 0;
	if(nia06f2_nodes && nia06f2_nodes.length > 1){
		for(let i = 0; i < nia06f2_nodes.length; i++){
			if(isItemVisible(nia06f2_nodes[i])){
				nia06f2_counter++;
			}
			if(nia06f2_counter > 1){
				result_nc += "<li><a href='#' data-destination='nia06f2' class='result-focus'>06-F</a> : Présence de plusieurs zone de contenu principal [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-9-2-1' target='_blank'>RGAA 9.2.1</a>]</li>";
				setItemsOutline(nia06f2_nodes,"red","nia06f2");
				break;
			}
		}
	}
	
	// G. Vérifier que la zone de pied de page est structurée au moyen d’un élément <footer>.
	const nia06g1_nodes = document.querySelectorAll('footer:not([role="contentinfo"])');
	if(nia06g1_nodes && nia06g1_nodes.length > 0 && isItemsVisible(nia06g1_nodes)){
	  result_nth += "<li><a href='#' data-destination='nia06g1' class='result-focus'>06-G</a> : Présence d'une zone de pied de page sans attribut role</li>";
	  setItemsOutline(nia06g1_nodes,"red","nia06g1");
	}

	const nia06g2_nodes = document.querySelector('footer.page-footer[role="contentinfo"]');
	if(nia06g2_nodes == null){
		result_dev += "<li>06-G : Il y a un problème avec la structuration du footer [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-9-2-1' target='_blank'>RGAA 9.2.1</a>]</li>";
	}
	
	// H. Cadres avec un titre
	const nia06h_nodes = document.querySelectorAll('frame:not([title]),iframe:not([title])');
	if(nia06h_nodes && nia06h_nodes.length > 0 && isItemsVisible(nia06h_nodes)){
	  result_nc += "<li><a href='#' data-destination='nia06h' class='result-focus'>06-H</a> : Chaque cadre doit avoir un titre  [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-2-1-1' target='_blank'>RGAA 2.1.1</a>] </li>";
	  setItemsOutline(nia06h_nodes,"red","nia06h");
	}

	// I. Presence de triple espace (double concidéré comme erreur d'inattention)
	const nia06i_nodes = document.querySelectorAll('.cmp-text');
	let nia06i_flag = false;
	let nia06i_result;
	if(nia06i_nodes && nia06i_nodes.length > 0){
		for(let i = 0; i < nia06i_nodes.length; i++){
			if(isItemVisible(nia06i_nodes[i])){
				const nia06i_result = nia06i_nodes[i].innerText.match(/   +/g);
				if(nia06i_result && nia06i_result.length > 0) {
					setItemOutline(nia06i_nodes[i],"yellow","nia06i");
					nia06i_flag = true;
				}
			}
		}
	}	
	if(nia06i_flag == true) {
	  result_nth += "<li><a href='#' data-destination='nia06i' class='result-focus'>06-I</a> : Présence d'espace pour créer des effets de marges ou d'alignement [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-10-1-3' target='_blank'>RGAA 10.1.3</a>] </li>";
	  setItemsOutline(nia06i_nodes,"yellow","nia06i");
	}

/* 🗸 NIA-07 Title : Mise en avant des titres (<Hn> et ceux qui ont les roles=heading). 
o Vérification de la présence de titres simulés - S’assurer que les titres sont bien balisés avec des balises <Hn> et pas seulement avec du gras.
o S’assurer que les titres sont dans le bon ordre*/

	// A. Heading avec role
	const nia07a_nodes = document.querySelectorAll('h1[role]:not([role="heading"]),h2[role]:not([role="heading"]),h3[role]:not([role="heading"]),h4[role]:not([role="heading"]),h5[role]:not([role="heading"]),h6[role]:not([role="heading"])');
	if(nia07a_nodes && nia07a_nodes.length > 0 && isItemsVisible(nia07a_nodes)){
	  result_nc += "<li><a href='#' data-destination='nia07a' class='result-focus'>07-A</a> : Présence de titre avec un attribut role</li>";
	  setItemsOutline(nia07a_nodes,"red","nia07a");
	}

	// B. Aria-level sans heading
	const nia07b_nodes = document.querySelectorAll('[aria-level]:not(h1):not(h2):not(h3):not(h4):not(h5):not(h6):not([role="heading"])');
	if(nia07b_nodes && nia07b_nodes.length > 0 && isItemsVisible(nia07b_nodes)){
	  result_nc += "<li><a href='#' data-destination='nia07b' class='result-focus'>07-B</a> : Présence d'attribut aria-level en dehors de titre</li>";
	  setItemsOutline(nia07b_nodes,"red","nia07b");
	}
	
	// C. Heading caché au outil d'assistance 
	const nia07c_nodes = document.querySelectorAll('h1[aria-hidden],h2[aria-hidden],h3[aria-hidden],h4[aria-hidden],h5[aria-hidden],h6[aria-hidden]');
	if(nia07c_nodes && nia07c_nodes.length > 0 && isItemsVisible(nia07c_nodes)){
	  result_nc += "<li><a href='#' data-destination='nia07c' class='result-focus'>07-C</a> : Présence de titre caché au outil d'assistance </li>";
	  setItemsOutline(nia07c_nodes,"red","nia07c");
	}

	// D. Heading simulé
	const nia07d_nodes = document.querySelectorAll('b,p:not(.cmp-form__mandatory-text) > strong:first-child ,span > strong:first-child ,div > strong:first-child , *:not(.accordionItem) > *:not(figcaption):not(.article-summary):not(.article-metas):not(.search-metas):not(.cmp-grid__textContainer):not(.feed-item-content):not(.meta-themes):not(.description):not(.meta-published-update) > p:not(.cmp-lastupdate):not(.cmp-form__mandatory-text):not(.at):not(.feed-item-author):not(.orejime-Notice-description):first-child');
	let nia07d_flag = false;
	let nia07d_fontSize;
	if(nia07d_nodes && nia07d_nodes.length > 0){
		for(let i = 0; i < nia07d_nodes.length; i++){
			if(isItemVisible(nia07d_nodes[i]) && nia07d_nodes[i].length < 150){
				//boucle pour exclure les textes de plus de 150 caractères 
				setItemsOutline(nia07d_nodes[i],"yellow","nia07d");
				nia07d_flag = true;
			}
		}
	}
	if(nia07d_flag == true) {
	  result_nth += "<li><a href='#' data-destination='nia07d' class='result-focus'>07-D</a> : Présence de texte ressemblant à des titres n'étant pas balisé comme tel - A vérifier au cas par cas [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-9-1-3' target='_blank'>RGAA 9.1.3</a>]</li>";
	}
	
	// E. Ordre Heading
	const nia07e_nodes = document.querySelectorAll(':where(h1,h2,h3,h4,h5,h6,[role="heading"]):not([aria-hidden])');
	let nia07e_flag = false;
	let nia07e_current_level = 0, nia07e_previous_level = 0;
	if(nia07e_nodes && nia07e_nodes.length > 0){
		if(debug_flag) console.log("[nia07e] Boucle sur les " + nia07e_nodes.length + " titres détéctés sur cette page");
		for(let i = 0; i < nia07e_nodes.length; i++){
			if(isItemVisible(nia07e_nodes[i])){
				if(nia07e_nodes[i].tagName == 'H1' || (nia07e_nodes[i].hasAttribute('aria-level') && nia07e_nodes[i].hasAttribute('role') && nia07e_nodes[i].getAttribute('aria-level').value == "1" && nia07e_nodes[i].getAttribute('role').value == "heading")) {nia07e_current_level = 1;}
				else if(nia07e_nodes[i].tagName == 'H3' || (nia07e_nodes[i].hasAttribute('aria-level') && nia07e_nodes[i].hasAttribute('role') && nia07e_nodes[i].getAttribute('aria-level').value == "3" && nia07e_nodes[i].getAttribute('role').value == "heading")) {nia07e_current_level = 3;}
				else if(nia07e_nodes[i].tagName == 'H4' || (nia07e_nodes[i].hasAttribute('aria-level') && nia07e_nodes[i].hasAttribute('role') && nia07e_nodes[i].getAttribute('aria-level').value == "4" && nia07e_nodes[i].getAttribute('role').value == "heading")) {nia07e_current_level = 4;}
				else if(nia07e_nodes[i].tagName == 'H5' || (nia07e_nodes[i].hasAttribute('aria-level') && nia07e_nodes[i].hasAttribute('role') && nia07e_nodes[i].getAttribute('aria-level').value == "5" && nia07e_nodes[i].getAttribute('role').value == "heading")) {nia07e_current_level = 5;}
				else if(nia07e_nodes[i].tagName == 'H6' || (nia07e_nodes[i].hasAttribute('aria-level') && nia07e_nodes[i].hasAttribute('role') && nia07e_nodes[i].getAttribute('aria-level').value == "6" && nia07e_nodes[i].getAttribute('role').value == "heading")) {nia07e_current_level = 6;}
				else {nia07e_current_level = 2;}
				if(nia07e_current_level - nia07e_previous_level > 1){
					setItemOutline(nia07e_nodes[i],"yellow","nia07e");
					console.log(nia07e_nodes[i].innerText+" | current : "+nia07e_current_level+" | previous :"+nia07e_previous_level);
					nia07e_flag = true;
				}
				nia07e_previous_level = nia07e_current_level;
			}
		}
	}
	if(nia07e_flag == true) {
	  result_nth += "<li><a href='#' data-destination='nia07e' class='result-focus'>07-E</a> : Présence de sauts de titres [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-9-1-1' target='_blank'>RGAA 9.1.1</a>]</li>";
	}

/* 🗸 NIA-08 Tableau : Thématique RGAA 5
 - vérification présence des bons attributs sur les tableaux. 
 - Eviter les éléments ajoutés par les copier/coller de word. 
 - Vérifier en particulier les attributs « scope » sur les éléments de header
*/

	// A. Attribut de tableau
	const nia08a_nodes = document.querySelectorAll(':where([role="table"],table:not([role="presentation"])) th:not([scope="row"]):not([scope="col"]):not([id]):not([role="rowheader"]):not([role="columnheader"])');
	if(nia08a_nodes && nia08a_nodes.length > 0 && isItemsVisible(nia08a_nodes)){
	  result_nc += "<li><a href='#' data-destination='nia08a' class='result-focus'>08-A</a> : Absence de l'attribut scope sur les en-tete de tableau [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-5-7-1' target='_blank'>RGAA 5.7.1</a>]</li>";
	  setItemsOutline(nia08a_nodes,"red","nia08a");
	}
	
	// B. Attribut deprecated
	const nia08b_nodes = document.querySelectorAll(':where([role="table"],table):where([align],[bgcolor],[border],[frame],[cellpadding],[cellspacing],[width],[summary],[rules])');
	if(nia08b_nodes && nia08b_nodes.length > 0 && isItemsVisible(nia08b_nodes)){
	  result_nc += "<li><a href='#' data-destination='nia08b' class='result-focus'>08-B</a> : Presence d'attribut obsolete sur un tableau</li>";
	  setItemsOutline(nia08b_nodes,"red","nia08b");
	}

	// C. Attribut deprecated
	const nia08c_nodes = document.querySelectorAll('th[header], td[header]');
	if(nia08c_nodes && nia08c_nodes.length > 0 && isItemsVisible(nia08c_nodes)){
	  result_nth += "<li><a href='#' data-destination='nia08c' class='result-focus'>08-C</a> : Presence attributs header obsolete dans un tableau</li>";
	  setItemsOutline(nia08c_nodes,"yellow","nia08c");
	}
	
	// D. Tableau de mise en forme
	const nia08d_nodes = document.querySelectorAll('table[role="presentation"][summary], table[role="presentation"] :where(caption,thead,th,tfoot,[role="rowheader"],[role="columnheader"],td[scope],td[headers],td[axis])');
	if(nia08d_nodes && nia08d_nodes.length > 0 && isItemsVisible(nia08d_nodes)){
	  result_nc += "<li><a href='#' data-destination='nia08d' class='result-focus'>08-D</a> : Presence d'élements incompatible avec un tableau de mise en forme [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-5-8-1' target='_blank'>RGAA 5.8.1</a>]</li>";
	  setItemsOutline(nia08d_nodes,"red","nia08d");
	}
	
	// E. Chaque tableau à un entete de ligne ou de colonne balisé avec th ou role="columnheader" ou role="rowheader" 
	const nia08e_nodes = document.querySelectorAll(':where([role="table"],table:not([role="presentation"]))');
	let nia08e_flag = false;
	let nia08e_html = "";
	if(nia08e_nodes && nia08e_nodes.length > 0){
		if(debug_flag) console.log("[nia08e] Boucle sur les "+nia08e_nodes.length + " tableaux détéctés sur cette page");
		for(let i = 0; i < nia08e_nodes.length; i++){
			nia08e_html = nia08e_nodes[i].innerHTML;
			console.log(nia08e_html);
			if(nia08e_html.indexOf('<th') >= 0 && !nia08e_html.indexOf(' role="columnheader"') >= 0 && !nia08e_html.indexOf(' role="rowheader"') >= 0 ){
				setItemOutline(nia08e_nodes[i],"red","nia08e");
				nia08e_flag = true;
			}
		}
	}
	if(nia08e_flag == true) {
	  result_nth += "<li><a href='#' data-destination='nia08e' class='result-focus'>08-E</a> : Présence d'un tableau de données sans en-tête [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-5-6-1' target='_blank'>RGAA 5.6.1</a>]</li>";
	}
	


/* 🗸 NIA-09 Navigation 
- Pertinance du plan du site
- Tabindex : Mise en avant des éléments possédant un tabindex défini. Vérifier l'absence d’attribut « tabindex » positif dans le contenu*/

	if(currentUrl.includes("plan-du-site.html") || currentUrl.includes("plan.html")){
		const nia09a_footer = document.querySelectorAll('.page-footernav a[href*="contact"][href$=".html"]');
		const nia09b_footer = document.querySelectorAll('.page-footernav a[href*="accessibilite"][href$=".html"]');
		const nia09c_footer = document.querySelectorAll('.page-footernav a[href*="aspects-legaux"][href$=".html"]');
		const nia09d_footer = document.querySelectorAll('.page-footernav a[href*="a-propos"][href$=".html"]');
		const nia09a_sitemap = document.querySelectorAll('.cmp-sitemap a[href*="contact"][href$=".html"]');
		const nia09b_sitemap = document.querySelectorAll('.cmp-sitemap a[href*="accessibilite"][href$=".html"]');
		const nia09c_sitemap = document.querySelectorAll('.cmp-sitemap a[href*="aspects-legaux"][href$=".html"]');
		const nia09d_sitemap = document.querySelectorAll('.cmp-sitemap a[href*="a-propos"][href$=".html"]');

		if(nia09a_footer && nia09a_sitemap && nia09a_footer.length != nia09a_sitemap.length){
		  result_nc += "<li><a href='#' data-destination='nia09a' class='result-focus'>09-A</a> : Il manque la page contact dans le footer ou dans le plan du site [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-12-3-1' target='_blank'>RGAA 12.3.1</a>]</li>";
		  setItemsOutline(nia09a_footer,"red","nia09a");
		  setItemsOutline(nia09a_sitemap,"red","nia09a");
		}

		if(nia09b_footer && nia09b_sitemap && nia09b_footer.length != nia09b_sitemap.length){
		  result_nc += "<li><a href='#' data-destination='nia09b' class='result-focus'>09-B</a> : Il manque la page Accessibilité dans le footer ou dans le plan du site [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-12-3-1' target='_blank'>RGAA 12.3.1</a>]</li>";
		  setItemsOutline(nia09b_footer,"red","nia09b");
		  setItemsOutline(nia09b_sitemap,"red","nia09b");
		}
		
		if(nia09c_footer && nia09c_sitemap && nia09c_footer.length != nia09c_sitemap.length){
		  result_nc += "<li><a href='#' data-destination='nia09c' class='result-focus'>09-C</a> : Il manque la page aspect légaux dans le footer ou dans le plan du site [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-12-3-1' target='_blank'>RGAA 12.3.1</a>]</li>";
		  setItemsOutline(nia09c_footer,"red","nia09c");
		  setItemsOutline(nia09c_sitemap,"red","nia09c");
		}
		
		if(nia09d_footer && nia09d_sitemap && nia09d_footer.length != nia09d_sitemap.length){
		  result_nc += "<li><a href='#' data-destination='nia09d' class='result-focus'>09-D</a> : Il manque la page A propos dans le footer ou dans le plan du site [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-12-3-1' target='_blank'>RGAA 12.3.1</a>]</li>";
		  setItemsOutline(nia09d_footer,"red","nia09d");
		  setItemsOutline(nia09d_sitemap,"red","nia09d");
		}
	}

	// E. Presence d'attibut tabindex positif
	const nia09e_nodes = document.querySelectorAll('[tabindex]:not([tabindex="0"]):not([tabindex="-1"])');
	if(nia09e_nodes && nia09e_nodes.length > 0 && isItemsVisible(nia09e_nodes)){
	  result_nth += "<li><a href='#' data-destination='nia09e' class='result-focus'>09-E</a> : Presence d'attibut tabindex positif [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-12-8-1' target='_blank'>RGAA 12.8.1</a>]</li>";
	  setItemsOutline(nia09e_nodes,"orange","nia09e");
	}

	// F. 2 systemes de navigation (plan du site, recherche, menu)
	const nia09f_nav = document.querySelector('nav #headernav, nav#headernav');
	const nia09f_search = document.querySelector('div.topsearch[role="search"]');
	const nia09f_plan = document.querySelector('.page-footernav a[href*="plan"][href$=".html"]');
	const nia09f_nav_btn = document.querySelector('[class^=page-headernav] button.anchor');
	const nia09f_search_btn = document.querySelector('div.topsearch[role="search"] button.anchor');
	
	let nia09f_counter = 0;
	if(nia09f_nav && isItemVisible(nia09f_nav)){nia09f_counter++;}
	else if(nia09f_nav && nia09f_nav_btn && isItemVisible(nia09f_nav_btn)){nia09f_counter++;}
	if(nia09f_search && isItemVisible(nia09f_search)){nia09f_counter++;}
	else if(nia09f_search && nia09f_search_btn && isItemVisible(nia09f_search_btn)){nia09f_counter++;}
	if(nia09f_plan && isItemVisible(nia09f_plan)){nia09f_counter++;}
	if(nia09f_counter < 2){
	  result_nc += "<li>09-F : Le site doit être muni de 2 systèmes de navigation (exception : One-page, etc.) [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-12-1-1' target='_blank'>RGAA 12.1.1</a>]</li>";
	}
	
	// G. Skiplinks
	const nia09g_main = document.querySelector('.skiplinks a[href="#main"]');
	if(nia09g_main == null){
		result_nc += "<li>09-G : Absence de skiplinks pour aller à la zone de contenu principale [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-12-7-1' target='_blank'>RGAA 12.7.1</a>]</li>";
	}
	
	const nia09g2_nodes = document.querySelectorAll('.skiplinks a[href]');
	let nia09g2_flag = false;
	let nia09g2_dest = "";
	if(nia09g2_nodes && nia09g2_nodes.length > 0){
		if(debug_flag) console.log("[nia09g2] Boucle sur les "+nia09g2_nodes.length + " skiplinks détéctés sur cette page");
		for(let i = 0; i < nia09g2_nodes.length; i++){
			nia09g2_dest = document.querySelector(nia09g2_nodes[i].getAttribute("href"))
			if(nia09g2_dest == null){
				if(debug_flag) console.log(nia09g2_nodes[i]);
				nia09g2_flag = true;
			}
		}
	}
	if(nia09g2_flag == true){
	  result_dev += "<li>09-G : Un skiplinks n'est pas correctement lié à sa destination [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-12-7-1' target='_blank'>RGAA 12.7.1</a>]</li>";
	}


/* 🗸 NIA-10 Old tag : Mise en avant de la présence d’attributs obsolètes. Vérifier qu'il n'y a pas de balise ou d’attribut obsolète dans le contenu (Fréquent lors de refonte ou de copier/coller)*/

	/* A. Old tag
	<acronym>	Defines an acronym
	<applet>	Defines an applet
	<basefont>	Defines an base font for the page.
	<big>	Defines big text
	<center>	Defines centered text
	<dir>	Defines a directory list
	<font>	Defines text font, size, and color
	<frame>	Defines a frame
	<frameset>	Defines a set of frames
	<isindex>	Defines a single-line input field
	<noframes>	Defines a noframe section
	<s>	Defines strikethrough text
	<strike>	Defines strikethrough text
	<tt>	Defines teletype text
	<u> 	Defines underlined text
	
	Add du RGAA 10.1.1 
	<blink>
	<marquee>
	<s>
	*/

	// A. Old tag NC
	const nia10a_nodes = document.querySelectorAll('acronym,applet,basefont,big,center,dir,font,frame,frameset,isindex,noframes,s,strike,tt,u,blink,marquee,s'); // NC
	if(nia10a_nodes && nia10a_nodes.length > 0 && isItemsVisible(nia10a_nodes)){
	  result_nc += "<li><a href='#' data-destination='nia10a' class='result-focus'>10-A</a> : Présence de balise HTML obsolètes ou servant à la présentation de l'information [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-10-1-1' target='_blank'>RGAA 10.1.1</a>]</li>";
	  setItemsOutline(nia10a_nodes,"red","nia10a");
	}
	
	// B. Old tag Nice-to-have
	const nia10b_nodes = document.querySelectorAll('i,b'); // NtH
	if(nia10b_nodes && nia10b_nodes.length > 0 && isItemsVisible(nia10b_nodes)){
	  result_nc += "<li><a href='#' data-destination='nia10b' class='result-focus'>10-B</a> : Présence de balises 'i' ou 'b', voir pour les remplacer par 'em' et 'strong' lorsque nécessaire</li>";
	  setItemsOutline(nia10b_nodes,"orange","nia10b");
	}

	/* B. Old attribut
	rev	link, a
	charset	link and a
	shape	a
	coords	a
	longdesc	img and iframe.
	target	link
	nohref	area
	profile	head
	version	html
	name	img
	scheme	meta
	archive	object
	classid	object
	codebase	object
	codetype	object
	declare	object
	standby	object
	valuetype	param
	type	param
	axis	td and t
	abbr	td and t
	scope	td
	align	caption, iframe, img, input, object, legend, table, hr, div, h1, h2, h3, h4, h5, h6, p, col, colgroup, tbody, td, tfoot, th, thead and tr.
	alink	body
	link	body
	vlink	body
	text	body
	background	body
	bgcolor	table, tr, td, th and body.
	border	table and object.
	cellpadding	table
	cellspacing	table
	char	col, colgroup, tbody, td, tfoot, th, thead and tr.
	charoff	col, colgroup, tbody, td, tfoot, th, thead and tr.
	clear	br
	compact	dl, menu, ol and ul.
	frame	table
	compact	dl, menu, ol and ul.
	frame	table
	frameborder	iframe
	hspace	img and object.
	vspace	img and object.
	marginheight	iframe
	marginwidth	iframe
	noshade	hr
	nowrap	td and th
	rules	table
	scrolling	iframe
	size	hr
	type	li, ol and ul.
	valign	col, colgroup, tbody, td, tfoot, th, thead and tr
	width	hr, table, td, th, col, colgroup and pre.
	*/

	// C. Old attribut
	const nia10c_nodes = document.querySelectorAll('link[rev], a[rev],link[charset], a[charset],a[shape],a[coords],img[longdesc], iframe[longdesc],link[target],area[nohref],head[profile],html[version],img[name],meta[scheme],object[archive],object[classid],object[codebase],object[codetype],object[declare],object[standby],param[valuetype],param[type],td[axis],t[axis],td[abbr], t[abbr],td[scope],caption[align], iframe[align], img[align], input[align], object[align], legend[align], table[align], hr[align], div[align], h1[align], h2[align], h3[align], h4[align], h5[align], h6[align], p[align], col[align], colgroup[align], tbody[align], td[align], tfoot[align], th[align], thead[align], tr[align],body[alink],body[link],body[vlink],body[text],body[background],table[bgcolor], tr[bgcolor], td[bgcolor], th[bgcolor], body[bgcolor],table[border], object[border],table[cellpadding],table[cellspacing],col[char], colgroup[char], tbody[char], td[char], tfoot[char], th[char], thead[char],tr[char],col[charoff], colgroup[charoff], tbody[charoff], td[charoff], tfoot[charoff], th[charoff], thead[charoff], tr[charoff],br[clear],dl[compact], menu[compact], ol[compact], ul[compact],table[frame],iframe[frameborder],img[hspace], object[hspace],img[vspace], object[vspace],iframe[marginheight],iframe[marginwidth],hr[noshade],td[nowrap], th[nowrap],table[rules],iframe[scrolling],hr[size],li[type], ol[type], ul[type],col[valign], colgroup[valign], tbody[valign], td[valign], tfoot[valign], th[valign], thead[valign], tr[valign],hr[width], table[width], td[width], th[width], col[width], colgroup[width], pre[width]'); // NC
	if(nia10c_nodes && nia10c_nodes.length > 0 && isItemsVisible(nia10c_nodes)){
	  result_nc += "<li><a href='#' data-destination='nia10c' class='result-focus'>10-C</a> : Présence d'attributs HTML obsoletes</li>";
	  setItemsOutline(nia10c_nodes,"red","nia10c");
	}
	
	// D. Presentation attribut
	const nia10d_nodes = document.querySelectorAll('[align], [alink], [background], [bgcolor], [border], [cellpadding], [cellspacing], [char], [charoff], [clear], [color], [compact], [frameborder], [hspace], [link], [marginheight], [marginwidth], [text], [valign], [vlink], [vspace], [size]:not(select), *:not(symbol) > *:not(g) > [width]:not(img):not(object):not(embed):not(canvas):not(svg),*:not(symbol) > *:not(g) > [height]:not(img):not(object):not(embed):not(canvas):not(svg)'); 
	if(nia10d_nodes && nia10d_nodes.length > 0 && isItemsVisible(nia10d_nodes)){
	  result_nc += "<li><a href='#' data-destination='nia10d' class='result-focus'>10-D</a> : Présence d'attributs HTML servant à la présentation de l'information [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-10-1-2' target='_blank'>RGAA 10.1.2</a>]</li>";
	  setItemsOutline(nia10d_nodes,"red","nia10d");
	}


/* 11. Chgt de langue - Langue : Vérifier que le contenu rédigé dans une langue étrangère possède un attribut « lang » pertinent
*/

  // A. Absence de lang
  	const nia11a_nodes = document.querySelectorAll('html:not([lang])');
	if(nia11a_nodes && nia11a_nodes.length > 0 && isItemsVisible(nia11a_nodes)){
	  result_dev += "<li><a href='#' data-destination='nia11a' class='result-focus'>11-A</a> : Aucune langue défini par défaut sur la page [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-8-3-1' target='_blank'>RGAA 8.3.1</a>]</li>";
	  setItemsOutline(nia11a_nodes,"red","nia11a");
	}
	
	
  // B. Presence de lorem ipsum */
	const nia11b_nodes = document.querySelectorAll('.cmp-text');
	let nia11b_flag = false;
	if(nia11b_nodes && nia11b_nodes.length > 0){
		if(debug_flag) console.log("[nia11b] Boucle sur les "+nia11b_nodes.length + " textes détéctés sur cette page");
		for(let i = 0; i < nia11b_nodes.length; i++){
			if(nia11b_nodes[i].textContent.includes('Lorem ipsum')){
				setItemOutline(nia11b_nodes[i],"orange","nia11b");
				nia11b_flag = true;
			}
		}
	}
	if(nia11b_flag == true) {
	  result_nth += "<li><a href='#' data-destination='nia11b' class='result-focus'>11-B</a> : Présence de Lorem ipsum sur la page</li>";
	}

/* 12. Boutons
Intitulé des boutons : Pour les boutons pour ouvrir la recherche, lancer la recherche, ouvrir les filtres et ouvrir le menu :
o	L'attribut « aria-label » doit être identique à l'attribut title
o	L'attribut « title » doit reprendre à minimum le contenu textuel de celui-ci 

*/

	/* A&B. Recherche */
	const nia12a1_nodes = document.querySelectorAll('.topsearch:not([role="search"])');
	const nia12a2_nodes = document.querySelectorAll('html[lang="fr"] .topsearch:not([aria-label="Globale"])');
	if((nia12a1_nodes && nia12a1_nodes.length > 0 && isItemsVisible(nia12a1_nodes)) || (nia12a2_nodes && nia12a2_nodes.length > 0 && isItemsVisible(nia12a2_nodes))){
	  result_dev += "<li><a href='#' data-destination='nia12a' class='result-focus'>12-A</a> : Absence de certaines propriétés sur le champ de recherche (role=search et aria-label=Globale)</li>";
	  setItemsOutline(nia12a1_nodes,"red","nia12a");
	  setItemsOutline(nia12a2_nodes,"red","nia12a");
	}

	const nia12b1_nodes = document.querySelectorAll('html[lang="fr"] #topsearch > #search-field-top:not([title^="Rechercher"])');
	const nia12b2_nodes = document.querySelectorAll('html[lang="fr"] #topsearch > #search-field-top:not([placeholder^="Rechercher"])');
	const nia12b3_nodes = document.querySelectorAll('html[lang="fr"] #topsearch > button:not([title^="Rechercher"])');
	if((nia12b1_nodes && nia12b1_nodes.length > 0 && isItemsVisible(nia12b1_nodes)) || (nia12b2_nodes && nia12b2_nodes.length > 0 && isItemsVisible(nia12b2_nodes)) || (nia12b3_nodes && nia12b3_nodes.length > 0 && isItemsVisible(nia12b3_nodes))){
	  result_nc += "<li><a href='#' data-destination='nia12b' class='result-focus'>12-B</a> : Problème dans les intitulés du champ de recherche (title et placeholder)</li>";
	  setItemsOutline(nia12b1_nodes,"red","nia12b");
	  setItemsOutline(nia12b2_nodes,"orange","nia12b");
	  setItemsOutline(nia12b3_nodes,"red","nia12b");
	}

	/* C. Anchor */
	const nia12c_nodes = document.querySelectorAll('.topsearch button:not(.anchor-close), button.anchor[data-destination^="#headernav"]:not(.anchor-close), button.anchor[data-destination^="#filters"]:not(.anchor-close), button.anchor[data-destination^="#bloub"]:not(.anchor-close)');
	let nia12c_title = "", nia12c_content = "", nia12c_lang = "";
	let nia12c1_flag = false,nia12c2_flag = false,nia12c3_flag = false;
	if(nia12c_nodes && nia12c_nodes.length > 0){
		if(debug_flag) console.log("[nia12c] Boucle sur les " + nia12c_nodes.length + " buttons anchor détéctés sur cette page");
		if(nia12c_nodes && nia12c_nodes.length > 0 ){
			for(let i = 0; i < nia12c_nodes.length; i++){
				nia12c_lang = nia12c_nodes[i].closest('[lang]').getAttribute('lang');
				if(nia12c_nodes[i].hasAttribute("title")) nia12c_title = sanitizeText(nia12c_nodes[i].getAttribute("title"),nia12c_lang);
				if(nia12c_nodes[i].hasAttribute("aria-label")) nia12c_label = sanitizeText(nia12c_nodes[i].getAttribute("aria-label"),nia12c_lang);
				nia12c_content = sanitizeText(nia12c_nodes[i].innerText,nia12c_lang);
				if(nia12c_nodes[i].hasAttribute("title") && !nia12c_title.includes(nia12c_content)){
					if(debug_flag) console.log("%cERROR","font-weight:700;color:darkred","["+nia12c_title+"] VS ["+nia12c_content+"] ");
					setItemOutline(nia12c_nodes[i],"red","nia12c1");
					nia12c1_flag = true;
				}
				if(nia12c_nodes[i].hasAttribute("title") && nia12c_nodes[i].hasAttribute("aria-label") && nia12c_label != nia12c_title){
					setItemOutline(nia12c_nodes[i],"red","nia12c2");
					nia12c2_flag = true;
				}
				if(nia12c_nodes[i].hasAttribute("title") && !nia12c_nodes[i].hasAttribute("aria-label") && nia12c_title != nia12c_content){
					setItemOutline(nia12c_nodes[i],"orange","nia12c3");
					nia12c3_flag = true;
				}
			}
		}
	}
	if(nia12c1_flag == true) {
	  result_nc += "<li><a href='#' data-destination='nia12c1' class='result-focus'>12-C</a> : L'attribut title d'un bouton du site ne reprend pas son contenu textuel</li>";
	}
	if(nia12c2_flag == true) {
	  result_nc += "<li><a href='#' data-destination='nia12c2' class='result-focus'>12-C</a> : L'attribut title d'un bouton du site n'est pas identique à son aria-label </li>";
	}
	if(nia12c3_flag == true) {
	  result_dev += "<li><a href='#' data-destination='nia12c3' class='result-focus'>12-C</a> : L'attribut title d'un bouton du site, différent de son contenu textuel, n'est pas completé par un attribut aria-label </li>";
	}
	
	/* D. Button */
	const nia12d_nodes = document.querySelectorAll('button[role=button]');
	if(nia12d_nodes && nia12d_nodes.length > 0 && isItemsVisible(nia12d_nodes)){
	  result_nth += "<li><a href='#' data-destination='nia12d' class='result-focus'>12-D</a> : Il n'est pas nécessaire d'ajouter un role button sur un éléments boutons</li>";
	  setItemsOutline(nia12d_nodes,"yellow","nia12d");
	}


/* 13. Animation Lottie */

	// A. Max duration = 5s si autoplay / Pas de loop
	const nia13a_nodes = document.querySelectorAll('lottie-player');
	let nia13a_autoplay, nia13a_totalFrames,nia13a_frameRate, nia13a_loop, nia13a_counter, nia13a_controls, nia13a_duration;
	if(nia13a_nodes && nia13a_nodes.length > 0){
		if(debug_flag) console.log("[nia13a] Boucle sur les " + nia13a_nodes.length + " animations Lottie détéctés sur cette page");
		if(nia13a_nodes && nia13a_nodes.length > 0 ){
			for(let i = 0; i < nia13a_nodes.length; i++){
				nia13a_autoplay = nia13a_nodes[i].renderOptions.host.__autoplay;
				nia13a_totalFrames = nia13a_nodes[i].renderOptions.host._lottie.totalFrames;
				nia13a_frameRate = nia13a_nodes[i].renderOptions.host._lottie.frameRate;
				nia13a_loop = nia13a_nodes[i].renderOptions.host.__loop;
				nia13a_counter = nia13a_nodes[i].renderOptions.host._counter;
				nia13a_controls = nia13a_nodes[i].renderOptions.host.__controls;
				if(debug_flag) console.log("autoplay : "+nia13a_autoplay + " | controls : "+nia13a_controls);
				if(nia13a_autoplay == true && nia13a_controls == false){
					if(nia13a_loop == true){
						result_nc += "<li><a href='#' data-destination='nia13a1' class='result-focus'>13-A</a> : Les animations lues automatiquement et qui boucles doivent avoir un controleur play/pause [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-13-8-1' target='_blank'>RGAA 13.8.1</a>]</li>";
						setItemOutline(nia13a_nodes[i],"red","nia13a1");
					}
					else {
						nia13a_duration = nia13a_totalFrames / nia13a_frameRate * nia13a_counter; // 150 / 30 * 1 = 5 
						if(debug_flag)  console.log("duration : "+nia13a_duration +" s");
						if (nia13a_duration > 5){
							result_nc += "<li><a href='#' data-destination='nia13a2' class='result-focus'>13-A</a> : Les animations lues automatiquement et qui durent plus de 5s doivent avoir un controleur play/pause [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-13-8-1' target='_blank'>RGAA 13.8.1</a>]</li>";
							setItemOutline(nia13a_nodes[i],"red","nia13a2");
						}
					}
				}
			}
		}
	}

/* 14. Couleur */

	// --> test 10.5.1 color / bg/ degradé
	// --> test 10.6.1 lien visible par rapport au texte environnemt
	// --> test 10.7.1 prise de focus visible
	


/*- -------------------------------------------------------------------------------- */
// END
let result_global = "";
if (result_crit != ""){result_crit = "<h2>Points critiques</h2><ul>"+result_crit+"</ul>";}
if (result_nc != ""){result_nc = "<h2>Points non-conforme</h2><ul>"+result_nc+"</ul>";}
if (result_nth != ""){result_nth = "<h2>Nice-to-have</h2><ul>"+result_nth+"</ul>";}
if (result_dev != ""){result_dev = "<h2>Problèmes dev</h2><ul>"+result_dev+"</ul>";}
if (result_crit == "" && result_nc == "" && result_nth == "" && result_dev == "" ){
  result_global = "Pas de points remontés !"; 
}
else { result_global = result_crit + result_nc + result_nth + result_dev;}

// Fonction color error
function setItemsOutline(items,color,classname){
	if(debug_flag) console.log("["+classname+"] Problème detecté sur "+items.length+" éléments");
	let item;
	for(let i = 0; i < items.length; i++){
		setItemOutline(items[i],color,classname);
	}
}

function setItemOutline(item,color,classname){
	if(debug_flag) console.log(item);
	if(color == "red"){ item.setAttribute("style","outline: 3px solid red !important");}
	else {item.style.outline = "3px solid "+color;}
	item.style.outlineOffset = "5px";
	item.classList.add(classname);
}

// Fonction is visible : La liste d'item contient au moins un element visible
function isItemsVisible(items){
	for(let i = 0; i < items.length; i++){
		if(isItemVisible(items[i])) return true;
	}
	return false
}

function isItemVisible(item){
	const lang = item.closest('[lang]').getAttribute('lang');
	// textContent : recup les elements cachés et les <script><style>
	// innerText : ne recupère pas les élements cachés
	if(item.innerText && sanitizeText(item.textContent,lang) == sanitizeText(item.innerText,lang)) return true;
	const style = window.getComputedStyle(item);
	if(style.width !== "0" && style.height !== "0" && style.opacity !== "0" && style.display!=='none' && style.visibility!== 'hidden' && (item.offsetParent || item.offsetWidth || item.offsetHeight)) return true;
	return false
}

// Fonction Sanitize Text = No extra space, trimmed 
function sanitizeText(txt, locale) {
	return txt.toLowerCase().toLocaleLowerCase(locale).replaceAll(/\n|\r/g, ' ').replaceAll(/[.:;,?!{}$()|'"-]/g, ' ').replaceAll(/\s+/g, ' ').trim();
}

// Create the dialog Modal
let NIAmodalA11Y = document.createElement('div');
NIAmodalA11Y.setAttribute("id", "NIAmodalA11Y");
NIAmodalA11Y.innerHTML = '<div class="modal-header"><h1>A11Y Review</h1></div><div class="modal-body">'+result_global+'<hr><details class="cmp-accordion"><summary class="cmp-accordion__summary"><h2 class="cmp-accordion__header">Tests automatiques <svg class="icon" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-filter" x="0" y="0"></use></svg></h2></summary><div class="cmp-accordion__panel"><ul><li>W3C : <a href="https://validator.w3.org/nu/?doc='+encodeURIComponent(currentUrl)+'" target="_blank">lien</a></li><li>WAVE : <a href="https://wave.webaim.org/report#/'+encodeURIComponent(currentUrl)+'" target="_blank">lien</a></li><li>Lighthouse : <a href="https://pagespeed.web.dev/analysis?url='+encodeURIComponent(currentUrl)+'" target="_blank">lien</a></li></ul></div></details></div>';

/*<h2>Tests automatiques</h2><ul><li>W3C : <a href="https://validator.w3.org/nu/?doc='+encodeURIComponent(currentUrl)+'" target="_blank">lien</a></li><li>WAVE : <a href="https://wave.webaim.org/report#/'+encodeURIComponent(currentUrl)+'" target="_blank">lien</a></li><li>Lighthouse : <a href="https://pagespeed.web.dev/analysis?url='+encodeURIComponent(currentUrl)+'" target="_blank">lien</a></li></ul></div>';*/
document.body.appendChild(NIAmodalA11Y);

let NIAmodalA11Ybtn = document.createElement('button');
NIAmodalA11Ybtn.setAttribute("id", "NIAmodalA11Ybtn");
NIAmodalA11Ybtn.textContent = 'A11Y';
document.body.appendChild(NIAmodalA11Ybtn);
NIAmodalA11Ybtn.addEventListener('click', () => {openNIAmodalA11Y();});

// Fonction Focus on Element
const result_focus = document.querySelectorAll('.result-focus');
if(debug_flag) console.log("[result] Boucle sur les "+result_focus.length + " points relevés sur cette page");
let targetElement, targetElementOffset;
for(let i = 0; i < result_focus.length; i++){
  result_focus[i].addEventListener('click', (e) => {
    e.preventDefault();
	targetElement = document.querySelector("."+result_focus[i].getAttribute('data-destination'));
	if(targetElement){
		targetElementOffset = targetElement.getBoundingClientRect().top - document.body.getBoundingClientRect().top
		window.scroll({ top: targetElementOffset, left: 0, behavior: 'smooth' });
		targetElement.style.outlineWidth = "10px";
		setTimeout(() => {targetElement.style.outlineWidth = "3px";}, 3000);
	}
	else{
		alert("Element non visible : ."+result_focus[i].getAttribute('data-destination'));
	}
  });
}

// Fonction open modal 
function openNIAmodalA11Y(){
	modal.open(NIAmodalA11Y, { allowDrag: true })
}

setTimeout(() => {openNIAmodalA11Y()}, 500);