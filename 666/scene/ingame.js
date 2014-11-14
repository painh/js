TILE_SIZE = 24
TILE_TYPE_MAX_NUM = 7
STAGE_WIDTH = 10
STAGE_HEIGHT = 10

var Tile = function(x, y, type)
{
	this.x = x
	this.y = y
	this.type = type
	
	this.Render = function()
	{
		switch(this.type)
		{
			case 0:
				Renderer.SetColor("#ff0000")
				break
				
			case 1:
				Renderer.SetColor("#00ff00")
				break
				
			case 2:
				Renderer.SetColor("#0000ff")
				break
				
			case 3:
				Renderer.SetColor("#ffff00")
				break
				
			case 4:
				Renderer.SetColor("#00ffff")
				break
				
			case 5:
				Renderer.SetColor("#ff00ff")
				break


			case 6:
				Renderer.SetColor("#ffff88")
				break
				
			case 7:
				Renderer.SetColor("#88ffff")
				break
				
			case 8:
				Renderer.SetColor("#000")
				break
		}

		Renderer.Rect( this.x, 
							this.y,
							TILE_SIZE, TILE_SIZE )
	
	}
};

var SceneIngame = function()
{
	var g_board;
	var g_currentTile
	var g_prevClickTile
	var g_currClickTile
	
	
	this.Start = function()
	{
		g_board = new Array( STAGE_WIDTH )
		
		for(var i = 0; i < g_board.length; ++i)
			g_board[i] = new Array( STAGE_HEIGHT  )
			
		for(var i = 0; i < g_board.length; ++i)
			for(var j = 0; j < g_board[i].length; ++j)
				g_board[i][j] = new Tile(i * TILE_SIZE, j * TILE_SIZE, randomRange(0,TILE_TYPE_MAX_NUM))
				
		g_currentTile = new Tile( 250, 24, randomRange(0,TILE_TYPE_MAX_NUM))
	}
	
	this.End = function()
	{
	}

	this.Update = function()
	{
		if(MouseManager.Clicked == false)
			return;
			
		var x = Math.floor(MouseManager.x / TILE_SIZE)
		var y = Math.floor(MouseManager.y / TILE_SIZE )
		
		if(x < 0 || x >= TILE_SIZE * STAGE_WIDTH)
			return
		
		if(y < 0 || y >= TILE_SIZE * STAGE_HEIGHT)
			return
			
		trace(g_currentTile.type + "," + g_board[x][y].type)
			
		if(g_currentTile.type != g_board[x][y].type)
			return
			
		g_currClickTile = g_prevClickTile
		g_prevClickTile = g_board[x][y]

		for(var i = 0; i < g_board.length; ++i)
			for(var j = 0; j < g_board[i].length; ++j)
			{
				var distance = Math.sqrt( (i - x) * (i - x) + (j - y) * (j - y))
				trace(distance)
				
				if(distance <= 3)
					g_board[i][j].type = randomRange(0,TILE_TYPE_MAX_NUM)
			}
			
		g_currentTile.type = randomRange(0,TILE_TYPE_MAX_NUM)

	}
	
	this.Render = function()
	{
			for(var i = 0; i < g_board.length; ++i)
				for(var j = 0; j < g_board[i].length; ++j)
					g_board[i][j].Render()
					
			g_currentTile.Render()
			
			if(g_prevClickTile && g_currClickTile)
			{
				g_prevClickTile.Render() // set color
				Renderer.Line(g_prevClickTile.x + TILE_SIZE / 2,
								g_prevClickTile.y + TILE_SIZE / 2,
								g_currClickTile.x + TILE_SIZE / 2,
								g_currClickTile.y + TILE_SIZE / 2)
			}
	}
};