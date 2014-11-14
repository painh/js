$(document).ready(function()
{
	var script = $("<script type='text/javascript' src = '../jengine/main.js' ></script>").appendTo('head');	
	script.attr( 'onLoad', function() { jengineStart() } );
} );

var g_logo;
var g_ingame;

function startGame()
{
//	include_css( config["srcPath"] + 'css/ui.css');
	include_js(  config["srcPath"] + 'scene/logo.js' );
	include_js(  config["srcPath"] + 'scene/ingame.js' );
	
	var includeComplete = false;
	waitIncludeComplete( function()
	{
		g_logo		= new SceneLogo();
		g_ingame	= new SceneIngame();
		SceneManager.Add( g_logo );
		SceneManager.Add( g_ingame );
	} );
}