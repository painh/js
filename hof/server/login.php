<?php

	header( 'Content-type: text/xml' );

	require_once('config.php');
	
	InitSQL();

	$name = $_GET['name'];

	$query = "SELECT * FROM GDS_User where name='$name';";
	$result = mysql_query($query);
	
	if(!$result) die (mysql_error());
	
	$rows = mysql_num_rows($result);
	echo "<usr>";
	for( $i = 0; $i < $rows; ++$i)
	{
		$row = mysql_fetch_row($result);
		echo "<id>$row[0]</id>";
		echo "<name>$row[1]</name>";
	}
	echo "</usr>";	
	CloseSQL();

?>