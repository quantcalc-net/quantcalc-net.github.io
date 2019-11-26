function RNG(){
    this.GetNormal = function(){
    	var u1 = Math.random();
    	var u2 = Math.random();
        return Math.sqrt(-2*Math.log(u1))*Math.cos(2*Math.PI*u2);
    }
    this.GetPoisson = function( lambda ){
        var i = 0; 
        var p = Math.exp(-lambda);
        var F = p;
        var u = Math.random();
        
        while( u > F ){
            i++;
            p = p*lambda/i;
            F += p;
        }
        return i;
    }
}

function Pathgen( s0, r, T, n ){
    var logS = new Array(n+1);
    var i;
        
    this.Generate = function( s ){
        var dt = T/n;
        logS[0] = Math.log(s0);
        var u = new RNG();

        for(i=1 ; i<=n ; i++)   
            logS[i] = logS[i-1] + ((r-s*s/2)*dt + s*Math.sqrt(dt)*u.GetNormal())
    }
    this.GenerateJD = function( s, lambda, alpha, beta ){
        logS[0] = Math.log(s0);
        var u = new RNG();
        
        // 還沒改過，目前得到的 path 還是 gbm
        for(i=1 ; i<=n ; i++)
            logS[i] = logS[i-1] + ((r-s*s/2)*dt + s*Math.sqrt(dt)*u.GetNormal())
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
    this.Half = function(){ return Math.exp(logS[Math.floor(n/2)]); }
    this.Terminal = function(){ return Math.exp(logS[n]); }
}
