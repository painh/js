var actorList;

var SceneIngame = function()
{
		var x = 0;
		var y = 240 - 13;
		var charWidth = 16;
		var charHeight = 16;
		var playerActor;
		var npcActor;
		var clickX = 0;
		var clickY = 0;
		var uiImage;

		this.Start = function()
		{
			// http://www.tekepon.net/fsm/modules/refmap/index.php?mode=vx-map
			charImg = ImageManager.Register( "./img/tile.png", "char1" );
			uiImage = ImageManager.Register( "./img/ui.png", "ui" );

			SoundManager.Register( "http://nextfloor.co.kr/sng/hof/snd/01.ogg", "snd1");
		    var text = "All the world 's a stage, and all the men and women merely players. They have their exits and their entrances; And one man in his time plays many parts.";
			MessageInst.SetText(text);
			
			actorList = new Array();
			playerActor = new ActorPlayer( charImg, 0, "player");
			actorList.push( playerActor );
			
			MapInst.Load( Maps );

			playerActor.x = 2 * tileSize;
			playerActor.y = 2 * tileSize;

			CameraInst.followActor = playerActor;
			
			npcActor = new Actor( charImg, 1, "npc1" );
			actorList.push(npcActor);
			npcActor.x = 4 * tileSize;
			npcActor.y = 4 * tileSize;

			EventInst.Register( "npc1", function()
			{ 
				MessageInst.SetText("가나다라마바사아 abcdefghijklnmopqwewer wqersdfsadfx czvzxcv 가나다라 마바사아 자차카타 파하");
			} );

			EventInst.Register( "block", function() {} );

		}

		this.End = function()
		{
		}

		this.Update = function()
		{
/*		
			if(MouseManager.Clicked)
			{
				var px = Math.floor(MouseManager.x/tileSize)*tileSize;
				var py = Math.floor(MouseManager.y/tileSize)*tileSize;
				clickX = Math.round((CameraInst.x + px ) / tileSize);
				clickY = Math.round((CameraInst.y + py ) / tileSize) + 1;

				if((clickX < 0) ||
					(clickY < 0) ||
					(clickX >= MapInst.width) ||
					(clickY >= MapInst.height))
					return;

				var start = [ Math.floor(playerActor.x/tileSize), Math.floor(playerActor.y/tileSize) ];
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
			
			Renderer.Img( 0, 0, uiImage );

			MessageInst.Render();

			Renderer.SetColor("#880088");
			

//			Renderer.Rect( Math.floor(clickX)*32, 
//							Math.floor(clickY)*32, 32, 32);

		}	
};
trace("fuck! im in scneIngame! and out!");