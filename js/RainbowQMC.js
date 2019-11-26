// JavaScript Document
//-------We expect to solve Ut=Cx1(Ux)+Cx2(Uxx)+Cu(U)+f 
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
    var s1 = eval(document.isForm.s1.value);
    var s2 = eval(document.isForm.s2.value);
    var K = eval(document.isForm.K.value);
    var T = eval(document.isForm.T.value);
    var r = eval(document.isForm.r.value);
    var si1 = eval(document.isForm.si1.value);
    var si2 = eval(document.isForm.si2.value);
    var Length=10000;
    var s1Array= new Array(Length);
    var s2Array= new Array(Length);
    var QMCC= new QMC();
    var sum=0;
    s12Array=QMCC.NormalHaltonSeq(Length);


    for (var i=0;i<Length;i++)
    {
        s1Array[i]=s1*Math.exp(s12Array[i]*si1*Math.sqrt(T)+(r-0.5*si1*si1)*T);
        s2Array[i]=s2*Math.exp(s12Array[i+Length]*si2*Math.sqrt(T)+(r-0.5*si2*si2)*T);
        sum=sum+Math.max(Math.min(s1Array[i],s2Array[i])-K,0);//
        
    }
    document.isForm.c.value =Math.exp(-r*T)*sum/Length; 
 	
 	delete QMCC;
}



function Reset(){

    document.isForm.s1.value="100";
    document.isForm.s2.value="100";
    document.isForm.K.value="100";
    document.isForm.T.value="1";
    document.isForm.r.value="0.1";
    document.isForm.si1.value="0.1";
    document.isForm.si2.value="0.1";
    document.isForm.c.value=" ";
}
