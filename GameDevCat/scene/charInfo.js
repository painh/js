var charInfo = function()
{
	this.actor = null

	this.Update = function()
	{
		
	}

	this.Render = function()
	{
		if(this.actor == null)
			return;

		Renderer.SetColor('#ffffff')
		Renderer.Rect(0, 0, 320, 300)

		Renderer.SetColor('#000000')

		Renderer.Text(0, 0, this.actor.level + ". " + this.actor.displayName )
		Renderer.Text(0, 15, this.actor.hp + " / " + this.actor.maxHP)

	}
}