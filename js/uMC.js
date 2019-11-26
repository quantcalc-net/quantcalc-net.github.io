function RNG(){

    this.GetNormal = function(){
       var u1 = Math.random();//Modified by Gary
	   var u2 = Math.random();//Modified by Gary
	   return Math.sqrt(-2*Math.log(u1))*Math.cos(2*Math.PI*u2);
    }
}

function Pathgen( s0, r, s, T, n ){
    var logS = new Array(n+1);
    var i;
        
    this.Generate = function(){
        var dt = T/n;
        logS[0] = Math.log(s0);
        for(i=1 ; i<=n ; i++){
            var u = new RNG();
            // C code 真接貼過來是不能用的，因為每次呼叫 u.GetNormal() 它並沒有重新跑
            // 所以只好每一迴圈都重新 new 跟 delete
            logS[i] = logS[i-1] + ((r-s*s/2)*dt + s*Math.sqrt(dt)*u.GetNormal())
            delete u;
        }
    }
    this.Max = function(){
        var m = logS[0];
        for(i=1 ; i<=n ; i++)
            if( logS[i]>m )
                m = logS[i];
        return Math.exp(m);
    }
    this.Min = function(){
    	var m = logS[0];
        for(i=1 ; i<=n ; i++)
            if( logS[i]<m )
                m = logS[i];
        return Math.exp(m);
    }
    this.Avg = function(){
        var sum = Math.exp(logS[0]);
        for(i=1 ; i<=n ; i++)  
            sum += Math.exp(logS[i]);
        return sum/(n+1);
    }
    this.GeoAvg = function(){	
        var sum = logS[0];
        for(i=1 ; i<=n ; i++)
            sum += logS[i];
        return Math.exp(sum/(n+1));
    }
    this.Terminal = function(){ return Math.exp(logS[n]); }
}
