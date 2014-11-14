var g_data
var g_charName

var onOver = function(e)
{
	$(this).addClass('onOver');
}

var onOut = function()
{
	$(this).removeClass('onOver');
}

var onClickGive = function(e)
{
	var guid = $(this).attr('guid')
	
	var selectVal = $("#select_box" + guid).val()

	$.ajax({ url: 'http://14.63.223.198:21007/php/DragonFlightKakao_Tools/give_gem_to_user.php',
				type: 'POST',
				dataType: 'json',
				data :  {  {  user_id : g_charName,
									guid : guid,
									product_name : selectVal,
								}  } ,
				timeout: 1000,
				error: function(){ alert('Error loading XML document'); },
				success:	function(json)
								{
									alert("refund success")
								}
				})
	
	refresh(g_charName)
}
	
var onClickRefund = function(e)
{
	var guid = $(this).attr('guid')
	
	var selectVal = $("#select_box" + guid).val()
	
	$.ajax({ url: 'http://14.63.223.198:21007/php/DragonFlightKakao_Tools/refund.php',
				type: 'POST',
				dataType: 'json',
				data :  {  {  user_id : g_charName,
									guid : guid,
									product_name : selectVal,
								}  } ,
				timeout: 1000,
				error: function(){ alert('Error loading XML document'); },
				success:	function(json)
								{
									alert("refund success")
								}
				})
				
	refresh(g_charName)				
}

function addHistroy( isProcessed, guid, orderID, time, purName )
{
	var cname
	if(isProcessed == "1")
		cname = "historyProcssed"
	else
		cname = "history"
		
	$("#client").append("<div  class = '"+cname+"' id='" + guid + "'> <span class = 'hguid'>" + guid +"</span><span class = 'horderID'>" + orderID +"</span><span class = 'htime'>" + time+
								" </span><span class ='hname'>"+purName+"</span><span class ='hprocessed'>"+isProcessed+"</span></div>")
								
	if(isProcessed == "IS_PROCESSED")
		return
								
								
	$("#"+guid).mouseover( onOver )
	$("#"+guid).mouseout( onOut )
	
	var selectBox = "select_box"+guid
	$("#"+guid).append("<select id='"+selectBox+"'></select>")	
	$("#"+selectBox).append("<option value='dragonflight_for_kakao_10_gem'>dragonflight_for_kakao_10_gem</option")
	$("#"+selectBox).append("<option value='dragonflight_for_kakao_35_gem'>dragonflight_for_kakao_35_gem</option")
	$("#"+selectBox).append("<option value='dragonflight_for_kakao_60_gem'>dragonflight_for_kakao_60_gem</option")
	$("#"+selectBox).append("<option value='dragonflight_for_kakao_130_gem'>dragonflight_for_kakao_130_gem</option")
	$("#"+selectBox).append("<option value='dragonflight_for_kakao_420_gem'>dragonflight_for_kakao_420_gem</option")
	$("#"+selectBox).append("<option value='dragonflight_for_kakao_750_gem'>dragonflight_for_kakao_750_gem</option")
	
	$("#"+guid).append("<button type='button'  guid = '"+guid+"' id = btnGive"+guid+">Give</button>")
	$("#btnGive"+guid).click( onClickGive )
	
	$("#"+guid).append("<button type='button'  guid = '"+guid+"' id = btnRefund"+guid+">Refund</button>")
	$("#btnRefund"+guid).click( onClickRefund )	
}

function refresh( user_id )
{
		$('.history').remove()
		$('.historyProcssed').remove()
		$('.char').remove()
		
		$.ajax({ url: 'http://14.63.223.198:21007/php/DragonFlightKakao_Tools/get_user_info.php',
					type: 'GET',
					dataType: 'json',
					data : "user_id="+"PC_LEVITEStPC",
					timeout: 1000,
					error: function(){ alert('Error loading XML document'); },
					success:	function(json)
									{
									
										g_data = eval('('+data+')')
										
										$("#client").append("<div  class = 'char'>  <span class = 'GEM'> GEM : " + g_data.GEM +"</span> <span class = 'WING'> WING : " + g_data.WING +"</span> <span class = 'GAME_MONEY'> GAME_MONEY : " + g_data.GAME_MONEY +"</span></div>")
										
										addHistroy("IS_PROCESSED", "GUID", "ORDER_ID", "TIME", "PRODUCT_NAME")
										
										for(var i = 0; i < g_data.PURCHASE_LOGS.length; ++i)
										{
											var pur = g_data.PURCHASE_LOGS[i]
											addHistroy(pur.IS_PROCESSED, pur.GUID, pur.ORDER_ID, pur.TIME, pur.PRODUCT_NAME)
										}
									
										
									}
					})
}

$(document).ready(function()
{
	$("#user_id").focus().keydown( function(e)
														{
															g_charName = this.value
															if(e.which == 13)
																refresh(g_charName)
														})
														
	
														
} );
/*

		if ("dragonflight_for_kakao_10_gem" == $product_name)	{ $add_gem =  10; }
	else if ("dragonflight_for_kakao_35_gem" == $product_name)	{ $add_gem =  35; }
	else if ("dragonflight_for_kakao_60_gem" == $product_name)	{ $add_gem =  60; }
	else if ("dragonflight_for_kakao_130_gem" == $product_name)	{ $add_gem = 130; }
	else if ("dragonflight_for_kakao_420_gem" == $product_name)	{ $add_gem = 420; }
	
	else if ("dragonflight_for_kakao_750_gem" == $product_name)	{ $add_gem = 750; }
*/