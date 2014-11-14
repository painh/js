var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({port: 9999});

var trace = console.log;
var g_csIDX = 0;
var g_csMap = new Object;

function client_OnOpen()
{
	trace("client_OnOpen");
}

function client_OnError()
{
	trace("client_OnError");
}

function client_OnClose()
{
	if( g_csMap[this._id] == undefined )
	{
		trace("error : " + this._id);
		return;
	}
	delete g_csMap[this._id];
	trace("client_OnClose");
}

function client_OnData( data )
{
	console.log('received: ' +  data);

	for( var idx in g_csMap )
		g_csMap[idx].send( data );
}

wss.on('connection', function(ws) 
{
	ws._id = ++g_csIDX;
	g_csMap[ws._id] = ws;
    ws.on('open',client_OnOpen );
    ws.on('error',client_OnError );
    ws.on('message',client_OnData );
    ws.on('close',client_OnClose );
//    ws.send('something');
});

trace('------------------');
trace('server start!');
trace('------------------');