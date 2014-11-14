var Spawn = function(image)
{
	this.image = image
	this.x = 0
	this.y = 0

	this.hp = 100
	this.maxHp = 100

	this.imgX = 128
	this.imgY = 0
	this.imgWidth = 32
	this.imgHeight = 32
	
	this.imgSealX = 32
	this.imgSealY = 64
	this.imgSealWidth = 32
	this.imgSealHeight  = 32 * 2

	this.imgSealHelpX = 64
	this.imgSealHelpY = 32
	this.imgSealHelpWidth = 32 * 2
	this.imgSealHelpHeight  = 32 * 2

	this.isSealed = true

	this.colliX = 0;
	this.colliWidth = 32;
	this.colliY = 0;
	this.colliHeight = 32;

	this.collisionAble = false

	this.lastSpawnTime = 0
	this.spawnCoolDown = 3000
	this.level = 0
	this.spawnCount = 0
	this.sealingTerm = 1000 / 20

	this.CollisionCheck = function( actor )
	{
		if(actor == this)
			return false;

		if(actor.collisionAble == false)
			return false

		var thisLeft = this.x + this.colliX;
		var thisRight = thisLeft + this.colliWidth;
		var thisTop = this.y + this.colliY;
		var thisBottom = thisTop + this.colliHeight;
		
		var actorLeft = actor.x + actor.colliX;
		var actorRight = actorLeft + actor.colliWidth;
		var actorTop = actor.y + actor.colliY;
		var actorBottom = actorTop + actor.colliHeight;

		if( !(	(thisTop > actorBottom) ||
				(thisBottom < actorTop) ||
				(thisLeft > actorRight) || 
				(thisRight < actorLeft)) )
			return true;
			
		return false;
	}
	

	this.Damage = function(damage)
	{
		this.hp = this.hp - damage
		if(this.hp <= 0)
			this.isSealed = false

		this.lastSpawnTime = Renderer.currentTime

		return
	}
	
	this.IsDead = function()
	{
		return false;
	}	

	this.Update = function(actorList)
	{
		if(this.isSealed == true)
			return

		if(Renderer.currentTime - this.lastSpawnTime < this.spawnCoolDown )
			return

		this.lastSpawnTime = Renderer.currentTime

		if(this.spawnCount % 3 == 0 && this.spawnCount != 0)
			actor = new CharOrc(this.image, "charorc")
		else
			actor = new Orc(this.image, "orc")
		actor.x = this.x
		actor.y = this.y
		actorList.push(actor)

		this.spawnCount++
	}

	this.Render = function()
	{
		Renderer.ImgBlt( this.x - g_cameraX,
						this.y - g_cameraY + 8,
						this.image,
						this.imgX,
						this.imgY,
						this.imgWidth,
						this.imgHeight)

		if(this.isSealed == false)
		{
			if(currentStage >= 2)
			{
				Renderer.ImgBlt( this.x - g_cameraX + 32,
								this.y - g_cameraY - 64,
								this.image,
								this.imgSealHelpX,
								this.imgSealHelpY,
								this.imgSealHelpWidth,
								this.imgSealHelpHeight)
			}


			return
		}

		Renderer.ImgBlt( this.x - g_cameraX,
						this.y - g_cameraY - 32,
						this.image,
						this.imgSealX,
						this.imgSealY,
						this.imgSealWidth,
						this.imgSealHeight)


		var gaugeWidth = 32
		var gaugeHeight = 5
		Renderer.SetColor('rgba(255, 255, 0, 1)');
		Renderer.Rect(this.x - g_cameraX, this.y - g_cameraY - 32, gaugeWidth, gaugeHeight)
		Renderer.SetColor('rgba(255, 0, 0, 1)');
		Renderer.Rect(this.x - g_cameraX, this.y  - g_cameraY + 1 - 32, (this.hp / this.maxHp) * gaugeWidth, gaugeHeight - 2)
	}
};