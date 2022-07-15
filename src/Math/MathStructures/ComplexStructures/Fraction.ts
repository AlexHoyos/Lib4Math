import ResultStep from "../../MathIO/MathOutput/ResultStep";
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
        console.log("fraction is zero " + this.isZero())
        if(this.isZero() == false)
            return "\\frac{"+this.numerator.print()+"}{"+this.denominator.print()+"}"
        else
            return ""
    }

    simplify(): void {
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

    isZero():boolean {
        this.numerator.simplify()
        return this.numerator.isZero()
    }

}

export default Fraction