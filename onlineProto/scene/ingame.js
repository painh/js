var actorList;

var SceneIngame = function()
{
	var x = 0;
	var y = 240 - 13;
	var charWidth = 32;
	var charHeight = 48;
	var playerActor;
	var npcActor;

	this.Start = function()
	{
		// http://www.tekepon.net/fsm/modules/refmap/index.php?mode=vx-map
		charImg = ImageManager.Register( "./img/vx_chara03_a.png", "char1" );

		SoundManager.Register( "http://nextfloor.co.kr/sng/hof/snd/01.ogg", "snd1");
		MessageInst.SetText("가나다라!");
		
		actorList = new Array();
		playerActor = new ActorPlayer( 0, charImg, 0, "player");
		actorList.push( playerActor );
		
		CameraInst.followActor = playerActor;

		MapInst.Load( Maps );

		playerActor.x = 3 * 32;
		playerActor.y = 2 * 32;

		npcActor = new Actor( 1, charImg, 3, "npc1");
		actorList.push(npcActor );
		npcActor.x = 4 * 32;
		npcActor.y = 5 * 32;

		EventInst.Register( "npc1", function()
		{ 
			MessageInst.SetText("omg!");
		} );

		EventInst.Register( "block", function() {} );

	}

	this.End = function()
	{
	}

	this.Update = function()
	{
		if(MouseManager.LDown)
		{
			var btnSize = 40;
			if( (MouseManager.x > 0) && (MouseManager.y > 0) &&
				(MouseManager.x < btnSize) && (MouseManager.y < config["height"]) )
			{
				playerActor.MoveLeft();
			}

			if( (MouseManager.x > config["width"] - btnSize) && (MouseManager.y > 0) &&
				(MouseManager.x < config["width"]) && (MouseManager.y < config["height"]) )
			{
				playerActor.MoveRight();
			}

			if( (MouseManager.x > 0) && (MouseManager.y > 0) &&
				(MouseManager.x < config["width"]) && (MouseManager.y < btnSize) )
			{
				playerActor.MoveUp();
			}

			if( (MouseManager.x > 0) && (MouseManager.y > config["height"] - btnSize) &&
				(MouseManager.x < config["width"]) && (MouseManager.y < config["height"]) )
			{
				playerActor.MoveDown();
			}

//				SoundManager.Play("snd1");
//			x--;
//				Console.Trace("X : " + MouseManager.x + " Y : " + MouseManager.y);
		}

		if(actorList.length > 0)
		{
			for(var i = actorList.length-1; i > -1; i--)
			{
				if( actorList[i] == undefined )	// length부터 돌기 떄문에 undefined발생.
					continue;
				actorList[i].Update();
			/*
				if(actorList[i].IsDead())
					actorList.splice(i, 1);
				*/
			}
		}

		CameraInst.Update();
	}

	this.Render = function()
	{
		MapInst.Render();

//		Renderer.Img(x, y, img);
//			Renderer.Text(x,y, "A");
		Renderer.Text(0, 20, "X : " + playerActor.x + " Y : " + playerActor.y);

		for(var i = 0; i < actorList.length; i++)
		{
			actorList[i].Render();
		}
		MessageInst.Render();

	}
	
	this.GetActor = function ( actorID )
	{
		for(var i = 0; i < actorList.length; i++)
		{
			if( actorID == actorList[i].actorID )
				return actorList[i];
		}
		
		return null;
	}
};