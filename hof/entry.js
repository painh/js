$(document).ready(function()
{
	var script = $("<script type='text/javascript' src = '../jengine/main.js' ></script>").appendTo('head');	
	script.attr( 'onLoad', function() { jengineStart() } );
} );

var SceneLogin;
var SceneIngame;
var SceneCharList;
var SceneCharCreate;

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TODO : �ʿ��ϴٸ� �Ʒ��� ������ �κе��� ���� �����̽��� ���δ� ���·�.
var MyCharList;
var MyInfo;

function startGame()
{
	include_css( config["srcPath"] + 'css/ui.css');
	
	include_js(  config["srcPath"] + 'scene/login.js' );
	include_js(  config["srcPath"] + 'scene/ingame.js' );
	include_js(  config["srcPath"] + 'scene/charlist.js' );
	include_js(  config["srcPath"] + 'scene/charcreate.js' );
	include_js(  config["srcPath"] + 'scene/dungeonlist.js' );
	
	waitIncludeComplete( function() 
	{
		SceneLogin = new SceneLogin();
		SceneIngame = new SceneIngame();
		SceneCharList = new SceneCharList();
		SceneCharCreate = new SceneCharCreate();
		SceneDungeonList = new SceneDungeonList();
		
		MyCharList	= new Array();
		
		SceneManager.Add( SceneLogin );
		SceneManager.Add( SceneIngame );
		SceneManager.Add( SceneCharList );
		SceneManager.Add( SceneCharCreate );
		SceneManager.Add( SceneDungeonList );
	} );
}