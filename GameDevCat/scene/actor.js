var Actor = function()
{
	//rednering
	this.displayName = '존도우'
	this.x = 0
	this.y = 0
	this.color = '#ffffff'

	//stat
	this.level = 1;
	this.hp	= 10
	this.maxHP	= 10
	this.stress = 10

	this.programming = 10
	this.gameDesign = 10;
	this.art = 10;
	this.sound = 10;

	this.Update = function()
	{
	}

	this.Render = function()
	{
		Renderer.Rect(this.x, this.y, 10, 10);
	}
}