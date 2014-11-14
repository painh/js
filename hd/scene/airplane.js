var AirPlane = function()
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

	this.Update = function(actorList, blockList)
	{
		this.x += this.mo

	}	
};