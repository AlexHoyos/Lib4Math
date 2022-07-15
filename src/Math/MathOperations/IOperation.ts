import ResultStep from "../MathIO/MathOutput/ResultStep";
import MathStructure from "../MathStructures/MathStructure";

interface IOperation {

    struct1: MathStructure
    struct2: MathStructure
    stepbystep: ResultStep[]

    resolve():MathStructure

}

export default IOperation