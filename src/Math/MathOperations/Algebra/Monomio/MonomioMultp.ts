import ResultStep from "../../../MathIO/MathOutput/StepByStep/ResultStep";
import MathStructure from "../../../MathStructures/MathStructure";
import NumberCoefficient from "../../../MathStructures/PrimitiveStructures/Coefficient/NumberCoefficient";
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

        let result = new Monomio()

        let newCoeficiente = this.struct1.coeficiente.getNumberValue()*this.struct2.coeficiente.getNumberValue()
        result.addLiteral( this.struct1.literal.clone() , true)
        result.addLiteral( this.struct2.literal.clone() , true)
        result.coeficiente = new NumberCoefficient(newCoeficiente)
        result.simplify()
        return result

    }

}

export default MonomioMultp