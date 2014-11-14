var Orc = function(image, name)
{
	this.image = image;
	this.x = 0;
	this.y = 0;
	this.imgWidth = 32;
	this.imgHeight  = 32;
	this.name = name;
	this.moveX = 10;
	this.moveY = 10;
	this.dir = 1;
	this.speed = 2;
	
	this.colliX = 0;
	this.colliWidth = 32;
	this.colliY = 0;
	this.colliHeight = 32;
	
	this.seen = false;
	//this.lastHit =  Renderer.currentTime;
	this.lastHit = 0;
	
	this.level = 1;
	this.attackSpeed = 1.0;
	this.hp = 25;
	this.dropCnt = randomRange(1, 5);;
	this.itemDropProb = 5;
	this.lastActTime = 0

	this.collisionAble = true	
	
	this.Damage = function(damage)
	{
		this.hp = this.hp - damage;
		
		if(this.hp < 0)
			this.hp = 0;
	}
	
	this.IsDead = function()
	{
		if(this.hp <= 0)
			return true;
			
		return false;
	}

	this.Render = function()
	{
		if(this.dir == 0)
			Renderer.ImgFlipH( this.x - g_cameraX,
					 this.y - g_cameraY,
					this.image,
					this.imgWidth,
					this.imgHeight,
					2)
		else
			Renderer.Img( this.x - g_cameraX,
					 this.y - g_cameraY,
					this.image,
					this.imgWidth,
					this.imgHeight,
					2)
	}

	this.isFall = function(blockList, dir)
	{
		var thisLeft = this.x + dir * this.imgWidth + this.colliX;
		var thisRight = thisLeft + this.colliWidth;
		var thisTop = this.y + 5 + this.colliY;
		var thisBottom = thisTop + this.colliHeight;


		for(var i = 0; i < blockList.length; ++i)
		{
			var actorLeft = blockList[i].x + blockList[i].colliX;
			var actorRight = actorLeft + blockList[i].colliWidth;
			var actorTop = blockList[i].y + blockList[i].colliY;
			var actorBottom = actorTop + blockList[i].colliHeight;

			if( !(	(thisTop > actorBottom) ||
					(thisBottom < actorTop) ||
					(thisLeft > actorRight) || 
					(thisRight < actorLeft)) )
				return true;
		}

		return false;
	}

	this.Update = function(actorList, blockList)
	{
		if(Renderer.currentTime - this.lastActTime < 1000 )
			return

		for(var i in actorList)
		{
			var actor = actorList[i]

			if(actor instanceof John)
			{
				if(Renderer.currentTime - this.lastHit < this.attackSpeed * 1000)
					continue

				if(john.CollisionCheck(this) == false)
					continue

				this.lastHit = Renderer.currentTime;
				this.lastActTime = Renderer.currentTime;
				
				if(Renderer.currentTime - this.lastHit < this.attackSpeed * 1000 * 2)	// Note : 만나자마자 패는 경우가 없도록 하기 위함
					john.Damage(10);

				return
			}

			if(actor instanceof Spawn)
			{
				if(actor.isSealed == false)
					continue

				if(actor.CollisionCheck(this) == false)
					continue

				if(Renderer.currentTime - this.lastHit < this.attackSpeed * 1000)
					return

				this.lastHit = Renderer.currentTime;
				this.lastActTime = Renderer.currentTime;
				
				if(Renderer.currentTime - this.lastHit < this.attackSpeed * 1000 * 2)	// Note : 만나자마자 패는 경우가 없도록 하기 위함
					actor.Damage(10)
				
				return
			}

			if(actor instanceof EnemyBase)
				continue

			if(actor instanceof JohnBase)
			{
				if( actor.CollisionCheck(this) == false)
					continue

				if( Renderer.currentTime - this.lastHit < this.attackSpeed * 1000)
					return

				this.lastHit = Renderer.currentTime;
				this.lastActTime = Renderer.currentTime;
				
				if(  Renderer.currentTime - this.lastHit < this.attackSpeed * 1000 * 2)	// Note : 만나자마자 패는 경우가 없도록 하기 위함
					actor.Damage(10)
				
				return
			}


		}

		this.x -= this.speed;		

	}	
};