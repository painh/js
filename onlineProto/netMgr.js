var NetManager = function( socketObj, packetProcObj )
{
	this.m_socket = socketObj;
	this.m_packetProcObj = packetProcObj;
	
	this.Send = function( obj )
	{
		var jsonText = JSON.stringify(obj, null, 2);
		this.m_socket.send( jsonText );
	}
	this.OnPacket = function( jsonText )
	{
		var obj = JSON.parse(jsonText);
		var packetFunc = "onPacket_"+obj.pid;
		
		if( this.m_packetProcObj["onPacket_"+obj.pid] == undefined )
		{
			trace("error unhandled packet : " + obj.pid );
			return;
		}
		this.m_packetProcObj["onPacket_"+obj.pid](obj);
	}
};