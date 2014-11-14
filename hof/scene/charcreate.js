var SceneCharCreate = function()
{
	this.selectedClass = 0;
	this.selectedClassImg = null;
	this.OnClass = function(e)
	{
		trace(this.id);
		if(this.id == "btnWar")
		{
			SceneCharCreate.selectedClassImg = ImageManager.Register( imgRes["warrior"], "warrior" );
			SceneCharCreate.selectedClass = 1;
		}
		else if (this.id == "btnMage")
		{
			SceneCharCreate.selectedClassImg = ImageManager.Register( imgRes["mage"], "mage" );
			SceneCharCreate.selectedClass = 2;
		}
		else if (this.id == "btnTheif")
		{
			SceneCharCreate.selectedClassImg = ImageManager.Register( imgRes["theif"], "theif" );
			SceneCharCreate.selectedClass = 3;
		}
		else if (this.id == "btnPriest")
		{
			SceneCharCreate.selectedClassImg = ImageManager.Register( imgRes["priest"], "priest");
			SceneCharCreate.selectedClass = 4;
		}
	}

	this.OnCreateSuccess = function(jsonObj)
	{
		if(jsonObj.isSuccess == true)
			SceneManager.SetNext( SceneCharList );
	}

	this.OnReqErr = function()
	{
	}

	this.OnCreate = function()
	{
		var json = { name : $("#name").val(),
					class : SceneCharCreate.selectedClass };

		RequestManager.Post('http://nextfloor.co.kr/sng/hof/php/charcreate.php', 
							json							
							, SceneCharCreate.OnCreateSuccess, SceneCharCreate.OnReqErr );	
	}
	
	this.OnCancel = function()
	{
		SceneManager.SetNext( SceneCharList );
	}
	
	this.Start = function()
	{
		trace("scene char create start!");

		$("<div id = 'charCreate'></dv>").appendTo("#game");

		button = $("<span id='btnCancel'></span>").appendTo("#charCreate").button();
		button.css("font-size","9px" );
		button.button({label:"Cancel!"});
		button.click( this.OnCancel  );

		button = $("</br>").appendTo("#charCreate");
		var ipt = $("<div id='ipt'></div>").appendTo("#charCreate");
		ipt.css( { position : "absolute"} );
		var textinput = $("<input type = 'text' id='name'/>").appendTo("#ipt");
		button = $("</br>").appendTo("#charCreate");

		button = $("<span id='btnWar'></span>").appendTo("#charCreate").button();
		button.css("font-size","9px" );
		button.button({label:"전사"});
		button.click( this.OnClass  );

		button = $("<span id='btnMage'></span>").appendTo("#charCreate").button();
		button.css("font-size","9px" );
		button.button({label:"마법사"});
		button.click( this.OnClass  );

		button = $("<span id='btnTheif'></span>").appendTo("#charCreate").button();
		button.css("font-size","9px" );
		button.button({label:"도적"});
		button.click( this.OnClass  );

		button = $("<span id='btnPriest'></span>").appendTo("#charCreate").button();
		button.css("font-size","9px" );
		button.button({label:"사제"});
		button.click( this.OnClass  );

		button = $("</br>").appendTo("#charCreate");

		var button = $("<span id='btnCreate'></span>").appendTo("#charCreate").button();
		button.css("font-size","9px" );
		button.button({label:"Create!",
						position : [ 0, 80] });

		button.css("position", "0,80")
		button.click( this.OnCreate  );
		button.offsetY = 200;


	}
	
	this.End = function()
	{
		$("#btnCreate").remove();
		$("#btnCancel").remove();
		$("#ipt").remove();
		$("#name").remove();
		$("#btnWar").remove();
		$("#btnMage").remove();
		$("#btnTheif").remove();
		$("#btnPriest").remove();
		$("#btnCreate").remove();
		$("#charCreate").remove();
	}

	this.Render = function()
	{
		if( this.selectedClassImg == null)
			return;
		Renderer.Img( 0, 80, this.selectedClassImg );
	}
	
	this.Update = function()
	{
	}
}