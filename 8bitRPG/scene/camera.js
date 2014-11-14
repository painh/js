var Camera = function()
{
	this.followActor = null;

	var halfWidth = Math.round(MapInst.screenWidth / tileSize / 2) * tileSize
	var halfHeight = Math.round(MapInst.screenHeight / tileSize / 2) * tileSize;

	this.x = 0;
	this.y = 0;
	this.centerX = 0;
	this.centerY = 0;
	this.width = halfWidth;
	this.height = halfHeight;

	this.Update = function()
	{
		if(this.followActor == null)
			return;
		this.centerX = this.followActor.x - halfWidth;
		this.centerY = this.followActor.y - halfHeight;
		this.x = this.followActor.x - halfWidth;
		this.y = this.followActor.y - halfHeight;
	}
}

var CameraInst = new Camera();