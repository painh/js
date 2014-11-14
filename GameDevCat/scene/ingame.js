var SceneIngame = function()
{
	var buttonList = new Array()
	var actorList = new Array()

	var gameMoney = 0;

	//------UI

	var uiCharInfo = new charInfo()

	//------game actor
	
	
	//-----------------------------

	this.Start = function()
	{
		var test = new Button(100, 100, 50, 100,
							function()
							{
								Renderer.SetColor('#000000');
								Renderer.Text( this.x, this.y, "test")
							},
							function()
							{
								trace('clicked!')
							}
							)

		buttonList.push(test)

		var actor = new Actor()
		actorList.push(actor)

		uiCharInfo.actor = actor;
	}

	this.End = function()
	{
	}

	this.Update = function()
	{
		for(var i = 0; i < buttonList.length; ++i)
			buttonList[i].Update();

		for(var i = 0; i < actorList.length; ++i)
			actorList[i].Update();

		uiCharInfo.Update()
	}

	this.Render = function()
	{
		for(var i = 0; i < actorList.length; ++i)
			actorList[i].Render();

		for(var i = 0; i < buttonList.length; ++i)
			buttonList[i].Render();


		//render ui
		Renderer.Text(0, 0, '$ : ' + gameMoney)

		uiCharInfo.Render()
	}
};