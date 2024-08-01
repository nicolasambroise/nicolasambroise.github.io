/* Script Check A11Y - Nicolas AMBROISE */

// Get URL Parameter
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

// Variables config globale
const debug_flag = true; // true -> affiche les logs
const only_redactor = urlParams.get("redac") === "true" ? true : false; // true --> affiche uniquement les critères relatif au redacteur
const wave_allow_credit = false; // true --> autorise les credits wave
const save_to_db = true; // true --> autorise la sauvegarde des resultats en base de données

// Environnement
const localUrl = "https://nicolasambroise.github.io/a11y"
const prodUrl = "https://webux.gouv.etat.lu/a11y/a11y_bookmarklet/src"
const pluginUrl = localUrl;

// Current URL
const currentUrl = window.location.href;
const homepage = document.querySelector('h1.logo.logo--homepage');
const homepageException = ["https://guichet.public.lu/fr/citoyens.html", "https://guichet.public.lu/fr/entreprises.html","https://guichet.public.lu/fr/leichte-sprache.html", "https://guichet.public.lu/en/citoyens.html", "https://guichet.public.lu/en/entreprises.html","https://guichet.public.lu/en/leichte-sprache.html","https://guichet.public.lu/de/citoyens.html", "https://guichet.public.lu/de/entreprises.html","https://guichet.public.lu/de/leichte-sprache.html"]
let isHomepage = false;
let isPreview = false;
let isPrototype = false;
if(homepage || homepageException.includes(currentUrl)) {isHomepage = true;}
if((currentUrl.includes("preview-") || currentUrl.includes("wcm")) && currentUrl.includes(".etat.lu")){isPreview = true;}
else if(currentUrl.includes("aem-test-")){isPreview = true;}
if(currentUrl.includes("/prototype/")){isPrototype = true;}


if(!currentUrl.includes(".public.lu") && !currentUrl.includes("gouvernement.lu") && !currentUrl.includes(".etat.lu") && !currentUrl.includes("sig-gr.eu")){
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
let result_crit_nb = "";
let result_nc_nb = "";
let result_nth_nb = "";
let result_dev_nb = "";
let result_man_nb = "";
let result_html5 = "";
let result_wave = "";
let result_lighthouse = "";

/*- -------------------------------------------------------------------------------- */
/* Pre-processing */

// clean console
console.clear();

console.log(queryString);
console.log(urlParams.get("redac"))
console.log(only_redactor);

// Ouverture des Accordéons
function seeMoreAccordion(){
	const accordion = document.querySelectorAll('.cmp-accordion details');
	for(let i = 0; i < accordion.length; i++){
		accordion[i].open = true;
	}
}

// Ouverture des Adresses du Geoportail
function seeMoreAddress(){
	const address = document.querySelectorAll('.geoportail-addresses ul li');
	for(let i = 0; i < address.length; i++){
		address[i].style.display = "block";
	}
}

seeMoreAccordion();
setTimeout(function() {
	seeMoreAddress();
},5000); // --> Todo : remplacer par un wait for geoportail data-loaded = true;


/*- -------------------------------------------------------------------------------- */
// Add JS
// - double sécurité pour que ce sript puisse également être appelé par l'extention chrome
if(!document.body.classList.contains('panel-injected')){
	/* Pour le bookmarklet */
	if (document.getElementById('injected-css') === null) {
	  let cssPanel = document.createElement('link');
	  cssPanel.id = 'injected-css';
	  cssPanel.rel = 'stylesheet';
	  cssPanel.href = pluginUrl+ '/stylePanel.css?v=' + Date.now();
	  document.head.appendChild(cssPanel);
	}

	if (document.getElementById('injected-js-part01') === null) {
	  var jsPart01 = document.createElement('script');
	  jsPart01.id = 'injected-js-part01';
	  jsPart01.src = pluginUrl+ '/parts/nia01_config.js?v=' + Date.now();
	  document.head.appendChild(jsPart01);
	}
	
	if (document.getElementById('injected-js-part02') === null) {
	  var jsPart02 = document.createElement('script');
	  jsPart02.id = 'injected-js-part02';
	  jsPart02.src = pluginUrl+ '/parts/nia02_images.js?v=' + Date.now();
	  document.head.appendChild(jsPart02);
	}
	
	if (document.getElementById('injected-js-part03') === null) {
	  var jsPart03 = document.createElement('script');
	  jsPart03.id = 'injected-js-part03';
	  jsPart03.src = pluginUrl+ '/parts/nia03_links.js?v=' + Date.now();
	  document.head.appendChild(jsPart03);
	}
	
	if (document.getElementById('injected-js-part04') === null) {
	  var jsPart04 = document.createElement('script');
	  jsPart04.id = 'injected-js-part04';
	  jsPart04.src = pluginUrl+ '/parts/nia04_form.js?v=' + Date.now();
	  document.head.appendChild(jsPart04);
	}
	
	if (document.getElementById('injected-js-part05') === null) {
	  var jsPart05 = document.createElement('script');
	  jsPart05.id = 'injected-js-part05';
	  jsPart05.src = pluginUrl+ '/parts/nia05_obligatoire.js?v=' + Date.now();
	  document.head.appendChild(jsPart05);
	}
	
	if (document.getElementById('injected-js-part06') === null) {
	  var jsPart06 = document.createElement('script');
	  jsPart06.id = 'injected-js-part06';
	  jsPart06.src = pluginUrl+ '/parts/nia06_structure.js?v=' + Date.now();
	  document.head.appendChild(jsPart06);
	}
	
	if (document.getElementById('injected-js-part07') === null) {
	  var jsPart07 = document.createElement('script');
	  jsPart07.id = 'injected-js-part07';
	  jsPart07.src = pluginUrl+ '/parts/nia07_title.js?v=' + Date.now();
	  document.head.appendChild(jsPart07);
	}
	
	if (document.getElementById('injected-js-part08') === null) {
	  var jsPart08 = document.createElement('script');
	  jsPart08.id = 'injected-js-part08';
	  jsPart08.src = pluginUrl+ '/parts/nia08_table.js?v=' + Date.now();
	  document.head.appendChild(jsPart08);
	}
	
	if (document.getElementById('injected-js-part09') === null) {
	  var jsPart09 = document.createElement('script');
	  jsPart09.id = 'injected-js-part09';
	  jsPart09.src = pluginUrl+ '/parts/nia09_nav.js?v=' + Date.now();
	  document.head.appendChild(jsPart09);
	}
	
	if (document.getElementById('injected-js-part10') === null) {
	  var jsPart10 = document.createElement('script');
	  jsPart10.id = 'injected-js-part10';
	  jsPart10.src = pluginUrl+ '/parts/nia10_oldtag.js?v=' + Date.now();
	  document.head.appendChild(jsPart10);
	}
	
	if (document.getElementById('injected-js-part11') === null) {
	  var jsPart11 = document.createElement('script');
	  jsPart11.id = 'injected-js-part11';
	  jsPart11.src = pluginUrl+ '/parts/nia11_lang.js?v=' + Date.now();
	  document.head.appendChild(jsPart11);
	}
	
	if (document.getElementById('injected-js-part12') === null) {
	  var jsPart12 = document.createElement('script');
	  jsPart12.id = 'injected-js-part12';
	  jsPart12.src = pluginUrl+ '/parts/nia12_button.js?v=' + Date.now();
	  document.head.appendChild(jsPart12);
	}
	
	if (document.getElementById('injected-js-part13') === null) {
	  var jsPart13 = document.createElement('script');
	  jsPart13.id = 'injected-js-part13';
	  jsPart13.src = pluginUrl+ '/parts/nia13_lottie.js?v=' + Date.now();
	  document.head.appendChild(jsPart13);
	}
	
	if (document.getElementById('injected-js-part14') === null) {
	  var jsPart14 = document.createElement('script');
	  jsPart14.id = 'injected-js-part14';
	  jsPart14.src = pluginUrl+ '/parts/nia14_colors.js?v=' + Date.now();
	  document.head.appendChild(jsPart14);
	}
	
	if (document.getElementById('injected-js-part15') === null) {
	  var jsPart15 = document.createElement('script');
	  jsPart15.id = 'injected-js-part15';
	  jsPart15.src = pluginUrl+ '/parts/nia15_secu.js?v=' + Date.now();
	  document.head.appendChild(jsPart15);
	}

	var p01 = new Promise(function(resolve) {jsPart01.addEventListener('load', () => {if(typeof check_part_01 == "function") check_part_01();setTimeout(resolve, 100);})});
	var p02 = new Promise(function(resolve) {jsPart02.addEventListener('load', () => {if(typeof check_part_02 == "function") check_part_02();setTimeout(resolve, 100);})});
	var p03 = new Promise(function(resolve) {jsPart03.addEventListener('load', () => {if(typeof check_part_03 == "function") check_part_03();setTimeout(resolve, 100);})});
	var p04 = new Promise(function(resolve) {jsPart04.addEventListener('load', () => {if(typeof check_part_04 == "function") check_part_04();setTimeout(resolve, 100);})});
	var p05 = new Promise(function(resolve) {jsPart05.addEventListener('load', () => {if(typeof check_part_05 == "function") check_part_05();setTimeout(resolve, 100);})});
	var p06 = new Promise(function(resolve) {jsPart06.addEventListener('load', () => {if(typeof check_part_06 == "function") check_part_06();setTimeout(resolve, 100);})});
	var p07 = new Promise(function(resolve) {jsPart07.addEventListener('load', () => {if(typeof check_part_07 == "function") check_part_07();setTimeout(resolve, 100);})});
	var p08 = new Promise(function(resolve) {jsPart08.addEventListener('load', () => {if(typeof check_part_08 == "function") check_part_08();setTimeout(resolve, 100);})});
	var p09 = new Promise(function(resolve) {jsPart09.addEventListener('load', () => {if(typeof check_part_09 == "function") check_part_09();setTimeout(resolve, 100);})});
	var p10 = new Promise(function(resolve) {jsPart10.addEventListener('load', () => {if(typeof check_part_10 == "function") check_part_10();setTimeout(resolve, 100);})});
	var p11 = new Promise(function(resolve) {jsPart11.addEventListener('load', () => {if(typeof check_part_11 == "function") check_part_11();setTimeout(resolve, 100);})});
	var p12 = new Promise(function(resolve) {jsPart12.addEventListener('load', () => {if(typeof check_part_12 == "function") check_part_12();setTimeout(resolve, 100);})});
	var p13 = new Promise(function(resolve) {jsPart13.addEventListener('load', () => {if(typeof check_part_13 == "function") check_part_13();setTimeout(resolve, 100);})});
	var p14 = new Promise(function(resolve) {jsPart14.addEventListener('load', () => {if(typeof check_part_14 == "function") check_part_14();setTimeout(resolve, 100);})});
	var p15 = new Promise(function(resolve) {jsPart15.addEventListener('load', () => {if(typeof check_part_15 == "function") check_part_15();setTimeout(resolve, 100);})});
}
else{
	/* Pour le Plugin */ 
	var p01 = new Promise(function(resolve) {check_part_01();setTimeout(resolve, 100);});
	var p02 = new Promise(function(resolve) {check_part_02();setTimeout(resolve, 100);});
	var p03 = new Promise(function(resolve) {check_part_03();setTimeout(resolve, 100);});
	var p04 = new Promise(function(resolve) {check_part_04();setTimeout(resolve, 100);});
	var p05 = new Promise(function(resolve) {check_part_05();setTimeout(resolve, 100);});
	var p06 = new Promise(function(resolve) {check_part_06();setTimeout(resolve, 100);});
	var p07 = new Promise(function(resolve) {check_part_07();setTimeout(resolve, 100);});
	var p08 = new Promise(function(resolve) {check_part_08();setTimeout(resolve, 100);});
	var p09 = new Promise(function(resolve) {check_part_09();setTimeout(resolve, 100);});
	var p10 = new Promise(function(resolve) {check_part_10();setTimeout(resolve, 100);});
	var p11 = new Promise(function(resolve) {check_part_11();setTimeout(resolve, 100);});
	var p12 = new Promise(function(resolve) {check_part_12();setTimeout(resolve, 100);});
	var p13 = new Promise(function(resolve) {check_part_13();setTimeout(resolve, 100);});
	var p14 = new Promise(function(resolve) {check_part_14();setTimeout(resolve, 100);});
	var p15 = new Promise(function(resolve) {check_part_15();setTimeout(resolve, 100);});
}

Promise.all([p01,p02,p03,p04,p05,p06,p07,p08,p09,p10,p11,p12,p13,p14,p15])
.then(function() {setTimeout(createResultPanel(), 100);})
.then(function() {setTimeout(thirdPartValidation(), 100);})
.then(function() {setTimeout(activateCheckA11YPanel(), 100);});

// END
/*- -------------------------------------------------------------------------------- */


// Fonction mise en coleur des erreurs
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
	else if(item.style.outlineColor != "#ea0202" && item.style.outlineColor != "rgb(234, 2, 2)") {
		item.setAttribute("style","outline: 3px solid "+color+" !important");
	}
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

// Fonction SR Only : Renvoi TRUE si l'item est visuellement masqué (classe .at)
function isItemSROnly(item){
	let style;
	while (item.parentElement) {
	  style = window.getComputedStyle(item);
	  //if(style.width == "1px" && style.height == "1px" && style.clip == "rect(1px, 1px, 1px, 1px)" && style.display!=='none' && style.visibility!== 'hidden' && style.overflow == "hidden") return true;
	  if(style.clip == "rect(1px, 1px, 1px, 1px)" && style.display!=='none' && style.visibility!== 'hidden' && style.overflow == "hidden") return true;
	  item = item.parentElement;
	}
	return false
}

// Fonction Display None : Renvoi TRUE si l'item est masqué (display:none)
function isItemDisplayNone(item){
	while (item.parentElement) {
	  if(window.getComputedStyle(item).display =='none') return true;
	  item = item.parentElement;
	}
	return false
}

// Fonction Has Content : Renvoi TRUE si l'item possède un contenu textuel visible
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

// Fonction Has Direct Content : Renvoi TRUE si l'item possède un contenu direct
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
  var a = [r, g, b].map(function (v) {v /= 255;return v <= 0.03928 ? v / 12.92 : Math.pow( (v + 0.055) / 1.055, 2.4 );});
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}

// Fonction chercher la couleur de background d'un élément parent
function getInheritedBackgroundColor(item) {
  let backgroundColor = window.getComputedStyle(item).getPropertyValue('background-color');
  if (backgroundColor != "rgba(0, 0, 0, 0)") return backgroundColor;
  if (!item.parentElement) return "rgba(0, 0, 0, 0)";
  return getInheritedBackgroundColor(item.parentElement);
}

// Fonction chercher la position absolute/fixed d'un élément parent
function getInheritedPosition(item) {
  let position = window.getComputedStyle(item).getPropertyValue('position');
  if (position == "absolute" || position == "fixed") return position;
  if (!item.parentElement) return "relative";
  return getInheritedPosition(item.parentElement);
}

// Fonction d'ajout à la liste des résultats 
function setItemToResultList(list,item){
	if(list=="crit"){ result_crit += item;result_crit_nb++}
	else if(list=="nc"){ result_nc += item;result_nc_nb++}
	else if(list=="nth"){ result_nth += item;result_nth_nb++}
	else if(list=="man"){ result_man += item;result_man_nb++}
	else if(list=="dev"){ result_dev += item;result_dev_nb++}
	else { alert("erreur setItemToResultList");}
}

// Create the result Panel
function createResultPanel(){
	let result_global = "";
	if (result_crit != ""){result_crit = "<h2>Points critiques</h2><ul>"+result_crit+"</ul>";}
	if (result_nc != ""){result_nc = "<h2>Points non-conformes</h2><ul>"+result_nc+"</ul>";}
	if (result_nth != ""){result_nth = "<h2>Nice to have</h2><ul>"+result_nth+"</ul>";}
	if (result_dev != ""){result_dev = "<h2>Problèmes Techniques</h2><ul>"+result_dev+"</ul>";}
	if (result_man != ""){result_man = "<h2>A vérifier manuellement</h2><ul>"+result_man+"</ul>";}
	if (result_crit == "" && result_nc == "" && result_nth == "" && result_dev == "" && result_man == ""  ){
	  result_global = "Pas de points remontés !"; 
	}
	else { result_global = result_crit + result_nc + result_nth + result_man + result_dev;}

	let checkA11YPanel = document.createElement('div');
	checkA11YPanel.setAttribute("id", "checkA11YPanel");

	let ThirdPart = '<p id="result_html5">Validator W3C : <a href="https://validator.w3.org/nu/?doc='+encodeURIComponent(currentUrl)+'" target="_blank">lien</a></p>';
	if(!isPreview){
		ThirdPart ='<ul><li id="result_html5">Validator W3C : <a href="https://validator.w3.org/nu/?doc='+encodeURIComponent(currentUrl)+'" target="_blank">lien</a></li><li id="result_wave">WAVE : <a href="https://wave.webaim.org/report#/'+encodeURIComponent(currentUrl)+'" target="_blank">lien</a></li><li id="result_lighthouse">Lighthouse : <a href="https://pagespeed.web.dev/analysis?url='+encodeURIComponent(currentUrl)+'" target="_blank">lien</a></li></ul>';
	}

	if(!only_redactor) {
		checkA11YPanel.innerHTML = '<div class="panel-header"><h1>Accessibility check</h1></div><div class="panel-body">'+result_global+'<hr><details class="cmp-accordion"><summary class="cmp-accordion__summary"><h2 class="cmp-accordion__header">Tests automatiques <svg class="icon" viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-filter" x="0" y="0"></use></svg></h2></summary><div class="cmp-accordion__panel">'+ThirdPart+'</div></details></div>';
	}
	else {
		checkA11YPanel.innerHTML = '<div class="panel-header"><h1>Accessibility check</h1></div><div class="panel-body">'+result_global+'</div>';
	}
	document.body.appendChild(checkA11YPanel);


	// Fonction Focus on Element
	const result_focus = document.querySelectorAll('a.result-focus');
	let targetElement, targetElementOffset;
	for(let i = 0; i < result_focus.length; i++){
		result_focus[i].addEventListener('click', (e) => {
			e.preventDefault();
			targetElement = document.querySelector("."+result_focus[i].getAttribute('data-destination'));
			if(targetElement && isItemVisible(targetElement)){
				targetElementOffset = targetElement.getBoundingClientRect().top - document.body.getBoundingClientRect().top;
				window.scroll({ top: targetElementOffset, left: 0, behavior: 'smooth' });
				targetElement.style.outlineWidth = "10px";
				setTimeout(() => {targetElement.style.outlineWidth = "3px";}, 3000);
			}
			else{
				alert("Element non visible actuellement, essayez de redimentionner votre fenêtre pour le faire apparaîte ( ."+result_focus[i].getAttribute('data-destination')+")");
			}
		});
	}
	
	// Déplacer le focus en haut de page 
	window.scroll({ top: 0, left: 0, behavior: 'smooth' });
}

// Fonction pour enlever les crochets et leur contenu à l'interieur de ceux-ci
function removeBracket(data){
	return data ? data.replaceAll(/(\r\n|\n|\r)/g, "").replaceAll(/\[.+?\]/g, "").replaceAll(/"/g, "'") : "";	
}


// Fonction Validation Third-part : HTML5 Wave Lighthouse
function thirdPartValidation(){
	
	if(!only_redactor) {
		// Fonction Validator HTML5
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

		let validator_p = Promise.resolve(validator());
		validator_p.then(data => {
			//console.log(data);
			let elem = document.getElementById("result_html5");
			// Filter data result
			const filterStrings=["role is unnecessary for element","Section lacks heading","Bad value “” for attribute “id” on element “script”","Attribute “screen_capture_injected” not allowed","A “figure” element with a “figcaption” descendant must not have a “role” attribute","Element “meta” is missing required attribute “content”","Element “meta” is missing one or more of the following attributes: “content”, “property”","Element “style” not allowed as child of element “div” in this context. (Suppressing further errors from this subtree.)","CSS: Parse Error.","Attribute “value” not allowed on element “meta” at this point."].join("|");
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
				elem.innerHTML += "<ul>"+msg_html5+"</ul>";
				result_html5 = "{details : "+msg_html5+"}";
			  }
			}
			else{
				elem.innerHTML += " Aucune erreur détéctée"
				result_html5 = "{}";
			}	
		})
		
		if(!isPreview){
			
			// Fonction LightHouse
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

			let lighthouse_p = Promise.resolve(lighthouse());
			lighthouse_p.then(data => {
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
			  result_lighthouse = "{Accessibility : "+lighthouse_access_score+",\"Best practices\" : "+lighthouse_bp_score+",Seo : "+lighthouse_seo_score+"}";
			})

			if(wave_allow_credit){
				// Fonction Wave
				const waveUrl = "https://wave.webaim.org/api/request?&url=https://google.com/";
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
				
				let wave_p = Promise.resolve(wave());
				wave_p.then(data => {
				  console.log(data);
				  
				  // Filter data result
				  const creditsremaining = data.statistics.creditsremaining;
				  const wave_error = data.categories.error.count;
				  const wave_contrast = data.categories.contrast.count;
				  const wave_alert = data.categories.alert.count;
				  const wave_feature = data.categories.feature.count;
				  const wave_structure = data.categories.structure.count;
				  const wave_aria = data.categories.aria.count;
				
				  let wave_msg = "<li>Error : "+wave_error+"</li><li>Contrast : "+wave_contrast+"</li><li>Alert : "+wave_alert+"</li><li>Feature : "+wave_feature+"</li><li>Structure : "+wave_structure+"</li><li>Aria : "+wave_aria+"</li>";
				  
				  let elem = document.getElementById("result_wave");
				  elem.innerHTML += "<ul>"+wave_msg+"</ul>";
				  
				  result_wave = "{Error : "+wave_error+",Contrast : "+wave_contrast+",Alert : "+wave_alert+",Feature : "+wave_feature+",Structure : "+wave_structure+",Aria : "+wave_aria+"}";
				})
			
				// Set data to Bdd
				Promise.all([lighthouse_p,validator_p,wave_p])
				.then(function() {setTimeout(saveInBdd(), 100);});
			}
			else{
				// Set data to Bdd
				Promise.all([lighthouse_p,validator_p])
				.then(function() {setTimeout(saveInBdd(), 100);});
			}
		}
	}
}

// Fonction Save result to db
function saveInBdd(){	
	
	let dataToSave = {
		"url":  currentUrl,
		"nc": result_nc_nb,
		"nc_details" :  removeBracket(result_nc),
		"nth" : result_nth_nb,
		"nth_details" : removeBracket(result_nth),
		"man" : result_man_nb,
		"man_details" : removeBracket(result_man),
		"dev" : result_dev_nb,
		"dev_details" : removeBracket(result_dev),
		"crit" : result_crit_nb,
		"crit_details" : removeBracket(result_crit),
		"w3c" : result_html5,
		"wave" : result_wave,
		"lighthouse" : result_lighthouse
	};

	console.log(dataToSave);
	if(!isPreview && save_to_db){
		
		// Problème CORE POLICY
		const db_api_url = "https://webux.gouv.etat.lu/a11y/a11y_bookmarklet/backend/save_result.php"; 
		console.log("START Save Bdd");
		const response = fetch(db_api_url, {
				method: "POST",
				headers: {'Content-Type': 'text/html;charset=UTF-8'}, 
				body: JSON.stringify(dataToSave)
			})
			.then(response => console.log(response.status) || response) // output the status and return response
	}
}

// Fonction Check A11Y Panel
function activateCheckA11YPanel(){
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

	let checkA11YPanelBtn = document.createElement('button');
	checkA11YPanelBtn.setAttribute("id", "checkA11YPanelBtn");
	checkA11YPanelBtn.textContent = 'Renowify';
	document.body.appendChild(checkA11YPanelBtn);
	checkA11YPanelBtn.addEventListener('click', () => {toggleCheckA11YPanel();});

	openCheckA11YPanel();
	document.body.classList.add("panel-injected");
}