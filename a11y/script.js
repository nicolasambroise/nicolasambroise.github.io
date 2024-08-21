/* Script Check A11Y - Nicolas AMBROISE */

// Variables config globale
const debug_flag = true; // true -> affiche les logs
const only_redactor = false; // true --> affiche uniquement les critères relatif au redacteur
const wave_allow_credit = false; // true --> autorise les credits wave
const save_to_db = true; // true --> autorise la sauvegarde des resultats en base de données

// Environnement
const localUrl = "https://nicolasambroise.github.io/a11y"
const prodUrl = "https://webux.gouv.etat.lu/a11y/a11y_bookmarklet/src"
const pluginUrl = prodUrl;

// Current URL
const currentUrl = window.location.href;
const homepage = document.querySelector('h1.logo.logo--homepage');
const homepageException = ["https://guichet.public.lu/fr/citoyens.html", "https://guichet.public.lu/fr/entreprises.html","https://guichet.public.lu/fr/leichte-sprache.html", "https://guichet.public.lu/en/citoyens.html", "https://guichet.public.lu/en/entreprises.html","https://guichet.public.lu/en/leichte-sprache.html","https://guichet.public.lu/de/citoyens.html", "https://guichet.public.lu/de/entreprises.html","https://guichet.public.lu/de/leichte-sprache.html"]
let isHomepage = false;
let isPreview = false;
let isDecla = false;
let isPrototype = false;
if(homepage || homepageException.includes(currentUrl)) {isHomepage = true;}
if((currentUrl.includes("preview-") || currentUrl.includes("wcm")) && currentUrl.includes(".etat.lu")){isPreview = true;}
else if(currentUrl.includes("aem-test-")){isPreview = true;}
if(currentUrl.includes("/prototype/")){isPrototype = true;}
if(currentUrl.includes("/support/accessibilite.html") || currentUrl.includes("/support/accessibilite/accessibilite-guichet.html")){isDecla = true;}


if(!currentUrl.includes(".public.lu") && !currentUrl.includes("gouvernement.lu") && !currentUrl.includes(".etat.lu") && !currentUrl.includes("sig-gr.eu") && !currentUrl.includes(".mae.lu")){
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


/*- -------------------------------------------------------------------------------- */
// Add JS
// - double sécurité pour que ce sript puisse également être appelé par l'extention chrome
if(!document.body.classList.contains('panel-injected')){
	/* Pour le bookmarklet */
	
	loadStyle()
	var functions_loaded = loadScript('functions', '/parts/nia_functions.js');
	var resultpanel_loaded = loadScript('resultpanel', '/parts/nia_resultpanel.js');
	var savebdd_loaded = loadScript('savebdd', '/parts/nia_savebdd.js');
	var savedecla_loaded = loadScript('savedecla', '/parts/nia_savedecla.js');
	var thirdservices_loaded = loadScript('thirdservices', '/parts/nia_thirdservices.js');
	var p01_loaded = loadScript('p01', '/parts/nia01_config.js');
	var p02_loaded = loadScript('p02', '/parts/nia02_images.js');
	var p03_loaded = loadScript('p03', '/parts/nia03_links.js');
	var p04_loaded = loadScript('p04', '/parts/nia04_form.js');
	var p05_loaded = loadScript('p05', '/parts/nia05_obligatoire.js');
	var p06_loaded = loadScript('p06', '/parts/nia06_structure.js');
	var p07_loaded = loadScript('p07', '/parts/nia07_title.js');
	var p08_loaded = loadScript('p08', '/parts/nia08_table.js');
	var p09_loaded = loadScript('p09', '/parts/nia09_nav.js');
	var p10_loaded = loadScript('p10', '/parts/nia10_oldtag.js');
	var p11_loaded = loadScript('p11', '/parts/nia11_lang.js');
	var p12_loaded = loadScript('p12', '/parts/nia12_button.js');
	var p13_loaded = loadScript('p13', '/parts/nia13_lottie.js');
	var p14_loaded = loadScript('p14', '/parts/nia14_colors.js');
	var p15_loaded = loadScript('p15', '/parts/nia15_secu.js');
	
	Promise.all([functions_loaded,resultpanel_loaded,savebdd_loaded,savedecla_loaded,thirdservices_loaded,p01_loaded,p02_loaded,p03_loaded,p04_loaded,p05_loaded,p06_loaded,p07_loaded,p08_loaded,p09_loaded,p10_loaded,p11_loaded,p12_loaded,p13_loaded,p14_loaded,p15_loaded])
	.then(function() {setTimeout(beforeCheck(), 100);})
	.then(function() {
		
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
		
		Promise.all([p01,p02,p03,p04,p05,p06,p07,p08,p09,p10,p11,p12,p13,p14,p15])
		.then(function() {setTimeout(createResultPanel(), 100);})
		.then(function() {setTimeout(thirdPartValidation(), 100);})
		.then(function() {setTimeout(activateCheckA11YPanel(), 100);});
	});
}
else{
	
	beforeCheck();
	/* Pour le Plugin (les script sont appelé dans le fichier sw_chrome.js) */ 
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

	Promise.all([p01,p02,p03,p04,p05,p06,p07,p08,p09,p10,p11,p12,p13,p14,p15])
	.then(function() {setTimeout(createResultPanel(), 100);})
	.then(function() {setTimeout(thirdPartValidation(), 100);})
	.then(function() {setTimeout(activateCheckA11YPanel(), 100);});
}



// END
/*- -------------------------------------------------------------------------------- */

// fonction pour charger les scripts
function loadScript(id,src) {
  //console.log("loadScript : "+id);
  return new Promise(function(resolve, reject) {
    let script = document.createElement('script');
	script.id = 'injected-js-'+id;
	script.src = pluginUrl + src + '?v=' + Date.now();

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Script load error for ${src}`));
	//script.addEventListener('load', () => {resolve(script);});

	if (document.getElementById('injected-js-'+id) === null) document.head.append(script);
  });
}

// fonction pour charger le style
function loadStyle() {
  //console.log("loadStyle");
  return new Promise(function(resolve, reject) {
    let style = document.createElement('link');
    style.id = 'injected-css';
    style.rel = 'stylesheet';
    style.href = pluginUrl+ '/stylePanel.css?v=' + Date.now();

    style.onload = () => resolve(style);
    style.onerror = () => reject(new Error(`Style load error`));

	if (document.getElementById('injected-css') === null) document.head.append(style);
  });
}
