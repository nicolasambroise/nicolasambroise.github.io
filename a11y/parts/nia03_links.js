/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-03 Lien - Thématique RAWeb 6
 - Liste des liens internes et externe, affichage des attributs title des liens et vérification d’erreurs courantes.
 */
function check_part_03(){
	if(debug_flag) console.log("03 Liens");

	// A. Verification de la présence du suffix sur les liens externe
	const nia03a_nodes = document.querySelectorAll('html[lang="fr"] a[target="_blank"]:not([title$="- Nouvelle fenêtre"]):not(.mapboxgl-ctrl-logo), html[lang="fr"] a[title$="- Nouvelle fenêtre"]:not([target="_blank"]), html[lang="en"] a[target="_blank"]:not([title$="- New window"]):not(.mapboxgl-ctrl-logo),html[lang="en"] a[title$="- New window"]:not([target="_blank"]), html[lang="de"] a[target="_blank"]:not([title$="- Neues Fenster"]):not(.mapboxgl-ctrl-logo),html[lang="de"] a[title$="- Neues Fenster"]:not([target="_blank"]),html[lang="lb"] a[target="_blank"]:not([title$="- Nei Fënster"]):not(.mapboxgl-ctrl-logo),html[lang="lb"] a[title$="- Nei Fënster"]:not([target="_blank"])');
	let nia03a_flag = false;
	let nia03a_lang;
	let nia03a_title;
	if(nia03a_nodes && nia03a_nodes.length > 0){
		for(let i = 0; i < nia03a_nodes.length; i++){
			if(isItemVisible(nia03a_nodes[i])){
				nia03a_lang = nia03a_nodes[i].closest('[lang]').getAttribute('lang');
				nia03a_title = nia03a_nodes[i].getAttribute("title");
				if(!nia03a_title || !((nia03a_title && nia03a_lang == "en" && nia03a_title.endsWith("- New window")) || (nia03a_title && nia03a_lang == "fr" && nia03a_title.endsWith("- Nouvelle fenêtre")) || (nia03a_title && nia03a_lang == "de" && nia03a_title.endsWith("- Neues Fenster")) || (nia03a_title && nia03a_lang == "lb" && nia03a_title.endsWith("- Nei Fënster")))){
					setItemOutline(nia03a_nodes[i],"yellow","nia03a","03-A");
					nia03a_flag = true;
				}
			}
		}
	}
	if(nia03a_flag == true){
	  setItemToResultList("dev","<li><a href='#' data-destination='nia03a' class='result-focus label-yellow'>03-A</a> : Vérifier la présence de suffixe sur les liens externes [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/lutilisateur-est-averti-des-ouvertures-de-nouvelles-fenetres' target='_blank'>Opquast 141</a>]</li>");
	}

	// B. Verification de titre vide
	const nia03b_nodes = document.querySelectorAll('a[title=" "],a[title="Nouvelle fenêtre"],a[title="- Nouvelle fenêtre"],a[title$="Nouvelle fenêtre - Nouvelle fenêtre"]');
	if(nia03b_nodes && nia03b_nodes.length > 0 && isItemsVisible(nia03b_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia03b' class='result-focus label-red'>03-B</a> : Vérifier qu'il n'y a pas de lien avec un titre vide [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-6.1.1' target='_blank'>RAWeb 6.1.1</a>]</li>");
	  setItemsOutline(nia03b_nodes,"red","nia03b","03-B");
	}

	// C. Probleme de lang
	const nia03c_nodes = document.querySelectorAll('html:not([lang="fr"]) *:not(.book-download) > a[title$="- Nouvelle fenêtre"]:not([lang="fr"]), html:not([lang="en"]) *:not(.book-download) > a[title$="- New window"]:not([lang="en"]), html:not([lang="de"]) *:not(.book-download) > a[title$="- Neues Fenster"]:not([lang="de"]), html:not([lang="lb"]) *:not(.book-download) > a[title$="- Nei Fënster"]:not([lang="lb"])');
	if(nia03c_nodes && nia03c_nodes.length > 0 && isItemsVisible(nia03c_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia03c' class='result-focus label-orange'>03-C</a> : Présence du suffixe 'Nouvelle fenêtre' sur une page non rédiger en français (de même pour les autres langues)</li>");
	  setItemsOutline(nia03c_nodes,"orange","nia03c","03-C");
	}
	
	// D. Présence d'un conflit dans les attribut de liens
	const nia03d_nodes = document.querySelectorAll('a[aria-label][aria-labelledby]');
	if(nia03d_nodes && nia03d_nodes.length > 0 && isItemsVisible(nia03d_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia03d' class='result-focus label-red'>03-D</a> : Présence d'un conflit dans les attributs des liens</li>");
	  setItemsOutline(nia03d_nodes,"red","nia03d","03-D");
	}

	// E. Vérifier que le title reprend à minimum le contenu textuel
	const nia03e_nodes = document.querySelectorAll("a[title]");
	let nia03e_flag = false;
	let nia03e_content = "", nia03e_title = "", nia03e_lang = "";
	if(nia03e_nodes && nia03e_nodes.length > 0){
		for(let i = 0; i < nia03e_nodes.length; i++){
			nia03e_lang = nia03e_nodes[i].closest('[lang]').getAttribute('lang')
			nia03e_title = sanitizeText(nia03e_nodes[i].getAttribute("title"),nia03e_lang);
			nia03e_innerText = nia03e_nodes[i].innerText;
			//console.log(nia03e_nodes[i].getElementsByClassName('checkA11YSpan').length);
			if(nia03e_nodes[i].getElementsByClassName('checkA11YSpan').length > 0){
				for(let j = 0; j < nia03e_nodes[i].getElementsByClassName('checkA11YSpan').length; j++){
					//console.log(nia03e_nodes[i].getElementsByClassName('checkA11YSpan')[j]);
					nia03e_innerText = nia03e_innerText.replace(nia03e_nodes[i].getElementsByClassName('checkA11YSpan')[j].textContent,'')
				}
			}
			nia03e_content = sanitizeText(nia03e_innerText,nia03e_lang);
			if(!nia03e_title.includes(nia03e_content) && !nia03e_title.includes(nia03e_content.replace(" pdf"," pdf "))){
				if(debug_flag) console.log("%cERROR","font-weight:700;color:darkred","["+nia03e_title+"] VS ["+nia03e_content+"] ");
				setItemOutline(nia03e_nodes[i],"red","nia03e","03-E");
				nia03e_flag = true;
			}
		}
	}
	if(nia03e_flag == true) {
	  setItemToResultList("nc","<li><a href='#' data-destination='nia03e' class='result-focus label-red'>03-E</a> : Présence de liens dont l'attribut title ne reprend pas le contenu textuel [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-6-1-5' target='_blank'>RAWeb 6.1.5</a>]</li>");
	}
	
	// F. Chaque lien a t'il un intitulé
	const nia03f_nodes = document.querySelectorAll('a:not([href^="#"]),[role="link"]:not([href^="#"])');
	let nia03f_flag = false;
	let nia03f_lang = "";
	if(nia03f_nodes && nia03f_nodes.length > 0){
		for(let i = 0; i < nia03f_nodes.length; i++){
			if(isItemVisible(nia03f_nodes[i])){
				nia03f_lang = nia03f_nodes[i].closest('[lang]').getAttribute('lang')
				//Ni dans l'attribut title, ni dans le contenu textuel, ni dans l'attribut alt des images enfants
				if( !(nia03f_nodes[i].hasAttribute("title") && sanitizeText(nia03f_nodes[i].getAttribute("title"),nia03f_lang).length > 0) && sanitizeText(nia03f_nodes[i].innerText).length == 0 && nia03f_nodes[i].querySelectorAll('img:not([alt=""]):not([aria-hidden="true"]):not([hidden])').length == 0){
					setItemOutline(nia03f_nodes[i],"red","nia03f","03-F");
					nia03f_flag = true;
				}
			}
		}
	}
	if(nia03f_flag == true) {
	  setItemToResultList("nc","<li><a href='#' data-destination='nia03f' class='result-focus label-red'>03-F</a> : Présence de liens dont le contenu est vide [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-6-2-1' target='_blank'>RAWeb 6.2.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-libelle-de-chaque-lien-decrit-sa-fonction-ou-la-nature-du-contenu-vers-lequel-il-pointe' target='_blank'>Opquast 131</a>]</li>");
	}
	
	// G. Présence de liens sans href
	const nia03g_nodes = document.querySelectorAll('a:not([href])');
	if(nia03g_nodes && nia03g_nodes.length > 0 && isItemsVisible(nia03g_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia03g' class='result-focus label-red'>03-G</a> : Présence d'un lien sans destination [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-6-1-1' target='_blank'>RAWeb 6.1.1</a>]</li>");
	  setItemsOutline(nia03g_nodes,"red","nia03g","03-G");
	}
	
	// H. Liens tel: mailto: fax:
	const nia03h_nodes = document.querySelectorAll('*:not(.mcgyver-slot) > a[href^="mailto:"],a[href^="fax:"],a[href^="tel:"]');
	let nia03h_flag = false;
	let nia03h_regexmail = /^((?=.+@)[A-Za-z0-9_-]+(\.[A-Za-z0-9_-]+)*@[A-Za-z0-9-]+(?:\.[A-Za-z0-9-]+)*(?:\.[A-Za-z]{2,}))$/;
	let nia03h_regexphone = /^((\+|00)|\((\+|00)[0-9]{1,4}\))?[0-9\+\-\s\(\)\.]*$/;
	let nia03h_content ="";
	
	if(nia03h_nodes && nia03h_nodes.length > 0){
	  for(let i = 0; i < nia03h_nodes.length; i++){
			if(isItemVisible(nia03h_nodes[i])){
				nia03h_content = nia03h_nodes[i].getAttribute("href");
				// Si mailto verification de la regex email
				if(nia03h_content.indexOf("mailto:") == 0 && nia03h_content.replace("mailto:","").match(nia03h_regexmail)){
					// OK
				}
				// Si tel ou fax verifiation de la regex tel
				else if(nia03h_content.indexOf("tel:") == 0 && nia03h_content.replace("tel:","").match(nia03h_regexphone)){
					// OK
				}
				else if(nia03h_content.indexOf("fax:") == 0 && nia03h_content.replace("fax:","").match(nia03h_regexphone)){
					// OK
				}
				else {
					setItemOutline(nia03h_nodes[i],"red","nia03h","03-H");
					nia03h_flag = true;
				}
			}
		}
	}
	if(nia03h_flag == true) {
	  setItemToResultList("nc","<li><a href='#' data-destination='nia03h' class='result-focus label-red'>03-H</a> : Présence de liens tel:, fax: ou mailto: non valide </li>");
	}
	
	// I Lien sur "ici" ou sur "lien"
	const nia03i_nodes = document.querySelectorAll('html[lang="fr"] a');
	let nia03i_content ="";
	let nia03i_flag = false;
	if(nia03i_nodes && nia03i_nodes.length > 0){
	  for(let i = 0; i < nia03i_nodes.length; i++){
			if(isItemVisible(nia03i_nodes[i])){
				nia03i_content = nia03i_nodes[i].innerHTML;
				if(nia03i_content == "ici" || nia03i_content == "cliquer ici" || nia03i_content == "cliquez ici" || nia03i_content == "lire la suite" || nia03i_content == "lien" ){
					setItemOutline(nia03i_nodes[i],"yellow","nia03i","03-I");
					nia03i_flag = true;
				}
			}
		}
	}
	if(nia03i_flag == true) {
	  setItemToResultList("nth","<li><a href='#' data-destination='nia03i' class='result-focus label-yellow'>03-I</a> : Présence de liens non pertinent [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-libelle-de-chaque-lien-decrit-sa-fonction-ou-la-nature-du-contenu-vers-lequel-il-pointe' target='_blank'> Opquast 132</a>]</li>");
	}
}