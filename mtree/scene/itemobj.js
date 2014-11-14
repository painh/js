var ItemObj = function()
{
	this.isDead = true;
}

ItemObj.prototype.Init = function( img, x, y, type)
 {
	this.x = x;
	this.y = y;
	this.image = img;
	this.xForce = randomRange(0, 10) - 5;
	this.bornTime = Renderer.currentTime;
	
	this.jumpState = 1;
	this.jumpPowerMax = randomRange(10, 20);
	this.jumpPower = this.jumpPowerMax;

	this.colliX = 0;
	this.colliY = 0;
	this.colliWidth = 32;
	this.colliHeight = 32;
	
	this.type = type;
	
	this.isDead = false;
}

ItemObj.prototype.IsEatable = function()
{
	return Renderer.currentTime -  this.bornTime > 200;
}

ItemObj.prototype.IsDead = function()
{
	return this.isDead;
}

ItemObj.prototype.Eat = function()
{
	this.isDead = true;
}

ItemObj.prototype.Update = function()
{
	if(this.IsDead())
		return;
		
	if(this.jumpState == 0)
		return;
	
	this.x += this.xForce;
	
	if(this.jumpState == 1)
	{
		this.y = this.y - this.jumpPower;
		
		this.jumpPower--;
		if(this.jumpPower <= 0)
		{
			this.jumpState = 2;
//			this.jumpPower = this.jumpPowerMax;
		}
		
		return;
	}
	
	if(this.jumpState == 2)
	{
		this.jumpPower++;

		this.y = this.y + this.jumpPower;
		
		if(this.jumpPower >= this.jumpPowerMax )
		{
			this.jumpState = 0;
			this.jumpPower = 0;
		}
		return;
	}		
}

ItemObj.prototype.Render = function()
{
	if(this.IsDead())
		return;
		
	Renderer.Img( this.x - 16 - g_cameraX,
					 this.y - 32 - g_cameraY,
					this.image);
}