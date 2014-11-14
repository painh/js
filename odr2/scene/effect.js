var Effect = function()
{
	this.bornTime = 0;
}

 Effect.prototype.Init = function(x, y, img)
 {
	this.x = x;
	this.y = y;
	this.img = img;
	this.alpha = 1.0;
	this.bornTime = Renderer.currentTime;
 }

Effect.prototype.Update = function()
{
	if(Renderer.currentTime - this.bornTime > 500)
		return;
		
	this.alpha = 1.0 - ((Renderer.currentTime - this.bornTime) / 500);
}

Effect.prototype.Render = function()
{
	if(Renderer.currentTime - this.bornTime > 500)
		return;

	Renderer.SetAlpha(this.alpha);
	Renderer.Img(this.x - g_cameraX , this.y - g_cameraY, this.img);
	Renderer.SetAlpha(1.0);
}