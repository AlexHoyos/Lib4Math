import Fraction from "../ComplexStructures/Fraction";
import Polinomio from "../ComplexStructures/Polinomio";
import MathStructure from "../MathStructure";
import Literal from "./Literal/Literal";
import Variable from "./Literal/Variable";

class Monomio extends MathStructure{

    coeficiente: number
    literal: Literal

    constructor(coeficiente = 1, literal = new Literal()){
        super();
        this.coeficiente = coeficiente
        this.literal = literal

    }

    print():string {

        if(this.coeficiente == 0)
            return ""
        return this.coeficiente+this.literal.print()

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
        this.coeficiente *= -1
    }

    addCoeficiente(coeficiente:number){
        this.coeficiente+=coeficiente
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

    toggleVariableExpSigns(){
        this.literal.toggleVariableExpSigns()
    }

    toFraction(): Fraction {
        return new Fraction(new Polinomio([this]), new Polinomio([new Monomio(1)]))
    }

    static sum(mono1:Monomio, mono2:Monomio){


        var suma = new Monomio(mono1.coeficiente, mono1.literal.clone())

        if(suma.compareLiteral(mono2.literal)){
            suma.addCoeficiente(mono2.coeficiente)
            return suma

        } else {
            return new Polinomio()
        }
    }

    static subs(mono1:Monomio, mono2:Monomio){
        mono2.toggleSign()
        var result = Monomio.sum(mono1, mono2)
        if(result == null)
            mono2.toggleSign()
        return result
    }

    static multp(mono1:Monomio, mono2:Monomio){
        
        let result = new Monomio(0)

        let newCoeficiente = mono1.coeficiente*mono2.coeficiente
        result.addLiteral( mono1.literal.clone() , true)
        result.addLiteral( mono2.literal.clone() , true)
        result.coeficiente = newCoeficiente
        result.simplify()
        return result

    }

    static div(mono1:Monomio, mono2:Monomio){
        mono2.toggleVariableExpSigns()
        return Monomio.multp(mono1, mono2)
    }

}

export default Monomio