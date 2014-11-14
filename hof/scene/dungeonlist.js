var SceneDungeonList = function()
{
	this.AddCharListBtn = function()
	{
		var button = $("<span id='btnCharList'></span>").appendTo("#game").button();
		button.css("font-size","9px" );
		button.button({label:"Char list!!"});
		button.click( function() { SceneManager.SetNext( SceneCharList ); } );
	}

	this.Start = function()
	{
		trace("scene dungeon select start!");
		SceneDungeonList.AddCharListBtn();
	}
	
	this.End = function()
	{
		$("#btnCharList").remove();
	}

	this.Render = function()
	{
/*		// TODO 매번 이렇게 렌더링 하는 것이 의미가 있는가?
		if( this.m_isRecvCharList  == false )
		{
			Renderer.Text(0, 40, "req char list...");
			return;
		}
		
		Renderer.Text(0, 40, "char list is... turn " + MyInfo.turn + "/"+ config['turnMax']);
*/
		for(var i = 0; i < MyCharList.length; ++i)
		{
			Renderer.Text(i * 100 , 80, MyCharList[i].name );
			Renderer.Img(i * 100 , 100, MyCharList[i].img );
			
		}
	}
	
	this.Update = function()
	{
	}
}