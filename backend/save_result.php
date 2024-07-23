<?php

if(isset($_POST['url'])){

	require '../backend/config.php';
	$conn = new mysqli($sql_details["host"],$sql_details["user"],$sql_details["pass"],$sql_details["db"]);
	if($conn->connect_error){
		die("Connection failed: ".$conn->connect_error);
	}

	$url =  $_POST['url'];
	$nc = $_POST['nc'];
	$nc_details =  $_POST['nc_details'];
	$nth = $_POST['nth'];
	$nth_details = $_POST['nth_details'];
	$man = $_POST['man'];
	$man_details = $_POST['man_details'];
	$dev = $_POST['dev'];
	$dev_details = $_POST['dev_details'];
	$crit = $_POST['crit'];
	$crit_details = $_POST['crit_details'];
	$w3c = $_POST['w3c'];
	$wave = $_POST['wave'];
	$lighthouse = $_POST['lighthouse'];
	

	echo "Start Save<br>";

	// vider la table
	$sql = "INSERT INTO `result` (`id`, `url`, `date`, `nc`, `nc_details`, `nth`, `nth_details`, `man`, `man_details`, `dev`, `dev_details`, `crit`, `crit_details`, `w3c`, `wave`, `lighthouse`) VALUES (NULL, 'test', 'current_timestamp()', '', '', '', '', '', '', '', '', '', '', '', '', '');";
	if ($conn->query($sql) === TRUE) {
      echo "record inserted successfully";
	}else{
	  echo "Error in ".$sql."<br>".$conn->error;
	}
	echo "<br><br>You can now close this windows<br>";
}
?>