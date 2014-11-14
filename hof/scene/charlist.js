var SceneCharList = function()
{
	this.m_isRecvCharList = false;
	
	this.OnCreateChar = function()
	{
		SceneManager.SetNext( SceneCharCreate );
	}
	
	this.AddCreateBtn = function()
	{
		var button = $("<span id='btnCreateChar'></span>").appendTo("#game").button();
		button.css("font-size","9px" );
		button.button({label:"CreateChar!"});
		button.click( SceneCharList.OnCreateChar  );
	}

	this.AddDungeonBtn = function()
	{
		var button = $("<span id='btnDungeon'></span>").appendTo("#game").button();
		button.css("font-size","9px" );
		button.button({label:"Dungeon!!"});
		button.click( function() { SceneManager.SetNext( SceneDungeonList ); } );
	}

	
	this.OnCharListSuccess = function( jsonObj )
	{
		trace("OnCharListSuccess : ");
		SceneCharList.m_isRecvCharList  = true;

		if( jsonObj['num'] < config['maxChar'] )
			SceneCharList.AddCreateBtn();		

		SceneCharList.AddDungeonBtn();

		for( var i = 0; i < jsonObj['num']; ++i)
		{
			var newObj = new Object;
			newObj = jsonObj[i];

			if( newObj.class == 1)
				newObj.img = ImageManager.Register( imgRes["warrior"], "warrior" );

			if( newObj.class == 2)
				newObj.img = ImageManager.Register( imgRes["mage"], "mage" );

			if( newObj.class == 3)
				newObj.img = ImageManager.Register( imgRes["theif"], "theif" );

			if( newObj.class == 4)
				newObj.img = ImageManager.Register( imgRes["priest"], "priest" );

			MyCharList.push( jsonObj[i] );
		}
	}

	this.OnReqError = function()
	{
		trace("charlist - onReqError!");
	}
	
	this.Start = function()
	{
		trace("scene char list start!");
	
		MyCharList = [];
		this.m_isRecvCharList  = false;

		RequestManager.Get('http://nextfloor.co.kr/sng/hof/php/charlist.php', null, SceneCharList.OnCharListSuccess, SceneCharList.OnReqError );	
	}
	
	this.End = function()
	{
		$("#btnCreateChar").remove();
		$("#btnDungeon").remove();
	}

	this.Render = function()
	{
		// TODO 매번 이렇게 렌더링 하는 것이 의미가 있는가?
		if( this.m_isRecvCharList  == false )
		{
			Renderer.Text(0, 40, "req char list...");
			return;
		}
		
		Renderer.Text(0, 40, "char list is... turn " + MyInfo.turn + "/"+ config['turnMax']);

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