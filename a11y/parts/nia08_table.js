/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-08 Tableau : Thématique RAWeb 5
 - vérification présence des bons attributs sur les tableaux. 
 - Eviter les éléments ajoutés par les copier/coller de word. 
 - Vérifier en particulier les attributs « scope » sur les éléments de header
*/
function check_part_08(){
	if(debug_flag) console.log("08 Tableau");

	// A. Attribut de tableau
	const nia08a_nodes = document.querySelectorAll(':where([role="table"],table:not([role="presentation"])) th:not([scope="row"]):not([scope="col"]):not([id]):not([headers]):not([role="rowheader"]):not([role="columnheader"]):not(:only-child)');
	if(nia08a_nodes && nia08a_nodes.length > 0 && isItemsVisible(nia08a_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia08a' class='result-focus label-red'>08-A</a> : Absence de l'attribut scope sur les en-tete de tableau [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-5-7-1' target='_blank'>RAWeb 5.7.1</a>]</li>");
	  setItemsOutline(nia08a_nodes,"red","nia08a","08-A");
	}
	
	// B. Attribut deprecated
	const nia08b_nodes = document.querySelectorAll(':where([role="table"],table):where([align],[bgcolor],[border],[frame],[cellpadding],[cellspacing],[width],[summary],[rules])');
	if(nia08b_nodes && nia08b_nodes.length > 0 && isItemsVisible(nia08b_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia08b' class='result-focus label-red'>08-B</a> : Presence d'attribut obsolete sur un tableau</li>");
	  setItemsOutline(nia08b_nodes,"red","nia08b","08-B");
	}

	// C. Attribut deprecated
	const nia08c_nodes = document.querySelectorAll('th[header], td[header]');
	if(nia08c_nodes && nia08c_nodes.length > 0 && isItemsVisible(nia08c_nodes)){
	  setItemToResultList("nth","<li><a href='#' data-destination='nia08c' class='result-focus label-yellow'>08-C</a> : Presence attributs header obsolete dans un tableau</li>");
	  setItemsOutline(nia08c_nodes,"yellow","nia08c","08-C");
	}
	
	// D. Tableau de mise en forme
	const nia08d_nodes = document.querySelectorAll('table[role="presentation"][summary], table[role="presentation"] :where(caption,thead,th,tfoot,[role="rowheader"],[role="columnheader"],td[scope],td[headers],td[axis])');
	if(nia08d_nodes && nia08d_nodes.length > 0 && isItemsVisible(nia08d_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia08d' class='result-focus label-red'>08-D</a> : Presence d'élements incompatible avec un tableau de mise en forme [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-5-8-1' target='_blank'>RAWeb 5.8.1</a>]</li>");
	  setItemsOutline(nia08d_nodes,"red","nia08d","08-D");
	}
	
	// E. Chaque tableau à un entete de ligne ou de colonne balisé avec th ou role="columnheader" ou role="rowheader" 
	const nia08e_nodes = document.querySelectorAll(':where([role="table"],table:not([role="presentation"]))');
	let nia08e_flag = false;
	let nia08e_html = "";
	if(nia08e_nodes && nia08e_nodes.length > 0){
		for(let i = 0; i < nia08e_nodes.length; i++){
			nia08e_html = nia08e_nodes[i].innerHTML;
			if(nia08e_html.indexOf('<th') < 0 && nia08e_html.indexOf(' role="columnheader"') < 0 && nia08e_html.indexOf(' role="rowheader"') < 0 ){
				if(debug_flag) console.log(nia08e_html);
				setItemOutline(nia08e_nodes[i],"red","nia08e","08-E");
				nia08e_flag = true;
			}
		}
	}
	if(nia08e_flag == true) {
	  setItemToResultList("nc","<li><a href='#' data-destination='nia08e' class='result-focus label-red'>08-E</a> : Présence d'un tableau de données sans en-tête [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-5-6-1' target='_blank'>RAWeb 5.6.1</a>]</li>");
	}
	
	// F Chaque tableau de donnée complexe possède un Caption() {
	const nia08f_nodes = document.querySelectorAll('table:not([summary]):not([aria-describedby]):not([role="presentation"])');
	let nia08f_flag_data = false;
	let nia08f_flag_complex = false;
	let nia08f_caption = "";
	if(nia08f_nodes && nia08f_nodes.length > 0 && isItemsVisible(nia08f_nodes)){
		for(let i = 0; i < nia08f_nodes.length; i++){
			nia08f_caption = nia08f_nodes[i].querySelector(':scope > caption')
			if(nia08f_caption == null || nia08f_caption.textContent == ""){
				if(debug_flag) console.log(nia08f_nodes[i]);
					if(isTableComplex(nia08f_nodes[i])){
						setItemOutline(nia08f_nodes[i],"red","nia08f1","08-F");
						nia08f_flag_complex = true;
					}
					else{
						setItemOutline(nia08f_nodes[i],"yellow","nia08f2","08-F");
						nia08f_flag_data = true;
					}
			}
		}
	}
	if(nia08f_flag_complex == true) {
	  setItemToResultList("nc","<li><a href='#' data-destination='nia08f1' class='result-focus label-red'>08-F</a> : Présence d'un tableau complexe sans résumé</li>");
	}	
	if(nia08f_flag_data == true) {
	  setItemToResultList("nth","<li><a href='#' data-destination='nia08f2' class='result-focus label-yellow'>08-F</a> : Présence d'un tableau de données sans résumé</li>");
	}	
	
	/* Tableau complexe : Lorsqu’un tableau de données contient des en-têtes qui ne sont pas répartis uniquement sur la première ligne et/ou la première colonne de la grille ou dont la portée n’est pas valable pour l’ensemble de la colonne ou de la ligne, on parle de tableau de données complexe. Il est alors nécessaire de fournir un « résumé » permettant d’en expliquer sa nature et sa structure afin d’en faciliter la consultation pour des utilisateurs de technologies d’assistance par exemple. */
	function isTableComplex(elem) {
		const th_etrange = elem.querySelectorAll('tbody > tr > *:not(*:first-child)')
		for(let i = 0; i < th_etrange.length; i++){
			if(th_etrange[i].nodeName == "TH") {return true;}
		}
		const th_all = elem.querySelectorAll('tr > th')
		for(let i = 0; i < th_all.length; i++){
			if(th_all[i].hasAttribute("rowSpan") && th_all[i].getAttribute("rowSpan") > 1) {return true;}
			if(th_all[i].hasAttribute("colSpan") && th_all[i].getAttribute("colSpan") > 1) {return true;}
		}
		return false;
	}
	
}