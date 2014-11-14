var tileSize = 32;

var Map = function()
{
	this.data = new Array();
	this.width = 0;
	this.height = 0;
	this.screenWidth = config["width"];
	this.screenHeight = config["height"];
	this.mapData;
	this.tileImg = new Array();

	this.tileImg[0] = ImageManager.Register( "./img/TileA1.png", "tile1" );
	this.tileImg[1] = ImageManager.Register( "./img/TileA2.png", "tile2" );
	this.tileImg[2] = ImageManager.Register( "./img/TileA3.png", "tile3" );
	this.tileImg[3] = ImageManager.Register( "./img/TileA4.png", "tile4" );
	this.tileImg[4] = ImageManager.Register( "./img/TileA5.png", "tile5" );

	this.Load = function(map)
	{
		this.mapData = map;
		this.width = map.layers[0].width;
		this.height = map.layers[0].width;
		this.data = map.layers[0].data;
		this.tilesets = map.tilesets;
	}

	this.Render = function()
	{
		var xIDX = CameraInst.x;
		var yIDXSrc = CameraInst.y;
//		var xRight = CameraInst.x + CameraInst.width * 2;
//		var yBottom = CameraInst.y + CameraInst.height * 2; 

//		trace(tileIDX + ","+ xIDX + ","+yIDX);
//		trace(xIDX + ","+yIDX+","+xRight+","+yBottom);

//		xRight = Math.floor( (xIDX + xRight) / tileSize);
//		yBottom = Math.floor( (yIDXSrc + yBottom) / tileSize);

		xIDX = Math.floor(xIDX / tileSize);
		yIDXSrc = Math.floor(yIDXSrc / tileSize);
//		trace(xIDX + ","+yIDX+","+xRight+","+yBottom);

		for( var renderX = 0; renderX < this.screenWidth; renderX += tileSize )
		{
			if(xIDX < 0)
			{
				++xIDX;
				continue;
			}
			if(xIDX >= this.width)
				continue;

			var yIDX = yIDXSrc;
			
			for( var renderY = 0; renderY < this.screenHeight; renderY += tileSize )
			{
				++yIDX;
	

				if(yIDX < 0)
					continue;

				if(yIDX >= this.height)
					continue;

				var tileIDX = yIDX * this.width + xIDX;

				if(tileIDX < 0)
					continue;

				if(tileIDX >= this.data.length )
					return;

				for( var layerIDX = 0; layerIDX < this.mapData.layers.length; ++layerIDX)
				{
					var tile = this.mapData.layers[layerIDX].data[ tileIDX ];
	
					if( tile == 0 )
						continue;
	
					for( var i = 4; i > -1; --i)
					{
						if(tile >= this.tilesets[i].firstgid)
						{
							Renderer.Img( renderX, renderY, 
											this.tileImg[i], tileSize, tileSize,
											tile - this.tilesets[i].firstgid);
							break;
						}
					}
				}
			}
			++xIDX;
		}
	}

	this.IsThereBlock = function( actorX, actorY )
	{
		if(this.mapData.layers.length < 2)
			return;

		actorX = Math.floor( actorX / tileSize);
		actorY = Math.floor( actorY / tileSize);

		var tileIDX = actorY * this.width + actorX;

		return this.mapData.layers[1].data[ tileIDX ] != 0;
	}
				
}

var MapInst = new Map();