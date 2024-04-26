/* Script Check A11Y - Nicolas AMBROISE */


// Variables config globale
const debug_flag = true; // true -> affiche les logs
const wave_allow_credit = false; // autorise les credits wave

// Add JS
// - double sécurité pour que ce sript puisse également être appelé par l'extention chrome
if(!document.body.classList.contains('panel-injected')){
	let cssPanel = document.getElementById('injected-css');
	if (cssPanel === null) {
	  cssPanel = document.createElement('link');
	  cssPanel.id = 'injected-css';
	  cssPanel.rel = 'stylesheet';
	  cssPanel.href = 'https://nicolasambroise.github.io/a11y/stylePanel.css?v=' + Date.now();
	  document.getElementsByTagName('head')[0].appendChild(cssPanel);
	}
	
	let jsPart1 = document.getElementById('injected-js');
	if (jsPart1 === null) {
	  jsPart1 = document.createElement('script');
	  jsPart1.id = 'injected-js';
	  jsPart1.src = 'https://nicolasambroise.github.io/a11y/parts/test.js?v=' + Date.now();
	  document.getElementsByTagName('head')[0].appendChild(jsPart1);
	}
}

// Current URL
const currentUrl = window.location.href;
if(debug_flag) console.log(currentUrl);
const homepage = document.querySelector('h1.logo.logo--homepage');
let isHomepage = false;
let isPreview = false;
if(homepage) {isHomepage = true;}
if((currentUrl.includes("preview-") || currentUrl.includes("wcm")) && currentUrl.includes(".etat.lu")){isPreview = true;}
else if(currentUrl.includes("aem-test-")){isPreview = true;}

if(!currentUrl.includes(".public.lu") && !currentUrl.includes("gouvernement.lu") && !currentUrl.includes(".etat.lu")){
  alert("Ce Bookmarklet est à utiliser seulement sur les sites étatiques luxembourgeois");
}

// Current Size
const currentWidth = window.innerWidth;
const currentHeight = window.innerHeight;

// Init result message
let result_crit = "";
let result_nc = "";
let result_nth = "";
let result_dev = "";
let result_man = "";

/*- -------------------------------------------------------------------------------- */
/* Pre-processing */

// clean console
console.clear();

// Ouverture des Accordéons
const accordion = document.querySelectorAll('.cmp-accordion details');
for(let i = 0; i < accordion.length; i++){
	accordion[i].open = true;
}

// Ouverture des Adresses du Geoportail
function seeMoreAddress(){
	const address = document.querySelectorAll('.geoportail-addresses ul li');
	for(let i = 0; i < address.length; i++){
		address[i].style.display = "block";
	}
}
setTimeout(seeMoreAddress(),5000); // --> Todo : remplacer par un wait for geoportail data-loaded = true;

/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-01 AEM Component 
- vérifie les points concernant la configuration des composants AEM suivant :  Intitulé de bouton menu,  Breadcrumb, Tooltip, Menu langue, Recherche, Vidéo, Menu
*/
if(debug_flag) console.log("01 AEM Component");

	// A. Position de bouton menu
	const nia01a_nodes = document.querySelectorAll('button.anchor[data-destination^="#headernav"]:not(.anchor-close)');
	let nia01a_flag = false;
	if(nia01a_nodes && nia01a_nodes.length > 0){
		for(let i = 0; i < nia01a_nodes.length; i++){
			if(nia01a_nodes[i].parentElement.tagName != 'NAV' && nia01a_nodes[i].parentElement.parentElement.tagName != 'NAV'){
				// --> Todo : remplacer par un .closest(nav) plus propre ici
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
	const nia01f_menu = document.querySelector('nav.topnav > .page-headernav .navigation-container > ul.nav ,nav.page-headernav .navigation-container > ul.nav');
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
			console.log("Le menu utilise des pages passerelles");
		}
		else{
			console.log("Le menu n'utilise pas de pages passerelles");
		}
		
		// Itération sur les items du menu
		const nia01f10_nodes = nia01f_menu.querySelectorAll(':scope > li');
		let nia01f10_flag = false;
		let nia01f_list21 = "", nia01f_list22 = "",nia01f_list23 = "",nia01f_list24 = "",nia01f_list31 = "", nia01f_list32 = "",nia01f_list33 = "",nia01f_list34 = "",nia01f_list41 = "", nia01f_list42 = "",nia01f_list43 = "",nia01f_list44 = "";
		if(nia01f10_nodes && nia01f10_nodes.length > 0){
			for(let i = 0; i < nia01f10_nodes.length; i++){
				if(isItemVisible(nia01f10_nodes[i])){
					let nia01f11_nodes = nia01f10_nodes[i].querySelectorAll(':scope > a');
					let nia01f12_nodes = nia01f10_nodes[i].querySelectorAll(':scope > button');
					let nia01f13_nodes = nia01f10_nodes[i].querySelectorAll(':scope > ul');
					let iplusun = i+1; 
					if(nia01f10_nodes[i].classList.contains("has-subnav")){
						
						/* F2. Avec accès aux pages passerelles depuis la navigation: 
						Sur l'item de rubrique vérifier existance de (li.has-subnav > a) et de (li.has-subnav > button) + le button doit avoir l'attribut aria-expanded */
						if(nia01f_hasPasserelle){
							if(!nia01f11_nodes || nia01f11_nodes.length != 1){
								console.log("F2.1 Absence de lien pour se rendre à la page passerelle pour l'élément de menu n°"+iplusun);
								nia01f_list21 += iplusun+",";
								setItemOutline(nia01f10_nodes[i],"orange","nia01f21","01-F"); nia01f10_flag = true;
							}
							else if(!nia01f12_nodes || nia01f12_nodes.length != 1){
								console.log("F2.2 Absence de bouton pour déplier le sous-menu pour l'élement de menu n°"+iplusun);
								nia01f_list22 += iplusun+",";
								setItemOutline(nia01f10_nodes[i],"orange","nia01f22","01-F"); nia01f10_flag = true;
							}
							else if(!nia01f13_nodes || nia01f13_nodes.length !=1){
								console.log("F2.3 Un problème a été detecté pour l'élement de menu n°"+iplusun+" (absence de sous-menu alors que la classe has-subnav est présente)");
								nia01f_list23 += iplusun+",";
								setItemOutline(nia01f10_nodes[i],"orange","nia01f23","01-F"); nia01f10_flag = true;
							}
							else if(nia01f12_nodes && !nia01f12_nodes[0].hasAttribute("aria-expanded")){
								console.log("F2.4 Un problème a été detecté pour l'élement de menu n°"+iplusun+" (absence de l'attribut aria-expanded)");
								nia01f_list24 += iplusun+",";
								setItemOutline(nia01f10_nodes[i],"orange","nia01f24","01-F"); nia01f10_flag = true;
							}
							else{
								console.log("L'item de menu "+iplusun+" avec page passerelles et sous-menu est OK")
							}
						}

						/* F3. Sans l’accès aux pages passerelles depuis la navigation:
						Sur l'item de rubrique vérifier existance de (li.has-subnav > button) + cette item doit avoir l'attribut aria-expanded */
						else{
							if(nia01f11_nodes && nia01f11_nodes.length > 0){
								console.log("F3.1 Un problème a été detecté pour l'élement n°"+iplusun);
								nia01f_list31 += iplusun+",";
								setItemOutline(nia01f10_nodes[i],"orange","nia01f31","01-F"); nia01f10_flag = true;
							}
							else if(!nia01f12_nodes || nia01f12_nodes.length != 1){
								console.log("F3.2 Un problème a été detecté pour l'élement n°"+iplusun);
								nia01f_list32 += iplusun+",";
								setItemOutline(nia01f10_nodes[i],"orange","nia01f32","01-F"); nia01f10_flag = true;
							}
							else if(!nia01f13_nodes || nia01f13_nodes.length !=1){
								console.log("F3.3 Un problème a été detecté pour l'élement n°"+iplusun);
								nia01f_list33 += iplusun+",";
								setItemOutline(nia01f10_nodes[i],"orange","nia01f33","01-F"); nia01f10_flag = true;
							}
							else if(nia01f12_nodes && !nia01f12_nodes[0].hasAttribute("aria-expended")){
								console.log("F3.4 Un problème a été detecté pour l'élement n°"+iplusun);
								nia01f_list34 += iplusun+",";
								setItemOutline(nia01f10_nodes[i],"orange","nia01f34","01-F"); nia01f10_flag = true;
							}
							else{
								console.log("L'item de menu "+iplusun+" sans page passerelles et sous-menu est OK")
							}
						}
					}
					else {
						/* F4 Vérifier que les élements (li:not(.has-subnav) > a) n'ont pas d'attribut aria-expended ni aria-haspopup ni est suivi d'un élément ul */
						if(!nia01f11_nodes || nia01f11_nodes.length != 1){
							console.log("F4.1 Un problème a été detecté pour l'élement n°"+iplusun);
							nia01f_list41 += iplusun+",";
							setItemOutline(nia01f10_nodes[i],"orange","nia01f41","01-F"); nia01f10_flag = true;
						}
						else if(nia01f12_nodes && nia01f12_nodes.length > 0){
							console.log("F4.2 Un problème a été detecté pour l'élement n°"+iplusun);
							nia01f_list42 += iplusun+",";
							setItemOutline(nia01f10_nodes[i],"orange","nia01f42","01-F"); nia01f10_flag = true;
						}
						else if(nia01f13_nodes && nia01f13_nodes.length > 0){
							console.log("F4.3 Un problème a été detecté pour l'élement n°"+iplusun);
							nia01f_list43 += iplusun+",";
							setItemOutline(nia01f10_nodes[i],"orange","nia01f43","01-F"); nia01f10_flag = true;
						}
						else if(nia01f11_nodes && (nia01f11_nodes[0].hasAttribute("aria-expended") || nia01f11_nodes[0].hasAttribute("aria-haspopup"))){
							console.log("F4.4 Un problème a été detecté pour l'élement n°"+iplusun);
							nia01f_list44 += iplusun+",";
							setItemOutline(nia01f10_nodes[i],"orange","nia01f44","01-F"); nia01f10_flag = true;
						}
						else{
							console.log("L'item de menu "+iplusun+" sans sous-menu est OK")
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
					console.log("Le menu mobile s'ouvre dans une modale");
					
					if(!nia01f20_btn.hasAttribute("aria-haspopup")){
						console.log("F5.1 : Absence de l'attribut aria-haspopup=dialog du bouton d'ouverture du menu");
						setItemToResultList("dev","<li><a href='#' data-destination='nia01f51' class='result-focus label-yellow'>01-F</a> : Absence de l'attribut aria-haspopup=dialog du bouton d'ouverture du menu</li>");
						setItemOutline(nia01f20_btn,"yellow","nia01f51","01-F");
					}
				}
				else{
					console.log("Le menu mobile s'ouvre dans un disclosure");
					
					if(nia01f20_btn.getAttribute("aria-expanded") == true){
						console.log("F5.2 : Erreur dans la valeur de l'attribut aria-expanded du bouton d'ouverture du menu");
						setItemToResultList("dev","<li><a href='#' data-destination='nia01f52' class='result-focus label-red'>01-F</a> : Erreur dans la valeur de l'attribut aria-expanded du bouton d'ouverture du menu</li>");
						setItemOutline(nia01f20_btn,"red","nia01f52","01-F");
					}
					
					if(!(Boolean(nia01f30_Dest.closest('[role="dialog"]')) || Boolean(nia01f30_Dest.closest('[aria-modal="true"]')))){
						console.log("F5.3 : Conflit dans le type d'ouverture du menu : Modal ou Disclosure ?");
						setItemToResultList("dev","<li><a href='#' data-destination='nia01f53' class='result-focus label-red'>01-F</a> : Conflit dans le type d'ouverture du menu : Modal ou Disclosure ?</li>");
						setItemOutline(nia01f30_Dest,"red","nia01f53","01-F");
					}
				}
				if(nia01f30_Dest.hasAttribute("aria-hidden") && nia01f30_Dest.getAttribute("aria-hidden") == false){
					console.log("F5.4 : Vocalisation du menu caché en mobile");
					setItemToResultList("dev","<li><a href='#' data-destination='nia01f54' class='result-focus label-red'>01-F</a> : Vocalisation du menu caché en mobile</li>");
					setItemOutline(nia01f30_Dest,"red","nia01f54","01-F");
				}
			
				// On click sur le bouton pour ouvrir le menu
				nia01f20_btn.click();
				
				const lang = nia01f20_btn.closest('[lang]').getAttribute('lang');
				
				if(sanitizeText(nia01f20_btn.innerText) != sanitizeText(nia01f20_btnText)){
					console.log("F6.1 Attention le texte du bouton d'ouverture du menu à changé cela ne devrai pas être le cas");
					console.log(nia01f20_btn.innerText);
					console.log(nia01f20_btnText);
					setItemToResultList("dev","<li><a href='#' data-destination='nia01f61' class='result-focus label-red'>01-F</a> : Attention le texte du bouton d'ouverture du menu change à l'ouverture du menu cela ne devrai pas être le cas</li>");
					setItemOutline(nia01f20_btn,"red","nia01f61","01-F");
				}
				
				if(nia01f_isModal){
					// une fois ouvert, #headernav-mobile possède un attribut aria-hidden="false" aria-modal="true" role="dialog" aria-label="Menu principal"
					if(nia01f30_Dest.hasAttribute("aria-hidden") && nia01f30_Dest.getAttribute("aria-hidden") != "false"){
						console.log("F6.2 Erreur dans la valeur de l'attribut aria-hidden du menu modal ouvert");
						console.log(nia01f30_Dest.getAttribute("aria-hidden"));
						console.log(nia01f30_Dest.getAttribute("aria-hidden") != "false");
						setItemToResultList("dev","<li><a href='#' data-destination='nia01f62' class='result-focus label-red'>01-F</a> : Erreur dans la valeur de l'attribut aria-hidden du menu modal ouvert</li>");
						setItemOutline(nia01f30_Dest,"red","nia01f62","01-F");
					}
					
					if(!nia01f30_Dest.hasAttribute("aria-modal") || nia01f30_Dest.getAttribute("aria-modal") != "true"){
						console.log("F6.3 Erreur dans la valeur de l'attribut aria-modal du menu modal ouvert");
						console.log(!nia01f30_Dest.hasAttribute("aria-modal"));
						console.log(nia01f30_Dest.getAttribute("aria-modal") != "true");
						setItemToResultList("dev","<li><a href='#' data-destination='nia01f63' class='result-focus label-red'>01-F</a> : Erreur dans la valeur de l'attribut aria-modal du menu modal ouvert</li>");
						setItemOutline(nia01f30_Dest,"red","nia01f63","01-F");
					}
					
					if(!nia01f30_Dest.hasAttribute("role") || nia01f30_Dest.getAttribute("role") != "dialog"){
						console.log("F6.4 Erreur dans la valeur de l'attribut role du menu modal ouvert");
						setItemToResultList("dev","<li><a href='#' data-destination='nia01f64' class='result-focus label-red'>01-F</a> : Erreur dans la valeur de l'attribut role du menu modal ouvert</li>");
						setItemOutline(nia01f30_Dest,"red","nia01f64","01-F");
					}
					
					if(!(nia01f30_Dest.hasAttribute("aria-label") || nia01f30_Dest.hasAttribute("aria-labelledby"))){
						console.log("F6.5 Erreur dans la valeur de l'attribut aria-label du menu modal ouvert");
						setItemToResultList("dev","<li><a href='#' data-destination='nia01f65' class='result-focus label-red'>01-F</a> : Erreur dans la valeur de l'attribut aria-label du menu modal ouvert</li>");
						setItemOutline(nia01f30_Dest,"red","nia01f65","01-F");
					}
					// le premier élément de cette modale est un button.anchor-close
					if(nia01f30_Dest.firstChild.tagName == 'BUTTON' && nia01f30_Dest.firstChild.className.contains("anchor-close")){
						console.log("F6.6 Erreur au niveau du bouton close du menu modal ouvert");
						setItemToResultList("dev","<li><a href='#' data-destination='nia01f66' class='result-focus label-red'>01-F</a> : Erreur au niveau du bouton close du menu modal ouvert</li>");
						setItemOutline(nia01f30_Dest,"red","nia01f66","01-F");
					}
				}
				else{
					// une fois ouvert, #headernav-mobile possède un attribut aria-hidden="false" - Absence de aria-modal="true" role="dialog"
					if(nia01f30_Dest.hasAttribute("aria-hidden") && nia01f30_Dest.getAttribute("aria-hidden") != false){
						console.log("F6.7 Erreur dans la valeur de l'attribut aria-hidden du menu disclosure ouvert");
						setItemToResultList("dev","<li><a href='#' data-destination='nia01f67' class='result-focus label-red'>01-F</a> : Erreur dans la valeur de l'attribut aria-hidden du menu disclosure ouvert</li>");
						setItemOutline(nia01f30_Dest,"red","nia01f67","01-F");
					}
					
					if(nia01f30_Dest.hasAttribute("aria-modal") && nia01f30_Dest.getAttribute("aria-modal") == true){
						console.log("F6.8 Erreur dans la valeur de l'attribut aria-modal du menu disclosure ouvert");
						setItemToResultList("dev","<li><a href='#' data-destination='nia01f68' class='result-focus label-red'>01-F</a> : Erreur dans la valeur de l'attribut aria-modal du menu disclosure ouvert</li>");
						setItemOutline(nia01f30_Dest,"red","nia01f68","01-F");
					}
					
					if(nia01f30_Dest.hasAttribute("role") && nia01f30_Dest.getAttribute("role") == "dialog"){
						console.log("F6.9 Erreur dans la valeur de l'attribut role du menu disclosure ouvert");
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


/*- -------------------------------------------------------------------------------- */
/* 🗸 02 Images : Thématique RAWeb 1

Vérification de plusieurs points concernant les images : 
o	Présence d’un attribut alt sur toutes les images 
o	Vérification des attributs des svg, 
o	Alt vide sur les images de search logique. 
o	Absence de copyright/caption/légende sur une image Core V3,
o	Images v1 légendés presence du aria-label sur le figure */
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
	  setItemToResultList("nc","<li><a href='#' data-destination='nia02b1' class='result-focus label-red'>02-B</a> : Absence de certains attributs sur des SVG (aria-hidden=true) [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-image-decorative-est-dotee-dune-alternative-textuelle-appropriee' target='_blank'>Opquast 111</a>]</li>");
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
	  setItemToResultList("dev","<li><a href='#' data-destination='nia02c' class='result-focus label-yellow'>02-C</a> : Présence de " + nia02c_nodes.length + " image de search-logic sans attribut alt vide</li>");
	  setItemsOutline(nia02c_nodes,"red","nia02c","02-C");
	}

	// D. Absence de copyright/caption/légende sur une image Core V3
	const nia02d_nodes = document.querySelectorAll('.cmp-image[data-cmp-hook-image="imageV3"] .cmp-image__title');
	if(nia02d_nodes && nia02d_nodes.length > 0 && isItemsVisible(nia02d_nodes)){
	  setItemToResultList("dev","<li><a href='#' data-destination='nia02d' class='result-focus label-yellow'>02-D</a> : Présence d'un caption non lié correctement à son image</li>");
	  setItemsOutline(nia02d_nodes,"red","nia02d","02-D");
	}
	
	// E. Images légendés presence du aria-label sur le figure
	const nia02e_nodes = document.querySelectorAll('figure[data-cmp-hook-image="figure"]:not([aria-label]) figcaption');
	if(nia02e_nodes && nia02e_nodes.length > 0 && isItemsVisible(nia02e_nodes)){
	  setItemToResultList("dev","<li><a href='#' data-destination='nia02e' class='result-focus label-yellow'>02-E</a> : Les captions des images ne sont pas correctement restitué, il manque un attribut aria-label sur la balise figure</li>");
	  setItemsOutline(nia02e_nodes,"red","nia02e","02-E");
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
				
				nia02j_css_h = nia02j_nodes[i].height;
				nia02j_css_w = nia02j_nodes[i].width;
				nia02j_html_h = nia02j_nodes[i].getAttribute('height');
				nia02j_html_w = nia02j_nodes[i].getAttribute('width');
				nia02j_natural_h = nia02j_nodes[i].naturalHeight;
				nia02j_natural_w = nia02j_nodes[i].naturalWidth;
				
				if(nia02j_html_h && (Math.abs(nia02j_html_h/nia02j_css_h) < nia02j_ratio_min || Math.abs(nia02j_html_h/nia02j_css_h) > nia02j_ratio_max)){
					//if(debug_flag) console.log("Html Height : "+ nia02j_html_h+" vs "+nia02j_css_h);
					setItemOutline(nia02j_nodes[i],"yellow","nia02j","02-J");
					nia02j_flag = true;
				}
				else if(nia02j_html_w && (Math.abs(nia02j_html_w/nia02j_css_w) < nia02j_ratio_min || Math.abs(nia02j_html_w/nia02j_css_w) > nia02j_ratio_max)){
					//if(debug_flag) console.log("Html Width : "+ nia02j_html_w+" vs "+nia02j_css_w);
					setItemOutline(nia02j_nodes[i],"yellow","nia02j","02-J");
					nia02j_flag = true;
				}
				else if(Math.abs(nia02j_natural_h/nia02j_css_h) < nia02j_ratio_min || Math.abs(nia02j_natural_h/nia02j_css_h) > nia02j_ratio_max){
					//if(debug_flag) console.log("Natural Height : "+ nia02j_natural_h+" vs "+nia02j_css_h);
					setItemOutline(nia02j_nodes[i],"yellow","nia02j","02-J");
					nia02j_flag = true;
				}
				else if(Math.abs(nia02j_natural_w/nia02j_css_w) < nia02j_ratio_min || Math.abs(nia02j_natural_w/nia02j_css_w) > nia02j_ratio_max){
					//if(debug_flag) console.log("Natural Width : "+ nia02j_natural_w+" vs "+nia02j_css_w);
					setItemOutline(nia02j_nodes[i],"yellow","nia02j","02-J");
					nia02j_flag = true;
				}
			}
		}
	}
	if(nia02j_flag == true) {
	  setItemToResultList("nth","<li><a href='#' data-destination='nia02j' class='result-focus label-yellow'>02-J</a> : Présence d'image redimentionnées côté Client [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-vignettes-et-apercus-ne-sont-pas-des-images-de-taille-superieure-redimensionnees-cote-client' target='_blank'>Opquast 114</a>]</li>");
	}
	
	
/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-03 Lien - Thématique RAWeb 6
 - Liste des liens internes et externe, affichage des attributs title des liens et vérification d’erreurs courantes.
 */
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
					setItemOutline(nia03a_nodes[i],"red","nia03a","03-A");
					nia03a_flag = true;
				}
			}
		}
	}
	if(nia03a_flag == true){
	  setItemToResultList("dev","<li><a href='#' data-destination='nia03a' class='result-focus label-red'>03-A</a> : Vérifier la présence de suffixe sur les liens externes [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/lutilisateur-est-averti-des-ouvertures-de-nouvelles-fenetres' target='_blank'>Opquast 141</a>]</li>");
	}

	// B. Verification de titre vide
	const nia03b_nodes = document.querySelectorAll('a[title=" "],a[title="Nouvelle fenêtre"],a[title="- Nouvelle fenêtre"],a[title$="Nouvelle fenêtre - Nouvelle fenêtre"]');
	if(nia03b_nodes && nia03b_nodes.length > 0 && isItemsVisible(nia03b_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia03b' class='result-focus label-red'>03-B</a> : Vérifier qu'il n'y a pas de lien avec un titre vide [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-6.1.1' target='_blank'>RAWeb 6.1.1</a>]</li>");
	  setItemsOutline(nia03b_nodes,"red","nia03b","03-B");
	}

	// C. Probleme de lang
	const nia03c_nodes = document.querySelectorAll('html:not([lang="fr"]) a[title$="- Nouvelle fenêtre"]:not([lang="fr"]), html:not([lang="en"]) a[title$="- New window"]:not([lang="en"]), html:not([lang="de"]) a[title$="- Neues Fenster"]:not([lang="de"]), html:not([lang="lb"]) a[title$="- Nei Fënster"]:not([lang="lb"])');
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
	  setItemToResultList("nc","<li><a href='#' data-destination='nia03f' class='result-focus label-red'>03-F</a> : Présence de liens dont le contenu est vide [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-6-1-5' target='_blank'>RAWeb 6.1.5</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-libelle-de-chaque-lien-decrit-sa-fonction-ou-la-nature-du-contenu-vers-lequel-il-pointe' target='_blank'>Opquast 131</a>]</li>");
	}
	
	// G. Présence de liens sans href
	const nia03g_nodes = document.querySelectorAll('a:not([href])');
	if(nia03g_nodes && nia03g_nodes.length > 0 && isItemsVisible(nia03g_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia03g' class='result-focus label-red'>03-G</a> : Présence d'un lien sans destination</li>");
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
	
/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-04 Formulaire - Thématique RAWeb 11
- Autocomplete : Mise en avant des champs de formulaire avec un attribut autocomplete et vérification de la présence des attributs autocomplete pertinent sur les champs de formulaire classique */
if(debug_flag) console.log("04 Formulaire");

	if(currentUrl.includes("contact.html")){

		// A. Champ générique 
		const nia04a1_nodes = document.querySelectorAll('input[name="name"]:not([autocomplete="family-name"]), input[name="lastname"]:not([autocomplete="family-name"])');
		if(nia04a1_nodes && nia04a1_nodes.length > 0){
		  setItemToResultList("nc","<li><a href='#' data-destination='nia04a1' class='result-focus label-red'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (name) - utiliser 'family-name' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]</li>");
		  setItemsOutline(nia04a1_nodes,"red","nia04a1","04-A");
		}
		const nia04a2_nodes = document.querySelectorAll('input[name="firstname"]:not([autocomplete="given-name"])');
		if(nia04a2_nodes && nia04a2_nodes.length > 0){
		  setItemToResultList("nc","<li><a href='#' data-destination='nia04a2' class='result-focus label-red'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (firstname) - utiliser 'given-name' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]</li>");
		  setItemsOutline(nia04a2_nodes,"red","nia04a2","04-A");
		}
		const nia04a3_nodes = document.querySelectorAll('input[type="email"]:not([autocomplete="email"])');
		if(nia04a3_nodes && nia04a3_nodes.length > 0){
		  setItemToResultList("nc","<li><a href='#' data-destination='nia04a3' class='result-focus label-red'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (email) - utiliser 'email' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]</li>");
		  setItemsOutline(nia04a3_nodes,"red","nia04a3","04-A");
		}
		const nia04a4_nodes = document.querySelectorAll('input[type="tel"]:not([autocomplete="tel"]), input[name="phone"]:not([autocomplete="tel"])');
		if(nia04a4_nodes && nia04a4_nodes.length > 0){
		  setItemToResultList("nc","<li><a href='#' data-destination='nia04a4' class='result-focus label-red'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (phone) - utiliser 'tel' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]</li>");
		  setItemsOutline(nia04a4_nodes,"red","nia04a4","04-A");
		}
		const nia04a5_nodes = document.querySelectorAll('input[name="postal"]:not([autocomplete="postal-code"]),input[type="postal-code"]:not([autocomplete="postal-code"])');
		if(nia04a5_nodes && nia04a5_nodes.length > 0){
		  setItemToResultList("nc","<li><a href='#' data-destination='nia04a5' class='result-focus label-red'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (postal) - utiliser 'postal-code' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]</li>");
		  setItemsOutline(nia04a5_nodes,"red","nia04a5","04-A");
		}
		const nia04a6_nodes = document.querySelectorAll('input[name="country"]:not([autocomplete="country-name"]), select[name="country"]:not([autocomplete="country"])');
		if(nia04a6_nodes && nia04a6_nodes.length > 0){
		  setItemToResultList("nc","<li><a href='#' data-destination='nia04a6' class='result-focus label-red'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (country) - utiliser 'country-name' ou 'country' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]</li>");
		  setItemsOutline(nia04a6_nodes,"red","nia04a6","04-A");
		}
		const nia04a7_nodes = document.querySelectorAll('input[name="matricule"][autocomplete]');
		if(nia04a7_nodes && nia04a7_nodes.length > 0 ){
		  setItemToResultList("nc","<li><a href='#' data-destination='nia04a7' class='result-focus label-red'>04-A</a> : Attribut erronée sur des champs formulaire (matricule) - Enlever l'attribut [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]</li>");
		  setItemsOutline(nia04a7_nodes,"red","nia04a7","04-A");
		}
		const nia04a8_nodes = document.querySelectorAll('input[name="city"]:not([autocomplete="address-level2"]), input[name="ville"]:not([autocomplete="address-level2"])');
		if(nia04a8_nodes && nia04a8_nodes.length > 0){
		  setItemToResultList("nc","<li><a href='#' data-destination='nia04a8' class='result-focus label-red'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (ville) - Utiliser 'address-level2' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]</li>");
		  setItemsOutline(nia04a8_nodes,"red","nia04a8","04-A");
		}
		const nia04a9_nodes = document.querySelectorAll('textarea[name="adresse"]:not([autocomplete="street-address"]), input[name="adresse"]:not([autocomplete="street-address"]), input[name="street"]:not([autocomplete="street-address"])');
		if(nia04a9_nodes && nia04a9_nodes.length > 0 ){
		  setItemToResultList("nc","<li><a href='#' data-destination='nia04a9' class='result-focus label-red'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (adresse) - Utiliser 'street-address' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]</li>");
		  setItemsOutline(nia04a9_nodes,"red","nia04a9","04-A");
		}
		const nia04a10_nodes = document.querySelectorAll('input[name="organisation"]:not([autocomplete="organization"]), input[name="organization"]:not([autocomplete="organization"]),input[name="organism"]:not([autocomplete="organization"])');
		if(nia04a10_nodes && nia04a10_nodes.length > 0 ){
		  setItemToResultList("nc","<li><a href='#' data-destination='nia04a10' class='result-focus label-red'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (organisation) - utiliser 'organization' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]</li>");
		  setItemsOutline(nia04a10_nodes,"red","nia04a10","04-A");
		}
		const nia04a11_nodes = document.querySelectorAll('input[name="fonction"]:not([autocomplete="organization-title"]), input[name="function"]:not([autocomplete="organization-title"])');
		if(nia04a11_nodes && nia04a11_nodes.length > 0 ){
		  setItemToResultList("nc","<li><a href='#' data-destination='nia04a11' class='result-focus label-red'>04-A</a> : Absence d'attribut autocomplete ou attribut erronée sur des champs formulaire (function) - utiliser 'organization-title' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]</li>");
		  setItemsOutline(nia04a11_nodes,"red","nia04a11","04-A");
		}
		
		// B. Vérifier le format sur l'email
		const nia04b_nodes = document.querySelectorAll('input[type="email"]');
		let nia04b_flag = false;
		let nia04b_id = "", nia04b_desc = "", nia04b_label = "", nia04b_help = "";
		if(nia04b_nodes && nia04b_nodes.length > 0){
			for(let i = 0; i < nia04b_nodes.length; i++){
				nia04b_id = "", nia04b_desc = "", nia04b_label = "", nia04b_help = "";
				nia04b_id = nia04b_nodes[i].getAttribute("id");
				nia04b_desc = nia04b_nodes[i].getAttribute("aria-describedby");
				if(nia04b_id && nia04b_id != ""){
					nia04b_label = document.querySelector("label[for='"+nia04b_id+"']");
					if(!nia04b_label){
						setItemOutline(nia04b_nodes[i],"red","nia04b","04-B");
						nia04b_flag = true;
					}
				}
				if(nia04b_desc && nia04b_desc != ""){
					nia04b_help = document.querySelector("[id="+nia04b_desc+"]");
					if(!nia04b_help){
						setItemOutline(nia04b_nodes[i],"red","nia04b","04-B");
						nia04b_flag = true;
					}
				}
				if((nia04b_label && nia04b_label != "" && nia04b_label.innerText.match(/^\S+@\S+\.\S+$/)) || (nia04b_help && nia04b_help != "" && nia04b_help.innerText.match(/^\S+@\S+\.\S+$/))){
					setItemOutline(nia04b_nodes[i],"red","nia04b","04-B");
					nia04b_flag = true;
				}
			}
		}
		if(nia04b_flag == true) {
		  setItemToResultList("nc","<li><a href='#' data-destination='nia04b' class='result-focus label-yellow'>04-B</a> : Présence de champs email sans exemple de format [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-10-5' target='_blank'>RAWeb 11.10.5</a>]</li>");
		}
		
		// C. Check intitulé bouton envoi 
		const nia04c_btn = document.querySelector('html[lang="fr"] form button.cmp-form-button[type="SUBMIT"][name="preview"]');
		if(nia04c_btn && nia04c_btn.textContent != "Prévisualiser puis envoyer" ){
		  setItemToResultList("nth","<li><a href='#' data-destination='nia04c' class='result-focus label-yellow'>04-C</a> : Vérifier si le bouton de soumission possède bien la notion de prévisualisation' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-12-1' target='_blank'>RAWeb 11.12.1</a>]</li>");
		  setItemsOutline(nia04c_btn,"yellow","nia04c","04-C");
		}
	}

	// C. Vérifier si les champs ont bien un label
	const nia04d_nodes = document.querySelectorAll("input:not([aria-label]):not([aria-labelledby]):not([type='hidden']):not([type='submit']):not([type='reset']):not([type='button']), select:not([aria-label]):not([aria-labelledby]), textarea:not([aria-label]):not([aria-labelledby])");
	let nia04d_flag1 = false;
	let nia04d_flag2 = false;
	let nia04d_label = "", nia04d_id = "";
	if(nia04d_nodes && nia04d_nodes.length > 0){
		for(let i = 0; i < nia04d_nodes.length; i++){
			if(isItemVisible(nia04d_nodes[i])){
				nia04d_id = nia04d_nodes[i].getAttribute("id");
				if(!nia04d_id || nia04d_id == ""){
					setItemOutline(nia04d_nodes[i],"red","nia04d","04-D");
					nia04d_flag1 = true;
				}
				else{
					nia04d_label = document.querySelectorAll("label[for='"+nia04d_id+"']");
					if(!nia04d_label || nia04d_label.length != 1){
						setItemOutline(nia04d_nodes[i],"red","nia04d","04-D");
						nia04d_flag2 = true;
					}
				}
			}
		}
	}
	if(nia04d_flag1 == true) {
		setItemToResultList("nc","<li><a href='#' data-destination='nia04d' class='result-focus label-red'>04-D</a> : Présence de champs sans label [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-1-1' target='_blank'>RAWeb 11.1.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-champ-de-formulaire-est-associe-dans-le-code-source-a-une-etiquette-qui-lui-est-propre' target='_blank'>Opquast 67</a>]</li>");
	}
	if(nia04d_flag2 == true) {
		setItemToResultList("nc","<li><a href='#' data-destination='nia04d' class='result-focus label-red'>04-D</a> : Présence de champs avec plus d'un label [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-1-1' target='_blank'>RAWeb 11.1.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-champ-de-formulaire-est-associe-dans-le-code-source-a-une-etiquette-qui-lui-est-propre' target='_blank'>Opquast 67</a>]</li>");
	}

	// E. fieldset avec legend
	const nia04e_nodes = document.querySelectorAll('fieldset');
	let nia04e_flag = false;
	if(nia04e_nodes && nia04e_nodes.length > 0){
		for(let i = 0; i < nia04e_nodes.length; i++){
			if(isItemVisible(nia04e_nodes[i])){
				if(nia04e_nodes[i].firstChild.tagName && nia04e_nodes[i].firstChild.tagName == "LEGEND"){
					// OK
				}
				else if(nia04e_nodes[i].firstChild.firstChild && nia04e_nodes[i].firstChild.firstChild.tagName && nia04e_nodes[i].firstChild.firstChild.tagName == "LEGEND"){
					// La balise légend est encapsulée dans un container
				}
				else if(sanitizeText(nia04e_nodes[i].firstChild.textContent) == "" && nia04e_nodes[i].firstChild.nextSibling && nia04e_nodes[i].firstChild.nextSibling.tagName == "LEGEND") {
					// Présence d'un élément décoratif avant la balise légende ( un \n, un pseudo-elem, etc.)
				}
				else{
					setItemsOutline(nia04e_nodes[i],"yellow","nia04e","04-E");
					nia04e_flag = true;
				}
			}
		}
	}
	if(nia04e_flag == true) {
		setItemToResultList("nc","<li><a href='#' data-destination='nia04e' class='result-focus label-red'>04-E</a> : Absence de la légende dans un filedset [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-6-1' target='_blank'>RAWeb 11.6.1</a>]'</li>");
	}

	// F. Required ou aria-required="true" possède un asterisque dans le label
	const nia04f_nodes = document.querySelectorAll('form [required]:not([required="false"]), form [aria-required="true"]');
	const nia04f_desc = document.querySelectorAll('.cmp-ratings, .cmp-form__mandatory-text, .mandatory-label')
	let nia04f_flag = false;
	let nia04f_id, nia04f_label;
	let nia04f_fieldset, nia04f_legend;
	if(nia04f_nodes && nia04f_nodes.length > 0){
		for(let i = 0; i < nia04f_nodes.length; i++){
			if(isItemVisible(nia04f_nodes[i])){
				if(nia04f_nodes[i].parentElement.tagName != "LABEL"){ 
					nia04f_id = nia04f_nodes[i].getAttribute("id");
					if(!nia04f_id || nia04f_id == ""){
						setItemOutline(nia04f_nodes[i],"red","nia04f","04-F");
						nia04f_flag = true;
					}
					else{
						nia04f_label = document.querySelectorAll("label[for='"+nia04f_id+"']");
						if(!nia04f_label || nia04f_label.length == 0){
							setItemOutline(nia04f_nodes[i],"red","nia04f","04-F");
							nia04f_flag = true;
						}
						else if(!(nia04f_label[0].textContent).includes("*")){
							setItemOutline(nia04f_nodes[i],"red","nia04f","04-F");
							nia04f_flag = true;
						}
					}
				}
				else { 
					// Checkbox / Radio
					nia04f_fieldset = nia04f_nodes[i].closest('fieldset');
					if(!nia04f_fieldset){
						if(!(nia04f_nodes[i].parentElement.textContent).includes("*")){
							setItemOutline(nia04f_nodes[i],"red","nia04f","04-F");
							nia04f_flag = true;
						}
					}
					else{
						nia04f_legend = nia04f_fieldset.getElementsByTagName('legend');
						if(!nia04f_legend || nia04f_legend.length != 1){
							setItemOutline(nia04f_nodes[i],"red","nia04f","04-F");
							nia04f_flag = true;
						}
						else if(!(nia04f_legend[0].textContent).includes("*")){
							setItemOutline(nia04f_nodes[i],"red","nia04f","04-F");
							nia04f_flag = true;
						}
					}
				}
			}
		}
		if(nia04f_desc.length == 0){
			setItemToResultList("nc","<li><span class='result-focus label-red'>04-F</span> : Absence d'indication de la signification de l'astrisque sur un champ obligatoire [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-10-1' target='_blank'>RAWeb 11.10.1</a>]</li>");
		}
	}
	if(nia04f_flag == true) {
		setItemToResultList("nc","<li><a href='#' data-destination='nia04f' class='result-focus label-red'>04-F</a> : Absence d'astrisque sur un champ obligatoire [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-10-1' target='_blank'>RAWeb 11.10.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/letiquette-de-chaque-champ-de-formulaire-indique-si-la-saisie-est-obligatoire' target='_blank'>Opquast 69</a>]'</li>");
	}

	// G. Pas d'autocomplete sur les champs radio/checkbox
	const nia04g_nodes = document.querySelectorAll('input[type="checkbox"][autocomplete]:not([autocomplete="off"]),input[type="radio"][autocomplete]:not([autocomplete="off"])');
	if(nia04g_nodes && nia04g_nodes.length > 0 && isItemsVisible(nia04g_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia04g' class='result-focus label-red'>04-G</a> : Présence d'autocomplete sur un champ de type 'checkbox' ou 'Radiobutton' [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-13-1' target='_blank'>RAWeb 11.13.1</a>]</li>");
	  setItemsOutline(nia04g_btn,"red","nia04g","04-G");
	}

	// H. Champ et étiquette accolé en recupérant les positions des centres : Estimé à max 100px pour une distance correcte
	
	function getPositionAtTopRight(element) {
	  const {top, left, width, height} = element.getBoundingClientRect();
	  return {x: left + width,y: top};
	}
	
	function getPositionAtTopLeft(element) {
	  const {top, left, width, height} = element.getBoundingClientRect();
	  return {x: left ,y: top};
	}

	function getDistanceBetweenVerticalElements(a, b) {
	  const inputPosition = getPositionAtTopLeft(a);
	  const labelPosition = getPositionAtTopLeft(b);
	  return Math.hypot(inputPosition.x - labelPosition.x, inputPosition.y - labelPosition.y);  
	}
	
	function getDistanceBetweenHorizontalElements(a, b) {
	  const inputPosition = getPositionAtTopLeft(a);
	  const labelPosition = getPositionAtTopRight(b);
	  return Math.hypot(inputPosition.x - labelPosition.x, inputPosition.y - labelPosition.y);  
	}
	
	const nia04h_nodes = document.querySelectorAll('input[id]:not([type="button"]):not([type="reset"]):not([type="submit"]),select[id],textarea[id]');
	let nia04h_flag = false;
	let nia04h_id, nia04h_label;
	let nia04h_distance;
	if(nia04h_nodes && nia04h_nodes.length > 0){
		for(let i = 0; i < nia04h_nodes.length; i++){
			if(isItemVisible(nia04h_nodes[i])){
				nia04h_id = nia04h_nodes[i].getAttribute("id");
				if(!nia04h_id || nia04h_id == ""){
					setItemOutline(nia04h_nodes[i],"red","nia04h","04-H");
					nia04h_flag = true;
				}
				else{
					nia04h_label = document.querySelectorAll("label[for='"+nia04h_id+"']");
					if(!nia04h_label || nia04h_label.length == 0){
						setItemOutline(nia04h_nodes[i],"red","nia04h","04-H");
						nia04h_flag = true;
					}
					else if(isItemVisible(nia04h_label[0]) && !isItemSROnly(nia04h_label[0])){
						let nia04h_distance_vertical = getDistanceBetweenVerticalElements(nia04h_nodes[i],nia04h_label[0]);
						let nia04h_distance_horizontal = getDistanceBetweenHorizontalElements(nia04h_nodes[i],nia04h_label[0]);
						if(nia04h_distance_vertical > 100 && nia04h_distance_horizontal > 100){
							if(debug_flag) console.log("[nia04h] distance : "+nia04h_distance);
							setItemOutline(nia04h_nodes[i],"red","nia04h","04-H");
							nia04h_flag = true;
						}
					}
				}
			}
		}
	}
	if(nia04h_flag == true){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia04h' class='result-focus label-red'>04-H</a> : Le Champ et l'étiquette doivent être accolé [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-11-5-1' target='_blank'>RAWeb 11.5.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/chaque-etiquette-de-formulaire-est-visuellement-rattachee-au-champ-quelle-decrit' target='_blank'>Opquast 75</a>]</li>");
	}
	
	// I Les informations complétant l'étiquette d'un champ sont associées à celui-ci dans le code source
	const nia04i_nodes = document.querySelectorAll("input[aria-describedby]");
	let nia04i_flag = false;
	let nia04i_desc = "", nia04i_id = "";
	if(nia04i_nodes && nia04i_nodes.length > 0){
		for(let i = 0; i < nia04i_nodes.length; i++){
			if(isItemVisible(nia04i_nodes[i])){
				nia04i_id = nia04i_nodes[i].getAttribute("aria-describedby");
				if(!nia04i_id || nia04i_id == ""){
					setItemOutline(nia04i_nodes[i],"red","nia04i","04-I");
					nia04i_flag = true;
				}
				else{
					nia04i_desc = document.querySelectorAll("[id='"+nia04i_id+"']");
					if(!nia04i_desc || nia04i_desc.length != 1){
						setItemOutline(nia04i_nodes[i],"red","nia04i","04-I");
						nia04i_flag = true;
					}
				}
			}
		}
	}
	if(nia04i_flag == true) {
		setItemToResultList("nc","<li><a href='#' data-destination='nia04i' class='result-focus label-red'>04-I</a> : Présence d'attribut aria-describedby non lié à un texte d'aide <a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-informations-completant-letiquette-dun-champ-sont-associees-a-celui-ci-dans-le-code-source' target='_blank'>Opquast 68</a>]</li>");
	}
	
	// J Le format de saisie des champs de formulaire qui le nécessitent est indiqué (soit un aria-descibedby, soit des paranthèses dans le label)
	const nia04j_nodes = document.querySelectorAll("input[type='email']:not([aria-describedby]), input[type='tel']:not([aria-describedby]), input[pattern]:not([aria-describedby]):not([pattern='.*\\\\S.*'])");
	let nia04j_flag = false;
	let nia04j_label = "", nia04j_id = "";
	if(nia04j_nodes && nia04j_nodes.length > 0){
		for(let i = 0; i < nia04j_nodes.length; i++){
			if(isItemVisible(nia04j_nodes[i])){
				nia04j_id = nia04j_nodes[i].getAttribute("id");
				if(!nia04j_id || nia04j_id == ""){
					setItemOutline(nia04j_nodes[i],"red","nia04j","04-J");
					nia04j_flag = true;
				}
				else{
					nia04j_label = document.querySelectorAll("[for='"+nia04j_id+"']");
					if(!nia04j_label || nia04j_label.length != 1){
						setItemOutline(nia04j_nodes[i],"red","nia04j","04-J");
						nia04j_flag = true;
					}
					else if(nia04j_label[0].innerText.indexOf("(") < 0){
						setItemOutline(nia04j_nodes[i],"red","nia04j","04-J");
						nia04j_flag = true;
					}
				}
			}
		}
	}
	if(nia04j_flag == true) {
		setItemToResultList("nc","<li><a href='#' data-destination='nia04j' class='result-focus label-red'>04-J</a> : Absence du format de saisie dans un texte d'aide <a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-format-de-saisie-des-champs-de-formulaire-qui-le-necessitent-est-indique' target='_blank'>Opquast 70</a>]</li>");
	}


/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-05 Element Obligatoire - Thématique RAWeb 8
- Empty : Mise en avant des balises et paragraphes vides
*/

if(debug_flag) console.log("05 Element Obligatoire");

	// A. Bloc vide
	//const nia05a_nodes = document.querySelectorAll('body *:not(.ol-attribution) > *:not(:where(div, br, hr, img, svg, use, path, circle, rect, i, time[datetime], iframe, canvas, script, td, input, textarea, select, option, [aria-hidden="true"], source, meta, .mapboxgl-ctrl-logo)):empty');
	const nia05a_nodes = document.querySelectorAll('*:not(.ol-attribution) > :where(p, span, th, strong, em, a, q, blockquote, aside, ul, li):not([aria-hidden="true"]):not(.mapboxgl-ctrl-logo):empty');
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
	//const nia05b_nodes = document.querySelectorAll('body *:not(.ol-attribution) > *:not(:where(div, br, hr, img, svg, use, path, circle, rect, i, time[datetime], iframe, canvas, script, td, input, textarea, select, option, [aria-hidden="true"], source, meta, .mapboxgl-ctrl-logo))');
	const nia05b_nodes = document.querySelectorAll('*:not(.ol-attribution):not([aria-hidden="true"]) > :where(p, span, th, strong, em, a, q, blockquote, aside, ul, li):not([aria-hidden="true"]):not(.mapboxgl-ctrl-logo):not(:empty)');
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
	let nia05h_childnodes, nia05h_currentchild;
	if(nia05h_nodes && nia05h_nodes.length > 0 && isItemsVisible(nia05h_nodes)){
	  for(let i = 0; i < nia05h_nodes.length; i++){
			if(isItemVisible(nia05h_nodes[i])){
				nia05h_childnodes = nia05h_nodes[i].parentElement.childNodes;
				nia05h_currentchild = "";
				for(let j = 0; j < nia05h_childnodes.length; j++){
					if(nia05h_childnodes[j].nodeName == nia05h_currentchild.nodeName && nia05h_childnodes[j].nodeName == "BR"){
						console.log(nia05h_childnodes[j])
						setItemOutline(nia05h_nodes[i],"red","nia05h","05-H");
						nia05h_container = nia05h_nodes[i].parentElement;
						nia05h_container.style.outline = "3px dotted red";
						nia05h_container.style.outlineOffset = "-2px";
					}
					if(!(nia05h_childnodes[j].nodeName == "#text" && (nia05h_childnodes[j].textContent == " " || nia05h_childnodes[j].textContent == ""))){
						nia05h_currentchild = nia05h_childnodes[j];
					}
				}
				
			}
		}
	}
	if(nia05h_flag == true){
		  setItemToResultList("nc","<li><a href='#' data-destination='nia05h' class='result-focus label-red'>05-H</a> : Présence de multiple saut de ligne [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-9-1' target='_blank'>RAWeb 8.9.1</a>]</li>");
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
		setItemToResultList("nth","<li><a href='#' data-destination='nia05m' class='result-focus label-yellow'>05-M</a> : Présence de texte justifier [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-styles-ne-justifient-pas-le-texte' target='_blank'>Opquast 186</a>]</li>");
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

/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-06 Structure de l'information - Thématique RAWeb 9 
- Landmark
- List : Mise en avant des listes */

if(debug_flag) console.log("06 Structure");

	// A. Vérifier qu'il n'y a pas de role sur les container de liste
	const nia06a_nodes = document.querySelectorAll('ul[role]:not([role="list"]):not([role="listbox"]),ol[role]:not([role="list"]):not([role="tablist"]),li[role]:not([role="listitem"]):not([role="option"]),dl[role]:not([role="listitem"])');
	let nia06a_flag = false;
	if(nia06a_nodes && nia06a_nodes.length > 0){
		for(let i = 0; i < nia06a_nodes.length; i++){
			if(isItemVisible(nia06a_nodes[i])){
				// Exception sur la structure des onglet <li role="tab"> https://stackoverflow.com/questions/75955536/what-will-the-role-of-anchor-tag-in-tabs-with-ul-li-structure
				if(!(nia06a_nodes[i].tagName == "LI" && nia06a_nodes[i].getAttribute("role") == "tab" && nia06a_nodes[i].parentElement.getAttribute("role") == "tablist" && (nia06a_nodes[i].parentElement.tagName == "UL" || nia06a_nodes[i].parentElement.tagName == "OL") && ((nia06a_nodes[i].getAttribute("tabindex") == "0" && nia06a_nodes[i].getAttribute("aria-selected") == "true") || (nia06a_nodes[i].getAttribute("tabindex") == "-1" && nia06a_nodes[i].getAttribute("aria-selected") != "true")))){
					setItemOutline(nia06a_nodes[i],"red","nia06a","06-A");
					nia06a_flag = true;
				}
			}
		}
	}
	if(nia06a_flag == true){
		setItemToResultList("dev","<li><a href='#' data-destination='nia06a' class='result-focus label-yellow'>06-A</a> : Vérifier qu'il n'y a pas de role sur les container de liste [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-3-1' target='_blank'>RAWeb 9.3.1</a>]</li>");
	}
	
	// B. Vérifier que le liste <ul> et <ol> ne contienne que des <li> ou [role="listitem"]
	const nia06b_nodes = document.querySelectorAll(':where(ul,ol,[role="list"]) > *:not(li):not([role="listitem"]):not(.checkA11YSpan)');
	if(nia06b_nodes && nia06b_nodes.length > 0){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia06b' class='result-focus label-red'>06-B</a> : Présence d'un élement non autorisé dans une liste [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-3-1' target='_blank'>RAWeb 9.3.1</a>]</li>");
	  setItemsOutline(nia06b_nodes,"red","nia06b","06-B");
	}
	
	// C. Vérifier que la zone d’en-tête est structurée au moyen d’un élément <header> ;
	// <header class="page-header" role="banner">
	const nia06c_nodes = document.querySelector('header.page-header[role="banner"]');
	if(nia06c_nodes == null){
		setItemToResultList("dev","<li><span class='result-focus label-yellow'>06-C</span> : Il y a un problème avec la structuration du header [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]</li>");
	}
	
	// D. Vérifier que les zones de navigation principales et secondaires sont structurées au moyen d’un élément <nav> ;
	// <nav class="page-headernav" role="navigation" aria-label="Menu principal" id="headernav">
	const nia06d_nodes = document.querySelectorAll('nav.page-headernav[role="navigation"]');
	if(nia06d_nodes == null){
		setItemToResultList("dev","<li><span class='result-focus label-yellow'>06-D</span> : Il y a un problème avec la structuration de la navigation [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]</li>");
	}
	
	// E. Vérifier que l’élément <nav> n’est pas utilisé en dehors de la structuration des zones de navigation principales et secondaires ;
	const nia06e1_nodes = document.querySelectorAll('nav:not([role="navigation"])');
	if(nia06e1_nodes && nia06e1_nodes.length > 0 && isItemsVisible(nia06e1_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia06e1' class='result-focus label-red'>06-E</a> : Présence d'une zone de navigation sans attribut role</li>");
	  setItemsOutline(nia06e1_nodes,"red","nia06e1","06-E");
	}
	
	/*
	Les principales barres de navigation (critère 12.2) sont :
	Un menu de navigation ;
	Un fil d’ariane ;
	Une liste de navigation d’une liste de résultats ;
	Des liens d’évitement.
	
	Il existe différents types de menu de navigation (critère 12.1 et critère 12.2) :
	Menu de navigation principal ;
	Menu de sous-rubrique ;
	Menu contextuel ;
	Table des matières concernant un ensemble de pages.
	*/
	const nia06e2_nodes = document.querySelectorAll('*:not(.page-langs):not(.right-part):not(.cmp-directory) > nav:not(.page-headernav):not(.page-headernavmobile):not(.page-headernav-desk):not(.automaticnav):not(.cmp-breadcrumb):not(.page-localnav):not(.cmp-backtonav):not(.cmp-breadcrumb-demarches)');
	if(nia06e2_nodes && nia06e2_nodes.length > 0&& isItemsVisible(nia06e2_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia06e2' class='result-focus label-red'>06-E</a> : Présence d'une balise nav utilisé en dehors d'une zone de navigation [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]</li>");
	  setItemsOutline(nia06e2_nodes,"red","nia06e2","06-E");
	}
	
	// F. Vérifier que la zone de contenu principal est structurée au moyen d’un élément <main> ;
	// Si le document possède plusieurs éléments <main>, vérifier qu’un seul de ces éléments est visible (les autres occurrences de l’élément sont pourvues d’un attribut hidden) ;
	// <main id="main" class="page-main " role="main">
	
	const nia06f1_nodes = document.querySelectorAll('main:not([role="main"])');
	if(nia06f1_nodes && nia06f1_nodes.length > 0 && isItemsVisible(nia06f1_nodes)){
	  setItemToResultList("nth","<li><a href='#' data-destination='nia06f1' class='result-focus label-red'>06-F</a> : Présence d'une zone de contenu principal sans attribut role</li>");
	  setItemsOutline(nia06f1_nodes,"red","nia06f1","06-F");
	}
	
	const nia06f2_nodes = document.querySelectorAll('main');
	let nia06f2_counter = 0;
	if(nia06f2_nodes && nia06f2_nodes.length > 1){
		for(let i = 0; i < nia06f2_nodes.length; i++){
			if(isItemVisible(nia06f2_nodes[i])){
				nia06f2_counter++;
			}
			if(nia06f2_counter > 1){
				setItemToResultList("nc","<li><a href='#' data-destination='nia06f2' class='result-focus label-red'>06-F</a> : Présence de plusieurs zone de contenu principal [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]</li>");
				setItemsOutline(nia06f2_nodes,"red","nia06f2","06-F");
				break;
			}
		}
	}
	
	// G. Vérifier que la zone de pied de page est structurée au moyen d’un élément <footer>.
	const nia06g1_nodes = document.querySelectorAll('footer.page-footer:not([role="contentinfo"])');
	if(nia06g1_nodes && nia06g1_nodes.length > 0 && isItemsVisible(nia06g1_nodes)){
	  setItemToResultList("nth","<li><a href='#' data-destination='nia06g1' class='result-focus label-yellow'>06-G</a> : Présence d'une zone de pied de page sans attribut role</li>");
	  setItemsOutline(nia06g1_nodes,"red","nia06g1","06-G");
	}

	const nia06g2_nodes = document.querySelector('footer.page-footer[role="contentinfo"]');
	if(nia06g2_nodes == null){
		setItemToResultList("dev","<li><span class='result-focus label-yellow'>06-G</span> : Il y a un problème avec la structuration du footer [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-9-2-1' target='_blank'>RAWeb 9.2.1</a>]</li>");
	}
	
	// H. Cadres avec un titre
	const nia06h_nodes = document.querySelectorAll('frame:not([title]),iframe:not([title])');
	if(nia06h_nodes && nia06h_nodes.length > 0 && isItemsVisible(nia06h_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia06h' class='result-focus label-red'>06-H</a> : Chaque cadre doit avoir un titre  [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-2-1-1' target='_blank'>RAWeb 2.1.1</a>]</li>");
	  setItemsOutline(nia06h_nodes,"red","nia06h","06-H");
	}

	// I. Presence de triple espace (double concidéré comme erreur d'inattention)
	const nia06i_nodes = document.querySelectorAll('.cmp-text');
	let nia06i_flag = false;
	let nia06i_result;
	if(nia06i_nodes && nia06i_nodes.length > 0){
		for(let i = 0; i < nia06i_nodes.length; i++){
			if(isItemVisible(nia06i_nodes[i])){
				const nia06i_result = nia06i_nodes[i].innerText.match(/   +/g);
				if(nia06i_result && nia06i_result.length > 0) {
					setItemOutline(nia06i_nodes[i],"yellow","nia06i","06-I");
					nia06i_flag = true;
				}
			}
		}
	}	
	if(nia06i_flag == true) {
	  setItemToResultList("nth","<li><a href='#' data-destination='nia06i' class='result-focus label-yellow'>06-I</a> : Présence d'espace pour créer des effets de marges ou d'alignement [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-10-1-3' target='_blank'>RAWeb 10.1.3</a>]</li>");
	  setItemsOutline(nia06i_nodes,"yellow","nia06i","06-I");
	}

/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-07 Title : Mise en avant des titres (<Hn> et ceux qui ont les roles=heading). 
o Vérification de la présence de titres simulés - S’assurer que les titres sont bien balisés avec des balises <Hn> et pas seulement avec du gras.
o S’assurer que les titres sont dans le bon ordre*/

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
	  setItemToResultList("nc","<li><a href='#' data-destination='nia07c' class='result-focus label-red'>07-C</a> : Présence de titre caché au outil d'assistance</li>");
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
	
/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-08 Tableau : Thématique RAWeb 5
 - vérification présence des bons attributs sur les tableaux. 
 - Eviter les éléments ajoutés par les copier/coller de word. 
 - Vérifier en particulier les attributs « scope » sur les éléments de header
*/

if(debug_flag) console.log("08 Tableau");

	// A. Attribut de tableau
	const nia08a_nodes = document.querySelectorAll(':where([role="table"],table:not([role="presentation"])) th:not([scope="row"]):not([scope="col"]):not([id]):not([headers]):not([role="rowheader"]):not([role="columnheader"])');
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
	  setItemToResultList("nth","<li><a href='#' data-destination='nia08e' class='result-focus label-red'>08-E</a> : Présence d'un tableau de données sans en-tête [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-5-6-1' target='_blank'>RAWeb 5.6.1</a>]</li>");
	}
	

/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-09 Navigation 
- Pertinance du plan du site
- Tabindex : Mise en avant des éléments possédant un tabindex défini. Vérifier l'absence d’attribut « tabindex » positif dans le contenu*/

if(debug_flag) console.log("09 Navigation");

	if(currentUrl.includes("plan-du-site.html") || currentUrl.includes("plan.html")){
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
		
		// Erreur si le lien existe dans le footer mais pas dans la map ou inversement
		
		if(nia09a1_footer && nia09a1_footer.length > 0 && (!nia09a1_sitemap || nia09a1_sitemap.length == 0)){
		  setItemToResultList("nc","<li><a href='#' data-destination='nia09a1' class='result-focus label-red'>09-A</a> : Il manque la page contact dans le plan du site [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>");
		  setItemsOutline(nia09a1_footer,"red","nia09a1","09-A");
		}
		else if(nia09a1_sitemap && nia09a1_sitemap.length > 0 && (!nia09a1_footer || nia09a1_footer.length == 0)){
		  setItemToResultList("nc","<li><a href='#' data-destination='nia09a1' class='result-focus label-red'>09-A</a> : Il manque la page contact dans le footer [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>");
		  setItemsOutline(nia09a1_sitemap,"red","nia09a1","09-A");
		}

		if(nia09a2_footer && nia09a2_footer.length > 0 && (!nia09a2_sitemap || nia09a2_sitemap.length == 0)){
		  setItemToResultList("nc","<li><a href='#' data-destination='nia09a2' class='result-focus label-red'>09-A</a> : Il manque la page Accessibilité dans le footer ou dans le plan du site [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>");
		  setItemsOutline(nia09a2_footer,"red","nia09a2","09-A");
		}
		else if(nia09a2_sitemap && nia09a2_sitemap.length > 0 && (!nia09a2_footer || nia09a2_footer.length == 0)){
		  setItemToResultList("nc","<li><a href='#' data-destination='nia09a2' class='result-focus label-red'>09-A</a> : Il manque la page Accessibilité dans le footer ou dans le plan du site [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>");
		  setItemsOutline(nia09a2_sitemap,"red","nia09a2","09-A");
		}
		
		if(nia09a3_footer && nia09a3_footer.length > 0 && (!nia09a3_sitemap || nia09a3_sitemap.length == 0)){
		  setItemToResultList("nc","<li><a href='#' data-destination='nia09a3' class='result-focus label-red'>09-A</a> : Il manque la page aspect légaux dans le footer ou dans le plan du site [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>");
		  setItemsOutline(nia09a3_footer,"red","nia09a3","09-A");
		}
		else if(nia09a3_sitemap && nia09a3_sitemap.length > 0 && (!nia09a3_footer || nia09a3_footer.length == 0)){
		  setItemToResultList("nc","<li><a href='#' data-destination='nia09a3' class='result-focus label-red'>09-A</a> : Il manque la page aspect légaux dans le footer ou dans le plan du site [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>");
		  setItemsOutline(nia09a3_sitemap,"red","nia09a3","09-A");
		}
		
		if(nia09a4_footer && nia09a4_footer.length > 0 && (!nia09a4_sitemap || nia09a4_sitemap.length == 0)){
		  setItemToResultList("nc","<li><a href='#' data-destination='nia09a4' class='result-focus label-red'>09-A</a> : Il manque la page A propos dans le footer ou dans le plan du site [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>");
		  setItemsOutline(nia09a4_footer,"red","nia09a4","09-A");
		}
		else if(nia09a4_sitemap && nia09a4_sitemap.length > 0 && (!nia09a4_footer || nia09a4_footer.length == 0)){
		  setItemToResultList("nc","<li><a href='#' data-destination='nia09a4' class='result-focus label-red'>09-A</a> : Il manque la page A propos dans le footer ou dans le plan du site [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-3-1' target='_blank'>RAWeb 12.3.1</a>]</li>");
		  setItemsOutline(nia09a4_sitemap,"red","nia09a4","09-A");
		}
		
		// Page indésirable dans le plan du site
		const nia09b_nodes = document.querySelector('.cmp-sitemap a[href$="error.html"]');
		if(nia09b_nodes && isItemVisible(nia09b_nodes)){
		  setItemToResultList("nth","<li><a href='#' data-destination='nia09b' class='result-focus label-orange'>09-B</a> : Presence de la page Error dans le plan du site</li>");
		  setItemsOutline(nia09b_nodes.parentElement,"orange","nia09b","09-B");
		}
	}

	// C. Presence d'attibut tabindex positif
	const nia09c_nodes = document.querySelectorAll('[tabindex]:not([tabindex="0"]):not([tabindex="-1"])');
	if(nia09c_nodes && nia09c_nodes.length > 0 && isItemsVisible(nia09c_nodes)){
	  setItemToResultList("nth","<li><a href='#' data-destination='nia09c' class='result-focus label-orange'>09-C</a> : Presence d'attibut tabindex positif [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-12-8-1' target='_blank'>RAWeb 12.8.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/la-navigation-au-clavier-seffectue-dans-un-ordre-previsible' target='_blank'>Opquast 162</a>]</li>");
	  setItemsOutline(nia09c_nodes,"orange","nia09c","09-C");
	}

	// D. 2 systemes de navigation (plan du site, recherche, menu)
	const nia09d_nav = document.querySelector('nav #headernav, nav#headernav');
	const nia09d_search = document.querySelector('div.topsearch[role="search"],div.topsearch-desk[role="search"]');
	const nia09d_plan = document.querySelector('.page-footernav ul.nav--support > li.nav-item > a[href*="plan"][href$=".html"]');
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

	// F taille des éléments interactifs minimum attendue est de 24px par 24px.
	const nia09f_nodes = document.querySelectorAll('a:not(.feed-item-timing):not(.cmp-breadcrumb__item-link):not(.geoportail-skip), button, input, select, details, textarea, [tabindex="0"], [tabindex="-1"]');
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
						
								if(debug_flag) console.log(nia09f_rect);
								if(debug_flag) console.log("09f1 : "+nia09f_horizontal+" "+nia09f_vertical);
								if(debug_flag) console.log("09f2 : "+nia09f_horizontal_parent+" "+nia09f_vertical_parent);
								
								if(nia09f_vertical_parent > 18 && nia09f_horizontal_parent > 50){
									// Exception In-line : Par exemple un lien dans un texte
								}
								else {
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

/*- -------------------------------------------------------------------------------- */
/* 🗸 NIA-10 Old tag
Mise en avant de la présence d’attributs obsolètes. Vérifier qu'il n'y a pas de balise ou d’attribut obsolète dans le contenu (Fréquent lors de refonte ou de copier/coller) 
*/

if(debug_flag) console.log("10 Old tag");

	/* A. Old tag
	<acronym>	Defines an acronym
	<applet>	Defines an applet
	<basefont>	Defines an base font for the page.
	<big>	Defines big text
	<center>	Defines centered text
	<dir>	Defines a directory list
	<font>	Defines text font, size, and color
	<frame>	Defines a frame
	<frameset>	Defines a set of frames
	<isindex>	Defines a single-line input field
	<noframes>	Defines a noframe section
	<s>	Defines strikethrough text
	<strike>	Defines strikethrough text
	<tt>	Defines teletype text
	<u> 	Defines underlined text
	
	Add du RAWeb 10.1.1 
	<blink>
	<marquee>
	<s>
	*/

	// A. Old tag NC
	const nia10a_nodes = document.querySelectorAll('acronym,applet,basefont,big,center,dir,font,frame,frameset,isindex,noframes,s,strike,tt,u,blink,marquee,s'); // NC
	if(nia10a_nodes && nia10a_nodes.length > 0 && isItemsVisible(nia10a_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia10a' class='result-focus label-red'>10-A</a> : Présence de balise HTML obsolètes ou servant à la présentation de l'information [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-10-1-1' target='_blank'>RAWeb 10.1.1</a>]</li>");
	  setItemsOutline(nia10a_nodes,"red","nia10a","10-A");
	}
	
	// B. Old tag Nice-to-have
	// Exception pour les horaires : https://jira.intranet.etat.lu/browse/GUILUV3-1002
	const nia10b_nodes = document.querySelectorAll('i, *:not(.cmp-hours__list) > * > * > b'); // NtH
	if(nia10b_nodes && nia10b_nodes.length > 0 && isItemsVisible(nia10b_nodes)){
	  setItemToResultList("man","<li><a href='#' data-destination='nia10b' class='result-focus label-orange'>10-B</a> : Présence de balises 'i' ou 'b', voir pour les remplacer par 'em' et 'strong' lorsque nécessaire</li>");
	  setItemsOutline(nia10b_nodes,"orange","nia10b","10-B");
	}

	/* B. Old attribut
	rev	link, a
	charset	link and a
	shape	a
	coords	a
	longdesc	img and iframe.
	target	link
	nohref	area
	profile	head
	version	html
	name	img
	scheme	meta
	archive	object
	classid	object
	codebase	object
	codetype	object
	declare	object
	standby	object
	valuetype	param
	type	param
	axis	td and t
	abbr	td and t
	scope	td
	align	caption, iframe, img, input, object, legend, table, hr, div, h1, h2, h3, h4, h5, h6, p, col, colgroup, tbody, td, tfoot, th, thead and tr.
	alink	body
	link	body
	vlink	body
	text	body
	background	body
	bgcolor	table, tr, td, th and body.
	border	table and object.
	cellpadding	table
	cellspacing	table
	char	col, colgroup, tbody, td, tfoot, th, thead and tr.
	charoff	col, colgroup, tbody, td, tfoot, th, thead and tr.
	clear	br
	compact	dl, menu, ol and ul.
	frame	table
	compact	dl, menu, ol and ul.
	frame	table
	frameborder	iframe
	hspace	img and object.
	vspace	img and object.
	marginheight	iframe
	marginwidth	iframe
	noshade	hr
	nowrap	td and th
	rules	table
	scrolling	iframe
	size	hr
	type	li, ol and ul.
	valign	col, colgroup, tbody, td, tfoot, th, thead and tr
	width	hr, table, td, th, col, colgroup and pre.
	*/

	// C. Old attribut
	const nia10c_nodes = document.querySelectorAll('link[rev], a[rev],link[charset], a[charset],a[shape],a[coords],img[longdesc], iframe[longdesc],link[target],area[nohref],head[profile],html[version],img[name],meta[scheme],object[archive],object[classid],object[codebase],object[codetype],object[declare],object[standby],param[valuetype],param[type],td[axis],t[axis],td[abbr], t[abbr],td[scope],caption[align], iframe[align], img[align], input[align], object[align], legend[align], table[align], hr[align], div[align], h1[align], h2[align], h3[align], h4[align], h5[align], h6[align], p[align], col[align], colgroup[align], tbody[align], td[align], tfoot[align], th[align], thead[align], tr[align],body[alink],body[link],body[vlink],body[text],body[background],table[bgcolor], tr[bgcolor], td[bgcolor], th[bgcolor], body[bgcolor],table[border], object[border],table[cellpadding],table[cellspacing],col[char], colgroup[char], tbody[char], td[char], tfoot[char], th[char], thead[char],tr[char],col[charoff], colgroup[charoff], tbody[charoff], td[charoff], tfoot[charoff], th[charoff], thead[charoff], tr[charoff],br[clear],dl[compact], menu[compact], ol[compact], ul[compact],table[frame],iframe[frameborder],img[hspace], object[hspace],img[vspace], object[vspace],iframe[marginheight],iframe[marginwidth],hr[noshade],td[nowrap], th[nowrap],table[rules],iframe[scrolling],hr[size],li[type], ol[type], ul[type],col[valign], colgroup[valign], tbody[valign], td[valign], tfoot[valign], th[valign], thead[valign], tr[valign],hr[width], table[width], td[width], th[width], col[width], colgroup[width], pre[width]'); // NC
	if(nia10c_nodes && nia10c_nodes.length > 0 && isItemsVisible(nia10c_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia10c' class='result-focus label-red'>10-C</a> : Présence d'attributs HTML obsoletes</li>");
	  setItemsOutline(nia10c_nodes,"red","nia10c","10-C");
	}
	
	// D. Presentation attribut
	const nia10d_nodes = document.querySelectorAll('[align], [alink], [background], [bgcolor], [border], [cellpadding], [cellspacing], [char], [charoff], [clear], [color], [compact], [frameborder], [hspace], [link], [marginheight], [marginwidth], [text], [valign], [vlink], [vspace], [size]:not(select), *:not(symbol) > *:not(g) > [width]:not(img):not(object):not(embed):not(canvas):not(svg):not(rect),*:not(symbol) > *:not(g) > [height]:not(img):not(object):not(embed):not(canvas):not(svg):not(rect)'); 
	if(nia10d_nodes && nia10d_nodes.length > 0 && isItemsVisible(nia10d_nodes)){
	  setItemToResultList("nc","<li><a href='#' data-destination='nia10d' class='result-focus label-red'>10-D</a> : Présence d'attributs HTML servant à la présentation de l'information [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-10-1-2' target='_blank'>RAWeb 10.1.2</a>]</li>");
	  setItemsOutline(nia10d_nodes,"red","nia10d","10-D");
	}

/*- -------------------------------------------------------------------------------- */
/* 11. Chgt de langue
- Langue : Vérifier que le contenu rédigé dans une langue étrangère possède un attribut « lang » pertinent
*/

if(debug_flag) console.log("11 Langue");

  // A. Absence de lang
  	const nia11a_nodes = document.querySelectorAll('html:not([lang])');
	if(nia11a_nodes && nia11a_nodes.length > 0 && isItemsVisible(nia11a_nodes)){
	  setItemToResultList("crit","<li><a href='#' data-destination='nia11a' class='result-focus label-red'>11-A</a> : Aucune langue défini par défaut sur la page [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-8-3-1' target='_blank'>RAWeb 8.3.1</a> - <a href='https://checklists.opquast.com/fr/assurance-qualite-web/le-code-source-de-chaque-page-indique-la-langue-principale-du-contenu' target='_blank'>Opquast 125</a>]</li>");
	  setItemsOutline(nia11a_nodes,"red","nia11a","11-A");
	}
	
	
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
	
/*- -------------------------------------------------------------------------------- */
/* 12. Boutons
Intitulé des boutons : Pour les boutons pour ouvrir la recherche, lancer la recherche, ouvrir les filtres et ouvrir le menu :
o	L'attribut « aria-label » doit être identique à l'attribut title
o	L'attribut « title » doit reprendre à minimum le contenu textuel de celui-ci 
*/

if(debug_flag) console.log("12 Boutons");

	/* A&B. Recherche */
	const nia12a1_nodes = document.querySelectorAll('.topsearch:not([role="search"])');
	const nia12a2_nodes = document.querySelectorAll('html[lang="fr"] .topsearch:not([aria-label="Globale"])');
	if((nia12a1_nodes && nia12a1_nodes.length > 0 && isItemsVisible(nia12a1_nodes)) || (nia12a2_nodes && nia12a2_nodes.length > 0 && isItemsVisible(nia12a2_nodes))){
	  setItemToResultList("dev","<li><a href='#' data-destination='nia12a' class='result-focus label-red'>12-A</a> : Absence de certaines propriétés sur le champ de recherche (role=search et aria-label=Globale)</li>");
	  setItemsOutline(nia12a1_nodes,"red","nia12a","12-A");
	  setItemsOutline(nia12a2_nodes,"red","nia12a","12-A");
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
				nia12c_content = sanitizeText(nia12c_nodes[i].innerText,nia12c_lang);
				if(nia12c_nodes[i].hasAttribute("title") && !nia12c_title.includes(nia12c_content)){
					if(debug_flag) console.log("%cERROR","font-weight:700;color:darkred","["+nia12c_title+"] VS ["+nia12c_content+"] ");
					setItemOutline(nia12c_nodes[i],"red","nia12c1","12-C");
					nia12c1_flag = true;
				}
				if(nia12c_nodes[i].hasAttribute("title") && nia12c_nodes[i].hasAttribute("aria-label") && nia12c_label != nia12c_title){
					setItemOutline(nia12c_nodes[i],"red","nia12c2","12-C");
					nia12c2_flag = true;
				}
				if(nia12c_nodes[i].hasAttribute("title") && !nia12c_nodes[i].hasAttribute("aria-label") && nia12c_title != nia12c_content){
					setItemOutline(nia12c_nodes[i],"orange","nia12c3","12-C");
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
	  setItemToResultList("dev","<li><a href='#' data-destination='nia12c3' class='result-focus label-orange'>12-C</a> : L'attribut title d'un bouton du site, différent de son contenu textuel, n'est pas completé par un attribut aria-label </li>");
	}
	
	/* D. Button */
	const nia12d_nodes = document.querySelectorAll('button[role=button]');
	if(nia12d_nodes && nia12d_nodes.length > 0 && isItemsVisible(nia12d_nodes)){
	  setItemToResultList("dev","<li><a href='#' data-destination='nia12d' class='result-focus label-yellow'>12-D</a> : Il n'est pas nécessaire d'ajouter un role button sur un éléments boutons</li>");
	  setItemsOutline(nia12d_nodes,"yellow","nia12d","12-D");
	}

/*- -------------------------------------------------------------------------------- */
/* 13. Animation Lottie */

if(debug_flag) console.log("13 Animation");

	// A. Max duration = 5s si autoplay / Pas de loop
	const nia13a_nodes = document.querySelectorAll('lottie-player');
	let nia13a_autoplay, nia13a_totalFrames,nia13a_frameRate, nia13a_loop, nia13a_counter, nia13a_controls, nia13a_duration;
	if(nia13a_nodes && nia13a_nodes.length > 0){
		if(nia13a_nodes && nia13a_nodes.length > 0 ){
			for(let i = 0; i < nia13a_nodes.length; i++){
				nia13a_autoplay = nia13a_nodes[i].getAttribute("autoplay");
				if(nia13a_autoplay == "true"){
					if(!nia13a_nodes[i].renderOptions || nia13a_nodes[i].renderOptions == undefined){
						setItemToResultList("man","<li><a href='#' data-destination='nia13a0' class='result-focus label-yellow'>13-A</a> : Les animations lues automatiquement et qui boucles ou qui dure plue de 5s doivent avoir un controleur play/pause [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-13-8-1' target='_blank'>RAWeb 13.8.1</a>]</li>");
						setItemOutline(nia13a_nodes[i],"yellow","nia13a0","13-A");
						
					}
					else {
						nia13a_totalFrames = nia13a_nodes[i].renderOptions.host._lottie.totalFrames;
						nia13a_frameRate = nia13a_nodes[i].renderOptions.host._lottie.frameRate;
						nia13a_loop = nia13a_nodes[i].renderOptions.host.__loop;
						nia13a_counter = nia13a_nodes[i].renderOptions.host._counter;
						nia13a_controls = nia13a_nodes[i].renderOptions.host.__controls;
						if(debug_flag) console.log("autoplay : "+nia13a_autoplay + " | controls : "+nia13a_controls);
						if(nia13a_controls == false){
							if(nia13a_loop == true){
								setItemToResultList("nc","<li><a href='#' data-destination='nia13a1' class='result-focus label-red'>13-A</a> : Les animations lues automatiquement et qui boucles doivent avoir un controleur play/pause [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-13-8-1' target='_blank'>RAWeb 13.8.1</a>]</li>");
								setItemOutline(nia13a_nodes[i],"red","nia13a1","13-A");
							}
							else {
								nia13a_duration = nia13a_totalFrames / nia13a_frameRate * nia13a_counter; // 150 / 30 * 1 = 5 
								if(debug_flag)  console.log("duration : "+nia13a_duration +" s");
								if (nia13a_duration > 5){
									setItemToResultList("nc","<li><a href='#' data-destination='nia13a2' class='result-focus label-red'>13-A</a> : Les animations lues automatiquement et qui durent plus de 5s doivent avoir un controleur play/pause [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-13-8-1' target='_blank'>RAWeb 13.8.1</a>]</li>");
									setItemOutline(nia13a_nodes[i],"red","nia13a2","13-A");
								}
							}
						}
					}
				}
			}
		}
	}
	
/*- -------------------------------------------------------------------------------- */
/* 14. Couleur */

if(debug_flag) console.log("14 Couleur");

	// A. Opacité Placeholder -- Todo

	// --> test 10.5.1 color / bg/ degradé
	// --> test 10.6.1 lien visible par rapport au texte environnemt
	// --> test 10.7.1 prise de focus visible
	// --> Contenu avec un linear-gradiant sans couleur de backup
	

	const nia14a_nodes = document.querySelectorAll('p, span:not(.checkA11YSpan), li, strong, h1, h2, h3, h4, h5, small, a:not([disabled]), button:not([disabled]), blockquote, q, dd, dt');
	let nia14a_flag = false;
	let color1,color2,color1rbg, color2rbg,color1luminance, color2luminance, nia14a_ratio, nia14a_bold, nia14a_large, nia14a_isbold;
	if(nia14a_nodes && nia14a_nodes.length > 0){
		for(let i = 0; i < nia14a_nodes.length; i++){
			if(isItemVisible(nia14a_nodes[i]) && !isItemSROnly(nia14a_nodes[i]) && isItemHasVisibleContent(nia14a_nodes[i]) && isItemHasDirectContent(nia14a_nodes[i])){
				color1 = window.getComputedStyle(nia14a_nodes[i],null).getPropertyValue('color');  // Text Color
				color2 = getInheritedBackgroundColor(nia14a_nodes[i]) // Bg Color
				if(color1.indexOf("#") >= 0){ color1rgb = hexToRgbArray(color1);} else {color1rgb = rgbToRgbArray(color1);}
				if(color2.indexOf("#") >= 0){ color2rgb = hexToRgbArray(color2);} else {color2rgb = rgbToRgbArray(color2);}
				color1luminance = luminance(color1rgb.r, color1rgb.g, color1rgb.b);
				color2luminance = luminance(color2rgb.r, color2rgb.g, color2rgb.b);
				nia14a_ratio = color1luminance > color2luminance ? ((color2luminance + 0.05) / (color1luminance + 0.05)) : ((color1luminance + 0.05) / (color2luminance + 0.05));
				nia14a_ratio_inv = 1/nia14a_ratio;
				//console.log(color1+" vs "+color2+" = "+ nia14a_ratio_inv)
				
				nia14a_large = parseFloat(window.getComputedStyle(nia14a_nodes[i],null).getPropertyValue('font-size'));
				nia14a_bold = window.getComputedStyle(nia14a_nodes[i],null).getPropertyValue('font-weight');
				nia14a_isbold = false;
				if(nia14a_bold == "bold" || nia14a_bold == "bolder" || nia14a_bold >= 500) {nia14a_isbold = true;}
				//console.log("font-size : "+nia14a_large+" / font-weight "+nia14a_bold)
				
				if(nia14a_isbold == false && nia14a_large < 24 && nia14a_ratio_inv < 4.5){
					if(debug_flag) console.log("14A - FAIL 3.2.1 Standard ratio : "+nia14a_ratio_inv+" ("+color1+" vs "+color2+")");
					setItemOutline(nia14a_nodes[i],"orange","nia14a","14-A");
					nia14a_flag = true;
				}
				else if(nia14a_isbold == true && nia14a_large < 18.5 && nia14a_ratio_inv < 4.5){
					if(debug_flag) console.log("14A - FAIL 3.2.2 Standard ratio : "+nia14a_ratio_inv+" ("+color1+" vs "+color2+")");
					setItemOutline(nia14a_nodes[i],"orange","nia14a","14-A");
					nia14a_flag = true;
				}
				else if(nia14a_isbold == false && nia14a_large >= 24 && nia14a_ratio_inv < 3){
					if(debug_flag) console.log("14A - FAIL 3.2.3 Standard ratio : "+nia14a_ratio_inv+" ("+color1+" vs "+color2+")");
					setItemOutline(nia14a_nodes[i],"orange","nia14a","14-A");
					nia14a_flag = true;
				}
				else if(nia14a_isbold == true && nia14a_large >= 18.5 && nia14a_ratio_inv < 3){
					if(debug_flag) console.log("14A - FAIL 3.2.4 Standard ratio : "+nia14a_ratio_inv+" ("+color1+" vs "+color2+")");
					setItemOutline(nia14a_nodes[i],"orange","nia14a","14-A");
					nia14a_flag = true;
				}
				
				else if(nia14a_nodes[i].tagName == "A" || nia14a_nodes[i].tagName == "BUTTON"){
					// On check au focus
					
				}
			}
		}
	}
	if(nia14a_flag == true) {
	  setItemToResultList("dev","<li><a href='#' data-destination='nia14a' class='result-focus label-orange'>14-A</a> : Présence d'élément insuffisament contrasté</li>");
	}
	

/*- -------------------------------------------------------------------------------- */
/* 15. Securité */

if(debug_flag) console.log("15 Sécurité");

	// A. Les liens externes qui ouvrent une nouvelle fenêtre ne partagent pas d'information de contexte.
	const nia15a_nodes = document.querySelectorAll('a[target="_blank"]:not([rel~="noreferrer"]):not([rel~="noopener"])');
	if(nia15a_nodes && nia15a_nodes.length > 0 && isItemsVisible(nia15a_nodes)){
	  setItemToResultList("dev","<li><a href='#' data-destination='nia15a' class='result-focus label-yellow'>15-A</a> : Doter chaque lien ayant un attribut target='_blank' d'un attribut rel='noreferrer noopener'. [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-liens-externes-qui-ouvrent-une-nouvelle-fenetre-ne-partagent-pas-dinformation-de-contexte' target='_blank'>Opquast 25</a>]</li>");
	  setItemsOutline(nia15a_nodes,"yellow","nia15a","15-A");
	}

	// B. Les pages utilisant le protocole HTTPS ne proposent pas de ressources HTTP.
	const nia15b_nodes = document.querySelectorAll('a[target="_blank"][href^="http://"]');
	if(nia15b_nodes && nia15b_nodes.length > 0 && isItemsVisible(nia15b_nodes)){
	  setItemToResultList("nth","<li><a href='#' data-destination='nia15b' class='result-focus label-yellow'>15-B</a> : Les pages utilisant le protocole HTTPS ne doivent pas proposer de ressources HTTP [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/les-pages-utilisant-le-protocole-https-ne-proposent-pas-de-ressources-http' target='_blank'>Opquast 195</a>]</li>");
	  setItemsOutline(nia15b_nodes,"yellow","nia15b","15-B");
	}
	
	// C. Toutes les pages utilisent le protocole HTTPS.
	if (window.location.protocol != "https:") {
		setItemToResultList("dev","<li><span class='result-focus label-yellow'>15-C</span> : Les pages doivent utiliser le protocole HTTPS [<a href='https://checklists.opquast.com/fr/assurance-qualite-web/toutes-les-pages-utilisent-le-protocole-https' target='_blank'>Opquast 192</a>]</li>");
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


/*- -------------------------------------------------------------------------------- */
// TEST Split
// check_part_1();

/*- -------------------------------------------------------------------------------- */
// END
let result_global = "";
if (result_crit != ""){result_crit = "<h2>Points critiques</h2><ul>"+result_crit+"</ul>";}
if (result_nc != ""){result_nc = "<h2>Points non-conforme</h2><ul>"+result_nc+"</ul>";}
if (result_nth != ""){result_nth = "<h2>Nice-to-have</h2><ul>"+result_nth+"</ul>";}
if (result_dev != ""){result_dev = "<h2>Problèmes dev</h2><ul>"+result_dev+"</ul>";}
if (result_man != ""){result_man = "<h2>A vérifier manuellement</h2><ul>"+result_man+"</ul>";}
if (result_crit == "" && result_nc == "" && result_nth == "" && result_dev == "" && result_man == ""  ){
  result_global = "Pas de points remontés !"; 
}
else { result_global = result_crit + result_nc + result_nth + result_man + result_dev;}

// Fonction color error
function setItemsOutline(items,color,classname,label){
	if(debug_flag) console.log("["+classname+"] Problème detecté sur "+items.length+" éléments");
	let item;
	for(let i = 0; i < items.length; i++){
		setItemOutline(items[i],color,classname,label);
	}
}

function setItemOutline(item,color,classname,label){
	if(debug_flag) console.log(item);
	if(color == "red"){ item.setAttribute("style","outline: 3px solid #ea0202 !important");}
	else {item.style.outline = "3px solid "+color;}
	item.style.outlineOffset = "1px";
	item.classList.add(classname);
	const spanLabel = document.createElement('span');
	spanLabel.classList.add("checkA11YSpan");
	if(color == "red"){
		spanLabel.style.backgroundColor = "#ea0202";
		spanLabel.style.color = "white";
	}
	else{
		spanLabel.style.backgroundColor = color;
		spanLabel.style.color = "black";
	}
	spanLabel.innerHTML = label;
	if(item.nodeName == "LI"){item.prepend(spanLabel);} //Element “span” not allowed as child of element “ul” in this context.
	else{
		item.before(spanLabel);
	}
	
}

// Fonction is visible : La liste d'item contient au moins un element visible
function isItemsVisible(items){
	for(let i = 0; i < items.length; i++){
		if(isItemVisible(items[i])) return true;
	}
	return false
}

function isItemVisible(item) {
    // Start with the element itself and move up the DOM tree
    for (let el = item; el && el !== document; el = el.parentNode) {
        let style = window.getComputedStyle(el);
        if(style.display === "none"){return false;}
        if(style.visibility === "hidden"){return false;}
		if(style.opacity  === "0"){return false;}
		if(style.width === "0" && style.height === "0"){return false;}
		if(item.offsetWidth === "0" && item.offsetHeight === "0"){return false;}
    }
    return true;
}

function isItemSROnly(item){
	let style;
	while (item.parentElement) {
	  style = window.getComputedStyle(item);
	  if(style.width == "1px" && style.height == "1px" && style.clip == "rect(1px, 1px, 1px, 1px)" && style.display!=='none' && style.visibility!== 'hidden' && style.overflow == "hidden") return true;
	  item = item.parentElement;
	}
	return false
}

function isItemDisplayNone(item){
	while (item.parentElement) {
	  if(window.getComputedStyle(item).display =='none') return true;
	  item = item.parentElement;
	}
	return false
}

function isItemHasVisibleContent(item){
	if(!item.innerText) return false;
	const lang = item.closest('[lang]').getAttribute('lang');
	// textContent : recup les elements cachés et les <script><style>
	// innerText : ne recupère pas les élements cachés
	if(item.innerText && sanitizeText(item.innerText,lang) == "") return false;
	let style_i,style_j;
	// A remplacer par un while
	//console.log(item.childNodes)
	for(let i = 0; i < item.childNodes.length; i++){
		if(item.childNodes[i].nodeName != "#text" && item.childNodes[i].nodeName != "#comment"){
			// console.log(item.childNodes[i])
			style_i = window.getComputedStyle(item.childNodes[i]);
			if(style_i.display =='none' || (style_i.width == "1px" && style_i.height == "1px" && style_i.clip == "rect(1px, 1px, 1px, 1px)" && style_i.display!=='none' && style_i.visibility!== 'hidden' && style_i.overflow == "hidden")){
				// L'enfant n'est pas visible
			 }
			 else{
				for(let j = 0; j < item.childNodes[i].childNodes.length; j++){
					if(item.childNodes[i].childNodes[j] && item.childNodes[i].childNodes[j].nodeName != "#text" && item.childNodes[i].childNodes[j].nodeName != "#comment"){
						style_j = window.getComputedStyle(item.childNodes[i].childNodes[j]);
						if(style_j.display =='none' || (style_j.width == "1px" && style_j.height == "1px" && style_j.clip == "rect(1px, 1px, 1px, 1px)" && style_j.display!=='none' && style_j.visibility!== 'hidden' && style_j.overflow == "hidden")){
							// L'enfant n'est pas visible
						}
						else{
							return true;
						}
					}
				}
			}
		}
	}
	return true;
}

function isItemHasDirectContent(item){
	const lang = item.closest('[lang]').getAttribute('lang');
	let tempElement = item.cloneNode(true);
	tempElement.querySelectorAll("*").forEach(function(el){el.remove();});
	if(tempElement.textContent && sanitizeText(tempElement.textContent, lang) != ""){return true;}
	return false;
}

// Fonction Sanitize Text = No extra space, trimmed 
function sanitizeText(txt, locale) {
	return txt.toLowerCase().toLocaleLowerCase(locale).replaceAll(/\n|\r/g, ' ').replaceAll(/[.:;,?!{}$()|'"-]/g, ' ').replaceAll(/\s+/g, ' ').trim();
}

// Fonction Calculate Contrast (https://dev.to/alvaromontoro/building-your-own-color-contrast-checker-4j7o)
function hexToRgbArray(hex) {
  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  hex = hex.replace(shorthandRegex, function(m, r, g, b) {return r + r + g + g + b + b;});
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {r: parseInt(result[1], 16),g: parseInt(result[2], 16),b: parseInt(result[3], 16)} : null;
}

function rgbToRgbArray(rgbStr) {
  const [r, g, b] = rgbStr.match(/\d+/g).map(Number);
  return { r, g, b};
}

function luminance(r, g, b) {
    var a = [r, g, b].map(function (v) {v /= 255;
        return v <= 0.03928 ? v / 12.92 : Math.pow( (v + 0.055) / 1.055, 2.4 );
    });
    return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

function getInheritedBackgroundColor(item) {
  var backgroundColor = window.getComputedStyle(item).getPropertyValue('background-color');
  if (backgroundColor != "rgba(0, 0, 0, 0)") return backgroundColor
  if (!item.parentElement) return "rgba(0, 0, 0, 0)";
  return getInheritedBackgroundColor(item.parentElement)
}

function setItemToResultList(list,item){
	if(list=="crit"){ result_crit += item;}
	else if(list=="nc"){ result_nc += item;}
	else if(list=="nth"){ result_nth += item;}
	else if(list=="man"){ result_man += item;}
	else if(list=="dev"){ result_dev += item;}
	else { alert("erreur setItemToResultList");}
}


// Create the result Panel
let checkA11YPanel = document.createElement('div');
checkA11YPanel.setAttribute("id", "checkA11YPanel");

let ThirdPart = '<p id="result_html5">W3C : <a href="https://validator.w3.org/nu/?doc='+encodeURIComponent(currentUrl)+'" target="_blank">lien</a></p>';
if(!isPreview){
	ThirdPart ='<ul><li id="result_html5">W3C : <a href="https://validator.w3.org/nu/?doc='+encodeURIComponent(currentUrl)+'" target="_blank">lien</a></li><li id="result_wave">WAVE : <a href="https://wave.webaim.org/report#/'+encodeURIComponent(currentUrl)+'" target="_blank">lien</a></li><li id="result_lighthouse">Lighthouse : <a href="https://pagespeed.web.dev/analysis?url='+encodeURIComponent(currentUrl)+'" target="_blank">lien</a></li></ul>';
}

checkA11YPanel.innerHTML = '<div class="panel-header"><h1>A11Y Review</h1></div><div class="panel-body">'+result_global+'<hr><details class="cmp-accordion"><summary class="cmp-accordion__summary"><h2 class="cmp-accordion__header">Tests automatiques <svg class="icon" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-filter" x="0" y="0"></use></svg></h2></summary><div class="cmp-accordion__panel">'+ThirdPart+'</div></details></div>';

document.body.appendChild(checkA11YPanel);
//document.body.before(checkA11YPanel);

let checkA11YPanelBtn = document.createElement('button');
checkA11YPanelBtn.setAttribute("id", "checkA11YPanelBtn");
checkA11YPanelBtn.textContent = 'A11Y';
document.body.appendChild(checkA11YPanelBtn);
checkA11YPanelBtn.addEventListener('click', () => {toggleCheckA11YPanel();});

// Fonction Focus on Element
const result_focus = document.querySelectorAll('.result-focus');
let targetElement, targetElementOffset;
for(let i = 0; i < result_focus.length; i++){
  result_focus[i].addEventListener('click', (e) => {
    e.preventDefault();
	targetElement = document.querySelector("."+result_focus[i].getAttribute('data-destination'));
	if(targetElement && isItemVisible(targetElement)){
		targetElementOffset = targetElement.getBoundingClientRect().top - document.body.getBoundingClientRect().top
		window.scroll({ top: targetElementOffset, left: 0, behavior: 'smooth' });
		targetElement.style.outlineWidth = "10px";
		setTimeout(() => {targetElement.style.outlineWidth = "3px";}, 3000);
	}
	else{
		alert("Element non visible actuellement, essayez de redimentionner votre fenêtre pour le faire apparaîte ( ."+result_focus[i].getAttribute('data-destination')+")");
	}
  });
}

// Fonction Validator HTML5 async 
const validatorUrl = "https://validator.nu/?out=json"
async function validator(url = validatorUrl) {
  const response = await fetch(url, {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'text/html;charset=UTF-8' },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: new XMLSerializer().serializeToString(document)
  });
  return response.json();
}

validator().then(data => {
    //console.log(data);
	let elem = document.getElementById("result_html5");
	// Filter data result
	const filterStrings=["role is unnecessary for element","Section lacks heading","Bad value “” for attribute “id” on element “script”","Attribute “screen_capture_injected” not allowed","A “figure” element with a “figcaption” descendant must not have a “role” attribute","Element “meta” is missing required attribute “content”","Element “meta” is missing one or more of the following attributes: “content”, “property”","Element “style” not allowed as child of element “div” in this context. (Suppressing further errors from this subtree.)","CSS: Parse Error."].join("|");
	const error = data.messages.filter(msg => msg.type === 'error' && msg?.message.match(filterStrings) === null);
	let msg_html5 = "";
	
	if (error.length) {
	  console.group(`%c${error.length} validation errors`, "background-color:#D93025;color:#FFF;padding:1px 4px");
	  error.forEach(msg => {
		console.groupCollapsed(`%c${msg.message} (line: ${msg.lastLine})`, "color:#D93025");
		console.table(msg);
		msg_html5 += "<li>"+msg.message+" (line: "+msg.lastLine+")</li>";
		console.groupEnd();
	  })
	  console.groupEnd();
	  if(msg_html5  != ""){
		//console.log("ok" + msg_html5)
		elem.innerHTML += "<ul>"+msg_html5+"</ul>";
	  }
	}
	else{
		elem.innerHTML += " Aucune erreur détéctée"
	}
})
  
// Fonction LightHouse

if(!isPreview){
	const lighthouseUrl = "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";
	// "https://pagespeed.web.dev/analysis?url='+encodeURIComponent(currentUrl)+'" 
	let lighthouseOptions = "locale=fr-FR&category=accessibility&category=best-practices&category=seo";
	
	if(currentWidth > 500) { lighthouseOptions += "&strategy=desktop";}
	else {lighthouseOptions += "&strategy=mobile";}
	
	async function lighthouse(url = lighthouseUrl) {
	  const response = await fetch(url+'?'+lighthouseOptions+'&url='+encodeURIComponent(currentUrl), {
		method: 'GET',
		mode: 'cors',
		cache: 'no-cache',
		credentials: 'same-origin',
		headers: { 'Content-Type': 'text/html;charset=UTF-8' },
		redirect: 'follow',
		referrerPolicy: 'no-referrer'
	  });
	  return response.json();
	}

	lighthouse().then(data => {
      console.log(data.lighthouseResult.categories);
	  
	  // Filter data result
	  let lighthouse_access_score = data.lighthouseResult.categories["accessibility"].score * 100;
	  let lighthouse_bp_score = data.lighthouseResult.categories["best-practices"].score * 100;
	  let lighthouse_seo_score = data.lighthouseResult.categories["seo"].score * 100;
	
	  if(lighthouse_access_score < 80) lighthouse_access_score = "<span style='color:red;'>"+lighthouse_access_score+"</span>";
	  if(lighthouse_bp_score < 80) lighthouse_bp_score = "<span style='color:red;'>"+lighthouse_bp_score+"</span>";
	  if(lighthouse_seo_score < 80) lighthouse_seo_score = "<span style='color:red;'>"+lighthouse_seo_score+"</span>";
	
	  const lighthouse_msg = "<li>Accessibility : "+lighthouse_access_score+"/100</li><li>Best practices : "+lighthouse_bp_score+"/100</li><li>SEO : "+lighthouse_seo_score+"/100</li>";
	  
	  let elem = document.getElementById("result_lighthouse");
		elem.innerHTML += "<ul>"+lighthouse_msg+"</ul>";
	})
	
	if(wave_allow_credit){
		/*target="_blank">lien</a></li><li>WAVE : <a href="https://wave.webaim.org/report#/'+encodeURIComponent(currentUrl)+'" target="_blank">lien</a></li>*/
		// https://wave.webaim.org/api/request?key={yourAPIkey}&url=https://google.com/ --> APIKey payante ??
		
		const waveUrl = "https://wave.webaim.org/api/request?&url=https://google.com/";
		// https://wave.webaim.org/report#/'+encodeURIComponent(currentUrl)
		let waveOptions = "key={yourAPIkey}&format=json&reporttype=1";
		
		async function wave(url = waveUrl) {
		  const response = await fetch(url+'?'+lighthouseOptions+'&url='+encodeURIComponent(currentUrl), {
			method: 'GET',
			mode: 'cors',
			cache: 'no-cache',
			credentials: 'same-origin',
			headers: { 'Content-Type': 'text/html;charset=UTF-8' },
			redirect: 'follow',
			referrerPolicy: 'no-referrer'
		  });
		  return response.json();
		}

		wave().then(data => {
		  console.log(data);
		  
		  // Filter data result
		  const creditsremaining = data.statistics.creditsremaining;
		  const wave_error = data.categories.error.count;
		  const wave_contrast = data.categories.contrast.count;
		  const wave_alert = data.categories.alert.count;
		  const wave_feature = data.categories.feature.count;
		  const wave_structure = data.categories.structure.count;
		  const wave_aria = data.categories.aria.count;
		
		  const wave_msg = "<li>Error : "+wave_error+"</li><li>Contrast : "+wave_contrast+"</li><li>Alert : "+wave_alert+"</li><li>Feature : "+wave_feature+"</li><li>Structure : "+wave_structure+"</li><li>Aria : "+wave_aria+"</li>";
		  
		  let elem = document.getElementById("result_wave");
			elem.innerHTML += "<ul>"+wave_msg+"</ul>";
		})
	}
}


// Fonction open/close Panel 
function openCheckA11YPanel(){
	document.getElementById("checkA11YPanel").classList.add("active");
	document.body.classList.add("check-panel-active");
}

function closeCheckA11YPanel(){
	document.getElementById("checkA11YPanel").classList.remove("active");
	document.body.classList.remove("check-panel-active");
}

function toggleCheckA11YPanel(){
	if(document.getElementById("checkA11YPanel").classList.contains("active")){closeCheckA11YPanel();}
	else {openCheckA11YPanel();}
}

setTimeout(() => {
	openCheckA11YPanel();
	document.body.classList.add("panel-injected");
}, 500);