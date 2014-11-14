var checkInclude = new Object;

function trace( txt )
{
    console.debug(txt);
}

function include(url, callback)
{
	checkInclude[url] = false;
	
    // adding the script tag to the head as suggested before
   var head= document.getElementsByTagName('head')[0];
   var script= document.createElement('script');
   script.type= 'text/javascript';
   script.src= url;

   // then bind the event to the callback function 
   // there are several events for cross browser compatibility
   script.onreadystatechange = callback;
   script.onload = function() { checkInclude[url] = true; }

   // fire the loading
   head.appendChild(script);
}

//$("<link rel='stylesheet' type='text/css' href='jEngine/CSS/Console.css' />").appendTo("head");
include("TopMenuEventHandler.js");

function AppendButtonToTop( btnID, label, func )
{
	var button = $("<span id="+btnID+"></span>").appendTo("#topMenu").button();
    button.css("font-size","9px" );
    button.button({label:label});
	button.click( func );
}

function Login()
{
	$('#login').remove();

	$("<div id='login'></div>").appendTo("#game");
	$("#login").css("border", "1px dotted black");
	$("#login").dialog( { position : [0, 25] });
	$("#login").css("font-size","9px" );
	$("<label>User name : </label>").appendTo("#login");
	$("<input type = 'text' id='name'/>").appendTo("#login");

	var button = $("<span id='btnLogin'></span>").appendTo("#login").button();
    button.css("font-size","9px" );
    button.button({label:"login!"});
	button.click(
		function()
		{
			$.ajax({
			    url: 'login.php',
			    type: 'GET',
			    dataType: 'xml',
				data : 'name=painh',
			    timeout: 1000,
			    error: function(){ trace("error"); },
			    success: 
				function(xml)
				{
					trace(xml);
				}});

		}

	 );


//	$('input:text, input:password').button()

//	$("#charInfo")
	
}

function Start()
{
	Login();
	return;

    //var btn = $.button().appendTo("#game").({label : "-_-" });
	$("#game").css("border", "1px dotted black");
	$("#game").css("position", "absolute");
	$("#game").css("left", "0");
	$("#game").css("top", "0");
	$("#game").width(640);
	$("#game").height(480);
/*
	var dialog = $("<span id='3'></span>").appendTo("#game").dialog();
	dialog.dialog( { title : "t2222itle"});
	dialog.html("<p>블라블ㄹ</p>");
*/
	//for(var idx in dialog)
	//	trace(idx);

    var topMenu = $("<div id = 'topMenu'></div>").appendTo("#game");
//	topMenu.css("border", "1px dotted black");
	topMenu.css("position", "absolute");
	topMenu.css("top", "0px");
	topMenu.css("left", "0px");
	topMenu.css("width", "640px");
	topMenu.css("height", "20px");

	AppendButtonToTop('1', "정보", OnEvent_Info );
	AppendButtonToTop('2', "관리", OnEvent_Manage );
	AppendButtonToTop('3', "시스템", OnEvent_System );
}

$(document).ready(function()
{
	var timer = setInterval( function() 
	{
		for(var i in checkInclude)
		{
			if(checkInclude[i] == false)
				return;
		}
		
		clearInterval(timer);
		Start();
	}, 100);
}
);