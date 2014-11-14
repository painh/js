var Message = function()
{
	this.x = 320 + 8 + 8;
	this.y = 8;//+ Renderer.fontSize;
	this.width = config["width"] - ( 320 + 8 * 3);
	this.height = 320;

	this.text = "";

	this.Render = function()
	{
		if(this.IsEmpty())
			return;
			
		Renderer.WrapText( this.x, this.y, this.width, Renderer.fontSize, this.text );
	}

	this.IsEmpty = function()
	{
		if( this.text == "" )
			return true;
		return false;
	}

	this.SetText = function( msg )
	{
		this.text = msg;
	}

	this.Clear  = function()
	{
		this.text = "";	
	}
};

var MessageInst = new Message();