// Create the result Panel
function createResultPanel(){
	let result_global = "";
	if (result_crit != ""){result_crit = "<h2 id='result_crit'>Points critiques</h2><ul>"+result_crit+"</ul>";}
	if (result_nc != ""){result_nc = "<h2 id='result_nc'>Points non-conformes</h2><ul>"+result_nc+"</ul>";}
	if (result_nth != ""){result_nth = "<h2 id='result_nth'>Nice to have</h2><ul>"+result_nth+"</ul>";}
	if (result_dev != ""){result_dev = "<h2 id='result_dev'>Problèmes Techniques</h2><ul>"+result_dev+"</ul>";}
	if (result_man != ""){result_man = "<h2 id='result_man'>A vérifier manuellement</h2><ul>"+result_man+"</ul>";}
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