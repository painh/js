var SceneLogin = function()
{
	
	this.OnLoginSuccess = function( jsonData )
	{
		if(jsonData.uid == undefined)
		{
			trace("login failed");
			return;
		}
		trace("login success");
		MyInfo = jsonData;
		SceneManager.SetNext( SceneCharList );
	}
	
	this.OnReqError = function()
	{
		trace("onReqError!");
	}
	
	this.SendLoginReq = function(e)
	{
		trace($("#name").val());
		RequestManager.Get('http://nextfloor.co.kr/sng/hof/php/login.php', { name : $("#name").val() }, SceneLogin.OnLoginSuccess, SceneLogin.OnReqError );
	}
				
	this.succ = function()
	{
		trace("success");
	}
	this.err = function()
	{
		trace("err");
	}

	this.OnRecvLogined = function(jsonData)
	{
		if(jsonData['isLogined'] == true)
		{
			RequestManager.Get('http://nextfloor.co.kr/sng/hof/php/login.php', jsonData, SceneLogin.OnLoginSuccess, SceneLogin.OnReqError );
			return;
		}


		$('#login').remove();

		$("<div id='login'></div>").appendTo("#game");
		$("#login").css("border", "1px dotted black");
		$("#login").dialog( { position : "center" });
		
		$("#login").css("font-size","9px" );
		$("<label>User name : </label>").appendTo("#login");
		$("<input type = 'text' id='name'/>").appendTo("#login");

		$("#name").keypress(
											function(event)
											{ 
												var keycode = (event.keyCode ? event.keyCode : event.which);
												if(keycode == '13')
												{
													SceneLogin.SendLoginReq();
												}
											}
										);
 
		var button = $("<span id='btnLogin'></span>").appendTo("#login").button();
		button.css("font-size","9px" );
		button.button({label:"login!"});
		button.click( SceneLogin.SendLoginReq );

	}
	this.Start = function()
	{
		trace("scene login start!");

		RequestManager.Get('http://nextfloor.co.kr/sng/hof/php/islogined.php', null, SceneLogin.OnRecvLogined, SceneLogin.OnReqError );
	}
	
	this.End = function()
	{
		$('#login').remove();
	}

	this.Render = function()
	{
	}
	
	this.Update = function()
	{
	}
}