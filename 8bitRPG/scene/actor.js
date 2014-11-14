var actorImageWidth = 16;
var actorImageHeight = 16;
var moveX = 16;
var moveY = 16;
var actorImgStart = 480;

var Actor = function(image, idx, name)
{
	this.image = image;
	this.imageIDX = actorImgStart + idx;
	this.x = 0;
	this.y = 0;
	this.name = name;
	this.lastMoveTime = Renderer.currentTime;
	this.movePath = undefined;
}

Actor.prototype.Render = function()
{
	Renderer.Img( MapInst.screenX + this.x - CameraInst.centerX, MapInst.screenY + this.y - CameraInst.centerY - actorImageHeight,
				this.image, actorImageWidth, actorImageHeight, this.imageIDX );
}
	
Actor.prototype.Update = function()
{

	if(this.movePath == undefined || this.movePath.length == 0)
		return;

	if( Renderer.currentTime - this.lastMoveTime < 300)
		return;

	this.lastMoveTime = Renderer.currentTime;

	var thisX = this.x;
	var thisY = this.y;

	this.x = this.movePath[this.movePath.length - 1].x * tileSize;
	this.y = this.movePath[this.movePath.length - 1].y * tileSize;

	var actor = this.collisionCheck();

	if(actor != null)
	{
		this.x = thisX;
		this.y = thisY;
		delete this.movePath;
	}
	else
		this.movePath.pop();
}

Actor.prototype.MoveLeft = function()
{
	this.x -= moveX;
}

Actor.prototype.MoveRight = function()
{
	this.x += moveX;
}

Actor.prototype.MoveUp = function()
{
	this.y -= moveY;
}

Actor.prototype.MoveDown = function()
{
	this.y += moveY;
}