/*- -------------------------------------------------------------------------------- */
/* 11. Chgt de langue
- Langue : Vérifier que le contenu rédigé dans une langue étrangère possède un attribut « lang » pertinent
*/
function check_part_11(){
	if(debug_flag) console.log("11 Langue");

  // A. Absence de lang
  	const nia11a_nodes = document.querySelectorAll('html:not([lang])');
	if(nia11a_nodes && nia11a_nodes.length > 0 && isItemsVisible(nia11a_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia11a' class='result-focus label-red'>11-A</a> : Aucune langue défini par défaut sur la page [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-3-1' target='_blank'>RAWeb 8.3.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-code-source-de-chaque-page-indique-la-langue-principale-du-contenu' target='_blank'>Opquast 125</a>]</li>");
	  setItemsOutline(nia11a_nodes,"red","nia11a","11-A");
	}
	
	
	if(!isPrototype){
	  // B. Presence de lorem ipsum */
		const nia11b_nodes = document.querySelectorAll('.cmp-text');
		let nia11b_flag = false;
		if(nia11b_nodes && nia11b_nodes.length > 0){
			for(let i = 0; i < nia11b_nodes.length; i++){
				if(nia11b_nodes[i].textContent.includes('Lorem ipsum')){
					setItemOutline(nia11b_nodes[i],"orange","nia11b","11-B");
					nia11b_flag = true;
				}
			}
		}
		if(nia11b_flag == true) {
		  setItemToResultList("nth","<li><a href='#' data-destination='nia11b' class='result-focus label-orange'>11-B</a> : Présence de \"Lorem ipsum\" sur la page</li>");
		}
	}
}