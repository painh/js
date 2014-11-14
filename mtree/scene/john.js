var John = function(image, idx, imgWidth, imgHeight, name)
{
	this.image = image;
	this.imageIDX = 0 + idx;
	this.x = 0;
	this.y = 0;
	this.saveX = 0;
	this.saveY = 0;
	this.imgWidth = imgWidth;
	this.imgHeight  = imgHeight;
	this.name = name;
	this.lastMoveTime = Renderer.currentTime;
	this.moveX = 10;
	this.moveY = 10;
	this.dir = 0;
	this.jumpState = 0;
	this.jumpPower = 0;
	this.jumpPowerMax = 15;
	
	this.colliX = -15;
	this.colliWidth = 30;
	this.colliY = -50;
	this.colliHeight = 50;
	this.isCrash = false;
	
	this.level = 1;
	this.exp = 0;
	this.coin = 0;
		
	this.hp = 100;
	this.maxHp = 100;
	this.mp = 100;
	this.maxMp = 100;
	
	this.shieldBlock = 5;
	this.dodge = 5;
	
	this.critical = 30;
	this.phyReduce = 20;
	this.phyAPMin = 10;
	this.phyAPMax = 20;
	
	this.lastHit =  Renderer.currentTime;
	
	this.weaponX = 0;
	this.weaponY = 0;
	this.weaponWidth = 0;
	this.weaponHeight = 0;

	this.weaponHoldingTime = 100
	this.weaponCoolTime = 2000
	this.weaponSpeed = 100
	this.weaponReach = 20;
	this.weapon = "unknown";
	this.weaponDamage = 0

	
	this.dropCnt = 50;
	this.itemDropProb = 50;
	
	this.invincibleStartTime = 0;
	this.invincibleMaxSec = 2;
	this.invincibleMP = 10;
	
	this.speedUpStartTime = 0;
	this.speedUpMaxSec = 2;
	this.speedUpMP = 10;
	
	this.bombMp	= 80
	this.bombRange	= 200
	this.bombAp	= 15
	
	this.hammerMp	= 20
	this.hammerRange= 1
	this.hammerAp	= 15
	
	
	this.potionCntMax = 2;
	this.potionCnt = this.potionCntMax;

	this.isAttacking = false
	this.attackStart = 0

	this.IsDead = function()
	{
		if(this.hp <= 0)
			return true;
			
		return false;
	}	
	
	this.CollisionCheckWeapon = function(actor)
	{
		if(actor == this)
			return false;
		
		var thisLeft = this.weaponX;
		var thisRight = thisLeft + this.weaponWidth;
		var thisTop = this.weaponY;
		var thisBottom = thisTop + this.weaponHeight;
		
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
	
	
	this.CollisionCheck = function( actor )
	{
		if(actor == this)
			return false;

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
	
	this.Render = function()
	{
		Renderer.SetColor("rgba(255, 0, 0, 1)");

		var imgIDX = 0
	
		if(this.dir == 0)
			imgIDX = 1;
						
		Renderer.Img( this.x - this.imgWidth / 2 - g_cameraX,
					 this.y -this.imgHeight  - g_cameraY,
					this.image,
					this.imgWidth,
					this.imgHeight,
					imgIDX);

		if(this.isAttacking)
		{
			Renderer.Rect( this.weaponX - g_cameraX, this.weaponY - g_cameraY, this.weaponWidth, this.weaponHeight, 5);
		}

	}

	this.Attack = function()
	{
		if(this.isAttacking)
			return

		if(this.weaponCoolTime > 0)
			if(this.attackStart + this.weaponCoolTime > Renderer.currentTime)
				return

		this.isAttacking = true
		this.attackStart = Renderer.currentTime
	}
	
	this.attack = function(actorList)
	{
		if(this.weaponHoldingTime > 0)
			if(Renderer.currentTime - this.attackStart > this.weaponHoldingTime)
			{
				trace("-_-")
				this.isAttacking = false
			}

		if(this.isAttacking == false)
			return

//		if( Renderer.currentTime - this.lastHit < this.weaponSpeed * 1000)
//			return;
			
		this.lastHit = Renderer.currentTime;			

		for(var i = 0; i < actorList.length; ++i)
		{
			var actor = actorList[i];
			if( this.CollisionCheckWeapon(actor) == false )
				continue;
				
			var damage = randomRange(this.phyAPMin, this.phyAPMax);
			damage += this.weaponDamage
			
			if( Math.random() * 100 < this.critical )
			{
				SoundManager.Play("critical");
		
				damage = damage * 2;
				actor.Damage(damage);

				g_ingame.AddText(actor.x, this.y - this.imgHeight, damage, "rgba(255, 255, 0, 1)", true);
				
				return;
			}
				
			actor.Damage(damage);
			SoundManager.Play("hit");
			g_ingame.AddText(actor.x, this.y - this.imgHeight/2, damage, "rgba(255, 255, 255, 1)", false);
		}
	}
		
	this.Update = function(actorList, blockList)
	{
		if(this.IsDead())
			return;
			
		this.attack(actorList);
		
		if(this.jumpState == 0)
		{
			var fall = true
			for(var i = 0; i < blockList.length; ++i)
			{
				var landing = this.CollisionCheck(blockList[i])
				if(landing == true)
					fall = false
			}

			if(fall == true)
			{
				this.jumpPower = 0
				this.jumpState = 2
			}
		}
		else if(this.jumpState == 1)
		{
			this.y = this.y - this.jumpPower;
			
			this.jumpPower--;
			if(this.jumpPower <= 0)
			{
				this.jumpState = 2;
			}
		}
		else if(this.jumpState == 2)
		{
			this.jumpPower++;
			if(this.jumpPower >= this.jumpPowerMax)
				this.jumpPower = this.jumpPowerMax

			this.y = this.y + this.jumpPower;

			for(var i = 0; i < blockList.length; ++i)
			{
				var landing = this.CollisionCheck(blockList[i])
				if(landing == true)
				{
					this.jumpState = 0;
					this.jumpPower = 0;
				}
			}
			
//			if(this.jumpPower >= this.jumpPowerMax )
//			{
//				this.jumpState = 0;
//				this.jumpPower = 0;
//			}
		}	

		if(this.dir == 0)
			this.weaponX = this.x - 16  - this.weaponReach;
		else
			this.weaponX = this.x + 16;

		//trace("this.weaponX" + this.weaponX +","+ this.weaponReach)
			
		this.weaponY = this.y - 40;
		this.weaponWidth = this.weaponReach;
		this.weaponHeight = 30;
						
	}
	
	this.checkCollision = function(actorList)
	{
		for(var i = 0; i < actorList.length; ++i)
			if( this.CollisionCheck(actorList[i]) )
				return actorList[i];
				
		return null;
	}
	
	this.GetDistanceToJohn = function( actor )
	{
		var deltaX = actor.x - this.x;
		var deltaY = actor.y - this.y;
		
		return Math.sqrt( deltaX * deltaX + deltaY + deltaY );
	}
	
	this.MoveX = function(dir, moveX, actorList, blockList)
	{
		this.dir = dir;
		
		this.prevX = this.x;
		
		if(this.IsSpeedUp())
			moveX = moveX * 2;
		
		this.x += moveX;
			
		var actor = this.checkCollision(actorList);

		if(this.jumpState == 2)
		{
			for(var i = 0; i < blockList.length; ++i)
			{
				var check = this.CollisionCheck(blockList[i])
				if(check == true)
				{
					this.x = this.prevX
					return true
				}
			}
		}


		
		if(actor == null)
		{
			isCrash = false;
			return false;
		}
		
		this.isCrash = true;
		var movedDistance = this.GetDistanceToJohn( actor );
		
		this.x = this.prevX;
		
		var prevDistance = this.GetDistanceToJohn( actor );
		
		if( movedDistance < prevDistance )
			return true;
			
		this.x += moveX;	
		
		return false;
	}

	this.MoveLeft = function(actorList, blockList)
	{
		return this.MoveX(0, -this.moveX, actorList, blockList);
	}

	this.MoveRight = function(actorList, blockList)
	{
		return this.MoveX(1, this.moveX, actorList, blockList);
	}

	this.MoveUp = function()
	{
		this.y -= this.moveY;
	}

	this.MoveDown = function()
	{
		this.y += this.moveY;
	}

	this.Jump = function()
	{
		if(this.jumpState != 0)
			return false;

		this.jumpState = 1;
		this.jumpPower = this.jumpPowerMax;
		
		SoundManager.Play("jump");
		
		return true;
	}	
	
	this.Damage = function( damage )
	{
		if( Math.random() * 100 < this.shieldBlock )
		{
			g_ingame.AddText(this.x , this.y - this.imgHeight, "SheldBlock!", "rgba(255, 255, 255, 1)", true);
			
			if(this.IsDead() == false)
				SoundManager.Play("sheild");
			return;
		}
		
		if( Math.random() * 100  < this.dodge)
		{
			g_ingame.AddText(this.x, this.y - this.imgHeight, "Dodge!", "rgba(255, 255, 255, 1)", true);
		}
		
		if(this.IsInvincible())
			damage = 1;		
		
		this.hp = this.hp - damage;
		
		if(this.hp < 0)
			this.hp = 0;
	
		if(this.IsDead() == false)
			SoundManager.Play("damage");
		
		damage = damage - (damage * (this.phyReduce / 100));
		
		g_ingame.AddText(this.x, this.y - this.imgHeight / 2, damage, "rgba(255, 0, 0, 0.5)", false);
	}
	
	this.ItemCheck = function(itemList)
	{
		for(var i = 0; i < itemList.length; ++i)
		{
			var itemObj = itemList[i];
			
			if(itemObj.IsDead())
				continue;
				
			if(!itemObj.IsEatable())
				continue;
				
			if( this.CollisionCheck(itemObj) == false )
				continue;
				
			if(itemObj.type == "coin")
			{
				var coinCnt = randomRange(1, itemObj.level  * 10)
				g_ingame.AddText(itemObj.x, itemObj.y, "+ " + coinCnt + " Gold", "rgba(255, 255, 0, 1)", false);
				this.coin += coinCnt;
				SoundManager.Play("itemGet");
				itemObj.Eat();
			}
			
			if(itemObj.type == "hpPotion")
			{
				hpRecov = john.hp + john.maxHp * 0.1
				john.hp += hpRecov
		
				if(john.hp > john.maxHp)
					john.hp = john.maxHp;

				g_ingame.AddText(itemObj.x, itemObj.y, "+ " + hpRecov + " HP", "rgba(0, 255, 0, 1)", false);
				SoundManager.Play("potion");
				itemObj.Eat();
			}
		}
	}
	
	this.IsInvincible = function()
	{
		return  Renderer.currentTime - this.invincibleStartTime < (this.invincibleMaxSec * 1000);
	}
	
	this.Invincible = function()
	{
		if(this.mp < this.invincibleMP)
			return;
			
		this.mp -= this.invincibleMP;
			
		this.invincibleStartTime = Renderer.currentTime;
		
		SoundManager.Play("invincible");
	}

	this.IsSpeedUp = function()
	{
		return  Renderer.currentTime - this.speedUpStartTime < (this.speedUpMaxSec * 1000);
	}

	this.SpeedUp = function()
	{
		if(this.mp < this.speedUpMP)
			return;
			
		this.mp -= this.speedUpMP;
			
		this.speedUpStartTime = Renderer.currentTime;
		
		SoundManager.Play("invincible");
	}
	
	this.Potion = function()
	{
		if(john.hp >= john.maxHp)
		{
			SoundManager.Play("error");
			return;
		}
			
		john.hp = john.hp + john.maxHp * 0.1;
		
		if(john.hp > john.maxHp)
			john.hp = john.maxHp;
			
		SoundManager.Play("potion");
	
	}

	this.ChangeWeapon = function(weapon)
	{
		switch(weapon)
		{
			case "dagger":
				this.weaponHoldingTime = 0
				this.weaponCoolTime = 0
				this.weaponSpeed = 100
				this.weaponReach = 40
				this.weaponDamage = 10
				break

			case "sword":
				this.weaponHoldingTime = 0
				this.weaponCoolTime = 0
				this.weaponSpeed = 100
				this.weaponReach = 80
				this.weaponDamage = 10
				break

			case "whip":
				this.weaponHoldingTime = 0
				this.weaponCoolTime = 0
				this.weaponSpeed= 100
				this.weaponReach = 150
				this.weaponDamage = 10
				break

			case "gun":
				this.weaponHoldingTime = 0
				this.weaponCoolTime = 0
				this.weaponSpeed= 100
				this.weaponReach = 20
				this.weaponDamage = 10
				break
		}

		this.weaponName = weapon
	}
}
