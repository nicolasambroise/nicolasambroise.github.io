/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-06 Structure de l'information - Thématique RAWeb 9 
- Landmark
- List : Mise en avant des listes */

function check_part_06(){
	if(debug_flag) console.log("06 Structure");

	// A. Vérifier qu'il n'y a pas de role sur les container de liste
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
	
	// B. Vérifier que le liste <ul> et <ol> ne contienne que des <li> ou [role="listitem"]
	const nia06b_nodes = document.querySelectorAll(':where(ul,ol,[role="list"]) > *:not(li):not([role="listitem"]):not(.checkA11YSpan)');
	if(nia06b_nodes && nia06b_nodes.length > 0){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia06b' class='result-focus label-red'>06-B</a> : Présence d'un élement non autorisé dans une liste [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-3-1' target='_blank'>RAWeb 9.3.1</a>]</li>");
	  setItemsOutline(nia06b_nodes,"red","nia06b","06-B");
	}
	
	// C. Vérifier que la zone d’en-tête est structurée au moyen d’un élément <header> ;
	// <header class="page-header" role="banner">
	const nia06c_nodes = document.querySelector('header.page-header[role="banner"]');
	if(nia06c_nodes == null){
		setItemToResultList("dev","<li><span class='result-focus label-yellow'>06-C</span> : Il y a un problème avec la structuration du header [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]</li>");
	}
	
	// D. Vérifier que les zones de navigation principales et secondaires sont structurées au moyen d’un élément <nav> ;
	// <nav class="page-headernav" role="navigation" aria-label="Menu principal" id="headernav">
	const nia06d_nodes = document.querySelectorAll('nav.page-headernav[role="navigation"]');
	if(nia06d_nodes == null){
		setItemToResultList("dev","<li><span class='result-focus label-yellow'>06-D</span> : Il y a un problème avec la structuration de la navigation [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]</li>");
	}
	
	// E. Vérifier que l’élément <nav> n’est pas utilisé en dehors de la structuration des zones de navigation principales et secondaires ;
	const nia06e1_nodes = document.querySelectorAll('nav:not([role="navigation"])');
	if(nia06e1_nodes && nia06e1_nodes.length > 0 && isItemsVisible(nia06e1_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia06e1' class='result-focus label-red'>06-E</a> : Présence d'une zone de navigation sans attribut role</li>");
	  setItemsOutline(nia06e1_nodes,"red","nia06e1","06-E");
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
	const nia06e2_nodes = document.querySelectorAll('*:not(.page-langs):not(.right-part):not(.cmp-directory) > nav:not(.page-headernav):not(.page-headernavmobile):not(.page-headernav-desk):not(.automaticnav):not(.cmp-breadcrumb):not(.page-localnav):not(.cmp-backtonav):not(.cmp-breadcrumb-demarches)');
	if(nia06e2_nodes && nia06e2_nodes.length > 0&& isItemsVisible(nia06e2_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia06e2' class='result-focus label-red'>06-E</a> : Présence d'une balise nav utilisé en dehors d'une zone de navigation [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]</li>");
	  setItemsOutline(nia06e2_nodes,"red","nia06e2","06-E");
	}
	
	// F. Vérifier que la zone de contenu principal est structurée au moyen d’un élément <main> ;
	// Si le document possède plusieurs éléments <main>, vérifier qu’un seul de ces éléments est visible (les autres occurrences de l’élément sont pourvues d’un attribut hidden) ;
	// <main id="main" class="page-main " role="main">
	
	const nia06f1_nodes = document.querySelectorAll('main:not([role="main"])');
	if(nia06f1_nodes && nia06f1_nodes.length > 0 && isItemsVisible(nia06f1_nodes)){
	  setItemToResultList("nth","<li><a href='#' data-destination='nia06f1' class='result-focus label-red'>06-F</a> : Présence d'une zone de contenu principal sans attribut role</li>");
	  setItemsOutline(nia06f1_nodes,"red","nia06f1","06-F");
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
	
	// G. Vérifier que la zone de pied de page est structurée au moyen d’un élément <footer>.
	const nia06g1_nodes = document.querySelectorAll('footer.page-footer:not([role="contentinfo"])');
	if(nia06g1_nodes && nia06g1_nodes.length > 0 && isItemsVisible(nia06g1_nodes)){
	  setItemToResultList("nth","<li><a href='#' data-destination='nia06g1' class='result-focus label-yellow'>06-G</a> : Présence d'une zone de pied de page sans attribut role</li>");
	  setItemsOutline(nia06g1_nodes,"red","nia06g1","06-G");
	}

	const nia06g2_nodes = document.querySelector('footer.page-footer[role="contentinfo"]');
	if(nia06g2_nodes == null){
		setItemToResultList("dev","<li><span class='result-focus label-yellow'>06-G</span> : Il y a un problème avec la structuration du footer [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]</li>");
	}
	
	// H. Cadres avec un titre
	const nia06h_nodes = document.querySelectorAll('frame:not([title]),iframe:not([title])');
	if(nia06h_nodes && nia06h_nodes.length > 0 && isItemsVisible(nia06h_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia06h' class='result-focus label-red'>06-H</a> : Chaque cadre doit avoir un titre  [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-2-1-1' target='_blank'>RAWeb 2.1.1</a>]</li>");
	  setItemsOutline(nia06h_nodes,"red","nia06h","06-H");
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
	const nia06j_nodes = document.querySelectorAll('ul:not(.cmp-focus-list),ol,[role="list"]');
	let nia06j_flag = false;
	let nia06j_result;
	if(nia06j_nodes && nia06j_nodes.length > 0){
		for(let i = 0; i < nia06j_nodes.length; i++){
			if(isItemVisible(nia06j_nodes[i])){
				nia06j_result = nia06j_nodes[i].getElementsByTagName("li");
				if(nia06j_result && nia06j_result.length < 2) {
					console.log(nia06j_result);
					setItemOutline(nia06j_nodes[i],"orange","nia06j","06-J");
					nia06j_flag = true;
				}
			}
		}
	}	
	if(nia06j_flag == true) {
	  setItemToResultList("nc","<li><a href='#' data-destination='nia06j' class='result-focus label-orange'>06-J</a> : Présence d'une liste à un seul élément [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-3-1' target='_blank'>RAWeb 9.3.1</a>]</li>");
	}
}