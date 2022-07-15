import ResultStep from "../../MathIO/MathOutput/ResultStep";
import Fraction from "../../MathStructures/ComplexStructures/Fraction";
import MathStructure from "../../MathStructures/MathStructure";
import Monomio from "../../MathStructures/PrimitiveStructures/Monomio";
import MonomioDiv from "./Monomio/MonomioDiv";
import MonomioMultp from "./Monomio/MonomioMultp";
import MonomioSum from "./Monomio/MonomioSum";

class MonomioOperations{

    static sum(mono1:Monomio, mono2:Monomio, stepbystep: ResultStep[] = []){

        let result = new MonomioSum(mono1, mono2, stepbystep)
        return result.resolve()

    }

    static subs(mono1:Monomio, mono2:Monomio,stepbystep: ResultStep[] = []){
        mono2.toggleSign()
        var result = MonomioOperations.sum(mono1, mono2, stepbystep)
        if(result == null)
            mono2.toggleSign()

        return result
    }

    static multp(mono1:Monomio, mono2:Monomio, stepbystep: ResultStep[] = []){
        
        let result = new MonomioMultp(mono1, mono2, stepbystep)
        return result.resolve()

    }

    static div(mono1:Monomio, mono2:Monomio, decimals:boolean = false, stepbystep: ResultStep[] = []): Monomio | Fraction {

        let result = new MonomioDiv(mono1, mono2, stepbystep)
        result.setDecimals(decimals)
        return result.resolve()

    }

    /*
    static div(mono1:Monomio, mono2:Monomio): Polinomio | Fraction{

        if(mono1.compareLiteral(mono2.literal)){
            var newCoeficiente = mono1.coeficiente/mono2.coeficiente
            if(newCoeficiente%1 == 0){
                return new Polinomio([ new Monomio(newCoeficiente)])
            } else {
                return new Fraction(new Polinomio([mono1]), new Polinomio([mono2]))
            }

        } else {
            return new Fraction(new Polinomio([mono1]), new Polinomio([mono2]))
        }

    }*/

    /*
        2xy       6
        1yx^2     3

        2yx2         2
        x
    */

}

export default MonomioOperations