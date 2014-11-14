var VictoryButton = function(x, y, event)
{
	this.x = x
	this.y = y
	this.text = ""
	this.width = 200
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
var Victory = function()
{
	this.isVictory = false
	this.stageSelect = new StageSelect()

	this.btnList = Array()

	this.btnRestart = new VictoryButton( 50, 250, function(btn) 
										{
											victory.isVictory = false
											g_ingame.StageRestart()
										})

	this.btnRestart.text = "스테이지 재시작"

	this.btnList.push(this.btnRestart)

	this.Update = function()
	{
		if(this.isVictory == false)
			return

		for(var i = 0; i < this.btnList.length; ++i)
			this.btnList[i].Update()

		this.stageSelect.Update()
	}

	this.Render = function()
	{
		if(this.isVictory == false)
			return

		Renderer.SetColor('rgba(0, 0, 0, 0.5)')
		Renderer.Rect(0, 0, config["width"], config["height"])

		Renderer.SetColor('rgba(255, 255, 255, 1)')
		Renderer.Text( 250, 0, "승리!")

		this.stageSelect.Render()

		for(var i = 0; i < this.btnList.length; ++i)
			this.btnList[i].Render()
	}

}