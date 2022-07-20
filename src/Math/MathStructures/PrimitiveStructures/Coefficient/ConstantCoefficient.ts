import ACoefficient from "./ACoefficient";
import AConstant from "./Constants/AConstant";

class ConstantCoefficient extends ACoefficient {

    private _constant:AConstant
    private _sign:string = ""

    constructor(constant:AConstant){
        super(constant.getValue())
        this._constant = constant
        this._numericalValue = constant.getValue()
    }

    print(): string {
        return this._sign + this._constant.getChar()
    }

    toggleSign(): void {
        this._numericalValue *= -1
        this._sign = (this._sign == "-") ? "" : "-"
    }

}

export default ConstantCoefficient