/*- -------------------------------------------------------------------------------- */
/* 13. Animation Lottie */
function check_part_13(){
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
						setItemToResultList("man","<li><a href='#' data-destination='nia13a0' class='result-focus label-orange'>13-A</a> : Les animations lues automatiquement et qui boucles ou qui dure plue de 5s doivent avoir un controleur play/pause [<a href='https://accessibilite.public.lu/fr/raweb1/criteres.html#test-13-8-1' target='_blank'>RAWeb 13.8.1</a>]</li>");
						setItemOutline(nia13a_nodes[i],"orange","nia13a0","13-A");
						
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
}
module.exports = {check_part_13};