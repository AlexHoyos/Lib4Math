import ACoefficient from "../../../MathStructures/PrimitiveStructures/Coefficient/ACoefficient";
import NumberCoefficient from "../../../MathStructures/PrimitiveStructures/Coefficient/NumberCoefficient";
import Literal from "../../../MathStructures/PrimitiveStructures/Literal/Literal";
import Variable from "../../../MathStructures/PrimitiveStructures/Literal/Variable";
import Monomio from "../../../MathStructures/PrimitiveStructures/Monomio";
import QueryUtils from "../../../Utils/QueryUtils";
import AConstructor from "./AConstructor";
import CoefficientConstructor from "./CoefficientConstructor";

class MonomioConstructor extends AConstructor{

    product?: Monomio;
    remainder: string = ""

    construct(): void {

        var inputArray:any = this.input.split('')
        var coeficiente:ACoefficient|undefined
        var literal:Literal = new Literal()

        let coefficientConstruct = new CoefficientConstructor(this.input)
        coeficiente = coefficientConstruct.product

        inputArray = coefficientConstruct.remainder.split('')

        if( (coeficiente instanceof ACoefficient) == false)
            coeficiente = new NumberCoefficient(1)

        // Check if there are variables
        while(
            QueryUtils.isNumeric(inputArray[0]) == false && // Is not a number and...
            QueryUtils.isOperator(inputArray[0]) == false && // Is not an operator and ...
            inputArray.length > 0 // There's at least one item in the input to be checked as a variable
        ){
            let exp = undefined
            let variable:Variable = new Variable(inputArray[0], 0)
            inputArray = inputArray.slice(1, inputArray.length)
            
            // if next element is a pow operator, set the exponential
            if(inputArray[0] == '^'){
                inputArray = inputArray.slice(1, inputArray.length)

                while(QueryUtils.isNumeric(inputArray[0])){
                    if(exp == undefined)
                        exp = ''
                    
                    exp += inputArray[0]
                    inputArray = inputArray.slice(1, inputArray.length)
    
                }

            }
    
            if(exp == undefined){
                exp = 1
            } else {
                exp = parseInt(exp)
            }
    
            variable.addExp(exp)
            literal.addVariable(variable)
    
        }
    
        this.product = new Monomio(coeficiente, literal)

    }

}

export default MonomioConstructor