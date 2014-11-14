<?php
	header("Content-type: application/json; charset=utf-8");

	require_once('db_config.php');
	require_once('refreshuserturn.php');
	
	InitSQL();

	$name = $_GET['name'];

	$query = "SELECT * FROM HOF_USER where name='$name';";
	$result = mysql_query($query);
	
	if(!$result)
	{
		$ret['msg'] = mysql_error();
		echo json_encode($ret);
		CloseSQL();
		exit;
	};
	
	$rows = mysql_num_rows($result);
	
	if($rows != 1)
	{
		$ret['name'] = $name;
		$ret['rows'] = $rows;
		echo json_encode($ret);
		CloseSQL();
		exit;
	}
	
	
	session_start();
	$row = mysql_fetch_assoc($result);
	$uid = $row['uid'];

	if( RefreshUserTurn($uid, $row['turn'], $row['lastupdate']) == false)
	{
		$ret['refreshErr'] = mysql_error();
		echo json_encode($ret);
		CloseSQL();
		exit;
	}

	echo json_encode($row);
		
	$_SESSION['uid'] = $uid;
	$_SESSION['name'] = $name;

	CloseSQL();
?>
