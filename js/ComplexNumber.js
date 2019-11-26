/** ComplexNumber class
 * 
 * The complex number class allows us to do complex math. It accepts a real and imaginary part
 * 
 * @author Jan Hartigan
 * @inspiration http://www.java2s.com/Code/JavaScript/Language-Basics/Complexclasstorepresentcomplexnumbers.htm
 * @version 1.0.0 (2011-03-08)
 */
 
 // see for readme https://github.com/janhartigan/ComplexNumber/blob/master/README.markdown 


/**
 * @param Number	real
 * @param Number	imaginary
 */
function ComplexNumber(real,imaginary) {
	this.real = real;
	this.imaginary = imaginary;
}

//Then we make the prototype object for the class so we can perform actions on complex numbers (like multiplication, addition, etc.)
ComplexNumber.prototype = {
	/* The real part of the complex number
	 * 
	 * @type Number
	 */
	real: 0,

	/* The imaginary part of the complex number
	 * 
	 * @type Number
	 */
	imaginary: 0,

	/**
	 * The add operation which sums the real and complex parts separately
	 * 
	 * @param ==> 	If there is one argument, assume it's a ComplexNumber
	 * 				If there are two arguments, assume the first is the real part and the second is the imaginary part
	 * 
	 * @return ComplexNumber
	 */
	add: function() {
	    if(arguments.length == 1)
	        return new ComplexNumber(this.real + arguments[0].real, this.imaginary + arguments[0].imaginary);
	    else
	        return new ComplexNumber(this.real + arguments[0], this.imaginary + arguments[1]);
	},

	/**
	 * The subtract operation which subtracts the real and complex parts from one another separately
	 * 
	 * @param ==> 	If there is one argument, assume it's a ComplexNumber
	 * 				If there are two arguments, assume the first is the real part and the second is the imaginary part
	 * 
	 * @return ComplexNumber
	 */
	sub: function() {
	    if(arguments.length == 1)
	        return new ComplexNumber(this.real - arguments[0].real, this.imaginary - arguments[0].imaginary);
	    else
	        return new ComplexNumber(this.real - arguments[0], this.imaginary - arguments[1]);
	},

	/**
	 * The multiplication operation which multiplies two complex numbers
	 * 
	 * @param ==> 	If there is one argument, assume it's a ComplexNumber
	 * 				If there are two, assume the first is the real part and the second is the imaginary part
	 * 
	 * @return ComplexNumber
	 */
	mult: function() {
	    var multiplier = arguments[0];

	    if(arguments.length != 1)
	        multiplier = new ComplexNumber(arguments[0], arguments[1]);

	    return new ComplexNumber(this.real * multiplier.real - this.imaginary * multiplier.imaginary, 
								this.real * multiplier.imaginary + this.imaginary * multiplier.real);
	},

    div: function() {
        var denominator = arguments[0];
    
        if(arguments.length != 1)
            denominator = new ComplexNumber(arguments[0], arguments[1]);
            
        return new ComplexNumber((this.real * denominator.real + this.imaginary * denominator.imaginary)/(denominator.real * denominator.real + denominator.imaginary * denominator.imaginary), 
								(-this.real * denominator.imaginary + this.imaginary * denominator.real)/(denominator.real * denominator.real + denominator.imaginary * denominator.imaginary));
    }, 
    
	/**
	 * The modulus of a complex number
	 * 
	 * @return number
	 */
	mod: function() {
	    return Math.sqrt(this.real * this.real + this.imaginary * this.imaginary);
	},
	
    exp: function() {
        return new ComplexNumber(Math.exp(this.real)*Math.cos(this.imaginary), Math.exp(this.real)*Math.sin(this.imaginary));
    }, 

    log: function() {
        return new ComplexNumber( Math.log(Math.sqrt(this.real * this.real + this.imaginary * this.imaginary)), Math.atan2(this.imaginary, this.real) );
    }, 
    
    pow: function() {   // to evaluate u^x, use u.pow(x). 
        if(arguments.length != 1)
            return this.log().mult(arguments[0], arguments[1]).exp();
        else
            return this.log().mult(arguments[0], 0).exp();
    }, 
    
    sqrt: function() {  
    // ���� Mathematica ���ƼƮڸ��]�w�A�@�G�������ƼơA���稤�p���ڡA
    // �T�|�������Ƽƨ��稤�j���ڡA
    // �]�N�O�A�`�O���̱��� 1 �����ӮڡC�����D������o�˩w�q���ڸ��~���� nig ��X�諸���סC
        if(this.imaginary >= 0){
            if(this.imaginary == 0) 
                return new ComplexNumber(Math.sqrt(this.real), 0);
            else{
                var tmp1 = this.mod();
                var tmp2 = Math.sqrt(tmp1 + this.real)/1.41421356237309504880168872421;
                return new ComplexNumber(tmp2, tmp2*(tmp1 - this.real)/this.imaginary);
            }
        }else{
            return new ComplexNumber(this.real, -this.imaginary).sqrt().conj();
        }
    }, 
    
    conj: function() {
        return new ComplexNumber(this.real, -this.imaginary);
    }, 

	/**
	 * The string representation of a complex number (e.g. 4 + 3i)
	 * 
	 * @return String
	 */
	toString: function() {
	    return this.real + " + " + this.imaginary + "i";
	},
	// �ۤv�[���A�쥻���]�w�~��Ū���� real �� imaginary
	re: function(){ return this.real },
	im: function(){ return this.imaginary }
};
