import ResultStep from "../MathResult/ResultStep"
import Fraction from "./ComplexStructures/Fraction"
import Polinomio from "./ComplexStructures/Polinomio"
import MathStructure from "./MathStructure"

class MathCalculator {
    
    static multp(struct1:MathStructure, struct2:MathStructure, stepbystep:ResultStep[]=[]):MathStructure {
        
        stepbystep.push(new ResultStep(
            "\\text{Multiplicamos }"+struct1.print()+"*"+struct2.print()
        ))

        var result:MathStructure

        if(struct1 instanceof Fraction || struct2 instanceof Fraction){

            stepbystep.push(new ResultStep(
                "\\text{Ya que uno es fracción, lo pasamos a fracción }"
            ))

            result = Fraction.multp(struct1.toFraction(), struct2.toFraction(), stepbystep)
            
            stepbystep.push(new ResultStep(
                "\\text{Entonces: }"+struct1.print()+"*"+struct2.print()+"="+result.print()
            ))

            return result

        }
            

        if(struct1 instanceof Polinomio && struct2 instanceof Polinomio)
            return Polinomio.multp(struct1, struct2, stepbystep)
        

        return new Polinomio()
        
    }

    static div(struct1:MathStructure, struct2:MathStructure, stepbystep:ResultStep[]=[]):MathStructure {

        if(struct1 instanceof Fraction || struct2 instanceof Fraction)
            return Fraction.div(struct1.toFraction(), struct2.toFraction())

        if(struct1 instanceof Polinomio && struct2 instanceof Polinomio)
            return Polinomio.div(struct1, struct2)

        return new Polinomio()

    }

    static sum(struct1:MathStructure, struct2:MathStructure, stepbystep:ResultStep[]=[]):MathStructure {

        if(struct1 instanceof Fraction || struct2 instanceof Fraction)
            return Fraction.sum(struct1.toFraction(), struct2.toFraction())

        if(struct1 instanceof Polinomio && struct2 instanceof Polinomio)
            return Polinomio.sum(struct1, struct2)

        return new Polinomio()

    }
    static subs(struct1:MathStructure, struct2:MathStructure, stepbystep:ResultStep[]=[]):MathStructure {

        if(struct1 instanceof Fraction || struct2 instanceof Fraction){
            struct2.toggleSign()
            return Fraction.sum(struct1.toFraction(), struct2.toFraction())
        }

        struct2.toggleSign()
        return MathCalculator.sum(struct1, struct2)

    }
    static pow(struct1:MathStructure, struct2:Polinomio,stepbystep:ResultStep[]=[]):MathStructure {

        if(struct1 instanceof Polinomio){
            return Polinomio.pow(struct1, struct2) 
        }

        return new Polinomio()
    }

}

export default MathCalculator