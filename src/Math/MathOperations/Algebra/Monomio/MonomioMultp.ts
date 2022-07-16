import ResultStep from "../../../MathIO/MathOutput/StepByStep/ResultStep";
import MathStructure from "../../../MathStructures/MathStructure";
import Monomio from "../../../MathStructures/PrimitiveStructures/Monomio";
import IOperation from "../../IOperation";

class MonomioMultp implements IOperation {

    struct1: Monomio;
    struct2: Monomio;
    stepbystep: ResultStep[];

    constructor(struct1:Monomio, struct2:Monomio, stepbystep:ResultStep[] = []){
        this.struct1 = struct1
        this.struct2 = struct2
        this.stepbystep = stepbystep
    }

    resolve() {

        let result = new Monomio(0)

        let newCoeficiente = this.struct1.coeficiente*this.struct2.coeficiente
        result.addLiteral( this.struct1.literal.clone() , true)
        result.addLiteral( this.struct2.literal.clone() , true)
        result.coeficiente = newCoeficiente
        result.simplify()
        return result

    }

}

export default MonomioMultp