var cexp = function(z){
    return (new ComplexNumber(Math.exp(z.re())*Math.cos(z.im()), Math.exp(z.re())*Math.sin(z.im())));
}
