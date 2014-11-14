var STAR_TYPE_UNKNOWN	= 0;
var STAR_TYPE_WIND		= 1;
var STAR_TYPE_FIRE		= 2;
var STAR_TYPE_ICE		= 3;
var STAR_TYPE_PHYSICAL	= 4;
var STAR_TYPE_BLOCK		= 5;
var STAR_TYPE_MAX		= 6;

var STAR_SIZE			= 10;
var STAR_STATE_NORMAL	= 0;
var STAR_STATE_MARKED	= 1;

var	Star = function()
{
	this.x = 0;
	this.y = 0;
	this.type = STAR_TYPE_WIND;
	this.state = STAR_STATE_NORMAL;
	
	this.IsIn = function( x, y )
	{
		if( Math.sqrt((this.x - x) * (this.x - x) + (this.y - y) * (this.y - y)) < 9 )
			return true;
			
		return false;
		
/*		if( x >= this.x &&
			x <= this.x + STAR_SIZE &&
			y >= this.y &&
			y <= this.y + STAR_SIZE )
		{
			return true;
		}
		
		return false;*/
	}

	this.Render = function()
	{
		var color = "#ffffff";
		
		switch(this.type)
		{
			case STAR_TYPE_WIND:
				color = "#AAAAAA";
				break;
			case STAR_TYPE_FIRE:
				color = "#AA3300";
				break;

			case STAR_TYPE_ICE:
				color = "#0000AA";
				break;

			case STAR_TYPE_PHYSICAL:
				color = "#00AA00";
				break;

			case STAR_TYPE_BLOCK:
				color = "#CCAACC";
				break;
			
		}

		Renderer.SetColor(color);
		Renderer.Rect( this.x, this.y, STAR_SIZE, STAR_SIZE);
		
		if( this.state == STAR_STATE_MARKED)
		{
			Renderer.SetColor("#000000");
			Renderer.Rect( this.x + 2, this.y + 2, STAR_SIZE - 4, STAR_SIZE - 4);
		}
		
		if( this.type == STAR_TYPE_BLOCK )
		{
			Renderer.SetColor("#000000");
			Renderer.Text( this.x , this.y , 'B');
		}
	}
};


var LineManager = function()
{
	this.pointList = new Array();
	this.color = 0;
	
	
	this.Clear = function()
	{
		this.pointList = [];
	}
	
	this.Add = function( x, y )
	{
		var newPoint = new Object();
		newPoint['x'] = x;
		newPoint['y'] = y;
	
		if( this.pointList.length == 0 )
		{
			this.pointList.push( newPoint );
			return true;
		}
		
		var lastPoint = this.pointList[ this.pointList.length - 1 ];
		var distancePrevPoint =  Math.sqrt( (lastPoint.x - x) * (lastPoint.x - x) + (lastPoint.y - y) + (lastPoint.y - y));
//		trace( this.pointList.length + "." + distancePrevPoint );
		
		if( distancePrevPoint < 3 )
			return false;
			
		this.pointList.push(newPoint);
		
		return true;
	}
	
	this.Update = function()
	{
		this.color += 10;
		
		if(this.color > 256)
			this.color = 0;
			
	}
	
	this.Render = function()
	{
		if( this.pointList.length < 2 )
			return;
			
		var colorAtom = this.color.toString(16);
		
		if(colorAtom.length < 2)
			colorAtom = "0" + colorAtom;
		
		var color = "#" +  colorAtom + colorAtom + colorAtom;
		Renderer.SetColor(color);
			
		for(var i = 0; i < this.pointList.length - 1; ++i)
		{
			var curPoint = this.pointList[i];	
			var nextPoint = this.pointList[i + 1];	
			Renderer.Line( curPoint.x, curPoint.y, nextPoint.x, nextPoint.y );
			prevPoint = this.pointList[i];
		}
	}
};

var LogManager = function()
{
	var logMax = 5;
	this.logList = new Array()
	
	this.Add = function( log )
	{
		this.logList.push(log);
		
		if(this.logList.length > logMax)
			this.logList = this.logList.slice( 1, this.logList.length - 1 );
	}
	
	this.Render = function()
	{
		Renderer.SetColor("#000000");
		for(var i = 0; i < this.logList.length; ++i)
		{
			Renderer.Text(0, 140 + i * 20, this.logList[i]);
		}
	}
};

var	SCENE_STATE_STAR_BREAK	= 0;
var	SCENE_STATE_SHOW_ENEMY	= 1;
var STAR_BREAK_TIME = 1000 * 3;
var SHOW_ENEMY_TIME = 1000 * 1;

var SceneIngame = function()
{
	this.state = SCENE_STATE_STAR_BREAK;
	this.stateStartTime = Renderer.currentTime;
	this.starTypeCnt;
	this.lineManager = new LineManager();
	this.logManager = new LogManager();
	this.markedStarType = STAR_TYPE_UNKNOWN;
	this.markedStarCnt = 0;
	this.starList = new Array();
	
	this.enemyHP	= 100;
	this.playerHP	= 100;
	
	this.enemyImg;

	this.MakeStars = function()
	{
		var starLimit = 30;
		var maxLoop = 20;
		
		this.starList = null;
		this.starList = new Array();
		
		this.starTypeCnt = null;
		this.starTypeCnt = new Array();
		this.starTypeCnt.length = STAR_TYPE_MAX;
		
		for( var i = 0; i < STAR_TYPE_MAX; ++i)
			this.starTypeCnt[i] = 0;
		
		this.markedStarCnt = 0;
		this.markedStarType = STAR_TYPE_UNKNOWN;
		this.lineManager.Clear();
		
		for(var i = 0; i < starLimit; ++i)
		{
			var aNewStar = new Star();
			var k = 0;
			for(; k < maxLoop; ++k)
			{
				var x = randomRange(0, config['width'] - STAR_SIZE );
				var y = randomRange(0, config['height'] - STAR_SIZE );
				var breakAble = true;
				for(var j = 0; j < this.starList.length; ++j)
				{
					var distance = Math.sqrt((this.starList[j].x - x) * (this.starList[j].x - x) + (this.starList[j].y - y) * (this.starList[j].y - y));
					if( distance < 40 )
					{
						breakAble = false;
						break;
					}
				}

				if(breakAble)
					break;
			}

			if(k == maxLoop)
				continue;

			aNewStar.x = x;
			aNewStar.y = y;
			aNewStar.type = randomRange(STAR_TYPE_WIND, STAR_TYPE_BLOCK);
			this.starTypeCnt[aNewStar.type]++;
			this.starList.push(aNewStar);
		}
	}

	this.Start = function()
	{
		this.MakeStars();
		this.enemyImg = ImageManager.Get('logo');
	}

	this.End = function()
	{
	}
	
	this.SetState = function( newState )
	{
		if(this.state == SCENE_STATE_STAR_BREAK && newState == SCENE_STATE_SHOW_ENEMY)
		{
			if(this.markedStarType == STAR_TYPE_UNKNOWN)
				this.logManager.Add("플레이어는 아무것도 하지 않았다." );
				
			else	if( this.markedStarType != STAR_TYPE_BLOCK )
			{
				var damage = this.markedStarCnt;
				
				this.enemyHP -= damage;
				this.logManager.Add("플레이어의 공격 : 고순이는 " + this.markedStarCnt +"의 피해를 입었다." );
			}
			
			var damage = 3;
			
			if( this.markedStarType  == STAR_TYPE_BLOCK )
			{
				damage -= this.markedStarCnt;
				
				this.logManager.Add("플레이어는 " + this.markedStarCnt + "점을 방어했다." );
			}
			this.playerHP -= damage;
			this.logManager.Add("고순이의 공격 : 플레이어는 " + damage +"의 피해를 입었다." );
		}
		
		if(this.state == SCENE_STATE_SHOW_ENEMY && newState == SCENE_STATE_STAR_BREAK)
		{
			this.MakeStars();
		}
			
		this.stateStartTime = Renderer.currentTime;
		this.state = newState;
		
	}
	
	this.Update_StarBreak = function()
	{
//		if(Renderer.currentTime - this.stateStartTime > STAR_BREAK_TIME)
//			this.SetState(SCENE_STATE_SHOW_ENEMY);

		if(this.markedStarCnt != 0)
		{
			if(this.markedStarCnt == this.starTypeCnt[this.markedStarType] )
			{
				this.SetState(SCENE_STATE_SHOW_ENEMY);
				return;
			}
			
		}
			
		if(!MouseManager.LDown)
		{
			if( this.markedStarCnt == 0 )
				this.lineManager.Clear();
				
			if( this.markedStarCnt != 0 )
				this.SetState(SCENE_STATE_SHOW_ENEMY);

			return;
		}
			
		if( !this.lineManager.Add( MouseManager.x, MouseManager.y ) )
			return false;
			
		this.markedStarCnt = 0;
			
		for(var i = 0; i < this.starList.length; ++i)
		{
			var star = this.starList[i];
			
			if(star.state == STAR_STATE_MARKED)
				this.markedStarCnt++;
		}
		
		this.lineManager.Update();		
		
		for(var i = 0; i < this.starList.length; ++i)
		{
			var star = this.starList[i];
			
			if( star.IsIn( MouseManager.x, MouseManager.y) )
			{
				if(this.markedStarType != STAR_TYPE_UNKNOWN &&
					this.markedStarType != star.type )
				{
					this.SetState(SCENE_STATE_SHOW_ENEMY);
					break;
				}
					
				star.state = STAR_STATE_MARKED;
				
				if(this.markedStarType == STAR_TYPE_UNKNOWN)
					this.markedStarType = star.type;
			}
		}
	}
	
	this.Update_ShowEnemy = function()
	{
		if(Renderer.currentTime - this.stateStartTime > SHOW_ENEMY_TIME)
			this.SetState(SCENE_STATE_STAR_BREAK);
	}
	
	this.Update = function()
	{
		if(this.state == SCENE_STATE_SHOW_ENEMY)
			this.Update_ShowEnemy();
			
		if(this.state == SCENE_STATE_STAR_BREAK)
			this.Update_StarBreak();
	}
	
	this.Render_StarBreak = function()
	{
		for(var i = 0; i < this.starList.length; ++i)
			this.starList[i].Render();
			
		this.lineManager.Render();
		
		Renderer.SetColor("rgba(0, 0, 0, 0.5)");
		Renderer.Rect( 0, 0, config["width"], config["height"] );
		
		Renderer.SetColor( "#FFFFFF");
		//STAR_BREAK_TIME
		var elapsedTime = (Renderer.currentTime - this.stateStartTime);
		
		
		if( this.markedStarType != STAR_TYPE_UNKNOWN )
			Renderer.Text(0, 20, "수집 : " + this.markedStarCnt + "/" + this.starTypeCnt[this.markedStarType] );
	
		Renderer.Text(0, 40, (elapsedTime / 1000) + "초 경과" );
		
	}
	
	this.Render_ShowEnemy = function()
	{
		Renderer.Img( (Renderer.width - this.enemyImg.width) / 2 , 100 , this.enemyImg);
		this.logManager.Render();
	}
	
	this.RenderUI = function()
	{
		Renderer.SetColor('#000000');
		Renderer.Text(0, 0, "player hp : " + this.playerHP + " / enemy hp " + this.enemyHP );
	}

	this.Render = function()
	{
		this.Render_ShowEnemy();
	
		if(this.state == SCENE_STATE_STAR_BREAK)
			this.Render_StarBreak();
			
		this.RenderUI();			
	}
};