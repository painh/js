$(document).ready(function()
{
	var script = $("<script type='text/javascript' src = '../jengine/main.js' ></script>").appendTo('head');	
	script.attr( 'onLoad', function() { jengineStart() } );
} );

var SceneIngame;

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TODO : 필요하다면 아래쪽 데이터 부분들은 네임 스페이스로 감싸는 형태로.
var MyCharList;
var MyInfo;
var Maps;

function startGame()
{
//	include_css( config["srcPath"] + 'css/ui.css');
	include_js(  config["srcPath"] + 'scene/actor.js' );
	include_js(  config["srcPath"] + 'scene/map.js' );
	include_js(  config["srcPath"] + 'scene/ingame.js' );
	include_js(  config["srcPath"] + 'scene/message.js' );
	include_js(  config["srcPath"] + 'scene/actorplayer.js' );
	include_js(  config["srcPath"] + 'scene/camera.js' );
	include_js(  config["srcPath"] + 'scene/event.js' );
	include_js(  config["srcPath"] + 'a_star.js' );
	
	var defaultTerm = 100;
	
	if(config["resLoadWaitTerm"]  != undefined )
		defaultTerm = config["resLoadWaitTerm"];
	
	$.get( config["srcPath"] + 'map/map1.json',
	    function(data) {
			eval("var map1 = " + data);
			Maps = map1;
	    }
	);
	
	var includeComplete = false;
	waitIncludeComplete( function() { includeComplete = true; } );	

	var timer = setInterval( function() 
	{
		if( includeComplete && Maps != undefined )
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