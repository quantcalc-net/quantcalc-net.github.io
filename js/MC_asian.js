// JavaScript Document
var message="Sorry!"; // Your no right click message here
var closeWin="0"; // Do you want to close window after message (1 for yes 0 for no)

 function IE(e){
     if (navigator.appName == 'Microsoft Internet Explorer' && (event.button == 2 || event.button == 3)){
         alert(message); if(closeWin=="1") self.close();
         return false;
     }
 }
 function NS(e){
     if (document.layers || (document.getElementById && !document.all)){
         if (e.which==2 || e.which==3){
                alert(message); if(closeWin=="1") self.close();
                return false;
           }
      }
 }
 document.onmousedown=IE;
 document.onmouseup=NS;
 document.oncontextmenu=new Function("return false");


function Calculate(){
    var s0 = eval(document.isForm.s0.value);
    var K = eval(document.isForm.K.value);
    var T = eval(document.isForm.T.value);
    var r = eval(document.isForm.r.value);
    var s = eval(document.isForm.s.value);
    var n = eval(document.isForm.n.value);
    var p = eval(document.isForm.p.value);
    
	var counter = 0;
    var tmp;
    var path = new Pathgen(s0, r, s, T, n);
	
	for(j=1 ; j<=p ; j++){
        // var path = new Pathgen(s0, r, s, T, n);
        // 一樣的問題，每次呼叫 generate 並不會去跑一個新 path 出來，所以只好不斷 new 和 delete
		path.Generate();
		counter += ((tmp = path.Avg()-K)>0 ? Math.exp(-r*T)*tmp : 0) 
        
        - ((tmp = path.GeoAvg()-K)>0 ? Math.exp(-r*T)*tmp : 0) + 
        
        s0*Math.exp((-r-(n+2)*s*s/(6*(n+1)))*T/2)*NormalCDF((Math.log(s0/K)+(r+(n-1)*s*s/(6*(n+1)))*T/2)/(s*Math.sqrt((2*n+1)*T/(6*(n+1))))) - K*Math.exp(-r*T)*NormalCDF((Math.log(s0/K)+(r-s*s/2)*T/2)/(s*Math.sqrt((2*n+1)*T/(6*(n+1)))));
		delete path;
	}
	
	document.isForm.c.value = (counter/p);
}

function Reset(){

    document.isForm.s0.value="100";
    document.isForm.K.value="120";
    document.isForm.T.value="1";
    document.isForm.r.value="0.1";
    document.isForm.s.value="0.3";
    document.isForm.n.value="50";
    document.isForm.p.value="10000";
   	document.isForm.c.value ="";
}
