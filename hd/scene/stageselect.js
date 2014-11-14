var StageButton = function(x, y, event)
{
	this.x = x
	this.y = y
	this.text = ""
	this.width = 32
	this.height = 32
	this.event = event

	this.Update = function()
	{
		if(MouseManager.x >= this.x && MouseManager.x <= this.x + this.width &&
			MouseManager.y >= this.y && MouseManager.y <= this.y + this.height &&
			MouseManager.Clicked)
		{
			this.event(this)
		}
	}

	this.Render = function()
	{
		if(MouseManager.x >= this.x && MouseManager.x <= this.x + this.width &&
			MouseManager.y >= this.y && MouseManager.y <= this.y + this.height )
		{
			Renderer.SetColor('rgba(0, 0, 255, 0.5)')
		}
		else
			Renderer.SetColor('rgba(0, 255, 0, 0.5)')
		Renderer.Rect( this.x, this.y, this.width, this.height)

		Renderer.SetColor('rgba(255, 255, 255, 1)')

		Renderer.Text( this.x, this.y, this.text)
	}

};
var StageSelect = function()
{
	this.isVictory = false

	this.btnList = Array()
	this.btnList.length = stageMaxNum
	
	for(var i = 0; i < this.btnList.length; ++i)
	{
		var btn = new StageButton( 50 + i * 40, 200, function(btn) 
											{
												currentStage = this.text
												g_ingame.StageRestart()
											})

		btn.text = i + 1
		this.btnList[i] = btn
	}

	this.Update = function()
	{
		for(var i = 0; i < this.btnList.length; ++i)
			this.btnList[i].Update()
	}

	this.Render = function()
	{
		for(var i = 0; i < this.btnList.length; ++i)
			this.btnList[i].Render()
	}	

}