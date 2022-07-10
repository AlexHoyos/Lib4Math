import Fraction from "./ComplexStructures/Fraction";

abstract class MathStructure{

    abstract print():string
    abstract simplify():void
    abstract compare(a:MathStructure):boolean
    abstract clone():MathStructure
    abstract toggleSign(): void
    abstract toFraction(): Fraction
    abstract isZero(): boolean

}


export default MathStructure