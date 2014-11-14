var Character = function()
{
	this.image = image;
	this.imageIDX = actorImgStart + idx;
	this.x = 0;
	this.y = 0;
	this.name = name;
	this.lastMoveTime = Renderer.currentTime;
	this.movePath = undefined;
}