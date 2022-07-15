import ResultStep from "../../../MathIO/MathOutput/ResultStep";
import Polinomio from "../../../MathStructures/ComplexStructures/Polinomio";
import MathStructure from "../../../MathStructures/MathStructure";
import Monomio from "../../../MathStructures/PrimitiveStructures/Monomio";
import IOperation from "../../IOperation";

class MonomioSum implements IOperation {

    struct1: Monomio;
    struct2: Monomio;
    stepbystep: ResultStep[];

    constructor(struct1:Monomio, struct2:Monomio, stepbystep:ResultStep[] = []){
        this.struct1 = struct1
        this.struct2 = struct2
        this.stepbystep = stepbystep
    }

    resolve() {

        var suma = new Monomio(this.struct1.coeficiente, this.struct1.literal.clone())

        if(suma.compareLiteral(this.struct2.literal)){
            suma.addCoeficiente(this.struct2.coeficiente)
            return suma

        } else {
            return new Polinomio()
        }

    }

}

export default MonomioSum