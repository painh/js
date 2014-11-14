var EnemyBase = function(image)
{
	this.image = image
	this.x = 0
	this.y = 0

	this.hp = 300
	this.maxHp = this.hp

	this.imgX = 192
	this.imgY = 64
	this.imgWidth = 64
	this.imgHeight = 64
	
	this.colliX = 64
	this.colliWidth = 32
	this.colliY = 16
	this.colliHeight = 128

	this.collisionAble = true

	this.lastSpawnTime = 0
	this.spawnCoolDown = 3000

	this.lastAttackTime = Renderer.currentTime
	this.sealedCnt = 0

	this.CollisionCheck = function( actor )
	{
		if(actor == this)
			return false

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
			return true
			
		return false;
	}
	

	this.Damage = function(damage)
	{
		this.hp = this.hp - damage
		
		if(this.hp < 0)
			this.hp = 0

		return
	}
	
	this.IsDead = function()
	{
		return false;
	}	

	this.Update = function(actorList)
	{
		if(currentStage < 3)
			return

		if(Renderer.currentTime - this.lastAttackTime < 2000)
			return

		var johnCenterX = (john.x + john.colliX + john.colliWidth) / 2
		var johnCenterY = (john.y + john.colliX + john.colliHeight) / 2

		var actorCenterX = (this.x + this.colliX + this.colliWidth) / 2
		var actorCenterY = (this.y + this.colliX + this.colliHeight) / 2

		var deltaX = actorCenterX - johnCenterX
		var deltaY = actorCenterY - johnCenterY
		var distance = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY))

		if(distance > 40)
			return

		this.notSealedCnt = 0

		for(var i in actorList)
		{
			var actor = actorList[i]

			if(!(actor instanceof Spawn))
				continue

			if(actor.isSealed == true)
				continue

			++this.notSealedCnt

			john.Damage(30)
		}

		if(this.notSealedCnt == 0)
			return

		this.lastAttackTime = Renderer.currentTime

		SoundManager.Play("laser");
	}

	this.Render = function()
	{
		Renderer.ImgBlt(this.x - g_cameraX,
						this.y - g_cameraY - 32 * 4,
						this.image,
						this.imgX,
						this.imgY,
						this.imgWidth,
						this.imgHeight,
						this.imgWidth * 4,
						this.imgHeight * 4)

		Renderer.SetColor('rgba(255, 0, 0, 1)')
		Renderer.SetAlpha( 1.0 - (Renderer.currentTime - this.lastAttackTime) / 2000 )

		for(var i = 0; i < this.notSealedCnt; ++i)
			Renderer.Rect(this.x - g_cameraX + this.colliX - (i + 1) * 15, 0, 1, config["height"])

		Renderer.SetAlpha(1.0)

	}
};