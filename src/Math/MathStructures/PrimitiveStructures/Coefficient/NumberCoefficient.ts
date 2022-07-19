import ACoefficient from "./ACoefficient";

class NumberCoefficient extends ACoefficient {

    print(): string {
        return this._numericalValue.toString()
    }

    toggleSign(): void {
        this._numericalValue *= -1
    }
    
    addValue(value:number){
        this._numericalValue += value
    }

}

export default NumberCoefficient