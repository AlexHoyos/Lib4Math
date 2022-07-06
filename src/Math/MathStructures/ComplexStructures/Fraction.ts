import MathStructure from "../MathStructure";
import Polinomio from "./Polinomio";

class Fraction extends MathStructure{
    denominator: Polinomio
    numerator: Polinomio

    constructor(numerator = new Polinomio(), denominator = new Polinomio()){
        super()
        this.numerator = numerator
        this.denominator = denominator
    }

    print(){
        return "\\frac{"+this.numerator.print()+"}{"+this.denominator.print()+"}"
    }

    simplify(): void {
        throw new Error("Method not implemented.");
    }
    compare(a: MathStructure): boolean {
        throw new Error("Method not implemented.");
    }
    clone(): MathStructure {
        throw new Error("Method not implemented.");
    }

    toggleSign(): void {
        this.numerator.toggleSign()
    }

    static multp(frac1:Fraction, frac2:Fraction): Fraction{

        let numerator = Polinomio.multp(frac1.numerator, frac2.numerator)
        let denominator = Polinomio.multp(frac1.denominator, frac2.denominator)
        
        var fractionResult = new Fraction(numerator, denominator)

        return fractionResult

    }

    static div(frac1:Fraction, frac2:Fraction): Fraction{

        let numerator = Polinomio.multp( frac1.numerator, frac2.denominator )
        let denominator = Polinomio.multp(frac1.denominator, frac2.numerator)
        var fractionResult = new Fraction(numerator, denominator)


        return fractionResult

    }

    static sum(frac1:Fraction, frac2:Fraction): Fraction{

        /*
            frac1    frac2
            numerator    numerator      frac1.numerator*frac2.denominator + frac2.numerator*frac1.denominator
            ----- + ------ =    -------------------------------------------------
            denominator   denominator                  frac1.denominator*frac2.denominator
        */

        let numerator = Polinomio.sum( Polinomio.multp(frac1.numerator, frac2.denominator), Polinomio.multp(frac2.numerator, frac1.denominator) )
        let denominator = Polinomio.multp(frac1.denominator, frac2.denominator)

        return new Fraction(numerator, denominator)
    }

}

export default Fraction