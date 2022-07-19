import ResultStep from "../../../MathIO/MathOutput/StepByStep/ResultStep";
import Concat from "../../../MathStructures/ComplexStructures/Concat";
import Fraction from "../../../MathStructures/ComplexStructures/Fraction";
import Polinomio from "../../../MathStructures/ComplexStructures/Polinomio";
import Variable from "../../../MathStructures/PrimitiveStructures/Literal/Variable";
import Monomio from "../../../MathStructures/PrimitiveStructures/Monomio";
import IOperation from "../../IOperation";
import MonomioOperations from "../MonomioOperations";
import PolinomiOperations from "../PolinomioOperations";

class PolinomioDiv implements IOperation {

    struct1: Polinomio;
    struct2: Polinomio;
    stepbystep: ResultStep[];

    constructor(struct1:Polinomio, struct2:Polinomio, stepbystep:ResultStep[] = []){
        this.struct1 = struct1
        this.struct2 = struct2
        this.stepbystep = stepbystep
    }

    resolve():Polinomio | Fraction | Concat {

        if(this.struct1.monomios.length == 1 && this.struct2.monomios.length == 1){
            var result:Monomio|Fraction = MonomioOperations.div(this.struct1.monomios[0], this.struct2.monomios[0])
            if(result instanceof Monomio)
                return new Polinomio([result])
            else
                return result
        }

        if(this.struct1.monomios.length == 0 || this.struct2.monomios.length == 0){
            return new Polinomio([new Monomio()])
        }

        var struct1Clone:Polinomio = this.struct1.clone()
        var struct2Clone:Polinomio = this.struct2.clone()
        var variable:Variable|null = this.struct1.orderVariable

        if(variable instanceof Variable){

            variable = variable.clone()

            if(struct2Clone.hasVariable(variable) && struct2Clone.orderVariable instanceof Variable){

                if(!(struct2Clone.orderVariable.compareLetter(variable.letter)))
                    struct2Clone.orderQuicksortAsc(struct2Clone.monomios, variable)

                var numMon:Monomio = struct1Clone.monomios[0].clone()
                var divMon:Monomio = struct2Clone.monomios[0].clone()

                if(numMon.literal.hasVariable(variable)){
                    
                    if(numMon.literal.getVarExpValue(variable) >= divMon.literal.getVarExpValue(variable)){
                        var resultConcat: Concat = new Concat()
                        var resultDivTerm:Monomio|Fraction = MonomioOperations.div(numMon, divMon, true)
                        if(resultDivTerm instanceof Monomio){
                            var additionToRemainder:Polinomio = PolinomiOperations.multp(struct2Clone, new Polinomio([resultDivTerm]))
                            additionToRemainder.toggleSign()
                            var remainder: Polinomio = PolinomiOperations.sum(struct1Clone, additionToRemainder)
                            resultConcat.addStructure(new Polinomio([resultDivTerm.clone()]))
                            resultConcat.addStructure(PolinomiOperations.div(remainder.clone(), struct2Clone))
                            resultConcat.simplify()
                            return resultConcat
                        }
                    }

                }

            }
        }


        return new Fraction(struct1Clone, struct2Clone)

    }

}

export default PolinomioDiv