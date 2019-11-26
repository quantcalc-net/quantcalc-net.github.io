// JavaScript Document
 /*
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
*/

function Calculate(){
    var S = eval(document.isForm.S.value);
    var X = eval(document.isForm.X.value);
    var T = eval(document.isForm.T.value);
    var r = eval(document.isForm.r.value);
    var rf = eval(document.isForm.rf.value);
    var sigma = eval(document.isForm.sigma.value);
    var H = eval(document.isForm.H.value);
    var Knock=eval(document.isForm.Knock.value);
    var K=eval(document.isForm.K.value);
    //var Phi=eval(document.isForm.Phi.value);
    //var NS=0;//var NS=eval(document.isForm.NS.value);
    //var Ni=eval(document.isForm.Ni.value);
    //var NorT=0;//var NorT=eval(document.isForm.NorT.value);
    //var DT=eval(document.isForm.DT.value);
    var DayOrClose=0;//var DayOrClose=eval(document.isForm.DayOrClose.value);
    var t1=0;
    var t2=0;
    var DigitalPay=0;
    var VorD = 0;
    var YearDay=360;

    var  BarrierCallAna ;
    var  BarrierPutAna ;

    var  A ; // intermediary variable
    var  B ; // intermediary variable
    var  C ; // intermediary variable
    var  D ; // intermediary variable
    var  EE ; // intermediary variable
    var  F ; // intermediary variable
    var  Phi; // call(1) or put(-1)
    var  Eta ; // Down(1) or Up(-1)
    //var  Knock=pa.Knock ; //in(0) or out(1)
    var  x1 ; // intermediary variable
    var  x2 ; // intermediary variable
    var  y1 ; // intermediary variable
    var  y2 ; // intermediary variable
    var  z ; // intermediary variable
    var  mu ; // intermediary variable
    var  lambda ; // intermediary variable

    
    
    var  bb;  // bb=r-rf for FX, bb=r for standard BS, bb=r-q for stock option with dividend yield q

    
    //----------------------Input from Sheet----------------------




    bb = r - rf;
    //---------------------Call Option
    Phi = 1;
    Eta = -1;
    if( S > H ){
        Eta = 1;
    }
    // ---------------------Calculation---------------------------
    mu = (bb - (sigma*sigma) / 2) / (sigma*sigma);
    lambda = Math.sqrt(mu*mu + 2 * r / (sigma*sigma));
    z = Math.log(H / S) / (sigma * Math.sqrt(T)) + lambda * sigma * Math.sqrt(T);
    x1 = Math.log(S / X) / (sigma * Math.sqrt(T)) + (1 + mu) * sigma * Math.sqrt(T);
    x2 = Math.log(S / H) / (sigma * Math.sqrt(T)) + (1 + mu) * sigma * Math.sqrt(T);
    y1 = Math.log(H*H / (S * X)) / (sigma * Math.sqrt(T)) + (1 + mu) * sigma * Math.sqrt(T);
    y2 = Math.log(H / S) / (sigma * Math.sqrt(T)) + (1 + mu) * sigma * Math.sqrt(T);


    
    
    
    A = Phi * S * Math.exp((bb - r) * T) * Ncdf(Phi * x1) - Phi * X * Math.exp((-r) * T) * Ncdf(Phi * x1 - Phi * sigma * Math.sqrt(T));
    B = Phi * S * Math.exp((bb - r) * T) * Ncdf(Phi * x2) - Phi * X * Math.exp((-r) * T) * Ncdf(Phi * x2 - Phi * sigma * Math.sqrt(T));
    C = Phi * S * Math.exp((bb - r) * T) * Math.pow(H / S,2 * (mu + 1)) * Ncdf(Eta * y1) - Phi * X * Math.exp((-r) * T) * Math.pow(H / S,2 * (mu)) * Ncdf(Eta * y1 - Eta * sigma * Math.sqrt(T));
    D = Phi * S * Math.exp((bb - r) * T) * Math.pow(H / S,2 * (mu + 1)) * Ncdf(Eta * y2) - Phi * X * Math.exp((-r) * T) * Math.pow(H / S,2 * (mu)) * Ncdf(Eta * y2 - Eta * sigma * Math.sqrt(T));
    EE = K * Math.exp(-r * T) * (Ncdf(Eta * x2 - Eta * sigma * Math.sqrt(T)) - Math.pow(H / S,2 * (mu)) * Ncdf(Eta * y2 - Eta * sigma * Math.sqrt(T)));
    F = K * (Math.pow(H / S,mu + lambda) * Ncdf(Eta * z) + Math.pow(H / S,mu - lambda) * Ncdf(Eta * z - 2 * Eta * lambda * sigma * Math.sqrt(T)));
    //--------------Knock in Options
    if( Knock < 0.5 ){  //In
        if( Eta > 0 ){ //Down
            if( X > H ){
                //Down-In X>H
                BarrierCallAna = C + EE;
                //BarrierPutAna = B - C + D + E
            }else{ //X<H
                //Down-In X<H
                BarrierCallAna = A - B + D + EE;
                //BarrierPutAna = A + E
            }
        }else{ //Up
            if( X > H ){
                //Up-In X>H
                BarrierCallAna = A + EE;
                //BarrierPutAna = A - B + D + E
            }else{ //X<H
                //Up-In X<H
                BarrierCallAna = B - C + D + E;
                //BarrierPutAna = C + E
            }
            
        }
    }else{ //Out
        if( Eta > 0 ){ //Down
            if( X > H ){
                //Down-Out X>H
                BarrierCallAna = A - C + F;
                //BarrierPutAna = A - B + C - D + F
            }else{ //X<H
                //Down-Out X<H
                BarrierCallAna = B - D + F;
                //BarrierPutAna = F
            }
        }else{ //Up
            if( X > H ){
                //Up-Out X>H
                BarrierCallAna = F;
                //BarrierPutAna = B - D + F
            }else{ //X<H
                //Up-Out X<H
                BarrierCallAna = A - B + C - D + F;
                //BarrierPutAna = A - C + F
            }
            
        }
    }
    //----------------------For Put
    Phi = -1;
    //Eta = -1
    //if( S > H ){
        //Eta = 1
    //}
    // ---------------------Calculation---------------------------
    //mu = (bb - (sigma*sigma) / 2) / (sigma*sigma)
    //lambda = Math.sqrt(mu*mu + 2 * r / (sigma*sigma))
    //z = Math.log(H / S) / (sigma * Math.sqrt(T)) + lambda * sigma * Math.sqrt(T)
    //x1 = Math.log(S / X) / (sigma * Math.sqrt(T)) + (1 + mu) * sigma * Math.sqrt(T)
    //x2 = Math.log(S / H) / (sigma * Math.sqrt(T)) + (1 + mu) * sigma * Math.sqrt(T)
    //y1 = Math.log(H ^ 2 / (S * X)) / (sigma * Math.sqrt(T)) + (1 + mu) * sigma * Math.sqrt(T)
    //y2 = Math.log(H / S) / (sigma * Math.sqrt(T)) + (1 + mu) * sigma * Math.sqrt(T)


    
    
    
    A = Phi * S * Math.exp((bb - r) * T) * Ncdf(Phi * x1) - Phi * X * Math.exp((-r) * T) * Ncdf(Phi * x1 - Phi * sigma * Math.sqrt(T));
    B = Phi * S * Math.exp((bb - r) * T) * Ncdf(Phi * x2) - Phi * X * Math.exp((-r) * T) * Ncdf(Phi * x2 - Phi * sigma * Math.sqrt(T));
    C = Phi * S * Math.exp((bb - r) * T) * Math.pow(H / S,2 * (mu + 1)) * Ncdf(Eta * y1) - Phi * X * Math.exp((-r) * T) * Math.pow(H / S,2 * (mu)) * Ncdf(Eta * y1 - Eta * sigma * Math.sqrt(T));
    D = Phi * S * Math.exp((bb - r) * T) * Math.pow(H / S,2 * (mu + 1)) * Ncdf(Eta * y2) - Phi * X * Math.exp((-r) * T) * Math.pow(H / S,2 * (mu)) * Ncdf(Eta * y2 - Eta * sigma * Math.sqrt(T));
    EE = K * Math.exp(-r * T) * (Ncdf(Eta * x2 - Eta * sigma * Math.sqrt(T)) - Math.pow(H / S,2 * (mu)) * Ncdf(Eta * y2 - Eta * sigma * Math.sqrt(T)));
    F = K * (Math.pow(H / S,mu + lambda) * Ncdf(Eta * z) + Math.pow(H / S,mu - lambda) * Ncdf(Eta * z - 2 * Eta * lambda * sigma * Math.sqrt(T)));
    //--------------Knock in Options
    if( Knock < 0.5 ){  //In
        if( Eta > 0 ){ //Down
            if( X > H ){
                //Down-In X>H
                //BarrierCallAna = C + E
                BarrierPutAna = B - C + D + EE;
            }else{ //X<H
                //Down-In X<H
                //BarrierCallAna = A - B + D + E
                BarrierPutAna = A + EE;
            }
        }else{ //Up
            if( X > H ){
                //Up-In X>H
                //BarrierCallAna = A + E
                BarrierPutAna = A - B + D + EE;
            }else{ //X<H
                //Up-In X<H
                //BarrierCallAna = B - C + D + E
                BarrierPutAna = C + EE;
            }
            
        }
    }else{ //Out
        if( Eta > 0 ){ //Down
            if( X > H ){
                //Down-Out X>H
                //BarrierCallAna = A - C + F
                BarrierPutAna = A - B + C - D + F;
            }else{ //X<H
                //Down-Out X<H
                //BarrierCallAna = B - D + F
                BarrierPutAna = F;
            }
        }else{ //Up
            if( X > H ){
                //Up-Out X>H
                //BarrierCallAna = F
                BarrierPutAna = B - D + F;
            }else{ //X<H
                //Up-Out X<H
                //BarrierCallAna = A - B + C - D + F
                BarrierPutAna = A - C + F;
            }
            
        }
    }


		document.isForm.priceCall.value = BarrierCallAna.toFixed(2);

		document.isForm.pricePut.value = BarrierPutAna.toFixed(2);
	    
    

 	
 	
}

function Ncdf(x){   // see John Hull, absolute error < 7.5e-8
    var L;
    var K;
    var w;

    var a1 = 0.31938153; 
    var a2 = -0.356563782;
    var a3 = 1.781477937;
    var a4 = -1.821255978;
    var a5 = 1.330274429;
    
    L = Math.abs(x);
    K = 1.0 / (1.0 + 0.2316419 * L);
    w = 1.0 - 1.0 / Math.sqrt(2 * Math.PI) * Math.exp(-L*L / 2) * (K*(a1 + K *(a2 +K*( a3 +K*(a4+a5*K)))));

    if ( x < 0 ) w = 1.0 - w;

    return w;
}

function Reset(){

    //document.isForm.NS.value="1000";
    //document.isForm.Ni.value="100";
    document.isForm.S.value="95";
    document.isForm.X.value="100";    
    document.isForm.T.value="1";
    document.isForm.r.value="0.1";
    document.isForm.rf.value="0";    
    document.isForm.sigma.value="0.25";
    document.isForm.H.value="90";
    document.isForm.K.value="20";
    document.isForm.Knock.value="1";
    //document.isForm.Phi.value="1";
    //document.isForm.NorT.value="0";
    //document.isForm.DT.value="0";
    //document.isForm.DayOrClose.value="0";
    document.isForm.priceCall.value="";
    document.isForm.pricePut.value="";
}
