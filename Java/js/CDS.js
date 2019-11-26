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
	    var dp=new Array(6);
    	dp[1]=eval(document.isForm.dp1.value);
    	dp[2]=eval(document.isForm.dp2.value);
    	dp[3]=eval(document.isForm.dp3.value);
    	dp[4]=eval(document.isForm.dp4.value);
    	dp[5]=eval(document.isForm.dp5.value);


        var zb=new Array(6);// zero coupon bond price
        var SurvivalProb=new Array(6);// zero coupon bond price
        var SumPayment=0;
        var SumPayoff=0;
        var SumAccrualPayment=0;
        var TotalDefaultProb=0;
        var CDSspread=0;


        
        for (var i=1;i<=5;i++)
        {
            zb[i]=Math.exp(-r*i);

            TotalDefaultProb=TotalDefaultProb+dp[i];
            SurvivalProb[i]=1-TotalDefaultProb;

            SumPayment=SumPayment+SurvivalProb[i]*zb[i];
            SumPayoff=SumPayoff+dp[i]*(1-R)*Math.exp((i-0.5)*(-r));
            SumAccrualPayment=SumAccrualPayment+0.5*dp[i]*Math.exp((i-0.5)*(-r));
            
            
        
        }
        CDSspread=SumPayoff/(SumPayment+SumAccrualPayment);                                        
        document.isForm.CDSspread.value=CDSspread.toPrecision(3);  

        
   
	}
 	function Reset()
        {
                document.isForm.R.value="0.4";
                document.isForm.r.value="5";
                document.isForm.dp1.value="0.02";
                document.isForm.dp2.value="0.0196";
                document.isForm.dp3.value="0.0192";
                document.isForm.dp4.value="0.0188";
                document.isForm.dp5.value="0.0184";

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
