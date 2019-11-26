<html>

<head>

<title></title>

</head>

<body>
<?

  $Host = "mysql5.000webhost.com"; 
  $User = "a7582719_pai"; 
  $Pass = "yllatisthe1"; 
  $Database = "a7582719_yllat"; 
  if(!($DBLinkID = mysql_connect($Host, $User, $Pass))) { 
    echo "無法MySQL連接資料庫！"; 
    exit(); 
  } 
   
$db_selected = mysql_select_db($Database, $DBLinkID); 

//mysql_query("CREATE TABLE t1(id INT NOT NULL AUTO_INCREMENT, 
//PRIMARY KEY(id),name VARCHAR(8))", $DBLinkID)or die(mysql_error()); 
mysql_query("insert into t1 values(6,'ivan')", $DBLinkID);
$data=mysql_query ("select * from t1", $DBLinkID);
$a=mysql_fetch_array($data);
echo $a[0];
mysql_close($DBLinkID);

?>
</body>

</html>
