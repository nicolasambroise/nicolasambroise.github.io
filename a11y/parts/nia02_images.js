/*- -------------------------------------------------------------------------------- */
/* 🗸 02 Images : Thématique RAWeb 1

Vérification de plusieurs points concernant les images : 
o	Présence d’un attribut alt sur toutes les images 
o	Vérification des attributs des svg, 
o	Alt vide sur les images de search logique. 
o	Absence de copyright/caption/légende sur une image Core V3,
o	Images v1 légendés presence du aria-label sur le figure */
function check_part_02(){
	if(debug_flag) console.log("02 Images");

	// A. Présence d’un attribut alt sur toutes les images 
	const nia02a1_nodes = document.querySelectorAll('*:not(.ol-overlay-container) > *:not(.ol-overlay-container) >  img:not([alt]):not([aria-label]):not([aria-labelledby]):not([title]), [role="image"]:not([aria-label]):not([aria-labelledby])');
	if(nia02a1_nodes && nia02a1_nodes.length > 0 && isItemsVisible(nia02a1_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia02a1' class='result-focus label-red'>02-A</a> : Présence de " + nia02a1_nodes.length + " images sans alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-1' target='_blank'>RAWeb 1.1.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-image-decorative-est-dotee-dune-alternative-textuelle-appropriee' target='_blank'>Opquast 111</a>]</li>");
	  setItemsOutline(nia02a1_nodes,"red","nia02a1","02-A");
	}
	
	const nia02a2_nodes = document.querySelectorAll('*:not(.ol-overlay-container) > *:not(.ol-overlay-container) > img:not([alt])');
	if(nia02a2_nodes && nia02a2_nodes.length > 0 && isItemsVisible(nia02a2_nodes)){
	  setItemToResultList("nth","<li><a href='#' data-destination='nia02a2' class='result-focus label-yellow'>02-A</a> : Présence de " + nia02a2_nodes.length + " images sans attribut alt [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-1' target='_blank'>RAWeb 1.1.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-image-decorative-est-dotee-dune-alternative-textuelle-appropriee' target='_blank'>Opquast 111</a>]</li>");
	  setItemsOutline(nia02a2_nodes,"yellow","nia02a2","02-A");
	}

	// B. Vérification des attributs des svg, 
	const nia02b1_nodes = document.querySelectorAll('svg:not([aria-hidden="true"]):not(.iconset)'); 
	const nia02b2_nodes = document.querySelectorAll('svg:not([focusable="false"]):not(.iconset)');
	if(nia02b1_nodes && nia02b1_nodes.length > 0 && isItemsVisible(nia02b1_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia02b1' class='result-focus label-red'>02-B</a> : Absence de certains attributs sur des SVG (aria-hidden=true) [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-4' target='_blank'>RAWeb 1.2.4</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-image-decorative-est-dotee-dune-alternative-textuelle-appropriee' target='_blank'>Opquast 111</a>]</li>");
	  setItemsOutline(nia02b1_nodes,"red","nia02b1","02-B");
	}
	if(nia02b2_nodes && nia02b2_nodes.length > 0 && isItemsVisible(nia02b2_nodes)){
	  setItemToResultList("nth","<li><a href='#' data-destination='nia02b2' class='result-focus label-orange'>02-B</a> : Absence de certains attributs sur des SVG (focusable=false) [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-image-decorative-est-dotee-dune-alternative-textuelle-appropriee' target='_blank'>Opquast 111</a>]</li>");
	  setItemsOutline(nia02b2_nodes,"orange","nia02b2","02-B");
	}
	
	const nia02b3_nodes = document.querySelectorAll('svg[role="img"]:not([title]):not([aria-labelledby]):not([aria-label])');
	if(nia02b3_nodes && nia02b3_nodes.length > 0 && isItemsVisible(nia02b3_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia02b3' class='result-focus label-red'>02-B</a> : Les images vectorielle porteuse d'information doivent posséder une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-5' target='_blank'>RAWeb 1.1.5</a>]</li>");
	  setItemsOutline(nia02b3_nodes,"red","nia02b3","02-B");
	}
	
	const nia02b4_nodes = document.querySelectorAll('svg[aria-hidden="true"][aria-label], svg[aria-hidden="true"][aria-labelledby]');
	if(nia02b4_nodes && nia02b4_nodes.length > 0 && isItemsVisible(nia02b4_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia02b4' class='result-focus label-red'>02-B</a> : Les images vectorielle de décoration ne doivent pas posséder une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-4' target='_blank'>RAWeb 1.2.4</a> - [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-image-decorative-est-dotee-dune-alternative-textuelle-appropriee' target='_blank'>Opquast 111</a>]</li>");
	  setItemsOutline(nia02b4_nodes,"red","nia02b4","02-B");
	}
	
	const nia02b5_nodes = document.querySelectorAll('svg[aria-hidden="true"] title, svg[aria-hidden="true"] desc');
	let nia02b5_flag = false;
	if(nia02b5_nodes && nia02b5_nodes.length > 0){
		for(let i = 0; i < nia02b5_nodes.length; i++){
			if(isItemsVisible(nia02b5_nodes[i]) && ((nia02b5_nodes[i].hasAttribute('title') && nia02b5_nodes[i].getAttribute('title').length > 0) || (nia02b5_nodes[i].hasAttribute('desc') && nia02b5_nodes[i].getAttribute('desc').length > 0))){
				setItemOutline(nia02b5_nodes[i],"red","nia02b5","02-B");
				nia02b5_flag = true;
			}
		}
	}
	if(nia02b5_flag == true){
		setItemToResultList("nc","<li><a href='#' data-destination='nia02b5' class='result-focus label-red'>02-B</a> : Les images vectorielle de décoration ne doivent pas posséder une alternative textuelle dans des balises 'title' ou 'desc' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-4' target='_blank'>RAWeb 1.2.4</a>]</li>");
	}
	
	// C. Alt vide sur les images de search logique. 
	const nia02c_nodes = document.querySelectorAll('.cmp-focus img:not([alt=""])');
	if(nia02c_nodes && nia02c_nodes.length > 0 && isItemsVisible(nia02c_nodes)){
	  setItemToResultList("dev","<li><a href='#' data-destination='nia02c' class='result-focus label-red'>02-C</a> : Présence de " + nia02c_nodes.length + " image de search-logic sans attribut alt vide</li>");
	  setItemsOutline(nia02c_nodes,"red","nia02c","02-C");
	}

	// D. Absence de copyright/caption/légende sur une image Core V3
	const nia02d_nodes = document.querySelectorAll('.cmp-image[data-cmp-hook-image="imageV3"] .cmp-image__title');
	if(nia02d_nodes && nia02d_nodes.length > 0 && isItemsVisible(nia02d_nodes)){
	  setItemToResultList("dev","<li><a href='#' data-destination='nia02d' class='result-focus label-orange'>02-D</a> : Présence d'un caption non lié correctement à son image</li>");
	  setItemsOutline(nia02d_nodes,"orange","nia02d","02-D");
	}
	
	// E. Images légendés presence du aria-label sur le figure
	const nia02e_nodes = document.querySelectorAll('figure[data-cmp-hook-image="figure"]:not([aria-label]) figcaption');
	if(nia02e_nodes && nia02e_nodes.length > 0 && isItemsVisible(nia02e_nodes)){
	  setItemToResultList("dev","<li><a href='#' data-destination='nia02e' class='result-focus label-orange'>02-E</a> : Les captions des images ne sont pas correctement restitué, il manque un attribut aria-label sur la balise figure</li>");
	  setItemsOutline(nia02e_nodes,"orange","nia02e","02-E");
	}
	
	// F. Vérification sur les images atypique
	const nia02f1_nodes = document.querySelectorAll('area:not([aria-label]):not([alt])');
	if(nia02f1_nodes && nia02f1_nodes.length > 0 && isItemsVisible(nia02f1_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia02f1' class='result-focus label-red'>02-F</a> : Les zones d'image réactive porteuse d'information doivent avoir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-2' target='_blank'>RAWeb 1.1.2</a>]</li>");
	  setItemsOutline(nia02f1_nodes,"red","nia02f1","02-F");
	}
	
	const nia02f2_nodes = document.querySelectorAll('input[type="image"]:not([alt]):not([aria-label]):not([aria-labelledby]):not([title])');
	if(nia02f2_nodes && nia02f2_nodes.length > 0 && isItemsVisible(nia02f2_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia02f2' class='result-focus label-red'>02-F</a> : Les boutons de type image (balise input avec attribut type=image doivent avoir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-3' target='_blank'>RAWeb 1.1.3</a>]</li>");
	  setItemsOutline(nia02f2_nodes,"red","nia02f2","02-F");
	}
	
	const nia02f3_nodes = document.querySelectorAll('object[type^="image/"]:not([role="img"]):not([aria-label]):not([aria-labelledby]):not([title])');
	if(nia02f3_nodes && nia02f3_nodes.length > 0 && isItemsVisible(nia02f3_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia02f3' class='result-focus label-red'>02-F</a> : Les images objects porteuses d'information doivent avoir une alternative textuelle - à vérifier manuellement la présence d'un mécaniseme de remplacement [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-6' target='_blank'>RAWeb 1.1.6</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-image-porteuse-dinformation-est-dotee-dune-alternative-textuelle-appropriee' target='_blank'>Opquast 113</a>]</li>");
	  setItemsOutline(nia02f3_nodes,"red","nia02f3","02-F");
	}

	const nia02f4_nodes = document.querySelectorAll('embed[type^="image/"]:not([role="img"]):not([aria-label]):not([aria-labelledby]):not([title])');
	if(nia02f4_nodes && nia02f4_nodes.length > 0 && isItemsVisible(nia02f4_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia02f4' class='result-focus label-red'>02-F</a> : Les images embarquée porteuses d'information doivent avoir une alternative textuelle - à vérifier manuellement la présence d'un mécaniseme de remplacement [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-7' target='_blank'>RAWeb 1.1.7</a>]</li>");
	  setItemsOutline(nia02f4_nodes,"red","nia02f4","02-F");
	}

	const nia02f5_nodes = document.querySelectorAll('canvas[type^="image/"]:not([role="img"]):not([aria-label]):not([aria-labelledby])');
	if(nia02f5_nodes && nia02f5_nodes.length > 0 && isItemsVisible(nia02f5_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia02f5' class='result-focus label-red'>02-F</a> : Les images bitmap (balise canvas) porteuses d'information doivent avoir une alternative textuelle - à vérifier manuellement la présence d'un mécaniseme de remplacement [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-1-8' target='_blank'>RAWeb 1.1.8</a>]</li>");
	  setItemsOutline(nia02f5_nodes,"red","nia02f5","02-F");
	}
	
	// G. Les images de décoration ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle
	const nia02g1_nodes = document.querySelectorAll('img:where([alt=""],[aria-hidden="true"],[role="presentation"],[role="none"]):where([aria-label][aria-labelledby][title])');
	if(nia02g1_nodes && nia02g1_nodes.length > 0 && isItemsVisible(nia02g1_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia02g1' class='result-focus label-red'>02-G</a> : Les images de décoration ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-1' target='_blank'>RAWeb 1.2.1</a>] </li>");
	  setItemsOutline(nia02g1_nodes,"red","nia02g1","02-G");
	}
	
	const nia02g2_nodes = document.querySelectorAll('area:not([href]):where([alt=""],[aria-hidden="true"],[role="presentation"],[role="none"]):where([aria-label],[aria-labelledby],[title])');
	if(nia02g2_nodes && nia02g2_nodes.length > 0 && isItemsVisible(nia02g2_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia02g2' class='result-focus label-red'>02-G</a> : Les zone non cliquable de décoration ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-2' target='_blank'>RAWeb 1.2.2</a>] </li>");
	  setItemsOutline(nia02g2_nodes,"red","nia02g2","02-G");
	}
	
	const nia02g3_nodes = document.querySelectorAll('object[type^="image/"][aria-hidden="true"]:where([aria-label],[aria-labelledby],[title])');
	if(nia02g3_nodes && nia02g3_nodes.length > 0 && isItemsVisible(nia02g3_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia02g3' class='result-focus label-red'>02-G</a> : Les images object de décoration ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-3' target='_blank'>RAWeb 1.2.3</a>] </li>");
	  setItemsOutline(nia02g3_nodes,"red","nia02g3","02-G");
	}
	
	const nia02g4_nodes = document.querySelectorAll('canvas[aria-hidden="true"]:where([aria-label],[aria-labelledby],[title])');
	if(nia02g4_nodes && nia02g4_nodes.length > 0 && isItemsVisible(nia02g4_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia02g4' class='result-focus label-red'>02-G</a> : Les images bitmap de décoration (canvas) ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-5' target='_blank'>RAWeb 1.2.5</a>] </li>");
	  setItemsOutline(nia02g4_nodes,"red","nia02g4","02-G");
	}
	
	const nia02g5_nodes = document.querySelectorAll('embed[type^="image/"][aria-hidden="true"]:where([aria-label],[aria-labelledby],[title])');
	if(nia02g5_nodes && nia02g5_nodes.length > 0 && isItemsVisible(nia02g5_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia02g4' class='result-focus label-red'>02-G</a> : Les images embarquées de décoration ne doivent pas avoir d'attributs permettant de fournir une alternative textuelle [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-6' target='_blank'>RAWeb 1.2.6</a>] </li>");
	  setItemsOutline(nia02g5_nodes,"red","nia02g5","02-G");
	}
	
	const nia02g6_nodes = document.querySelectorAll('object[type^="image/"][aria-hidden="true"]');
	let nia02g6_flag = false;
	if(nia02g6_nodes && nia02g6_nodes.length > 0){
	  for(let i = 0; i < nia02g6_nodes.length; i++){
	    if(isItemVisible(nia02g6_nodes[i]) && nia02g6_nodes[i].textContent.length > 0){
		  setItemOutline(nia02g6_nodes[i],"red","nia02g6","02-G");
		  nia02g6_flag = true;
		}
	  }
	}
	if(nia02g6_flag == true){
		 setItemToResultList("nc","<li><a href='#' data-destination='nia02g6' class='result-focus label-red'>02-G</a> : Les images object de décoration ne doivent pas avoir de contenu alternatif présent entre ses balises [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-3' target='_blank'>RAWeb 1.2.3</a>] </li>");
	}
	
	const nia02g7_nodes = document.querySelectorAll('canvas[aria-hidden="true"]');
	let nia02g7_flag = false;
	if(nia02g7_nodes && nia02g7_nodes.length > 0){
	  for(let i = 0; i < nia02g7_nodes.length; i++){
	    if(isItemVisible(nia02g7_nodes[i]) && nia02g7_nodes[i].textContent.length > 0){
		  setItemOutline(nia02g7_nodes[i],"red","nia02g7","02-G");
		  nia02g7_flag = true;
		}
	  }
	}
	if(nia02g7_flag == true){
		 setItemToResultList("nc","<li><a href='#' data-destination='nia02g7' class='result-focus label-red'>02-G</a> : Les images bitmap de décoration (canvas) ne doivent pas avoir de contenu alternatif présent entre ses balises [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-2-3' target='_blank'>RAWeb 1.2.3</a>] </li>");
	}
	
	// H. L'alternative doit être courte et concise - estimation max 150 caractères
	const nia02h_nodes = document.querySelectorAll(':where(img,svg,canvas,embed[type^="image/"],object[type^="image/"]):where([alt],[aria-label],[aria-labelledby],[title]):not([aria-hidden="true"]):not([role="presentation"]):not([role="none"])');
	let nia02h_flag = false;
	let nia02h_lang = "", nia02h_label = "";
	if(nia02h_nodes && nia02h_nodes.length > 0){
		for(let i = 0; i < nia02h_nodes.length; i++){
			nia02h_lang = nia02h_nodes[i].closest('[lang]').getAttribute('lang')
			if(nia02h_nodes[i].hasAttribute("aria-labelledby")){
				nia02h_label = document.querySelectorAll("[id='"+nia02h_nodes[i].getAttribute("aria-labelledby")+"']");
				if(!nia02h_label || nia02h_label.length != 1){
					setItemOutline(nia02h_nodes[i],"red","nia02h1","02-H");
					setItemToResultList("nc","<li><a href='#' data-destination='nia02h1' class='result-focus label-red'>02-H</a> : Problème de référence introuvable ur un attribut aria-labelledby</li>");
				}
				else if(sanitizeText(nia02h_label[0].textContent,nia02h_lang).length > 150){
					setItemOutline(nia02h_nodes[i],"yellow","nia02h","02-H");
					nia02h_flag = true;
				}
			}
			else if(nia02h_nodes[i].hasAttribute("aria-label") && sanitizeText(nia02h_nodes[i].getAttribute("aria-label"),nia02h_lang).length > 150){
				setItemOutline(nia02h_nodes[i],"yellow","nia02h","02-H");
				nia02h_flag = true;
			}
			else if(nia02h_nodes[i].hasAttribute("alt") && sanitizeText(nia02h_nodes[i].getAttribute("alt"),nia02h_lang).length > 150){
				setItemOutline(nia02h_nodes[i],"yellow","nia02h","02-H");
				nia02h_flag = true;
			}
			else if(nia02h_nodes[i].hasAttribute("title") && sanitizeText(nia02h_nodes[i].getAttribute("title"),nia02h_lang).length > 150){
				setItemOutline(nia02h_nodes[i],"yellow","nia02h","02-H");
				nia02h_flag = true;
			}
		}
	}
	if(nia02h_flag == true) {
	  setItemToResultList("nth","<li><a href='#' data-destination='nia02h' class='result-focus label-yellow'>02-H</a> : Présence d'alternative textuelle trop longue [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-1-3-9' target='_blank'>RAWeb 1.3.9</a>]</li>");
	}
	
	// I Chaque image-lien est dotée d'une alternative textuelle appropriée.
	const nia02i_nodes = document.querySelectorAll('a:not(.blocklink):has(> img)');
	let nia02i_title ="";
	let nia02i_flag = false;
	if(nia02i_nodes && nia02i_nodes.length > 0){
	  for(let i = 0; i < nia02i_nodes.length; i++){
			if(isItemVisible(nia02i_nodes[i])){
				if(nia02i_nodes[i].childElementCount == 1 && nia02i_nodes[i].getElementsByTagName("img")[0].getAttribute("alt") == ""){
					setItemOutline(nia02i_nodes[i],"yellow","nia02i","02-I");
					nia02i_flag = true;
				}
			}
		}
	}
	if(nia02i_flag == true) {
	  setItemToResultList("nth","<li><a href='#' data-destination='nia02i' class='result-focus label-yellow'>02-I</a> : Présence d'image-lien avec une alternative textuelle non pertinente [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-image-lien-est-dotee-dune-alternative-textuelle-appropriee' target='_blank'> Opquast 112</a>]</li>");
	}
	
	// J.Les vignettes et aperçus ne sont pas des images de taille supérieure redimensionnées côté client.
	const nia02j_nodes = document.querySelectorAll('*:not(.feed-item-content > p):not(.feed-item-header):not(.ol-full-screen-false) > img');
	let nia02j_css_h ="", nia02j_css_w ="",nia02j_html_h ="", nia02j_html_w ="",nia02j_natural_h ="", nia02j_natural_w ="";
	let nia02j_flag = false;
	let nia02j_ratio_max = 2.5;
	let nia02j_ratio_min = 0.5;
	if(nia02j_nodes && nia02j_nodes.length > 0){
		for(let i = 0; i < nia02j_nodes.length; i++){
			if(isItemVisible(nia02j_nodes[i])){
				nia02j_ratio_max = 2.5;
				if(Boolean(nia02j_nodes[i].closest(".search-result")) || Boolean(nia02j_nodes[i].closest(".cmp-focus"))){ 
					nia02j_ratio_max = 5;
					console.log(nia02j_ratio_max + " " + nia02j_nodes[i].getAttribute("src"));
				} // ratio 5 pour search-result  2.5 sinon
					
				nia02j_css_h = nia02j_nodes[i].height;
				nia02j_css_w = nia02j_nodes[i].width;
				nia02j_html_h = nia02j_nodes[i].getAttribute('height');
				nia02j_html_w = nia02j_nodes[i].getAttribute('width');
				nia02j_natural_h = nia02j_nodes[i].naturalHeight;
				nia02j_natural_w = nia02j_nodes[i].naturalWidth;
				
				if(nia02j_html_h && (Math.abs(nia02j_html_h/nia02j_css_h) < nia02j_ratio_min || Math.abs(nia02j_html_h/nia02j_css_h) > nia02j_ratio_max)){
					if(debug_flag) console.log("Html Height : "+ nia02j_html_h+" vs "+nia02j_css_h);
					setItemOutline(nia02j_nodes[i],"yellow","nia02j","02-J");
					nia02j_flag = true;
				}
				else if(nia02j_html_w && (Math.abs(nia02j_html_w/nia02j_css_w) < nia02j_ratio_min || Math.abs(nia02j_html_w/nia02j_css_w) > nia02j_ratio_max)){
					if(debug_flag) console.log("Html Width : "+ nia02j_html_w+" vs "+nia02j_css_w);
					setItemOutline(nia02j_nodes[i],"yellow","nia02j","02-J");
					nia02j_flag = true;
				}
				else if(Math.abs(nia02j_natural_h/nia02j_css_h) < nia02j_ratio_min || Math.abs(nia02j_natural_h/nia02j_css_h) > nia02j_ratio_max){
					if(debug_flag) console.log("Natural Height : "+ nia02j_natural_h+" vs "+nia02j_css_h);
					setItemOutline(nia02j_nodes[i],"yellow","nia02j","02-J");
					nia02j_flag = true;
				}
				else if(Math.abs(nia02j_natural_w/nia02j_css_w) < nia02j_ratio_min || Math.abs(nia02j_natural_w/nia02j_css_w) > nia02j_ratio_max){
					if(debug_flag) console.log("Natural Width : "+ nia02j_natural_w+" vs "+nia02j_css_w);
					setItemOutline(nia02j_nodes[i],"yellow","nia02j","02-J");
					nia02j_flag = true;
				}
			}
		}
	}
	if(nia02j_flag == true) {
	  setItemToResultList("nth","<li><a href='#' data-destination='nia02j' class='result-focus label-yellow'>02-J</a> : Présence d'image redimentionnées côté Client [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-vignettes-et-apercus-ne-sont-pas-des-images-de-taille-superieure-redimensionnees-cote-client' target='_blank'>Opquast 114</a>]</li>");
	}
}