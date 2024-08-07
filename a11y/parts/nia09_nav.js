/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-09 Navigation 
- Pertinance du plan du site
- Tabindex : Mise en avant des éléments possédant un tabindex défini. Vérifier l'absence d’attribut « tabindex » positif dans le contenu*/
function check_part_09(){
	if(debug_flag) console.log("09 Navigation");

	if(currentUrl.includes("plan-du-site.html") || currentUrl.includes("plan.html") || currentUrl.includes("plan-site.html")){
		console.log("Page plan du site ");
		
		const nia09a1_footer = document.querySelectorAll('.page-footernav a[href*="contact"][href$=".html"]');
		const nia09a2_footer = document.querySelectorAll('.page-footernav a[href*="accessibilite"][href$=".html"]');
		const nia09a3_footer = document.querySelectorAll('.page-footernav a[href*="aspects-legaux"][href$=".html"]');
		const nia09a4_footer = document.querySelectorAll('.page-footernav a[href*="a-propos"][href$=".html"]');
		const nia09a5_footer = document.querySelectorAll('.page-footernav a[href*="aide"][href$=".html"]');
		
		const nia09a1_sitemap = document.querySelectorAll('.cmp-sitemap a[href*="contact"][href$=".html"]');
		const nia09a2_sitemap = document.querySelectorAll('.cmp-sitemap a[href*="accessibilite"][href$=".html"]');
		const nia09a3_sitemap = document.querySelectorAll('.cmp-sitemap a[href*="aspects-legaux"][href$=".html"]');
		const nia09a4_sitemap = document.querySelectorAll('.cmp-sitemap a[href*="a-propos"][href$=".html"]');
		const nia09a5_sitemap = document.querySelectorAll('.cmp-sitemap a[href*="aide"][href$=".html"]');
		
		const nia09a5_support = document.querySelectorAll('.cmp-sitemap a[href$="support.html"]');
		
		// Erreur si le lien existe dans le footer mais pas dans la map ou inversement
		
		if(nia09a1_footer && nia09a1_footer.length > 0 && (!nia09a1_sitemap || nia09a1_sitemap.length == 0)){
			if(nia09a5_support && nia09a5_support.length > 0){
				setItemToResultList("man","<li><a href='#' data-destination='nia09a1' class='result-focus label-yellow'>09-A</a> : Présence de la page support mais il manque la page contact dans le plan du site, vérifier si c'est volontaire [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>");
				setItemsOutline(nia09a1_footer,"yellow","nia09a1","09-A");
			}
			else {
				setItemToResultList("nc","<li><a href='#' data-destination='nia09a1' class='result-focus label-red'>09-A</a> : Il manque la page contact dans le plan du site [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>");
				setItemsOutline(nia09a1_footer,"red","nia09a1","09-A");
			}
		}
		else if(nia09a1_sitemap && nia09a1_sitemap.length > 0 && (!nia09a1_footer || nia09a1_footer.length == 0)){
		  setItemToResultList("nc","<li><a href='#' data-destination='nia09a1' class='result-focus label-red'>09-A</a> : Il manque la page contact dans le footer [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>");
		  setItemsOutline(nia09a1_sitemap,"red","nia09a1","09-A");
		}

		if(nia09a2_footer && nia09a2_footer.length > 0 && (!nia09a2_sitemap || nia09a2_sitemap.length == 0)){
			if(nia09a5_support && nia09a5_support.length > 0){
				setItemToResultList("man","<li><a href='#' data-destination='nia09a2' class='result-focus label-yellow'>09-A</a> : Présence de la page support mais il manque la page Accessibilté dans le plan du site, vérifier si c'est volontaire [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>");
				setItemsOutline(nia09a2_footer,"yellow","nia09a2","09-A");
			}
			else {
				setItemToResultList("nc","<li><a href='#' data-destination='nia09a2' class='result-focus label-red'>09-A</a> : Il manque la page Accessibilité dans le plan du site [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>");
				setItemsOutline(nia09a2_footer,"red","nia09a2","09-A");
			}
		}
		else if(nia09a2_sitemap && nia09a2_sitemap.length > 0 && (!nia09a2_footer || nia09a2_footer.length == 0)){
		  setItemToResultList("nc","<li><a href='#' data-destination='nia09a2' class='result-focus label-red'>09-A</a> : Il manque la page Accessibilité dans le footer [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>");
		  setItemsOutline(nia09a2_sitemap,"red","nia09a2","09-A");
		}
		
		if(nia09a3_footer && nia09a3_footer.length > 0 && (!nia09a3_sitemap || nia09a3_sitemap.length == 0)){
			if(nia09a5_support && nia09a5_support.length > 0){
				setItemToResultList("man","<li><a href='#' data-destination='nia09a3' class='result-focus label-yellow'>09-A</a> : Présence de la page support mais il manque la page Aspect légaux dans le plan du site, vérifier si c'est volontaire [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>");
				setItemsOutline(nia09a3_footer,"yellow","nia09a3","09-A");
			}
			else {
				setItemToResultList("nc","<li><a href='#' data-destination='nia09a3' class='result-focus label-red'>09-A</a> : Il manque la page aspect légaux dans le plan du site [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>");
				setItemsOutline(nia09a3_footer,"red","nia09a3","09-A");
			}
		}
		else if(nia09a3_sitemap && nia09a3_sitemap.length > 0 && (!nia09a3_footer || nia09a3_footer.length == 0)){
		  setItemToResultList("nc","<li><a href='#' data-destination='nia09a3' class='result-focus label-red'>09-A</a> : Il manque la page aspect légaux dans le footer [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>");
		  setItemsOutline(nia09a3_sitemap,"red","nia09a3","09-A");
		}
		
		if(nia09a4_footer && nia09a4_footer.length > 0 && (!nia09a4_sitemap || nia09a4_sitemap.length == 0)){
			if(nia09a5_support && nia09a5_support.length > 0){
				setItemToResultList("man","<li><a href='#' data-destination='nia09a4' class='result-focus label-yellow'>09-A</a> : Présence de la page support mais il manque la page A propos dans le plan du site, vérifier si c'est volontaire [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>");
				setItemsOutline(nia09a4_footer,"yellow","nia09a4","09-A");
			}
			else{
				setItemToResultList("nc","<li><a href='#' data-destination='nia09a4' class='result-focus label-red'>09-A</a> : Il manque la page A propos dans le plan du site [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>");
				setItemsOutline(nia09a4_footer,"red","nia09a4","09-A");
			}
		}
		else if(nia09a4_sitemap && nia09a4_sitemap.length > 0 && (!nia09a4_footer || nia09a4_footer.length == 0)){
		  setItemToResultList("nc","<li><a href='#' data-destination='nia09a4' class='result-focus label-red'>09-A</a> : Il manque la page A propos dans le footer [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>");
		  setItemsOutline(nia09a4_sitemap,"red","nia09a4","09-A");
		}
		
		// Page indésirable dans le plan du site
		const nia09b_nodes = document.querySelector('.cmp-sitemap a[href*="error.html"]');
		if(nia09b_nodes && isItemVisible(nia09b_nodes)){
		  setItemToResultList("nth","<li><a href='#' data-destination='nia09b' class='result-focus label-orange'>09-B</a> : Presence de la page Error dans le plan du site</li>");
		  setItemsOutline(nia09b_nodes.parentElement,"orange","nia09b","09-B");
		}
	}

	// C. Presence d'attibut tabindex positif
	if(!only_redactor){
		const nia09c_nodes = document.querySelectorAll('[tabindex]:not([tabindex="0"]):not([tabindex="-1"])');
		if(nia09c_nodes && nia09c_nodes.length > 0 && isItemsVisible(nia09c_nodes)){
		  setItemToResultList("nth","<li><a href='#' data-destination='nia09c' class='result-focus label-orange'>09-C</a> : Presence d'attibut tabindex positif [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-8-1' target='_blank'>RAWeb 12.8.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/la-navigation-au-clavier-seffectue-dans-un-ordre-previsible' target='_blank'>Opquast 162</a>]</li>");
		  setItemsOutline(nia09c_nodes,"orange","nia09c","09-C");
		}
	}

	// D. 2 systemes de navigation (plan du site, recherche, menu)
	const nia09d_nav = document.querySelector('nav #headernav, nav#headernav');
	const nia09d_search = document.querySelector('div.topsearch[role="search"],div.topsearch-desk[role="search"]');
	const nia09d_plan = document.querySelector('.page-footernav ul.nav--support > li.nav-item a[href*="plan"][href$=".html"]');
	const nia09d_nav_btn = document.querySelector('[class^=page-headernav] button.anchor');
	const nia09d_search_btn = document.querySelector('div.topsearch[role="search"] button.anchor');
	const nia09d_footer_links = document.querySelectorAll('footer .nav-item > a:not([target="_blank"])');
	
	let nia09d_counter = 0;
	if(nia09d_nav && isItemVisible(nia09d_nav)){nia09d_counter++;}
	else if(nia09d_nav && nia09d_nav_btn && isItemVisible(nia09d_nav_btn)){nia09d_counter++;}
	if(nia09d_search && isItemVisible(nia09d_search)){nia09d_counter++;}
	else if(nia09d_search && nia09d_search_btn && isItemVisible(nia09d_search_btn)){nia09d_counter++;}
	if(nia09d_plan && isItemVisible(nia09d_plan)){nia09d_counter++;}
	if(nia09d_counter < 2){
		if(nia09d_footer_links && nia09d_footer_links.length <= 3){
			setItemToResultList("man","<li><span class='result-focus label-yellow'>09-D</span> : Le site doit être muni de 2 systèmes de navigation (exception : One-page, etc.) [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-1-1' target='_blank'>RAWeb 12.1.1</a>]</li>");
		}
		else {
			setItemToResultList("nc","<li><span class='result-focus label-red'>09-D</span> : Le site doit être muni de 2 systèmes de navigation (exception : One-page, etc.) [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-1-1' target='_blank'>RAWeb 12.1.1</a>]</li>");
		}
	}
	
	// G. Skiplinks
	if(!only_redactor){
		const nia09e_main = document.querySelector('.skiplinks a[href="#main"]');
		if(nia09e_main == null){
			setItemToResultList("nc","<li><span class='result-focus label-red'>09-E</span> : Absence de skiplinks pour aller à la zone de contenu principale [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-7-1' target='_blank'>RAWeb 12.7.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-page-contient-des-liens-dacces-rapide-places-au-debut-du-code-source' target='_blank'>Opquast 159</a>]</li>");
		}
		
		const nia09e2_nodes = document.querySelectorAll('.skiplinks a[href]');
		let nia09e2_flag = false;
		let nia09e2_dest = "";
		if(nia09e2_nodes && nia09e2_nodes.length > 0){
			for(let i = 0; i < nia09e2_nodes.length; i++){
				nia09e2_dest = document.querySelector(nia09e2_nodes[i].getAttribute("href"))
				if(nia09e2_dest == null){
					if(debug_flag) console.log(nia09e2_nodes[i]);
					if(isItemDisplayNone(nia09e2_nodes[i])){
						setItemToResultList("man","<li><span class='result-focus label-yellow'>09-E</span> : Un skiplinks non visible (display:none) n'a pas de destination [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-7-1' target='_blank'>RAWeb 12.7.1</a>]</li>");
					}
					else{
						nia09e2_flag = true;
					}
				}
			}
		}
		if(nia09e2_flag == true){
		  setItemToResultList("dev","<li><span class='result-focus label-red'>09-E</span> : Un skiplinks n'est pas correctement lié à sa destination [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-7-1' target='_blank'>RAWeb 12.7.1</a>]</li>");
		}
	}

	// F taille des éléments interactifs minimum attendue est de 24px par 24px.
	if(!only_redactor){
		const nia09f_nodes = document.querySelectorAll('*:not(.cmp-text) > *:not(p) > a:not(.feed-item-timing):not(.cmp-breadcrumb__item-link):not(.geoportail-skip):not(.cmp-image__link), button, input, select, details, textarea, [tabindex="0"], [tabindex="-1"]');
		let nia09f_flag = false;
		let nia09f_rect, nia09f_rect_parent;
		let nia09f_horizontal = 0, nia09f_vertical = 0;
		let nia09f_horizontal_parent = 0, nia09f_vertical_parent = 0;
		if(nia09f_nodes && nia09f_nodes.length > 0){
			for(let i = 0; i < nia09f_nodes.length; i++){
				if(isItemVisible(nia09f_nodes[i]) && !isItemSROnly(nia09f_nodes[i])){
					nia09f_rect = nia09f_nodes[i].getBoundingClientRect();
					nia09f_horizontal = nia09f_rect["width"] + parseFloat(window.getComputedStyle(nia09f_nodes[i])['marginLeft']) + parseFloat(window.getComputedStyle(nia09f_nodes[i])['marginRight']);
					nia09f_vertical = nia09f_rect["height"] + parseFloat(window.getComputedStyle(nia09f_nodes[i])['marginTop']) + parseFloat(window.getComputedStyle(nia09f_nodes[i])['marginBottom']);

					if(nia09f_rect["width"] != 0 && nia09f_rect["height"] !=0){
						if(nia09f_horizontal < 24 || nia09f_vertical < 24){
							
							if(nia09f_nodes[i].parentElement.tagName == "LI" || nia09f_nodes[i].parentElement.childElementCount == 1){
								nia09f_rect_parent = nia09f_nodes[i].parentElement.getBoundingClientRect();
								nia09f_horizontal_parent = nia09f_nodes[i].parentElement.getBoundingClientRect()["width"] + parseFloat(window.getComputedStyle(nia09f_nodes[i].parentElement)['marginLeft']) + parseFloat(window.getComputedStyle(nia09f_nodes[i].parentElement)['marginRight']);
								nia09f_vertical_parent = nia09f_nodes[i].parentElement.getBoundingClientRect()["height"] + parseFloat(window.getComputedStyle(nia09f_nodes[i].parentElement)['marginTop']) + parseFloat(window.getComputedStyle(nia09f_nodes[i].parentElement)['marginBottom']);
								if(nia09f_horizontal_parent < 24 || nia09f_vertical_parent < 24){
							
									// console.log("09f1 : "+nia09f_horizontal+" "+nia09f_vertical);
									// console.log("09f2 : "+nia09f_horizontal_parent+" "+nia09f_vertical_parent);
									
									if(nia09f_vertical_parent > 18 && nia09f_horizontal_parent > 50){
										// Exception In-line : Par exemple un lien dans un texte
									}
									else {
										if(debug_flag) console.log(nia09f_rect);
										nia09f_flag = true;
										setItemOutline(nia09f_nodes[i],"yellow","nia09f","09-F");
									}
								}
							}
							else if(nia09f_nodes[i].parentElement.tagName != "P" && nia09f_nodes[i].parentElement.tagName != "SPAN" && nia09f_nodes[i].parentElement.tagName != "SMALL" && nia09f_nodes[i].parentElement.tagName != "DD" && nia09f_nodes[i].parentElement.tagName != "STRONG"){
								if(debug_flag) console.log(nia09f_rect);
								nia09f_flag = true;
								setItemOutline(nia09f_nodes[i],"yellow","nia09f","09-F");
							}
							else if(nia09f_vertical > 18 && nia09f_horizontal > 50){
								// Exception In-line : Par exemple un lien dans un texte
							}
							else {
								nia09f_flag = true;
								setItemOutline(nia09f_nodes[i],"yellow","nia09f","09-F");
							}
						}
					}
				}
			}
		}
		if(nia09f_flag == true){
		  setItemToResultList("man","<li><a href='#' data-destination='nia09f' class='result-focus label-yellow'>09-F</a> : Taille d'éléments interactifs minimum attendue est de 24px par 24px [<a href='https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html' target='_blank'>WCAG 2.2 SC258</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/la-taille-des-elements-cliquables-est-suffisante' target='_blank'>Opquast 181</a>]</li>");
		}
	}
}