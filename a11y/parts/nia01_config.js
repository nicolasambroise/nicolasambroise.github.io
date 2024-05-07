/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-01 AEM Component 
- vérifie les points concernant la configuration des composants AEM suivant :  Intitulé de bouton menu,  Breadcrumb, Tooltip, Menu langue, Recherche, Vidéo, Menu
*/
function check_part_01(){
	if(debug_flag) console.log("01 AEM Component");

	// A. Position de bouton menu
	const nia01a_nodes = document.querySelectorAll('button.anchor[data-destination^="#headernav"]:not(.anchor-close)');
	let nia01a_flag = false;
	if(nia01a_nodes && nia01a_nodes.length > 0){
		for(let i = 0; i < nia01a_nodes.length; i++){
			if(nia01a_nodes[i].closest('nav') == null){
				setItemOutline(nia01a_nodes[i],"red","nia01a","01-A");
				nia01a_flag = true;
			}
		}
	}
	if(nia01a_flag == true) {
	  setItemToResultList("dev","<li><a href='#' data-destination='nia01a' class='result-focus label-red'>01-A</a> : Présence du bouton d'ouverture du menu en dehors de la balise nav</li>");
	}

	// B. Breadcrumb
	const nia01b_nodes = document.querySelectorAll('nav[id^=breadcrumb-] .cmp-breadcrumb__list > .cmp-breadcrumb__item:not([aria-current="page"]):last-child');
	if(nia01b_nodes && nia01b_nodes.length > 0 && isItemsVisible(nia01b_nodes)){
	  setItemToResultList("dev","<li><a href='#' data-destination='nia01b' class='result-focus label-yellow'>01-B</a> : Absence de l'attribut aria-current sur le dernier item du fils d'ariane --> Vérifier dans les propriétés de la page que celle-ci n'est pas cachée dans la navigation.</li>");
	  setItemsOutline(nia01b_nodes,"red","nia01b","01-B");
	}

	// C. Tooltip
	const nia01c_nodes = document.querySelectorAll('.search-view');
	if(nia01c_nodes && nia01c_nodes.length > 0 && isItemsVisible(nia01c_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia01c' class='result-focus label-red'>01-C</a> : Présence de tooltip non accessible sur les résultats de recherches [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-10-13-1' target='_blank'>RAWeb 10.13.1</a>]</li>");
	  setItemsOutline(nia01c_nodes,"red","nia01c","01-C");
	}

	// D. Menu langue
	const nia01d_nodes = document.querySelectorAll('nav[id^="language-"]:not([aria-label])');
	if(nia01d_nodes && nia01d_nodes.length > 0 && isItemsVisible(nia01d_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia01d' class='result-focus label-red'>01-D</a> : Absence de l'aria-label sur le menu de selection de langue (à ajouter dans le cqdialog)</li>");
	  setItemsOutline(nia01d_nodes,"red","nia01d","01-D");
	}

	// E. Video player
	const nia01e_nodes = document.querySelectorAll('.cmp-multiplayer .player_img img[alt="Lire la vidéo Youtube, voir légende ci-après"][lang]:not([lang="fr"])');
	if(nia01e_nodes && nia01e_nodes.length > 0 && isItemsVisible(nia01e_nodes)){
	  setItemToResultList("dev","<li><a href='#' data-destination='nia01e' class='result-focus label-orange'>01-E</a> : Traduction manquante dans le composant Multimedia Player</li>");
	  setItemsOutline(nia01e_nodes,"orange","nia01e","01-E");
	}

	// F. Menu

	/* F1. Check si le menu existe */
	const nia01f_menu = document.querySelector('nav.topnav > .page-headernav .navigation-container > ul.nav ,nav.page-headernav .navigation-container > ul.nav, nav.page-headernav-desk .navigation-container > ul.nav');
	let nia01f_hasPasserelle = false; 
	let nia01f_isModal = false; 
	if(nia01f_menu){
		const nia01f01_node = document.querySelector('nav#headernav:not([role="navigation"])');
		if(nia01f01_node && isItemVisible(nia01f01_node)){
		  setItemToResultList("dev","<li><a href='#' data-destination='nia01f01' class='result-focus label-orange'>01-F</a> : Role navigation absent de la barre de navigation</li>");
		  setItemsOutline(nia01f01_node,"orange","nia01f01","01-F");
		}
		const nia01f02_node = document.querySelector('nav#headernav:not([aria-label])');
		if(nia01f02_node && isItemVisible(nia01f02_node)){
		  setItemToResultList("dev","<li><a href='#' data-destination='nia01f02' class='result-focus label-yellow'>01-F</a> : Attribut Aria-label absent de la barre de navigation</li>");
		  setItemsOutline(nia01f02_node,"yellow","nia01f02","01-F");
		}

		// Check si un acces aux pages passerelles est disponible depuis la navigation
		const nia01f03_node = nia01f_menu.querySelector(':scope > li.has-subnav > a');
		if(nia01f03_node){
			nia01f_hasPasserelle = true;
			if(debug_flag) console.log(" - Le menu utilise des pages passerelles");
		}
		else{
			if(debug_flag) console.log(" - Le menu n'utilise pas de pages passerelles");
		}
		
		// Itération sur les items du menu
		const nia01f10_nodes = nia01f_menu.querySelectorAll(':scope > li');
		let nia01f10_flag = false;
		let nia01f_list21 = "", nia01f_list22 = "",nia01f_list23 = "",nia01f_list24 = "",nia01f_list31 = "", nia01f_list32 = "",nia01f_list33 = "",nia01f_list34 = "",nia01f_list41 = "", nia01f_list42 = "",nia01f_list43 = "",nia01f_list44 = "";
		if(nia01f10_nodes && nia01f10_nodes.length > 0){
			for(let i = 0; i < nia01f10_nodes.length; i++){
				if(isItemVisible(nia01f10_nodes[i])){
					let nia01f11_nodes = nia01f10_nodes[i].querySelectorAll(':scope > a, :scope > .quick-navigation > a');
					let nia01f12_nodes = nia01f10_nodes[i].querySelectorAll(':scope > button, :scope > .disclosure--container > button');
					let nia01f13_nodes = nia01f10_nodes[i].querySelectorAll(':scope > ul, :scope > .disclosure--container > ul');
					let iplusun = i+1; 
					if(nia01f10_nodes[i].classList.contains("has-subnav")){
						
						/* F2. Avec accès aux pages passerelles depuis la navigation: 
						Sur l'item de rubrique vérifier existance de (li.has-subnav > a) et de (li.has-subnav > button) + le button doit avoir l'attribut aria-expanded */
						if(nia01f_hasPasserelle){
							if(!nia01f11_nodes || nia01f11_nodes.length != 1){
								if(debug_flag) console.log(" - F2.1 Absence de lien pour se rendre à la page passerelle pour l'élément de menu n°"+iplusun);
								nia01f_list21 += iplusun+",";
								setItemOutline(nia01f10_nodes[i],"orange","nia01f21","01-F"); nia01f10_flag = true;
							}
							else if(!nia01f12_nodes || nia01f12_nodes.length != 1){
								if(debug_flag) console.log(" - F2.2 Absence de bouton pour déplier le sous-menu pour l'élement de menu n°"+iplusun);
								nia01f_list22 += iplusun+",";
								setItemOutline(nia01f10_nodes[i],"orange","nia01f22","01-F"); nia01f10_flag = true;
							}
							else if(!nia01f13_nodes || nia01f13_nodes.length !=1){
								if(debug_flag) console.log(" - F2.3 Un problème a été detecté pour l'élement de menu n°"+iplusun+" (absence de sous-menu alors que la classe has-subnav est présente)");
								nia01f_list23 += iplusun+",";
								setItemOutline(nia01f10_nodes[i],"orange","nia01f23","01-F"); nia01f10_flag = true;
							}
							else if(nia01f12_nodes && !nia01f12_nodes[0].hasAttribute("aria-expanded")){
								if(debug_flag) console.log(" - F2.4 Un problème a été detecté pour l'élement de menu n°"+iplusun+" (absence de l'attribut aria-expanded)");
								nia01f_list24 += iplusun+",";
								setItemOutline(nia01f10_nodes[i],"orange","nia01f24","01-F"); nia01f10_flag = true;
							}
							else{
								if(debug_flag) console.log(" - L'item de menu "+iplusun+" avec page passerelles et sous-menu est OK")
							}
						}

						/* F3. Sans l’accès aux pages passerelles depuis la navigation:
						Sur l'item de rubrique vérifier existance de (li.has-subnav > button) + cette item doit avoir l'attribut aria-expanded */
						else{
							if(nia01f11_nodes && nia01f11_nodes.length > 0){
								if(debug_flag) console.log(" - F3.1 Un problème a été detecté pour l'élement n°"+iplusun);
								nia01f_list31 += iplusun+",";
								setItemOutline(nia01f10_nodes[i],"orange","nia01f31","01-F"); nia01f10_flag = true;
							}
							else if(!nia01f12_nodes || nia01f12_nodes.length != 1){
								if(debug_flag) console.log(" - F3.2 Un problème a été detecté pour l'élement n°"+iplusun);
								nia01f_list32 += iplusun+",";
								setItemOutline(nia01f10_nodes[i],"orange","nia01f32","01-F"); nia01f10_flag = true;
							}
							else if(!nia01f13_nodes || nia01f13_nodes.length !=1){
								if(debug_flag) console.log(" - F3.3 Un problème a été detecté pour l'élement n°"+iplusun);
								nia01f_list33 += iplusun+",";
								setItemOutline(nia01f10_nodes[i],"orange","nia01f33","01-F"); nia01f10_flag = true;
							}
							else if(nia01f12_nodes && !nia01f12_nodes[0].hasAttribute("aria-expanded")){
								if(debug_flag) console.log(" - F3.4 Un problème a été detecté pour l'élement n°"+iplusun);
								nia01f_list34 += iplusun+",";
								setItemOutline(nia01f10_nodes[i],"orange","nia01f34","01-F"); nia01f10_flag = true;
							}
							else{
								if(debug_flag) console.log(" - L'item de menu "+iplusun+" sans page passerelles et sous-menu est OK")
							}
						}
					}
					else {
						/* F4 Vérifier que les élements (li:not(.has-subnav) > a) n'ont pas d'attribut aria-expanded ni aria-haspopup ni est suivi d'un élément ul */
						if(!nia01f11_nodes || nia01f11_nodes.length != 1){
							if(debug_flag) console.log(" - F4.1 Un problème a été detecté pour l'élement n°"+iplusun);
							nia01f_list41 += iplusun+",";
							setItemOutline(nia01f10_nodes[i],"orange","nia01f41","01-F"); nia01f10_flag = true;
						}
						else if(nia01f12_nodes && nia01f12_nodes.length > 0){
							if(debug_flag) console.log(" - F4.2 Un problème a été detecté pour l'élement n°"+iplusun);
							nia01f_list42 += iplusun+",";
							setItemOutline(nia01f10_nodes[i],"orange","nia01f42","01-F"); nia01f10_flag = true;
						}
						else if(nia01f13_nodes && nia01f13_nodes.length > 0){
							if(debug_flag) console.log(" - F4.3 Un problème a été detecté pour l'élement n°"+iplusun);
							nia01f_list43 += iplusun+",";
							setItemOutline(nia01f10_nodes[i],"orange","nia01f43","01-F"); nia01f10_flag = true;
						}
						else if(nia01f11_nodes && (nia01f11_nodes[0].hasAttribute("aria-expanded") || nia01f11_nodes[0].hasAttribute("aria-haspopup"))){
							if(debug_flag) console.log(" - F4.4 Un problème a été detecté pour l'élement n°"+iplusun);
							nia01f_list44 += iplusun+",";
							setItemOutline(nia01f10_nodes[i],"orange","nia01f44","01-F"); nia01f10_flag = true;
						}
						else{
							if(debug_flag) console.log(" - L'item de menu "+iplusun+" sans sous-menu est OK")
						}
					}
				}
			}
			
			if(nia01f_list21 != ""){
				setItemToResultList("dev","<li><a href='#' data-destination='nia01f21' class='result-focus label-orange'>01-F</a> Absence de lien pour se rendre à la page passerelle pour l'élément de menu n°"+nia01f_list21.slice(0,-1)+"</li>");
			}
			if(nia01f_list22 != ""){
				setItemToResultList("dev","<li><a href='#' data-destination='nia01f22' class='result-focus label-orange'>01-F</a> : Absence de bouton pour déplier le sous-menu pour l'élement de menu n°"+nia01f_list22.slice(0,-1)+"</li>");
			}
			if(nia01f_list23 != ""){
				setItemToResultList("dev","<li><a href='#' data-destination='nia01f23' class='result-focus label-orange'>01-F</a> : Un problème a été detecté pour l'élement de menu n°"+nia01f_list23.slice(0,-1)+" (absence de sous-menu alors que la classe has-subnav est présente)</li>");
			}
			if(nia01f_list24 != ""){
				setItemToResultList("dev","<li><a href='#' data-destination='nia01f24' class='result-focus label-orange'>01-F</a> : Un problème a été detecté pour l'élement de menu n°"+nia01f_list24.slice(0,-1)+" (absence de l'attribut aria-expanded)</li>");
			}
			if(nia01f_list31 != ""){
				setItemToResultList("dev","<li><a href='#' data-destination='nia01f31' class='result-focus label-orange'>01-F</a> : Un problème a été detecté pour l'élement n°"+nia01f_list31.slice(0,-1)+"</li>");
			}
			if(nia01f_list32 != ""){
				setItemToResultList("dev","<li><a href='#' data-destination='nia01f32' class='result-focus label-orange'>01-F</a> : Un problème a été detecté pour l'élement n°"+nia01f_list32.slice(0,-1)+"</li>");
			}
			if(nia01f_list33 != ""){
				setItemToResultList("dev","<li><a href='#' data-destination='nia01f33' class='result-focus label-orange'>01-F</a> : Un problème a été detecté pour l'élement n°"+nia01f_list33.slice(0,-1)+"</li>");
			}
			if(nia01f_list34 != ""){
				setItemToResultList("dev","<li><a href='#' data-destination='nia01f34' class='result-focus label-orange'>01-F</a> : Un problème a été detecté pour l'élement n°"+nia01f_list34.slice(0,-1)+"</li>");
			}
			if(nia01f_list41 != ""){
				setItemToResultList("dev","<li><a href='#' data-destination='nia01f41' class='result-focus label-orange'>01-F</a> : Un problème a été detecté pour l'élement n°"+nia01f_list41.slice(0,-1)+"</li>");
			}
			if(nia01f_list42 != ""){
				setItemToResultList("dev","<li><a href='#' data-destination='nia01f42' class='result-focus label-orange'>01-F</a> : Un problème a été detecté pour l'élement n°"+nia01f_list42.slice(0,-1)+"</li>");
			}
			if(nia01f_list43 != ""){
				setItemToResultList("dev","<li><a href='#' data-destination='nia01f43' class='result-focus label-orange'>01-F</a> : Un problème a été detecté pour l'élement n°"+nia01f_list43.slice(0,-1)+"</li>");
			}
			if(nia01f_list44 != ""){
				setItemToResultList("dev","<li><a href='#' data-destination='nia01f44' class='result-focus label-orange'>01-F</a> : Un problème a été detecté pour l'élement n°"+nia01f_list44.slice(0,-1)+"</li>");
			}
		}
		if(nia01f10_flag == true){
			setItemToResultList("dev","<li><span class='result-focus label-orange'>01-F</span> : Faiblesse dans l'accessibilité du menu Desktop</li>");
		}
		
		// On resize pour voir le menu (Attention certain attributs sont ajouté en JS)
		/*
		window.resizeTo(320, 500);
		document.body.style.zoom = "400%";
		*/
		
			// Check si le menu mobile s'ouvre en disclosure ou en modale
			const nia01f20_btn = document.querySelector('.topnav > button.anchor.anchor-scroll, .page-headernav > button.anchor.anchor-scroll, .page-headernavmobile > button.anchor.anchor-scroll');
			if(nia01f20_btn && isItemVisible(nia01f20_btn)){
				const nia01f20_btnText = nia01f20_btn.innerText;
				const nia01f20_btnDest = nia01f20_btn.getAttribute("data-destination");
				const nia01f30_Dest = document.querySelector(nia01f20_btnDest);
				
				if(!nia01f20_btn.hasAttribute("aria-expanded")){
					nia01f_isModal = true;
					if(debug_flag) console.log(" - Le menu mobile s'ouvre dans une modale");
					
					if(!nia01f20_btn.hasAttribute("aria-haspopup")){
						if(debug_flag) console.log(" - F5.1 : Absence de l'attribut aria-haspopup=dialog du bouton d'ouverture du menu");
						setItemToResultList("dev","<li><a href='#' data-destination='nia01f51' class='result-focus label-yellow'>01-F</a> : Absence de l'attribut aria-haspopup=dialog du bouton d'ouverture du menu</li>");
						setItemOutline(nia01f20_btn,"yellow","nia01f51","01-F");
					}
				}
				else{
					if(debug_flag) console.log(" - Le menu mobile s'ouvre dans un disclosure");
					
					if(nia01f20_btn.getAttribute("aria-expanded") == true){
						if(debug_flag) console.log(" - F5.2 : Erreur dans la valeur de l'attribut aria-expanded du bouton d'ouverture du menu");
						setItemToResultList("dev","<li><a href='#' data-destination='nia01f52' class='result-focus label-red'>01-F</a> : Erreur dans la valeur de l'attribut aria-expanded du bouton d'ouverture du menu</li>");
						setItemOutline(nia01f20_btn,"red","nia01f52","01-F");
					}
					
					if(!(Boolean(nia01f30_Dest.closest('[role="dialog"]')) || Boolean(nia01f30_Dest.closest('[aria-modal="true"]')))){
						if(debug_flag) console.log(" - F5.3 : Conflit dans le type d'ouverture du menu : Modal ou Disclosure ?");
						setItemToResultList("dev","<li><a href='#' data-destination='nia01f53' class='result-focus label-red'>01-F</a> : Conflit dans le type d'ouverture du menu : Modal ou Disclosure ?</li>");
						setItemOutline(nia01f30_Dest,"red","nia01f53","01-F");
					}
				}
				if(nia01f30_Dest.hasAttribute("aria-hidden") && nia01f30_Dest.getAttribute("aria-hidden") == false){
					if(debug_flag) console.log(" - F5.4 : Vocalisation du menu caché en mobile");
					setItemToResultList("dev","<li><a href='#' data-destination='nia01f54' class='result-focus label-red'>01-F</a> : Vocalisation du menu caché en mobile</li>");
					setItemOutline(nia01f30_Dest,"red","nia01f54","01-F");
				}
			
				// On click sur le bouton pour ouvrir le menu
				nia01f20_btn.click();
				
				const lang = nia01f20_btn.closest('[lang]').getAttribute('lang');
				
				if(sanitizeText(nia01f20_btn.innerText) != sanitizeText(nia01f20_btnText)){
					if(debug_flag) console.log(" - F6.1 Attention le texte du bouton d'ouverture du menu à changé cela ne devrai pas être le cas");
					if(debug_flag) console.log(nia01f20_btn.innerText);
					if(debug_flag) console.log(nia01f20_btnText);
					setItemToResultList("dev","<li><a href='#' data-destination='nia01f61' class='result-focus label-red'>01-F</a> : Attention le texte du bouton d'ouverture du menu change à l'ouverture du menu cela ne devrai pas être le cas</li>");
					setItemOutline(nia01f20_btn,"red","nia01f61","01-F");
				}
				
				if(nia01f_isModal){
					// une fois ouvert, #headernav-mobile possède un attribut aria-hidden="false" aria-modal="true" role="dialog" aria-label="Menu principal"
					if(nia01f30_Dest.hasAttribute("aria-hidden") && nia01f30_Dest.getAttribute("aria-hidden") != "false"){
						if(debug_flag) console.log(" - F6.2 Erreur dans la valeur de l'attribut aria-hidden du menu modal ouvert");
						if(debug_flag) console.log(nia01f30_Dest.getAttribute("aria-hidden"));
						if(debug_flag) console.log(nia01f30_Dest.getAttribute("aria-hidden") != "false");
						setItemToResultList("dev","<li><a href='#' data-destination='nia01f62' class='result-focus label-red'>01-F</a> : Erreur dans la valeur de l'attribut aria-hidden du menu modal ouvert</li>");
						setItemOutline(nia01f30_Dest,"red","nia01f62","01-F");
					}
					
					if(!nia01f30_Dest.hasAttribute("aria-modal") || nia01f30_Dest.getAttribute("aria-modal") != "true"){
						if(debug_flag) console.log(" - F6.3 Erreur dans la valeur de l'attribut aria-modal du menu modal ouvert");
						if(debug_flag) console.log(!nia01f30_Dest.hasAttribute("aria-modal"));
						if(debug_flag) console.log(nia01f30_Dest.getAttribute("aria-modal") != "true");
						setItemToResultList("dev","<li><a href='#' data-destination='nia01f63' class='result-focus label-red'>01-F</a> : Erreur dans la valeur de l'attribut aria-modal du menu modal ouvert</li>");
						setItemOutline(nia01f30_Dest,"red","nia01f63","01-F");
					}
					
					if(!nia01f30_Dest.hasAttribute("role") || nia01f30_Dest.getAttribute("role") != "dialog"){
						if(debug_flag) console.log(" - F6.4 Erreur dans la valeur de l'attribut role du menu modal ouvert");
						setItemToResultList("dev","<li><a href='#' data-destination='nia01f64' class='result-focus label-red'>01-F</a> : Erreur dans la valeur de l'attribut role du menu modal ouvert</li>");
						setItemOutline(nia01f30_Dest,"red","nia01f64","01-F");
					}
					
					if(!(nia01f30_Dest.hasAttribute("aria-label") || nia01f30_Dest.hasAttribute("aria-labelledby"))){
						if(debug_flag) console.log(" - F6.5 Erreur dans la valeur de l'attribut aria-label du menu modal ouvert");
						setItemToResultList("dev","<li><a href='#' data-destination='nia01f65' class='result-focus label-red'>01-F</a> : Erreur dans la valeur de l'attribut aria-label du menu modal ouvert</li>");
						setItemOutline(nia01f30_Dest,"red","nia01f65","01-F");
					}
					// le premier élément de cette modale est un button.anchor-close
					if(nia01f30_Dest.firstChild.tagName == 'BUTTON' && nia01f30_Dest.firstChild.className.contains("anchor-close")){
						if(debug_flag) console.log(" - F6.6 Erreur au niveau du bouton close du menu modal ouvert");
						setItemToResultList("dev","<li><a href='#' data-destination='nia01f66' class='result-focus label-red'>01-F</a> : Erreur au niveau du bouton close du menu modal ouvert</li>");
						setItemOutline(nia01f30_Dest,"red","nia01f66","01-F");
					}
				}
				else{
					// une fois ouvert, #headernav-mobile possède un attribut aria-hidden="false" - Absence de aria-modal="true" role="dialog"
					if(nia01f30_Dest.hasAttribute("aria-hidden") && nia01f30_Dest.getAttribute("aria-hidden") != false){
						if(debug_flag) console.log(" - F6.7 Erreur dans la valeur de l'attribut aria-hidden du menu disclosure ouvert");
						setItemToResultList("dev","<li><a href='#' data-destination='nia01f67' class='result-focus label-red'>01-F</a> : Erreur dans la valeur de l'attribut aria-hidden du menu disclosure ouvert</li>");
						setItemOutline(nia01f30_Dest,"red","nia01f67","01-F");
					}
					
					if(nia01f30_Dest.hasAttribute("aria-modal") && nia01f30_Dest.getAttribute("aria-modal") == true){
						if(debug_flag) console.log(" - F6.8 Erreur dans la valeur de l'attribut aria-modal du menu disclosure ouvert");
						setItemToResultList("dev","<li><a href='#' data-destination='nia01f68' class='result-focus label-red'>01-F</a> : Erreur dans la valeur de l'attribut aria-modal du menu disclosure ouvert</li>");
						setItemOutline(nia01f30_Dest,"red","nia01f68","01-F");
					}
					
					if(nia01f30_Dest.hasAttribute("role") && nia01f30_Dest.getAttribute("role") == "dialog"){
						if(debug_flag) console.log(" - F6.9 Erreur dans la valeur de l'attribut role du menu disclosure ouvert");
						setItemToResultList("dev","<li><a href='#' data-destination='nia01f69' class='result-focus label-red'>01-F</a> : Erreur dans la valeur de l'attribut role du menu disclosure ouvert</li>");
						setItemOutline(nia01f30_Dest,"red","nia01f69","01-F");
					}
				}
				
				nia01f20_btn.click();
			}
		//window.resizeTo(currentWidth, currentHeight);
	}
	else {
		  setItemToResultList("man","<li><span class='result-focus label-yellow'>01-F</span> : Absence de barre de navigation</li>");
	}
}