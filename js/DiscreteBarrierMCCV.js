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

function Boole(tf)
{
    if(tf)  return 1;
    else    return 0;
}

function Calculate()
{
    var s0 = eval(document.isForm.s0.value);
	var K = eval(document.isForm.K.value);
	var r = eval(document.isForm.r.value);
	var s = eval(document.isForm.s.value);    
    var T = eval(document.isForm.T.value);
    var H = eval(document.isForm.H.value);    
    var OptionType = document.isForm.OptionType.selectedIndex;
    
    var n = eval(document.isForm.n.value);
    var p = eval(document.isForm.p.value);
    
	var counter = 0;

    if(H > s0){  // Up-and-X options
        if(OptionType == 0){
        	for(var j=1 ; j<=p ; j++){
	                var path = new Pathgen(s0, r, s, T, n);  // 每次呼叫 generate 並不會去跑一個新 path 出來，所以只好不斷 new 和 delete
        		path.Generate();
        		counter += Math.exp(-r*T)*Math.max(path.Terminal() - K, 0)*(Boole(path.Max() < H) - Boole(Math.max(path.Half(), path.Terminal()) < H));
        		delete path;
        	}
        	document.isForm.OptionValue.value = (counter/p) + UOcall(s0, K, r, s, T, H, Math.floor(n/2)*T/n);
       	}
        if(OptionType == 1){
        	for(var j=1 ; j<=p ; j++){
	                var path = new Pathgen(s0, r, s, T, n);  // 每次呼叫 generate 並不會去跑一個新 path 出來，所以只好不斷 new 和 delete
        		path.Generate();
        		counter += Math.exp(-r*T)*Math.max(K - path.Terminal(), 0)*(Boole(path.Max() < H) - Boole(Math.max(path.Half(), path.Terminal()) < H));
        		delete path;
        	}
        	document.isForm.OptionValue.value = (counter/p) + UOput(s0, K, r, s, T, H, Math.floor(n/2)*T/n);
       	}
        if(OptionType == 2){
        	for(var j=1 ; j<=p ; j++){
	                var path = new Pathgen(s0, r, s, T, n);  // 每次呼叫 generate 並不會去跑一個新 path 出來，所以只好不斷 new 和 delete
        		path.Generate();
        		counter += Math.exp(-r*T)*Math.max(path.Terminal() - K, 0)*(Boole(path.Max() >= H) - Boole(Math.max(path.Half(), path.Terminal()) >= H));
        		delete path;
        	}
        	document.isForm.OptionValue.value = (counter/p) + UIcall(s0, K, r, s, T, H, Math.floor(n/2)*T/n);
       	}
        if(OptionType == 3){
        	for(var j=1 ; j<=p ; j++){
	                var path = new Pathgen(s0, r, s, T, n);  // 每次呼叫 generate 並不會去跑一個新 path 出來，所以只好不斷 new 和 delete
        		path.Generate();
        		counter += Math.exp(-r*T)*Math.max(K - path.Terminal(), 0)*(Boole(path.Max() >= H) - Boole(Math.max(path.Half(), path.Terminal()) >= H));
        		delete path;
        	}
        	document.isForm.OptionValue.value = (counter/p) + UIput(s0, K, r, s, T, H, Math.floor(n/2)*T/n);
       	}
    }else{      // Down-and-X options
        if(OptionType == 0){
        	for(var j=1 ; j<=p ; j++){
	                var path = new Pathgen(s0, r, s, T, n);  // 每次呼叫 generate 並不會去跑一個新 path 出來，所以只好不斷 new 和 delete
        		path.Generate();
        		counter += Math.exp(-r*T)*Math.max(path.Terminal() - K, 0)*(Boole(path.Min() > H) - Boole(Math.min(path.Half(), path.Terminal()) > H));
        		delete path;
        	}
        	document.isForm.OptionValue.value = (counter/p) + DOcall(s0, K, r, s, T, H, Math.floor(n/2)*T/n);
       	}
        if(OptionType == 1){
        	for(var j=1 ; j<=p ; j++){
	                var path = new Pathgen(s0, r, s, T, n);  // 每次呼叫 generate 並不會去跑一個新 path 出來，所以只好不斷 new 和 delete
        		path.Generate();
        		counter += Math.exp(-r*T)*Math.max(K - path.Terminal(), 0)*(Boole(path.Min() > H) - Boole(Math.min(path.Half(), path.Terminal()) > H));
        		delete path;
        	}
        	document.isForm.OptionValue.value = (counter/p) + DOput(s0, K, r, s, T, H, Math.floor(n/2)*T/n);
       	}
        if(OptionType == 2){
        	for(var j=1 ; j<=p ; j++){
	                var path = new Pathgen(s0, r, s, T, n);  // 每次呼叫 generate 並不會去跑一個新 path 出來，所以只好不斷 new 和 delete
        		path.Generate();
        		counter += Math.exp(-r*T)*Math.max(path.Terminal() - K, 0)*(Boole(path.Min() <= H) - Boole(Math.min(path.Half(), path.Terminal()) <= H));
        		delete path;
        	}
        	document.isForm.OptionValue.value = (counter/p) + DIcall(s0, K, r, s, T, H, Math.floor(n/2)*T/n);
       	}
        if(OptionType == 3){
        	for(var j=1 ; j<=p ; j++){
	                var path = new Pathgen(s0, r, s, T, n);  // 每次呼叫 generate 並不會去跑一個新 path 出來，所以只好不斷 new 和 delete
        		path.Generate();
        		counter += Math.exp(-r*T)*Math.max(K - path.Terminal(), 0)*(Boole(path.Min() <= H) - Boole(Math.min(path.Half(), path.Terminal()) <= H));
        		delete path;
        	}
        	document.isForm.OptionValue.value = (counter/p) + DIput(s0, K, r, s, T, H, Math.floor(n/2)*T/n);
       	}
    }
}

function Reset(){
    document.isForm.s0.value="100";
    document.isForm.K.value="120";
    document.isForm.T.value="1";
    document.isForm.r.value="0.1";
    document.isForm.s.value="0.3";    
    document.isForm.H.value="90";    
    document.isForm.n.value="4";
    document.isForm.p.value="100000";
    
    document.isForm.OptionType.selectedIndex = "0";
    
    document.isForm.OptionValue.value="";
}
