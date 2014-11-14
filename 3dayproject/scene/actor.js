var actorImageWidth = 32;
var actorImageHeight = 48;
var aniDuration = 500;
var maxFrame = 3;
var moveX = 32;
var moveY = 32;

var Actor = function(image, idx, name)
{
	this.image = image;
	this.imageIDX = idx;
	this.x = 0;
	this.y = 0;
	this.lastAniTime = Renderer.currentTime;
	this.frame = 0;
	this.frameInc = 1;
	this.name = name;
	this.lastMoveTime = Renderer.currentTime;
	this.movePath = undefined;
}

Actor.prototype.Render = function()
{
	Renderer.Img( this.x - CameraInst.centerX, this.y - CameraInst.centerY - actorImageHeight,
				this.image, actorImageWidth, actorImageHeight, this.imageIDX + this.frame);
}
	
Actor.prototype.Update = function()
{
	if( Renderer.currentTime- this.lastAniTime >= aniDuration )
	{
		this.lastAniTime = Renderer.currentTime;
		this.frame = this.frame + this.frameInc;

		if( this.frame >= maxFrame)
		{
			this.frame = maxFrame - 2;
			this.frameInc = -1;
		}
		
		if( this.frame < 0 )
		{
			this.frame = 1;
			this.frameInc = 1;
		}
	}

	if(this.movePath == undefined || this.movePath.length == 0)
		return;

	if( Renderer.currentTime - this.lastMoveTime < 300)
		return;

	this.lastMoveTime = Renderer.currentTime;

	var thisX = this.x;
	var thisY = this.y;

	this.x = this.movePath[this.movePath.length - 1].x * 32;
	this.y = this.movePath[this.movePath.length - 1].y * 32;

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