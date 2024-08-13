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

	//console.log(dataToSave);
	if(!isPreview && save_to_db){

		const db_api_url = "https://webux.gouv.etat.lu/a11y/a11y_bookmarklet/backend/save_result.php"; 
		console.log("START Save Bdd");
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
	return data ? data.replaceAll(/(\r\n|\n|\r)/g, "").replaceAll(/\[.+?\]/g, "").replaceAll(/"/g, "'") : "";	
}
