// Fonction Save result to db
function saveInBdd(){	
	console.log("saveInBdd");
	
	/*
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

	console.log(dataToSave);
	*/
	if(!isPreview && save_to_db){

		// Version 2023
		/*
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
		*/	
		// Version 2025
			
		const db_api_url = "http://127.0.0.1:3005/";

		const db_api_endpoint_page = "page/url/";
		const db_api_endpoint_ta = "ta/";
		
		console.log("START Save Bdd");
		
		// Step 1 get pageId
		fetch(db_api_url+db_api_endpoint_page+encodeURIComponent(currentUrl), {
			method: "GET",
			headers: {'Content-Type': 'text/html;charset=UTF-8'}, 
		})
		.then((response) => {
			if (response.ok) {return response;}
			return Promise.reject(response); 
		})
		.then((response) => {
			console.log(response.status || response)
			// {"data":[{"id":223,"website_id":229,"url":"https://mengstudien.public.lu","title":"Mengstudien","iso":"FR","category":"Homepage","status":200,"date_creation":"2024-09-17T22:00:00.000Z","date_update":null}]}
			
			
			/*
			if(response.status == 200 && response[0].data.length == 1){ 
				let pageId = response[0].data[0].id
				
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
			*/

		
		})
		.catch((response) => {
			console.log(JSON.stringify(dataToSave))
			console.log(response.status, response.statusText);
		});
			
	}
}

/*
// Fonction pour enlever les crochets et leur contenu à l'interieur de ceux-ci
function removeBracket(data){
	return data ? data.replaceAll(/(\r\n|\n|\r)/g, "").replaceAll(/\[.+?\]/g, "").replaceAll(/"/g, "'") : "";	
}
*/