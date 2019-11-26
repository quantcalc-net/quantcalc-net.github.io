<html>

<head>

<title></title>

</head>

<body>
<?
include "ClassSpline.php";
      $n=3;
      $a=array(0,1,1,0);
      $b=array(2,2,2,0);
      $c=array(1,1,0,0);
      $v=array(0,1,2,3);
      $x=array(8,8,8,8);
      $S=new Spline;
      $x=$S->ThomasAlgSolveMatrix($n, $a, $b, $c, $v);
      $x[0]=$b[1]
      +$b[2];
      echo $x[0]."<br>";
      echo $x[1]."<br>";
      echo $x[2]."<br>";
      
?>
</body>

</html>
