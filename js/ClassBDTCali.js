
function BDTCali(){

this.Calibration=function (n,S,k,P,Pu,Pd,r,v)
{
	P[0]=0;
	Pu[0]=0;
	Pd[0]=0;
	P[1]=1;
	Pu[1]=1;
	Pd[1]=1;
	r[1]=S[1];
	v[1]=0;

	var RF=new RootFinding();

	for(var i=2; i<=n;i++)
	{
		P[i]=0;
		for(var j=i;j>=1;j--)
		{
			P[j]=P[j-1]/(2*(1+r[i-1]*Math.pow(v[i-1],j-2.0)))
				+P[j]/(2*(1+r[i-1]*Math.pow(v[i-1],j-1.0)));
			
		}
		var sol=new Array(2);
		var delta=new Array(2);
		sol[0]=0.05528;
		sol[1]=1;
		delta[0]=1e-5;
		delta[1]=1e-5;
		var vvoidRF=RF.NewtonRaphsonBDT (this.f1, this.f2,sol,delta,i,S, k, P, Pu,Pd, r, v);
		r[i]=sol[0];
		v[i]=sol[1];

		if(i<n)
		{
			Pu[i]=0;
			Pd[i]=0;
			for(var j=i;j>=1;j--)
			{
				Pu[j]=Pu[j-1]/(2*(1+r[i]*Math.pow(v[i],j-1)))
					 +Pu[j]/(2*(1+r[i]*Math.pow(v[i],j)));
				Pd[j]=Pd[j-1]/(2*(1+r[i]*Math.pow(v[i],j-2)))
					 +Pd[j]/(2*(1+r[i]*Math.pow(v[i],j-1)));			
			}
		
		}
	}
    delete sol;
    delete delta;
	delete RF;
    return 0;

}

 this.f1=function(rr,vv,i,S,k,P,Pu,Pd,r, v)
{
	var sum=0;
	for(var j=1;j<=i;j++)
	{
		sum=sum+P[j]/(1+rr*Math.pow(vv,j-1.0));	
	}
	
	return sum-Math.pow(1+S[i],-i);
}
this.f2=function(rr,vv,i,S,k,P,Pu,Pd,r, v)
{
	var sum1=0;
	for(var j=1;j<=i-1;j++)
	{

		sum1=sum1+Pu[j]/(1+rr*Math.pow(vv,j));	
	}

	var sum2=0;
	for(var j=1;j<=i-1;j++)
	{
		sum2=sum2+Pd[j]/(1+rr*Math.pow(vv,j-1));
	}
	
	return Math.pow(sum1,-1.0/(i-1.0))-1-Math.exp(2*k[i])*(Math.pow(sum2,-1.0/(i-1.0))-1);
} 
 



}
