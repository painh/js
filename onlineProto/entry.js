$(document).ready(function()
{
	var script = $("<script type='text/javascript' src = '../jengine/main.js' ></script>").appendTo('head');	
	script.attr( 'onLoad', function() { jengineStart() } );
} );

var SceneIngame;
var g_SceneIngame;
var socket;  

////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TODO : 필요하다면 아래쪽 데이터 부분들은 네임 스페이스로 감싸는 형태로.
var MyCharList;
var MyInfo;
var Maps;
var NetMgr;
var PacketProc;

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
	include_js(  config["srcPath"] + 'netMgr.js' );
	include_js(  config["srcPath"] + 'packetProc.js' );

	
	var defaultTerm = 100;
	
	if(config["resLoadWaitTerm"]  != undefined )
		defaultTerm = config["resLoadWaitTerm"];
	
	$.get( config["srcPath"] + 'map/map1.json',
	    function(data) {
			eval("var map1 = " + data);
			Maps = map1;
	    }
	);
	
	var isConnected = false;
	
	var includeComplete = false;
	waitIncludeComplete( function()
	{
		includeComplete = true;

		try{  
	  
		var host = "ws://localhost:9999";  
		var socket = new WebSocket(host);  
	  
			trace('Socket Status: '+socket.readyState);  
	  
			socket.onopen = function(){ 
				trace('Socket Status: '+socket.readyState+' (open)');
				PacketProc = new PacketProc();
				NetMgr = new NetManager(socket, PacketProc);
				isConnected = true;
				
//				NetMgr.Send( { pid : "Pos", actorID : 0, x : 10, y : 20} );
			}  
	  
			socket.onmessage = function(msg)
			{
				NetMgr.OnPacket(msg.data);
			}  
	  
			socket.onclose = function(){  
				trace('Socket Status: '+socket.readyState+' (Closed)');  
			}             
	  
		} catch(exception){  
			trace(exception);  
		} 	
	} );	

	var timer = setInterval( function() 
	{
		if( isConnected && includeComplete && Maps != undefined )
		{
			clearInterval(timer);

			g_SceneIngame = new SceneIngame();
			SceneManager.Add( g_SceneIngame );
		}	
	}, defaultTerm );


}