import ACoefficient from "../../../MathStructures/PrimitiveStructures/Coefficient/ACoefficient";
import ConstantCoefficient from "../../../MathStructures/PrimitiveStructures/Coefficient/ConstantCoefficient";
import ConstantList from "../../../MathStructures/PrimitiveStructures/Coefficient/Constants/Constants.list";
import MixedCoefficient from "../../../MathStructures/PrimitiveStructures/Coefficient/MixedCoefficient";
import NumberCoefficient from "../../../MathStructures/PrimitiveStructures/Coefficient/NumberCoefficient";
import QueryUtils from "../../../Utils/QueryUtils";
import ConstantExtractor from "../InputExtractors/ConstantExtractor";
import AConstructor from "./AConstructor";

class CoefficientConstructor extends AConstructor {

    product?: ACoefficient;
    
    construct(): void {
        
        var inputArray = this.input.split('')
        var rawNumCoefficient = ""

        var constantCoefficients: ConstantCoefficient[] = []


        // Check if there are numbers
        while(
            QueryUtils.isNumeric(inputArray[0]) || // First element is a number, or...
            inputArray[0] == '.' // is a point, or...
        ){

            rawNumCoefficient += inputArray[0] // Concatenate to coefficient
            // Saving the rest of the array, from idx 1 to the end
            // This way we remove the element we have just checked out
            inputArray = inputArray.slice(1, inputArray.length)
        }

        this.input = inputArray.join('')

        let constantsNames:string[] = new ConstantExtractor(this.input).getExtraction()
        constantsNames.forEach(constantName => {

            constantCoefficients.push(
                new ConstantCoefficient(ConstantList[constantName])
            )

           this.input = this.input.replace(constantName, '')
        })

        this.remainder = this.input

        if(rawNumCoefficient == ""){

            if(constantCoefficients.length == 0)
                this.product = new NumberCoefficient(1)
            else if(constantCoefficients.length == 1)
                this.product = constantCoefficients[0]
            else
                this.product = new MixedCoefficient( [ new NumberCoefficient(1), ...constantCoefficients ] )
            
        } else {

            var numberCoefficient:NumberCoefficient =  new NumberCoefficient( parseFloat(rawNumCoefficient) )

            if(constantCoefficients.length == 0)
                this.product = numberCoefficient
            else
                this.product = new MixedCoefficient( [ numberCoefficient, ...constantCoefficients ] )

        }

    }

}

export default CoefficientConstructor