var GameOverButton = function(x, y, coin, event)
{
	this.x = x
	this.y = y
	this.text = ""
	this.width = 200
	this.height = 32
	this.coin = coin
	this.event = event

	this.Update = function()
	{
		if(MouseManager.x >= this.x && MouseManager.x <= this.x + this.width &&
			MouseManager.y >= this.y && MouseManager.y <= this.y + this.height &&
			MouseManager.Clicked)
		{
			this.event(this)
			gameOver.RefreshBtn()
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
var GameOver = function()
{
	this.isGameOver = false
	this.stageSelect = new StageSelect()

	this.btnList = Array()

	this.btnStageRestart = new GameOverButton( 50, 250, 0, function(btn) 
										{
											gameOver.isGameOver = false
											g_ingame.StageRestart()
										})

	this.btnList.push(this.btnStageRestart)
	this.btnStageRestart.text = "스테이지 재시작"

	this.Update = function()
	{
		if(this.isGameOver == false)
			return

		for(var i = 0; i < this.btnList.length; ++i)
			this.btnList[i].Update()

		this.stageSelect.Update()
	}

	this.Render = function()
	{
		if(this.isGameOver == false)
			return

		Renderer.SetColor('rgba(0, 0, 0, 0.5)')
		Renderer.Rect(0, 0, config["width"], config["height"])

		Renderer.SetColor('rgba(255, 255, 255, 1)')
		Renderer.Text( 200, 100, "게임오버")

		this.stageSelect.Render()

		for(var i = 0; i < this.btnList.length; ++i)
			this.btnList[i].Render()
	}	

}