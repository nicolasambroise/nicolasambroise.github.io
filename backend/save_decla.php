<?php

/* Le fetch s'effectue en 2 temps :
- Première requete "preflight response" avec OPTIONS recupère les Headers et un status 200
- Seconde requete en POST qui envoi les données.
*/

if($_SERVER['REQUEST_METHOD'] == 'POST' || $_SERVER['REQUEST_METHOD'] == 'OPTIONS'){
	
	if($_SERVER['HTTP_ORIGIN']){
	$http_origin = $_SERVER['HTTP_ORIGIN'];

		if(str_contains($http_origin, ".public.lu") || str_contains($http_origin, "gouvernement.lu") || str_contains($http_origin, ".etat.lu") || str_contains($http_origin, "sig-gr.eu") || str_contains($http_origin, ".mae.lu"))
		{  
			header("Access-Control-Allow-Origin: $http_origin");
			header("Access-Control-Request-Headers: Content-Type");
			header("Access-Control-Allow-Headers: Content-Type");
			header("Access-Control-Allow-Methods: OPTIONS,POST");
		}
	}

	if($_SERVER['REQUEST_METHOD'] == 'POST'){

		require '../backend/config.php';
		$conn = new mysqli($sql_details["host"],$sql_details["user"],$sql_details["pass"],$sql_details["db"]);
		if($conn->connect_error){
			die("Connection failed: ".$conn->connect_error);
		}

		$request_raw = file_get_contents('php://input');
        $request = json_decode($request_raw);
        foreach ($request as $key => $value) {
                //echo "{$key}: {$value}\n";
			switch ($key) {
				case "url":	$url = $value;	break;
				case "conf":	$conf = $value;	break;
				case "url_root":	$url_root = $value;	break;
				case "date_decla":	$date_decla = $value;	break;
				case "date_revision":	$date_revision = $value;	break;
				case "referentiel":	$referentiel = $value;	break;
				case "nc":	$nc = $value;	break;
				case "nc_details":	$nc_details = $value;	break;
				case "cd":	$cd = $value;	break;
				case "cd_details":	$cd_details = $value;	break;
				case "ex":	$ex = $value;	break;
				case "ex_details":	$ex_details = $value;	break;
				case "email_contact":	$email_contact = $value;	break;
				case "organization":	$organization = $value;	break;
				case "auditeur_name":	$auditeur_name = $value;	break;
				case "access_features":	$access_features = $value;	break;
				case "sensible_cmp":	$sensible_cmp = $value;	break;
			}
        }
		
		$ip = isset($_SERVER['HTTP_CLIENT_IP']) 
			? $_SERVER['HTTP_CLIENT_IP'] 
			: (isset($_SERVER['HTTP_X_FORWARDED_FOR']) 
			  ? $_SERVER['HTTP_X_FORWARDED_FOR'] 
			  : $_SERVER['REMOTE_ADDR']);

		$sql = "INSERT INTO `decla` (`id`, `url`, `ip`, `conf`, `url_root`, `date_decla`, `date_revision`, `referentiel`, `nc`, `nc_details`, `cd`, `cd_details`, `ex`, `ex_details`, `email_contact`, `organization`, `auditeur_name`, `access_features`, `sensible_cmp`) VALUES (NULL, '".$url."', '".$ip."', '".$conf."', '".$url_root."', '".$date_decla."', '".$date_revision."', '".$referentiel."', '".$nc."', '".$nc_details."', '".$cd."', '".$cd_details."', '".$ex."', '".$ex_details."', '".$email_contact."', '".$organization."', '".$auditeur_name."', '".$access_features."', '".$sensible_cmp."');";
		
		if ($url != "" && $conn->query($sql) === TRUE) {
		  $result = array(
			'ok' => true,
			'status' => 200
			);
			// sending response
			http_response_code(200);
		}else{
		  echo "Error: " . $sql . "<br>" . $conn->error;
		  http_response_code(503);
		}
	}
}
else{
	echo "<h1>Toto</h1>";
	http_response_code(503);
}
?>