var SceneIngame = function()
{
	var g_board;
	
	var boardWidth = 10;
	var boardHeight = 10;
	var tileWidthPX = 24;
	var tileHeightPX = 24;

	var selectedTile = 0;
	var selectedTile2nd = 0;

	var lastCheckDate = 0;
	var needGravitation = false;
	
	this.getTile = function( _board, x, y )
	{
		if( x < 0 )
			return 0;
			
		if( y < 0 )
			return 0;

		if( x >= boardWidth)
			return 0;
		
		if( y >= boardHeight)
			return 0;
			
		return _board[ y * boardWidth + x];
	}
	this.setTile = function( _board, x, y, tile )
	{
		x = Number(x);
		y = Number(y);
		var idx = y * boardWidth + x;

		if( x < 0 )
			return 0;
			
		if( y < 0 )
			return 0;

		if( x >= boardWidth)
			return 0;
		
		if( y >= boardHeight)
			return 0;

		return _board[idx] = tile;
	}	
	this.getPos = function( idx )
	{
		return { x : idx % boardWidth, 
				y :	Math.floor(idx / boardHeight) };
	}

	this.check = function( _board, checkTileIDX )
	{
		var x = this.getPos( checkTileIDX ).x;
		var y = this.getPos( checkTileIDX ).y;
		var result = false;
		var count = 0;
		var tile = _board[checkTileIDX];

		if(tile > 5)
			return false;

		while( x < boardWidth )
		{
			if( tile == this.getTile( _board, x, y ) )
				++count;
			else
				break;

			++x;
		}

		x = this.getPos( checkTileIDX ).x;

		if(count >= 3)
		{
			for(var i = 0; i < count; ++i)
				this.setTile(_board, x + i, y, tile + 5);
			result = true;
		}

		count = 0;

		while( y < boardHeight )
		{
			if( tile == this.getTile( _board, x, y ) )
				++count;
			else
				break;

			++y;
		}

		y = this.getPos( checkTileIDX ).y;

		if(count >= 3)
		{
			for(var i = 0; i < count; ++i)
				this.setTile( _board, x, y+ i, tile + 5);
			result = true;
		}

		return result;
	}

	this.Start = function()
	{
		g_board = new Array( boardHeight * boardWidth );
		selectedTile = g_board.length;
		for( var i = 0; i < g_board.length; ++i)
			g_board[i] = randomRange(1, 5);

		var isChanged = false;
		//check

		while(1)
		{
			for( var i = 0; i < g_board.length; ++i)
				isChanged |= this.check(g_board, i);

			if(isChanged == false)
				break;

			isChanged = false;
			
			for( var i = 0; i < g_board.length; ++i)
				if(g_board[i] > 5) g_board[i] = randomRange(1, 5);
		}
	}
	
	this.End = function()
	{
	}

	this.refreshBoard = function()
	{
		for( var i = 0; i < boardWidth; ++i)
		{
			for( var j = boardHeight-1; j > -1; --j) //첫줄 pass
			{
				while( this.getTile(g_board, i,j) == 0 )
				{
					for( var k = j; k > -1; --k) //첫줄 pass
					{
						var tile = this.getTile(g_board,i,k-1);
						this.setTile(g_board, i,k, tile );
					}
					this.setTile(g_board, i,0, randomRange(1, 5) );
					break;
				}
			}
		}
	}
	
	this.Update = function()
	{
		if(needGravitation)
		{
			if(g_cachedTime.getTime() - lastCheckDate < 1000)
				return;

			needGravitation = false;
			for(var i = 0; i < g_board.length; ++i)
				if( g_board[i] > 5 )
					g_board[i] = 0;
			this.refreshBoard();
			
			var boardClone = new Array();
			
			for( var i = 0; i < g_board.length; ++i)
				boardClone[i] = g_board[i];
			
			for( var i = 0; i < g_board.length; ++i)
				isChanged |= this.check(g_board, i);

			if( isChanged)
			{
				lastCheckDate = g_cachedTime.getTime();
				needGravitation = true;
				return;
			}
		}

		if(MouseManager.Clicked == false)
			return;
			
		var selectedTileIndex = Math.floor( MouseManager.x / tileWidthPX ) + 
							Math.floor( MouseManager.y / tileHeightPX ) * boardWidth;
							
		if( (MouseManager.x < 0) ||
			(MouseManager.x >= boardWidth * tileWidthPX) ||
			(MouseManager.y < 0) ||
			(MouseManager.y >= boardHeight * tileHeightPX) )
		{
			trace( (MouseManager.x < 0) + ","+ (MouseManager.x >= boardWidth * tileWidthPX)  + ","+ (MouseManager.y < 0)  + "," + (MouseManager.y >= boardHeight * tileHeightPX) );
			selectedTile = g_board.length;
			selectedTile2nd = g_board.length;
			return;
		}

		if(selectedTile == g_board.length)
		{
			selectedTile = selectedTileIndex;
			return;
		}
		
		var selectedTile2 = selectedTileIndex;
		var temp = g_board[selectedTile];
		g_board[selectedTile] = g_board[selectedTile2];
		g_board[selectedTile2] = temp;
		
		var isChanged = false;
		//check
		
		var boardClone = new Array();
		
		for(var i = 0; i < g_board.lneght;++i)
			boardClone[i] = g_board[i];

		for( var i = 0; i < g_board.length; ++i)
			isChanged |= this.check(boardClone, i);

		if( isChanged == false)
		{
			temp = g_board[selectedTile];
			g_board[selectedTile] = g_board[selectedTile2];
			g_board[selectedTile2] = temp;
			
			selectedTile = g_board.length;
			selectedTile2nd = g_board.length;
			
			return;
		}
		
		selectedTile = g_board.length;
		selectedTile2nd = g_board.length;
		lastCheckDate = g_cachedTime.getTime();
		needGravitation = true;
	}
	
	this.setTileRenderColor = function(tile)
	{
		switch(tile)
		{
			case 1:
				Renderer.SetColor("#ff0000");
				break;
			case 2:
				Renderer.SetColor("#00ff00");
				break;
			case 3:
				Renderer.SetColor("#0000ff");
				break;
			case 4:
				Renderer.SetColor("#ff00ff");
				break;
			case 5:
				Renderer.SetColor("#ffff00");
				break;

			case 6:
				Renderer.SetColor("#880000");
				break;
			case 7:
				Renderer.SetColor("#008800");
				break;
			case 8:
				Renderer.SetColor("#000088");
				break;
			case 9:
				Renderer.SetColor("#880088");
				break;
			case 10:
				Renderer.SetColor("#888800");
				break;

			case 0:
			default:
				Renderer.SetColor("#000000");
				break;
		}
	}

	this.Render = function()
	{
		Renderer.Rect( boardWidth * tileWidthPX, 0, 1, boardHeight * tileHeightPX);
		
		Renderer.Text(0, tileWidthPX * boardWidth, "123123");

		for( var x = 0; x < boardWidth; ++x)
		for( var y = 0; y < boardHeight; ++y)
		{
			var tile = this.getTile(g_board, x, y);
			this.setTileRenderColor(tile);

			Renderer.Rect( tileWidthPX * x, 
							tileHeightPX * y, 
							tileWidthPX, tileHeightPX);
		}

		if( selectedTile == g_board.length )
			return;

		Renderer.SetColor("#ffffff");

		Renderer.Rect( tileWidthPX * (selectedTile % boardWidth), 
						tileHeightPX * Math.floor(selectedTile / boardHeight), 
						tileWidthPX, tileHeightPX);

	}
};