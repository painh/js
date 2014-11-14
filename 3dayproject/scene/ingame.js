var actorList;

trace("fuck! im in scneIngame!");
var SceneIngame = function()
{
		var x = 0;
		var y = 240 - 13;
		var charWidth = 32;
		var charHeight = 48;
		var playerActor;
		var npcActor;
		var clickX = 0;
		var clickY = 0;

		this.Start = function()
		{
			// http://www.tekepon.net/fsm/modules/refmap/index.php?mode=vx-map
			charImg = ImageManager.Register( "./img/vx_chara03_a.png", "char1" );

			SoundManager.Register( "http://nextfloor.co.kr/sng/hof/snd/01.ogg", "snd1");
			MessageInst.SetText("가나다라!");
			
			actorList = new Array();
			playerActor = new ActorPlayer( charImg, 0, "player");
			actorList.push( playerActor );
			
			MapInst.Load( Maps );

			playerActor.x = 2 * 32;
			playerActor.y = 2 * 32;

			CameraInst.followActor = playerActor;

			npcActor = new Actor( charImg, 3, "npc1");
			actorList.push(npcActor );
			npcActor.x = 4 * 32;
			npcActor.y = 4 * 32;

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
			if(MouseManager.Clicked)
			{
				var px = Math.floor(MouseManager.x/32)*32;
				var py = Math.floor(MouseManager.y/32)*32;
				clickX = Math.round((CameraInst.x + px ) / 32);
				clickY = Math.round((CameraInst.y + py ) / 32) + 1;

				if((clickX < 0) ||
					(clickY < 0) ||
					(clickX >= MapInst.width) ||
					(clickY >= MapInst.height))
					return;

				var start = [ Math.floor(playerActor.x/32), Math.floor(playerActor.y/32) ];
				var dst = [ clickX , clickY ];
				var mapData = new Array();
				for(var x = 0; x < MapInst.width; ++x)
				{
					mapData[x] = new Array();
					for(var y = 0; y < MapInst.height; ++y)
					{
						var tileIDX = y * MapInst.width + x;
						mapData[x][y] = MapInst.mapData.layers[1].data[ tileIDX ];
					}
				}

				var path = a_star(start, dst, mapData, MapInst.width, MapInst.height);
				playerActor.movePath = path.reverse();
			}
/*
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
*/
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
			Renderer.Text(0, 20, "X : " + Math.floor(playerActor.x / 32) + " Y : " + Math.floor(playerActor.y / 32));
			Renderer.Text(0, 40, "X : " + clickX + " Y : " + clickY+","+MouseManager.x+","+MouseManager.y);
			Renderer.Text(0, 60, "X : " + Math.floor(CameraInst.x / 32) + " Y : " + Math.floor(CameraInst.y/32));

	
			for(var i = 0; i < actorList.length; i++)
			{
				actorList[i].Render();
			}
			MessageInst.Render();
			Renderer.Rect( Math.floor(MouseManager.x/32)*32, 
							Math.floor(MouseManager.y/32)*32, 32, 32);

			Renderer.SetColor("#880088");

//			Renderer.Rect( Math.floor(clickX)*32, 
//							Math.floor(clickY)*32, 32, 32);

		}	
};
trace("fuck! im in scneIngame! and out!");