abstract class MathStructure{

    abstract print():string
    abstract simplify():void
    abstract compare(a:MathStructure):boolean
    abstract clone():MathStructure
    abstract toggleSign(): void

}


export default MathStructure

/*
    toFraction():Fraction {
        if(this instanceof Polinomio){
            return new Fraction(this, new Polinomio([ new Monomio(1) ]))
        } else if(this instanceof Fraction){
            return this
        } else {
            return new Fraction(new Polinomio([ new Monomio(0) ]), new Polinomio([ new Monomio(1) ]))
        }

    }

    static multp(struct1:MathStructure, struct2:MathStructure):MathStructure {

        if(struct1 instanceof Fraction || struct2 instanceof Fraction)
            return Fraction.multp(struct1.toFraction(), struct2.toFraction())

        if(struct1 instanceof Polinomio && struct2 instanceof Polinomio)
            return Polinomio.multp(struct1, struct2)
        

        return new Polinomio()
        
    }

    static div(struct1:MathStructure, struct2:MathStructure):MathStructure {

        if(struct1 instanceof Fraction || struct2 instanceof Fraction)
            return Fraction.div(struct1.toFraction(), struct2.toFraction())

        if(struct1 instanceof Polinomio && struct2 instanceof Polinomio)
            return Polinomio.div(struct1, struct2)

        return new Polinomio()

    }

    static sum(struct1:MathStructure, struct2:MathStructure):MathStructure {

        if(struct1 instanceof Fraction || struct2 instanceof Fraction)
            return Fraction.sum(struct1.toFraction(), struct2.toFraction())

        if(struct1 instanceof Polinomio && struct2 instanceof Polinomio)
            return Polinomio.sum(struct1, struct2)

        return new Polinomio()

    }
    static subs(struct1:MathStructure, struct2:MathStructure):MathStructure {

        if(struct1 instanceof Fraction || struct2 instanceof Fraction){
            struct2.toggleSign()
            return Fraction.sum(struct1.toFraction(), struct2.toFraction())
        }

        struct2.toggleSign()
        return MathStructure.sum(struct1, struct2)

    }
    static pow(struct1:MathStructure, struct2:Polinomio):MathStructure {

        if(struct1 instanceof Polinomio){
            return Polinomio.pow(struct1, struct2) 
        }

        return new Polinomio()
    }

}*/