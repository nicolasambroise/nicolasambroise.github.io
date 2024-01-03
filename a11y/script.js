// Debug
debug_flag = true; // true -> affiche les logs

// Add JS & CSS files for custom dialog modal 
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

/* 🗸 NIA-01 AEM Component : vérifie les points concernant la configuration des composants AEM suivant :  Intitulé de bouton menu,  Breadcrumb, Tooltip, Menu langue, Recherche
o	Todo : Ajouter du JS pour prendre en compte le menu et les dp modale
*/

	// A. Position de bouton menu
	const nia01a_nodes = document.querySelectorAll('button.anchor[data-destination^="#headernav"]:not(.anchor-close)');
	let nia01a_flag = false;
	if(nia01a_nodes && nia01a_nodes.length > 0){
		if(debug_flag) console.log("[nia01a] Boucle sur les "+nia01a_nodes.length + " ancres detectés sur cette page");
		for(let i = 0; i < nia01a_nodes.length; i++){
			if(nia01a_nodes[i].parentElement.tagName != 'NAV' && nia01a_nodes[i].parentElement.parentElement.tagName != 'NAV'){
				setItemOutline(nia01a_nodes[i],"red","nia01a");
				nia01a_flag = true;
			}
		}
	}
	if(nia01a_flag == true) {
	  result_dev += "<li><a href='#' data-destination='nia01a' class='result-focus'>01-A</a> : Présence du bouton d'ouverture du menu en dehors de la balise nav</li>";
	}

	// B. Breadcrumb
	const nia01b_query = document.querySelectorAll('nav[id^=breadcrumb-] .cmp-breadcrumb__list > .cmp-breadcrumb__item:not([aria-current="page"]):last-child');
	if(nia01b_query && nia01b_query.length > 0 && isItemsVisible(nia01b_query)){
	  result_dev += "<li><a href='#' data-destination='nia01b' class='result-focus'>01-B</a> : Absence de l'attribut aria-current sur le dernier item du fils d'ariane</li>";
	  setItemsOutline(nia01b_query,"red","nia01b");
	}

	// C. Tooltip
	const nia01c_query = document.querySelectorAll('.search-view');
	if(nia01c_query && nia01c_query.length > 0 && isItemsVisible(nia01c_query)){
	  result_nc += "<li><a href='#' data-destination='nia01c' class='result-focus'>01-C</a> : Présence de tooltip non accessible sur les résultats de recherches</li>";
	  setItemsOutline(nia01c_query,"red","nia01c");
	}

	// D. Menu langue
	const nia01d_query = document.querySelectorAll('nav[id^="language-"]:not([aria-label])');
	if(nia01d_query && nia01d_query.length > 0 && isItemsVisible(nia01d_query)){
	  result_nc += "<li><a href='#' data-destination='nia01d' class='result-focus'>01-D</a> : Absence de l'aria-label sur le menu de selection de langue (à ajouter dans le cqdialog)</li>";
	  setItemsOutline(nia01d_query,"red","nia01d");
	}


/* 🗸 Thématique RGAA 1 : 02 Images

Vérification de plusieurs points concernant les images : 
o	Présence d’un attribut alt sur toutes les images 
o	Vérification des attributs des svg, 
o	Alt vide sur les images de search logique. 
o	Absence de copyright/caption/légende sur une image Core V3,
o	Images v1 légendés presence du aria-label sur le figure */

	// A. Présence d’un attribut alt sur toutes les images 
	const nia02a1_query = document.querySelectorAll('img:not([alt]):not([src^="//cdn.public.lu/guichet-lu/pictures/maps/"]):not([aria-label]):not([aria-labelledby]):not([title]), [role="image"]:not([aria-label]):not([aria-labelledby])');
	if(nia02a1_query && nia02a1_query.length > 0 && isItemsVisible(nia02a1_query)){
	  result_nc += "<li><a href='#' data-destination='nia02a1' class='result-focus'>02-A</a> : Présence de " + nia02a_query.length + " images sans alternative textuelle [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-1-1-1' target='_blank'>RGAA 1.1.1</a>]</li>";
	  setItemsOutline(nia02a1_query,"red","nia02a1");
	}
	
	const nia02a2_query = document.querySelectorAll('img:not([alt]):not([src^="//cdn.public.lu/guichet-lu/pictures/maps/"])');
	if(nia02a2_query && nia02a2_query.length > 0 && isItemsVisible(nia02a2_query)){
	  result_nth += "<li><a href='#' data-destination='nia02a2' class='result-focus'>02-A</a> : Présence de " + nia02a_query.length + " images sans attribut alt</li>";
	  setItemsOutline(nia02a2_query,"yellow","nia02a2");
	}

	// B. Vérification des attributs des svg, 
	const nia02b1_query = document.querySelectorAll('svg:not([aria-hidden="true"]):not(.iconset)'); 
	const nia02b2_query = document.querySelectorAll('svg:not([focusable="false"]):not(.iconset)');
	if(nia02b1_query && nia02b1_query.length > 0 && isItemsVisible(nia02b1_query)){
	  result_nc += "<li><a href='#' data-destination='nia02b1' class='result-focus'>02-B</a> : Absence de certains attributs sur des SVG (aria-hidden=true)</li>";
	  setItemsOutline(nia02b1_query,"red","nia02b1");
	}
	if(nia02b2_query && nia02b2_query.length > 0 && isItemsVisible(nia02b2_query)){
	  result_nth += "<li><a href='#' data-destination='nia02b2' class='result-focus'>02-B</a> : Absence de certains attributs sur des SVG (focusable=false)</li>";
	  setItemsOutline(nia02b2_query,"orange","nia02b2");
	}
	
	const nia02b3_query = document.querySelectorAll('svg[role="img"]:not([title]):not([aria-labelledby]):not([aria-label])');
	if(nia02b3_query && nia02b3_query.length > 0 && isItemsVisible(nia02b3_query)){
	  result_nc += "<li><a href='#' data-destination='nia02b3' class='result-focus'>02-B</a> : Les images vectorielle porteuse d'information doivent posséder une alternative textuelle [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-1-1-5' target='_blank'>RGAA 1.1.5</a>]</li>";
	  setItemsOutline(nia02b3_query,"red","nia02b3");
	}
	
	const nia02b4_query = document.querySelectorAll('svg[aria-hidden="true"][aria-label], svg[aria-hidden="true"][aria-labelledby]');
	if(nia02b4_query && nia02b4_query.length > 0 && isItemsVisible(nia02b4_query)){
	  result_nc += "<li><a href='#' data-destination='nia02b4' class='result-focus'>02-B</a> : Les images vectorielle de décoration ne doivent pas posséder une alternative textuelle [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-1-2-4' target='_blank'>RGAA 1.2.4</a>]</li>";
	  setItemsOutline(nia02b4_query,"red","nia02b4");
	}
	
	// --> Todo : ajouter le test 1.2.4 sur la présence de balise <title> ou <desc> dans les SVG
	
	// C. Alt vide sur les images de search logique. 
	const nia02c_query = document.querySelectorAll('.cmp-focus img:not([alt=""])');
	if(nia02c_query && nia02c_query.length > 0 && isItemsVisible(nia02c_query)){
	  result_dev += "<li><a href='#' data-destination='nia02c' class='result-focus'>02-C</a> : Présence de " + nia02a_query.length + " image de search-logic sans attribut alt</li>";
	  setItemsOutline(nia02c_query,"red","nia02c");
	}

	// D. Absence de copyright/caption/légende sur une image Core V3
	const nia02d_query = document.querySelectorAll('.cmp-image[data-cmp-hook-image="imageV3"] .cmp-image__title');
	if(nia02d_query && nia02d_query.length > 0 && isItemsVisible(nia02d_query)){
	  result_dev += "<li><a href='#' data-destination='nia02d' class='result-focus'>02-D</a> : Présence d'un caption non lié à son image (image v3)</li>";
	  setItemsOutline(nia02d_query,"red","nia02d");
	}
	
	// E. Images v1 légendés presence du aria-label sur le figure
	const nia02e_query = document.querySelectorAll('figure[data-cmp-hook-image="figure"] figcaption');
	if(nia02e_query && nia02e_query.length > 0 && isItemsVisible(nia02e_query)){
	  result_dev += "<li><a href='#' data-destination='nia02e' class='result-focus'>02-E</a> : Les captions des images ne sont pas correctement restitué (image v1)</li>";
	  setItemsOutline(nia02e_query,"red","nia02e");
	}
	
	// F. Vérification sur les images atypique
	const nia02f1_query = document.querySelectorAll('area:not([aria-label]):not([alt])');
	if(nia02f1_query && nia02f1_query.length > 0 && isItemsVisible(nia02f1_query)){
	  result_dev += "<li><a href='#' data-destination='nia02f1' class='result-focus'>02-F</a> : Les zones d'image réactive porteuse d'information doivent avoir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-1-1-2' target='_blank'>RGAA 1.1.2</a>]</li>";
	  setItemsOutline(nia02f1_query,"red","nia02f1");
	}
	
	const nia02f2_query = document.querySelectorAll('input[type="image"]:not([alt]):not([aria-label]):not([aria-labelledby]):not([title])');
	if(nia02f2_query && nia02f2_query.length > 0 && isItemsVisible(nia02f2_query)){
	  result_dev += "<li><a href='#' data-destination='nia02f2' class='result-focus'>02-F</a> : Les boutons de type image (balise input avec attribut type=image doivent avoir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-1-1-3' target='_blank'>RGAA 1.1.3</a>]</li>";
	  setItemsOutline(nia02f2_query,"red","nia02f2");
	}
	
	const nia02f3_query = document.querySelectorAll('object[type^="image/"]:not([role="img"]):not([aria-label]):not([aria-labelledby]):not([title])');
	if(nia02f3_query && nia02f3_query.length > 0 && isItemsVisible(nia02f3_query)){
	  result_nc += "<li><a href='#' data-destination='nia02f3' class='result-focus'>02-F</a> : Les images objects porteuses d'information doivent avoir une alternative textuelle - à vérifier manuellement la présence d'un mécaniseme de remplacement [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-1-1-6' target='_blank'>RGAA 1.1.6</a>]</li>";
	  setItemsOutline(nia02f3_query,"red","nia02f3");
	}

	const nia02f4_query = document.querySelectorAll('embed[type^="image/"]:not([role="img"]):not([aria-label]):not([aria-labelledby]):not([title])');
	if(nia02f4_query && nia02f4_query.length > 0 && isItemsVisible(nia02f4_query)){
	  result_nc += "<li><a href='#' data-destination='nia02f4' class='result-focus'>02-F</a> : Les images embarquée porteuses d'information doivent avoir une alternative textuelle - à vérifier manuellement la présence d'un mécaniseme de remplacement [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-1-1-7' target='_blank'>RGAA 1.1.7</a>]</li>";
	  setItemsOutline(nia02f4_query,"red","nia02f4");
	}

	const nia02f5_query = document.querySelectorAll('canvas[type^="image/"]:not([role="img"]):not([aria-label]):not([aria-labelledby])');
	if(nia02f5_query && nia02f5_query.length > 0 && isItemsVisible(nia02f5_query)){
	  result_nc += "<li><a href='#' data-destination='nia02f5' class='result-focus'>02-F</a> : Les images bitmap (balise canvas) porteuses d'information doivent avoir une alternative textuelle - à vérifier manuellement la présence d'un mécaniseme de remplacement [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-1-1-8' target='_blank'>RGAA 1.1.8</a>]</li>";
	  setItemsOutline(nia02f5_query,"red","nia02f5");
	}
	
	// G. Les images de décoration ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle
	const nia02g1_query = document.querySelectorAll('img:where([alt=""],[aria-hidden="true"],[role="presentation"],[role="none"]):where([aria-label][aria-labelledby][title])');
	if(nia02g1_query && nia02g1_query.length > 0 && isItemsVisible(nia02g1_query)){
	  result_nc += "<li><a href='#' data-destination='nia02g1' class='result-focus'>02-G</a> : Les images de décoration ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-1-2-1' target='_blank'>RGAA 1.2.1</a>] </li>";
	  setItemsOutline(nia02g1_query,"red","nia02g1");
	}
	
	const nia02g2_query = document.querySelectorAll('area:not([href]):where([alt=""],[aria-hidden="true"],[role="presentation"],[role="none"]):where([aria-label],[aria-labelledby],[title])');
	if(nia02g2_query && nia02g2_query.length > 0 && isItemsVisible(nia02g2_query)){
	  result_nc += "<li><a href='#' data-destination='nia02g2' class='result-focus'>02-G</a> : Les zone non cliquable de décoration ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-1-2-2' target='_blank'>RGAA 1.2.2</a>] </li>";
	  setItemsOutline(nia02g2_query,"red","nia02g2");
	}
	
	const nia02g3_query = document.querySelectorAll('object[type^="image/"][aria-hidden="true"]:where([aria-label],[aria-labelledby],[title])');
	if(nia02g3_query && nia02g3_query.length > 0 && isItemsVisible(nia02g3_query)){
	  result_nc += "<li><a href='#' data-destination='nia02g3' class='result-focus'>02-G</a> : Les images object de décoration ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-1-2-3' target='_blank'>RGAA 1.2.3</a>] </li>";
	  setItemsOutline(nia02g3_query,"red","nia02g3");
	}
	
	// --> Todo : il manque la condition dépourvu de contenu pour le test 1.2.3
	
	const nia02g4_query = document.querySelectorAll('canvas[aria-hidden="true"]:where([aria-label],[aria-labelledby],[title])');
	if(nia02g4_query && nia02g4_query.length > 0 && isItemsVisible(nia02g4_query)){
	  result_nc += "<li><a href='#' data-destination='nia02g4' class='result-focus'>02-G</a> : Les images bitmap de décoration ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-1-2-5' target='_blank'>RGAA 1.2.5</a>] </li>";
	  setItemsOutline(nia02g4_query,"red","nia02g4");
	}
	
	// --> Todo : il manque la condition dépourvu de contenu pour le test 1.2.5
	
	const nia02g5_query = document.querySelectorAll('embed[type^="image/"][aria-hidden="true"]:where([aria-label],[aria-labelledby],[title])');
	if(nia02g5_query && nia02g5_query.length > 0 && isItemsVisible(nia02g5_query)){
	  result_nc += "<li><a href='#' data-destination='nia02g4' class='result-focus'>02-G</a> : Les images embarquées de décoration ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-1-2-6' target='_blank'>RGAA 1.2.6</a>] </li>";
	  setItemsOutline(nia02g5_query,"red","nia02g5");
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
				else if(sanitizeText(nia02h_label[0].text(),nia02h_lang).length > 150){
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
	
	
	
/* 🗸 NIA-03 LinkTitle : Liste des liens internes et externe, affichage des attributs title des liens et vérification d’erreurs courantes.
o	Todo : Ajouter du JS pour voir si le contenu textuel est bien compris dans l’attribut title du lien */

	// A. Verification de la présence du suffix sur les liens externe
	const nia03a1_query = document.querySelectorAll('html[lang="fr"] a[target="_blank"]:not([title$="Nouvelle fenêtre"]):not(.mapboxgl-ctrl-logo)');
	const nia03a2_query = document.querySelectorAll('html[lang="fr"] a[title$="Nouvelle fenêtre"]:not([target="_blank"])');
	if((nia03a1_query && nia03a1_query.length > 0 && isItemsVisible(nia03a1_query)) || (nia03a2_query && nia03a2_query.length > 0 && isItemsVisible(nia03a2_query))){
	  result_dev += "<li><a href='#' data-destination='nia03a' class='result-focus'>03-A</a> : Vérifier la présence de suffixe sur les liens externes</li>";
	  if(nia03a1_query && nia03a1_query.length > 0 && isItemsVisible(nia03a1_query)) setItemsOutline(nia03a1_query,"red","nia03a");
	  if(nia03a2_query && nia03a2_query.length > 0 && isItemsVisible(nia03a2_query)) setItemsOutline(nia03a2_query,"red","nia03a");
	}

	// B. Verification de titre vide
	const nia03b_query = document.querySelectorAll('a[title=" "],a[title="Nouvelle fenêtre"],a[title="- Nouvelle fenêtre"],a[title$="Nouvelle fenêtre - Nouvelle fenêtre"]');
	if(nia03b_query && nia03b_query.length > 0 && isItemsVisible(nia03b_query)){
	  result_nc += "<li><a href='#' data-destination='nia03b' class='result-focus'>03-B</a> : Vérifier qu'il n'y a pas de lien avec </li>";
	  setItemsOutline(nia03b_query,"red","nia03b");
	}

	// C. Probleme de lang
	const nia03c_query = document.querySelectorAll('html:not([lang="fr"]) a[title$="Nouvelle fenêtre"]');
	if(nia03c_query && nia03c_query.length > 0 && isItemsVisible(nia03c_query)){
	  result_nc += "<li><a href='#' data-destination='nia03c' class='result-focus'>03-C</a> : Présence du suffixe Nouvelle fenêtre sur une page non rédiger en français</li>";
	  setItemsOutline(nia03c_query,"orange","nia03c");
	}
	
	// D. Absence de copyright/caption/légende sur une image Core V3
	const nia03d_query = document.querySelectorAll('a[aria-label][aria-labelledby]');
	if(nia03d_query && nia03d_query.length > 0 && isItemsVisible(nia03d_query)){
	  result_nc += "<li><a href='#' data-destination='nia03d' class='result-focus'>03-D</a> : Présence d'un conflit dans les attributs des liens</li>";
	  setItemsOutline(nia03d_query,"red","nia03d");
	}

	// E. Vérifier que le title reprend à minimum le contenu textuel
	const nia03e_nodes = document.querySelectorAll("a[title]");
	let nia03e_flag = false;
	let nia03e_results = [];
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
	  result_nc += "<li><a href='#' data-destination='nia03e' class='result-focus'>03-E</a> : Présence de liens dont l'attribut title ne reprend pas le contenu textuel</li>";
	}

/* 🗸 NIA-04 Autocomplete : Mise en avant des champs de formulaire avec un attribut autocomplete et vérification de la présence des attributs autocomplete pertinent sur les champs de formulaire classique */

if(currentUrl.includes("contact.html")){

	// A. Champ générique 
	const nia04a1_query = document.querySelectorAll('input[name="name"]:not([autocomplete="family-name"]), input[name="lastname"]:not([autocomplete="family-name"])');
	if(nia04a1_query && nia04a1_query.length > 0){
	  result_nc += "<li><a href='#' data-destination='nia04a1' class='result-focus'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (name)</li>";
	  setItemsOutline(nia04a1_query,"red","nia04a1");
	}
	
	const nia04a2_query = document.querySelectorAll('input[name="firstname"]:not([autocomplete="given-name"])');
	if(nia04a2_query && nia04a2_query.length > 0){
	  result_nc += "<li><a href='#' data-destination='nia04a2' class='result-focus'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (firstname)</li>";
	  setItemsOutline(nia04a2_query,"red","nia04a2");
	}
	const nia04a3_query = document.querySelectorAll('input[type="email"]:not([autocomplete="email"])');
	if(nia04a3_query && nia04a3_query.length > 0){
	  result_nc += "<li><a href='#' data-destination='nia04a3' class='result-focus'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (email)</li>";
	  setItemsOutline(nia04a3_query,"red","nia04a3");
	}
	const nia04a4_query = document.querySelectorAll('input[type="tel"]:not([autocomplete="tel"]), input[name="phone"]:not([autocomplete="tel"])');
	if(nia04a4_query && nia04a4_query.length > 0){
	  result_nc += "<li><a href='#' data-destination='nia04a4' class='result-focus'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (phone)</li>";
	  setItemsOutline(nia04a4_query,"red","nia04a4");
	}
	const nia04a5_query = document.querySelectorAll('input[name="postal"]:not([autocomplete="postal-code"]),input[type="postal-code"]:not([autocomplete="postal-code"])');
	if(nia04a5_query && nia04a5_query.length > 0){
	  result_nc += "<li><a href='#' data-destination='nia04a5' class='result-focus'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (postal)</li>";
	  setItemsOutline(nia04a5_query,"red","nia04a5");
	}
	const nia04a6_query = document.querySelectorAll('input[name="country"]:not([autocomplete="country-name"]), select[name="country"]:not([autocomplete="country"])');
	if(nia04a6_query && nia04a6_query.length > 0){
	  result_nc += "<li><a href='#' data-destination='nia04a6' class='result-focus'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (country)</li>";
	  setItemsOutline(nia04a6_query,"red","nia04a6");
	}
	const nia04a7_query = document.querySelectorAll('input[name="matricule"][autocomplete]');
	if(nia04a7_query && nia04a7_query.length > 0 ){
	  result_nc += "<li><a href='#' data-destination='nia04a7' class='result-focus'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (matricule)</li>";
	  setItemsOutline(nia04a7_query,"red","nia04a7");
	}
	const nia04a8_query = document.querySelectorAll('input[name="city"]:not([autocomplete="address-level2"]), input[name="ville"]:not([autocomplete="address-level2"])');
	if(nia04a8_query && nia04a8_query.length > 0){
	  result_nc += "<li><a href='#' data-destination='nia04a8' class='result-focus'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (ville)</li>";
	  setItemsOutline(nia04a8_query,"red","nia04a8");
	}
	const nia04a9_query = document.querySelectorAll('input[name="adresse"]:not([autocomplete="street-address"]), input[name="street"]:not([autocomplete="street-address"])');
	if(nia04a9_query && nia04a9_query.length > 0 ){
	  result_nc += "<li><a href='#' data-destination='nia04a9' class='result-focus'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (adresse)</li>";
	  setItemsOutline(nia04a9_query,"red","nia04a9");
	}
	const nia04a10_query = document.querySelectorAll('input[name="organisation"]:not([autocomplete="organization"]), input[name="organization"]:not([autocomplete="organization"])');
	if(nia04a10_query && nia04a10_query.length > 0 ){
	  result_nc += "<li><a href='#' data-destination='nia04a10' class='result-focus'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (organisation)</li>";
	  setItemsOutline(nia04a10_query,"red","nia04a10");
	}
	const nia04a11_query = document.querySelectorAll('input[name="fonction"]:not([autocomplete="organization-title"]), input[name="function"]:not([autocomplete="organization-title"])');
	if(nia04a11_query && nia04a11_query.length > 0 ){
	  result_nc += "<li><a href='#' data-destination='nia04a11' class='result-focus'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (function)</li>";
	  setItemsOutline(nia04a11_query,"red","nia04a11");
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
	  result_nc += "<li><a href='#' data-destination='nia04b' class='result-focus'>04-B</a> : Présence de champs email sans exemple de format</li>";
	}
}

	// C. Vérifier si les champs ont bien un label
	const nia04c_nodes = document.querySelectorAll("input:not([aria-label]):not([aria-labelledby]):not([type='hidden']):not([type='submit']):not([type='reset']):not([type='button']), select:not([aria-label]):not([aria-labelledby]), textarea:not([aria-label]):not([aria-labelledby])");
	let nia04c_flag = false;
	let nia04c_label = "", nia04c_id = "";
	if(nia04c_nodes && nia04c_nodes.length > 0){
		if(debug_flag) console.log("[nia04c] Boucle sur les "+nia04c_nodes.length + " champs detectés sur cette page");
		for(let i = 0; i < nia04c_nodes.length; i++){
			nia04c_id = nia04c_nodes[i].getAttribute("id");
			if(!nia04c_id || nia04c_id == ""){
				setItemOutline(nia04c_nodes[i],"red","nia04c");
				nia04c_flag = true;
			}
			else{
				nia04c_label = document.querySelectorAll("label[for='"+nia04c_id+"']");
				if(!nia04c_label || nia04c_label.length != 1){
					setItemOutline(nia04c_nodes[i],"red","nia04c");
					nia04c_flag = true;
				}
			}
		}
	}
	if(nia04c_flag == true) {
	  result_nc += "<li><a href='#' data-destination='nia04c' class='result-focus'>04-C</a> : Présence de champs sans ou avec plus d'un label</li>";
	}


/* 🗸 NIA-05 Empty : Mise en avant des balises et paragraphes vides
o	Todo : Ajouter du JS pour détecter également les $nbsp; */

	// A. Bloc vide
	//const nia05a_nodes = document.querySelectorAll('body *:not(.ol-attribution) > *:not(:where(div, br, hr, img, svg, use, path, circle, rect, i, time[datetime], iframe, canvas, script, td, input, textarea, select, option, [aria-hidden="true"], source, meta, .mapboxgl-ctrl-logo)):empty');
	const nia05a_nodes = document.querySelectorAll('*:not(.ol-attribution) > :where(p, span, td, th, strong, em, a, q, blockquote):not([aria-hidden="true"]):not(.mapboxgl-ctrl-logo):empty');
	let nia05a_container = "";
	if(nia05a_nodes && nia05a_nodes.length > 0 && isItemsVisible(nia05a_nodes)){
	  result_nc += "<li><a href='#' data-destination='nia05b' class='result-focus'>05-A : Présence de balise vide</li>";
	  for(let i = 0; i < nia05a_nodes.length; i++){
			if(isItemVisible(nia05a_nodes[i])){
				setItemOutline(nia05a_nodes[i],"red","nia05a");
				nia05a_container = nia05a_nodes[i].parentElement;
				nia05a_container.style.outline = "3px dotted red";
				nia05a_container.style.outlineOffset = "-2px";
			}
		}
	}

	//const nia05b_nodes = document.querySelectorAll('body *:not(.ol-attribution) > *:not(:where(div, br, hr, img, svg, use, path, circle, rect, i, time[datetime], iframe, canvas, script, td, input, textarea, select, option, [aria-hidden="true"], source, meta, .mapboxgl-ctrl-logo))');
	const nia05b_nodes = document.querySelectorAll('*:not(.ol-attribution) > :where(p, span, td, th, strong, em, a, q, blockquote):not([aria-hidden="true"]):not(.mapboxgl-ctrl-logo):not(:empty)');
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
	  result_nc += "<li><a href='#' data-destination='nia05b' class='result-focus'>05-B</a> : Présence de balise vide (avec contenu assimilable à vide) </li>";
	}

/* 🗸 NIA-06 List : Mise en avant des listes */

	// Vérifier qu'il n'y a pas de role sur les container de liste
	const nia06a_query = document.querySelectorAll('ul[role],ol[role],li[role],dl[role]');
	if(nia06a_query && nia06a_query.length > 0 && isItemsVisible(nia06a_query)){
	  result_dev += "<li><a href='#' data-destination='nia06a' class='result-focus'>06-A</a> : Vérifier qu'il n'y a pas de role sur les container de liste</li>";
	  setItemsOutline(nia06a_query,"red","nia06a");
	}

/* 🗸 NIA-07 Title : Mise en avant des titres (<Hn> et ceux qui ont les roles=heading). 
o Vérification de la présence de titres simulés - S’assurer que les titres sont bien balisés avec des balises <Hn> et pas seulement avec du gras.
o S’assurer que les titres sont dans le bon ordre*/

	// A. Heading avec role
	const nia07a_query = document.querySelectorAll('h1[role]:not([role="heading"]),h2[role]:not([role="heading"]),h3[role]:not([role="heading"]),h4[role]:not([role="heading"]),h5[role]:not([role="heading"]),h6[role]:not([role="heading"])');
	if(nia07a_query && nia07a_query.length > 0 && isItemsVisible(nia07a_query)){
	  result_nc += "<li><a href='#' data-destination='nia07a' class='result-focus'>07-A</a> : Présence de titre avec un attribut role</li>";
	  setItemsOutline(nia07a_query,"red","nia07a");
	}

	// B. Aria-level sans heading
	const nia07b_query = document.querySelectorAll('[aria-level]:not(h1):not(h2):not(h3):not(h4):not(h5):not(h6):not([role="heading"])');
	if(nia07b_query && nia07b_query.length > 0 && isItemsVisible(nia07b_query)){
	  result_nc += "<li><a href='#' data-destination='nia07b' class='result-focus'>07-B</a> : Présence d'attribut aria-level en dehors de titre</li>";
	  setItemsOutline(nia07b_query,"red","nia07b");
	}
	
	// C. Heading caché au outil d'assistance 
	const nia07c_query = document.querySelectorAll('h1[aria-hidden],h2[aria-hidden],h3[aria-hidden],h4[aria-hidden],h5[aria-hidden],h6[aria-hidden]');
	if(nia07c_query && nia07c_query.length > 0 && isItemsVisible(nia07c_query)){
	  result_nc += "<li><a href='#' data-destination='nia07c' class='result-focus'>07-C</a> : Présence de titre caché au outil d'assistance </li>";
	  setItemsOutline(nia07c_query,"red","nia07c");
	}

	// D. Heading simulé
	const nia07d_query = document.querySelectorAll('b,p:not(.cmp-form__mandatory-text) > strong:first-child ,span > strong:first-child ,div > strong:first-child , *:not(.accordionItem) > *:not(figcaption):not(.article-summary):not(.article-metas):not(.search-metas):not(.cmp-grid__textContainer):not(.feed-item-content):not(.meta-themes):not(.description):not(.meta-published-update) > p:not(.cmp-lastupdate):not(.cmp-form__mandatory-text):not(.at):not(.feed-item-author):not(.orejime-Notice-description):first-child');
	if(nia07d_query && nia07d_query.length > 0 && isItemsVisible(nia07d_query)){
	  result_nth += "<li><a href='#' data-destination='nia07d' class='result-focus'>07-D</a> : Présence de texte ressemblant à des titres n'étant pas balisé comme tel</li>";
	  setItemsOutline(nia07d_query,"yellow","nia07d");
	}
	
	// E. Ordre Heading
	const nia07e_nodes = document.querySelectorAll(':where(h1,h2,h3,h4,h5,h6,[role="heading"]):not([aria-hidden])');
	let nia07e_flag = false;
	let nia07e_current_level = 0, nia07e_previous_level = 0;
	if(nia07e_nodes && nia07e_nodes.length > 0){
		if(debug_flag) console.log("[nia07e] Boucle sur les " + nia07e_nodes.length + " titres détéctés sur cette page");
		for(let i = 0; i < nia07e_nodes.length; i++){
			if(isItemVisible(nia07e_nodes[i])){
				if(nia07e_nodes[i].tagName == 'H1' || (nia07e_nodes[i].hasAttribute('aria-level') && nia07e_nodes[i].hasAttribute('role') && nia07e_nodes[i].attr('aria-level').value == "1" && nia07e_nodes[i].attr('role').value == "heading")) {nia07e_current_level = 1;}
				else if(nia07e_nodes[i].tagName == 'H3' || (nia07e_nodes[i].hasAttribute('aria-level') && nia07e_nodes[i].hasAttribute('role') && nia07e_nodes[i].attr('aria-level').value == "3" && nia07e_nodes[i].attr('role').value == "heading")) {nia07e_current_level = 3;}
				else if(nia07e_nodes[i].tagName == 'H4' || (nia07e_nodes[i].hasAttribute('aria-level') && nia07e_nodes[i].hasAttribute('role') && nia07e_nodes[i].attr('aria-level').value == "4" && nia07e_nodes[i].attr('role').value == "heading")) {nia07e_current_level = 4;}
				else if(nia07e_nodes[i].tagName == 'H5' || (nia07e_nodes[i].hasAttribute('aria-level') && nia07e_nodes[i].hasAttribute('role') && nia07e_nodes[i].attr('aria-level').value == "5" && nia07e_nodes[i].attr('role').value == "heading")) {nia07e_current_level = 5;}
				else if(nia07e_nodes[i].tagName == 'H6' || (nia07e_nodes[i].hasAttribute('aria-level') && nia07e_nodes[i].hasAttribute('role') && nia07e_nodes[i].attr('aria-level').value == "6" && nia07e_nodes[i].attr('role').value == "heading")) {nia07e_current_level = 6;}
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
	  result_nth += "<li><a href='#' data-destination='nia07e' class='result-focus'>07-E</a> : Présence de sauts de titres </li>";
	}

/* 🗸 NIA-08 Table : Mise en avant des tableaux et vérification présence des bons attributs sur les tableaux. S’assurer que les tableaux sont bien créé avec le composant Tableau et pas un copier/coller de word. Vérifier en particulier les balises et les attributs « scope »
*/

	// A. Attribut de tableau
	const nia08a_query = document.querySelectorAll(':where([role="table"],table) th:not([scope="row"]):not([scope="col"])');
	if(nia08a_query && nia08a_query.length > 0 && isItemsVisible(nia08a_query)){
	  result_nc += "<li><a href='#' data-destination='nia08a' class='result-focus'>08-A</a> : Absence de l'attribut scope sur les en-tete de tableau</li>";
	  setItemsOutline(nia08a_query,"red","nia08a");
	}
	
	// B. Attribut deprecated
	const nia08b_query = document.querySelectorAll(':where([role="table"],table):where([align],[bgcolor],[border],[frame],[cellpadding],[cellspacing],[width],[summary],[rules])');
	if(nia08b_query && nia08b_query.length > 0 && isItemsVisible(nia08b_query)){
	  result_nc += "<li><a href='#' data-destination='nia08b' class='result-focus'>08-B</a> : Presence d'attribut obsolete sur un tableau</li>";
	  setItemsOutline(nia08b_query,"red","nia08b");
	}

	// C. Attribut deprecated
	const nia08c_query = document.querySelectorAll('th[header], td[header]');
	if(nia08c_query && nia08c_query.length > 0 && isItemsVisible(nia08c_query)){
	  result_nth += "<li><a href='#' data-destination='nia08c' class='result-focus'>08-C</a> : Presence d'attribut obsolete dans un tableau</li>";
	  setItemsOutline(nia08c_query,"red","nia08c");
	}
	

/* 🗸 NIA-09 Tabindex : Mise en avant des éléments possédant un tabindex défini. Vérifier l'absence d’attribut « tabindex » positif dans le contenu*/

	// A. Presence d'attibut tabindex positif
	const nia09a_query = document.querySelectorAll('[tabindex]:not([tabindex="0"]):not([tabindex="-1"])');
	if(nia09a_query && nia09a_query.length > 0 && isItemsVisible(nia09a_query)){
	  result_nth += "<li><a href='#' data-destination='nia09a' class='result-focus'>09-A</a> : Presence d'attibut tabindex positif</li>";
	  setItemsOutline(nia09a_query,"orange","nia09a");
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
	*/

	// A. Old tag NC
	const nia10a_query = document.querySelectorAll('acronym,applet,basefont,big,center,dir,font,frame,frameset,isindex,noframes,s,strike,tt,u'); // NC
	if(nia10a_query && nia10a_query.length > 0 && isItemsVisible(nia10a_query)){
	  result_nc += "<li><a href='#' data-destination='nia10a' class='result-focus'>10-A</a> : Présence de balise HTML obsolète</li>";
	  setItemsOutline(nia10a_query,"red","nia10a");
	}
	
	// A. Old tag Nice-to-have
	const nia10b_query = document.querySelectorAll('i,b'); // NtH
	if(nia10b_query && nia10b_query.length > 0 && isItemsVisible(nia10b_query)){
	  result_nc += "<li><a href='#' data-destination='nia10b' class='result-focus'>10-B</a> : Présence de balises 'i' ou 'b', voir pour les remplacer par 'em' et 'strong' lorsque nécessaire</li>";
	  setItemsOutline(nia10b_query,"orange","nia10b");
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

	// B. Old attribut
	const nia10c_query = document.querySelectorAll('link[rev], a[rev],link[charset], a[charset],a[shape],a[coords],img[longdesc], iframe[longdesc],link[target],area[nohref],head[profile],html[version],img[name],meta[scheme],object[archive],object[classid],object[codebase],object[codetype],object[declare],object[standby],param[valuetype],param[type],td[axis],t[axis],td[abbr], t[abbr],td[scope],caption[align], iframe[align], img[align], input[align], object[align], legend[align], table[align], hr[align], div[align], h1[align], h2[align], h3[align], h4[align], h5[align], h6[align], p[align], col[align], colgroup[align], tbody[align], td[align], tfoot[align], th[align], thead[align], tr[align],body[alink],body[link],body[vlink],body[text],body[background],table[bgcolor], tr[bgcolor], td[bgcolor], th[bgcolor], body[bgcolor],table[border], object[border],table[cellpadding],table[cellspacing],col[char], colgroup[char], tbody[char], td[char], tfoot[char], th[char], thead[char],tr[char],col[charoff], colgroup[charoff], tbody[charoff], td[charoff], tfoot[charoff], th[charoff], thead[charoff], tr[charoff],br[clear],dl[compact], menu[compact], ol[compact], ul[compact],table[frame],iframe[frameborder],img[hspace], object[hspace],img[vspace], object[vspace],iframe[marginheight],iframe[marginwidth],hr[noshade],td[nowrap], th[nowrap],table[rules],iframe[scrolling],hr[size],li[type], ol[type], ul[type],col[valign], colgroup[valign], tbody[valign], td[valign], tfoot[valign], th[valign], thead[valign], tr[valign],hr[width], table[width], td[width], th[width], col[width], colgroup[width], pre[width]'); // NC
	if(nia10c_query && nia10c_query.length > 0 && isItemsVisible(nia10c_query)){
	  result_nc += "<li><a href='#' data-destination='nia10c' class='result-focus'>10-C</a> : Présence d'attribut HTML obsolete</li>";
	  setItemsOutline(nia10c_query,"red","nia10c");
	}

/* 11. Chgt de langue - Langue : Vérifier que le contenu rédigé dans une langue étrangère possède un attribut « lang » pertinent
*/

  // A. Absence de lang
  	const nia11a_query = document.querySelectorAll('html:not([lang])');
	if(nia11a_query && nia11a_query.length > 0 && isItemsVisible(nia11a_query)){
	  result_dev += "<li><a href='#' data-destination='nia11a' class='result-focus'>11-A</a> : Aucune langue défini par défaut sur la page</li>";
	  setItemsOutline(nia11a_query,"red","nia11a");
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
	  result_nth += "<li><a href='#' data-destination='nia11b' class='result-focus'>14-A</a> : Présence de Lorem ipsum sur la page</li>";
	}

/* 12. Intitulé des boutons : Pour les boutons pour ouvrir la recherche, lancer la recherche, ouvrir les filtres et ouvrir le menu :
o	L'attribut « aria-label » doit être identique à l'attribut title
o	L'attribut « title » doit reprendre à minimum le contenu textuel de celui-ci 

*/

	/* A&B. Recherche */
	const nia12a1_query = document.querySelectorAll('.topsearch:not([role="search"])');
	const nia12a2_query = document.querySelectorAll('html[lang="fr"] .topsearch:not([aria-label="Globale"])');
	if((nia12a1_query && nia12a1_query.length > 0 && isItemsVisible(nia12a1_query)) || (nia12a2_query && nia12a2_query.length > 0 && isItemsVisible(nia12a2_query))){
	  result_dev += "<li><a href='#' data-destination='nia12a' class='result-focus'>12-A</a> : Absence de certaines propriétés sur le champ de recherche (role=search et aria-label=Globale)</li>";
	  setItemsOutline(nia12a1_query,"red","nia12a");
	  setItemsOutline(nia12a2_query,"red","nia12a");
	}

	const nia12b1_query = document.querySelectorAll('html[lang="fr"] #topsearch > #search-field-top:not([title^="Rechercher"])');
	const nia12b2_query = document.querySelectorAll('html[lang="fr"] #topsearch > #search-field-top:not([placeholder^="Rechercher"])');
	const nia12b3_query = document.querySelectorAll('html[lang="fr"] #topsearch > button:not([title^="Rechercher"])');
	if((nia12b1_query && nia12b1_query.length > 0 && isItemsVisible(nia12b1_query)) || (nia12b2_query && nia12b2_query.length > 0 && isItemsVisible(nia12b2_query)) || (nia12b3_query && nia12b3_query.length > 0 && isItemsVisible(nia12b3_query))){
	  result_nc += "<li><a href='#' data-destination='nia12b' class='result-focus'>12-B</a> : Problème dans les intitulés du champ de recherche (title et placeholder)</li>";
	  setItemsOutline(nia12b1_query,"red","nia12b");
	  setItemsOutline(nia12b2_query,"orange","nia12b");
	  setItemsOutline(nia12b3_query,"red","nia12b");
	}

	/* C. Anchor */
	const nia12c_nodes = document.querySelectorAll('.topsearch button:not(.anchor-close), button.anchor[data-destination^="#headernav"]:not(.anchor-close), button.anchor[data-destination^="#filters"]:not(.anchor-close), button.anchor[data-destination^="#bloub"]:not(.anchor-close)');
	let nia12c_title = "", nia12c_content = "", nia12c_lang = "";
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
					result_nc += "<li><a href='#' data-destination='nia12c1' class='result-focus'>12-C</a> : L'attribut title d'un bouton du site ne reprend pas son contenu textuel</li>";
				}
				if(nia12c_nodes[i].hasAttribute("title") && nia12c_nodes[i].hasAttribute("aria-label") && nia12c_label != nia12c_title){
					setItemOutline(nia12c_nodes[i],"red","nia12c2");
					result_nc += "<li><a href='#' data-destination='nia12c2' class='result-focus'>12-C</a> : L'attribut title d'un bouton du site n'est pas identique à son aria-label </li>";
				}
				if(nia12c_nodes[i].hasAttribute("title") && !nia12c_nodes[i].hasAttribute("aria-label") && nia12c_title != nia12c_content){
					setItemOutline(nia12c_nodes[i],"orange","nia12c3");
					result_dev += "<li><a href='#' data-destination='nia12c3' class='result-focus'>12-C</a> : L'attribut title d'un bouton du site, différent de son contenu textuel, n'est pas completé par un attribut aria-label </li>";
				}
			}
		}
	}
	
	/* D. Button */
	const nia12d_query = document.querySelectorAll('button[role=button]');
	if(nia12d_query && nia12d_query.length > 0 && isItemsVisible(nia12d_query)){
	  result_nth += "<li><a href='#' data-destination='nia12d' class='result-focus'>12-D</a> : Il n'est pas nécessaire d'ajouter un role button sur un éléments boutons</li>";
	  setItemsOutline(nia12d_query,"yellow","nia12d");
	}


/* 13. Plan du site incomplet */

if(currentUrl.includes("plan-du-site.html") || currentUrl.includes("plan.html")){
	const nia13a_footer = document.querySelectorAll('.page-footernav a[href*="contact"][href$=".html"]');
	const nia13b_footer = document.querySelectorAll('.page-footernav a[href*="accessibilite"][href$=".html"]');
	const nia13c_footer = document.querySelectorAll('.page-footernav a[href*="aspects-legaux"][href$=".html"]');
	const nia13d_footer = document.querySelectorAll('.page-footernav a[href*="a-propos"][href$=".html"]');
	const nia13a_sitemap = document.querySelectorAll('.cmp-sitemap a[href*="contact"][href$=".html"]');
	const nia13b_sitemap = document.querySelectorAll('.cmp-sitemap a[href*="accessibilite"][href$=".html"]');
	const nia13c_sitemap = document.querySelectorAll('.cmp-sitemap a[href*="aspects-legaux"][href$=".html"]');
	const nia13d_sitemap = document.querySelectorAll('.cmp-sitemap a[href*="a-propos"][href$=".html"]');

	if(nia13a_footer && nia13a_sitemap && nia13a_footer.length != nia13a_sitemap.length){
	  result_nc += "<li><a href='#' data-destination='nia13a' class='result-focus'>13-A</a> : Il manque la page contact dans le footer ou dans le plan du site</li>";
	  setItemsOutline(nia13a_footer,"red","nia13a");
	  setItemsOutline(nia13a_sitemap,"red","nia13a");
	}

	if(nia13b_footer && nia13b_sitemap && nia13b_footer.length != nia13b_sitemap.length){
	  result_nc += "<li><a href='#' data-destination='nia13b' class='result-focus'>13-B</a> : Il manque la page Accessibilité dans le footer ou dans le plan du site</li>";
	  setItemsOutline(nia13b_footer,"red","nia13b");
	  setItemsOutline(nia13b_sitemap,"red","nia13b");
	}
	
	if(nia13c_footer && nia13c_sitemap && nia13c_footer.length != nia13c_sitemap.length){
	  result_nc += "<li><a href='#' data-destination='nia13c' class='result-focus'>13-C</a> : Il manque la page aspect légaux dans le footer ou dans le plan du site</li>";
	  setItemsOutline(nia13c_footer,"red","nia13c");
	  setItemsOutline(nia13c_sitemap,"red","nia13c");
	}
	
	if(nia13d_footer && nia13d_sitemap && nia13d_footer.length != nia13d_sitemap.length){
	  result_nc += "<li><a href='#' data-destination='nia13d' class='result-focus'>13-D</a> : Il manque la page A propos dans le footer ou dans le plan du site</li>";
	  setItemsOutline(nia13d_footer,"red","nia13d");
	  setItemsOutline(nia13d_sitemap,"red","nia13d");
	}
}

/* 14. Cadres */

	// A. Cadres avec un titre
	const nia14a_query = document.querySelectorAll('iframe:not([title]),iframe:not([title])');
	if(nia14a_query && nia14a_query.length > 0 && isItemsVisible(nia14a_query)){
	  result_nc += "<li><a href='#' data-destination='nia14a' class='result-focus'>14-A</a> : Chaque cadre doit avoir un titre  [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-2-1-1' target='_blank'>RGAA 2.1.1</a>] </li>";
	  setItemsOutline(nia14a_query,"red","nia14a");
	}
	
/* 15. Animation Lottie */

	// A. Max duration = 5s si autoplay / Pas de loop
	const nia15a_nodes = document.querySelectorAll('lottie-player');
	let nia15a_autoplay, nia15a_totalFrames,nia15a_frameRate, nia15a_loop, nia15a_counter, nia15a_controls, nia15a_duration;
	if(nia15a_nodes && nia15a_nodes.length > 0){
		if(debug_flag) console.log("[nia15a] Boucle sur les " + nia15a_nodes.length + " animations Lottie détéctés sur cette page");
		if(nia15a_nodes && nia15a_nodes.length > 0 ){
			for(let i = 0; i < nia15a_nodes.length; i++){
				nia15a_autoplay = nia15a_nodes[i].renderOptions.host.__autoplay;
				nia15a_totalFrames = nia15a_nodes[i].renderOptions.host._lottie.totalFrames;
				nia15a_frameRate = nia15a_nodes[i].renderOptions.host._lottie.frameRate;
				nia15a_loop = nia15a_nodes[i].renderOptions.host.__loop;
				nia15a_counter = nia15a_nodes[i].renderOptions.host._counter;
				nia15a_controls = nia15a_nodes[i].renderOptions.host.__controls;
				
				console.log("autoplay : "+nia15a_autoplay);
				console.log("controls : "+nia15a_controls);

				if(nia15a_autoplay == true && nia15a_controls == false){
					if(nia15a_loop == true){
						result_nc += "<li><a href='#' data-destination='nia15a1' class='result-focus'>15-A</a> : Les animations lues automatiquement et qui boucles doivent avoir un controleur play/pause [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-13-8-1' target='_blank'>RGAA 13.8.1</a>]</li>";
						setItemOutline(nia15a_nodes[i],"red","nia15a1");
					}
					else {
						nia15a_duration = nia15a_totalFrames / nia15a_frameRate * nia15a_counter; // 150 / 30 * 1 = 5 
						console.log("duration : "+nia15a_duration +" s");
						if (nia15a_duration > 5){
							result_nc += "<li><a href='#' data-destination='nia15a2' class='result-focus'>15-A</a> : Les animations lues automatiquement et qui durent plus de 5s doivent avoir un controleur play/pause [<a href='https://accessibilite.public.lu/fr/rgaa4.1.2/criteres.html#test-13-8-1' target='_blank'>RGAA 13.8.1</a>]</li>";
							setItemOutline(nia15a_nodes[i],"red","nia15a2");
						}
					}
				}
			}
		}
	}

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
	if(color == "red"){ color = "red !important";}
	item.style.outline = "3px solid "+color;
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
	let lang = item.closest('[lang]').getAttribute('lang');
	if(sanitizeText(item.textContent,lang) == sanitizeText(item.innerText,lang)) return true;
	return false
}

// Fonction Sanitize Text = No extra space, trimmed 
function sanitizeText(txt, locale) {
	return txt.toLowerCase().toLocaleLowerCase(locale).replaceAll(/\n|\r/g, ' ').replaceAll(/[.:;,?!{}$()|'"-]/g, ' ').replaceAll(/\s+/g, ' ').trim();
}

// Create the dialog Modal
let NIAmodalA11Y = document.createElement('div');
NIAmodalA11Y.setAttribute("id", "NIAmodalA11Y");
NIAmodalA11Y.innerHTML = '<div class="modal-header"><h1>A11Y Review</h1></div><div class="modal-body">'+result_global+'<hr><h2>Test automatique</h2><ul><li>W3C : <a href="https://validator.w3.org/nu/?doc='+encodeURIComponent(currentUrl)+'" target="_blank">lien</a></li><li>WAVE : <a href="https://wave.webaim.org/report#/'+encodeURIComponent(currentUrl)+'" target="_blank">lien</a></li><li>Lighthouse : <a href="https://pagespeed.web.dev/analysis?url='+encodeURIComponent(currentUrl)+'" target="_blank">lien</a></li></ul></div>';
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
	targetElementOffset = targetElement.getBoundingClientRect().top - document.body.getBoundingClientRect().top
	window.scroll({ top: targetElementOffset, left: 0, behavior: 'smooth' });
	targetElement.style.outlineWidth = "10px";
	setTimeout(() => {targetElement.style.outlineWidth = "3px";}, 3000);
  });
}

// Fonction open modal 
function openNIAmodalA11Y(){
	modal.open(NIAmodalA11Y, { allowDrag: true })
}

setTimeout(() => {openNIAmodalA11Y()}, 500);