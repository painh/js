var actorWidth = 32
var actorHeight = 32
var stageWidth = 10
var playerHeight = 0
var enemyHeight = 3
var playerTop = config['height'] - 2 * actorHeight

var g_cameraX = 0
var g_cameraY = 0

var g_actorList
var g_actorTable
var g_enemyTable

var g_ingameState = 0
var g_currentBlock
var g_currentBlockWidth = 0
var g_currentBlockX = 0

var g_image

var g_midLineTimer = 0
var g_roundMaxSec = 1000 * 10

var g_midLinePlayerActorList
var g_midLineEnemyActorList

var g_win = 0
var g_lose = 0
var g_bounus = 0

var g_stageStartX = 0

var g_btnRect = [{ x : stageWidth * actorWidth + 20,
					y : 20,
					width : 100,
					height : 100,
					text : "즉시 승부"},

				{ x : stageWidth * actorWidth + 20,
					y : 20 + 100 + 10,
					width : 100,
					height : 30,
					text : "5줄"},

				{ x : stageWidth * actorWidth + 20,
					y : 20 + 100 + 30 + 10 + 10,
					width : 100,
					height : 30,
					text : "10줄"}]


var SceneIngame = function()
{
	g_image = ImageManager.Register( "./img/img.png", "img" );

	SoundManager.Register( "./snd/jump.wav", "jump" )
	SoundManager.Register( "./snd/hit.wav", "hit" )
	SoundManager.Register( "./snd/critical.mp3", "critical" )
	SoundManager.Register( "./snd/damage.wav", "damage" )
	SoundManager.Register( "./snd/laser.wav", "laser" )

	this.Start = function()
	{
		this.Restart()
	}

	this.Restart = function()
	{
		g_actorList = new Array()

		g_stageStartX = ((10 - stageWidth) / 2) * actorWidth

		g_midLinePlayerActorList = new Array(stageWidth)
		g_midLineEnemyActorList = new Array(stageWidth)

		for(var i = 0; i < g_midLinePlayerActorList.length; ++i)
		{
			var actor = new Actor()
			actor.x = g_stageStartX + i * actorWidth
			actor.y = playerTop - actorHeight - 5
			actor.renderX = actor.x
			actor.renderY = actor.y
			actor.type = 3

			g_midLinePlayerActorList[i] = actor
			g_actorList.push(actor)
		}


		g_currentBlock = new Array()
		g_actorTable = new Array(stageWidth)

		for(var i = 0; i < g_actorTable.length; ++i)
			g_actorTable[i] = new Array(playerHeight)


		g_enemyTable = new Array(stageWidth)
		for(var i = 0; i < g_enemyTable.length; ++i)
		{
			g_enemyTable[i] = new Array(enemyHeight)
			
			for(var j = 0; j < g_enemyTable[i].length; ++j)
			{
				var actor = new Actor()
				actor.x = g_stageStartX + i * actorWidth
				actor.y = (j + 2) * actorHeight
				actor.renderX = actor.x
				actor.renderY = actor.y
				actor.type = randomRange(0, 2)

				g_enemyTable[i][j] = actor
				g_actorList.push( actor )
			}
		}		

		g_midLineTimer = Renderer.currentTime
		this.RefreshCurrentBlock()		

	}

	this.End = function()
	{
	}

	this.RemoveActorFromArray = function(arr, obj)
	{
		if(obj == null)
		{
			trace("obj is null")
			return
		}

		for(var i = 0; i < arr.length; ++i)
			if(arr[i] == obj)
			{
				arr.splice(i, 1)
				return
			}

		trace("RemoveActorFromArray failed")
	}

	this.RefreshCurrentBlock = function()
	{
		for(var idx in g_currentBlock)
			this.RemoveActorFromArray( g_actorList, g_currentBlock[idx].actor )

		g_currentBlock = new Array()

		g_currentBlock.push( { x : 0, y : 0, type : randomRange(0, 2)} )
	
		for(var idx in g_currentBlock)
		{
			var actor = new Actor()

			actor.x = g_stageStartX + (g_currentBlock[idx].x + g_currentBlockX)* actorWidth
			actor.y = g_currentBlock[idx].y * actorHeight + playerTop + playerHeight * actorHeight
			actor.renderX = actor.x
			actor.renderY = actor.y
			actor.type = g_currentBlock[idx].type
			actor.speed = config['fps'] / 30

			g_currentBlock[idx].actor = actor

			g_actorList.push(actor)

			if( g_currentBlockWidth < g_currentBlock[idx].x + 1 )
				g_currentBlockWidth = g_currentBlock[idx].x + 1
		}

		if((g_currentBlockX + g_currentBlockWidth) > stageWidth)
			g_currentBlockX =  (stageWidth - 1) - g_currentBlockX + g_currentBlockWidth

	}
	
	this.Update = function()
	{
		g_currentBlockX = Math.floor((MouseManager.x - g_stageStartX)/ actorWidth)

		var out = false

		if(g_currentBlockX < 0)
		{
			out = true
			g_currentBlockX = 0
		}

		if(g_currentBlockX >= stageWidth)
		{
			out = true
			g_currentBlockX = stageWidth - 1
		}

		for(var idx in g_currentBlock)
		{
			var actor = g_currentBlock[idx].actor
			actor.x = g_stageStartX + (g_currentBlock[idx].x + g_currentBlockX)* actorWidth
			actor.y = g_currentBlock[idx].y * actorHeight + playerTop + playerHeight * actorHeight
		}


		var delList = new Array()
		for(var idx in g_actorList)
		{
			g_actorList[idx].Update()

			if(g_actorList[idx].state == 0)
				continue;

			if((g_actorList[idx].x == g_actorList[idx].renderX) &&
				(g_actorList[idx].y == g_actorList[idx].renderY))
			{
				delList.push(g_actorList[idx])
			}
		}

		for(var idx in delList)
			this.RemoveActorFromArray( g_actorList, delList[idx])

		if(MouseManager.Upped && !out)
		{
			for(var idx in g_currentBlock)
			{
				var blockX = g_currentBlock[idx].x + g_currentBlockX
				var blockY = g_currentBlock[idx].y
				var blockType = g_currentBlock[idx].actor.type

				actor = new Actor()
				actor.x = g_stageStartX + blockX * actorWidth
				actor.y = playerTop - actorHeight - 5
				actor.type = blockType
				actor.renderX = actor.x
				actor.renderY = playerTop + (playerHeight + blockY) * actorHeight
				g_actorList.push(actor)

				this.RemoveActorFromArray(g_actorList, g_midLinePlayerActorList[blockX])

				g_midLinePlayerActorList[blockX] = actor

				this.RefreshCurrentBlock()
			}
		}

		for(var i = 0; i < g_midLineEnemyActorList.length; ++i)
		{
			if(g_midLineEnemyActorList[i] != null)
				continue

			g_midLineEnemyActorList[i] = g_enemyTable[i][ g_enemyTable[i].length -1 ]

			g_midLineEnemyActorList[i].y = (5 * actorHeight) + 8

			for(j = g_enemyTable[i].length -1; j >= 1; --j)
			{
				g_enemyTable[i][j] = g_enemyTable[i][j-1]
				g_enemyTable[i][j].y = (j+1) * actorHeight
			}
				
			var actor = new Actor()
			actor.x = g_stageStartX + i * actorWidth
			actor.y = actorHeight
			actor.renderX = actor.x
			actor.renderY = actor.y
			actor.type = randomRange(0, 2)

			g_enemyTable[i][0] = actor
			g_actorList.push( actor )
		}

		var forceClear = false

		for(var i = 0; i < g_btnRect.length; ++i)
		{

			if(MouseManager.x >= g_btnRect[i].x &&
				MouseManager.y >= g_btnRect[i].y &&
				MouseManager.x < g_btnRect[i].x + g_btnRect[i].width &&
				MouseManager.y < g_btnRect[i].y + g_btnRect[i].height &&
				MouseManager.Clicked )
			{

				if(i == 0)
				{
					var j = 0

					for(j = 0; j < g_midLineEnemyActorList.length; ++j)
						if(g_midLinePlayerActorList[j].type == 3)
							break

					if(j == g_midLineEnemyActorList.length)
					{
						g_bounus += Renderer.currentTime - g_midLineTimer
						forceClear = true
					}
					continue;
				}

				if(i == 1)
				{
					stageWidth = 5
					this.Restart()
				}

				if(i == 2)
				{
					stageWidth = 10
					this.Restart()
				}

			}		


		}

		if( (Renderer.currentTime - g_midLineTimer) >= g_roundMaxSec || forceClear)
		{
			g_midLineTimer = Renderer.currentTime

			for(var i = 0; i < stageWidth; ++i)
			{
				if(g_midLinePlayerActorList[i].type == g_midLineEnemyActorList[i].type)
				{
					this.RemoveActorFromArray(g_actorList, g_midLinePlayerActorList[i])
					this.RemoveActorFromArray(g_actorList, g_midLineEnemyActorList[i])
					g_midLineEnemyActorList[i] = null

					var actor = new Actor()
					actor.x = g_midLinePlayerActorList[i].x
					actor.y = g_midLinePlayerActorList[i].y
					actor.renderX = actor.x
					actor.renderY = actor.y
					actor.type = 3

					g_midLinePlayerActorList[i].state = 1
					g_midLinePlayerActorList[i].speed = config['fps'] / 2
					g_midLinePlayerActorList[i].x = 0
					g_midLinePlayerActorList[i].y = config['height'] - 20


					g_midLinePlayerActorList[i] = actor
					g_actorList.push(actor)

					continue
				}

				var playerWin

				if(g_midLinePlayerActorList[i].type == 3 && g_midLineEnemyActorList[i].type != 3)
					playerWin = false

				if(g_midLineEnemyActorList[i].type == 3 && g_midLinePlayerActorList[i].type != 3)
					playerWin = true

				if(g_midLinePlayerActorList[i].type == 0 && g_midLineEnemyActorList[i].type == 1)		//묵 vs 찌
					playerWin = true

				if(g_midLinePlayerActorList[i].type == 0 && g_midLineEnemyActorList[i].type == 2)		//묵 vs 빠
					playerWin = false

				if(g_midLinePlayerActorList[i].type == 1 && g_midLineEnemyActorList[i].type == 0)		//찌 vs 묵
					playerWin = false

				if(g_midLinePlayerActorList[i].type == 1 && g_midLineEnemyActorList[i].type == 2)		//찌 vs 빠
					playerWin = true

				if(g_midLinePlayerActorList[i].type == 2 && g_midLineEnemyActorList[i].type == 0)		//빠 vs 묵
					playerWin = true

				if(g_midLinePlayerActorList[i].type == 2 && g_midLineEnemyActorList[i].type == 1)		//빠 vs 찌
					playerWin = false					

//				if(g_midLinePlayerActorList[i] && g_midLineEnemyActorList[i])
//					trace(i + "," + g_midLinePlayerActorList[i].type + "," + g_midLineEnemyActorList[i].type + "," + playerWin)

				if(playerWin)
				{
					g_win++

					g_midLineEnemyActorList[i].state = 2
					g_midLineEnemyActorList[i].speed = config['fps'] / 2
					g_midLineEnemyActorList[i].x = 0
					g_midLineEnemyActorList[i].y = 0

					g_midLineEnemyActorList[i] = null


					var actor = new Actor()
					actor.x = g_midLinePlayerActorList[i].x
					actor.y = g_midLinePlayerActorList[i].y
					actor.renderX = actor.x
					actor.renderY = actor.y
					actor.type = 3

					g_midLinePlayerActorList[i].state = 3
					g_midLinePlayerActorList[i].speed = config['fps'] / 2
					g_midLinePlayerActorList[i].x = config['width']
					g_midLinePlayerActorList[i].y = 0

					g_midLinePlayerActorList[i] = actor
					g_actorList.push(actor)					
				}
				else
				{
					g_lose++

					g_midLineEnemyActorList[i].state = 1
					g_midLineEnemyActorList[i].speed = config['fps'] / 2
					g_midLineEnemyActorList[i].x = config['width']
					g_midLineEnemyActorList[i].y = config['height'] - 20

					g_midLineEnemyActorList[i] = null

					var actor = new Actor()
					actor.x = g_midLinePlayerActorList[i].x
					actor.y = g_midLinePlayerActorList[i].y
					actor.renderX = actor.x
					actor.renderY = actor.y
					actor.type = 3


					g_midLinePlayerActorList[i].state = 1
					g_midLinePlayerActorList[i].speed = config['fps'] / 2

					if(g_midLinePlayerActorList[i].type == 3)
					{
						g_midLinePlayerActorList[i].x = config['width']
						g_midLinePlayerActorList[i].y = config['height'] - 20						
					}
					else
					{
						g_midLinePlayerActorList[i].x = 0
						g_midLinePlayerActorList[i].y = 0
					}


					g_midLinePlayerActorList[i] = actor
					g_actorList.push(actor)
				}
			}
		}
	}

	this.Render = function()
	{
		if(MouseManager.x >= g_stageStartX  && MouseManager.x < (actorWidth * stageWidth) + g_stageStartX )
		{
			Renderer.SetColor('rgba(0, 255, 0, ' + (totalFPS % 255) / 255 +')')
			Renderer.Rect(g_stageStartX + (g_currentBlockX * actorWidth), 0, actorWidth, config['height'])
		}

		for(var idx in g_actorList)
			g_actorList[idx].Render()

		Renderer.SetColor('rgba(255, 255, 255, 1)')
		Renderer.Rect(g_stageStartX , 32 * 7 - 15, stageWidth * actorWidth, 5)
		Renderer.SetColor('rgba(255, 0, 0, 1)')
		Renderer.Rect(g_stageStartX , 32 * 7 - 15 + 1, (Renderer.currentTime - g_midLineTimer) / g_roundMaxSec *  stageWidth * actorWidth, 3)

		Renderer.SetColor('rgba(255, 255, 255, 1)')		
		Renderer.Text(0, 0, "win / lose " + g_win + "/" +g_lose)
		Renderer.Text(200, 0, "score " + (g_win - g_lose + g_bounus))

		for(var i = 0; i < g_btnRect.length; ++i)
		{
			Renderer.SetColor('rgba(0, 128, 0, 1)')
			Renderer.Rect(g_btnRect[i].x, g_btnRect[i].y, g_btnRect[i].width, g_btnRect[i].height)

			Renderer.SetColor('rgba(255, 255, 255, 1)')		
			Renderer.Text(g_btnRect[i].x, g_btnRect[i].y, g_btnRect[i].text)
		}

	}
};
