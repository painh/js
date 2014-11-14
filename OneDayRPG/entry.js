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
	include_js(  config["srcPath"] + 'scene/john.js' );
	include_js(  config["srcPath"] + 'scene/block.js' );
	include_js(  config["srcPath"] + 'scene/text.js' );
	include_js(  config["srcPath"] + 'scene/slime.js' );
	include_js(  config["srcPath"] + 'scene/itemobj.js' );
	include_js(  config["srcPath"] + 'scene/effect.js' );
	
	var includeComplete = false;
	waitIncludeComplete( function()
	{
		g_logo		= new SceneLogo();
		g_ingame	= new SceneIngame();
		SceneManager.Add( g_logo );
		SceneManager.Add( g_ingame );
	} );
}