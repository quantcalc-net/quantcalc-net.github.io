<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>the Financial Math Calculator</title>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
<link href="style.css" rel="stylesheet" type="text/css" />
<!--  -->


<!--  -->
</head>
<body>

<div class="main">

  <div class="header">
    <div class="header_resize">
      <div class="logo"><h1><a href="index.html">Quant<span>Calc</span> <small>the calculator for all quants</small></a></h1></div>
      <div class="menu_nav">
        <ul>
          <li class="active"><a href="index.html">Home</a></li>
          <li ><a href="pricing.html">Pricing</a></li>
          <li><a href="calibration.html">Calibration</a></li>
          <li><a href="arbi.html">Arbitraging</a></li>
          <li><a href="about.html">About us</a></li>
          <li><a href="contact.html">Contact us</a></li>
        </ul>
      </div>
      <div class="clr"></div>
    </div>
  </div>

  <div class="content">
    <div class="content_resize">
      <div class="mainbar">
        <div class="article">
          <h2>Yield Curve Interpolation</h2><div class="clr"></div>
          <p>Posted by <a href="Resume_PAI.pdf">Szu-Yu (Gary) Pai</a> </p>

          
          
          
          
          
          
<?php
/*global $y;
$y[0] = $_POST['is1m'];
$y[1] = $_POST['is3m'];
$y[2] = $_POST['is6m'];
$y[3] = $_POST['is1y'];
$y[4] = $_POST['is2y'];
$y[5] = $_POST['is3y'];
$y[6] = $_POST['is5y'];
$y[7] = $_POST['is7y'];
$y[8] = $_POST['is10y'];
$y[9] = $_POST['is20y'];
$y[10] = $_POST['is30y'];*/
$is1m = $_POST['is1m'];
$is3m = $_POST['is3m'];
$is6m = $_POST['is6m'];
$is1y = $_POST['is1y'];
$is2y = $_POST['is2y'];
$is3y = $_POST['is3y'];
$is5y = $_POST['is5y'];
$is7y = $_POST['is7y'];
$is10y = $_POST['is10y'];
$is20y = $_POST['is20y'];
$is30y = $_POST['is30y'];
$isT = $_POST['isT'];
$isAns = $_POST['isAns'];
?>           


<?php
if (!isset($_POST['submit'])&&!isset($_POST['submit2'])) {
?>
<form name="isForm" method="post" action="<?php echo $PHP_SELF;?>">


<table border=0>
<tr><td><b>Input:</b></td><td>
<tr><td>1 month yield</td><td><input name="is1m" value="0.02"></td><td></td></tr>
<tr><td>3 month yield</td><td><input name="is3m" value="0.05"></td><td></td></tr>
<tr><td>6 month yield</td><td><input name="is6m" value="0.11"></td><td></td></tr>
<tr><td>1 year yield</td><td><input name="is1y" value="0.16"></td><td></td></tr>
<tr><td>2 year yield</td><td><input name="is2y" value="0.25"></td><td></td></tr>
<tr><td>3 year yield</td><td><input name="is3y" value="0.36"></td><td></td></tr>
<tr><td>5 year yield </td><td><input name="is5y" value="0.72"></td><td></td></tr>
<tr><td>7 year yield </td><td><input name="is7y" value="1.18"></td><td></td></tr>
<tr><td>10 year yield</td><td><input name="is10y" value="1.78"></td><td></td></tr>
<tr><td>20 year yield</td><td><input name="is20y" value="2.54"></td><td></td></tr>
<tr><td>30 year yield</td><td><input name="is30y" value="2.95"></td><td></td></tr>
<tr><td>The maturity for quate</td><td><input name="isT" value="6"></td><td>year</td></tr>
<tr><td><b>Output:</b></td><td>
<tr><td>The yield for the inputted maturity</td><td><input name="isAns" value="" onFocus="blur();"></td><td></td></tr>
<tr><td><input type="submit" value="Import Latest Data and Calculate" name="submit"></td><td><input type="submit" value="Input Data and Calculate" name="submit2"></td><td></td></tr>
</table>


</form>
<?php
} else if(isset($_POST['submit'])){
?>
<?php
// Get Data from treasury.gov
$http="http://www.treasury.gov/resource-center/data-chart-center/interest-rates/Pages/TextView.aspx?data=yield"; //您想抓取的網址
$buffer = file($http); //將網址讀入buffer變數
for($i=0;$i<sizeof($buffer);$i++) //將每段文字讀出來,以換行為單位,sizeof會傳回共有幾筆
{
    $nLast=strpos($buffer[$i],"30-year Treasury"); //檢查你要找的字,是否存在,假設我想找<title>中的內容為何,為什麼前面要加空白,因為如果找到位置如果是第一個位置是0,0跟找不到在判斷會有問題


    if($nLast>0)
    {
      $n1=strpos($buffer[$i-2],"<d:BC_30YEAR");//Find out where is "<d:BC_30YEAR"
      $n2=strpos($buffer[$i-2],"</td></tr></table>"); 
      /*for($i=10;$i<=1;$i--)
      {
      $y[i]==substr($buffer[$i-2],$n2-4-36*(10-$i),4);//Input: substr($buffer[which line],which char,lenth of char)
      }*/
      $is30y=substr($buffer[$i-2],$n2-4,4);
      $is20y=substr($buffer[$i-2],$n2-40,4);
      $is10y=substr($buffer[$i-2],$n2-76,4);
      $is7y=substr($buffer[$i-2],$n2-112,4);
      $is5y=substr($buffer[$i-2],$n2-148,4);
      $is3y=substr($buffer[$i-2],$n2-184,4);
      $is2y=substr($buffer[$i-2],$n2-220,4);
      $is1y=substr($buffer[$i-2],$n2-256,4);
      $is6m=substr($buffer[$i-2],$n2-292,4);
      $is3m=substr($buffer[$i-2],$n2-328,4);
      $is1m=substr($buffer[$i-2],$n2-364,4);

    }

}
include "ClassSpline.php";
    
     $y[10]=$is30y;
      $y[9]=$is20y;
      $y[8]=$is10y;
      $y[7]=$is7y;
      $y[6]=$is5y;
      $y[5]=$is3y;
      $y[4]=$is2y;
      $y[3]=$is1y;
      $y[2]=$is6m;
      $y[1]=$is3m;
      $y[0]=$is1m;
      $x[10]=30;
      $x[9]=20;
      $x[8]=10;
      $x[7]=7;
      $x[6]=5;
      $x[5]=3;
      $x[4]=2;
      $x[3]=1;
      $x[2]=6/12;
      $x[1]=3/12;
      $x[0]=1/12;
      $n=10;
      /*for($i=0;$i<=10;$i++)
      {
          $x[$i]=$i;
          $y[$i]=$i*$i+1;      
      }*/
      
      //$isT=4.5;
      $S=new Spline;
      $isAns=$S->CubicSpline($n,$y,$x, $isT);




echo
"<form >

<p><B>Yield Curve</B></p>
<table border=0>
<tr><td><b>Input:</b></td><td>
<tr><td>1 month yield</td><td><input  value='".$y[0]."'></td><td></td></tr>
<tr><td>3 month yield</td><td><input  value='".$y[1]."'></td><td></td></tr>
<tr><td>6 month yield</td><td><input  value='".$y[2]."'></td><td></td></tr>
<tr><td>1 year yield</td><td><input  value='".$y[3]."'></td><td></td></tr>
<tr><td>2 year yield</td><td><input  value='".$y[4]."'></td><td></td></tr>
<tr><td>3 year yield</td><td><input  value='".$y[5]."'></td><td></td></tr>
<tr><td>5 year yield </td><td><input  value='".$y[6]."'></td><td></td></tr>
<tr><td>7 year yield </td><td><input  value='".$y[7]."'></td><td></td></tr>
<tr><td>10 year yield</td><td><input  value='".$y[8]."'></td><td></td></tr>
<tr><td>20 year yield</td><td><input  value='".$y[9]."'></td><td></td></tr>
<tr><td>30 year yield</td><td><input  value='".$y[10]."'></td><td></td></tr>
<tr><td>The maturity for quate</td><td><input  value='".$isT."'></td><td></td></tr>
<tr><td><b>Output:</b></td><td>
<tr><td>The yield for the inputted maturity</td><td><input name='isAns' value='".$isAns."' onFocus='blur();'></td><td></td></tr>
<tr><td><input type='submit' value='reset' name='reset'></td><td></td><td></td></tr>
</table>
</form>"
?>
<?php
}else if(isset($_POST['submit2'])){
?>
<?php
include "ClassSpline.php";
    
     $y[10]=$is30y;
      $y[9]=$is20y;
      $y[8]=$is10y;
      $y[7]=$is7y;
      $y[6]=$is5y;
      $y[5]=$is3y;
      $y[4]=$is2y;
      $y[3]=$is1y;
      $y[2]=$is6m;
      $y[1]=$is3m;
      $y[0]=$is1m;
      $x[10]=30;
      $x[9]=20;
      $x[8]=10;
      $x[7]=7;
      $x[6]=5;
      $x[5]=3;
      $x[4]=2;
      $x[3]=1;
      $x[2]=6/12;
      $x[1]=3/12;
      $x[0]=1/12;
      $n=10;
      /*for($i=0;$i<=10;$i++)
      {
          $x[$i]=$i;
          $y[$i]=$i*$i+1;      
      }*/
      
      //$isT=4.5;
      $S=new Spline;
      $isAns=$S->CubicSpline($n,$y,$x, $isT);




echo
"<form >

<p><B>Yield Curve</B></p>
<table border=0>
<tr><td><b>Input:</b></td><td>
<tr><td>1 month yield</td><td><input  value='".$y[0]."'></td><td></td></tr>
<tr><td>3 month yield</td><td><input  value='".$y[1]."'></td><td></td></tr>
<tr><td>6 month yield</td><td><input  value='".$y[2]."'></td><td></td></tr>
<tr><td>1 year yield</td><td><input  value='".$y[3]."'></td><td></td></tr>
<tr><td>2 year yield</td><td><input  value='".$y[4]."'></td><td></td></tr>
<tr><td>3 year yield</td><td><input  value='".$y[5]."'></td><td></td></tr>
<tr><td>5 year yield </td><td><input  value='".$y[6]."'></td><td></td></tr>
<tr><td>7 year yield </td><td><input  value='".$y[7]."'></td><td></td></tr>
<tr><td>10 year yield</td><td><input  value='".$y[8]."'></td><td></td></tr>
<tr><td>20 year yield</td><td><input  value='".$y[9]."'></td><td></td></tr>
<tr><td>30 year yield</td><td><input  value='".$y[10]."'></td><td></td></tr>
<tr><td>The maturity for quate</td><td><input  value='".$isT."'></td><td></td></tr>
<tr><td><b>Output:</b></td><td>
<tr><td>The yield for the inputted maturity</td><td><input name='isAns' value='".$isAns."' onFocus='blur();'></td><td></td></tr>
<tr><td><input type='submit' value='reset' name='reset'></td><td></td><td></td></tr>
</table>
</form>"
?>
<?php
} 
?>



<font size=-1>The calculation is based on Cubic Spline Interpolation,and the imported data is from <a href="http://www.treasury.gov">www.treasury.gov</a></font>

          <p>Tagged: <a href="#">Calibration</a>, <a href="#">Yield Curve Calculation</a>, <a href="#">Term Structure of Interest Rates</a>,<a href="#">Interst Rate Models</a></p>
          <p>  <span>&nbsp;&bull;&nbsp;</span> Jan  1, 2013  <span>&nbsp;&bull;&nbsp;</span>  </p>
        </div>
        
        <div class="article">
          <h2><span></span> </h2><div class="clr"></div>
          <div class="comment">
           
          </div>
          <div class="comment">

          </div>
          <div class="comment">

          </div>
        </div>
        <div class="article">
          
        </div>
      </div>
      <div class="sidebar">
        <div class="searchform">

        </div>
        <div class="gadget">
          <h2 class="star"><span>Methods</span> Menu</h2><div class="clr"></div>
          <ul class="sb_menu">
            
            <li><a href="AnalyticSolution.html">Analytic Solutions</a></li>
            <li><a href="MonteCarlo.html">Monte Carlo methods</a></li>
             <li><a href="NPDE.html">Numerical PDE Methods</a></li>
            <li><a href="Tree.html">Tree Methods</a></li>

          </ul>
        </div>
        <div class="gadget">
          <h2 class="star"><span>Derivatives Markets</span></h2><div class="clr"></div>
          <ul class="ex_menu">
            <li><a href="Stock.html" title="stock Options">Stock Options</a><br />Including Exotic Options</li>
            <li><a href="InterestRate.html">Interest Rate Derivatives</a><br />Short Rate Model</li>
            <li><a href="Credit.html" title="Credit Derivatives">Credit Derivatives</a><br />structural Models and Reduced Models</li>

          </ul>
        </div>
      </div>
      <div class="clr"></div>
    </div>
  </div>

  <div class="fbg">
    <div class="fbg_resize">
      <div class="col c1">
        <h2><span>Image Gallery</span></h2>
        <a href="#"><img src="images/pix1.jpg" width="58" height="58" alt="pix" /></a>
        <a href="#"><img src="images/pix2.jpg" width="58" height="58" alt="pix" /></a>
        <a href="#"><img src="images/pix3.jpg" width="58" height="58" alt="pix" /></a>
        <a href="#"><img src="images/pix4.jpg" width="58" height="58" alt="pix" /></a>
        <a href="#"><img src="images/pix5.jpg" width="58" height="58" alt="pix" /></a>
        <a href="#"><img src="images/pix6.jpg" width="58" height="58" alt="pix" /></a>
      </div>
      <div class="col c2">
        <h2><span>Why this website?</span></h2>
        <p>This website, QuantCalc, offers varied financial math calculators, calibration methods and arbitrage strategies. The reason why we develop QuantCalc is that we hope our ability of pricing, calibration and arbitraging can be seen by World. Please contact us if you want to see some specific method or strategy to be implemented on QuantCalc.</p>
      </div>
      <div class="col c3">
        <h2><span>Contact</span></h2>
        <p>Please contact us if you have any suggestion.</p>
        <p><a href="mailto:support@yoursite.com">pai@quantcalc.net</a></p>
        
        <p>Address: 208 Love Building, 1017 Academic Way Tallahassee, FL 32306-4510</p>
      </div>
      <div class="clr"></div>
    </div>
  </div>

</div>
<div style="display:none"><script src='http://v7.cnzz.com/stat.php?id=155540&web_id=155540' language='JavaScript' charset='gb2312'></script></div><div style="text-align:center"><a href="http://www.webcounter.com"><img border="0" src="http://www.webcounter.com/50cff59419407/counter.png"/></a><br /></div>
<div style="text-align:center">Copyright 2012 Szu-Yu Pai</div></body>
</html>
