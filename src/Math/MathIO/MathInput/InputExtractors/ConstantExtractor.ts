import ConstantList from "../../../MathStructures/PrimitiveStructures/Coefficient/Constants/Constants.list";
import AExtractor from "./AExtractor";

class ConstantExtractor extends AExtractor {

    extract(): void {
        
        var constantsNames: string[] = []

        // TODO: Extract constants from string
        Object.keys(ConstantList).forEach(constantName => {

            while(this.input.includes(constantName)){
                console.log(this.input)
                constantsNames.push(constantName)
                this.input = this.input.replace(constantName, '')

            }

        })

        this._extraction = constantsNames

    }

}

export default ConstantExtractor