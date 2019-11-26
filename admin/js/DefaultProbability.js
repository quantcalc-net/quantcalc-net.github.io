// JavaScript Document
var message="Sorry!"; // Your no right click message here
var closeWin="0"; // Do you want to close window after message (1 for yes 0 for no)

function IE(e) 
{
     if (navigator.appName == 'Microsoft Internet Explorer' && (event.button == 2 || event.button == 3))
     {
          alert(message); if(closeWin=="1") self.close();
          return false;
     }
}
function NS(e) 
{
     if (document.layers || (document.getElementById && !document.all))
     {
          if (e.which==2 || e.which==3)
          {
               alert(message); if(closeWin=="1") self.close();
               return false;
          }
     }
}
document.onmousedown=IE;document.onmouseup=NS;document.oncontextmenu=new Function("return false");



	function Calculate()
	{
	    var R=eval(document.isForm.R.value);
	    var r=eval(document.isForm.r.value)/100;
	    var sp=new Array(6);
    	sp[1]=eval(document.isForm.sp1.value);
    	sp[2]=eval(document.isForm.sp2.value);
    	sp[3]=eval(document.isForm.sp3.value);
    	sp[4]=eval(document.isForm.sp4.value);
    	sp[5]=eval(document.isForm.sp5.value);

        var p=new Array(6);// don't use p[0]
        var zb=new Array(6);// zero coupon bond price
        var cb=new Array(6);// corporate bond price
        var loss=new Array(6);// loss when default occurs
        var sum=0;
        p[0]=0;
        loss[0]=0;
        
        for (var i=1;i<=5;i++)
        {
            zb[i]=Math.exp(-r*i);
            cb[i]=Math.exp(-(r+sp[i]/10000)*i);
            loss[i]=zb[i]*(1-R);
            sum=sum+p[i-1]*loss[i-1];
            p[i]=(zb[i]-cb[i]-sum)/loss[i];
        
        }
                                        
        document.isForm.dp1.value=p[1].toPrecision(4);  
        document.isForm.dp2.value=p[2].toPrecision(4);
        document.isForm.dp3.value=p[3].toPrecision(4);
        document.isForm.dp4.value=p[4].toPrecision(4);
        document.isForm.dp5.value=p[5].toPrecision(4);
        
   
	}
 	function Reset()
        {
                document.isForm.R.value="0.4";
                document.isForm.r.value="6";
                document.isForm.sp1.value="10";
                document.isForm.sp2.value="11";
                document.isForm.sp3.value="12";
                document.isForm.sp4.value="13";
                document.isForm.sp5.value="14";

        }
       	function NormalCDF(x)
        {
		var L;
        var K;
        var w;
		/* absolute error  < 7.5e-8 */   
	    var a1 = 0.31938153; 
        var a2 = -0.356563782;
        var a3 = 1.781477937;
		var a4 = -1.821255978;
        var a5 = 1.330274429;
		L = Math.abs(x);
		K = 1.0 / (1.0 + 0.2316419 * L);
		w = 1.0 - 1.0 / Math.sqrt(2 * Math.PI) * Math.exp(-L *L / 2) * (K*(a1 + K *(a2 +K*( a3 +K*(a4+a5*K)))));
		if (x < 0 )
		{     
			  w= 1.0 - w;
		}   
		return (w);
        }
