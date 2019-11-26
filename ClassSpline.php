<?php


class Spline {

    function CubicSpline($n,$y,$x, $t)
    {
   	//input y[i], i=0~n
	//input x[i], i=0~n
	//n is number of interval
    $ii=$n-1;
	for ($i=1;$i<=$n ;$i++)
	{
		if ($t<$x[$i])
		{
			if($t==$x[$i-1])
			{
				return $y[$i-1];
			}
				$ii=$i-1;
				$i=$n+1;
		}
	
	}
	if($t==$x[$n])
	{
		return $y[$n];
	}



/*	//$a=array [n+1];
	double *b=new double [n+1];
	double *c=new double [n+1];
	double *v=new double [n+1];
	double *xx=new double [n+1];*/
	//Evaluate the right hand side v[i]
	
	for( $i=1;$i<=$n-1;$i++)
	{
		$v[$i]=6*(($y[$i+1]-$y[$i])/($x[$i+1]-$x[$i])-($y[$i]-$y[$i-1])/($x[$i]-$x[$i-1]));
	
	}
	//move left to fit the ThomasAlg, we have n-1 equations
	for(  $i=0;$i<=$n-2;$i++)
	{
		$v[$i]=$v[$i+1];// v have value when i=from 0 to (n-2)
	}
	// evaluate a[i] c[i]
	for(  $i=1;$i<=$n-2;$i++)
	{
		$a[$i]=$x[$i+1]-$x[$i];// a have value when i=from 1 to (n-2)
		$c[$i-1]=$x[$i+1]-$x[$i];// c have value when i=from 0 to (n-3)
	}
	// evaluate b[i]
	for(  $i=0;$i<=$n-2;$i++)
	{
		$b[$i]=2*($x[$i+2]-$x[$i]);
	}



	$xx=$this->ThomasAlgSolveMatrix($n-1,$a,$b,$c,$v);
    //move xx[i] right from 0~(n-2) to 1~(n-1) 
	for (  $i=$n-1;$i>=1;$i--)
	{
		$xx[$i]=$xx[$i-1];
	}
	$xx[$n]=0;
	$xx[0]=0;


	$dx=$x[$ii+1]-$x[$ii];
	$ans=$xx[$ii+1]*($t-$x[$ii])*($t-$x[$ii])*($t-$x[$ii])/6/($x[$ii+1]-$x[$ii])
			   +$xx[$ii]*($x[$ii+1]-$t)*($x[$ii+1]-$t)*($x[$ii+1]-$t)/6/($x[$ii+1]-$x[$ii])
			   +($y[$ii+1]/$dx-$xx[$ii+1]*$dx/6)*($t-$x[$ii])+($y[$ii]/$dx-$xx[$ii]*$dx/6)*($x[$ii+1]-$t);

		return $ans;

    }
    function ThomasAlgSolveMatrix($n, $a, $b, $c, $v)
    {
	    //From wiki
        /**
         * n - number of equations
         * a - sub-diagonal (means it is the diagonal below the main diagonal) -- indexed from 1..n-1
         * b - the main diagonal-- indexed from 0..n-1
         * c - sup-diagonal (means it is the diagonal above the main diagonal) -- indexed from 0..n-2
         * v - right part-- indexed from 0..n-1
         * x - the answer-- indexed from 0..n-1
         */
        for (  $i = 1; $i < $n; $i++)
        {
                  $m = $a[$i]/$b[$i-1];
                $b[$i] = $b[$i] - $m * $c[$i - 1];
                $v[$i] = $v[$i] - $m*$v[$i-1];
        }
 
        $x[$n-1] = $v[$n-1]/$b[$n-1];
 
        for (  $i = $n - 2; $i >= 0; --$i)
                $x[$i] = ($v[$i] - $c[$i] * $x[$i+1]) / $b[$i];
        return $x;
    }
}

?>
