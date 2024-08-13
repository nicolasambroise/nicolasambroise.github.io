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
			
			  if(lighthouse_access_score < 80) lighthouse_access_score = "<span style=\"color:red;\">"+lighthouse_access_score+"</span>";
			  if(lighthouse_bp_score < 80) lighthouse_bp_score = "<span style=\"color:red;\">"+lighthouse_bp_score+"</span>";
			  if(lighthouse_seo_score < 80) lighthouse_seo_score = "<span style=\"color:red;\">"+lighthouse_seo_score+"</span>";
			
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