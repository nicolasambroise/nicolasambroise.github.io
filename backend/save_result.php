<?php

if($_SERVER['REQUEST_METHOD'] == 'POST' || $_SERVER['REQUEST_METHOD'] == 'OPTIONS'){
	header('Content-Type: application/json');
	header('Access-Control-Allow-Headers: *');

	require '../backend/config.php';
	$conn = new mysqli($sql_details["host"],$sql_details["user"],$sql_details["pass"],$sql_details["db"]);
	if($conn->connect_error){
		die("Connection failed: ".$conn->connect_error);
	}

	$POSTvalues = json_decode($_POST, true);

	$url =  $POSTvalues['url'];
	$nc = $POSTvalues['nc'];
	$nc_details =  $POSTvalues['nc_details'];
	$nth = $POSTvalues['nth'];
	$nth_details = $POSTvalues['nth_details'];
	$man = $POSTvalues['man'];
	$man_details = $POSTvalues['man_details'];
	$dev = $POSTvalues['dev'];
	$dev_details = $POSTvalues['dev_details'];
	$crit = $POSTvalues['crit'];
	$crit_details = $POSTvalues['crit_details'];
	$w3c = $POSTvalues['w3c'];
	$wave = $POSTvalues['wave'];
	$lighthouse = $POSTvalues['lighthouse'];
	

	$sql = "INSERT INTO `result` (`id`, `url`,  `nc`, `nc_details`, `nth`, `nth_details`, `man`, `man_details`, `dev`, `dev_details`, `crit`, `crit_details`, `w3c`, `wave`, `lighthouse`) VALUES (NULL, '".$url."', '".$nc."', '".$nc_details."', '".$nth."', '".$nth_details."', '".$man."', '".$man_details."', '".$dev."', '".$dev_details."', '".$crit."', '".$crit_details."', '".$w3c."', '".$wave."', '".$lighthouse."');";
	
	if ($conn->query($sql) === TRUE) {
      $result = array(
        'ok' => true,
        'status' => 200
		);
		// sending response
		http_response_code(200);
		echo json_encode($result);
	}else{
	  http_response_code(503);
	}
}
else{
	echo "<h1>Toto</h1>";
	http_response_code(503);
}
?>