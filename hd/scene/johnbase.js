var JohnBase = function(image)
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

	this.colliX = 0;
	this.colliWidth = 32 * 4
	this.colliY = 0;
	this.colliHeight = 32 * 4

	this.collisionAble = false

	this.lastSpawnTime = 0
	this.spawnCoolDown = 3000

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

		if(this.hp < 0)
			this.hp = 0

		this.lastSpawnTime = Renderer.currentTime

		return
	}
	
	this.IsDead = function()
	{
		return false;
	}	

	this.Update = function(actorList)
	{
	}

	this.Render = function()
	{
		Renderer.ImgBlt( this.x - g_cameraX,
						this.y - g_cameraY + 8 * 4,
						this.image,
						this.imgX,
						this.imgY,
						this.imgWidth,
						this.imgHeight,
						this.imgWidth * 4,
						this.imgHeight * 4)

		Renderer.ImgBlt( this.x - g_cameraX,
						this.y - g_cameraY - 32 * 4,
						this.image,
						this.imgSealX,
						this.imgSealY,
						this.imgSealWidth,
						this.imgSealHeight,
						this.imgSealWidth * 4,
						this.imgSealHeight * 4)
	}
};