<?php
$db_hostname = 'localhost';
$db_database = 'nextfloor';
$db_username = 'nextfloor';
$db_password = 'vmflemsdmldudwn!';
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

function datetime2timestamp($datetime)
{
	$val = explode(" ", trim($datetime));
	$date = explode("-", $val[0]);
	$time = explode(":", $val[1]);

	return mktime($time[0], $time[1], $time[2], $date[1], $date[2], $date[0]);
}

function timestamp2datetime($timestamp)
{
	return date("Y-m-d h:i:s", $timestamp);
}
?>