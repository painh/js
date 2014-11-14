var Message = function()
{
	this.x = 0;
	this.y = config["height"] - Renderer.fontSize;

	this.text = "";

	this.Render = function()
	{
		if(this.IsEmpty())
			return;
		
		Renderer.Text( this.x, this.y, this.text);
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