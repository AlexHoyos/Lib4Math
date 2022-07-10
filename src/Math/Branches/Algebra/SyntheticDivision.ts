import MathStructure from "../../MathStructures/MathStructure";

class SyntheticDivision {

    numerator: MathStructure
    denominator: MathStructure
    result:MathStructure|null = null
    remainder: MathStructure|null = null

    constructor(numerator: MathStructure, denominator: MathStructure){
        this.numerator = numerator
        this.denominator = denominator
    }

    

}