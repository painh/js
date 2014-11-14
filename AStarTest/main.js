function trace( msg )
{
	console.log(msg);
}
//--------------------------------------------------------------------------

var Renderer = function(width, height)
{
	this.canvas = $("<canvas id='mainCanvas'/>").appendTo("#game");
	
	this.context = this.canvas.get(0).getContext("2d");
	
	this.width = width;
	this.height = height;
	
	var domCanvas = this.canvas.get(0);
	
	domCanvas.width = width;
	domCanvas.height = height;
	domCanvas.style.width = width;
	domCanvas.style.height = height;

	this.context.font         = '13pt Arial';
	this.context.textBaseline = 'top';

	this.fontSize = parseInt(this.canvas.css('font-size'));
	
	this.lastTime = new Date().getTime();
	this.fps = 0;
	this.lastFPS = 0;
	this.currentTime = this.lastTime;
//	nsIDOMTextMetrics measureText(
// in DOMString textToMeasure
//);
	this.Text = function( x, y, msg )
	{
		this.context.fillText(msg, x, y);
	}

	this.Img = function( x, y, img, patternX, patternY, n )
	{
		if(!img.isLoaded)
			return;

		if(patternX == undefined)
			patternX = img.width;

		if(patternY == undefined)
			patternY = img.height;

		if(n == undefined)
			n = 0;

		var px = Math.round(n % (img.width / patternX));
		var py = Math.round(n / (img.width / patternX));

		this.context.drawImage( img, px * patternX, py * patternY, patternX, patternY, x, y, patternX, patternY);
	}
	
	this.Rect = function(x, y, w, h, col)
	{
		this.context.fillStyle = col;
		this.context.fillRect(x,y,w,h);
	}
	
	this.Begin = function()
	{
		this.context.fillStyle = "#000000";
		this.Rect(0, 0, this.width, this.height);
		this.context.fillStyle = "#ffffff";
	}
	
	this.End = function()
	{
		this.fps++;
		
		this.Text(0, 0, "FPS : " + this.lastFPS );
		
		var curDate = new Date();
		this.currentTime = curDate.getTime();

		if( this.currentTime - this.lastTime > 1000)
		{
			this.lastFPS = this.fps;
			this.fps = 0;
			this.lastTime = this.currentTime;
		}
		
		time = null;
	}
}
//--------------------------------------------------------------------------

var g_test = 0;
var g_renderer = null;
var g_Map = new Array();
var MAP_WIDTH = 640 / 16;
var MAP_HEIGHT = 480 / 16;

function SetMap( x, y, dat )
{
	g_Map[ y * MAP_WIDTH + x ] = dat;
}

function GetMap( x, y )
{
	return g_Map[ y * MAP_WIDTH + x ];
}

function IsBlocked( x, y )
{
	if( x < 0 )
		return true;

	if( x >= MAP_WIDTH )
		return true;

	if( y < 0 )
		return true;

	if( y >= MAP_HEIGHT)
		return true;

	if( GetMap( x, y ) == 0) 
		return false;

	return true;
}
//--------------------------------------------------------------------------

function Update()
{
	g_test++;	
}
//--------------------------------------------------------------------------

function Render()
{
	var dat = 0;

	for(var i = 0; i < MAP_WIDTH; ++i)
		for(var j = 0; j < MAP_HEIGHT; ++j)
		{
			dat = GetMap( i, j);
			if( dat == 1 )
				g_renderer.Rect( i * 16, j * 16, 16, 16, "#0000FF");
			else if( dat == 2)
				g_renderer.Rect( i * 16, j * 16, 16, 16, "#FF0000");
			else
				g_renderer.Rect( i * 16, j * 16, 16, 16, "#000000");
		}

}
//--------------------------------------------------------------------------
var Node = function( _x, _y _parent )
{
	this.x = _x;
	this.y = _y;
	this.Parent = _parent;
}

function FindPath( startX, startY )
{
}
//--------------------------------------------------------------------------

function main()
{
	g_renderer = new Renderer(640, 480);
	trace("main start");

	for(var i = 0; i < MAP_WIDTH * MAP_HEIGHT; ++i)
		g_Map[i] = 0;

	for(var i = 0; i < MAP_HEIGHT - 2; ++i)
		SetMap( 20, i + 1, 1);

	SetMap( 10, 15, 2);

	Render();

/*
	var timer = setInterval( function()
	{
		g_renderer.Begin();
			Update();
			Render();
		g_renderer.End();
	}, 1000 / 15);			
*/
}

$(document).ready(function()
{
	main();
} );
