import ResultStep from "../../../MathIO/MathOutput/StepByStep/ResultStep";
import Fraction from "../../../MathStructures/ComplexStructures/Fraction";
import Polinomio from "../../../MathStructures/ComplexStructures/Polinomio";
import MathStructure from "../../../MathStructures/MathStructure";
import Literal from "../../../MathStructures/PrimitiveStructures/Literal/Literal";
import Variable from "../../../MathStructures/PrimitiveStructures/Literal/Variable";
import Monomio from "../../../MathStructures/PrimitiveStructures/Monomio";
import IOperation from "../../IOperation";

class MonomioDiv implements IOperation {

    struct1: Monomio;
    struct2: Monomio;
    stepbystep: ResultStep[];
    private decimals:boolean = false

    constructor(struct1:Monomio, struct2:Monomio, stepbystep:ResultStep[] = []){
        this.struct1 = struct1
        this.struct2 = struct2
        this.stepbystep = stepbystep
    }

    setDecimals(value:boolean){
        this.decimals = value
    }

    resolve(): Monomio | Fraction {

        if(this.struct1.hasVariables() == false || this.struct2.hasVariables() == false)
            return new Fraction(new Polinomio([this.struct1]), new Polinomio([this.struct2]))
        
        if(this.struct1.compare(this.struct2) == true)
            return new Monomio(1, new Literal())

        if(this.struct1.compareLiteral(this.struct2.literal)){
            var newCoeficiente = this.struct1.coeficiente/this.struct2.coeficiente
            if(newCoeficiente%1 == 0 || this.decimals == true){
                return new Monomio(newCoeficiente)
            } else {
                let struct1Clone = this.struct1.clone()
                struct1Clone.wipeLiteral()
                let struct2Clone = this.struct2.clone()
                struct2Clone.wipeLiteral()
                return new Fraction(new Polinomio([struct1Clone]), new Polinomio([struct2Clone]))
            }
        }

        var struct1Clone = this.struct1.clone()
        var struct2Clone = this.struct2.clone()
        var struct2Literal = struct2Clone.literal
        struct2Literal.toggleVariableExpSigns()
        struct1Clone.addLiteral(struct2Literal, true)
        struct2Clone.wipeLiteral()
        var negativeExpVariables:Variable[] = struct1Clone.literal.clone().variables.filter(variable => variable.exp < 0 )
        struct2Literal = new Literal(negativeExpVariables)
        struct2Literal.toggleVariableExpSigns()
        struct2Clone.addLiteral(struct2Literal)
        struct1Clone.addLiteral(struct2Literal, true) // removing negative exp variables
        
        var newCoeficiente = struct1Clone.coeficiente/struct2Clone.coeficiente
        if(newCoeficiente%1 == 0 || this.decimals == true ){
            struct2Clone.coeficiente = 1
            struct1Clone.coeficiente = newCoeficiente
        }

        if(struct2Clone.hasVariables() == false && struct2Clone.coeficiente == 1){
            return struct1Clone
        }

        return new Fraction(new Polinomio([struct1Clone]), new Polinomio([struct2Clone]))

    }

}

export default MonomioDiv