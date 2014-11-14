var Actor = function()
{
	this.x = 0
	this.y = 0
	this.width = actorWidth
	this.height = actorHeight
	this.type = 0
	this.prevX
	this.prevY

	this.renderX = 0
	this.renderY = 0

	this.deltaX = 0
	this.deltaY = 0

	this.prevDeltaSignX = 0
	this.prevDeltaSignY = 0

	this.speed = config['fps'] / 10

	this.state = 0

	this.Update = function()
	{
		if((this.x != this.prevX) ||
			this.y != this.prevY)
		{
			this.deltaX = (this.x - this.renderX) / this.speed
			this.deltaY = (this.y - this.renderY) / this.speed

			this.prevDeltaSignX = (this.deltaX < 0)
			this.prevDeltaSignY = (this.deltaY < 0)
		}


		if(this.deltaX != 0)
		{
			this.renderX += this.deltaX

			var deltaSign = (this.x - this.renderX) < 0
			if(deltaSign != this.prevDeltaSignX)
			{
				this.renderX = this.x
				this.deltaX = 0
			}


		}
		if(this.deltaY != 0)
		{
			this.renderY += this.deltaY

			var deltaSign = (this.y - this.renderY) < 0
			if(deltaSign != this.prevDeltaSignY)
			{
				this.renderY = this.y
				this.deltaY = 0
			}
		}

		this.prevX = this.x
		this.prevY = this.y
	}

	this.Render = function()
	{
		var color
		switch(this.type)
		{
			case 0:
				Renderer.ImgBlt( this.renderX - g_cameraX,
								this.renderY - g_cameraY,
								g_image,
								0,
								0,
								32,
								32)
				break

			case 1:
				Renderer.ImgBlt( this.renderX - g_cameraX,
								this.renderY - g_cameraY,
								g_image,
								32,
								0,
								32,
								32)
				break

			case 2:
				Renderer.ImgBlt( this.renderX - g_cameraX,
								this.renderY - g_cameraY,
								g_image,
								64,
								0,
								32,
								32)
				break

			case 3:
				Renderer.ImgBlt( this.renderX - g_cameraX,
								this.renderY - g_cameraY,
								g_image,
								96,
								0,
								32,
								32)
				break
			default:
				trace('error')
				break
		}
	}
}