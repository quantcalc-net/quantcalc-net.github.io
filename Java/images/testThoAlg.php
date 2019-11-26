<html>

<head>

<title></title>

</head>

<body>
<?
include "ClassSpline.php";
      $n=3;
      $a=array(2,2,2,2);
      $b=array(1,1,1,1);
      $c=array(1,1,1,1);
      $v=array(0,1,2,3);
      $x=array(8,8,8,8);
      $S=new Spline;
      $x=$S->ThomasAlgSolveMatrix($n, $a, $b, $c, $v);
      echo $x[1]."<br>";
      echo $x[2]."<br>";
      echo $x[3]."<br>";
      
?>
</body>

</html>
