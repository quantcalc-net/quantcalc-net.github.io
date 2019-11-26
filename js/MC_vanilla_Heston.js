// JavaScript Document
var message="Sorry!"; // Your no right click message here
var closeWin="0"; // Do you want to close window after message (1 for yes 0 for no)

 function IE(e){
     if (navigator.appName == 'Microsoft Internet Math.explorer' && (event.button == 2 || event.button == 3)){
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
 
// Generate a Normal random variable
function RNG(){
    this.GetNormal = function(){
    	var u1 = Math.random();
    	var u2 = Math.random();
        return Math.sqrt(-2*Math.log(u1))*Math.cos(2*Math.PI*u2);
    }
}

function Ncdf(x){
        var L, K, w;
        /* absolute error  < 7.5e-8 */  
        var a1 = 0.31938153; 
        var a2 = -0.356563782;
        var a3 = 1.781477937;
        var a4 = -1.821255978;
        var a5 = 1.330274429;
        L = Math.abs(x);
        K = 1.0 / (1.0 + 0.2316419 * L);
        w = 1.0 - 1.0 / Math.sqrt(2 * Math.PI) * Math.exp(-L *L / 2.0) * (K*(a1 + K *(a2 +K*( a3 +K*(a4+a5*K)))));
        if (x < 0 )
        {     
              w= 1.0 - w;
        }   
        return w;
}


function g( r, t, s, K, v, T){
	var d1 = (Math.log(s/K) + (r + v/2.0)*(T-t) )/(Math.sqrt(v*(T-t)));
	return Math.exp(-r*t)*( s*Ncdf(d1)-K*Math.exp(-r*(T-t))*Ncdf(d1-Math.sqrt(v*(T-t))) );
}
function gx( r, t, s, K, v, T){
	var d1 = (Math.log(s/K) + (r + v/2.0)*(T-t) )/(Math.sqrt(v*(T-t)));
	return Math.exp(-r*t)*Ncdf(d1);
}
function gy( r, t, s, K, v, T){
	var d1 = (Math.log(s/K) + (r + v/2.0)*(T-t) )/(Math.sqrt(v*(T-t)));
	return Math.exp(-r*t)*(s*Ncdf(d1)*Math.sqrt((T-t)))/(2*Math.sqrt(v));
}
function theta1(r, t, s, K, v, T, sigma, rho){
	var gxvalue = -gx(r, t, s, K, v, T)*s*Math.sqrt(v) ;
	var gyvalue = -gy(r, t, s, K, v, T)*sigma*rho*Math.sqrt(v) ;
	var gvalue = g(r, t, s, K, v, T);

	//return (-gx(r, t, s, K, v, T)*s*Math.sqrt(v) - gy(r, t, s, K, v, T)*sigma*rho*Math.sqrt(v) )/g(r, t, s, K, v, T);
	return (gxvalue + gyvalue)/gvalue;
}
function theta2( r, t, s, K, v, T, sigma, rho){
	return (-gy(r, t, s, K, v, T)*sigma*Math.sqrt(1.0 - rho*rho)*Math.sqrt(v) )/ g(r, t, s, K, v, T) ;
}



function thetaBS(r, t, sBS, K, sigmaS, T){
	return (-gx(r, t, sBS, K, sigmaS*sigmaS, T)*sBS*sigmaS) /g(r, t, sBS, K, sigmaS*sigmaS, T);
}



function CallIS( b, alpha, sigma, s0, K, r, v0, T, rho, n, m){
	//clock_t start;
	//var duration;
	//start = clock();

    var CallValue;
    var var_payoff;
	CallValue = 0.0;
	var_payoff= 0.0;

	var z1 = new RNG();

    for(var j = 1; j <= m; j++){
	   var s, v, tempTheta1, tempTheta2, Q, payoff, tempmean;
	   s=s0;
	   v=v0;
	   Q=1.0;
	   for( var i = 1; i <= n; i++){
		   tempTheta1 = theta1(r, (T *(i - 1))/n, s, K, v, T, sigma, rho);
		   tempTheta2 = theta2(r, (T *(i - 1))/n, s, K, v, T, sigma, rho);
		   
		   tmp1 = z1.GetNormal();
		   tmp2 = z1.GetNormal();
		   
		   v = Math.max( v + ( alpha*(b - v) - tempTheta1*sigma*rho*Math.sqrt(v) - tempTheta2*sigma*Math.sqrt( (1.0 - rho*rho)*v) )*((T*i)/n - (T*(i - 1))/n) + sigma*Math.sqrt(v*((T*i)/n - (T*(i - 1))/n))*(rho*tmp1 + Math.sqrt(1.0 - rho*rho)*tmp2), 0.0000001 );
		   s = s*Math.exp( (r - v/2.0 - tempTheta1*Math.sqrt(v))*((T*i)/n - (T*(i - 1))/n) + Math.sqrt(v*( (T*i)/n - (T*(i - 1))/n))*tmp1 );
		   Q = Q*Math.exp( tempTheta1*tmp1*Math.sqrt((T*i)/n - (T*(i - 1))/n) + tempTheta2*tmp2*Math.sqrt((T*i)/n - (T*(i - 1))/n) - tempTheta1*tempTheta1*((T*i)/n - (T*(i - 1))/n)/2.0 - tempTheta2*tempTheta2*((T*i)/n - (T*(i - 1))/n)/2.0 );
	   }
	   payoff = Math.exp(-r*T)*Q*Math.max(0.0, s-K);
	   tempmean = CallValue;
	   CallValue =  CallValue + (payoff-CallValue)/j;
	   //alert(CallValue);
	   if (j==1){ 
		   var_payoff =  0.0;
	   }
	   else{
		   var_payoff = (1.0-1.0/(j-1))*var_payoff + (CallValue- tempmean)*(CallValue- tempmean)*j;
	   }
	};

   //duration = (clock() - start) / (var) CLOCKS_PER_SEC;

	// cout << CallValue <<",  " << Math.sqrt(var_payoff)<< ",  " <<  Math.sqrt(var_payoff /m) << ",  " << CallValue - 1.96*Math.sqrt(var_payoff /m) << ",  "<< CallValue + 1.96*Math.sqrt(var_payoff /m) << ",  "<< duration << endl;

    return CallValue;

}




function Calculate(){
    var s0 = eval(document.isForm.s0.value);
    var v0 = eval(document.isForm.v0.value);
    var b = eval(document.isForm.b.value); //theta
    var alpha = eval(document.isForm.alpha.value);//ki
    var sigma = eval(document.isForm.sigma.value);
    var K = eval(document.isForm.K.value);
    var T = eval(document.isForm.T.value);
    var r = eval(document.isForm.r.value);
    var rho = eval(document.isForm.rho.value);
    var n = eval(document.isForm.n.value);
    var m = eval(document.isForm.m.value);
    

    document.isForm.c.value = CallIS( b, alpha, sigma, s0, K, r, v0, T, rho, n, m);

    
    /*
	var counter = 0;
    var tmp;
	
	for(j=1 ; j<=p ; j++){
        var path = new Pathgen(s0, r, sigma, T, n); // 每次呼叫 generate 並不會去跑一個新 path 出來，所以只好不斷 new 和 delete
		path.Generate();
		counter += Math.Math.exp(-r*T)*(path.Terminal() - path.Min());
		delete path;
	}
	document.isForm.c.value = (counter/p);
    */
}


function Reset(){

    document.isForm.s0.value="50";
    document.isForm.v0.value="0.04";
    document.isForm.b.value="0.03";
    document.isForm.alpha.value="0.001";
    document.isForm.sigma.value="0.01";
    document.isForm.K.value="50";
    document.isForm.T.value="1";
    document.isForm.r.value="0.1";
    document.isForm.rho.value="0.0";
    document.isForm.n.value="50";
    document.isForm.m.value="4000";
   	document.isForm.c.value ="";
}




