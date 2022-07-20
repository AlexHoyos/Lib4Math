import Fraction from "../ComplexStructures/Fraction";
import Polinomio from "../ComplexStructures/Polinomio";
import MathStructure from "../MathStructure";
import ACoefficient from "./Coefficient/ACoefficient";
import NumberCoefficient from "./Coefficient/NumberCoefficient";
import Literal from "./Literal/Literal";
import Variable from "./Literal/Variable";

class Monomio extends MathStructure{

    coeficiente: ACoefficient
    literal: Literal

    constructor(coeficiente:ACoefficient = new NumberCoefficient(0), literal = new Literal()){
        super();
        this.coeficiente = coeficiente
        this.literal = literal

    }

    print():string {

        if(this.coeficiente.getNumberValue() == 0)
            return ""
        return this.coeficiente.print()+this.literal.print()

    }

    clone(): Monomio{
        return new Monomio(this.coeficiente, this.literal.clone())
    }

    simplify(){
        this.literal.fusionVariables()
    }

    compareLiteral(literal: Literal){
        return this.literal.compare(literal)
    }

    compare(monomio: Monomio): boolean{
        if(monomio.coeficiente == this.coeficiente){

            if(this.compareLiteral(monomio.literal))
                return true

        }

        return false
    }

    toggleSign(){
        this.coeficiente.toggleSign()
    }

    addCoeficiente(coeficiente:number){

        // Convert in NumberCoefficient if not
        if( !(this.coeficiente instanceof NumberCoefficient) ){
            this.coeficiente = new NumberCoefficient(this.coeficiente.getNumberValue())
            this.addCoeficiente(coeficiente)
        } else {
            this.coeficiente.addValue(coeficiente)
        }

    }

    addVariable(variable:Variable, fusion = false){
        this.literal.addVariable(variable, fusion)
    }

    addLiteral(literal:Literal, fusion = false){

        literal.variables.forEach(variable => {

            this.addVariable(variable, false)

        })

        if(fusion)
            this.simplify()

    }

    wipeLiteral(){
        this.literal = new Literal()
    }

    toggleVariableExpSigns(){
        this.literal.toggleVariableExpSigns()
    }

    toFraction(): Fraction {
        return new Fraction(new Polinomio([this]), new Polinomio([new Monomio( new NumberCoefficient(1) )]))
    }

    hasVariables(): boolean {
        if(this.literal.variables.length > 0){

            if(this.coeficiente.isZero() == false){
                return true
            } else {
                return false
            }

        } else {
            return false
        }
    }

    isZero():boolean {
        return this.coeficiente.isZero()
    }

}

export default Monomio