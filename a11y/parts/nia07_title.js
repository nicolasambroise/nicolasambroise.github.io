/*- ------------------------------------------------------------------------------- */
/* 🗸 NIA-07 Title : Mise en avant des titres (<Hn> et ceux qui ont les roles=heading). 
o Vérification de la présence de titres simulés - S’assurer que les titres sont bien balisés avec des balises <Hn> et pas seulement avec du gras.
o S’assurer que les titres sont dans le bon ordre*/
function check_part_07(){
	if(debug_flag) console.log("07 Titre");

	// A. Heading avec role
	const nia07a_nodes = document.querySelectorAll('h1[role]:not([role="heading"]),h2[role]:not([role="heading"]),h3[role]:not([role="heading"]),h4[role]:not([role="heading"]),h5[role]:not([role="heading"]),h6[role]:not([role="heading"])');
	if(nia07a_nodes && nia07a_nodes.length > 0 && isItemsVisible(nia07a_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia07a' class='result-focus label-red'>07-A</a> : Présence de titre avec un attribut role</li>");
	  setItemsOutline(nia07a_nodes,"red","nia07a","07-A");
	}

	// B. Aria-level sans heading
	const nia07b_nodes = document.querySelectorAll('[aria-level]:not(h1):not(h2):not(h3):not(h4):not(h5):not(h6):not([role="heading"])');
	if(nia07b_nodes && nia07b_nodes.length > 0 && isItemsVisible(nia07b_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia07b' class='result-focus label-red'>07-B</a> : Présence d'attribut aria-level en dehors de titre</li>");
	  setItemsOutline(nia07b_nodes,"red","nia07b","07-B");
	}
	
	// C. Heading caché au outil d'assistance 
	const nia07c_nodes = document.querySelectorAll('h1[aria-hidden],h2[aria-hidden],h3[aria-hidden],h4[aria-hidden],h5[aria-hidden],h6[aria-hidden]');
	if(nia07c_nodes && nia07c_nodes.length > 0 && isItemsVisible(nia07c_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia07c' class='result-focus label-red'>07-C</a> : Présence de titre caché aux outils d'assistance</li>");
	  setItemsOutline(nia07c_nodes,"red","nia07c","07-C");
	}

	// D. Heading simulé
	const nia07d_nodes = document.querySelectorAll('b,p:not(.cmp-form__mandatory-text) > strong:first-child ,span > strong:first-child ,div > strong:first-child , *:not(.accordionItem) > *:not(figcaption):not(.article-summary):not(.article-metas):not(.search-metas):not(.cmp-grid__textContainer):not(.feed-item-content):not(.meta-themes):not(.description):not(.meta-published-update) > p:not(.cmp-lastupdate):not(.cmp-form__mandatory-text):not(.at):not(.feed-item-author):not(.orejime-Notice-description):first-child');
	let nia07d_flag = false;
	let nia07d_fontSize;
	if(nia07d_nodes && nia07d_nodes.length > 0){
		for(let i = 0; i < nia07d_nodes.length; i++){
			if(isItemVisible(nia07d_nodes[i]) && nia07d_nodes[i].length < 150){
				//boucle pour exclure les textes de plus de 150 caractères 
				setItemsOutline(nia07d_nodes[i],"yellow","nia07d","07-D");
				nia07d_flag = true;
			}
		}
	}
	if(nia07d_flag == true) {
	  setItemToResultList("nth","<li><a href='#' data-destination='nia07d' class='result-focus label-yellow'>07-D</a> : Présence de texte ressemblant à des titres n'étant pas balisé comme tel - A vérifier au cas par cas [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-1-3' target='_blank'>RAWeb 9.1.3</a>]</li>");
	}
	
	// E. Ordre Heading
	const nia07e_nodes = document.querySelectorAll(':where(h1,h2,h3,h4,h5,h6,[role="heading"]):not([aria-hidden])');
	let nia07e_flag = false;
	let nia07e_current_level = 0, nia07e_previous_level = 0;
	if(nia07e_nodes && nia07e_nodes.length > 0){
		for(let i = 0; i < nia07e_nodes.length; i++){
			if(isItemVisible(nia07e_nodes[i])){
				if(nia07e_nodes[i].tagName == 'H1' || (nia07e_nodes[i].hasAttribute('aria-level') && nia07e_nodes[i].hasAttribute('role') && nia07e_nodes[i].getAttribute('aria-level').value == "1" && nia07e_nodes[i].getAttribute('role').value == "heading")) {nia07e_current_level = 1;}
				else if(nia07e_nodes[i].tagName == 'H3' || (nia07e_nodes[i].hasAttribute('aria-level') && nia07e_nodes[i].hasAttribute('role') && nia07e_nodes[i].getAttribute('aria-level').value == "3" && nia07e_nodes[i].getAttribute('role').value == "heading")) {nia07e_current_level = 3;}
				else if(nia07e_nodes[i].tagName == 'H4' || (nia07e_nodes[i].hasAttribute('aria-level') && nia07e_nodes[i].hasAttribute('role') && nia07e_nodes[i].getAttribute('aria-level').value == "4" && nia07e_nodes[i].getAttribute('role').value == "heading")) {nia07e_current_level = 4;}
				else if(nia07e_nodes[i].tagName == 'H5' || (nia07e_nodes[i].hasAttribute('aria-level') && nia07e_nodes[i].hasAttribute('role') && nia07e_nodes[i].getAttribute('aria-level').value == "5" && nia07e_nodes[i].getAttribute('role').value == "heading")) {nia07e_current_level = 5;}
				else if(nia07e_nodes[i].tagName == 'H6' || (nia07e_nodes[i].hasAttribute('aria-level') && nia07e_nodes[i].hasAttribute('role') && nia07e_nodes[i].getAttribute('aria-level').value == "6" && nia07e_nodes[i].getAttribute('role').value == "heading")) {nia07e_current_level = 6;}
				else {nia07e_current_level = 2;}
				if(nia07e_current_level - nia07e_previous_level > 1){
					setItemOutline(nia07e_nodes[i],"yellow","nia07e","07-E");
					if(debug_flag) console.log("  > "+nia07e_nodes[i].innerText+" | current : "+nia07e_current_level+" | previous :"+nia07e_previous_level);
					nia07e_flag = true;
				}
				nia07e_previous_level = nia07e_current_level;
			}
		}
	}
	if(nia07e_flag == true) {
	  setItemToResultList("nth","<li><a href='#' data-destination='nia07e' class='result-focus label-yellow'>07-E</a> : Présence de sauts de titres [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-1-1' target='_blank'>RAWeb 9.1.1</a>]</li>");
	}
}