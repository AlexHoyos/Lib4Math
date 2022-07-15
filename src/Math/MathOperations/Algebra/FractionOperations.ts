import ResultStep from "../../MathIO/MathOutput/ResultStep"
import Fraction from "../../MathStructures/ComplexStructures/Fraction"
import FractionDiv from "./Fraction/FractionDiv"
import FractionMultp from "./Fraction/FractionMultp"
import FractionSum from "./Fraction/FractionSum"

class FractionOperations {

    static sum(frac1:Fraction, frac2:Fraction, stepbystep:ResultStep[]=[]): Fraction{

        var result = new FractionSum(frac1, frac2, stepbystep)
        return result.resolve()
    }

    static multp(frac1:Fraction, frac2:Fraction, stepbystep:ResultStep[]=[]): Fraction{

        var result = new FractionMultp(frac1, frac2, stepbystep)
        return result.resolve()

    }

    static div(frac1:Fraction, frac2:Fraction, stepbystep:ResultStep[]=[]): Fraction{

        var result = new FractionDiv(frac1, frac2, stepbystep)
        return result.resolve()

    }

}

export default FractionOperations