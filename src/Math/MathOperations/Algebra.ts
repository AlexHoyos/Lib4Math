import ResultStep from "../MathIO/MathOutput/StepByStep/ResultStep"
import Fraction from "../MathStructures/ComplexStructures/Fraction"
import Polinomio from "../MathStructures/ComplexStructures/Polinomio"
import MathStructure from "../MathStructures/MathStructure"
import FractionOperations from "./Algebra/FractionOperations"
import PolinomiOperations from "./Algebra/PolinomioOperations"

class Algebra {
    
    private static instance:Algebra

    private constructor(){}

    static getCalculator():Algebra {
        if(this.instance == null)
            this.instance = new Algebra()

        return this.instance

    }

    multp(struct1:MathStructure, struct2:MathStructure, stepbystep:ResultStep[]=[]):MathStructure {
        
        stepbystep.push(new ResultStep(
            "\\text{Multiplicamos }("+struct1.print()+")*("+struct2.print()+")"
        ))

        var result:MathStructure

        if(struct1 instanceof Fraction || struct2 instanceof Fraction){

            stepbystep.push(new ResultStep(
                "\\text{Ya que uno es fracción, pasamos todos a fracción }"
            ))

            result = FractionOperations.multp(struct1.toFraction(), struct2.toFraction(), stepbystep)
            
            stepbystep.push(new ResultStep(
                "\\text{Entonces: }("+struct1.print()+")*("+struct2.print()+")="+result.print()
            ))

            return result

        }
            

        if(struct1 instanceof Polinomio && struct2 instanceof Polinomio){
            return PolinomiOperations.multp(struct1, struct2, stepbystep)
        }
            

        return new Polinomio()
        
    }

    div(struct1:MathStructure, struct2:MathStructure, stepbystep:ResultStep[]=[]):MathStructure {

        stepbystep.push(new ResultStep(
            "\\text{Dividimos }("+struct1.print()+")\\div("+struct2.print()+")"
        ))

        var result:MathStructure

        if(struct1 instanceof Fraction || struct2 instanceof Fraction){

            stepbystep.push(new ResultStep(
                "\\text{Ya que uno es fracción, pasamos todos a fracción }"
            ))

            result = FractionOperations.div(struct1.toFraction(), struct2.toFraction(), stepbystep)

            stepbystep.push(new ResultStep(
                "\\text{Entonces: }("+struct1.print()+")\\div("+struct2.print()+")="+result.print()
            ))

            return result
        }

        if(struct1 instanceof Polinomio && struct2 instanceof Polinomio){

            result = PolinomiOperations.div(struct1, struct2, stepbystep)

            stepbystep.push(new ResultStep(
                "\\text{Entonces: }("+struct1.print()+")\\div("+struct2.print()+")="+result.print()
            ))

            return result
        }
            

        return new Polinomio()

    }

    sum(struct1:MathStructure, struct2:MathStructure, stepbystep:ResultStep[]=[]):MathStructure {

        stepbystep.push(new ResultStep(
            "\\text{Sumamos }("+struct1.print()+")+("+struct2.print()+")"
        ))

        var result:MathStructure

        if(struct1 instanceof Fraction || struct2 instanceof Fraction){

            stepbystep.push(new ResultStep(
                "\\text{Ya que uno es fracción, pasamos todos a fracción }"
            ))
            result = FractionOperations.sum(struct1.toFraction(), struct2.toFraction(), stepbystep)
            stepbystep.push(new ResultStep(
                "\\text{Entonces: }("+struct1.print()+")+("+struct2.print()+")="+result.print()
            ))
            return result
        }
            

        if(struct1 instanceof Polinomio && struct2 instanceof Polinomio){
            result =  PolinomiOperations.sum(struct1, struct2, stepbystep)
            stepbystep.push(new ResultStep(
                "\\text{Entonces: }("+struct1.print()+")+("+struct2.print()+")="+result.print()
            ))
            return result
        }
            

        return new Polinomio()

    }
    subs(struct1:MathStructure, struct2:MathStructure, stepbystep:ResultStep[]=[]):MathStructure {

        stepbystep.push(new ResultStep(
            "\\text{Restamos }("+struct1.print()+")-("+struct2.print()+")"
        ))

        if(struct1 instanceof Fraction || struct2 instanceof Fraction){
            let result:MathStructure
            stepbystep.push(new ResultStep(
                "\\text{Cambiamos signo a }"+struct2.print()+" y hacemos suma de fracciones"
            ))
            struct2.toggleSign()
            result = FractionOperations.sum(struct1.toFraction(), struct2.toFraction(), stepbystep)
            stepbystep.push(new ResultStep(
                "\\text{Entonces }("+struct1.print()+")+("+struct2.print()+")="+result.print()
            ))
            return result
        }

        stepbystep.push(new ResultStep(
            "\\text{Cambiamos signo a }"+struct2.print()+" y hacemos suma de fracciones"
        ))

        struct2.toggleSign()
        return Algebra.getCalculator().sum(struct1, struct2, stepbystep)

    }
    pow(struct1:MathStructure, struct2:Polinomio,stepbystep:ResultStep[]=[]):MathStructure {

        if(struct1 instanceof Polinomio){
            return PolinomiOperations.pow(struct1, struct2, stepbystep) 
        }

        return new Polinomio()
    }

}

export default Algebra