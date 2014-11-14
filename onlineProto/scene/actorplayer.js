var BlockActor = new Actor( null, 0, "block");

var ActorPlayer = function(image, idx)
{
    Actor.apply(this, arguments);
}

ActorPlayer.prototype = new Actor();
ActorPlayer.prototype.constructor  = ActorPlayer;
	
ActorPlayer.prototype.Update = function()
{
	Actor.prototype.Update.call(this);
	if(KeyManager.IsKeyDown(KeyManager.arrowLeft))
		this.MoveLeft();
			
	if(KeyManager.IsKeyDown(KeyManager.arrowRight))
		this.MoveRight();
			
	if(KeyManager.IsKeyDown(KeyManager.arrowUp))
		this.MoveUp();

	if(KeyManager.IsKeyDown(KeyManager.arrowDown))
		this.MoveDown();
}

ActorPlayer.prototype.collisionCheck = function()
{
	if( MapInst.IsThereBlock( this.x, this.y ) )
		return BlockActor;

	for( var i = 0; i < actorList.length; ++i)
	{
		if( actorList[i].x ==  this.x &&
			actorList[i].y ==  this.y &&
			actorList[i].name !=  this.name )
		{
			return actorList[i];
		}
	}

	return null;
}

ActorPlayer.prototype.MoveLeft = function()
{
	var thisX = this.x;
	var thisY = this.y;

	this.x -= moveX;

	var actor = this.collisionCheck();

	if(actor != null)
	{
		this.x = thisX;
		this.y = thisY;		
		return;
	}

	NetMgr.Send( { pid : "Pos", actorID : this.actorID, x : this.x, y : this.y});
		
	this.x = thisX;
	this.y = thisY;		
}

ActorPlayer.prototype.MoveRight = function()
{
	var thisX = this.x;
	var thisY = this.y;

	this.x += moveX;

	var actor = this.collisionCheck();
	
	if(actor != null)
	{
		this.x = thisX;
		this.y = thisY;		
		return;
	}
		
	NetMgr.Send( { pid : "Pos", actorID : this.actorID, x : this.x, y : this.y});
		
	this.x = thisX;
	this.y = thisY;		
}

ActorPlayer.prototype.MoveUp = function()
{
	var thisX = this.x;
	var thisY = this.y;

	this.y -= moveY;

	var actor = this.collisionCheck();

	if(actor != null)
	{
		this.x = thisX;
		this.y = thisY;		
		return;
	}
		
	NetMgr.Send( { pid : "Pos", actorID : this.actorID, x : this.x, y : this.y});
		
	this.x = thisX;
	this.y = thisY;		
}

ActorPlayer.prototype.MoveDown = function()
{
	var thisX = this.x;
	var thisY = this.y;

	this.y += moveY;

	var actor = this.collisionCheck();

	if(actor != null)
	{
		this.x = thisX;
		this.y = thisY;		
		return;
	}

	NetMgr.Send( { pid : "Pos", actorID : this.actorID, x : this.x, y : this.y});
		
	this.x = thisX;
	this.y = thisY;		

}