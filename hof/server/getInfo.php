<?php
require_once('config.php');

header( 'Content-type: text/xml' );

InitSQL();

$query = "SELECT * FROM GDS_Char";
$result = mysql_query($query);

if(!$result) die (mysql_error());

$rows = mysql_num_rows($result);

for( $i = 0; $i < $rows; ++$i)
{
	echo '<char>';
	$row = mysql_fetch_row($result);
	echo '<id>'.$row[0].'</id>';
	echo '<name>'.$row[1].'</name>';
	echo '<hp>'.$row[2].'</hp>';
	echo '<maxHP>'.$row[2].'</maxHP>';
	echo '</char>';
}

CloseSQL();
?>