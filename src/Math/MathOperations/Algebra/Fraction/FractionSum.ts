import ResultStep from "../../../MathIO/MathOutput/StepByStep/ResultStep";
import Fraction from "../../../MathStructures/ComplexStructures/Fraction";
import MathStructure from "../../../MathStructures/MathStructure";
import IOperation from "../../IOperation";
import PolinomiOperations from "../PolinomioOperations";

class FractionSum implements IOperation {

    struct1: Fraction;
    struct2: Fraction;
    stepbystep: ResultStep[];

    constructor(struct1:Fraction, struct2:Fraction, stepbystep:ResultStep[] = []){
        this.struct1 = struct1
        this.struct2 = struct2
        this.stepbystep = stepbystep
    }

    resolve(): Fraction {
        /*
            this.struct1    this.struct2
            numerator    numerator      this.struct1.numerator*this.struct2.denominator + this.struct2.numerator*this.struct1.denominator
            ----- + ------ =    -------------------------------------------------
            denominator   denominator                  this.struct1.denominator*this.struct2.denominator
        */

            this.stepbystep.push(new ResultStep(
                "\\text{Sumamos }"+this.struct1.print()+"+"+this.struct2.print()
            ))
    
            this.stepbystep.push(new ResultStep(
                "\\text{Obtenemos numerador: }("+this.struct1.numerator.print()+")*("+this.struct2.denominator.print()+")+("+this.struct1.denominator.print()+")*("+this.struct2.numerator.print()+")"
            ))
    
            let numerator = PolinomiOperations.sum( PolinomiOperations.multp(this.struct1.numerator, this.struct2.denominator), PolinomiOperations.multp(this.struct2.numerator, this.struct1.denominator) )
            this.stepbystep.push(new ResultStep(
                "\\text{Numerador: }"+numerator.print()
            ))
            this.stepbystep.push(new ResultStep(
                "\\text{Obtenemos denominador: }("+this.struct1.denominator.print()+")*("+this.struct2.denominator.print()+")"
            ))
            let denominator = PolinomiOperations.multp(this.struct1.denominator, this.struct2.denominator)
            this.stepbystep.push(new ResultStep(
                "\\text{Denominador: }"+denominator.print()
            ))
    
            this.stepbystep.push(new ResultStep(
                "\\text{Numerador: }"+numerator.print()+"\\text{, Denominador: }"+denominator.print()
            ))
    
            var fractionResult = new Fraction(numerator, denominator)
    
            this.stepbystep.push(new ResultStep(
                "\\text{Entonces: }"+this.struct1.print()+"+"+this.struct2.print()+"="+fractionResult.print()
            ))
    
            return fractionResult
    }

}

export default FractionSum