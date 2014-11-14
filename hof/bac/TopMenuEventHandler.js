function OnEvent_Info()
{
	dat = "id=1";
	$.ajax({
		    url: 'getInfo.php',
		    type: 'GET',
		    dataType: 'xml',
			data : dat,
		    timeout: 1000,
		    error: function(){ alert('Error loading XML document'); },
		    success: 
			function(xml)
			{
	        	// do something with xml
	
				$('#charInfo').remove();
				if($(xml).find('char').length == 0)
					return;
	
				$("<div id='charInfo'></div>").appendTo("#game");
				$("#charInfo").css("border", "1px dotted black");
				$("#charInfo").dialog( { position : [0, 25] });
				$("#charInfo").css("font-size","9px" );

	
				$(xml).find("char").each(
				function(id)
				{
					trace(id);
					var id = $(this).find("id").text();
					var name = $(this).find("name").text();
					var hp = $(this).find("hp").text();
					var maxHP = $(this).find("maxHP").text();

					$("#charInfo").dialog( { title : "[" + id + "] " +name });

					$('#charInfo').html ( "hp = " + hp + "<br/>" +
											"maxHP = " + maxHP + "<br/>" );
				} );
		    }
			});	
}

function OnEvent_Manage()
{
}

function OnEvent_System()
{
}