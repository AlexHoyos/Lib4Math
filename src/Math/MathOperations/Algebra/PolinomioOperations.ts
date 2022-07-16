import ResultStep from "../../MathIO/MathOutput/StepByStep/ResultStep"
import Concat from "../../MathStructures/ComplexStructures/Concat"
import Fraction from "../../MathStructures/ComplexStructures/Fraction"
import Polinomio from "../../MathStructures/ComplexStructures/Polinomio"
import PolinomioDiv from "./Polinomio/PolinomioDiv"
import PolinomioMultp from "./Polinomio/PolinomioMultp"
import PolinomioPow from "./Polinomio/PolinomioPow"
import PolinomioSum from "./Polinomio/PolinomioSum"

class PolinomiOperations {

    static sum(poli1:Polinomio, poli2:Polinomio, stepbystep:ResultStep[]=[]): Polinomio{

        var result = new PolinomioSum(poli1, poli2, stepbystep)
        return result.resolve()

    }

    static subs(poli1:Polinomio, poli2:Polinomio, stepbystep:ResultStep[]=[]): Polinomio{

        poli2.toggleMonoSigns()

        var resta = PolinomiOperations.sum(poli1, poli2)
        return resta
    }

    static multp(poli1:Polinomio, poli2:Polinomio, stepbystep:ResultStep[]=[]): Polinomio{

        var result = new PolinomioMultp(poli1, poli2, stepbystep)
        return result.resolve()

    }

    static div(poli1:Polinomio, poli2:Polinomio, stepbystep:ResultStep[]=[]): Polinomio | Fraction | Concat {

        var result = new PolinomioDiv(poli1, poli2, stepbystep)
        return result.resolve()

    }

    static pow(poli1:Polinomio, poli2:Polinomio, stepbystep:ResultStep[]=[]): Polinomio{

        var result = new PolinomioPow(poli1, poli2, stepbystep)
        return result.resolve()

    }

}

export default PolinomiOperations