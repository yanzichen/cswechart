$(document).ready(function(){
	$("#content").height(window.innerHeight+60);
	loadMenuData();
});
function loadMenuData(){
	var menuList = $("#menuList").val();
	var menuListArr = menuList.split(',');
	$.ajax({
		url:$("#fule").val()+"menu/menuGetData.json",
		type:"POST",
		dataType:"json",
		success:function(data){
			var strHtml= "";
			$.each(data, function(key,value){
				strHtml+='<label class="checkbox-inline">';
				if(IsInArray(menuListArr,value.id)){
					strHtml+='<input type="checkbox" id="'+value.id+'" value="'+value.id+'" name="menuid" checked="checked">'+value.menuname;
				}else{
					strHtml+='<input type="checkbox" id="'+value.id+'" value="'+value.id+'" name="menuid">'+value.menuname;
				}
				strHtml+='</label>';
			});
			$("#roleListDiv").html(strHtml);
		},
		error:function(){
			
		}
	});
}
//判断字符串是否存在数组中
function IsInArray(arr,val){ 
　　var testStr=','+arr.join(",")+","; 
　　return testStr.indexOf(","+val+",")!=-1; 
}
function save(){
	var roleid = $("#editroleid").val();
	var menuidArr =[]; 
    $('input[name="menuid"]:checked').each(function(){ 
    	menuidArr.push($(this).val()); 
    }); 
    if(menuidArr.length==0){
    	alert("你没有选中任何菜单！");
    	return;
    }
    var menuidArrStr = menuidArr.join(",");
	$.ajax({
		url: $("#fule").val()+"role/roleMenuSave.json",
		type:"POST",
		dataType:"json",
		data: {
			roleid : roleid,
			menuidArrStr : menuidArrStr
        },
		success:function(data){
			 alert("操作成功");
			 window.location.href=$("#fule").val()+"role/roleList.web";
		},
		error:function(){
			console.log("失败");
		}
	});
}