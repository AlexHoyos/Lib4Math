
abstract class ACoefficient {

    protected _numericalValue:number

    constructor(value:number = 0){
        this._numericalValue = parseFloat(value.toFixed(5))
    }

    abstract print():string

    printNumerical():string {
        return this._numericalValue.toString()
    }

    getNumberValue():number {
        return this._numericalValue
    }

    isZero():boolean {
        return (this.getNumberValue() == 0)
    }

    abstract toggleSign():void

}

export default ACoefficient