var Cloud = function(image)
{
	this.image = image
	this.x = 0
	this.y = 0
	this.imgX = 160
	this.imgY = 160
	this.imgWidth = 32 * 3
	this.imgHeight  = 32 * 2

	this.Render = function()
	{
		Renderer.ImgBlt( this.x - g_cameraX,
						this.y - g_cameraY,
						this.image,
						this.imgX,
						this.imgY,
						this.imgWidth,
						this.imgHeight)

	}
};