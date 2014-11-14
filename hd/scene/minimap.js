var Minimap = function(image)
{
	this.x = 270
	this.y = 10
	this.width = 200
	this.height = 50

	this.Render = function(actorList)
	{
		Renderer.SetColor('rgba(0, 0, 0, 0.5)');
		Renderer.Rect(this.x, this.y, this.width, this.height)

		for(var i in actorList)
		{
			var actor = actorList[i]

			if(actor instanceof John)
			{
				Renderer.SetColor('rgba(0, 255, 0, 1)');
				Renderer.Rect( this.x + (actor.x + (actor.colliX + actor.colliWidth) / 2) / mapWidth * this.width - 1, 
								this.y + this.height - 10 - 2, 3, 3)	

				continue
			}

			if(actor instanceof Spawn)
			{
				Renderer.SetColor('rgba(0, 0, 255, 1)');
				Renderer.Rect( this.x + (actor.x + (actor.colliX + actor.colliWidth) / 2) / mapWidth * this.width - 1, 
								this.y + this.height - 20 - 2, 3, 13)

				continue
			}

			if(actor instanceof EnemyBase)
			{
				Renderer.SetColor('rgba(255, 0, 0, 1)');
				Renderer.Rect( this.x + (actor.x + (actor.colliX + actor.colliWidth) / 2) / mapWidth * this.width - 1, 
								this.y + this.height - 30 - 2, 3, 23)

				continue
			}


			Renderer.SetColor('rgba(255, 0, 0, 1)');
			Renderer.Rect( this.x + actor.x/ mapWidth * this.width, this.y + this.height - 10, 1, 1)
		}

		Renderer.SetColor('rgba(255, 255, 255, 1)');


	}
};