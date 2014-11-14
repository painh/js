var socket;
function trace( msg )
{
	console.log(msg);
}
//--------------------------------------------------------------------------

function mainLoop()
{
}
//--------------------------------------------------------------------------

function main()
{
	trace('start!');
	var isConnected = false;

	try{  
  
    var socket;  
    var host = "ws://localhost:9999";  
    var socket = new WebSocket(host);  
  
        trace('Socket Status: '+socket.readyState);  
  
        socket.onopen = function(){  
             trace('Socket Status: '+socket.readyState+' (open)');
			socket.send("1234");
        }  
  
        socket.onmessage = function(msg){  
             trace('Received: '+msg.data);  
        }  
  
        socket.onclose = function(){  
             trace('Socket Status: '+socket.readyState+' (Closed)');  
        }             
  
    } catch(exception){  
         trace(exception);  
    }  


	var timer = setInterval( function()
	{
		if(!isConnected)
			return;
			
		mainLoop();
		
	}, 1000 / 15);			

}

$(document).ready(function()
{
	main();
} );