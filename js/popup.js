var st = window.localStorage;
showkv();

function showkv(){
	if(st.length > 0){
	    document.getElementById("dele").style.display = "block";
	    document.getElementById("clearAll").style.display = "block";
	}

    var table = '<table><tr><th></th><th>名称</th><th class="thrigh">config</th><th>值</th></tr>';
//    table += '<tr><td></td><td>url</td><td>'+ st.getItem("url") +'</td></tr>';
    for(var i = 0; i < st.length; i ++){
    	var val = st.getItem(st.key(i));
    	var v = val.split(",");
    	
        table += '<tr>';
        table += '<td><input name="ch" type="checkbox" value="'+ st.key(i) +'"/></td>';
        table += '<td>'+ st.key(i) +'</td>';
        table += '<td>'+ v[1] +'</td>';
        table += '<td>'+ v[0] +'</td>';
        table += '</tr>';
    }
    table += '</table>';
    document.getElementById('kv').innerHTML = table;
   
};

	document.getElementById("dele").onmouseup = dele;
	document.getElementById("clearAll").onmouseup = clearAll;
	
	function dele(){
		var ch = document.getElementsByName("ch");
		for(var i in ch){
			if(ch[i].checked){
				st.removeItem(ch[i].value);
			}
		}
		window.location.reload();
	}
	function clearAll(){
		if(confirm("确定要清空所有数据吗？")){
			st.clear();
			window.location.reload();
		}
	}
	
/*	var inp = document.getElementsByName("kkey");
	for(var i in inp){
		var e = inp[i];
		e.addEventListener('click',function(){
			e.readOnly = false;
		},false);
	}*/
	