var Slime = function(image, idx, imgWidth, imgHeight, name)
{
	this.image = image;
	this.imageIDX = 0 + idx;
	this.x = 0;
	this.y = 0;
	this.imgWidth = imgWidth;
	this.imgHeight  = imgHeight;
	this.name = name;
	this.moveX = 10;
	this.moveY = 10;
	this.dir = 0;
	this.speed = randomRange(5, 7);
	
	this.colliX = -this.imgWidth/2;
	this.colliWidth = this.imgWidth;
	this.colliY = -this.imgHeight;
	this.colliHeight = this.imgHeight;
	
	this.seen = false;
	this.lastHit =  Renderer.currentTime;
	
	this.level = 1;
	this.attackSpeed = 1.0;
	this.hp = 25;
	this.dropCnt = randomRange(1, 5);;
	this.itemDropProb = 5;
	
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
		Renderer.Img( this.x - this.imgWidth / 2 - g_cameraX,
						 this.y -this.imgHeight  - g_cameraY,
						this.image,
						this.imgWidth,
						this.imgHeight,
						this.imageIDX );
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
		if(this.seen == false)
		{
			if( john.GetDistanceToJohn( this ) > 80 )
				return;
				
			g_ingame.AddText(this.x, this.y - this.imgHeight * 2, "i found!", "rgba(255, 255, 255, 1)", false);
				
			this.seen = true;
			
			return;
		}
		
		if((john.x - this.x) == 0)
			return;
			
		if( john.CollisionCheck(this) == false)
		{
			var fallCheck
			if(((john.x - this.x) / Math.abs(john.x - this.x)) < 0)
				fallCheck = this.isFall(blockList, -1)
			else
				fallCheck = this.isFall(blockList, 1)

			if(fallCheck == false)
				return

			this.x += ((john.x - this.x) / Math.abs(john.x - this.x)) * this.speed;			
			return
		}

		if( Renderer.currentTime - this.lastHit < this.attackSpeed * 1000)
			return;
			
		this.lastHit = Renderer.currentTime;
		
		if(  Renderer.currentTime - this.lastHit < this.attackSpeed * 1000 * 2)	// Note : 만나자마자 패는 경우가 없도록 하기 위함
			john.Damage(10);
	}	
};