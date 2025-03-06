/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-06 Structure de l'information - Thématique RAWeb 9 
- Landmark
- List : Mise en avant des listes */

function check_part_06(){
	if(debug_flag) console.log("06 Structure");

	// A. Vérifier qu'il n'y a pas de role sur les container de listes
	if(!only_redactor){
		const nia06a_nodes = document.querySelectorAll('ul[role]:not([role="list"]):not([role="listbox"]),ol[role]:not([role="list"]):not([role="tablist"]),li[role]:not([role="listitem"]):not([role="option"]),dl[role]:not([role="listitem"])');
		let nia06a_flag = false;
		if(nia06a_nodes && nia06a_nodes.length > 0){
			for(let i = 0; i < nia06a_nodes.length; i++){
				if(isItemVisible(nia06a_nodes[i])){
					// Exception sur la structure des onglet <li role="tab"> https://stackoverflow.com/questions/75955536/what-will-the-role-of-anchor-tag-in-tabs-with-ul-li-structure
					if(!(nia06a_nodes[i].tagName == "LI" && nia06a_nodes[i].getAttribute("role") == "tab" && nia06a_nodes[i].parentElement.getAttribute("role") == "tablist" && (nia06a_nodes[i].parentElement.tagName == "UL" || nia06a_nodes[i].parentElement.tagName == "OL") && ((nia06a_nodes[i].getAttribute("tabindex") == "0" && nia06a_nodes[i].getAttribute("aria-selected") == "true") || (nia06a_nodes[i].getAttribute("tabindex") == "-1" && nia06a_nodes[i].getAttribute("aria-selected") != "true")))){
						setItemOutline(nia06a_nodes[i],"red","nia06a","06-A");
						nia06a_flag = true;
					}
				}
			}
		}
		if(nia06a_flag == true){
			setItemToResultList("dev","<li><a href='#' data-destination='nia06a' class='result-focus label-yellow'>06-A</a> : Vérifier qu'il n'y a pas de role sur les container de liste [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-3-1' target='_blank'>RAWeb 9.3.1</a>]</li>");
		}
	}
	
	// B. Vérifier que le liste <ul> et <ol> ne contienne que des <li> ou [role="listitem"]
	const nia06b_nodes = document.querySelectorAll(':where(ul,ol,[role="list"]) > *:not(li):not([role="listitem"]):not(.checkA11YSpan)');
	if(nia06b_nodes && nia06b_nodes.length > 0){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia06b' class='result-focus label-red'>06-B</a> : Présence d'un élement non autorisé dans une liste [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-3-1' target='_blank'>RAWeb 9.3.1</a>]</li>");
	  setItemsOutline(nia06b_nodes,"red","nia06b","06-B");
	}
	
	// C. Vérifier que la zone d’en-tête est structurée au moyen d’un élément <header> ;
	// <header class="page-header" role="banner">
	if(!only_redactor){
		const nia06c_nodes = document.querySelector('header:not([role="banner"])');
		if(nia06c_nodes != null && nia06c_nodes.length > 0){
			setItemToResultList("dev","<li><span class='result-focus label-yellow'>06-C</span> : Il y a un problème avec la structuration du header, il lui manque le role=banner [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]</li>");
		}
		
		const nia06c2_nodes = document.querySelector('header[role="banner"]');
		let nia06c2_counter = 0;
		if(nia06c2_nodes == null || nia06c2_nodes.length == 0){
			setItemToResultList("dev","<li><span class='result-focus label-red'>06-C</span> : Il n'y a aucun element header visible [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]</li>");
		}
		else if(nia06c2_nodes.length > 1){
			// il peut y en avoir plusieurs mais 1 seul doit être visible
			for(let i = 0; i < nia06c2_nodes.length; i++){
				if(isItemVisible(nia06c2_nodes[i])){
					nia06c2_counter++;
				}
				if(nia06c2_counter > 1){
					setItemToResultList("dev","<li><span class='result-focus label-red'>06-C</span> : Il y a un plusieur elements header visible [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]</li>");
					setItemsOutline(nia06c2_nodes,"red","nia06c2","06-C");
					break;
				}
			}
		}
		
		const nia06c3_nodes = document.querySelector('main header[role="banner"]');
		if(nia06c3_nodes != null && nia06c3_nodes.length > 0){
			setItemToResultList("dev","<li><span class='result-focus label-red'>06-C</span> : Il y a un problème avec la structuration du header, celui-ci ne dois pas être enfant de la balise main [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]</li>");
			setItemsOutline(nia06c3_nodes,"red","nia06c3","06-C");
		}		
	}
	
	// D. Vérifier que les zones de navigation principales et secondaires sont structurées au moyen d’un élément <nav> ;
	// <nav class="page-headernav" role="navigation" aria-label="Menu principal" id="headernav">
	if(!only_redactor){
		const nia06d_nodes = document.querySelectorAll('nav.page-headernav[role="navigation"]');
		if(nia06d_nodes == null){
			setItemToResultList("dev","<li><span class='result-focus label-yellow'>06-D</span> : Il y a un problème avec la structuration de la navigation [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]</li>");
		}
	}
	
	// E. Vérifier que l’élément <nav> n’est pas utilisé en dehors de la structuration des zones de navigation principales et secondaires ;
	if(!only_redactor){
		const nia06e1_nodes = document.querySelectorAll('nav:not([role="navigation"])');
		if(nia06e1_nodes && nia06e1_nodes.length > 0 && isItemsVisible(nia06e1_nodes)){
		  setItemToResultList("nc","<li><a href='#' data-destination='nia06e1' class='result-focus label-red'>06-E</a> : Présence d'une zone de navigation sans attribut role</li>");
		  setItemsOutline(nia06e1_nodes,"red","nia06e1","06-E");
		}
	}
	
	
	// Les principales barres de navigation (critère 12.2) sont :
	// - Un menu de navigation ;
	// - Un fil d’ariane ;
	// - Une liste de navigation d’une liste de résultats ;
	// - Des liens d’évitement.
	
	// Il existe différents types de menu de navigation (critère 12.1 et critère 12.2) :
	// - Menu de navigation principal ;
	// - Menu de sous-rubrique ;
	// - Menu contextuel ;
	// - Table des matières concernant un ensemble de pages.
	
	

	if(!only_redactor){
		const nia06e2_nodes = document.querySelectorAll('*:not(.page-langs):not(.right-part):not(.cmp-directory) > nav:not(.page-headernav):not(.page-headernavmobile):not(.page-headernav-desk):not(.automaticnav):not(.cmp-breadcrumb):not(.page-localnav):not(.cmp-backtonav):not(.cmp-breadcrumb-demarches):not(.topnav):not(.page-bloub):not(#headernav):not(.headernav-detached):not(.headernav):not(.headernav-fixed)');
		if(nia06e2_nodes && nia06e2_nodes.length > 0&& isItemsVisible(nia06e2_nodes)){
		  setItemToResultList("nc","<li><a href='#' data-destination='nia06e2' class='result-focus label-red'>06-E</a> : Présence d'une balise nav utilisé en dehors d'une zone de navigation [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]</li>");
		  setItemsOutline(nia06e2_nodes,"red","nia06e2","06-E");
		}
	}
	
	// F. Vérifier que la zone de contenu principal est structurée au moyen d’un élément <main> ;
	// Si le document possède plusieurs éléments <main>, vérifier qu’un seul de ces éléments est visible (les autres occurrences de l’élément sont pourvues d’un attribut hidden) ;
	// <main id="main" class="page-main " role="main">
	if(!only_redactor){
		const nia06f1_nodes = document.querySelectorAll('main:not([role="main"])');
		if(nia06f1_nodes && nia06f1_nodes.length > 0 && isItemsVisible(nia06f1_nodes)){
		  setItemToResultList("nth","<li><a href='#' data-destination='nia06f1' class='result-focus label-orange'>06-F</a> : Présence d'une zone de contenu principal sans attribut role</li>");
		  setItemsOutline(nia06f1_nodes,"orange","nia06f1","06-F");
		}
		
		const nia06f2_nodes = document.querySelectorAll('main');
		let nia06f2_counter = 0;
		if(nia06f2_nodes && nia06f2_nodes.length > 1){
			for(let i = 0; i < nia06f2_nodes.length; i++){
				if(isItemVisible(nia06f2_nodes[i])){
					nia06f2_counter++;
				}
				if(nia06f2_counter > 1){
					setItemToResultList("nc","<li><a href='#' data-destination='nia06f2' class='result-focus label-red'>06-F</a> : Présence de plusieurs zone de contenu principal [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]</li>");
					setItemsOutline(nia06f2_nodes,"red","nia06f2","06-F");
					break;
				}
			}
		}
	}
	
	// G. Vérifier que la zone de pied de page est structurée au moyen d’un élément <footer>.
	if(!only_redactor){
		const nia06g1_nodes = document.querySelectorAll('footer.page-footer:not([role="contentinfo"])');
		if(nia06g1_nodes && nia06g1_nodes.length > 0 && isItemsVisible(nia06g1_nodes)){
		  setItemToResultList("nth","<li><a href='#' data-destination='nia06g1' class='result-focus label-yellow'>06-G</a> : Présence d'une zone de pied de page sans attribut role</li>");
		  setItemsOutline(nia06g1_nodes,"red","nia06g1","06-G");
		}

		const nia06g2_nodes = document.querySelector('footer.page-footer[role="contentinfo"]');
		if(nia06g2_nodes == null){
			setItemToResultList("dev","<li><span class='result-focus label-yellow'>06-G</span> : Il y a un problème avec la structuration du footer [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]</li>");
		}
	}
	
	// Todo Footer
	// - Vérifier la hiérarchie des titres :  si des titres de rubriques sont affichés, les mettre en <h3> précédé par un élément <h2> visuellement masqué (classe .at ou .sr_only)
	// - Le lien vers la page « déclaration d’accessibilité » doit être présent 
	// - Le lien vers la page « plan du site » doit être présent (à l’exception des sites One_page) 
	// - Les différents items sont présentés dans des structures de type liste <ul> 
	
	// H. Cadres iframe
	// H1 Présence de titre
	const nia06h1_nodes = document.querySelectorAll('frame:not([title]),iframe:not([title])');
	if(nia06h1_nodes && nia06h1_nodes.length > 0 && isItemsVisible(nia06h1_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia06h1' class='result-focus label-red'>06-H</a> : Chaque cadre doit avoir un titre  [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-2-1-1' target='_blank'>RAWeb 2.1.1</a>]</li>");
	  setItemsOutline(nia06h1_nodes,"red","nia06h1","06-H");
	}
	
	// H2 iframe Has Noresize
	const nia06h2_nodes = document.querySelectorAll('iframe[noresize]');
	if(nia06h2_nodes && nia06h2_nodes.length > 0 && isItemsVisible(nia06h2_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia06h2' class='result-focus label-red'>06-H</a> : Présence de cadre avec attribut noresize</li>");
	  setItemsOutline(nia06h2_nodes,"red","nia06h2","06-H");
	}
	
	// H3 iframe Has No Scroll
	const nia06h3_nodes = document.querySelectorAll('iframe[scrolling=no]');
	if(nia06h3_nodes && nia06h3_nodes.length > 0 && isItemsVisible(nia06h3_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia06h3' class='result-focus label-red'>06-H</a> : Présence de cadre avec attribut scrolling désactivé</li>");
	  setItemsOutline(nia06h3_nodes,"yellow","nia06h3","06-H");
	}
	
	// H4 iframe vide
	const nia06h4_nodes = document.querySelectorAll('iframe:not([src]),iframe[src=""]');
	if(nia06h4_nodes && nia06h4_nodes.length > 0 && isItemsVisible(nia06h4_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia06h4' class='result-focus label-red'>06-H</a> : Présence de cadre vide</li>");
	  setItemsOutline(nia06h4_nodes,"red","nia06h4","06-H");
	}
	
	// H5 iframe Width Height
	const nia06h5_nodes = document.querySelectorAll('iframe[width], iframe[height]');
	if(nia06h5_nodes && nia06h5_nodes.length > 0 && isItemsVisible(nia06h5_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia06h5' class='result-focus label-red'>06-H</a> : Présence de cadre avec attributde présentation (height, width)</li>");
	  setItemsOutline(nia06h5_nodes,"red","nia06h5","06-H");
	}
	
	// I. Presence de triple espace (double concidéré comme erreur d'inattention)
	const nia06i_nodes = document.querySelectorAll('.cmp-text');
	let nia06i_flag = false;
	let nia06i_result;
	if(nia06i_nodes && nia06i_nodes.length > 0){
		for(let i = 0; i < nia06i_nodes.length; i++){
			if(isItemVisible(nia06i_nodes[i])){
				nia06i_result = nia06i_nodes[i].innerText.match(/   +/g);
				if(nia06i_result && nia06i_result.length > 0) {
					setItemOutline(nia06i_nodes[i],"yellow","nia06i","06-I");
					nia06i_flag = true;
				}
			}
		}
	}	
	if(nia06i_flag == true) {
	  setItemToResultList("nth","<li><a href='#' data-destination='nia06i' class='result-focus label-yellow'>06-I</a> : Présence d'espace pour créer des effets de marges ou d'alignement [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-10-1-3' target='_blank'>RAWeb 10.1.3</a>]</li>");
	}
	
	// J. Vérifier que le liste <ul> et <ol> contiennent plusieurs éléments
	const nia06j_nodes = document.querySelectorAll('*:not(.geoportail-addresses):not(.subnav-item) > ul:not(.cmp-focus-list):not(.article-metas),ol,[role="list"]');
	let nia06j_flag = false;
	let nia06j_result;
	if(nia06j_nodes && nia06j_nodes.length > 0){
		for(let i = 0; i < nia06j_nodes.length; i++){
			if(isItemVisible(nia06j_nodes[i])){
				nia06j_result = nia06j_nodes[i].querySelectorAll('li,[role="listitem"]');
				if(nia06j_result && nia06j_result.length < 2) {
					if(debug_flag) console.log(nia06j_result);
					setItemOutline(nia06j_nodes[i],"orange","nia06j","06-J");
					nia06j_flag = true;
				}
			}
		}
	}	
	if(nia06j_flag == true) {
	  setItemToResultList("nc","<li><a href='#' data-destination='nia06j' class='result-focus label-orange'>06-J</a> : Présence d'une liste à un seul élément [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-3-1' target='_blank'>RAWeb 9.3.1</a>]</li>");
	}
	
	// K Abréviations : mise en évidence
	const nia06k_nodes = document.querySelectorAll('abbr:not([title])');
	if(nia06k_nodes && nia06k_nodes.length > 0 && isItemsVisible(nia06k_nodes)){
	  setItemToResultList("nth","<li><a href='#' data-destination='nia06k' class='result-focus label-yellow'>06-K</a> : Présence d'abréviation non explicitée</li>");
	  setItemsOutline(nia06k_nodes,"yellow","nia06k","06-K");
	}
	
	
	// L Accordéon
	const nia06l1_nodes = document.querySelectorAll('.cmp-accordion > *:not(details), .cmp-accordion > details > *:not(summary):not(.cmp-accordion__panel), .filters-content > *:not(details), .filters-content > details > *:not(summary):not(.filter-content)');
	if(nia06l1_nodes && nia06l1_nodes.length > 0 && isItemsVisible(nia06l1_nodes)){
	  setItemToResultList("dev","<li><a href='#' data-destination='nia06l1' class='result-focus label-orange'>06-L</a> : Présence d'accordéon sans structure details/summary</li>");
	  setItemsOutline(nia06l1_nodes,"orange","nia06l1","06-L");
	}
	
	const nia06l2_nodes = document.querySelectorAll('details > summary > *:not(h1):not(h2):not(h3):not(h4):not(h5):not(h6):not([role="heading"]):not(svg[aria-hidden="true"])');
	if(nia06l2_nodes && nia06l2_nodes.length > 0 && isItemsVisible(nia06l2_nodes)){
	  setItemToResultList("dev","<li><a href='#' data-destination='nia06l1' class='result-focus label-orange'>06-L</a> : Présence d'accordéon avec qqch d'autre qu'une balise Hx dans la balise summary [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8.2.1' target='_blank'>RAWeb 8.2.1</a>]</li>");
	  setItemsOutline(nia06l2_nodes,"orange","nia06l2","06-L");
	}
	
	// M Geoportail Adresse	
	const nia06m_nodes = document.querySelectorAll('.geoportail');
	let nia06m1_flag = false, nia06m2_flag = false, nia06m3_flag = false, nia06m4_flag = false, nia06m5_flag = false, nia06m6_flag = false;
	let nia06m_map;
	let nia06m_Adress = 0;
	let nia06m_Contact;
	let nia06m_StreetAdress;
	
	if(nia06m_nodes && nia06m_nodes.length > 0){
		for(let i = 0; i < nia06m_nodes.length; i++){
			if(isItemVisible(nia06m_nodes[i])){
				nia06m_map = nia06m_nodes[i].querySelectorAll('.geoportail-map');
				if(!nia06m_map || nia06m_map.length != 1 || !isItemsVisible(nia06m_map)){nia06m1_flag=true;setItemOutline(nia06m_nodes[i],"orange","nia06m1","06-M");}
				nia06m_Adress = nia06m_nodes[i].querySelectorAll('.geoportail-addresses .vcard');
				if(!nia06m_Adress || nia06m_Adress.length == 0 || !isItemsVisible(nia06m_Adress)){nia06m2_flag=true;setItemOutline(nia06m_nodes[i],"red","nia06m2","06-M");}
				else if(nia06m_Adress && nia06m_Adress.length > 1 && nia06m_Adress[0].parentElement.tagName != "LI"){nia06m3_flag=true;setItemOutline(nia06m_nodes[i],"orange","nia06m3","06-M");}
				else if(nia06m_Adress && nia06m_Adress.length == 1 && nia06m_Adress[0].parentElement.tagName == "LI"){nia06m4_flag=true;setItemOutline(nia06m_nodes[i],"yellow","nia06m4","06-M");}
				if(nia06m_Adress && nia06m_Adress.length > 0){
					nia06m_Contact = nia06m_Adress[0].querySelectorAll('dl');
					nia06m_StreetAdress = nia06m_Adress[0].querySelectorAll('span[itemprop="streetAddress"]');
					
					console.log(nia06m_Contact)
					console.log(nia06m_StreetAdress)
					
					
					if(!nia06m_Contact || nia06m_Contact.length != 1 || !isItemsVisible(nia06m_Contact)){nia06m5_flag=true;setItemOutline(nia06m_nodes[i],"orange","nia06m5","06-M");}
					if(!nia06m_StreetAdress || nia06m_StreetAdress.length != 1 || !isItemsVisible(nia06m_StreetAdress) || (nia06m_StreetAdress[0].parentElement.tagName != "P" && nia06m_StreetAdress[0].parentElement.tagName != "DD")){nia06m6_flag=true;setItemOutline(nia06m_nodes[i],"yellow","nia06m6","06-M");}
				}
			}
		}
	}	
	if(nia06m1_flag == true) {
	  setItemToResultList("dev","<li><a href='#' data-destination='nia06m1' class='result-focus label-orange'>06-M</a> : Présence d'une carte Geoportail sans carte visible</li>");
	}
	if(nia06m2_flag == true) {
	  setItemToResultList("nc","<li><a href='#' data-destination='nia06m2' class='result-focus label-red'>06-M</a> : Présence d'une carte Geoportail sans addresse visible</li>");
	}
	if(nia06m3_flag == true) {
	  setItemToResultList("dev","<li><a href='#' data-destination='nia06m3' class='result-focus label-orange'>06-M</a> : Présence d'une liste d'adresse Geoportail n'utilisant pas une structure de liste 'ul' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-3-1' target='_blank'>RAWeb 9.3.1</a>]</li>");
	}
	if(nia06m4_flag == true) {
	  setItemToResultList("nth","<li><a href='#' data-destination='nia06m4' class='result-focus label-yellow'>06-M</a> : Présence d'une adresse Geoportail unique présent dans une structure de liste 'ul' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-3-1' target='_blank'>RAWeb 9.3.1</a>]</li>");
	}
	if(nia06m5_flag == true) {
	  setItemToResultList("dev","<li><a href='#' data-destination='nia06m5' class='result-focus label-orange'>06-M</a> : Présence d'une liste d'info de contact dans une adresse Geoportail n'utilisant pas une structure de liste 'dl' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-3-3' target='_blank'>RAWeb 9.3.3</a>]</li>");
	}
	if(nia06m6_flag == true) {
	  setItemToResultList("dev","<li><a href='#' data-destination='nia06m6' class='result-focus label-yellow'>06-M</a> : Les différents élément d'une adresse Geoportail doivent être regroupée dans une balise 'p' ou 'dd'</li>");
	}
	
	// N Bloub
	const nia06n_node = document.querySelector('.page-bloub');
	if(nia06n_node){ 
		if(nia06n_node.tagName != "NAV" || !nia06n_node.hasAttribute("role") || nia06n_node.getAttribute("role") != "navigation" || !nia06n_node.hasAttribute("aria-label")){
			setItemOutline(nia06n_node,"orange","nia06n1","06-N");
			setItemToResultList("dev","<li><a href='#' data-destination='nia06n1' class='result-focus label-orange'>06-N</a> : Le sommaire doit être structuré dans une balise 'nav' avec un role='navigation' et un attribut aria-label</li>");
		}

		const nia06n_links = nia06n_node.querySelectorAll('ul > li > a');
		let nia06n3_count = 0;
		if(nia06n_links && nia06n_links.length > 0){
			for(let i = 0; i < nia06n_links.length; i++){ 
				if(nia06n_links[i].hasAttribute("aria-current") && (nia06n_links[i].getAttribute("aria-current") == "true" || nia06n_links[i].getAttribute("aria-current") == "step")){ nia06n3_count++;}
			}
			if(nia06n3_count == 0) {
				setItemOutline(nia06n_links[i],"orange","nia06n3","06-N");
				setItemToResultList("dev","<li><a href='#' data-destination='nia06n3' class='result-focus label-orange'>06-N</a> : Dans le sommaire, le lien ancre vers la section en cours de consultation doit être identifié par l’attribut aria_current=’true’ ou 'step' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-10-9-1' target='_blank'>RAWeb 10.9.1</a>]</li>");
			}
		}
		else{
			setItemOutline(nia06n_node,"red","nia06n2","06-N");
			setItemToResultList("dev","<li><a href='#' data-destination='nia06n2' class='result-focus label-red'>06-N</a> : Le sommaire ne contient pas d'élément de navigation</li>");
		}
	}
		
	// O Composant Focus
	// Le composant focus doit avoir un titre même si celui_ci est visuellement masqué (.at ou .sr_only). Ce titre de composant doit être d’ 1 niveau supérieur à celui des titres des items
	// Les items du focus doivent être dans une seule et même liste <ul>
	// Le premier élément informatif dans le DOM de chaque item doit être le titre
	// Ne pas sortir du flux de lecture plus de la majorité des contenus (avec position absolue)
	// Si l’intégralité des items ne contiennent qu’un seul élément textuel celui_ci sera dans un <p>. 
	
	
	const nia06o1_nodes = document.querySelectorAll('.cmp-focus:not(:has(:is(h2, h3, h4, h5)))');
	if(nia06o1_nodes && nia06o1_nodes.length > 0){
	  setItemToResultList("dev","<li><a href='#' data-destination='nia06o1' class='result-focus label-yellow'>06-O</a> : Absence de titre sur un composant focus</li>");
	  setItemsOutline(nia06o1_nodes,"yellow","nia06o1","06-O");
	}
	
	const nia06o2_nodes = document.querySelectorAll('.cmp-focus');
	let nia06o2_lists, nia06o2_items;
	let nia06o2_itemTitle,nia06o2_itemContent;
	let nia06o2_flag = false;
	let nia06o3_flag = false;
	let nia06o3_counter;
	let nia06o4_flag = false;
	let nia06o5_flag = false;
	let nia06o6_flag = false;
	
	if(nia06o2_nodes && nia06o2_nodes.length > 0){
		for(let i = 0; i < nia06o2_nodes.length; i++){
			nia06o2_lists = nia06o2_nodes[i].querySelectorAll('ul, ul ul');
			nia06o2_items = nia06o2_nodes[i].querySelectorAll('.cmp-focus-list-item, .cmp-focus-top, .search-result'); 
			
			nia06o3_counter = 0;
			if(nia06o2_lists && nia06o2_items && ((nia06o2_lists.length == 1 && nia06o2_items.length > 1) || (nia06o2_lists.length == 0 && nia06o2_items.length == 1))){
				// OK
			}
			else {
				if(debug_flag) console.log(nia06o2_lists);
				if(debug_flag) console.log(nia06o2_items);
				
				nia06o2_flag = true;
				setItemOutline(nia06o2_nodes[i],"orange","nia06o2","06-O");
			}
			if(nia06o2_items){
				for(let j = 0; j < nia06o2_items.length; j++){
					nia06o2_itemTitle = nia06o2_items[j].querySelector(':is(h3, h4, h5, h6)');
					nia06o2_itemContent	= sanitizeText(nia06o2_items[j].textContent);
					
					if(nia06o2_itemTitle){
						
						if(nia06o2_itemContent == sanitizeText(nia06o2_itemTitle.textContent)){
							nia06o3_counter++;	
						}
						else if(nia06o2_itemContent.indexOf(sanitizeText(nia06o2_itemTitle.textContent)) != 0){	
							if(debug_flag) console.log("content : " + nia06o2_itemContent);
							if(debug_flag) console.log("title   : " + sanitizeText(nia06o2_itemTitle.textContent));
							
							nia06o4_flag = true;
							setItemOutline(nia06o2_items[j],"orange","nia06o4","06-O");
						}
					}
					if(nia06o2_itemContent == ""){
						nia06o5_flag = true;
						setItemOutline(nia06o2_items,"orange","nia06o5","06-O");
					}	
				}
				
				if(nia06o3_counter > 0 && nia06o3_counter == nia06o2_items.length){
					nia06o3_flag = true;
					setItemOutline(nia06o2_nodes[i],"orange","nia06o3","06-O");	
				}
				if(nia06o2_items[0] && nia06o2_items[0].classList.contains("cmp-focus-top") && nia06o2_items.length == 1){
					nia06o6_flag = true;
					setItemOutline(nia06o2_nodes[i],"yellow","nia06o6","06-O");	
				}
				
			}
		}	
	}
	if(nia06o2_flag == true) {
		setItemToResultList("dev","<li><a href='#' data-destination='nia06o2' class='result-focus label-orange'>06-O</a> : Les items du focus doivent être dans une seule et même liste 'ul' (exception si 1 seul item) </li>");	
	}
	if(nia06o3_flag == true) {
		setItemToResultList("dev","<li><a href='#' data-destination='nia06o3' class='result-focus label-orange'>06-O</a> : Si l’intégralité des items ne contiennent qu’un seul élément textuel celui-ci sera dans un 'p' </li>");	
	}
	if(nia06o4_flag == true) {
		setItemToResultList("dev","<li><a href='#' data-destination='nia06o4' class='result-focus label-orange'>06-O</a> : Le premier élément informatif dans le DOM de chaque item doit être le titre</li>");	
	}	
	if(nia06o5_flag == true) {
		setItemToResultList("dev","<li><a href='#' data-destination='nia06o5' class='result-focus label-orange'>06-O</a> : Les items du focus doivent avoir un contenu </li>");	
	}
	if(nia06o6_flag == true) {
		setItemToResultList("man","<li><a href='#' data-destination='nia06o6' class='result-focus label-yellow'>06-O</a> : Vérifier s'il est normal d'avoir un focus-on-top comme seul élément du focus </li>");	
	}

	// P Grid
	// Les items du grid doivent est structuré sous forme de liste (ul, ol ou dl)
	// Le premier élément informatif dans le DOM de chaque item doit être le titre
	// Si l’intégralité des items ne contiennent qu’un seul élément textuel celui_ci sera dans un <p>.

	const nia06p1_nodes = document.querySelectorAll('.cmp-grid');
	let nia06p1_items;
	let nia06p1_itemTitle,nia06p1_itemContent, nia06p1_itemTitleSani;
	let nia06p1_counter;
	let nia06p2_flag = false;
	let nia06p3_flag = false;
	let nia06p4_flag = false;
	
	if(nia06p1_nodes && nia06p1_nodes.length > 0){
		for(let i = 0; i < nia06p1_nodes.length; i++){
			if(nia06p1_nodes[i].tagName != "UL" && nia06p1_nodes[i].tagName != "OL" && nia06p1_nodes[i].tagName != "DL"){
				setItemToResultList("dev","<li><a href='#' data-destination='nia06p1' class='result-focus label-orange'>06-O</a> : Les items du grid doivent etre structuré sous forme de liste (ul, ol ou dl)</li>");
				setItemsOutline(nia06p1_nodes,"orange","nia06p1","06-P");
			}
			
			nia06p1_items = nia06p1_nodes[i].querySelectorAll('li, dt'); 
			if(nia06p1_items){
				for(let j = 0; j < nia06p1_items.length; j++){
					nia06p1_itemTitle = nia06p1_items[j].querySelector(':is(h3, h4, h5, h6)');
					nia06p1_itemContent	= sanitizeText(nia06p1_items[j].textContent);
					
					if(nia06p1_itemTitle){
						nia06p1_itemTitleSani = sanitizeText(nia06p1_itemTitle.textContent);					
						if(nia06p1_itemContent == nia06p1_itemTitleSani){
							nia06p1_counter++;	
						}
						else if(nia06p1_itemContent.indexOf(nia06p1_itemTitleSani) != 0){
							nia06p2_flag = true;
							setItemOutline(nia06p1_items[j],"orange","nia06p2","06-P");
						}
					}
					if(nia06p1_itemContent == ""){
						nia06p4_flag = true;
						setItemOutline(nia06p1_items[j],"orange","nia06p4","06-P");
					}	
				}
				if(nia06p1_counter == nia06p1_items.length){
					nia06p3_flag = true;
					setItemOutline(nia06p1_nodes[i],"orange","nia06p3","06-P");	
				}
			}
			
		}	
	}
	if(nia06p2_flag == true) {
		setItemToResultList("dev","<li><a href='#' data-destination='nia06p2' class='result-focus label-orange'>06-P</a> : Le premier élément informatif dans le DOM de chaque item doit être le titre</li>");	
	}	
	if(nia06p3_flag == true) {
		setItemToResultList("dev","<li><a href='#' data-destination='nia06p3' class='result-focus label-orange'>06-P</a> : Si l’intégralité des items ne contiennent qu’un seul élément textuel celui_ci sera dans un <p> </li>");	
	}
	if(nia06p4_flag == true) {
		setItemToResultList("dev","<li><a href='#' data-destination='nia06p4' class='result-focus label-orange'>06-P</a> : Les items du grid doivent avoir un contenu </li>");	
	}



	// Q Tabs
	// Vérifier la présence d’un container avec l’attribut role=’tablist’ et ainsi qu’un aria_label ou aria_labelledby  
	// Chaque item d’onglet sera dans une balise <button> et aura l’attribut role=’tab’ ainsi qu’un attribut aria_controls lié avec l’id de son contenu.
	// Chaque item d’onglet actif aura un attribut aria_selected=’true’, sinon il aura la valeur ‘false’ dans le cas contraire
	// Chaque contenu d’onglet sera dans un element possédant les attributs role=’tabpanel’ , tabindex=’0’ et ainsi qu’un aria_labelledby  faisant référence au titre de l’onglet.


	
	// R Back-To-Top
	// L’élément Back_to_Top présent en Desktop doit également être présent en mobile
	// L’élément Back_to_Top doit être un lien ancre qui cible #top
	// L’élément Back_to_Top doit avoir un attribut title ainsi qu’une balise <span> « haut de page » (cette dernière peut_être visuellement masquée)

	const nia06r1_nodes = document.querySelectorAll('a.back');
	if(!nia06r1_nodes || nia06r1_nodes.length == 0){
	  setItemToResultList("man","<li><a href='#' data-destination='nia06r1' class='result-focus label-yellow'>06-R</a> : Vérifier la présence du bouton de retour en haut de page (exception page avec peu de contenu)</li>");
	  setItemsOutline(nia06r1_nodes,"yellow","nia06r1","06-R");
	}
	
	const nia06r2_nodes = document.querySelectorAll('a.back:not(:is([href="#top"],[href="#"]))');
	if(nia06r2_nodes && nia06r2_nodes.length > 0){
	  setItemToResultList("dev","<li><a href='#' data-destination='nia06r2' class='result-focus label-yellow'>06-R</a> : L’élément Back_to_Top doit être un lien ancre qui cible #top</li>");
	  setItemsOutline(nia06r1_nodes,"yellow","nia06r2","06-R");
	}
	
	const nia06r3_nodes = document.querySelectorAll('a.back:not([title]) ');
	if(nia06r3_nodes && nia06r3_nodes.length > 0){
	  setItemToResultList("dev","<li><a href='#' data-destination='nia06r3' class='result-focus label-yellow'>06-R</a> : L’élément Back_to_Top doit avoir un attribut title</li>");
	  setItemsOutline(nia06r3_nodes,"yellow","nia06r3","06-R");
	}
	
	// S Breadcrumb
	
	// Les pages secondaires doivent disposer d’un breadcrumb
	//L’intégralité de la hiérarchie doit pouvoir être affiché (possibilité de les mettre dans un accordéon) et cliquable.
	// Les liens du breadcrumb doivent être présenté dans une liste ul/ol
	// Un attribut lang doit être ajouté pour les pages (ou les titres de pages) qui ne sont pas dans la langue de la page actuelle.
	// Présence de l'attribut aria_current=’page’ sur le dernier item du fils d'ariane
	// Le breadcrumb doit être dans une balise <nav role=navigation> avec l’attribut aria_label pertinent : "Vous êtes ici" ("Fil d'Ariane" est considéré comme un terme technique). 
	
	
	if(!only_redactor && !isHomepage){
		const nia06s1_nodes = document.querySelectorAll('nav[id^=breadcrumb-], nav.cmp-breadcrumb');
		if(!nia06s1_nodes || nia06s1_nodes.length == 0 || !isItemsVisible(nia06s1_nodes)){
		  setItemToResultList("dev","<li><a href='#' data-destination='nia06s1' class='result-focus label-orange'>06-S</a> : Les pages secondaires doivent disposer d’un breadcrumb.</li>");
		  setItemsOutline(nia06s1_nodes,"orange","nia06s1","06-S");
		}
		else{
			const nia06s2_nodes = document.querySelectorAll(':is(nav[id^=breadcrumb-], nav.cmp-breadcrumb):not([role="navigation"])');
			if(nia06s2_nodes && nia06s2_nodes.length > 0){
			  setItemToResultList("dev","<li><a href='#' data-destination='nia06s2' class='result-focus label-orange'>06-S</a> : Il manque l'attribut role sur la balise nav du breadcrumb.</li>");
			  setItemsOutline(nia06s2_nodes,"orange","nia06s2","06-S");
			}
			
			const nia06s3_nodes = document.querySelectorAll(':is(nav[id^=breadcrumb-], nav.cmp-breadcrumb):not([aria-label])');
			if(nia06s3_nodes && nia06s3_nodes.length > 0){
			  setItemToResultList("dev","<li><a href='#' data-destination='nia06s3' class='result-focus label-orange'>06-S</a> : Il manque l'attribut aria-label sur la balise nav du breadcrumb.</li>");
			  setItemsOutline(nia06s3_nodes,"orange","nia06s3","06-S");
			}

			const nia06s4_nodes = document.querySelectorAll(':is(nav[id^=breadcrumb-], nav.cmp-breadcrumb) :is(ul,ol).cmp-breadcrumb__list > li.cmp-breadcrumb__item');
			if(!nia06s4_nodes || nia06s4_nodes.length == 0){
			  setItemToResultList("dev","<li><a href='#' data-destination='nia06s3' class='result-focus label-red'>06-S</a> : Les liens du breadcrumb doivent être présenté dans une liste ul/ol.</li>");
			  setItemsOutline(nia06s4_nodes,"red","nia06s4","06-S");
			}
			
			const nia06s5_nodes = document.querySelectorAll(':is(nav[id^=breadcrumb-], nav.cmp-breadcrumb) .cmp-breadcrumb__list > .cmp-breadcrumb__item:not([aria-current="page"]):last-child > span:not([aria-current="page"])');
			if(nia06s5_nodes && nia06s5_nodes.length > 0 && isItemsVisible(nia06s5_nodes)){
			  setItemToResultList("dev","<li><a href='#' data-destination='nia06s5' class='result-focus label-red'>06-S</a> : Absence de l'attribut aria-current sur le dernier item du fils d'ariane --> Vérifier dans les propriétés de la page que celle-ci n'est pas cachée dans la navigation.</li>");
			  setItemsOutline(nia06s5_nodes,"red","nia06s5","06-S");
			}
		}
	}
	
	// T Cart
	
	// Les boutons d’actions côte à côte doivent être structurés dans une liste 
	// Le nom de l’étape en cours présent dans le titre de la page.
	// Etape « Votre panier »
	// o   Les différentes meta doivent être présentées sous forme de liste (<ul> ou <dl>)
	// Etape « Mode de livraison »
	// o   RAS – Note : Un bouton radio ne devrait pas être seul _ A revoir par les UX ?
	// Etape « Information de livraison »
	// o   Vérifier la présence des attributs autocomplete
	// o   Vérifier la présence des textes d’aides obligatoire annonçant le format
	// o   Vérifier la pertinence des messages d’erreur
	// Etape « Récapitulatif »
	// o   Les différentes meta et ligne de prix doivent être présentées sous forme de liste (<ul> ou <dl>)
	// o   Des titres de niveau approprié doivent être utiliser pour structurer la page

	// U Localnav
	// Les différents items sont dans une structure de type liste <ul>
	// La localnav doit être dans une balise <nav role=’navigation’> avec un attribut aria_labelledby qui cible le h2 précèdent ses différents items.

	const nia06u1_nodes = document.querySelectorAll('nav.page-localnav:not([role="navigation"])');
	if(nia06u1_nodes && nia06u1_nodes.length > 0){
	  setItemToResultList("dev","<li><a href='#' data-destination='nia06u1' class='result-focus label-orange'>06-U</a> : Il manque l'attribut role sur la balise nav du localnav.</li>");
	  setItemsOutline(nia06u1_nodes,"orange","nia06u1","06-U");
	}
	
	
	const nia06u2_nodes = document.querySelectorAll('nav.page-localnav:not([aria-labelledby])');
	if(nia06u2_nodes && nia06u2_nodes.length > 0){
	  setItemToResultList("dev","<li><a href='#' data-destination='nia06u2' class='result-focus label-orange'>06-U</a> : Il manque l'attribut aria-labelledby sur la balise nav du localnav.</li>");
	  setItemsOutline(nia06u2_nodes,"orange","nia06u2","06-U");
	}

	const nia06u3_nodes = document.querySelectorAll('nav.page-localnav[aria-labelledby="localnav-title"] > :is(h2,h3,h4)#localnav-title');
	if(nia06u3_nodes && nia06u3_nodes.length > 1){
	  setItemToResultList("dev","<li><a href='#' data-destination='nia06u3' class='result-focus label-red'>06-U</a> : Le composant localnav doit avoir un titre Hn lié avec un couple aria-labelledby-id unique (celui-ci peut être visuellement masqué) </li>");
	  setItemsOutline(nia06u3_nodes,"red","nia06u3","06-U");
	}
	
	const nia06u4_nodes = document.querySelectorAll('nav.page-localnav');
	let nia06u4_items;
	if(nia06u4_nodes && nia06u4_nodes.length > 0){
		for(let i = 0; i < nia06u4_nodes.length; i++){
			nia06u4_items = nia06u4_nodes[i].querySelectorAll('ul li.nav-item');
			if(!nia06u4_items || nia06u4_items.length == 0){
			  setItemToResultList("dev","<li><a href='#' data-destination='nia06u4' class='result-focus label-red'>06-U</a> : Le composant localnav doit contenir des items.</li>");
			  setItemOutline(nia06u4_nodes[i],"red","nia06u4","06-U");
			}
			else if(nia06u4_items && nia06u4_items.length == 1){
			  setItemToResultList("nth","<li><a href='#' data-destination='nia06u5' class='result-focus label-yellow'>06-U</a> : Le composant localnav doit idéalement contenir plusieurs items.</li>");
			  setItemOutline(nia06u4_nodes[i],"yellow","nia06u5","06-U");
			}
		}
	}
}