// JavaScript Document

function NcdfDouble(x){   // Hart's algorithm
	var a1 = 0.0352624965998911;
	var a2 = 0.700383064443688;
	var a3 = 6.37396220353165;
	var a4 = 33.912866078383;
	var a5 = 112.079291497871;
	var a6 = 221.213596169931;
	var a7 = 220.206867912376;
	
	var b1 = 0.0883883476483184;
	var b2 = 1.75566716318264;
	var b3 = 16.064177579207;
	var b4 = 86.7807322029461;
	var b5 = 296.564248779674;
	var b6 = 637.333633378831;
	var b7 = 793.826512519948;
	var b8 = 440.413735824752;

	var y = Math.abs(x);
	var A = ((((((a1*y+a2)*y+a3)*y+a4)*y+a5)*y+a6)*y+a7);
	var B = (((((((b1*y+b2)*y+b3)*y+b4)*y+b5)*y+b6)*y+b7)*y+b8);
	var C = y + 1/(y+2/(y+3/(y+4/(y+0.65))));
	var tmp;

	if(y > 37)	
		tmp = 0;
	else if(y >= 7.07106781186547)
		tmp = Math.exp(-0.5*y*y)/(2.506628274631*C);
	else
		tmp = Math.exp(-0.5*y*y)*A/B;

	return (x>0)?(1.0-tmp):tmp;
}

function Ncdf1D(x){   // see John Hull, absolute error < 7.5e-8
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

function sign(x){
    if( x>0 ) return 1;
    if( x<0 ) return -1;
    if( x=0 ) return 0;
}

function Ncdf2D(a, b, rho){   // see John Hull
    function N(x){
        var l;
        var K;
        var w;

        var a1 = 0.31938153; 
        var a2 = -0.356563782;
        var a3 = 1.781477937;
        var a4 = -1.821255978;
        var a5 = 1.330274429;
    
        l = Math.abs(x);
        K = 1.0 / (1.0 + 0.2316419 * l);
        w = 1.0 - 1.0 / Math.sqrt(2 * Math.PI) * Math.exp(-l*l / 2) * (K*(a1 + K *(a2 +K*( a3 +K*(a4+a5*K)))));

        if ( x < 0 ) w = 1.0 - w;

        return w;    
    };
    function L(a, b, rho){
        var aa = a / Math.sqrt(2*(1 - rho*rho));
        var bb = b / Math.sqrt(2*(1 - rho*rho));
        var x = new Array(0.24840615, 0.39233107, 0.21141819, 0.03324666, 0.00082485334);
        var y = new Array(0.10024215, 0.48281397, 1.0609498, 1.7797294, 2.6697604);
        var count = 0;
        
        for(var i=0 ; i<5 ; i++)
            for(var j=0 ; j<5 ; j++)
                count += x[i]*x[j]*Math.exp(aa*(2*y[i] - aa) + bb*(2*y[j] - bb) + 2*rho*(y[i] - aa)*(y[j] - bb));
        
        return Math.sqrt(1 - rho*rho)*count/Math.PI;
    };
    if(a <= 0 && b <= 0 && rho <= 0)    return L(a, b, rho);
    if(a <= 0 && b >= 0 && rho >= 0)    return -L(a, -b, -rho) + N(a);
    if(a >= 0 && b <= 0 && rho >= 0)    return -L(-a, b, -rho) + N(b);
    if(a >= 0 && b >= 0 && rho <= 0)    return -1 + L(-a, -b, rho) + N(a) + N(b);
    if(a*b*rho > 0){
        var rho1 = (rho*a - b)*sign(a)/Math.sqrt(a*a - 2*rho*a*b + b*b);
        var rho2 = (rho*b - a)*sign(b)/Math.sqrt(a*a - 2*rho*a*b + b*b);
        var delta = (1.0 - sign(a)*sign(b))/4;
        
        if( a>=0 && rho1>=0 && b>=0 && rho2>=0 )    return  (-L(-a, 0, -rho1) + 0.5) + (-L(-b, 0, -rho2) + 0.5) - delta;
        if( a>=0 && rho1>=0 && b>=0 && rho2<=0 )    return  (-L(-a, 0, -rho1) + 0.5) + (-1 + L(-b, 0, rho2) + N(b) + 0.5) - delta;
        if( a>=0 && rho1>=0 && b<=0 && rho2>=0 )    return  (-L(-a, 0, -rho1) + 0.5) + (-L(b, 0, -rho2) + N(b)) - delta;
        if( a>=0 && rho1>=0 && b<=0 && rho2<=0 )    return  (-L(-a, 0, -rho1) + 0.5) + (L(b, 0, rho2)) - delta;
        if( a>=0 && rho1<=0 && b>=0 && rho2>=0 )    return  (-1 + L(-a, 0, rho1) + N(a) + 0.5) + (-L(-b, 0, -rho2) + 0.5) - delta;
        if( a>=0 && rho1<=0 && b>=0 && rho2<=0 )    return  (-1 + L(-a, 0, rho1) + N(a) + 0.5) + (-1 + L(-b, 0, rho2) + N(b) + 0.5) - delta;
        if( a>=0 && rho1<=0 && b<=0 && rho2>=0 )    return  (-1 + L(-a, 0, rho1) + N(a) + 0.5) + (-L(b, 0, -rho2) + N(b)) - delta;
        if( a>=0 && rho1<=0 && b<=0 && rho2<=0 )    return  (-1 + L(-a, 0, rho1) + N(a) + 0.5) + (L(b, 0, rho2)) - delta;
        if( a<=0 && rho1>=0 && b>=0 && rho2>=0 )    return  (-L(a, 0, -rho1) + N(a)) + (-L(-b, 0, -rho2) + 0.5) - delta;
        if( a<=0 && rho1>=0 && b>=0 && rho2<=0 )    return  (-L(a, 0, -rho1) + N(a)) + (-1 + L(-b, 0, rho2) + N(b) + 0.5) - delta;
        if( a<=0 && rho1>=0 && b<=0 && rho2>=0 )    return  (-L(a, 0, -rho1) + N(a)) + (-L(b, 0, -rho2) + N(b)) - delta;
        if( a<=0 && rho1>=0 && b<=0 && rho2<=0 )    return  (-L(a, 0, -rho1) + N(a)) + (L(b, 0, rho2)) - delta;
        if( a<=0 && rho1<=0 && b>=0 && rho2>=0 )    return  (L(a, 0, rho1)) + (-L(-b, 0, -rho2) + 0.5) - delta;
        if( a<=0 && rho1<=0 && b>=0 && rho2<=0 )    return  (L(a, 0, rho1)) + (-1 + L(-b, 0, rho2) + N(b) + 0.5) - delta;
        if( a<=0 && rho1<=0 && b<=0 && rho2>=0 )    return  (L(a, 0, rho1)) + (-L(b, 0, -rho2) + N(b)) - delta;
        if( a<=0 && rho1<=0 && b<=0 && rho2<=0 )    return  (L(a, 0, rho1)) + (L(b, 0, rho2)) - delta;
    }
    alert("We are in case 6. Something is wrong!!!");
    
    // 有一個很詭異的 bug，
    // 上面的 5 個 if 包含了所有的可能，所以最後一行的 alert 不應該發生。
    // 如果不定義 L() 和 N() 而直接把 L() 裡的 code 寫成 case 1 遞迴呼叫，
    // 則呼跑完 case 1 的時候 js 會當作這個 function 已經 return 了而把 a, b, rho 洗掉，
    // 就會回傳像 (a, b, rho) = (1, , ) 這種參數而跑到最後一行的 alert( case 6 )

    // 對 js 的遞迴不熟悉，只好分拆所有 cases
}



//function Ncdf2D(a, b, rho){    
//
//     這份簡潔的遞迴 code 在 c++ 或 Mathematica 可以 work，但在 js 不行，常常會跑到 case 6
//
//    if(a <= 0 && b <= 0 && rho <= 0){
//        var aa = a / Math.sqrt(2*(1 - rho*rho));
//        var bb = b / Math.sqrt(2*(1 - rho*rho));
//        var x = new Array(0.24840615, 0.39233107, 0.21141819, 0.03324666, 0.00082485334);
//        var y = new Array(0.10024215, 0.48281397, 1.0609498, 1.7797294, 2.6697604);
//        var count = 0;
//        
//        for(var i=0 ; i<5 ; i++)
//            for(var j=0 ; j<5 ; j++)
//                count += x[i]*x[j]*Math.exp(aa*(2*y[i] - aa) + bb*(2*y[j] - bb) + 2*rho*(y[i] - aa)*(y[j] - bb));
//        
//        return Math.sqrt(1 - rho*rho)*count/Math.PI;
//    }
//    if(a <= 0 && b >= 0 && rho >= 0)    return -Ncdf(a, -b, -rho) + Ncdf(a);
//    if(a >= 0 && b <= 0 && rho >= 0)    return -Ncdf(-a, b, -rho) + Ncdf(b);
//    if(a >= 0 && b >= 0 && rho <= 0)    return -1 + Ncdf(-a, -b, rho) + Ncdf(a) + Ncdf(b);
//    if(a*b*rho > 0){
//        var rho1 = (rho*a - b)*sign(a)/Math.sqrt(a*a - 2*rho*a*b + b*b);
//        var rho2 = (rho*b - a)*sign(b)/Math.sqrt(a*a - 2*rho*a*b + b*b);
//        var delta = (1.0 - sign(a)*sign(b))/4;        
//        return  Ncdf(a, 0, rho1) + Ncdf(b, 0, rho2) - delta;
//    }
//    alert("We are in case 6. Something is wrong!!!");
//}
