// JavaScript Document
//-------We expect to solve Ut=Cx1(Ux)+Cx2(Uxx)+Cu(U)+f 
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
    var s_min = 0;
    var s_max = eval(document.isForm.BarrierU.value);

    //var k=1;

    var J=Math.floor((s_max-s_min));
    var N=J;
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
	var dx=(s_max-s_min)/J;
    /*var DBS= new testClass();
    var ans=DBS.func1(testF,5);
    document.isForm.c.value =ans;*/
    var DBS= new OneDBS();
	
    var DBSv=DBS.CNSolver(ft_Barrier, in_Barrier,bL_Barrier,bR_Barrier,C1x_Barrier,C2x_Barrier,Cu_Barrier,para1DBS);
    var Grid_s0=(s0-s_min)/dx;
    var Grid_s0_f=Math.floor(Grid_s0);
    var weight=Grid_s0-Grid_s0_f;
    delete DBS;

 	document.isForm.c.value = DBSv[Grid_s0_f]*(1-weight)+DBSv[Grid_s0_f+1]*(weight);
}
function testF(s)
{
    return s*3;
}
function C1x_Barrier(t, xs)
{
	
	var r = eval(document.isForm.r.value);
	return r*xs;
}

function C2x_Barrier(t,xs)
{
	var si = eval(document.isForm.s.value);
	return 0.5*si*si*xs*xs;
}
function Cu_Barrier(t,xs)
{
    var r = eval(document.isForm.r.value);
	return -r;
}
function ft_Barrier( xs,R)
{
	return 0;
}
// initial condition of put option
function in_Barrier(xs, k)          
{
	if (xs<k)
	{
		return 0;
	}
	else
	{
		return (xs-k);
	}
}

//boundary condition
//boundary condition of put options
function bL_Barrier(t,xj)
{
	return 0;
}
function bR_Barrier(t, xj)
{  
    //var r = eval(document.isForm.r.value);
    //var T = eval(document.isForm.T.value);
	//return Math.exp(-r*(t))*xj;
    return 0;
}
function Reset(){

    document.isForm.s0.value="100";
    document.isForm.K.value="100";
    document.isForm.T.value="0.25";
    document.isForm.r.value="0.1";
    document.isForm.s.value="0.15";
    document.isForm.BarrierU.value="150";
}
