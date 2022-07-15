import ResultStep from "../../MathIO/MathOutput/ResultStep"
import FractionOperations from "../../MathOperations/Algebra/FractionOperations"
import PolinomiOperations from "../../MathOperations/Algebra/PolinomioOperations"
import Fraction from "../../MathStructures/ComplexStructures/Fraction"
import Polinomio from "../../MathStructures/ComplexStructures/Polinomio"
import MathStructure from "../../MathStructures/MathStructure"

class AlgebraCalculator {
    
    static multp(struct1:MathStructure, struct2:MathStructure, stepbystep:ResultStep[]=[]):MathStructure {
        
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
            result = PolinomiOperations.multp(struct1, struct2, stepbystep)

            stepbystep.push(new ResultStep(
                "\\text{Entonces: }("+struct1.print()+")*("+struct2.print()+")="+result.print()
            ))

            return result
        }
            
        

        return new Polinomio()
        
    }

    static div(struct1:MathStructure, struct2:MathStructure, stepbystep:ResultStep[]=[]):MathStructure {

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

    static sum(struct1:MathStructure, struct2:MathStructure, stepbystep:ResultStep[]=[]):MathStructure {

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
    static subs(struct1:MathStructure, struct2:MathStructure, stepbystep:ResultStep[]=[]):MathStructure {

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
        return AlgebraCalculator.sum(struct1, struct2, stepbystep)

    }
    static pow(struct1:MathStructure, struct2:Polinomio,stepbystep:ResultStep[]=[]):MathStructure {

        if(struct1 instanceof Polinomio){
            return PolinomiOperations.pow(struct1, struct2, stepbystep) 
        }

        return new Polinomio()
    }

}

export default AlgebraCalculator