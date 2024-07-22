
/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-05 Element Obligatoire - Thématique RAWeb 8
- Empty : Mise en avant des balises et paragraphes vides
*/
function check_part_05(){
	if(debug_flag) console.log("05 Element Obligatoire");

	// A. Bloc vide
	const nia05a_nodes = document.querySelectorAll('*:not(.ol-attribution) > :where(p, th, strong, em, a, q, blockquote, aside, ul, li):not([aria-hidden="true"]):not(.mapboxgl-ctrl-logo):empty');
	let nia05a_container = "";
	if(nia05a_nodes && nia05a_nodes.length > 0 && isItemsVisible(nia05a_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia05a' class='result-focus label-red'>05-A</a> : Présence de balise vide [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-9-1' target='_blank'>RAWeb 8.9.1</a>]</li>");
	  for(let i = 0; i < nia05a_nodes.length; i++){
			if(isItemVisible(nia05a_nodes[i])){
				setItemOutline(nia05a_nodes[i],"red","nia05a","05-A");
				nia05a_container = nia05a_nodes[i].parentElement;
				nia05a_container.style.outline = "3px dotted red";
				nia05a_container.style.outlineOffset = "-2px";
			}
		}
	}

    // B. Bloc vide avec $nbsp; ou \n
	const nia05b_nodes = document.querySelectorAll('*:not(.ol-attribution):not([aria-hidden="true"]) > :where(p, th, strong, em, a, q, blockquote, aside, ul, li):not([aria-hidden="true"]):not(.mapboxgl-ctrl-logo):not(:empty)');
	let nia05b_flag = false;
	let nia05b_clean_node = "", nia05b_container = "", nia05b_lang = "";
	if(nia05b_nodes && nia05b_nodes.length > 0){
		for(let i = 0; i < nia05b_nodes.length; i++){
			if(nia05b_nodes[i].childElementCount == 0){
				nia05b_lang = nia05b_nodes[i].closest('[lang]').getAttribute('lang');
				nia05b_clean_node = sanitizeText(nia05b_nodes[i].innerText, nia05b_lang);
				if(nia05b_clean_node == "" && isItemVisible(nia05b_nodes[i])){
					setItemOutline(nia05b_nodes[i],"red","nia05b","05-B");
					nia05b_container = nia05b_nodes[i].parentElement;
					nia05b_container.style.outline = "3px dotted red";
					nia05b_container.style.outlineOffset = "-2px";
					nia05b_flag = true;
				}
			}
		}
	}
	if(nia05b_flag == true) {
	  setItemToResultList("nc","<li><a href='#' data-destination='nia05b' class='result-focus label-red'>05-B</a> : Présence de balises vides (ou avec un contenu assimilable à vide) [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-9-1' target='_blank'>RAWeb 8.9.1</a>]</li>");
	}
	
	// C. Doctype
	const nia05c_doctype = new XMLSerializer().serializeToString(document.doctype);
	if(nia05c_doctype != "<!DOCTYPE html>"){
		setItemToResultList("dev","<li><a href='#' data-destination='nia05c' class='result-focus label-yellow'>05-C</a> : Vérifier qu'un doctype est correctement déclaré [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-1-1' target='_blank'>RAWeb 8.1.1</a>]</li>");
	}
	
	// D. Page title
	const nia05d_title = document.title;
	if(nia05d_title == ""){
		setItemToResultList("nc","<li><a href='#' data-destination='nia05d' class='result-focus label-red'>05-D</a> : Vérifier qu'un titre de page est défini [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-5-1' target='_blank'>RAWeb 8.5.1</a>]</li>");
	}
	
	// E. Changement de sens de lecture
	const nia05e1_nodes = document.querySelectorAll('[dir]:not([dir="rtl"]):not([dir="ltr"])');
	if(nia05e1_nodes && nia05e1_nodes.length > 0 && isItemsVisible(nia05e1_nodes)){
	  setItemToResultList("dev","<li><a href='#' data-destination='nia05e1' class='result-focus label-red'>05-E</a> : Vérifier la valeur de définition du sens de lecture [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-10-2' target='_blank'>RAWeb 8.10.2</a>]</li>");
	  setItemsOutline(nia05e1_nodes,"red","nia05e1","05-E");
	}
	
	const nia05e2_nodes = document.querySelectorAll('[dir="rtl"]');
	const nia05e2_rtl_isocode = ["ar", "ara", "arc", "ae", "ave", "egy", "he", "heb", "nqo", "pal", "phn", "sam", "syc", "syr", "fa", "per", "fas", "ku", "kur", "dv", "ha" , "khw", "ks", "pa", "ur", "yi"];
	let nia05e2_flag = false;
	let nia05e2_lang;
	if(nia05e2_nodes && nia05e2_nodes.length > 0 && isItemsVisible(nia05e2_nodes)){
	  for(let i = 0; i < nia05e2_nodes.length; i++){
		  nia05e2_lang = nia05e2_nodes[i].closest('[lang]').getAttribute('lang');
		  if (nia05e2_rtl_isocode.indexOf(nia05e2_lang) < 0) {
			  setItemOutline(nia05e2_nodes[i],"red","nia05e2","05-E");
			  nia05e2_flag = true;
		  }
	  }
	}
	if(nia05e2_flag == true){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia05e2' class='result-focus label-red'>05-E</a> : Présence d'élément avec un sens de lecture de droite vers la gauche [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-10-2' target='_blank'>RAWeb 8.10.2</a>]</li>");
	}
	
	// F. Id dupliqué
	const nia05f_nodes = document.querySelectorAll('[id]:not(script):not(link)');
	let nia05f_flag = false;
	let nia05f_ids = {};
	let nia05f_currentId;
	let nia05f_duplicateId = "";
	if(nia05f_nodes && nia05f_nodes.length > 0){
		for(let i = 0; i < nia05f_nodes.length; i++){
			nia05f_currentId = nia05f_nodes[i].id ? nia05f_nodes[i].id : "undefined";
			if(isNaN(nia05f_ids[nia05f_currentId])) {
				nia05f_ids[nia05f_currentId] = 0;
			}
			else{
				nia05f_flag = true;
				setItemOutline(nia05f_nodes[i],"red","nia05f","05-F");
				nia05f_duplicateId += "\""+nia05f_currentId+"\",";
			}
			nia05f_ids[nia05f_currentId]++;
		}
	}
	if(nia05f_flag == true){
	  //console.log(nia05f_ids);
	  setItemToResultList("dev","<li><a href='#' data-destination='nia05f' class='result-focus label-red'>05-F</a> : Présence d'Id dupliqué ("+nia05f_duplicateId+") [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-2-1' target='_blank'>RAWeb 8.2.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-identifiant-html-nest-utilise-quune-seule-fois-par-page' target='_blank'>Opquast 229</a>]</li>");
	}
	
	// G. Présence de la Govbar
	const nia05g_govbar = document.querySelector('#govbar.govbar');
	if(nia05g_govbar == null || !isItemVisible(nia05g_govbar)){
		setItemToResultList("nth","<li><span class='result-focus label-yellow'>05-G</span> : Absence de la govbar</li>");
	}
	
	// H. Detect double <br>
	const nia05h_nodes = document.querySelectorAll('br + br');
	let nia05h_container = "";
	let nia05h_flag = false;
	let nia05h_prev_n1, nia05h_prev_n2;
	if(nia05h_nodes && nia05h_nodes.length > 0 && isItemsVisible(nia05h_nodes)){
		for(let i = 0; i < nia05h_nodes.length; i++){
			if(isItemVisible(nia05h_nodes[i])){
				nia05h_prev_n1 = nia05h_nodes[i].previousSibling;
				nia05h_prev_n2 = nia05h_prev_n1.previousSibling;
				/*
				console.log(nia05h_nodes[i]);
				console.log(nia05h_prev_n1);
				console.log(nia05h_prev_n2);
				*/
				if(nia05h_prev_n1.nodeName == "BR"){
					setItemOutline(nia05h_nodes[i],"red","nia05h","05-H");
					nia05h_container = nia05h_nodes[i].parentElement;
					nia05h_container.style.outline = "3px dotted red";
					nia05h_container.style.outlineOffset = "-2px";
					nia05h_flag = true;
				}
				else if(nia05h_prev_n2.nodeName == "BR" && (nia05h_prev_n1.nodeName == "#text" || nia05h_prev_n1.nodeName == "#comment") && (nia05h_prev_n1.textContent == " " || nia05h_prev_n1.textContent == "")){
					setItemOutline(nia05h_nodes[i],"red","nia05h","05-H");
					nia05h_container = nia05h_nodes[i].parentElement;
					nia05h_container.style.outline = "3px dotted red";
					nia05h_container.style.outlineOffset = "-2px";
					nia05h_flag = true;
				}
			}
		}
	}
	if(nia05h_flag == true){
		  setItemToResultList("nc","<li><a href='#' data-destination='nia05h' class='result-focus label-red'>05-H</a> : Présence de multiple saut de ligne [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-9-1' target='_blank'>RAWeb 8.9.1</a>], privilégier l'utilisation du composant separator</li>");
	}
	
	// I. Le code source de chaque page contient une métadonnée qui en décrit le contenu. ==> Présence de meta name=description 
	const nia05i_node = document.querySelector('meta[name="description"]');
	if(nia05i_node == null || nia05i_node.content == null || nia05i_node.content == "" ){
		setItemToResultList("nth","<li><span class='result-focus label-yellow'>05-I</span> : Absence de métadonnée qui en décrit le contenu [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-code-source-de-chaque-page-contient-une-metadonnee-qui-en-decrit-le-contenu' target='_blank'>Opquast 3</a>]</li>");
	}
	
	// J. Le code source des pages contient un appel valide à une icône de favori.
	const nia05j_node = document.querySelector("link[rel*='icon']");
	if(nia05j_node == null || nia05j_node.getAttribute("href") == null || nia05j_node.getAttribute("href") == "" ){
		setItemToResultList("nth","<li><span class='result-focus label-yellow'>05-J</span> : Absence de Favicon [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-code-source-des-pages-contient-un-appel-valide-a-un-icone-de-favori' target='_blank'>Opquast 99</a>]</li>");
	}

	// K. Chaque page affiche une information permettant de connaître son emplacement dans l'arborescence du site.
	if(isHomepage == false){
		const nia05k_node = document.querySelector(".cmp-breadcrumb,.cmp-breadcrumb-demarches");
		if(!nia05k_node){
			setItemToResultList("nth","<li><span class='result-focus label-yellow'>05-K</span> : Absence de Fils d'Ariane [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-page-affiche-une-information-permettant-de-connaitre-son-emplacement-dans-larborescence-du-site' target='_blank'>Opquast 151</a>]</li>");
		}
	}
	
	// L. Le focus clavier n'est ni supprimé ni masqué.
	const nia05l_node = document.querySelector("summary");
	if(nia05l_node){
		nia05l_node.addEventListener("focus", (e) => {
			//console.log(window.getComputedStyle(e.target, null).outline);
			if(window.getComputedStyle(e.target, null).outline == 0){
				setItemOutline(nia05l_node,"red","nia05l","05-L");
				setItemToResultList("dev","<li><a href='#' data-destination='nia05l' class='result-focus label-red'>05-L</a> : Le focus clavier est supprimer d'un élément accordéon [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-focus-clavier-nest-ni-supprime-ni-masque' target='_blank'>Opquast 160</a>]</li>");
			}
		});
		nia05l_node.focus();
	}
	
	// M. Les styles ne justifient pas le texte.
	const nia05m_node = document.querySelector("p");
	if(nia05m_node && nia05m_node.style.textAlign == "justify"){
		setItemOutline(nia05m_node,"yellow","nia05m","05-M");
		setItemToResultList("nth","<li><a href='#' data-destination='nia05m' class='result-focus label-yellow'>05-M</a> : Présence de texte justifié [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-styles-ne-justifient-pas-le-texte' target='_blank'>Opquast 186</a>]</li>");
	}
	
	// N. Les mises en majuscules à des fins décoratives sont effectuées à l'aide des styles.
	function isUpperCase (textInput) {  
	  return textInput === String(textInput).toUpperCase();
	}
	const nia05n_h1 = document.querySelector("h1");
	const nia05n_h2 = document.querySelector("h2");
	const nia05n_h3 = document.querySelector("h3");
	const nia05n_h4 = document.querySelector("h4");
	const nia05n_h5 = document.querySelector("h5");
	const nia05n_h6 = document.querySelector("h6");
	if(nia05n_h1 && isUpperCase(nia05n_h1)){
		setItemOutline(nia05n_h1,"yellow","nia05n1","05-N");
		setItemToResultList("nth","<li><a href='#' data-destination='nia05n1' class='result-focus label-yellow'>05-N</a> : Présence de titre H1 en majuscule [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-mises-en-majuscules-a-des-fins-decoratives-sont-effectuees-a-laide-des-styles' target='_blank'>Opquast 187</a>]</li>");
	}
	if(nia05n_h2 && isUpperCase(nia05n_h2)){
		setItemOutline(nia05n_h2,"yellow","nia05n2","05-N");
		setItemToResultList("nth","<li><a href='#' data-destination='nia05n2' class='result-focus label-yellow'>05-N</a> : Présence de titre H2 en majuscule [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-mises-en-majuscules-a-des-fins-decoratives-sont-effectuees-a-laide-des-styles' target='_blank'>Opquast 187</a>]</li>");
	}
	if(nia05n_h1 && isUpperCase(nia05n_h3)){
		setItemOutline(nia05n_h3,"yellow","nia05n3","05-N");
		setItemToResultList("nth","<li><a href='#' data-destination='nia05n3' class='result-focus label-yellow'>05-N</a> : Présence de titre H3 en majuscule [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-mises-en-majuscules-a-des-fins-decoratives-sont-effectuees-a-laide-des-styles' target='_blank'>Opquast 187</a>]</li>");
	}
	if(nia05n_h1 && isUpperCase(nia05n_h4)){
		setItemOutline(nia05n_h4,"yellow","nia05n4","05-N");
		setItemToResultList("nth","<li><a href='#' data-destination='nia05n4' class='result-focus label-yellow'>05-N</a> : Présence de titre H4 en majuscule [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-mises-en-majuscules-a-des-fins-decoratives-sont-effectuees-a-laide-des-styles' target='_blank'>Opquast 187</a>]</li>");
	}
	if(nia05n_h1 && isUpperCase(nia05n_h5)){
		setItemOutline(nia05n_h5,"yellow","nia05n5","05-N");
		setItemToResultList("nth","<li><a href='#' data-destination='nia05n5' class='result-focus label-yellow'>05-N</a> : Présence de titre H5 en majuscule [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-mises-en-majuscules-a-des-fins-decoratives-sont-effectuees-a-laide-des-styles' target='_blank'>Opquast 187</a>]</li>");
	}
	if(nia05n_h1 && isUpperCase(nia05n_h6)){
		setItemOutline(nia05n_h6,"yellow","nia05n6","05-N");
		setItemToResultList("nth","<li><a href='#' data-destination='nia05n6' class='result-focus label-yellow'>05-N</a> : Présence de titre H6 en majuscule [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-mises-en-majuscules-a-des-fins-decoratives-sont-effectuees-a-laide-des-styles' target='_blank'>Opquast 187</a>]</li>");
	}

	// O. La page des résultats de recherche indique le nombre de résultats
	const nia05o_isSearch = document.getElementById("mainSearch");
	if(nia05o_isSearch){
		const nia05o_searchCount = document.querySelector(".search-meta-count");
		if(!nia05o_searchCount || !isItemVisible(nia05o_searchCount)){
			setItemToResultList("nc","<li><a href='#' data-destination='nia05o' class='result-focus label-red'>05-O</a> : La page des résultats de recherche indique le nombre de résultats [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/la-page-des-resultats-de-recherche-indique-le-nombre-de-resultats-le-nombre-de-pages-de-resultats-et-le-nombre-de-resultats-par-page' target='_blank'>Opquast 13</a>]</li>");
			setItemsOutline(nia05o_isSearch,"red","nia05o","05-O");
		}
	}
	
	// Y. TODO -->  Detect Overflow
	// https://stackoverflow.com/questions/143815/determine-if-an-html-elements-content-overflows
	// https://webtips.dev/webtips/javascript/find-overflowing-elements-with-javascript
	// https://www.stevefenton.co.uk/blog/2022/12/detect-overflowing-elements/
}