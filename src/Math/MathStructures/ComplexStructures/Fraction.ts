import ResultStep from "../../MathResult/ResultStep";
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

    toFraction(): Fraction {
        return this
    }

    static multp(frac1:Fraction, frac2:Fraction, stepbystep:ResultStep[]=[]): Fraction{

        stepbystep.push(new ResultStep(
            "\\text{Multiplicamos }"+frac1.print()+"*"+frac2.print()
        ))

        stepbystep.push(new ResultStep(
            "\\text{Obtenemos el numerador: }"+frac1.numerator.print()+"*"+frac2.numerator.print()
        ))

        var numerator = Polinomio.multp(frac1.numerator, frac2.numerator)

        stepbystep.push(new ResultStep(
            "\\text{Obtenemos el denominador: }"+frac1.denominator.print()+"*"+frac2.denominator.print()
        ))

        var denominator = Polinomio.multp(frac1.denominator, frac2.denominator)
        
        stepbystep.push(new ResultStep(
            "\\text{Numerador: }"+numerator.print()+"\\text{ Denominador: }"+denominator.print()
        ))

        var fractionResult = new Fraction(numerator, denominator)

        stepbystep.push(new ResultStep(
            "\\text{Entonces: }"+frac1.print()+"*"+frac2.print()+"="+fractionResult.print()
        ))

        return fractionResult

    }

    static div(frac1:Fraction, frac2:Fraction, stepbystep:ResultStep[]=[]): Fraction{

        stepbystep.push(new ResultStep(
            "\\text{Dividimos }"+frac1.print()+"\\div"+frac2.print()
        ))

        stepbystep.push(new ResultStep(
            "\\text{Obtenemos el numerador: }"+frac1.numerator.print()+"*"+frac2.denominator.print()
        ))
        stepbystep.push(new ResultStep(
            "\\text{Obtenemos el denominador: }"+frac1.denominator.print()+"*"+frac2.numerator.print()
        ))
        let numerator = Polinomio.multp( frac1.numerator, frac2.denominator )
        let denominator = Polinomio.multp(frac1.denominator, frac2.numerator)

        stepbystep.push(new ResultStep(
            "\\text{Numerador: }"+numerator.print()+"\\text{, Denominador: }"+denominator.print()
        ))

        var fractionResult = new Fraction(numerator, denominator)
        stepbystep.push(new ResultStep(
            "\\text{Entonces: }"+frac1.print()+"\\div"+frac2.print()+"="+fractionResult.print()
        ))

        return fractionResult

    }

    static sum(frac1:Fraction, frac2:Fraction, stepbystep:ResultStep[]=[]): Fraction{

        /*
            frac1    frac2
            numerator    numerator      frac1.numerator*frac2.denominator + frac2.numerator*frac1.denominator
            ----- + ------ =    -------------------------------------------------
            denominator   denominator                  frac1.denominator*frac2.denominator
        */

        stepbystep.push(new ResultStep(
            "\\text{Sumamos }"+frac1.print()+"+"+frac2.print()
        ))

        stepbystep.push(new ResultStep(
            "\\text{Obtenemos numerador: }("+frac1.numerator.print()+")*("+frac2.denominator.print()+")+("+frac1.denominator.print()+")*("+frac2.numerator.print()+")"
        ))

        let numerator = Polinomio.sum( Polinomio.multp(frac1.numerator, frac2.denominator), Polinomio.multp(frac2.numerator, frac1.denominator) )
        stepbystep.push(new ResultStep(
            "\\text{Numerador: }"+numerator.print()
        ))
        stepbystep.push(new ResultStep(
            "\\text{Obtenemos denominador: }("+frac1.denominator.print()+")*("+frac2.denominator.print()+")"
        ))
        let denominator = Polinomio.multp(frac1.denominator, frac2.denominator)
        stepbystep.push(new ResultStep(
            "\\text{Denominador: }"+denominator.print()
        ))

        stepbystep.push(new ResultStep(
            "\\text{Numerador: }"+numerator.print()+"\\text{, Denominador: }"+denominator.print()
        ))

        var fractionResult = new Fraction(numerator, denominator)

        stepbystep.push(new ResultStep(
            "\\text{Entonces: }"+frac1.print()+"+"+frac2.print()+"="+fractionResult.print()
        ))

        return fractionResult
    }

}

export default Fraction