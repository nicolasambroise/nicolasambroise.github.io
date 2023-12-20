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
console.log(currentUrl);

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

	// A. Intitulé de bouton menu
	const nia01a_query = document.querySelectorAll(':not(nav) > button.anchor[data-destination^="#headernav"]:not(.anchor-close)');
	if(nia01a_query && nia01a_query.length > 0){
	  result_dev += "<li>01-A : Présence du bouton d'ouverture du menu en dehors de la balise nav</li>";
	  setOutline(nia01a_query,"red","nia01a");
	}

	// B. Breadcrumb
	const nia01b_query = document.querySelectorAll('nav[id^=breadcrumb-] .cmp-breadcrumb__list > .cmp-breadcrumb__item:not([aria-current="page"]):last-child');
	if(nia01b_query && nia01b_query.length > 0){
	  result_dev += "<li>01-B : Absence de l'attribut aria-current sur le dernier item du fils d'ariane</li>";
	  setOutline(nia01b_query,"red","nia01b");
	}

	// C. Tooltip
	const nia01c_query = document.querySelectorAll('.search-view');
	if(nia01c_query && nia01c_query.length > 0){
	  result_nc += "<li>01-C : Présence de tooltip non accessible sur les résultats de recherches</li>";
	  setOutline(nia01c_query,"red","nia01c");
	}

	// D. Menu langue
	const nia01d_query = document.querySelectorAll('nav[id^="language-"]:not([aria-label])');
	if(nia01d_query && nia01d_query.length > 0){
	  result_nc += "<li>01-D : Absence de l'aria-label sur le menu de selection de langue (à ajouter dans le cqdialog)</li>";
	  setOutline(nia01d_query,"red","nia01d");
	}

	/* E. Recherche */
	const nia01e1_query = document.querySelectorAll('html[lang="fr"] .topsearch:not([role="search"])');
	const nia01e2_query = document.querySelectorAll('html[lang="fr"] .topsearch:not([aria-label="Globale"])');
	if((nia01e1_query && nia01e1_query.length > 0) || (nia01e2_query && nia01e2_query.length > 0)){
	  result_dev += "<li>01-E : Absence de certaines propriétés sur le champ de recherche (role=search et aria-label=Globale)</li>";
	  setOutline(nia01e1_query,"red","nia01e1");
	  setOutline(nia01e2_query,"red","nia01e2");
	}

	const nia01e3_query = document.querySelectorAll('html[lang="fr"] #topsearch > #search-field-top:not([title^="Rechercher"])');
	const nia01e4_query = document.querySelectorAll('html[lang="fr"] #topsearch > #search-field-top:not([placeholder^="Rechercher"])');
	const nia01e5_query = document.querySelectorAll('html[lang="fr"] #topsearch > button:not([title^="Rechercher"])');
	if((nia01e3_query && nia01e3_query.length > 0) || (nia01e4_query && nia01e4_query.length > 0) || (nia01e5_query && nia01e5_query.length > 0)){
	  result_nc += "<li>01-E : Problème dans les intitulés du champ de recherche (title et placeholder)</li>";
	  setOutline(nia01e3_query,"red","nia01e3");
	  setOutline(nia01e4_query,"orange","nia01e4");
	  setOutline(nia01e5_query,"red","nia01e5");
	}

/* 🗸 NIA-02 Image : Vérification de plusieurs points concernant les images : 
o	Présence d’un attribut alt sur toutes les images 
o	Vérification des attributs des svg, 
o	Alt vide sur les images de search logique. 
o	Absence de copyright/caption/légende sur une image Core V3,
o	Images v1 légendés presence du aria-label sur le figure */

	// A. Présence d’un attribut alt sur toutes les images 
	const nia02a_query = document.querySelectorAll('img:not([alt]):not([src="//cdn.public.lu/guichet-lu/pictures/maps/icon-parent.png"])');
	if(nia02a_query && nia02a_query.length > 0){
	  result_nc += "<li>02-A : Présence de " + nia02a_query.length + " image sans attribut alt</li>";
	  setOutline(nia02a_query,"red","nia02a");
	}

	// B. Vérification des attributs des svg, 
	const nia02b1_query = document.querySelectorAll('svg:not([aria-hidden="true"]):not(.iconset)'); 
	const nia02b2_query = document.querySelectorAll('svg:not([focusable="false"]):not(.iconset)');
	if(nia02b1_query && nia02b1_query.length > 0){
	  result_nc += "<li>02-B : Absence de certains attributs sur des SVG (aria-hidden=true)</li>";
	  setOutline(nia02b1_query,"red","nia02b1");
	}
	if(nia02b2_query && nia02b2_query.length > 0){
	  result_nth += "<li>02-B : Absence de certains attributs sur des SVG (focusable=false)</li>";
	  setOutline(nia02b2_query,"orange","nia02b2");
	}
	
	// C. Alt vide sur les images de search logique. 
	const nia02c_query = document.querySelectorAll('.cmp-focus img:not([alt=""])');
	if(nia02c_query && nia02c_query.length > 0){
	  result_dev += "<li>02-C : Présence de " + nia02a_query.length + " image de search-logic sans attribut alt</li>";
	  setOutline(nia02c_query,"red","nia02c");
	}

	// D. Absence de copyright/caption/légende sur une image Core V3
	const nia02d_query = document.querySelectorAll('.cmp-image[data-cmp-hook-image="imageV3"] .cmp-image__title');
	if(nia02d_query && nia02d_query.length > 0){
	  result_dev += "<li>02-D : Présence d'un caption non lié à son image (image v3)</li>";
	  setOutline(nia02d_query,"red","nia02d");
	}
	
	// E. Images v1 légendés presence du aria-label sur le figure
	const nia02e_query = document.querySelectorAll('figure[data-cmp-hook-image="figure"] figcaption');
	if(nia02e_query && nia02e_query.length > 0){
	  result_dev += "<li>02-E : Les captions des images ne sont pas correctement restitué (image v1)</li>";
	  setOutline(nia02e_query,"red","nia02e");
	}
	
/* 🗸 NIA-03 LinkTitle : Liste des liens internes et externe, affichage des attributs title des liens et vérification d’erreurs courantes.
o	Todo : Ajouter du JS pour voir si le contenu textuel est bien compris dans l’attribut title du lien */

	// A. Verification de la présence du suffix sur les liens externe
	const nia03a1_query = document.querySelectorAll('html[lang="fr"] a[target="_blank"]:not([title$="Nouvelle fenêtre"]):not(.mapboxgl-ctrl-logo)');
	const nia03a2_query = document.querySelectorAll('html[lang="fr"] a[title$="Nouvelle fenêtre"]:not([target="_blank"])');
	if((nia03a1_query && nia03a1_query.length > 0) || (nia03a2_query && nia03a2_query.length > 0)){
	  result_dev += "<li>03-A : Vérifier la présence de suffixe sur les liens externes</li>";
	  setOutline(nia03a1_query,"red","nia03a1");
	  setOutline(nia03a2_query,"red","nia03a2");
	}

	// B. Verification de titre vide
	const nia03b1_query = document.querySelectorAll('a[title=" "]');
	const nia03b2_query = document.querySelectorAll('a[title="Nouvelle fenêtre"]');
	const nia03b3_query = document.querySelectorAll('a[title="- Nouvelle fenêtre"]');
	const nia03b4_query = document.querySelectorAll('a[title$="Nouvelle fenêtre - Nouvelle fenêtre"]');
	if(nia03b1_query.length > 0 || nia03b2_query.length > 0 || nia03b3_query.length > 0 || nia03b4_query.length > 0 ){
	  result_nc += "<li>03-B : Vérifier qu'il n'y a pas de lien avec </li>";
	  setOutline(nia03b1_query,"red","nia03b1");
	  setOutline(nia03b2_query,"red","nia03b2");
	  setOutline(nia03b3_query,"red","nia03b3");
	  setOutline(nia03b4_query,"red","nia03b4");
	}

	// C. Probleme de lang
	const nia03c_query = document.querySelectorAll('html:not([lang="fr"]) a[title$="Nouvelle fenêtre"]');
	if(nia03c_query && nia03c_query.length > 0){
	  result_nc += "<li>03-C : Présence du suffixe Nouvelle fenêtre sur une page non rédiger en français</li>";
	  setOutline(nia03c_query,"orange","nia03c");
	}
	
	// D. Absence de copyright/caption/légende sur une image Core V3
	const nia03d_query = document.querySelectorAll('a[aria-label][aria-labelledby]');
	if(nia03d_query && nia03d_query.length > 0){
	  result_nc += "<li>03-D : Présence d'un conflit dans les attributs des liens</li>";
	  setOutline(nia03d_query,"red","nia03d");
	}

	// E. Vérifier que le title reprend à minimum le contenu textuel
	const nia03e_nodes = document.querySelectorAll("a[title]");
	let nia03e_flag = false;
	let content = "", title = "";
	console.log(nia03e_nodes.length + " liens detectés sur cette page");
	for(let i = 0; i < nia03e_nodes.length; i++){
		title = nia03e_nodes[i].getAttribute("title").toLowerCase().replace(/\n|\r|-|,|\|/g, "").replace(/  +/g, " ").trim();
		content = nia03e_nodes[i].textContent.toLowerCase().replace(/\n|\r|-|,|\|/g, "").replace(/  +/g, " ").trim();
		if(!title.includes(content)){
			//nia03e_nodes[i].innerHTML = "";
			console.log("["+title+"] contain ["+content+"]");
			setItemOutline(nia03e_nodes[i],"red","nia03e");
			nia03e_flag = true;
		}
	}
	if(nia03e_flag == true) {
	  result_nc += "<li>03-E : Présence de liens dont l'attribut title ne reprend pas le contenu textuel</li>";
	}

/* 🗸 NIA-04 Autocomplete : Mise en avant des champs de formulaire avec un attribut autocomplete et vérification de la présence des attributs autocomplete pertinent sur les champs de formulaire classique */

if(currentUrl.includes("contact.html")){

	// A. Champ générique 
	const nia04a1_query = document.querySelectorAll('input[name="name"]:not([autocomplete="family-name"]), input[name="lastname"]:not([autocomplete="family-name"])');
	if(nia04a1_query && nia04a1_query.length > 0){
	  result_nc += "<li>04-A : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (name)</li>";
	  setOutline(nia04a1_query,"red","nia04a1");
	}
	
	const nia04a2_query = document.querySelectorAll('input[name="firstname"]:not([autocomplete="given-name"])');
	if(nia04a2_query && nia04a2_query.length > 0){
	  result_nc += "<li>04-A : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (firstname)</li>";
	  setOutline(nia04a2_query,"red","nia04a2");
	}
	const nia04a3_query = document.querySelectorAll('input[type="email"]:not([autocomplete="email"])');
	if(nia04a3_query && nia04a3_query.length > 0){
	  result_nc += "<li>04-A : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (email)</li>";
	  setOutline(nia04a3_query,"red","nia04a3");
	}
	const nia04a4_query = document.querySelectorAll('input[type="tel"]:not([autocomplete="tel"]), input[name="phone"]:not([autocomplete="tel"])');
	if(nia04a4_query && nia04a4_query.length > 0){
	  result_nc += "<li>04-A : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (phone)</li>";
	  setOutline(nia04a4_query,"red","nia04a4");
	}
	const nia04a5_query = document.querySelectorAll('input[name="postal"]:not([autocomplete="postal-code"]),input[type="postal-code"]:not([autocomplete="postal-code"])');
	if(nia04a5_query && nia04a5_query.length > 0){
	  result_nc += "<li>04-A : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (postal)</li>";
	  setOutline(nia04a5_query,"red","nia04a5");
	}
	const nia04a6_query = document.querySelectorAll('input[name="country"]:not([autocomplete="country-name"]), select[name="country"]:not([autocomplete="country"])');
	if(nia04a6_query && nia04a6_query.length > 0){
	  result_nc += "<li>04-A : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (country)</li>";
	  setOutline(nia04a6_query,"red","nia04a6");
	}
	const nia04a7_query = document.querySelectorAll('input[name="matricule"][autocomplete]');
	if(nia04a7_query && nia04a7_query.length > 0 ){
	  result_nc += "<li>04-A : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (matricule)</li>";
	  setOutline(nia04a7_query,"red","nia04a7");
	}
	const nia04a8_query = document.querySelectorAll('input[name="city"]:not([autocomplete="address-level2"]), input[name="ville"]:not([autocomplete="address-level2"])');
	if(nia04a8_query && nia04a8_query.length > 0){
	  result_nc += "<li>04-A : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (ville)</li>";
	  setOutline(nia04a8_query,"red","nia04a8");
	}
	const nia04a9_query = document.querySelectorAll('input[name="adresse"]:not([autocomplete="street-address"]), input[name="street"]:not([autocomplete="street-address"])');
	if(nia04a9_query && nia04a9_query.length > 0 ){
	  result_nc += "<li>04-A : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (adresse)</li>";
	  setOutline(nia04a9_query,"red","nia04a9");
	}
	
	
	// B. Vérifier le format sur l'email
	const nia04b_nodes = document.querySelectorAll('input[type="email"]');
	let nia04b_flag = false;
	let id = "", desc = "", label = "", help = "";
	console.log(nia04b_nodes.length + " champs email detectés sur cette page");
	for(let i = 0; i < nia04b_nodes.length; i++){
		id = "", desc = "", label = "", help = "";
		id = nia04b_nodes[i].getAttribute("id");
		desc = nia04b_nodes[i].getAttribute("aria-describedby");
		if(id && id != ""){
			label = document.querySelector("label[for="+id+"]");
			if(!label){
				console.log("label");
				setItemOutline(nia04b_nodes[i],"red","nia04b");
				nia04b_flag = true;
			}
		}
		if(desc && desc != ""){
			help = document.querySelector("[id="+desc+"]");
			if(!help){
				console.log("help");
				setItemOutline(nia04b_nodes[i],"red","nia04b");
				nia04b_flag = true;
			}
		}
		if((label && label != "" && label.innerText.match(/^\S+@\S+\.\S+$/)) || (help && help != "" && help.innerText.match(/^\S+@\S+\.\S+$/))){
			console.log("match "+label);
			setItemOutline(nia04b_nodes[i],"red","nia04b");
			nia04b_flag = true;
		}
	}
	if(nia04b_flag == true) {
	  result_nc += "<li>04-B : Présence de champs email sans exemple de format</li>";
	}
}

	// C. Vérifier si les champs ont bien un label
	const nia04c_nodes = document.querySelectorAll("input:not([aria-label]):not([aria-labelledby]), select:not([aria-label]):not([aria-labelledby]), textarea:not([aria-label]):not([aria-labelledby])");
	let nia04c_flag = false;
	let label = "", id = "";
	console.log(nia04c_nodes.length + " champs detectés sur cette page");
	for(let i = 0; i < nia04c_nodes.length; i++){
		id = nia04c_nodes[i].getAttribute("id");
		if(!id || id == ""){
			setItemOutline(nia04c_nodes[i],"red","nia04c");
			nia04c_flag = true;
		}
		else{
			label = document.querySelectorAll("label[for="+id+"]");
			if(!label || label.length != 1){
				console.log("- label");
				console.log(label);
				console.log(label.length);
				console.log(nia04c_nodes[i]);
				setItemOutline(nia04c_nodes[i],"red","nia04c");
				nia04c_flag = true;
			}
		}
	}
	if(nia04c_flag == true) {
	  result_nc += "<li>04-C : Présence de champs sans ou avec plus d'un label</li>";
	}


/* 🗸 NIA-05 Empty : Mise en avant des balises et paragraphes vides
o	Todo : Ajouter du JS pour détecter également les $nbsp; */

	// A. Bloc vide
	const nia05a_query = document.querySelectorAll('body *:not(.ol-attribution) > *:not(:where(div, br, img, svg, use, path, circle, rect, i, time[datetime], iframe, canvas, script, td, input, textarea, select, option, [aria-hidden="true"], source, meta, .mapboxgl-ctrl-logo)):empty');
	if(nia05a_query && nia05a_query.length > 0){
	  result_nc += "<li>05-A : Présence de balise vide</li>";
	  setOutline(nia05a_query,"red","nia05a");
	}

	const nia05b_nodes = document.querySelectorAll('body *:not(.ol-attribution) > *:not(:where(div, br, img, svg, use, path, circle, rect, i, time[datetime], iframe, canvas, script, td, input, textarea, select, option, [aria-hidden="true"], source, meta, .mapboxgl-ctrl-logo))');
	let nia05b_flag = false;
	let clean_node = "";
	console.log(nia05b_nodes.length + " elements détécté sur cette page");
	for(let i = 0; i < nia05b_nodes.length; i++){
		clean_node = nia05b_nodes[i].innerHTML.replaceAll(/\s/g,'');
		if(clean_node == "" && !nia05b_nodes[i].hasChildNodes()){
			//nodes[i].innerHTML = "";
			console.log(nia05b_nodes[i]);
			console.log(nia05b_nodes[i].parentElement);
			setItemOutline(nia05b_nodes[i],"red","nia05b");
			nia05b_flag = true;
		}
	}
	if(nia05b_flag == true) {
	  result_nc += "<li>05-B : Présence de balise vide (avec contenu assimilable à vide) </li>";
	}

/* 🗸 NIA-06 List : Mise en avant des listes */

	// Vérifier qu'il n'y a pas de role sur les container de liste
	const nia06a_query = document.querySelectorAll('ul[role],ol[role],li[role],dl[role]');
	if(nia06a_query && nia06a_query.length > 0){
	  result_nc += "<li>06-A : Vérifier qu'il n'y a pas de role sur les container de liste</li>";
	  setOutline(nia06a_query,"red","nia06a");
	}

/* 🗸 NIA-07 Title : Mise en avant des titres (<Hn> et ceux qui ont les roles=heading). 
o Vérification de la présence de titres simulés - S’assurer que les titres sont bien balisés avec des balises <Hn> et pas seulement avec du gras.
o S’assurer que les titres sont dans le bon ordre*/

	// A. Heading avec role
	const nia07a_query = document.querySelectorAll('h1[role]:not([role="heading"]),h2[role]:not([role="heading"]),h3[role]:not([role="heading"]),h4[role]:not([role="heading"]),h5[role]:not([role="heading"]),h6[role]:not([role="heading"])');
	if(nia07a_query && nia07a_query.length > 0){
	  result_nc += "<li>07-A : Présence de titre avec un attribut role</li>";
	  setOutline(nia07a_query,"red","nia07a");
	}

	// B. Aria-level sans heading
	const nia07b_query = document.querySelectorAll('[aria-level]:not(h1):not(h2):not(h3):not(h4):not(h5):not(h6):not([role="heading"])');
	if(nia07b_query && nia07b_query.length > 0){
	  result_nc += "<li>07-B : Présence d'attribut aria-level en dehors de titre</li>";
	  setOutline(nia07b_query,"red","nia07b");
	}
	
	// C. Heading caché au outil d'assistance 
	const nia07c_query = document.querySelectorAll('h1[aria-hidden],h2[aria-hidden],h3[aria-hidden],h4[aria-hidden],h5[aria-hidden],h6[aria-hidden]');
	if(nia07c_query && nia07c_query.length > 0){
	  result_nc += "<li>07-C : Présence de titre caché au outil d'assistance </li>";
	  setOutline(nia07c_query,"red","nia07c");
	}

	// D. Heading simulé
	const nia07d_query = document.querySelectorAll('b,p:not(.cmp-form__mandatory-text) > strong,span > strong,div > strong, *:not(figcaption):not(.accordionItem) > *:not(.article-summary):not(.article-metas):not(.search-metas):not(.cmp-grid__textContainer):not(.feed-item-content) > p:not(.cmp-lastupdate):not(.cmp-form__mandatory-text):not(.at):not(.feed-item-author):first-child');
	if(nia07d_query && nia07d_query.length > 0){
	  result_nth += "<li>07-D : Présence de texte resemblant à des titres n'étant pas balisé comme tel</li>";
	  setOutline(nia07d_query,"yellow","nia07d");
	}

/* 🗸 NIA-08 Table : Mise en avant des tableaux et vérification présence des bons attributs sur les tableaux. S’assurer que les tableaux sont bien créé avec le composant Tableau et pas un copier/coller de word. Vérifier en particulier les balises et les attributs « scope »
*/

	// A. Attribut de tableau
	const nia08a_query = document.querySelectorAll(':where([role="table"],table) th:not([scope="row"]):not([scope="col"])');
	if(nia08a_query && nia08a_query.length > 0){
	  result_nc += "<li>08-A : Absence de l'attribut scope sur les en-tete de tableau</li>";
	  setOutline(nia08a_query,"red","nia08a");
	}
	
	// B. Attribut deprecated
	const nia08b_query = document.querySelectorAll(':where([role="table"],table):where([align],[bgcolor],[border],[frame],[cellpadding],[cellspacing],[width],[summary],[rules])');
	if(nia08b_query && nia08b_query.length > 0){
	  result_nc += "<li>08-B : Presence d'attribut obsolete sur un tableau</li>";
	  setOutline(nia08b_query,"red","nia08b");
	}

	// C. Attribut deprecated
	const nia08c_query = document.querySelectorAll('th[header], td[header]');
	if(nia08c_query && nia08c_query.length > 0){
	  result_nth += "<li>08-C : Presence d'attribut obsolete dans un tableau</li>";
	  setOutline(nia08c_query,"red","nia08c");
	}
	

/* 🗸 NIA-09 Tabindex : Mise en avant des éléments possédant un tabindex défini. Vérifier l'absence d’attribut « tabindex » positif dans le contenu*/

	// A. Presence d'attibut tabindex positif
	const nia09a_query = document.querySelectorAll('[tabindex]:not([tabindex="0"]):not([tabindex="-1"])');
	if(nia09a_query && nia09a_query.length > 0){
	  result_nth += "<li>09-A : Presence d'attibut tabindex positif</li>";
	  setOutline(nia09a_query,"orange","nia09a");
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
	if(nia10a_query && nia10a_query.length > 0){
	  result_nc += "<li>10-A : Présence de balise HTML obsolète</li>";
	  setOutline(nia10a_query,"red","nia10a");
	}
	
	// A. Old tag Nice-to-have
	const nia10b_query = document.querySelectorAll('i,b'); // NtH
	if(nia10b_query && nia10b_query.length > 0){
	  result_nc += "<li>10-B : Présence de balises 'i' ou 'b', voir pour les remplacer par 'em' et 'strong' lorsque nécessaire</li>";
	  setOutline(nia10b_query,"orange","nia10b");
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
	if(nia10c_query && nia10c_query.length > 0){
	  result_nc += "<li>10-B : Présence d'attribut HTML obsolete</li>";
	  setOutline(nia10c_query,"red","nia10c");
	}

/* 11. Chgt de langue - Langue : Vérifier que le contenu rédigé dans une langue étrangère possède un attribut « lang » pertinent
*/

  // A. Absence de lang
  	const nia11a_query = document.querySelectorAll('html:not([lang])');
	if(nia11a_query && nia11a_query.length > 0){
	  result_dev += "<li>11-A : Aucune langue défini par défaut sur la page</li>";
	  setOutline(nia11a_query,"red","nia11a");
	}

/* 12. Intitulé des boutons : Pour les boutons pour ouvrir la recherche, lancer la recherche, ouvrir les filtres et ouvrir le menu :
o	L'attribut « aria-label » doit être identique à l'attribut title
o	L'attribut « title » doit reprendre à minimum le contenu textuel de celui-ci 

*/


// Todo


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
	  result_nc += "<li>13-A : Il manque la page contact dans le footer ou dans le plan du site</li>";
	  setOutline(nia13a_footer,"red","nia13a");
	  setOutline(nia13a_sitemap,"red","nia13a");
	}

	if(nia13b_footer && nia13b_sitemap && nia13b_footer.length != nia13b_sitemap.length){
	  result_nc += "<li>13-B : Il manque la page Accessibilité dans le footer ou dans le plan du site</li>";
	  setOutline(nia13b_footer,"red","nia13b");
	  setOutline(nia13b_sitemap,"red","nia13b");
	}
	
	if(nia13c_footer && nia13c_sitemap && nia13c_footer.length != nia13c_sitemap.length){
	  result_nc += "<li>13-C : Il manque la page aspect légaux dans le footer ou dans le plan du site</li>";
	  setOutline(nia13c_footer,"red","nia13c");
	  setOutline(nia13c_sitemap,"red","nia13c");
	}
	
	if(nia13d_footer && nia13d_sitemap && nia13d_footer.length != nia13d_sitemap.length){
	  result_nc += "<li>13-D : Il manque la page A propos dans le footer ou dans le plan du site</li>";
	  setOutline(nia13d_footer,"red","nia13d");
	  setOutline(nia13d_sitemap,"red","nia13d");
	}
}


/* 14. Presence de lorem ipsum */
	
	const nia14a_nodes = document.querySelectorAll('.cmp-text');
	let nia14a_flag = false;
	console.log(nia14a_nodes.length + " textes détéctés sur cette page");
	for(let i = 0; i < nia14a_nodes.length; i++){
		if(nia14a_nodes[i].textContent.includes('Lorem ipsum')){
			setItemOutline(nia14a_nodes[i],"orange","nia14a");
			nia14a_flag = true;
		}
	}
	if(nia14a_flag == true) {
	  result_nth += "<li>14-A : Présence de Lorem ipsum sur la page</li>";
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

// Set error
function setOutline(items,color,classname){
	console.log(items);
	let item;
	for(let i = 0; i < items.length; i++){
		item = items[i];
		console.log(item);
		item.style.outline = "3px solid "+color;
		item.style.outlineOffset = "5px";
	}
}

function setItemOutline(item,color,classname){
	console.log(item);
	item.style.outline = "3px solid "+color;
	item.style.outlineOffset = "5px";
	item.classList.add(classname);
}


// Create the dialog Modal
let NIAmodalA11Y = document.createElement('div');
NIAmodalA11Y.setAttribute("id", "NIAmodalA11Y");
NIAmodalA11Y.innerHTML = '<h1>A11Y Review</h1>'+result_global+'<hr><h2>Test automatique</h2><ul><li>W3C : <a href="https://validator.w3.org/nu/?doc='+encodeURIComponent(currentUrl)+'" target="_blank">lien</a></li><li>WAVE : <a href="https://wave.webaim.org/report#/'+encodeURIComponent(currentUrl)+'" target="_blank">lien</a></li><li>Lighthouse : <a href="https://pagespeed.web.dev/analysis?url='+encodeURIComponent(currentUrl)+'" target="_blank">lien</a></li></ul>';
document.body.appendChild(NIAmodalA11Y);

setTimeout(() => {
  modal.open(NIAmodalA11Y, { allowDrag: true })
}, 500);