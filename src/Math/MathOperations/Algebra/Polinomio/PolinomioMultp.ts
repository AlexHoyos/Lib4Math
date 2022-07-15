import ResultStep from "../../../MathIO/MathOutput/ResultStep";
import Polinomio from "../../../MathStructures/ComplexStructures/Polinomio";
import IOperation from "../../IOperation";
import MonomioOperations from "../MonomioOperations";

class PolinomioMultp implements IOperation {

    struct1: Polinomio;
    struct2: Polinomio;
    stepbystep: ResultStep[];

    constructor(struct1:Polinomio, struct2:Polinomio, stepbystep:ResultStep[] = []){
        this.struct1 = struct1
        this.struct2 = struct2
        this.stepbystep = stepbystep
    }

    resolve(): Polinomio {

        var result = new Polinomio()

        this.struct1.monomios.forEach(mono1 => {

            this.struct2.monomios.forEach(mono2 => {

                result.addMonomio( MonomioOperations.multp(mono1, mono2) )

            })

        })

        result.simplify()
        return result

    }

}

export default PolinomioMultp