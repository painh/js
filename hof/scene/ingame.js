var SceneIngame = function()
{
		var x = 100;
		var y = 100;
		var img = ImageManager.Get( "img1" );

		this.Start = function()
		{
		}

		this.End = function()
		{
		}

		this.Update = function()
		{
			if(MouseManager.LDown)
			{
	//			SoundManager.Play("snd1");
				x--;
	//			Console.Trace("X : " + MouseManager.x + " Y : " + MouseManager.y);
			}

			if(KeyManager.IsKeyDown(KeyManager.arrowLeft))
			{
				SoundManager.Play("snd1");
				x--;
			}
				
			if(KeyManager.IsKeyDown(KeyManager.arrowRight))
				x++;
				
			if(KeyManager.IsKeyDown(KeyManager.arrowUp))
				y--;

			if(KeyManager.IsKeyDown(KeyManager.arrowDown))
				y++;		
		}

		this.Render = function()
		{
			Renderer.Img(x, y, img, 24, 24, 17);
	//		Renderer.Img(x, y, img);
	//		Renderer.Text(0,20, "your name : " + playerName);
		}	
};