var PacketProc = function()
{
	this.onPacket_Pos = function( obj )
	{
		trace("i received : " + obj.actorID + "," + obj.x + "," + obj.y );
		
		actor = g_SceneIngame.GetActor( obj.actorID );
		
		if( actor == undefined )
		{
			trace("cant find actorIDX : " + obj.actorID );
			return;
		}
		actor.x = obj.x;
		actor.y = obj.y;
		EventInst.OnEvent(actor);
	}
};