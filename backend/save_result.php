<?php

/* Le fetch s'effectue en 2 temps :
- Première requete "preflight response" avec OPTIONS recupère les Headers et un status 200
- Seconde requete en POST qui envoi les données.
*/

if($_SERVER['REQUEST_METHOD'] == 'POST' || $_SERVER['REQUEST_METHOD'] == 'OPTIONS'){
	
	if($_SERVER['HTTP_ORIGIN']){
	$http_origin = $_SERVER['HTTP_ORIGIN'];

		if(str_contains($http_origin, ".public.lu") || str_contains($http_origin, "gouvernement.lu") || str_contains($http_origin, ".etat.lu") || str_contains($http_origin, "sig-gr.eu"))
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
					case "nc":	$nc = $value;	break;
					case "nc_details":	$nc_details = $value;	break;
					case "nth":	$nth = $value;	break;
					case "nth_details":	$nth_details = $value;	break;
					case "man":	$man = $value;	break;
					case "man_details":	$man_details = $value;	break;
					case "dev":	$dev = $value;	break;
					case "dev_details":	$dev_details = $value;	break;
					case "crit":	$crit = $value;	break;
					case "crit_details":	$crit_details = $value;	break;
					case "w3c":	$w3c = $value;	break;
					case "wave":	$wave = $value;	break;
					case "lighthouse":	$lighthouse = $value;	break;
					case "url":	$url = $value;	break;
				}
        }
		
		$ip = isset($_SERVER['HTTP_CLIENT_IP']) 
			? $_SERVER['HTTP_CLIENT_IP'] 
			: (isset($_SERVER['HTTP_X_FORWARDED_FOR']) 
			  ? $_SERVER['HTTP_X_FORWARDED_FOR'] 
			  : $_SERVER['REMOTE_ADDR']);

		$sql = "INSERT INTO `result` (`id`, `url`, `ip`,  `nc`, `nc_details`, `nth`, `nth_details`, `man`, `man_details`, `dev`, `dev_details`, `crit`, `crit_details`, `w3c`, `wave`, `lighthouse`) VALUES (NULL, '".$url."', '".$ip."', '".$nc."', \"".$nc_details."\", '".$nth."', \"".$nth_details."\", '".$man."', \"".$man_details."\", '".$dev."', \"".$dev_details."\", '".$crit."', \"".$crit_details."\", '".$w3c."', '".$wave."', '".$lighthouse."');";
		
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