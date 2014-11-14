var EventManager = function()
{
	this.actorEvent = new Array;

	this.OnEvent = function(actor)
	{
		//this.actorEvent[actor.name]();
	}

	this.Register = function( name, func )
	{
		this.actorEvent[name] = func;
	}
}

var EventInst = new EventManager();