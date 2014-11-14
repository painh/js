var g_cameraX = 480 / 2;
var g_cameraY = -280;
var john
var johnBase
var enemyBase
var shop
var minimap
var mapWidth
var gameOver
var victory

var actorList = new Array();
var aliveActorList = new Array();
var blockList = new Array();
var decoList = new Array();

var textList = new Array();
var textListIndex = 0;

var itemList = new Array();
var itemListIndex = 0;

var effectList = new Array();
var effectListIndex = 0;

var img
var currentStage = 1
var stageMaxNum = 3
var currentStageObject

var SceneIngame = function()
{
	img = ImageManager.Register( "./img/img.png", "img" );
	
	SoundManager.Register( "./snd/jump.wav", "jump" )
	SoundManager.Register( "./snd/hit.wav", "hit" )
	SoundManager.Register( "./snd/critical.mp3", "critical" )
	SoundManager.Register( "./snd/damage.wav", "damage" )
	SoundManager.Register( "./snd/laser.wav", "laser" )

	
	shop = new Shop()
	minimap = new Minimap()
	gameOver = new GameOver()
	victory = new Victory()

	this.StageRestart = function()
	{
		shop.isShopOpen	= false
		gameOver.isGameOver = false
		victory.isVictory = false

		john.killCount = 0
		john.getCoinInStage = 0

		john.ChangeWeapon("dagger")
		john.jumpState = 0
		john.jumpPower = 0
		john.hp = john.maxHp

		actorList = []
		aliveActorList = []
		textList = []
		itemList = []
		effectList = []
		decoList = []

		for( var i = -1000; i < 9999; i += randomRange(200, 500))
		{
			var cloud = new Cloud2(img)
			cloud.x = i
			cloud.y = 500 - randomRange(0, 200)
			decoList.push( cloud )
		}

		textList.length = 10;
		itemList.length = 100;
		effectList.length = 10;
		
		for(var i = 0; i < textList.length; ++i)
			textList[i] = new Text();
			
		for(var i = 0; i < itemList.length; ++i)
			itemList[i] = new ItemObj();

		for(var i = 0; i < effectList.length; ++i)
			effectList[i] = new Effect();		

		for( var i = -1000 ; i < 9999; i += randomRange(100, 500))
		{
			var cloud = new Cloud(img)
			cloud.x = i
			cloud.y = 500 - randomRange(0, 200)
			decoList.push( cloud )
		}

		currentStageObject = window["Stage" + currentStage]
		
		currentStageObject.Load()
	}
	
	this.Start = function()
	{
		Renderer.clearColor = "rgba(255, 180, 128, 1)";
		Renderer.defaultColor = "rgba(255, 255, 255, 1)";
		john =  new John(img, 0, "john") ;
		this.StageRestart()
	}

	this.End = function()
	{
	}
	
	this.AddItem = function( actor )
	{
		return

		for(var i = 0; i < actor.dropCnt; ++i)
		{
			if(itemListIndex >= itemList.length)
				itemListIndex = 0;
			
			if(randomRange( 1, 100 ) < actor.itemDropProb)
			{
				//itemList[itemListIndex].Init( imgItem, actor.x, actor.y, "item")
			}
			else
			{
//				if(randomRange( 1, 100 ) < 10)
//					itemList[itemListIndex].Init( imgPotionBlue, actor.x, actor.y, "mpPotion");
				if(randomRange( 1, 100 ) < 5)
					itemList[itemListIndex].Init( img, actor.x, actor.y, "hpPotion");
				else	
					itemList[itemListIndex].Init( img, actor.x, actor.y, "coin");
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
				
			itemList[itemListIndex].Init( img, john.x, john.y, "hpPotion");
			
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
		shop.Update()
		
		if(gameOver.isGameOver)
		{
			gameOver.Update()
			return
		}

		if(victory.isVictory)
		{
			victory.Update()
			return
		}

		//trace("update")

		if(johnBase.hp <= 0)
		{
			gameOver.isGameOver = true
			return
		}
			
		if(enemyBase.hp <= 0)
		{
			victory.isVictory = true
			return
		}

		for(var i = 0; i < textList.length; ++i)
			textList[i].Update();
			
		for(var i = 0; i < itemList.length; ++i)
			itemList[i].Update();			
			
		for(var i = 0; i < effectList.length; ++i)
			effectList[i].Update();
			
		if(currentStageObject.Update)
			currentStageObject.Update()

		if(KeyManager.IsKeyPress(KeyManager._4))
			shop.isShopOpen = !shop.isShopOpen

		if(john.IsDead() == false)
		{
			if(KeyManager.IsKeyDown(KeyManager.arrowLeft) && john.x > 0)
				john.MoveLeft(actorList, blockList);
					
			if(KeyManager.IsKeyDown(KeyManager.arrowRight) && john.x + john.colliWidth < mapWidth)
				john.MoveRight(actorList, blockList);

			if(KeyManager.IsKeyPress(KeyManager.x) || KeyManager.IsKeyPress(KeyManager.space))
				john.Jump()

			if(KeyManager.IsKeyPress(KeyManager.z))
				john.Seal(actorList)

			if(KeyManager.IsKeyPress(KeyManager._1))
				john.ChangeWeapon("dagger")

			if(KeyManager.IsKeyPress(KeyManager._2))
				john.ChangeWeapon("sword")

			if(KeyManager.IsKeyPress(KeyManager._3))
				john.ChangeWeapon("whip")			
		}
		g_cameraX = john.x  - 480 / 2;
		g_cameraY = 640 - 32 - 240;

		
		var deadCount = 0;

		var johnLive = !john.IsDead()
		
		for(var i = 0; i < actorList.length; ++i)
		{
			actorList[i].Update(actorList, blockList);
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
		for(var i = 0; i < decoList.length; ++i)
			decoList[i].Render()

		for(var i = 0; i < blockList.length; ++i)
			blockList[i].Render();	
			
		for(var i = 0; i < itemList.length; ++i)
			itemList[i].Render();
	
		for(var i = 0; i < actorList.length; ++i)
		{
			actorList[i].Render();
			Renderer.RectStroke(actorList[i].x - g_cameraX + actorList[i].colliX, actorList[i].y - g_cameraY + actorList[i].colliY, actorList[i].colliWidth, actorList[i].colliHeight);
		}
		
		for(var i = 0; i < textList.length; ++i)
			textList[i].Render();
			
		for(var i = 0; i < effectList.length; ++i)
			effectList[i].Render();

		Renderer.SetAlpha(1)
			
		Renderer.SetColor('rgba(255, 255, 255, 1)');
		Renderer.SetFont('10pt Arial');

		Renderer.ImgBlt( 0, 0, img, 32, 32, 32, 32)
		
		Renderer.Text(23, 5, " x " + john.coin);
		
		var gauge = 250
		Renderer.SetColor('rgba(255, 255, 0, 1)');
		Renderer.Rect(10, 30, gauge, 20)		
		Renderer.SetColor('rgba(255, 0, 0, 1)');
		Renderer.Rect(10, 30 + 1, (john.hp / john.maxHp) * gauge, 20 - 2)

		var gauge = 250
		Renderer.SetColor('rgba(255, 255, 0, 1)');
		Renderer.Rect(10, 50, gauge, 20)		
		Renderer.SetColor('rgba(255, 0, 0, 1)');
		Renderer.Rect(10, 50 + 1, (johnBase.hp / johnBase.maxHp) * gauge, 20 - 2)


		var gauge = 250
		Renderer.SetColor('rgba(255, 255, 0, 1)');
		Renderer.Rect(10, 70, gauge, 20)		
		Renderer.SetColor('rgba(255, 0, 0, 1)');
		Renderer.Rect(10, 70 + 1, (enemyBase.hp / enemyBase.maxHp) * gauge, 20 - 2)
		
		
		Renderer.SetColor('rgba(255, 255, 255, 1)');
		Renderer.Text(10, 30, " 캐릭터 체력: " + john.hp + "/" + john.maxHp );
		Renderer.SetColor('rgba(255, 255, 255, 1)');
		Renderer.Text(10, 50, " 기지 체력 : " + johnBase.hp + "/" + johnBase.maxHp );
		Renderer.SetColor('rgba(255, 255, 255, 1)');
		Renderer.Text(10, 70, " 적 기지 체력 : " + enemyBase.hp + "/" + enemyBase.maxHp );

		if(john.isSealing)
		{
			var gauge = 250
			Renderer.SetColor('rgba(255, 255, 0, 1)');
			Renderer.Rect((480 - 250) / 2, 280, gauge, 20)		
			Renderer.SetColor('rgba(255, 0, 0, 1)');
			Renderer.Rect((480 - 250) / 2, 280 + 1, (john.sealPoint / 100) * gauge, 20 - 2)
		}

		minimap.Render(actorList)

		shop.Render()
		gameOver.Render()
		victory.Render()
	}
};
