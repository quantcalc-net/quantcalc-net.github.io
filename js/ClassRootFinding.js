
function RootFinding(){
//-------Generate Halton Sequence    
    this.NewtonRaphsonBDT =function(f1, f2,sol,delta, i,S,k, P, Pu,Pd,r, v)
    {
    	var dx=1e-6;//delta[0];
    	var dy=1e-6;//delta[0];
	   var Nk=1000;
	   var tol=1e-15;
	   for(var kk=1;kk<=Nk;kk++)
	   {

            var df1dx=(f1(sol[0]+dx,sol[1], i,S, k,  P, Pu, Pd,r, v)-f1(sol[0]-dx,sol[1], i,S, k,  P, Pu, Pd,r, v))/2.0/dx;
            var df2dx=(f2(sol[0]+dx,sol[1], i,S, k,  P, Pu, Pd,r, v)-f2(sol[0]-dx,sol[1], i,S, k,  P, Pu, Pd,r, v))/2.0/dx;
            var df1dy=(f1(sol[0],sol[1]+dy, i,S, k,  P, Pu, Pd,r, v)-f1(sol[0],sol[1]-dy, i,S, k,  P, Pu, Pd,r, v))/2.0/dy;
		    var df2dy=(f2(sol[0],sol[1]+dy, i,S, k,  P, Pu, Pd,r, v)-f2(sol[0],sol[1]-dy, i,S, k,  P, Pu, Pd,r, v))/2.0/dy;
	   	    var det=df1dx*df2dy-df2dx*df1dy;
		    var dif_x;
		    var dif_y;
		if(det==0)
        {
			//cout<<"matrix is not invertible"<<endl;
		  }
		  else
		  {
			dif_x=(-df2dy*f1(sol[0],sol[1], i,S, k,  P, Pu, Pd,r, v)+df1dy*f2(sol[0],sol[1], i,S, k,  P, Pu, Pd,r, v))/det;
			dif_y=(df2dx*f1(sol[0],sol[1], i,S, k,  P, Pu, Pd,r, v)-df1dx*f2(sol[0],sol[1], i,S, k,  P, Pu, Pd,r, v))/det;
			sol[0]=sol[0]+dif_x;
			sol[1]=sol[1]+dif_y;

		  }
	   	   if(Math.sqrt((dif_x*dif_x+dif_y*dif_y)/2.0)<tol)
		  {
	
			 kk=Nk+1;
		  }
	   }
       
        return 0;
    }
    



}
