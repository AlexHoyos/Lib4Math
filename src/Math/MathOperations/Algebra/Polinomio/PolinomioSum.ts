import ResultStep from "../../../MathIO/MathOutput/ResultStep";
import Polinomio from "../../../MathStructures/ComplexStructures/Polinomio";
import MathStructure from "../../../MathStructures/MathStructure";
import IOperation from "../../IOperation";

class PolinomioSum implements IOperation {

    struct1: Polinomio;
    struct2: Polinomio;
    stepbystep: ResultStep[];

    constructor(struct1:Polinomio, struct2:Polinomio, stepbystep:ResultStep[] = []){
        this.struct1 = struct1
        this.struct2 = struct2
        this.stepbystep = stepbystep
    }

    resolve(): Polinomio {

        var suma = this.struct1.clone()

        if(this.struct1.isZero())
            return this.struct2

        if(this.struct2.isZero())
            return this.struct1

        this.struct2.monomios.forEach(monomio => {
            suma.addMonomio(monomio)
        })
        suma.simplify()

        return suma

    }

}

export default PolinomioSum