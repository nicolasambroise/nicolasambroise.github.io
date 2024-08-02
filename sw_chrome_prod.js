/* Script Check A11Y - Nicolas AMBROISE */

// Variables config globale
  const localUrl = "a11y"
  const prodUrl = "src"
  const pluginUrl = prodUrl;


// Ajoute une classe au <body> pour eviter de relancer le script si le plugin est appelé plusieurs fois
function addClassToBody() {
  document.body.classList.add("panel-injected");
}

// Execusion lors du click sur le plugin
chrome.action.onClicked.addListener(async (tab) => {
		
  if(tab.url.includes(".public.lu") || tab.url.includes(".gouvernement.lu") || tab.url.includes(".etat.lu") || tab.url.includes("sig-gr.eu")) {
	const p1 = chrome.scripting.executeScript({
		files: [pluginUrl+'/parts/nia01_config.js',pluginUrl+'/parts/nia02_images.js',pluginUrl+'/parts/nia03_links.js',pluginUrl+'/parts/nia04_form.js',pluginUrl+'/parts/nia05_obligatoire.js',pluginUrl+'/parts/nia06_structure.js',pluginUrl+'/parts/nia07_title.js',pluginUrl+'/parts/nia08_table.js',pluginUrl+'/parts/nia09_nav.js',pluginUrl+'/parts/nia10_oldtag.js',pluginUrl+'/parts/nia11_lang.js',pluginUrl+'/parts/nia12_button.js',pluginUrl+'/parts/nia13_lottie.js',pluginUrl+'/parts/nia14_colors.js',pluginUrl+'/parts/nia15_secu.js',pluginUrl+'/parts/nia_functions.js',pluginUrl+'/parts/nia_resultpanel.js',pluginUrl+'/parts/nia_savebdd.js',pluginUrl+'/parts/nia_thirdservices.js'],
		target: { tabId: tab.id }
	});
	const p2 = chrome.scripting.insertCSS({
		files: [pluginUrl+'/stylePanel.css'],
		target: { tabId: tab.id }
	});
	const p3 = chrome.scripting.executeScript({
		target : {tabId : tab.id},
		func : addClassToBody
	});
	const p4 = chrome.action.setBadgeText({
      tabId: tab.id,
      text: 'ON'
    });
	const p5 = chrome.scripting.executeScript({
		files: [pluginUrl+'/script.js'],
		target: { tabId: tab.id }
	});
	
	await Promise.all([p1, p2, p3]).then(p4).then(() => console.log("script & style injected"));

   }
});