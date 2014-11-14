<?php
require_once('config.php');

function RefreshUserTurn($uid, &$turn, &$now)
{
	global $config_turnSec;
	global $config_turnMax;

	$query = "SELECT turn, lastupdate, now() FROM HOF_USER where uid=$uid;";
	$result = mysql_query($query);
	if(!$result)
	{
		echo("error?!");
		$err = mysql_error();
		echo($err);
		return false;
	}
	$rows = mysql_num_rows($result);
	
	if ($rows != 1)
	{
		echo("rows not 1");
		return false;
	}
	$row = mysql_fetch_assoc($result);
	$turn = $row['turn'];
	$last = datetime2timestamp($row['lastupdate']);
	$cur = datetime2timestamp($row['now()']);
	if($cur < $last)
		return false;

	if( $cur - $last < $config_turnSec )
		return false;

	$turn = $turn + floor( ($cur - $last) / $config_turnSec);

	$overTurn = $turn - $config_turnMax;

	if($overTurn <= 0)
	{
		$overTurn = 0;
		$curDateTime = timestamp2datetime($cur);
	}
	else
	{
		$turn = $config_turnMax;
		$curDateTime = timestamp2datetime($last + $overTurn * $config_turnSec);
	}

	$query = "UPDATE HOF_USER SET lastupdate='$curDateTime', turn=$turn where uid=$uid;";
	$result = mysql_query($query);

	if(!$result)
		return false;

	return true;
}
?>