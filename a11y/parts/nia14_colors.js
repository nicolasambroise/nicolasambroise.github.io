/*- -------------------------------------------------------------------------------- */
/* 14. Couleur */
function check_part_14(){
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
}
module.exports = {check_part_14};