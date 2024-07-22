/*- -------------------------------------------------------------------------------- */
/* 15. Securité */
function check_part_15(){
	if(debug_flag) console.log("15 Sécurité");

	// A. Les liens externes qui ouvrent une nouvelle fenêtre ne partagent pas d'information de contexte.
	const nia15a_nodes = document.querySelectorAll('a[target="_blank"]:not([rel~="noreferrer"]):not([rel~="noopener"])');
	if(nia15a_nodes && nia15a_nodes.length > 0 && isItemsVisible(nia15a_nodes)){
	  setItemToResultList("dev","<li><a href='#' data-destination='nia15a' class='result-focus label-yellow'>15-A</a> : Doter chaque lien ayant un attribut target='_blank' d'un attribut rel='noreferrer noopener'. [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-liens-externes-qui-ouvrent-une-nouvelle-fenetre-ne-partagent-pas-dinformation-de-contexte' target='_blank'>Opquast 25</a>]</li>");
	  setItemsOutline(nia15a_nodes,"yellow","nia15a","15-A");
	}

	// B. Les pages utilisant le protocole HTTPS ne proposent pas de ressources HTTP.
	let nia15b_nodes = document.querySelectorAll('a[target="_blank"][href^="http://"]');
	/*if(isPrototype){
		nia15b_nodes = document.querySelectorAll('a[target="_blank"][href^="http://"]:not([href^="http://google"]):not([href^="http://www.google"]):not([href^="http://www.renow.public.lu"])');
	}*/
	if(nia15b_nodes && nia15b_nodes.length > 0 && isItemsVisible(nia15b_nodes)){
	  setItemToResultList("nth","<li><a href='#' data-destination='nia15b' class='result-focus label-yellow'>15-B</a> : Les pages utilisant le protocole HTTPS ne doivent pas proposer de ressources HTTP [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-pages-utilisant-le-protocole-https-ne-proposent-pas-de-ressources-http' target='_blank'>Opquast 195</a>]</li>");
	  setItemsOutline(nia15b_nodes,"yellow","nia15b","15-B");
	}
	
	// C. Toutes les pages utilisent le protocole HTTPS.
	if (window.location.protocol != "https:") {
		setItemToResultList("dev","<li><span class='result-focus label-red'>15-C</span> : Les pages doivent utiliser le protocole HTTPS [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/toutes-les-pages-utilisent-le-protocole-https' target='_blank'>Opquast 192</a>]</li>");
	}
	
	// D. Le code source de chaque page contient une métadonnée qui définit le jeu de caractères UTF-8
	const nia15d_node = document.querySelector('meta[charset="UTF-8"]');
	if(nia15d_node == null){
		setItemToResultList("dev","<li><span class='result-focus label-yellow'>15-D</span> : Le code source de chaque page contient une métadonnée qui définit le jeu de caractères UTF-8 [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-code-source-de-chaque-page-contient-une-metadonnee-qui-definit-le-jeu-de-caracteres' target='_blank'>Opquast 225</a>, <a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-codage-de-caracteres-utilise-est-utf-8' target='_blank'>226</a>]</li>");
	}
	
	/* TODO
	Règle n°185 : Une famille générique de police est indiquée comme dernier élément de substitution.
	Règle n°208 : Le serveur ne communique pas d'informations sur les logiciels et langages utilisés.
	*/
	
	// E Liens vers des documents en téléchargement
	const nia15e_nodes = document.querySelectorAll('a[href$=".doc"], a[href$=".docx"], a[href$=".xls"], a[href$=".xlsx"], a[href$=".ppt"], a[href$=".pptx"], a[href$=".txt"]');
	if(nia15e_nodes && nia15e_nodes.length > 0 && isItemsVisible(nia15e_nodes)){
	  setItemToResultList("nth","<li><a href='#' data-destination='nia15e' class='result-focus label-yellow'>15-E</a> : Vérifiez si ce document ne peut pas être fourni au formt PDF</li>");
	  setItemsOutline(nia15e_nodes,"yellow","nia15e","15-E");
	}

}