var conv = function(aaa, bbb){
    var n = aaa.length;
    var tmp1 = fft(r2c(pad(aaa)));
    var tmp2 = fft(r2c(pad(bbb)));
    
    for(var i=0 ; i<2*n ; i++)  
        tmp1[i] = tmp1[i].mult(tmp2[i]);
    
    tmp1 = c2r(ifft(tmp1));
    for(var i=0 ; i<2*n ; i++)  
        tmp1[i] = tmp1[i]/(2*n);

    return tmp1;    
}

var pad = function(aaa){
    var ccc = [];           // copy the whole array or the original array will be changed. 
    var n = aaa.length;
    
    for(var i=0 ; i<n ; i++)   
        ccc.push(aaa[i]);
    for(var i=0 ; i<n ; i++)   
        ccc.push(0);
    return ccc;    
}

var c2r = function(aaa){ 
    var r = new Array(aaa.length);
    for(var i=0 ; i<aaa.length ; i++)   
        r[i] = aaa[i].re();
    return r;
}
var r2c = function(aaa){    // input an array of real numbers, output an array of complex numbers
    var c = [];
    for(var i=0 ; i<aaa.length ; i++)   
        c.push(new ComplexNumber(aaa[i], 0));
    return c;  
}

var fft = function(aaa){    //input an array of 2^n complex numbers

    var bbb = aaa;        
    var n = bbb.length;
    var even = [];
    var odd = [];
    var result = [];

    if(n == 1){
        return bbb;
    }else{
        for(var i=0 ; i<=n-1 ; i+=2){
            even.push(bbb[i]);
            odd.push(bbb[i+1]);
        }
        even = fft(even);
        odd = fft(odd);
        
        for( i=0 ; i<n/2 ; i++ )    result.push(even[i].add(odd[i].mult(Math.cos(2*Math.PI*i/n), Math.sin(2*Math.PI*i/n))));
        for( i=0 ; i<n/2 ; i++ )    result.push(even[i].sub(odd[i].mult(Math.cos(2*Math.PI*i/n), Math.sin(2*Math.PI*i/n))));
        return result;
    }
}

var ifft = function(aaa){    //input an array of 2^n complex numbers

    var bbb = aaa;        
    var n = bbb.length;
    var even = [];
    var odd = [];
    var result = [];

    if(n == 1){
        return bbb;
    }else{
        for(var i=0 ; i<=n-1 ; i+=2){
            even.push(bbb[i]);
            odd.push(bbb[i+1]);
        }
        even = ifft(even);
        odd = ifft(odd);
        
        for( i=0 ; i<n/2 ; i++ )    result.push(even[i].add(odd[i].mult(Math.cos(2*Math.PI*i/n), Math.sin(-2*Math.PI*i/n))));
        for( i=0 ; i<n/2 ; i++ )    result.push(even[i].sub(odd[i].mult(Math.cos(2*Math.PI*i/n), Math.sin(-2*Math.PI*i/n))));
        return result;
    }
}

var frft = function(aaa, alpha){    //input an array of 2^n complex numbers

    var bbb = aaa;
    var n = bbb.length;
    var zzz = [];
    
    for(var i=0 ; i<n ; i++ )
        bbb[i] = bbb[i].mult(Math.cos(Math.PI*i*i*alpha), Math.sin(Math.PI*i*i*alpha));    
    for(var i=0 ; i<n ; i++ )
        bbb.push(new ComplexNumber(0, 0));
        

    for(var i=0 ; i<=n-1 ; i++ )
        zzz.push(new ComplexNumber(Math.cos(Math.PI*i*i*alpha), -Math.sin(Math.PI*i*i*alpha)));
    for(var i=n ; i>=1 ; i-- )
        zzz.push(new ComplexNumber(Math.cos(Math.PI*i*i*alpha), -Math.sin(Math.PI*i*i*alpha)));

    var tmp2 = fft(zzz);
    var tmp1 = fft(bbb);

    for(var i=0 ; i<2*n ; i++)  
        tmp1[i] = tmp1[i].mult(tmp2[i]);

    tmp1 = ifft(tmp1).slice(0, n);      // get n elements starting from 0
    for(var i=0 ; i<n ; i++ )
        tmp1[i] = tmp1[i].mult(Math.cos(Math.PI*i*i*alpha)/(2*n), Math.sin(Math.PI*i*i*alpha)/(2*n));
    
    return tmp1;
}

var getpdf = function(  a, h, m,    // grid for pdf, #gridpts = m+1
                        c, k,       // grid for chf
                        chf         // the input function should output a complex
                        ){          // given the above information, output the grid function of the pdf as a list
    var aaa = [];
    
    for( var i=0 ; i<=m ; i++ )     // 目前這樣寫，chf 一定得回傳複數
        aaa.push(chf(c+i*k).mult(Math.cos(i*k*a), -Math.sin(i*k*a)));

    aaa = frft(aaa, -k*h/(2*Math.PI));
    
    for( var i=0 ; i<=m ; i++ )     
        aaa[i] = aaa[i].mult(Math.cos(c*(a+i*h))*k/(2*Math.PI), -Math.sin(c*(a+i*h))*k/(2*Math.PI));
                        
    return c2r(aaa);
}
