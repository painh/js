var Button = function( x, y, width, height, renderFunc, clickFunc)
{
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.renderFunc = renderFunc;
	this.clickFunc = clickFunc;

	this.isPressed = false;

	this.Update = function()
	{
		if( !(MouseManager.x >= this.x &&
			MouseManager.y >= this.y &&
			MouseManager.x <= this.x + this.width &&
			MouseManager.y <= this.y + this.height) )
		{
			this.isPressed = false;
			return;
		}

		if(MouseManager.LDown && this.isPressed == false)
		{
			this.isPressed = true;
			return;
		}

		if(MouseManager.LDown)
			return;

		if(this.isPressed == false)
			return;

		this.isPressed = false;

		if(this.clickFunc)
			this.clickFunc;


	}

	this.Render = function()
	{
		if(this.isPressed)
			Renderer.SetColor('rgba(255, 255, 255, 1)')
		else
			Renderer.SetColor('rgba(255, 0, 255, 1)')

		Renderer.Rect(this.x, this.y, this.width, this.height);

		if(this.renderFunc)
			this.renderFunc();
	}
}