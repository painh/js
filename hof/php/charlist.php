<?php
	header("Content-type: application/json; charset=utf-8");

	session_start();
	
	if( !isset( $_SESSION['uid'] ) )
	{
		echo "<err>session is null</err>";
		return;
	}

	require_once('db_config.php');
	
	InitSQL();

	$uid = $_SESSION['uid'];
	$query = "SELECT * FROM HOF_CHAR where uid = $uid;";
	$result = mysql_query($query);
	
	if(!$result) die (mysql_error());
	
	$rows = mysql_num_rows($result);
	$ret['num'] = $rows;

	if($rows == 0)
	{
		echo json_encode($ret);
		CloseSQL();
		return;
	}
	
	for( $i = 0; $i < $rows; ++$i )
	{
		$row = mysql_fetch_assoc($result);
		$ret[$i] = $row;
	}

	echo json_encode($ret);	
	
	CloseSQL();
?>
