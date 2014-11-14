<?php
	header("Content-type: application/json; charset=utf-8");

	session_start();
	
	if( !isset( $_SESSION['uid'] ) )
	{
		$ret['isLogined'] = false;
		echo json_encode($ret);
		exit;
	}

	$ret['isLogined'] = true;
	$ret['name'] = $_SESSION['name'];
	echo json_encode($ret);
?>