var tileSize = 16;

var Map = function()
{
	this.data = new Array();
	this.screenX = 8;
	this.screenY = 8;
	this.width = 0;
	this.height = 0;
	this.screenWidth = tileSize * 20;
	this.screenHeight = tileSize * 20;
	this.mapData;
	this.tileImg = new Array();

	this.tileImg.push(ImageManager.Register( "./img/tile.png", "tile1" ));

	this.Load = function(map)
	{
		this.mapData = map;
		this.width = map.layers[0].width;
		this.height = map.layers[0].height;
		this.data = map.layers[0].data;
		this.tilesets = map.tilesets;
		
		trace("map load complete this.width(" + this.width + ") this.height(" + this.width + ")" );
		
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
					var tile = this.mapData.layers[layerIDX].data[ tileIDX ] - 1;
	
					if( tile < 0 )
						continue;
						
					Renderer.Img( this.screenX + renderX, this.screenY + renderY, 
									this.tileImg[0], tileSize, tileSize, tile );
							
					
/*
					for( var i = this.tileImg.length; i > -1; --i)
					{
					//						if(tile >= this.tilesets[i].firstgid)
						{
							Renderer.Img( this.screenX + renderX, this.screenY + renderY, 
											this.tileImg[i], tileSize, tileSize,
											tile - this.tilesets[i].firstgid);
							break;
						}
					}
*/											
				}
			}
			++xIDX;
		}
	}

	this.IsThereBlock = function( actorX, actorY )
	{
		if(this.mapData.layers.length < 2)
			return;
			
		if((actorX / tileSize) < 0)
			return true;

		if((actorY / tileSize) < 0)
			return true;

		if((actorY / tileSize) >= this.width)
			return true;

		if((actorY / tileSize) >= this.height)
			return true;

			actorX = Math.floor( actorX / tileSize);
		actorY = Math.floor( actorY / tileSize);

		var tileIDX = actorY * this.width + actorX;

		return this.mapData.layers[1].data[ tileIDX ] != 0;
	}
				
}

var MapInst = new Map();