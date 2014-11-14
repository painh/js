<?php
$db_hostname = 'localhost';
$db_database = 'TeamNPC';
$db_username = 'TeamNPC';
$db_password = 'formy2gth';
$db_server = '';
function InitSQL()
{
	global $db_hostname, $db_database, $db_username, $db_password, $db_server;

	$db_server = mysql_connect($db_hostname, $db_username, $db_password);

	if(!db_server)
		die( mysql_error() );
	
	mysql_select_db($db_database) or die( mysql_error() );
}

function CloseSQL()
{
	global $db_server;
	mysql_close($db_server);
}
?>