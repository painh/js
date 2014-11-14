var Text = function()
{
}

 Text.prototype.Init = function(x, y, str, color, effect)
 {
	this.x = x;
	this.y = y;
	this.xForce = randomRange(0, 10) - 5;
	this.str = str;
	this.color = color;
	this.effect = effect; 
	this.bornTime = Renderer.currentTime;
 }

Text.prototype.Update = function()
{
	if(Renderer.currentTime - this.bornTime > 500)
		return;

	this.x += this.xForce;
	this.y--;
}

Text.prototype.Render = function()
{
	if(Renderer.currentTime - this.bornTime > 500)
		return;

	Renderer.SetColor(this.color);
	
	if(this.effect)
		Renderer.SetFont( (50 - (Renderer.currentTime   - this.bornTime ) / 10) + 'pt Arial');
	else
		Renderer.SetFont('13pt Arial');
		
	Renderer.Text(this.x - g_cameraX , this.y - g_cameraY, this.str);
}