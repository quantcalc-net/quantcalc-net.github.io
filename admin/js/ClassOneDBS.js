//-------We expect to solve Ut=Cx1(Ux)+Cx2(Uxx)+Cu(U)+f 
function OneDBS(){
    
    this.CNSolver=function(ft,ini,bL,bR,C1x,C2x,Cu,para1DBS)
    {
//-------------------let parameters be dimensionless--------------
    	var s_min=para1DBS[1]; 
    	var s_max=para1DBS[2];  
    	var k=para1DBS[3]; 
    	var r=para1DBS[4];  
    	var si=para1DBS[5];  
    	var t=para1DBS[6];  
    	var N=para1DBS[7];  
    	var J=para1DBS[8]; 
    	var ka=para1DBS[9];  
    	var C=para1DBS[10]; 
	
	
    	var r0=r;
    	var si0=si;
    	/*	s_min=s_min/k;
      s_max=s_max/k;

    	si0=1.0;

    	r0=1.0;
    */
//------------------define variables----------------------------
    	var dt=t/N;
    	var dx=(s_max-s_min)/J;
    	var R=(2*r0)/si0/si0;
    	var xj;
    	var tn;
    	var u= Array(J+1);// answer vector
    	var a= Array(J+1);
        var b= Array(J+1);
        var c= Array(J+1);
        var rhs= Array(J+1);//right hand side array


//-------------------Initial condition---------------------
   // modify from  for (int j=1; j<=J; j++)// j for x steps
    	for (var j=1; j<=J-1; j++)// j for x steps
    		{
    		    xj=j*dx;
		      	//modify 1 A(0.5)->A(0)
    		    u[j]=ini(s_min+xj,k);
			     //fout2<<u[j]<<endl;
    		}
//-------------------Boundary condition---------------------
                u[0]=bL(0,s_min);
                u[J]=bR(0,s_max);
			     //fout2<<u[j]<<endl;
    		
//-------------------------n for time steps-----------------------------
	//n=0~N-1(be careful) When n=0, we are finding U_(n+1)
    	for (var n=0; n<=N-1; n++)
    	{
	       	tn=n*dt;
//-------------------------- the boundary condition and M1---------------
            
  
            for (var j=0; j<=J; j++ )
	        {
		          xj=j*dx;
		          a[j]=this.M1a(this.aj(C1x,C2x,Cu,si, xj, dx,r,R, tn, s_max, t, ka, C),dt);		
		          b[j]=this.M1b(this.bj(C1x,C2x,Cu,si, xj, dx,r,R, tn, s_max, t, ka, C),dt);
		          c[j]=this.M1c(this.cj(C1x,C2x,Cu,si, xj, dx,r,R, tn, s_max, t, ka, C),dt);

/*
 //incorrect modify
		    a[j]=M1a(aj(si, xj-dx, dx,r,R, tn+dt, s_max, t, ka),dt);		
		    b[j]=M1b(bj(si, xj, dx,r,R, tn+dt, s_max, t, ka),dt);
		    c[j]=M1c(cj(si, xj+dx, dx,r,R, tn+dt, s_max, t, ka),dt);
*/
	       }
		
//--------------------------find RHS------------------------------------

	       for (var j=1; j<=J-1; j++)// j for x steps
           {
                xj=j*dx;
			
                rhs[j]=this.M2Un(u[j-1],u[j],u[j+1],this.aj(C1x,C2x,Cu,si, xj, dx,r,R, tn, s_max, t, ka, C),this.bj(C1x,C2x,Cu,si, xj, dx,r,R, tn, s_max, t,ka,C),this.cj(C1x,C2x,Cu,si, xj, dx,r,R, tn, s_max, t, ka, C),dt);

            //rhs[j]=M2Un(u[j-1],u[j],u[j+1],aj(si, xj-dx, dx,r,R, tn, s_max, t, ka),bj(si, xj, dx,r,R, tn, s_max, t, ka),cj(si, xj+dx, dx,r,R, tn, s_max, t, ka),dt);
           }
/* modify from  
		rhs[1]=rhs[1]-dt/2*aj(si, dx, dx,r,R, tn, s_max)*u[0]+aj(si, dx, dx,r,R, tn, s_max)*dt/2*(bL(tn)+bL(tn+dt));
		rhs[J-1]=rhs[J-1]-dt/2*cj(si, (J-1)*dx, dx,r,R, tn, s_max)*u[J]+cj(si, (J-1)*dx, dx,r,R, tn, s_max)*dt/2*(bR(tn)+bR(tn+dt));
*/

            rhs[1]=rhs[1]+this.aj(C1x,C2x,Cu,si, dx, dx,r,R, tn, s_max, t, ka, C)*dt/2.0*bL(tn+dt, s_min);
            rhs[J-1]=rhs[J-1]+this.cj(C1x,C2x,Cu,si, (J-1)*dx, dx,r,R, tn, s_max, t, ka, C)*dt/2.0*bR(tn+dt,s_max);

	/*
		rhs[1]=rhs[1]-dt/2*aj(si, dx, dx,r,R, tn, s_max, t, ka)*u[0]+aj(si, 0, dx,r,R, tn, s_max, t, ka)*dt/2*u[0]+aj(si, 0, dx,r,R, tn+dt, s_max, t, ka)*dt/2*bL(tn+dt);
		rhs[J-1]=rhs[J-1]-dt/2*cj(si, (J-1)*dx, dx,r,R, tn, s_max, t, ka)*u[J]+cj(si, (J)*dx, dx,r,R, tn, s_max, t, ka)*dt/2*u[J]+cj(si, (J)*dx, dx,r,R, tn+dt, s_max, t, ka)*dt/2*bR(tn+dt);
*/
		/*incorrect modify
		rhs[1]=rhs[1]-dt/2*aj(si, dx, dx,r,R, tn, s_max)*u[0]+aj(si, 0, dx,r,R, tn, s_max)*dt/2*u[0]+aj(si, 0, dx,r,R, tn+dt, s_max)*dt/2*bL(tn+dt);
		rhs[J-1]=rhs[J-1]-dt/2*cj(si, (J-1)*dx, dx,r,R, tn, s_max)*u[J]+cj(si, (J)*dx, dx,r,R, tn, s_max)*dt/2*u[J]+cj(si, (J)*dx, dx,r,R, tn+dt, s_max)*dt/2*bR(tn+dt);
        

		rhs[1]=rhs[1]+aj(si, dx, dx,r,R, tn+dt, s_max)*dt/2*bL(tn+dt);
		rhs[J-1]=rhs[J-1]+cj(si, (J-1)*dx, dx,r,R, tn+dt, s_max)*dt/2*bR(tn+dt);
*/
//-------------------------invert M1 to RHS (Thomas algorithm)------------
            var d_vec=new Array(J+1); 
            var u_vec=new Array(J+1); 
            var L_vec=new Array(J+1);        


	    // r_vec is the R in TM=R, where T is the matrix
            var r_vec=new Array(J+1); 

// input data
    // don not use first term of vector
	       d_vec[0]=0;
	       u_vec[0]=0;
	       L_vec[0]=0;
	       r_vec[0]=0;

	// u_vec and L_vec will have J-2 elements
	       for(var i=1; i<=J-2; i++)
	        {
	            d_vec[i]=b[i];
                u_vec[i]=c[i];
                L_vec[i]=a[i+1];
                r_vec[i]=rhs[i];      
	        /*d_vec.push_back(b[i]);
		    u_vec.push_back(c[i]);
	        L_vec.push_back(a[i+1]);
            r_vec.push_back(rhs[i]);*/
	       }		

	// d_vec and r_vec will have J-1 elements
	       d_vec[J-1]=b[J-1];
	       r_vec[J-1]=rhs[J-1];
	    /*d_vec.push_back(b[J-1]);
        r_vec.push_back(rhs[J-1]);*/
	//Thomas algorithm
	       for(var i=2; i<=J-1; i++)
	       {
                d_vec[i]=d_vec[i]-u_vec[i-1]*L_vec[i-1]/d_vec[i-1];
	            r_vec[i]=r_vec[i]-r_vec[i-1]*L_vec[i-1]/d_vec[i-1];
	       }
	// backward substitution
           u[J-1]=r_vec[J-1]/d_vec[J-1];
        //fout<<n<<","<<"u["<<J-1<<"]="<<u[J-1]<<endl;

	       for(var i=J-2; i>=1; i--)
	       {
	           u[i]=( r_vec[i]-u_vec[i]*u[i+1] )/d_vec[i];

	       }
	       //-------------------Boundary condition--------------------
                u[0]=bL(tn+dt,s_min);
                u[J]=bR(tn+dt,s_max);

    }
    return u;
}
    
    
    this.A=function(t,C,r)
    {
    	return C*Math.exp(-1*r*t);
    }
    
    
    this.aj=function(C1x,C2x,Cu,si,xj,dx, r, R, tn, s_max, T,ka, C)
    {
    //ka is dividend
	// old_s is the s before change variable.
	// den is common denominator
	// C2x is coefficient of Uxx in PDE
	// C1x is coefficient of Ux in PDE
    // Cu is coefficient of U in PDE
    	return C2x(tn,xj)/dx/dx-C1x(tn,xj)/dx/2.0;

    }
    this.bj=function(C1x,C2x,Cu,si, xj, dx, r, R, tn, s_max, T, ka, C)
    {
        return -2*C2x(tn,xj)/dx/dx+Cu(tn,xj);
    }
    this.cj=function(C1x,C2x,Cu,si,xj,dx, r, R, tn, s_max, T,ka, C)
    {	

/*	double a=0.05;
	double b=0.05;
	double Lambda=1;
	double eta=0.05;

	double CE2=0.5*eta*eta*xj*xj;
	double CE1=xj*(a*(b-log(xj))+0.5*eta*eta)-Lambda*eta*xj;
	double CE=-1*xj;*/
	   return C2x(tn,xj)/dx/dx+C1x(tn,xj)/dx/2.0;

    }
    this.M2Un=function(ui,uj,uk,a,b,c,dt)
    {   

     return (dt/2.0)*a*ui+(1+(dt/2.0)*b)*uj+(dt/2.0)*c*uk;
    }
    this.M1a=function(a, dt)
    {
	   return (-1*dt/2.0)*a;

    }
    this.M1b=function( b, dt)
    {
	   return 1-(dt/2.0)*b;

    }
    this.M1c=function(c,dt)
    {
        return (-1*dt/2.0)*c;
    }


}
