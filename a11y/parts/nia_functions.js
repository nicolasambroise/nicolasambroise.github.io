// Prépocess Function a appeler avant les check
function beforeCheck(){
	// Ouvrir les accordéons afin de pouvoir traiter leur contenu
	seeMoreAccordion();
	setTimeout(function() {
		seeMoreAddress();
	},5000); // --> Todo : remplacer par un wait for geoportail data-loaded = true;
}

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
	return txt.toLowerCase().toLocaleLowerCase(locale).replaceAll(/\n|\r/g, ' ').replaceAll(/[.:;,?!{}$()|'"-\/]/g, ' ').replaceAll(/\s+/g, ' ').trim();
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

