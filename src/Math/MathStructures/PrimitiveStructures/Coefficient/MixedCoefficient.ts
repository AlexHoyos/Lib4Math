import ACoefficient from "./ACoefficient";
import ConstantCoefficient from "./ConstantCoefficient";
import NumberCoefficient from "./NumberCoefficient";

type CoefficientList = [NumberCoefficient, ...ConstantCoefficient[]]

class MixedCoefficient extends ACoefficient {

    private _coefficients:CoefficientList

    constructor(coefficients:CoefficientList){
        super(0)
        this._coefficients = coefficients

        var num: number = this._coefficients[0].getNumberValue()
        console.log(this._coefficients)
        this._coefficients.slice(1, this._coefficients.length).forEach(coefficient => num*=coefficient.getNumberValue())

        this._numericalValue = num
        
    }

    print(): string {
        var printedCoefficient:string = ""

        this._coefficients.forEach(coefficient => {
            printedCoefficient += coefficient.print()
        })

        return printedCoefficient
    }

    toggleSign(): void {
        if(this._coefficients.length > 0)
            this._coefficients[0].toggleSign()
    }

}

export default MixedCoefficient