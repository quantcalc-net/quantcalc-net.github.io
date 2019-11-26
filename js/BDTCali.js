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
    var S= new Array(4);
    var k= new Array(4);
    var P= new Array(4);
	var Pu= new Array(3);
	var Pd= new Array(3);
	var r= new Array(4);
	var v= new Array(4);
    S[1] = eval(document.isForm.S1.value);
    S[2] = eval(document.isForm.S2.value);
    S[3] = eval(document.isForm.S3.value);
    k[1] = eval(document.isForm.k1.value);
    k[2] = eval(document.isForm.k2.value);
    k[3] = eval(document.isForm.k3.value);
    var BC=new BDTCali();


    var vvoid=BC.Calibration(3,S,k,P,Pu,Pd,r,v);



    document.isForm.r1.value =r[1]*Math.pow(v[1],0); 
    document.isForm.r20.value =r[2]*Math.pow(v[2],0); 
    document.isForm.r21.value =r[2]*Math.pow(v[2],1); 
    document.isForm.r30.value =r[3]*Math.pow(v[3],0); 
    document.isForm.r31.value =r[3]*Math.pow(v[3],1); 
    document.isForm.r32.value =r[3]*Math.pow(v[3],2);    
 	
 	delete BC;
 	delete S;
 	delete k;
 	delete P;
 	delete Pu;
 	delete Pd;
 	delete r;
 	delete v;
 	
}



function Reset(){

    document.isForm.S1.value="0.10";
    document.isForm.S2.value="0.11";
    document.isForm.S3.value="0.12";
    document.isForm.k1.value="0.20";
    document.isForm.k2.value="0.19";
    document.isForm.k3.value="0.18";
    document.isForm.r1.value="";
    document.isForm.r20.value="";
    document.isForm.r21.value=" ";
    document.isForm.r30.value=" ";
    document.isForm.r31.value=" ";
    document.isForm.r32.value=" ";

}
