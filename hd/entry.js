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
	include_js(  config["srcPath"] + 'scene/orc.js' )
	include_js(  config["srcPath"] + 'scene/charorc.js' )
	include_js(  config["srcPath"] + 'scene/itemobj.js' );
	include_js(  config["srcPath"] + 'scene/effect.js' );
	include_js(  config["srcPath"] + 'scene/shop.js' );
	include_js(  config["srcPath"] + 'scene/cloud.js' );
	include_js(  config["srcPath"] + 'scene/cloud2.js' );
	include_js(  config["srcPath"] + 'scene/minimap.js' );
	include_js(  config["srcPath"] + 'scene/spawn.js' );
	include_js(  config["srcPath"] + 'scene/johnbase.js' );
	include_js(  config["srcPath"] + 'scene/enemybase.js' );
	include_js(  config["srcPath"] + 'scene/gameover.js' );
	include_js(  config["srcPath"] + 'scene/victory.js' );

	include_js(  config["srcPath"] + 'scene/stageselect.js' )
	include_js(  config["srcPath"] + 'scene/stage001.js' )
	include_js(  config["srcPath"] + 'scene/stage002.js' )
	include_js(  config["srcPath"] + 'scene/stage003.js' )


	
	var includeComplete = false;
	waitIncludeComplete( function()
	{
		g_logo		= new SceneLogo();
		g_ingame	= new SceneIngame();
		SceneManager.Add( g_logo );
		SceneManager.Add( g_ingame );
	} );
}