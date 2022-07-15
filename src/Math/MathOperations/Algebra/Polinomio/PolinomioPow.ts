import ResultStep from "../../../MathIO/MathOutput/ResultStep";
import Polinomio from "../../../MathStructures/ComplexStructures/Polinomio";
import Monomio from "../../../MathStructures/PrimitiveStructures/Monomio";
import IOperation from "../../IOperation";
import PolinomiOperations from "../PolinomioOperations";

class PolinomioPow implements IOperation {

    struct1: Polinomio;
    struct2: Polinomio;
    stepbystep: ResultStep[];

    constructor(struct1:Polinomio, struct2:Polinomio, stepbystep:ResultStep[] = []){
        this.struct1 = struct1
        this.struct2 = struct2
        this.stepbystep = stepbystep
    }

    resolve(): Polinomio {

        var Exp = this.struct2.monomios[0].coeficiente

        var result = new Polinomio([ new Monomio() ])

        for(let i = 0; i<Exp; i++){
            result = PolinomiOperations.multp(result, this.struct1)
        }

        return result

    }

}

export default PolinomioPow