var Block = function(x, y, width, height, color, name)
{
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.color = color;

	this.colliX = 0
	this.colliWidth = this.width
	this.colliY = 0
	this.colliHeight = this.height
}

Block.prototype.Render = function()
{
	Renderer.SetColor(this.color);

	Renderer.Rect( this.x - g_cameraX ,
				this.y  - g_cameraY ,
				this.width,
				this.height );
}