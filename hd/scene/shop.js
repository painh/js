var ShopButton = function(x, y, coin, event)
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
			shop.RefreshBtn()
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

		if(john.coin < this.coin)
			Renderer.SetColor('rgba(255, 0, 0, 1)')
		else
			Renderer.SetColor('rgba(255, 255, 255, 1)')
		Renderer.Text( this.x, this.y, this.text)
	}

};
var Shop = function()
{
	this.isShopOpen = false

	this.btnList = Array()

	this.btnExit = new ShopButton( 0, 0, 0, function(btn) 
										{
											shop.isShopOpen = false
										})
	this.btnRestart = new ShopButton( 0, 32 + 10, 0, function(btn)
										{
											shop.isShopOpen = false
											g_ingame.StageRestart()

										})

	this.btnHP = new ShopButton( 0, (32 + 10) * 2, 100, function(btn)
										{
											if(john.coin < btn.coin)
												return
											john.coin -= btn.coin

											john.maxHp += 10
										} )

	this.btnAP = new ShopButton( 0, (32 + 10) * 3, 100, function(btn)
										{
											if(john.coin < btn.coin)
												return
											john.coin -= btn.coin

											john.phyAPMin += 1
											john.phyAPMax += 1
										} )

	this.btnCritical = new ShopButton( 0, (32 + 10) * 4, 100, function(btn)
										{
											if(john.coin < btn.coin)
												return
											john.coin -= btn.coin

											this.critical += 0.1
										} )

	this.btnArmor = new ShopButton( 0, (32 + 10) * 5, 100, function(btn)
										{
											if(john.coin < btn.coin)
												return
											john.coin -= btn.coin

											this.phyReduce += 1
										} )

	this.btnList.push(this.btnExit)
	this.btnList.push(this.btnRestart)
	this.btnList.push(this.btnHP)
	this.btnList.push(this.btnAP)
	this.btnList.push(this.btnCritical)
	this.btnList.push(this.btnArmor)


	this.RefreshBtn = function()
	{
		this.btnExit.text = "상점 닫기"
		this.btnRestart.text = "0층으로 돌아가 재시작"
		this.btnHP.text = "HP를 올린다 요구코인 : " + this.btnHP.coin
		this.btnAP.text = "공격력을 올린다 요구코인 : " + this.btnAP.coin
		this.btnCritical.text = "치명타를 올린다 요구코인 : " + this.btnCritical.coin
		this.btnArmor.text = "방어도를 올린다 요구코인 : " + this.btnArmor.coin
	}

	this.RefreshBtn()

	this.Update = function()
	{
		if(this.isShopOpen == false)
			return

		for(var i = 0; i < this.btnList.length; ++i)
			this.btnList[i].Update()
	}

	this.Render = function()
	{
		if(this.isShopOpen == false)
			return

		Renderer.SetColor('rgba(0, 0, 255, 0.5)')
		Renderer.Rect(0, 0, config["width"], config["height"])

		for(var i = 0; i < this.btnList.length; ++i)
			this.btnList[i].Render()

		var statX = 250
		var statY = 0
		Renderer.SetColor('rgba(255, 255, 255, 1)')
		Renderer.Text(statX, statY, "coin " + john.coin); statY += 16
		Renderer.Text(statX, statY, "maxHP" + john.maxHp); statY += 16
		Renderer.Text(statX, statY, "물리감소률" + john.phyReduce); statY += 16
		Renderer.Text(statX, statY, "공격력" + john.phyAPMin + " ~ " + john.phyAPMax); statY += 16
		Renderer.Text(statX, statY, "치명타" + john.critical); statY += 16
		Renderer.Text(statX, statY, "maxHP" + john.maxHp); statY += 16
		Renderer.Text(statX, statY, "maxHP" + john.maxHp); statY += 16
		Renderer.Text(statX, statY, "maxHP" + john.maxHp); statY += 16

	}	

}