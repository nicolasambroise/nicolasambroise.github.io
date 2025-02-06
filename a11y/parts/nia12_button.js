/*- -------------------------------------------------------------------------------- */
/* 12. Boutons
Intitulé des boutons : Pour les boutons pour ouvrir la recherche, lancer la recherche, ouvrir les filtres et ouvrir le menu :
o	L'attribut « aria-label » doit être identique à l'attribut title
o	L'attribut « title » doit reprendre à minimum le contenu textuel de celui-ci 
*/
function check_part_12(){
	if(debug_flag) console.log("12 Boutons");

	/* A&B. Recherche */
	if(!only_redactor){
		const nia12a1_nodes = document.querySelectorAll('.topsearch:not([role="search"])');
		const nia12a2_nodes = document.querySelectorAll('html[lang="fr"] .topsearch:not([aria-label="Globale"])');
		if((nia12a1_nodes && nia12a1_nodes.length > 0 && isItemsVisible(nia12a1_nodes)) || (nia12a2_nodes && nia12a2_nodes.length > 0 && isItemsVisible(nia12a2_nodes))){
		  setItemToResultList("dev","<li><a href='#' data-destination='nia12a' class='result-focus label-red'>12-A</a> : Absence de certaines propriétés sur le champ de recherche (role=search et aria-label=Globale)</li>");
		  setItemsOutline(nia12a1_nodes,"red","nia12a","12-A");
		  setItemsOutline(nia12a2_nodes,"red","nia12a","12-A");
		}
	}

	const nia12b1_nodes = document.querySelectorAll('html[lang="fr"] #topsearch > #search-field-top:not([title^="Rechercher"])');
	const nia12b2_nodes = document.querySelectorAll('html[lang="fr"] #topsearch > #search-field-top:not([placeholder^="Rechercher"])');
	const nia12b3_nodes = document.querySelectorAll('html[lang="fr"] #topsearch > button:not([title^="Rechercher"])');
	if((nia12b1_nodes && nia12b1_nodes.length > 0 && isItemsVisible(nia12b1_nodes)) || (nia12b2_nodes && nia12b2_nodes.length > 0 && isItemsVisible(nia12b2_nodes)) || (nia12b3_nodes && nia12b3_nodes.length > 0 && isItemsVisible(nia12b3_nodes))){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia12b' class='result-focus label-red'>12-B</a> : Problème dans les intitulés du champ de recherche (title et placeholder)</li>");
	  setItemsOutline(nia12b1_nodes,"red","nia12b","12-B");
	  setItemsOutline(nia12b2_nodes,"red","nia12b","12-B");
	  setItemsOutline(nia12b3_nodes,"red","nia12b","12-B");
	}

	/* C. Anchor */
	const nia12c_nodes = document.querySelectorAll('.topsearch button:not(.anchor-close), button.anchor[data-destination^="#headernav"]:not(.anchor-close), button.anchor[data-destination^="#filters"]:not(.anchor-close), button.anchor[data-destination^="#bloub"]:not(.anchor-close)');
	let nia12c_title = "", nia12c_content = "", nia12c_lang = "";
	let nia12c1_flag = false,nia12c2_flag = false,nia12c3_flag = false;
	if(nia12c_nodes && nia12c_nodes.length > 0){
		if(nia12c_nodes && nia12c_nodes.length > 0 ){
			for(let i = 0; i < nia12c_nodes.length; i++){
				nia12c_lang = nia12c_nodes[i].closest('[lang]').getAttribute('lang');
				if(nia12c_nodes[i].hasAttribute("title")) nia12c_title = sanitizeText(nia12c_nodes[i].getAttribute("title"),nia12c_lang);
				if(nia12c_nodes[i].hasAttribute("aria-label")) nia12c_label = sanitizeText(nia12c_nodes[i].getAttribute("aria-label"),nia12c_lang);
				nia12c_content = sanitizeText(nia12c_nodes[i].innerText != "" ? nia12c_nodes[i].innerText : nia12c_nodes[i].textContent ,nia12c_lang);
				if(nia12c_nodes[i].hasAttribute("title") && !nia12c_title.includes(nia12c_content)){
					if(debug_flag) console.log("%cERROR","font-weight:700;color:darkred","["+nia12c_title+"] VS ["+nia12c_content+"] ");
					setItemOutline(nia12c_nodes[i],"red","nia12c1","12-C");
					nia12c1_flag = true;
				}
				if(nia12c_nodes[i].hasAttribute("title") && nia12c_nodes[i].hasAttribute("aria-label") && nia12c_label != nia12c_title){
					setItemOutline(nia12c_nodes[i],"red","nia12c2","12-C");
					nia12c2_flag = true;
				}
				if(nia12c_nodes[i].hasAttribute("title") && !nia12c_nodes[i].hasAttribute("aria-label") && nia12c_title != nia12c_content && !only_redactor){
					setItemOutline(nia12c_nodes[i],"yellow","nia12c3","12-C");
					nia12c3_flag = true;
				}
			}
		}
	}
	if(nia12c1_flag == true) {
	  setItemToResultList("nc","<li><a href='#' data-destination='nia12c1' class='result-focus label-red'>12-C</a> : L'attribut title d'un bouton du site ne reprend pas son contenu textuel</li>");
	}
	if(nia12c2_flag == true) {
	  setItemToResultList("nc","<li><a href='#' data-destination='nia12c2' class='result-focus label-red'>12-C</a> : L'attribut title d'un bouton du site n'est pas identique à son aria-label </li>");
	}
	if(nia12c3_flag == true) {
	  setItemToResultList("dev","<li><a href='#' data-destination='nia12c3' class='result-focus label-yellow'>12-C</a> : L'attribut title d'un bouton du site, différent de son contenu textuel, n'est pas completé par un attribut aria-label </li>");
	}
	
	/* D. Button */
	if(!only_redactor){
		const nia12d_nodes = document.querySelectorAll('button[role=button]');
		if(nia12d_nodes && nia12d_nodes.length > 0 && isItemsVisible(nia12d_nodes)){
		  setItemToResultList("dev","<li><a href='#' data-destination='nia12d' class='result-focus label-yellow'>12-D</a> : Il n'est pas nécessaire d'ajouter un role button sur un éléments boutons</li>");
		  setItemsOutline(nia12d_nodes,"yellow","nia12d","12-D");
		}
	}
}