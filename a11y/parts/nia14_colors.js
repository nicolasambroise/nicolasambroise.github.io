/*- -------------------------------------------------------------------------------- */
/* 14. Couleur */
function check_part_14(){
	if(debug_flag) console.log("14 Couleur");

	// --> test 10.5.1 color / bg/ degradé
	// --> test 10.6.1 lien visible par rapport au texte environnemt
	// --> test 10.7.1 prise de focus visible
	// --> Contenu avec un linear-gradiant sans couleur de backup
	

	// A Check All text
	const nia14a_nodes = document.querySelectorAll('p, span:not(.checkA11YSpan), li, strong, h1, h2, h3, h4, h5, small, a:not([disabled]), button:not([disabled]), blockquote, q, dd, dt, label');
	let nia14a_flag1 = false;
	let nia14a_flag2 = false;
	let nia14a_color1,nia14a_color2,nia14a_color1rbg, nia14a_color2rbg,nia14a_color1luminance, nia14a_color2luminance, nia14a_ratio,nia14a_ratio_inv, nia14a_bold, nia14a_large, nia14a_isbold;
	if(nia14a_nodes && nia14a_nodes.length > 0){
		for(let i = 0; i < nia14a_nodes.length; i++){
			if(isItemVisible(nia14a_nodes[i]) && !isItemSROnly(nia14a_nodes[i]) && isItemHasVisibleContent(nia14a_nodes[i]) && isItemHasDirectContent(nia14a_nodes[i])){
				nia14a_color1 = window.getComputedStyle(nia14a_nodes[i],null).getPropertyValue('color');  // Text Color
				nia14a_color2 = getInheritedBackgroundColor(nia14a_nodes[i]) // Bg Color
				
				nia14a_position = getInheritedPosition(nia14a_nodes[i]);  // Text Position
				
				// Convert hexa
				if(nia14a_color1.indexOf("#") >= 0){ nia14a_color1rgb = hexToRgbArray(nia14a_color1);} else {nia14a_color1rgb = rgbToRgbArray(nia14a_color1);}
				if(nia14a_color2.indexOf("#") >= 0){ nia14a_color2rgb = hexToRgbArray(nia14a_color2);} else {nia14a_color2rgb = rgbToRgbArray(nia14a_color2);}
				nia14a_color1luminance = luminance(nia14a_color1rgb.r, nia14a_color1rgb.g, nia14a_color1rgb.b);
				nia14a_color2luminance = luminance(nia14a_color2rgb.r, nia14a_color2rgb.g, nia14a_color2rgb.b);
				// Calcul ratio
				nia14a_ratio = nia14a_color1luminance > nia14a_color2luminance ? ((nia14a_color2luminance + 0.05) / (nia14a_color1luminance + 0.05)) : ((nia14a_color1luminance + 0.05) / (nia14a_color2luminance + 0.05));
				nia14a_ratio_inv = 1/nia14a_ratio;
				
				nia14a_large = parseFloat(window.getComputedStyle(nia14a_nodes[i],null).getPropertyValue('font-size'));
				nia14a_bold = window.getComputedStyle(nia14a_nodes[i],null).getPropertyValue('font-weight');
				nia14a_isbold = false;
				if(nia14a_bold == "bold" || nia14a_bold == "bolder" || nia14a_bold >= 500) {nia14a_isbold = true;}
				//console.log("font-size : "+nia14a_large+" / font-weight "+nia14a_bold)
				
				if(nia14a_isbold == false && nia14a_large < 24 && nia14a_ratio_inv < 4.5){
					if(debug_flag) console.log("14A - FAIL 3.2.1 Standard ratio : "+nia14a_ratio_inv+" ("+nia14a_color1+" vs "+nia14a_color2+")");
					if(nia14a_position != "absolute" && nia14a_position != "fixed"){
						setItemOutline(nia14a_nodes[i],"orange","nia14a","14-A");
						nia14a_flag1 = true;
					}
					else{
						setItemOutline(nia14a_nodes[i],"yellow","nia14a","14-A");
						nia14a_flag2 = true;
					}
				}
				else if(nia14a_isbold == true && nia14a_large < 18.5 && nia14a_ratio_inv < 4.5){
					if(debug_flag) console.log("14A - FAIL 3.2.2 Standard ratio : "+nia14a_ratio_inv+" ("+nia14a_color1+" vs "+nia14a_color2+")");
					if(nia14a_position != "absolute" && nia14a_position != "fixed"){
						setItemOutline(nia14a_nodes[i],"orange","nia14a","14-A");
						nia14a_flag1 = true;
					}
					else{
						setItemOutline(nia14a_nodes[i],"yellow","nia14a","14-A");
						nia14a_flag2 = true;
					}
				}
				else if(nia14a_isbold == false && nia14a_large >= 24 && nia14a_ratio_inv < 3){
					if(debug_flag) console.log("14A - FAIL 3.2.3 Standard ratio : "+nia14a_ratio_inv+" ("+nia14a_color1+" vs "+nia14a_color2+")");
					if(nia14a_position != "absolute" && nia14a_position != "fixed"){
						setItemOutline(nia14a_nodes[i],"orange","nia14a","14-A");
						nia14a_flag1 = true;
					}
					else{
						setItemOutline(nia14a_nodes[i],"yellow","nia14a","14-A");
						nia14a_flag2 = true;
					}
				}
				else if(nia14a_isbold == true && nia14a_large >= 18.5 && nia14a_ratio_inv < 3){
					if(debug_flag) console.log("14A - FAIL 3.2.4 Standard ratio : "+nia14a_ratio_inv+" ("+nia14a_color1+" vs "+nia14a_color2+")");
					if(nia14a_position != "absolute" && nia14a_position != "fixed"){
						setItemOutline(nia14a_nodes[i],"orange","nia14a","14-A");
						nia14a_flag1 = true;
					}
					else{
						setItemOutline(nia14a_nodes[i],"yellow","nia14a","14-A");
						nia14a_flag2 = true;
					}
				}
				else if(nia14a_nodes[i].tagName == "A" || nia14a_nodes[i].tagName == "BUTTON"){
					// TODO On check au focus
					nia14a_nodes[i].focus();
					
					nia14a_color1 = window.getComputedStyle(nia14a_nodes[i],null).getPropertyValue('color');  // Text Color
					nia14a_color2 = getInheritedBackgroundColor(nia14a_nodes[i]) // Bg Color
					// Convert hexa
					if(nia14a_color1.indexOf("#") >= 0){ nia14a_color1rgb = hexToRgbArray(nia14a_color1);} else {nia14a_color1rgb = rgbToRgbArray(nia14a_color1);}
					if(nia14a_color2.indexOf("#") >= 0){ nia14a_color2rgb = hexToRgbArray(nia14a_color2);} else {nia14a_color2rgb = rgbToRgbArray(nia14a_color2);}
					nia14a_color1luminance = luminance(nia14a_color1rgb.r, nia14a_color1rgb.g, nia14a_color1rgb.b);
					nia14a_color2luminance = luminance(nia14a_color2rgb.r, nia14a_color2rgb.g, nia14a_color2rgb.b);
					// Calcul ratio
					nia14a_ratio = nia14a_color1luminance > nia14a_color2luminance ? ((nia14a_color2luminance + 0.05) / (nia14a_color1luminance + 0.05)) : ((nia14a_color1luminance + 0.05) / (nia14a_color2luminance + 0.05));
					nia14a_ratio_inv = 1/nia14a_ratio;
					//console.log(color1+" vs "+color2+" = "+ nia14a_ratio_inv)
					
					nia14a_large = parseFloat(window.getComputedStyle(nia14a_nodes[i],null).getPropertyValue('font-size'));
					nia14a_bold = window.getComputedStyle(nia14a_nodes[i],null).getPropertyValue('font-weight');
					nia14a_isbold = false;
					if(nia14a_bold == "bold" || nia14a_bold == "bolder" || nia14a_bold >= 500) {nia14a_isbold = true;}
					//console.log("font-size : "+nia14a_large+" / font-weight "+nia14a_bold)
					
					if(nia14a_isbold == false && nia14a_large < 24 && nia14a_ratio_inv < 4.5){
						if(debug_flag) console.log("14A - FAIL 3.2.1 Standard ratio : "+nia14a_ratio_inv+" ("+nia14a_color1+" vs "+nia14a_color2+")");
						if(nia14a_position != "absolute" && nia14a_position != "fixed"){
							setItemOutline(nia14a_nodes[i],"orange","nia14a","14-A");
							nia14a_flag1 = true;
						}
						else{
							setItemOutline(nia14a_nodes[i],"yellow","nia14a","14-A");
							nia14a_flag2 = true;
						}
					}
					else if(nia14a_isbold == true && nia14a_large < 18.5 && nia14a_ratio_inv < 4.5){
						if(debug_flag) console.log("14A - FAIL 3.2.2 Standard ratio : "+nia14a_ratio_inv+" ("+nia14a_color1+" vs "+nia14a_color2+")");
						if(nia14a_position != "absolute" && nia14a_position != "fixed"){
							setItemOutline(nia14a_nodes[i],"orange","nia14a","14-A");
							nia14a_flag1 = true;
						}
						else{
							setItemOutline(nia14a_nodes[i],"yellow","nia14a","14-A");
							nia14a_flag2 = true;
						}
					}
					else if(nia14a_isbold == false && nia14a_large >= 24 && nia14a_ratio_inv < 3){
						if(debug_flag) console.log("14A - FAIL 3.2.3 Standard ratio : "+nia14a_ratio_inv+" ("+nia14a_color1+" vs "+nia14a_color2+")");
						if(nia14a_position != "absolute" && nia14a_position != "fixed"){
							setItemOutline(nia14a_nodes[i],"orange","nia14a","14-A");
							nia14a_flag1 = true;
						}
						else{
							setItemOutline(nia14a_nodes[i],"yellow","nia14a","14-A");
							nia14a_flag2 = true;
						}
					}
					else if(nia14a_isbold == true && nia14a_large >= 18.5 && nia14a_ratio_inv < 3){
						if(debug_flag) console.log("14A - FAIL 3.2.4 Standard ratio : "+nia14a_ratio_inv+" ("+nia14a_color1+" vs "+nia14a_color2+")");
						if(nia14a_position != "absolute" && nia14a_position != "fixed"){
							setItemOutline(nia14a_nodes[i],"orange","nia14a","14-A");
							nia14a_flag1 = true;
						}
						else{
							setItemOutline(nia14a_nodes[i],"yellow","nia14a","14-A");
							nia14a_flag2 = true;
						}
					}
				}
			}
		}
	}
	if(nia14a_flag1 == true) {
	  setItemToResultList("dev","<li><a href='#' data-destination='nia14a' class='result-focus label-orange'>14-A</a> : Présence d'éléments textuels insuffisament contrasté</li>");
	}
	if(nia14a_flag2 == true) {
	  setItemToResultList("man","<li><a href='#' data-destination='nia14a' class='result-focus label-yellow'>14-A</a> : Vérifier le contraste de certains éléments textuels</li>");
	}

	// B. Opacité Form Field Border
	const nia14b_nodes = document.querySelectorAll('input, select, textarea, button');
	let nia14b_flag1 = false;
	let nia14b_flag2 = false;
	let nia14b_flag3 = false;
	let nia14b_color1, nia14b_color2, nia14b_color3, nia14b_color1rbg, nia14b_color2rbg, nia14b_color3rgb, nia14b_color1luminance, nia14b_color2luminance, nia14b_color3luminance;
	let nia14b_ratio12, nia14b_ratio12_inv,nia14b_ratio13, nia14b_ratio13_inv,nia14b_ratio23, nia14b_ratio23_inv;
	if(nia14b_nodes && nia14b_nodes.length > 0){
		for(let i = 0; i < nia14b_nodes.length; i++){
			if(isItemVisible(nia14b_nodes[i])){
				nia14b_color1 = window.getComputedStyle(nia14b_nodes[i],null).getPropertyValue('border-color');  // Border Color
				nia14b_color2 = window.getComputedStyle(nia14b_nodes[i],null).getPropertyValue('background-color');  // In BG Color
				nia14b_color3 = getInheritedBackgroundColor(nia14b_nodes[i].parentElement) // Out BG Color
				nia14b_border = window.getComputedStyle(nia14b_nodes[i],null).getPropertyValue('border-width');  // Border
				nia14b_position = window.getComputedStyle(nia14b_nodes[i],null).getPropertyValue('position');  // Border

				if(nia14b_color1.length >20) nia14b_color1 = window.getComputedStyle(nia14b_nodes[i],null).getPropertyValue('border-bottom-color');
				if(nia14b_color1 == "rgba(0, 0, 0, 0)") nia14b_color1 = window.getComputedStyle(nia14b_nodes[i],null).getPropertyValue('border-bottom-color');

				if(nia14b_color2 == "rgba(0, 0, 0, 0)" && (nia14b_position == "absolute" || nia14b_position == "fixed")){
					setItemOutline(nia14b_nodes[i],"yellow","nia14b1","14-B");
					nia14b_flag1 = true;
				}
				else if(nia14b_color2 == "rgba(0, 0, 0, 0)" && nia14b_color3 == "rgba(0, 0, 0, 0)"){
					setItemOutline(nia14b_nodes[i],"yellow","nia14b1","14-B");
					nia14b_flag2 = true;
				}
				else if(nia14b_color1 == "rgba(0, 0, 0, 0)" && nia14b_color2 == "rgba(0, 0, 0, 0)"){
					setItemOutline(nia14b_nodes[i],"yellow","nia14b1","14-B");
					nia14b_flag2 = true;
				}
				else if(nia14b_border == "0px" && nia14b_color2 == "rgba(0, 0, 0, 0)"){
					setItemOutline(nia14b_nodes[i],"yellow","nia14b1","14-B");
					nia14b_flag2 = true;
				}
				else if((nia14b_border == "0px" || nia14b_color1 == "rgba(0, 0, 0, 0)") && nia14b_color2 && nia14b_color3){
					
					if(nia14b_color2.indexOf("#") >= 0){ nia14b_color2rgb = hexToRgbArray(nia14b_color2);} else {nia14b_color2rgb = rgbToRgbArray(nia14b_color2);}
					if(nia14b_color3.indexOf("#") >= 0){ nia14b_color3rgb = hexToRgbArray(nia14b_color3);} else {nia14b_color3rgb = rgbToRgbArray(nia14b_color3);}
					
					
					
					nia14b_color2luminance = luminance(nia14b_color2rgb.r, nia14b_color2rgb.g, nia14b_color2rgb.b);
					nia14b_color3luminance = luminance(nia14b_color3rgb.r, nia14b_color3rgb.g, nia14b_color3rgb.b);
					// Calcul ratio
					nia14b_ratio23 = nia14b_color2luminance > nia14b_color3luminance ? ((nia14b_color2luminance + 0.05) / (nia14b_color3luminance + 0.05)) : ((nia14b_color3luminance + 0.05) / (nia14b_color2luminance + 0.05));
					
					nia14b_ratio23_inv = 1/nia14b_ratio23;

					
					if(nia14b_ratio23 < 3 && nia14b_ratio23_inv <3){
						console.log(nia14b_color2)
						console.log(nia14b_color3)
						console.log(nia14b_ratio23)
						console.log(nia14b_ratio23_inv)
						
						console.log("14B - FAIL 3.3.3 Standard ratio : "+nia14b_ratio23_inv+" ("+nia14b_color2+" vs "+nia14b_color3+")");
						setItemOutline(nia14b_nodes[i],"orange","nia14b2","14-B");
						nia14b_flag3 = true;
					}
				}
				
				// Convert hexa
				else if(nia14b_color1 && nia14b_color2 && nia14b_color3){
					if(nia14b_color1.indexOf("#") >= 0){ nia14b_color1rgb = hexToRgbArray(nia14b_color1);} else {nia14b_color1rgb = rgbToRgbArray(nia14b_color1);}
					if(nia14b_color2.indexOf("#") >= 0){ nia14b_color2rgb = hexToRgbArray(nia14b_color2);} else {nia14b_color2rgb = rgbToRgbArray(nia14b_color2);}
					if(nia14b_color3.indexOf("#") >= 0){ nia14b_color3rgb = hexToRgbArray(nia14b_color3);} else {nia14b_color3rgb = rgbToRgbArray(nia14b_color3);}
					nia14b_color1luminance = luminance(nia14b_color1rgb.r, nia14b_color1rgb.g, nia14b_color1rgb.b);
					nia14b_color2luminance = luminance(nia14b_color2rgb.r, nia14b_color2rgb.g, nia14b_color2rgb.b);
					nia14b_color3luminance = luminance(nia14b_color3rgb.r, nia14b_color3rgb.g, nia14b_color3rgb.b);
					// Calcul ratio
					nia14b_ratio12 = nia14b_color1luminance > nia14b_color2luminance ? ((nia14b_color2luminance + 0.05) / (nia14b_color1luminance + 0.05)) : ((nia14b_color1luminance + 0.05) / (nia14b_color2luminance + 0.05));
					nia14b_ratio12_inv = 1/nia14b_ratio12;
					nia14b_ratio13 = nia14b_color1luminance > nia14b_color3luminance ? ((nia14b_color3luminance + 0.05) / (nia14b_color1luminance + 0.05)) : ((nia14b_color1luminance + 0.05) / (nia14b_color3luminance + 0.05));
					nia14b_ratio13_inv = 1/nia14b_ratio13;
					nia14b_ratio23 = nia14b_color2luminance > nia14b_color3luminance ? ((nia14b_color2luminance + 0.05) / (nia14b_color3luminance + 0.05)) : ((nia14b_color3luminance + 0.05) / (nia14b_color2luminance + 0.05));
					nia14b_ratio23_inv = 1/nia14b_ratio23;
					
					if( nia14b_ratio12_inv < 3 && nia14b_ratio13_inv < 3 && nia14b_ratio23_inv < 3){
						
						console.log(nia14b_color1)
						console.log(nia14b_color2)
						console.log(nia14b_color3)
						console.log(nia14b_ratio12_inv)
						console.log(nia14b_ratio13_inv)
						console.log(nia14b_ratio23_inv)
						
						
						if(debug_flag && nia14b_ratio12_inv < 3) console.log("14B - FAIL 3.3.3 Standard ratio : "+nia14b_ratio12_inv+" ("+nia14b_color1+" vs "+nia14b_color2+")");
						else if(debug_flag && nia14b_ratio13_inv < 3) console.log("14B - FAIL 3.3.3 Standard ratio : "+nia14b_ratio13_inv+" ("+nia14b_color1+" vs "+nia14b_color3+")");
						else if(debug_flag && nia14b_ratio23_inv < 3) console.log("14B - FAIL 3.3.3 Standard ratio : "+nia14b_ratio23_inv+" ("+nia14b_color2+" vs "+nia14b_color3+")");
						setItemOutline(nia14b_nodes[i],"orange","nia14b2","14-B");
						nia14b_flag3 = true;
					}
				}
				else{
					console.log("couleur de bordure inconnu");
				}
			}
		}
	}
	if(nia14b_flag1 == true) {
	  setItemToResultList("man","<li><a href='#' data-destination='nia14b1' class='result-focus label-yellow'>14-B</a> : Présence d'élément graphique avec background transparent sur un élément en position absolute - Contraste à vérifier manuellement</li>");
	}
	if(nia14b_flag2 == true) {
	  setItemToResultList("man","<li><a href='#' data-destination='nia14b1' class='result-focus label-yellow'>14-B</a> : Présence d'élément graphique avec background transparent - Contraste à vérifier manuellement</li>");
	}
	if(nia14b_flag3 == true) {
	  setItemToResultList("dev","<li><a href='#' data-destination='nia14b2' class='result-focus label-orange'>14-B</a> : Présence d'élément graphique insuffisament contrasté</li>");
	}
	
	// C. Opacité Placeholder 
	// Open si topsearch ancre présent
	const nia14c_btn = document.querySelector('button.anchor[data-destination="#topsearch"][aria-expanded="false"]');
	if(nia14c_btn){nia14c_btn.click();}
	const nia14c_nodes = document.querySelectorAll('input[placeholder]');
	let nia14c_flag1 = false;
	let nia14c_flag2 = false;
	let nia14c_flag3 = false;
	let nia14c_color1,nia14c_color2,nia14c_color1rbg, nia14c_color2rbg,nia14c_color1luminance, nia14c_color2luminance, nia14c_ratio,nia14c_ratio_inv,nia14c_opacity;
	if(nia14c_nodes && nia14c_nodes.length > 0){
		for(let i = 0; i < nia14c_nodes.length; i++){
			if(isItemVisible(nia14c_nodes[i])){
				nia14c_color1 = window.getComputedStyle(nia14c_nodes[i],'::placeholder').getPropertyValue('color');  // Placeholder Color
				nia14c_color2 = getInheritedBackgroundColor(nia14c_nodes[i]) // Bg Color
				
				//console.log("14C "+nia14c_color1+" vs "+nia14c_color2);
				// Convert hexa
				if(nia14c_color1){
					if(nia14c_color1.indexOf("#") >= 0){ nia14c_color1rgb = hexToRgbArray(nia14c_color1);} else {nia14c_color1rgb = rgbToRgbArray(nia14c_color1);}
					if(nia14c_color2.indexOf("#") >= 0){ nia14c_color2rgb = hexToRgbArray(nia14c_color2);} else {nia14c_color2rgb = rgbToRgbArray(nia14c_color2);}
					nia14c_color1luminance = luminance(nia14c_color1rgb.r, nia14c_color1rgb.g, nia14c_color1rgb.b);
					nia14c_color2luminance = luminance(nia14c_color2rgb.r, nia14c_color2rgb.g, nia14c_color2rgb.b);
					// Calcul ratio
					nia14c_ratio = nia14c_color1luminance > nia14c_color2luminance ? ((nia14c_color2luminance + 0.05) / (nia14c_color1luminance + 0.05)) : ((nia14c_color1luminance + 0.05) / (nia14c_color2luminance + 0.05));
					nia14c_ratio_inv = 1/nia14c_ratio;
					//console.log(color1+" vs "+color2+" = "+ nia14c_ratio_inv)
					if(nia14c_ratio_inv < 4.5){
						if(debug_flag) console.log("14C - FAIL 3.2.1 Standard ratio : "+nia14c_ratio_inv+" ("+nia14c_color1+" vs "+nia14c_color2+")");
						setItemOutline(nia14c_nodes[i],"orange","nia14c","14-C");
						nia14c_flag1 = true;
					}
					if(nia14c_color1 == "rgb(0, 0, 0)"){
						// Todo : Résultat différent sur Firefox et Chrome --> à vérifier
						nia14c_flag2 = true;
					}
				}
				else{
					console.log("couleur de placeholder inconnu");
				}
				
				nia14c_opacity = window.getComputedStyle(nia14c_nodes[i],'::placeholder').getPropertyValue('opacity');  // Placeholder Color
				if(nia14c_opacity != "1"){
						setItemOutline(nia14c_nodes[i],"yellow","nia14c","14-C");
						nia14c_flag3 = true;
				}
			}
		}
	}
	if(nia14c_flag1 == true) {
	  setItemToResultList("dev","<li><a href='#' data-destination='nia14c' class='result-focus label-orange'>14-C</a> : Présence d'élément placeholder insuffisament contrasté</li>");
	}
	if(nia14c_flag2 == true) {
	  setItemToResultList("man","<li><a href='#' data-destination='nia14c' class='result-focus label-yellow'>14-C</a> : Vérifier si l'élément placeholder est suffisament contrasté</li>");
	}
	if(nia14c_flag3 == true) {
	  setItemToResultList("man","<li><a href='#' data-destination='nia14c' class='result-focus label-yellow'>14-C</a> : Vérifier si l'élément placeholder possède une opacité suffisante</li>");
	}

	/*
	// D. Opacité de l'outline
	const nia14d_nodes = document.querySelectorAll('*:not(.skiplinks) > a:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), [tabindex]:not([disabled]), summary');
	let nia14d_flag1 = false;
	let nia14d_flag1b = false;
	let nia14d_flag2 = false;
	let nia14d_has_pseudo = false;
	let nia14d_outline;
	let nia14d_color1,nia14d_color2,nia14d_color3,nia14d_color1rbg, nia14d_color2rbg, nia14d_color3rbg,nia14d_color1luminance, nia14d_color2luminance,nia14d_color3luminance ;
	let nia14d_ratio12, nia14d_ratio12_inv,nia14d_ratio13, nia14d_ratio13_inv,nia14d_ratio23, nia14d_ratio23_inv;
	if(nia14d_nodes && nia14d_nodes.length > 0){
		for(let i = 0; i < nia14d_nodes.length; i++){
			if(isItemVisible(nia14d_nodes[i])){
				
				//nia14d_nodes[i].contentEditable = true;
				nia14d_nodes[i].focus();
				//nia14d_nodes[i].contentEditable = false;
				
				nia14d_outline = window.getComputedStyle(nia14d_nodes[i],null).getPropertyValue('outline');
				nia14d_outline_style = window.getComputedStyle(nia14d_nodes[i],null).getPropertyValue('outline-style');
				nia14d_outline_width = window.getComputedStyle(nia14d_nodes[i],null).getPropertyValue('outline-width');
				
				nia14d_has_pseudo = false;
				if((window.getComputedStyle(nia14d_nodes[i],'::after').getPropertyValue('background') && window.getComputedStyle(nia14d_nodes[i],'::after').getPropertyValue('background') != "rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box") || (window.getComputedStyle(nia14d_nodes[i],'::before').getPropertyValue('background') && window.getComputedStyle(nia14d_nodes[i],'::before').getPropertyValue('background') != "rgba(0, 0, 0, 0) none repeat scroll 0% 0% / auto padding-box border-box")){
					nia14d_has_pseudo = true;
					//console.log("HAS PSEUDO");
					//console.log(window.getComputedStyle(nia14d_nodes[i],'::after').getPropertyValue('background'))
					//console.log(window.getComputedStyle(nia14d_nodes[i],'::before').getPropertyValue('background'))
				}

				if((nia14d_outline && nia14d_outline == "0") || (nia14d_outline_style && nia14d_outline_style == "none")){
					if(debug_flag){
						console.log("Outline :"+nia14d_outline);
						console.log("Outline style :"+nia14d_outline_style);
						console.log("Outline width :"+nia14d_outline_width);
					}
					
					if(nia14d_outline && nia14d_outline == "0"){
						if(debug_flag) console.log("14D - Outline = 0 ");
						if(!nia14d_has_pseudo){
							setItemOutline(nia14d_nodes[i],"orange","nia14d","14-D");
							nia14d_flag1 = true;
						} else {
							setItemOutline(nia14d_nodes[i],"yellow","nia14d","14-D");
							nia14d_flag1b = true;
						}
					}
					else if(nia14d_outline_style && nia14d_outline_style == "none"){
						if(debug_flag) console.log("14D - Outline = none ");
						if(!nia14d_has_pseudo){
							setItemOutline(nia14d_nodes[i],"orange","nia14d","14-D");
							nia14d_flag1 = true;
						} else {
							setItemOutline(nia14d_nodes[i],"yellow","nia14d","14-D");
							nia14d_flag1b = true;
						}
					}
					else{
						if(debug_flag) console.log("14D - Outline = unknown ");
						setItemOutline(nia14d_nodes[i],"yellow","nia14d","14-D");
						nia14d_flag1b = true;
					}
				}
				else{
					nia14d_color1 = window.getComputedStyle(nia14d_nodes[i],null).getPropertyValue('outline-color');  // Outline Color
					nia14d_color2 = getInheritedBackgroundColor(nia14d_nodes[i])  // In BG Color
					nia14d_color3 = getInheritedBackgroundColor(nia14d_nodes[i].parentElement) // Out BG Color
					
					// Convert hexa
					if(nia14d_color1 && nia14d_color2 && nia14d_color3){
						
						if(nia14d_color1.indexOf("#") >= 0){ nia14d_color1rgb = hexToRgbArray(nia14d_color1);} else {nia14d_color1rgb = rgbToRgbArray(nia14d_color1);}
						if(nia14d_color2.indexOf("#") >= 0){ nia14d_color2rgb = hexToRgbArray(nia14d_color2);} else {nia14d_color2rgb = rgbToRgbArray(nia14d_color2);}
						nia14d_color1luminance = luminance(nia14d_color1rgb.r, nia14d_color1rgb.g, nia14d_color1rgb.b);
						nia14d_color2luminance = luminance(nia14d_color2rgb.r, nia14d_color2rgb.g, nia14d_color2rgb.b);
						// Calcul ratio
						nia14d_ratio12 = nia14d_color1luminance > nia14d_color2luminance ? ((nia14d_color2luminance + 0.05) / (nia14d_color1luminance + 0.05)) : ((nia14d_color1luminance + 0.05) / (nia14d_color2luminance + 0.05));
						nia14d_ratio12_inv = 1/nia14d_ratio12;
							
						if(nia14d_color2 != nia14d_color3){
							if(nia14d_color3.indexOf("#") >= 0){ nia14d_color3rgb = hexToRgbArray(nia14d_color3);} else {nia14d_color3rgb = rgbToRgbArray(nia14d_color3);}
							nia14d_color3luminance = luminance(nia14d_color3rgb.r, nia14d_color3rgb.g, nia14d_color3rgb.b);
							// Calcul ratio
							nia14d_ratio13 = nia14d_color1luminance > nia14d_color3luminance ? ((nia14d_color3luminance + 0.05) / (nia14d_color1luminance + 0.05)) : ((nia14d_color1luminance + 0.05) / (nia14d_color3luminance + 0.05));
							nia14d_ratio13_inv = 1/nia14d_ratio13;
							nia14d_ratio23 = nia14d_color2luminance > nia14d_color3luminance ? ((nia14d_color2luminance + 0.05) / (nia14d_color3luminance + 0.05)) : ((nia14d_color3luminance + 0.05) / (nia14d_color2luminance + 0.05));
							nia14d_ratio23_inv = 1/nia14d_ratio23;

							if(nia14d_ratio12_inv < 3 && nia14d_ratio13_inv < 3 && nia14d_ratio23_inv < 3){
								
								if(debug_flag){
									console.log("Outline style :"+nia14d_outline_style);
									console.log("Outline width :"+nia14d_outline_width);
									console.log("Outline color :"+nia14d_color1);
									console.log("Outline InBG :"+nia14d_color2);
									console.log("Outline Out BG :"+nia14d_color3);
								}
								
								if(debug_flag && nia14d_ratio12_inv < 3) console.log("14D - FAIL 10.7 Standard ratio (Outline VS InBG) : "+nia14d_ratio12_inv+" ("+nia14d_color1+" vs "+nia14d_color2+")");
								else if(debug_flag && nia14d_ratio13_inv < 3) console.log("14D - FAIL 10.7 Standard ratio (Outline VS OutBG) : "+nia14d_ratio13_inv+" ("+nia14d_color1+" vs "+nia14d_color3+")");
								else if(debug_flag && nia14d_ratio23_inv < 3) console.log("14D - FAIL 10.7 Standard ratio (InBG VS OutBG): "+nia14d_ratio23_inv+" ("+nia14d_color2+" vs "+nia14d_color3+")");
								if(!Array.from(nia14d_nodes[i].classList).some(c => c.startsWith('nia'))){
									if(!nia14d_has_pseudo){
										setItemOutline(nia14d_nodes[i],"orange","nia14d","14-D");
										nia14d_flag1 = true;
									} else {
										setItemOutline(nia14d_nodes[i],"yellow","nia14d","14-D");
										nia14d_flag1b = true;
									}
								}
								else { // Probabilité de conflit
									setItemOutline(nia14d_nodes[i],"yellow","nia14d","14-D");
									nia14d_flag1b = true;
								}
							}
						}
						else{
							if(nia14d_ratio12_inv < 3){
								
								if(debug_flag){
									console.log("Outline style :"+nia14d_outline_style);
									console.log("Outline width :"+nia14d_outline_width);
									console.log("Outline color :"+nia14d_color1);
									console.log("Outline InBG :"+nia14d_color2);
								}
								
								if(debug_flag) console.log("14D - FAIL 10.7 Standard ratio : "+nia14d_ratio12_inv+" ("+nia14d_color1+" vs "+nia14d_color2+")");
								if(!Array.from(nia14d_nodes[i].classList).some(c => c.startsWith('nia'))){
									if(!nia14d_has_pseudo){
										setItemOutline(nia14d_nodes[i],"orange","nia14d","14-D");
										nia14d_flag1 = true;
									} else {
										setItemOutline(nia14d_nodes[i],"yellow","nia14d","14-D");
										nia14d_flag1b = true;
									}
								}
								else { // Probabilité de conflit
									setItemOutline(nia14d_nodes[i],"yellow","nia14d","14-D");
									nia14d_flag1b = true;
								}
							}
						}
					}
				}
			}
		}
	}
	if(nia14d_flag1 == true) {
	  setItemToResultList("dev","<li><a href='#' data-destination='nia14d' class='result-focus label-orange'>14-D</a> : Présence d'élément dont l'outline est insuffisament contrasté</li>");
	}
	if(nia14d_flag1b == true) {
	  setItemToResultList("man","<li><a href='#' data-destination='nia14d' class='result-focus label-yellow'>14-D</a> : Vérifier l'apparence de l'outline de certains éléments</li>");
	}
	if(nia14d_flag2 == true) {
	  setItemToResultList("dev","<li><a href='#' data-destination='nia14d' class='result-focus label-orange'>14-D</a> : Présence d'élément dont l'outline est masqué</li>");
	}
	*/
}