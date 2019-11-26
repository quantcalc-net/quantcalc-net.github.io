
function QMC(){
//-------Generate Halton Sequence    
    this.Halton=function(indexx, base)
    {
       var result = 0;
       var f = 1 / base;
       var i = indexx;
       var ans= new Array(indexx);
       while (i > 0) 
       {
           result = result + f * (i % base);
           
           i = Math.floor(i / base);
           f = f / base;
       }
       
       return result;

    }
    this.HaltonSeq=function(Length, base)
    {

       var ans= new Array(Length);
       for(var i=0;i<Length;i++)
       {   
            ans[i]=this.Halton(i+1,base);
       
       }
       
       return ans;

    }
    this.NormalHaltonSeq=function(Length)
    {

       var ansNHS= new Array(Length);
       var u1,u2;
       var ansNHS1=this.HaltonSeq(Length,2);
       var ansNHS2=this.HaltonSeq(Length,3);
       for(var i=0;i<Length;i++)
       {
            u1=ansNHS1[i];
            u2=ansNHS2[i];
            ansNHS1[i]=Math.sqrt(-2*Math.log(u1))*Math.cos(2*Math.PI*u2);
            ansNHS2[i]=Math.sqrt(-2*Math.log(u1))*Math.sin(2*Math.PI*u2);
       }
       var ansNHS = ansNHS1.concat(ansNHS2);     
       
       
       
       return ansNHS;

    }       



}
