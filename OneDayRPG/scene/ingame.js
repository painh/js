var g_cameraX = 480 / 2;
var g_cameraY = -280;
var john;

var SceneIngame = function()
{
	var imgJohn = ImageManager.Register( "./img/john.png", "john" );
	var imgSlime = ImageManager.Register( "./img/slime.png", "slime" );
	var imgItem = ImageManager.Register( "./img/itemObj.png", "itemObj" );
	var imgCoin = ImageManager.Register( "./img/item_coin.png", "itemCoin" );
	var imgPotion = ImageManager.Register( "./img/potion_1.png", "potion" );
	var imgInvincible = ImageManager.Register( "./img/invincible.png", "Invincible" );
	var imgBomb = ImageManager.Register( "./img/ipad_ingame_falldown_01.png", "Bomb" );
	var imgBombEffect = ImageManager.Register( "./img/bomb.png", "BombEffect" );
	var imgPotionBlue = ImageManager.Register( "./img/potion_blue.png", "imgPotionBlue" );
	var imgSpeedUp = ImageManager.Register( "./img/ipad_ingame_booster_btn_click.png", "imgSpeedUp" );
	var imgHammer = ImageManager.Register( "./img/hammer.png", "hammer" );
	
	
	
	var sndJump = SoundManager.Register( "./snd/news.wav", "jump" );
	var sndErr  = SoundManager.Register( "./snd/alert_ big.wav", "error" );
	var sndHit = SoundManager.Register( "./snd/hit.wav", "damage" );
	var sndDamage = SoundManager.Register( "./snd/damage.wav", "hit" );
	var sndCritical = SoundManager.Register( "./snd/critical.wav", "critical" );
	var sndSheild = SoundManager.Register( "./snd/mon_shiled.wav", "sheild" );	
	var snditemGet = SoundManager.Register( "./snd/get_coin.wav", "itemGet" );
	var sndinvincible = SoundManager.Register( "./snd/treasure_box_dead.wav", "invincible" );
	var sndpotion = SoundManager.Register( "./snd/item_heal.wav", "potion" );
	var sndBomb = SoundManager.Register( "./snd/airpalne_engine_spark.wav", "bomb" );
	var sndHammer = SoundManager.Register( "./snd/item_unbeatable.wav", "hammer" );

	
	
	
	var actorList = new Array();
	var aliveActorList = new Array();
	var blockList = new Array();
	
	var slime;
	
	var textList = new Array();
	var textListIndex = 0;

	var itemList = new Array();
	var itemListIndex = 0;
	
	var effectList = new Array();
	var effectListIndex = 0;
	
	
	this.Start = function()
	{
		Renderer.clearColor = "rgba(128, 128, 128, 1)";
		Renderer.defaultColor = "rgba(255, 255, 255, 1)";

		textList.length = 10;
		itemList.length = 100;
		effectList.length = 10;
		
		for(var i = 0; i < textList.length; ++i)
			textList[i] = new Text();
			
		for(var i = 0; i < itemList.length; ++i)
			itemList[i] = new ItemObj();

		for(var i = 0; i < effectList.length; ++i)
			effectList[i] = new Effect();

		actorList = new Array();

		john =  new John(imgJohn, 0, 63, 99, "john") ;
		actorList.push(john);

		slime = new Slime(imgSlime, 0, 32, 23, "slime") ;		
		slime.x = 100;
		actorList.push(slime);
		
		for(var i = 0; i < 100; ++i)
		{
			slime = new Slime(imgSlime, 0, 32, 23, "slime") ;		
			slime.x = 200 + (Math.random() * 100)* 100;
			actorList.push(slime);		
		}
		
		blockList.push( new Block( 0, 0, 32 * 100, 32, "rgba(200, 200, 200, 1)" ) );	
	}

	this.End = function()
	{
	}
	
	this.AddItem = function( actor )
	{
		for(var i = 0; i < actor.dropCnt; ++i)
		{
			if(itemListIndex >= itemList.length)
				itemListIndex = 0;
			
			if(randomRange( 1, 100 ) < actor.itemDropProb)
				itemList[itemListIndex].Init( imgItem, actor.x, actor.y, "item");
			else
			{
				if(randomRange( 1, 100 ) < 10)
					itemList[itemListIndex].Init( imgPotionBlue, actor.x, actor.y, "mpPotion");
				else if(randomRange( 1, 100 ) < 5)
					itemList[itemListIndex].Init( imgPotion, actor.x, actor.y, "hpPotion");
				else	
					itemList[itemListIndex].Init( imgCoin, actor.x, actor.y, "coin");
			}
				
			itemList[itemListIndex].level = actor.level;
			
			++itemListIndex;
		}
	}
	
	this.AddBonus = function( deadBonus )
	{
		if(deadBonus == 0)
			return;
			
		trace("dead bonus!" + deadBonus);
			
		for(var i = 0; i < deadBonus * 2; ++i)
		{
			if(itemListIndex >= itemList.length)
				itemListIndex = 0;
				
			itemList[itemListIndex].Init( imgPotion, john.x, john.y, "hpPotion");
			
			++itemListIndex;
		}
	}
	
	this.AddText = function( x, y, text, color, effect)
	{
		if(textListIndex >= textList.length)
			textListIndex = 0;

		textList[textListIndex].Init( x, y, text, color, effect);
		
		++textListIndex;
	}
	
	

	this.Update = function()
	{
		for(var i = 0; i < textList.length; ++i)
			textList[i].Update();
			
		for(var i = 0; i < itemList.length; ++i)
			itemList[i].Update();			
			
		for(var i = 0; i < effectList.length; ++i)
			effectList[i].Update();
			
		if(john.IsDead() == false)
		{
			if(KeyManager.IsKeyDown(KeyManager.arrowLeft))
				john.MoveLeft(actorList);
					
			if(KeyManager.IsKeyDown(KeyManager.arrowRight))
				john.MoveRight(actorList);
				
			if(KeyManager.IsKeyPress(KeyManager.a))
				john.Potion();
				
			if(KeyManager.IsKeyPress(KeyManager.s))
				john.SpeedUp();
				
			if(KeyManager.IsKeyPress(KeyManager.d))
			{
				if(john.Hammer(actorList))
				{
					if(effectListIndex >= effectList.length)
						effectListIndex = 0;
				
					effectList[effectListIndex].Init(  john.x ,
														-320, imgHammer)
				}
			}

			if(KeyManager.IsKeyPress(KeyManager.f))
			{
				if(john.Bomb(actorList))
				{
					if(effectListIndex >= effectList.length)
						effectListIndex = 0;
				
					effectList[effectListIndex].Init( john.x - 327/2, john.y - 333/2, imgBombEffect)
				}
			}
			
			if(KeyManager.IsKeyPress(KeyManager.space))
				john.Jump()
		
		}
		g_cameraX = john.x  - 480 / 2;
//		g_cameraY = john.y -  280;

		
		var deadCount = 0;
		
		for(var i = 0; i < actorList.length; ++i)
		{
			actorList[i].Update(actorList);
			if(!actorList[i].IsDead())
				aliveActorList.push(actorList[i]);
			else
			{
				++deadCount;
				this.AddItem( actorList[i] );
			}
		}
		
		
		var deadBonus = Math.floor(deadCount / 3 )
		this.AddBonus( deadBonus );
		
		
		john.ItemCheck(itemList);
		
		actorList = aliveActorList;
		aliveActorList = [];
	}

	this.Render = function()
	{
		for(var i = 0; i < blockList.length; ++i)
			blockList[i].Render();	
			
		for(var i = 0; i < itemList.length; ++i)
			itemList[i].Render();
	
		for(var i = 0; i < actorList.length; ++i)
		{
			actorList[i].Render();
			Renderer.RectStroke(actorList[i].x - g_cameraX + actorList[i].colliX, 
								actorList[i].y - g_cameraY + actorList[i].colliY,
								actorList[i].colliWidth,
								actorList[i].colliHeight);
								
		}
		
		for(var i = 0; i < textList.length; ++i)
			textList[i].Render();
			
		for(var i = 0; i < effectList.length; ++i)
			effectList[i].Render();

		Renderer.SetAlpha(1)
			
		Renderer.SetColor('rgba(255, 255, 255, 1)');
		Renderer.SetFont('10pt Arial');
		Renderer.Text(0, 0, "Lv : " + john.level + " Coin : " + john.coin +  " Exp : " + john.exp + " potionCnt : " + john.potionCnt);
		
		Renderer.SetColor('rgba(255, 255, 0, 1)');
		Renderer.Rect(10, 20, 100, 20)
		Renderer.Rect(150, 20, 100, 20)
		
		Renderer.SetColor('rgba(255, 0, 0, 1)');
		Renderer.Rect(10, 20 + 1, (john.hp / john.maxHp) * 100, 20 - 2)
		
		Renderer.SetColor('rgba(0, 0, 255, 1)');
		Renderer.Rect(150, 20 + 1, (john.mp / john.maxMp) * 100, 20 - 2)
		
		Renderer.SetColor('rgba(255, 255, 255, 1)');
		Renderer.Text(10, 20, " HP : " + john.hp + "/" + john.maxHp );
		Renderer.Text(160, 20, " MP : " + john.mp + "/" + john.maxMp );
		
		Renderer.Img( 250, 00, imgPotion );
		Renderer.Text(270, 50, john.potionCnt+"/"+john.potionCntMax);
		
		Renderer.Img( 290, 20, imgSpeedUp );
		
		Renderer.Img( 320, 20, imgBomb );		
		
		if(john.IsSpeedUp())
		{
			var leftSec = john.speedUpMaxSec - Math.floor((Renderer.currentTime - john.speedUpStartTime) / 1000);
			Renderer.Text(300, 50, leftSec);
		}
	}
};