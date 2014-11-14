var actorWidth = 32
var actorHeight = 32
var stageWidth = 10
var playerHeight = 3
var playerTop = config['height'] - (5 + 2) * actorHeight

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
var g_roundMaxSec = 1000 * 20

var g_midLinePlayerActorList
var g_midLineEnemyActorList

var g_enemyScore = 0
var g_playerScore = 0

var g_enemyHP = 100
var g_playerHP = 100


var SceneIngame = function()
{
	g_image = ImageManager.Register( "./img/img.png", "img" );

	this.Start = function()
	{
		g_actorList = new Array()

		g_midLinePlayerActorList = new Array(stageWidth)
		g_midLineEnemyActorList = new Array(stageWidth)

		for(var i = 0; i < g_midLinePlayerActorList.length; ++i)
		{
			var actor = new Actor()
			actor.x = i * actorWidth
			actor.y = config['height'] - 8 * actorHeight - 8
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
			g_enemyTable[i] = new Array(playerHeight)
			
			for(var j = 0; j < g_enemyTable[i].length; ++j)
			{
				var actor = new Actor()
				actor.x = i * actorWidth
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

			actor.x = (g_currentBlock[idx].x + g_currentBlockX)* actorWidth
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
		var delList = new Array()
		for(var idx in g_actorList)
		{
			g_actorList[idx].Update()

			if(g_actorList[idx].state == 0)
				continue;

			if((g_actorList[idx].x == g_actorList[idx].renderX) &&
				(g_actorList[idx].y == g_actorList[idx].renderY))
			{
				if(g_actorList[idx].state == 1)
					if(g_actorList[idx].type == 3)
						g_playerHP--
					else
						g_playerScore++

				if(g_actorList[idx].state == 2)
						g_enemyScore++

				if(g_actorList[idx].state == 3)
						g_enemyHP--

				delList.push(g_actorList[idx])
			}
		}

		for(var idx in delList)
			this.RemoveActorFromArray( g_actorList, delList[idx])

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
			actor.x = i * actorWidth
			actor.y = actorHeight
			actor.renderX = actor.x
			actor.renderY = actor.y
			actor.type = randomRange(0, 2)

			g_enemyTable[i][0] = actor
			g_actorList.push( actor )
		}

		if(KeyManager.IsKeyPress(KeyManager.arrowLeft) && g_currentBlockX > 0)
			g_currentBlockX--

		if(KeyManager.IsKeyPress(KeyManager.arrowRight) && (g_currentBlockX + g_currentBlockWidth) <= stageWidth - 1 )
			g_currentBlockX++


		for(var idx in g_currentBlock)
		{
			var actor = g_currentBlock[idx].actor
			actor.x = (g_currentBlock[idx].x + g_currentBlockX)* actorWidth
			actor.y = g_currentBlock[idx].y * actorHeight + playerTop + playerHeight * actorHeight
		}

		if(KeyManager.IsKeyPress(KeyManager.z))
		{
			var i
			var lastActor = g_midLinePlayerActorList[g_midLinePlayerActorList.length-1]

			for(i = g_midLinePlayerActorList.length -1; i >= 0; --i)
				g_midLinePlayerActorList[i] = g_midLinePlayerActorList[i-1]

			g_midLinePlayerActorList[0] = lastActor

			for(i = 0; i < g_midLinePlayerActorList.length; ++i)
				if(g_midLinePlayerActorList[i])
					g_midLinePlayerActorList[i].x = i * actorWidth

			if(g_midLinePlayerActorList[0])
				g_midLinePlayerActorList[0].renderX = g_midLinePlayerActorList[0].x - actorWidth
		}

		if(KeyManager.IsKeyPress(KeyManager.space))
		{
			for(var idx in g_currentBlock)
			{
				var blockX = g_currentBlock[idx].x + g_currentBlockX
				var blockY = g_currentBlock[idx].y
				var blockType = g_currentBlock[idx].actor.type

				var line = g_actorTable[blockX]

				if(line[0] == null && g_midLinePlayerActorList[blockX].type == 3)
				{
					actor = new Actor()
					actor.x = blockX * actorWidth
					actor.y = config['height'] - 8 * actorHeight - 8
					actor.type = blockType
					actor.renderX = blockX * actorWidth
					actor.renderY = playerTop + (playerHeight + blockY) * actorHeight
					g_actorList.push(actor)

					this.RemoveActorFromArray(g_actorList, g_midLinePlayerActorList[blockX])

					g_midLinePlayerActorList[blockX] = actor

					this.RefreshCurrentBlock()

					continue;
				}

				var popedActor
				var i

				for(i = 0; i < line.length; ++i)
				{
					if(line[i] != null)
						continue;

					line[i] = new Actor()
					line[i].x = blockX * actorWidth
					line[i].y = playerTop + i * actorHeight
					line[i].type = blockType
					line[i].renderX = blockX * actorWidth
					line[i].renderY = playerTop + (playerHeight + blockY) * actorHeight
					g_actorList.push(line[i])
					this.RefreshCurrentBlock()
					break;
				}

				if(i != line.length)
					continue;

				for(i = line.length - 1; i >= 0; --i)
				{
					if(line[i] == null)
						continue;

					popedActor = line[0]
					popedActor.y = config['height'] - 8 * actorHeight - 8

					if(g_midLinePlayerActorList[blockX])
						this.RemoveActorFromArray(g_actorList, g_midLinePlayerActorList[blockX])

					g_midLinePlayerActorList[blockX]  = popedActor

					var j

					for(j = 0; j < i ; ++j)
					{
						line[j] = line[j + 1]
						line[j].y -= actorHeight
					}

					line[j] = new Actor()
					line[j].x = (g_currentBlock[idx].x + g_currentBlockX) * actorWidth
					line[j].y = line[j - 1].y + actorHeight
					line[j].type = blockType
					line[j].renderX = line[j].x
					line[j].renderY = line[j].y + actorHeight
					g_actorList.push(line[j])
					this.RefreshCurrentBlock()
					break;
				}
			}
		}

		if( (Renderer.currentTime - g_midLineTimer) > g_roundMaxSec )
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
		Renderer.ImgBlt( 0, 0, g_image,
						320,
						0,
						320,
						480)


		for(var idx in g_actorList)
			g_actorList[idx].Render()

		Renderer.SetColor('rgba(255, 255, 255, 1)')
		Renderer.Rect(0, 32 * 7 - 15, config['width'], 5)
		Renderer.SetColor('rgba(255, 0, 0, 1)')
		Renderer.Rect(0, 32 * 7 - 15 + 1, (Renderer.currentTime - g_midLineTimer) / g_roundMaxSec *  config['width'], 3)

		Renderer.SetColor('rgba(0, 0, 0, 1)')
		Renderer.Text(0, 0, "enemy score : " + g_enemyScore)
		Renderer.Text(config['width'] - 120, 0, "enemy hp : " + g_enemyHP)

		Renderer.Text(config['width'] - 120, config['height'] - 20, "player hp : " + g_playerHP)
		Renderer.Text(0, config['height'] - 20, "player score : " + g_playerScore)
		
	}
};
