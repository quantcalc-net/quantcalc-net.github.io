function Nodes( s0, K, T, r, s, n ){
    var calloption = new Array(n+1);
    var dt = T/n;
    var u = Math.exp(s*Math.sqrt(dt));
    var d = 1/u;
    var p = (Math.exp(r*dt)-d)/(u-d);

    for( i=0 ; i<=n ; i++ ){
        calloption[i] = Math.max(s0*Math.pow(u, n-i)*Math.pow(d, i) - K, 0);
    }
    this.TreeBackwardInd = function(){
        for( i=0 ; i<=n-1 ; i++ )
            calloption[i] = Math.exp(-r*dt)*(p*calloption[i] + (1-p)*calloption[i+1]);
    }
    this.PPrint = function(){
        alert(calloption[0]);
    }
}

//function Calculate(){
//    var s0 = eval(document.isForm.s0.value);
//    var K = eval(document.isForm.K.value);
//    var T = eval(document.isForm.T.value);
//    var r = eval(document.isForm.r.value);
//    var s = eval(document.isForm.s.value);
//    
//    var crr = new Notes( s0, K, T, r, s, 1000 );
//    for( j=0 ; j<n ; j++ )
//        crr.TreeBackwardInd();
//    crr.PPrint();
//}
