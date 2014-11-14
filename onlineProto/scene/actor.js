var actorImageWidth = 32;
var actorImageHeight = 48;
var aniDuration = 500;
var maxFrame = 3;
var moveX = 32;
var moveY = 32;

var Actor = function(actorID, image, idx, name)
{
	this.actorID = actorID;
	this.image = image;
	this.imageIDX = idx;
	this.x = 0;
	this.y = 0;
	this.lastAniTime = Renderer.currentTime;
	this.frame = 0;
	this.frameInc = 1;
	this.name = name;
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