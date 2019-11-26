// JavaScript Document
var message="Sorry!"; // Your no right click message here
var closeWin="0"; // Do you want to close window after message (1 for yes 0 for no)

function IE(e){
    if (navigator.appName == 'Microsoft Internet Explorer' && (event.button == 2 || event.button == 3)){
        alert(message); if(closeWin=="1") self.close();
        return false;
    }
}
function NS(e){
    if (document.layers || (document.getElementById && !document.all)){
        if (e.which==2 || e.which==3){
               alert(message); if(closeWin=="1") self.close();
               return false;
          }
     }
}
document.onmousedown=IE;
document.onmouseup=NS;
document.oncontextmenu=new Function("return false");


function Calculate(){
    var s0 = eval(document.isForm.s0.value);
    var k = eval(document.isForm.K.value);
    var t = eval(document.isForm.T.value);
    var r = eval(document.isForm.r.value);
    var si = eval(document.isForm.s.value);
    var B = eval(document.isForm.Barrier.value);
    var s_min=1;
    var s_max=2;
    //var k=1;
    var N=100;
    var J=N;
    var ka=0;
    var C=1;
    var para1DBS= new Array(20);
   	para1DBS[1]=s_min;
	para1DBS[2]=s_max;
	para1DBS[3]=k;
	para1DBS[4]=r;
	para1DBS[5]=si;
	para1DBS[6]=t;
	para1DBS[7]=N;
	para1DBS[8]=para1DBS[7];
	para1DBS[9]=ka;
	para1DBS[10]=C;
	
    /*var DBS= new testClass();
    var ans=DBS.func1(testF,5);
    document.isForm.c.value =ans;*/
    var DBS= new OneDBS();
	
    var DBSv=DBS.CNSolver(ft_r0BD, in_r0BD,bL_r0BD,bR_r0BD,C1x_r0BD,C2x_r0BD,Cu_r0BD,para1DBS);

    delete DBS;

 	document.isForm.c.value = DBSv[6];
}
function testF(s)
{
    return s*3;
}
function C1x_r0BD(t, x)
{
	var k=0;
	return -k*x;
}

function C2x_r0BD(t,x)
{
	var sigma=0.4;
	return 0.5*sigma*sigma*x*x;
}
function Cu_r0BD(t,x)
{
	return 0;
}
function ft_r0BD( x,R)
{
	return 0;
}
// initial condition of put option
function in_r0BD(x, k)          
{
	if (x==1)
	{
		return 0;
	}
	else
	{
		return 1;
	}
}

//boundary condition
//boundary condition of put options
function bL_r0BD(t,xj)
{
	return 0;
}
function bR_r0BD(t, xj)
{
	return 1;

}
function Reset(){

    document.isForm.s0.value="100";
    document.isForm.K.value="120";
    document.isForm.T.value="1";
    document.isForm.r.value="0.1";
    document.isForm.s.value="0.3";
}
