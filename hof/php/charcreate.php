<?php
	header("Content-type: application/json; charset=utf-8");

	session_start();
	
	if( !isset( $_SESSION['uid'] ) )
	{
		$ret['msg'] = "session is null";
		echo json_encode($ret);
		return;
	}
	$ret['isSuccess'] = false;
	$uid = $_SESSION['uid'];
	$name = $_POST['name'];
	$class = $_POST['class'];

	require_once('db_config.php');
	
	InitSQL();

	$query = "SELECT * FROM HOF_TEMPLETE_CHAR where classid = $class;";
	$result = mysql_query($query);

	if(!$result)
	{
		$err = mysql_error();
		$ret['msg'] = "select : " + $err;
		echo json_encode($ret);
		CloseSQL();
		exit;
	}
	$rows = mysql_num_rows($result);
	
	if ($rows != 1) {
		CloseSQL();
		$err = "No rows found, nothing to print so am exiting";
		$ret['msg'] = $err;
		echo json_encode($ret);
	    exit;
	}
	
	$row = mysql_fetch_assoc($result);

	$vit = $row['vit'];
	$wiz = $row['wiz'];
	$str = $row['str'];
	$dex = $row['dex'];
	$exp = 0;

	$query = "INSERT INTO HOF_CHAR(name, vit, wiz, str, dex, class, exp, uid) values('$name', $vit, $wiz, $str, $dex, $class, $exp, $uid );";
	$result = mysql_query($query);
	
	if(!$result)
	{
		$ret['msg'] = mysql_error();
		echo json_encode($ret);
		exit;
	}

	$ret['isSuccess'] = true;
	$ret['msg'] = "success";
	echo json_encode($ret);

	CloseSQL();
?>