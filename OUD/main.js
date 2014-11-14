var g_maps = null;
function trace(text)
{
	$('#console').append($("<p>"+ text +"</p>"));
	document.getElementById('console').scrollTop = document.getElementById('console').scrollHeight;
}

function printRoom(id)
{
	if(g_maps == undefined)
	{
		console.log("g_map is null");
		return;
	}

	if(g_maps[id] == undefined)
	{
		console.log("id["+id+"] is null");
		return;
	}

	trace('== ' + g_maps[id]['name'] + ' ==');
	trace(g_maps[id]['descript']);
}

$(document).ready(function()
{
	$('#input').focus();

	g_maps = new Object();
	$.ajax
	({
		type:'get',
		dataType:'xml',
		url:'maps.xml',
		success:function(xml)
		{
			$(xml).find('maps').find('room').each(function(idx)
			{
				var id = $(this).find('id').text();
				g_maps[id] = new Object();
				g_maps[id]['id'] = id;
				g_maps[id]['name'] = $(this).find('name').text();
				g_maps[id]['descript'] = $(this).find('descript').text();

			});
			printRoom(0);
		}
	})
	

	$('#input').keyup(function(e)
	{ 
		if (e.keyCode != 13)
			return;

		var text = $('#input').val();
		trace(text);
		$('#input').val("");
	})
});
