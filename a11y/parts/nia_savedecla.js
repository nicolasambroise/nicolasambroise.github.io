// Fonction Save result to db
function saveDeclaInBdd(){	
	
	console.log("saveDeclaInBdd");
	let date_decla = "",date_revision = "",referentiel = "", auditeur_const = "",auditeur_name = "", sensible_cmp = "";
	
	const url_root = document.querySelector(".basic-information.website-name") ? document.querySelector(".basic-information.website-name").textContent : "" ;
	const conf = document.querySelector(".basic-information.conformance-status.partial > b, .basic-information.conformance-status.partial > strong") ? document.querySelector(".basic-information.conformance-status.partial > b, .basic-information.conformance-status.partial > strong").textContent : "";
	if(document.querySelector(".basic-information.statement-created-date")){
		date_decla = document.querySelector(".basic-information.statement-created-date") ? document.querySelector(".basic-information.statement-created-date").textContent : "";
		date_revision  = document.querySelector(".basic-information.statement-renewal-date") ? document.querySelector(".basic-information.statement-renewal-date").textContent : "";
		referentiel = document.querySelector(".basic-information.statement-created-date").parentElement ? document.querySelector(".basic-information.statement-created-date").parentElement.getElementsByTagName('A')[0].textContent : "";
		auditeur_const = document.querySelector(".basic-information.statement-created-date").parentElement ? document.querySelector(".basic-information.statement-created-date").parentElement.textContent : "";
		if(auditeur_const.indexOf("Idéance") > 1 || auditeur_const.indexOf("Ideance") > 1 ) auditeur_name = "Idéance";
		else if(auditeur_const.indexOf("Access42") > 1 ) auditeur_name = "Access42";
		else if(auditeur_const.indexOf("auto-évaluation") > 1 ) auditeur_name = "auto-évaluation";
		else if(auditeur_const.indexOf("Service Information et Presse") > 1 || auditeur_const.indexOf("SIP") > 1) auditeur_name = "Service Information et Presse";
		else auditeur_name = "???";
	}

	const nb_nc = document.querySelectorAll(".technical-information.accessibility-limitations.non-compliant") ? document.querySelectorAll(".technical-information.accessibility-limitations.non-compliant").length : "";
	const nc_details = document.querySelectorAll(".technical-information.accessibility-limitations.non-compliant") && document.querySelectorAll(".technical-information.accessibility-limitations.non-compliant")[0] ? document.querySelectorAll(".technical-information.accessibility-limitations.non-compliant")[0].parentElement.innerHTML : "";
	const nb_cd = document.querySelectorAll(".technical-information.accessibility-limitations.disproportionate-burden") ? document.querySelectorAll(".technical-information.accessibility-limitations.disproportionate-burden").length : "";
	const cd_details = document.querySelectorAll(".technical-information.accessibility-limitations.disproportionate-burden") && document.querySelectorAll(".technical-information.accessibility-limitations.disproportionate-burden")[0] ? document.querySelectorAll(".technical-information.accessibility-limitations.disproportionate-burden")[0].parentElement.innerHTML : "";
	const nb_ex = document.querySelectorAll(".technical-information.accessibility-limitations.exception") ? document.querySelectorAll(".technical-information.accessibility-limitations.exception").length : "";
	const ex_details = document.querySelectorAll(".technical-information.accessibility-limitations.exception") && document.querySelectorAll(".technical-information.accessibility-limitations.exception")[0] ? document.querySelectorAll(".technical-information.accessibility-limitations.exception")[0].parentElement.innerHTML : "";
	const email_contact = document.querySelector(".email.u-email") ? document.querySelector(".email.u-email").textContent : "";
	const organization = document.querySelector(".basic-information.organization-name") ? document.querySelector(".basic-information.organization-name").textContent : "";
	const access_features = document.querySelector(".technical-information.accessibility-features") ? document.querySelector(".technical-information.accessibility-features").textContent : "";

	// Composant sensible : Vidéo, Carrousel, iFrame, Tableau Complexe
	if(nc_details.indexOf("vidéo") > -1 || cd_details.indexOf("vidéo") > -1 || ex_details.indexOf("vidéo") > -1) sensible_cmp += "Vidéo,";
	if(nc_details.indexOf("carrousel") > -1 || cd_details.indexOf("carrousel") > -1 || ex_details.indexOf("carrousel") > -1) sensible_cmp += "Carrousel,";
	if(nc_details.indexOf("iFrame") > -1 || cd_details.indexOf("iFrame") > -1 || ex_details.indexOf("iFrame") > -1) sensible_cmp += "iFrame,";
	if(nc_details.indexOf("tableaux de données complexes") > -1 || cd_details.indexOf("tableaux de données complexes") > -1 || ex_details.indexOf("tableaux de données complexes") > -1) sensible_cmp += "Tableaux complexes,";
	if(sensible_cmp != "") sensible_cmp = sensible_cmp.slice(0, -1); // Remove last ,
	
	let dataToSave = {
		"url":  currentUrl, // URL de la décla
		"conf": conf, // conformité indiquée dans le décla
		"url_root": removeBracket(url_root), // URL de la racine indiquée dans le décla
		"date_decla" : date_decla,
		"date_revision" : date_revision,
		"referentiel" : referentiel,
		"nc" : nb_nc,
		"nc_details" : removeBracket(nc_details),
		"cd" : nb_cd,
		"cd_details" : removeBracket(cd_details),
		"ex" : nb_ex,
		"ex_details" : removeBracket(ex_details),
		"email_contact" : email_contact,
		"organization" : removeBracket(organization),
		"auditeur_name" : auditeur_name,
		"access_features" : removeBracket(access_features),
		"sensible_cmp" : sensible_cmp
	};

	console.log(dataToSave);
	if(isDecla && !isPreview && save_to_db){


		const db_api_url = "https://webux.gouv.etat.lu/a11y/a11y_bookmarklet/backend/save_decla.php"; 
		console.log("START Save Decla");
		fetch(db_api_url, {
				method: "POST",
				headers: {'Content-Type': 'text/html;charset=UTF-8'}, 
				body: JSON.stringify(dataToSave)
			})
			// output the status and return response
			.then((response) => {
			  if (response.ok) {return response;}
			  return Promise.reject(response); 
			})
			.then(response => console.log(response.status) || response)
			.catch((response) => {
			  console.log(JSON.stringify(dataToSave))
			  console.log(response.status, response.statusText);
			});
	}
}

// Fonction pour enlever les crochets et leur contenu à l'interieur de ceux-ci
function removeBracket(data){
	return data ? data.replaceAll(/(\r\n|\n|\r)/g, "").replaceAll(/\[.+?\]/g, "").replaceAll(/'/g, '"') : "";	
}
