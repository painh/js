$(document).ready(function()
{
	var script = $("<script type='text/javascript' src = '../jengine/main.js' ></script>").appendTo('head');	
	script.attr( 'onLoad', function() { jengineStart() } );
} );

var SceneIngame;

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TODO : �ʿ��ϴٸ� �Ʒ��� ������ �κе��� ���� �����̽��� ���δ� ���·�.
var MyCharList;
var MyInfo;
var Maps;
var SkillTable;

function startGame()
{
//	include_css( config["srcPath"] + 'css/ui.css');
	include_js(  config["srcPath"] + 'a_star.js' );
	include_js(  config["srcPath"] + 'scene/actor.js' );
	include_js(  config["srcPath"] + 'scene/map.js' );
	include_js(  config["srcPath"] + 'scene/ingame.js' );
	include_js(  config["srcPath"] + 'scene/message.js' );
	include_js(  config["srcPath"] + 'scene/actorplayer.js' );
	include_js(  config["srcPath"] + 'scene/camera.js' );
	include_js(  config["srcPath"] + 'scene/event.js' );
	include_js(  config["srcPath"] + 'scene/battle.js' );

	
	var defaultTerm = 100;
	
	if(config["resLoadWaitTerm"]  != undefined )
		defaultTerm = config["resLoadWaitTerm"];

	var loadComplete = false;
	ResLoader.Init( function() {loadComplete = true;} );
	ResLoader.AddRes( config["srcPath"] + 'map/map1.json', 
						function(data) { eval("var temp = " + data); Maps = temp; trace(Maps); } );
	ResLoader.AddRes( config["srcPath"] + 'csv/8BitRPG - Skill.csv', 
						function(data) { SkillTable = CSVToObj(data); });
	
	var includeComplete = false;
	waitIncludeComplete( function() { includeComplete = true; } );	

	var timer = setInterval( function() 
	{
		if( includeComplete && loadComplete )
		{
			clearInterval(timer);
	
/*		trace("------------");
		
		for(var i in checkInclude)
		{
			trace(i);
			for(var j in checkInclude[i])
				trace("\t " + j + " : " + checkInclude[i][j]);
		}
*/			
			SceneIngame = new SceneIngame();
			SceneManager.Add( SceneIngame );		
		}	
	}, defaultTerm );


}