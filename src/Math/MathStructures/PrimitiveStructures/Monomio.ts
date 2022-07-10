import QueryUtils from "../../Utils/Utils";
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
        this.coeficiente = parseFloat(coeficiente.toFixed(5))
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

    wipeLiteral(){
        this.literal = new Literal()
    }

    toggleVariableExpSigns(){
        this.literal.toggleVariableExpSigns()
    }

    toFraction(): Fraction {
        return new Fraction(new Polinomio([this]), new Polinomio([new Monomio(1)]))
    }

    hasVariables(): boolean {
        if(this.literal.variables.length > 0){

            console.log("coeficiente = "+this.coeficiente)
            if(this.coeficiente != 0){
                return true
            } else {
                return false
            }

        } else {
            return false
        }
    }

    isZero():boolean {
        return (this.coeficiente == 0)
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
    /*
    static div(mono1:Monomio, mono2:Monomio): Polinomio | Fraction{

        if(mono1.compareLiteral(mono2.literal)){
            var newCoeficiente = mono1.coeficiente/mono2.coeficiente
            if(newCoeficiente%1 == 0){
                return new Polinomio([ new Monomio(newCoeficiente)])
            } else {
                return new Fraction(new Polinomio([mono1]), new Polinomio([mono2]))
            }

        } else {
            return new Fraction(new Polinomio([mono1]), new Polinomio([mono2]))
        }

    }*/

    /*
        2xy       6
        1yx^2     3

        2yx2         2
        x
    */
    static div(mono1:Monomio, mono2:Monomio, decimals:boolean = false): Monomio | Fraction {

        console.log("here1")
        if(mono1.hasVariables() == false || mono2.hasVariables() == false)
            return new Fraction(new Polinomio([mono1]), new Polinomio([mono2]))
        
        console.log("here2")
        if(mono1.compare(mono2) == true)
            return new Monomio(1, new Literal())

        console.log("here3")
        if(mono1.compareLiteral(mono2.literal)){
            var newCoeficiente = mono1.coeficiente/mono2.coeficiente
            if(newCoeficiente%1 == 0 || decimals == true){
                return new Monomio(newCoeficiente)
            } else {
                let mono1Clone = mono1.clone()
                mono1Clone.wipeLiteral()
                let mono2Clone = mono2.clone()
                mono2Clone.wipeLiteral()
                return new Fraction(new Polinomio([mono1Clone]), new Polinomio([mono2Clone]))
            }
        }

        var mono1Clone = mono1.clone()
        var mono2Clone = mono2.clone()
        var mono2Literal = mono2Clone.literal
        mono2Literal.toggleVariableExpSigns()
        mono1Clone.addLiteral(mono2Literal, true)
        mono2Clone.wipeLiteral()
        var negativeExpVariables:Variable[] = mono1Clone.literal.clone().variables.filter(variable => variable.exp < 0 )
        mono2Literal = new Literal(negativeExpVariables)
        mono2Literal.toggleVariableExpSigns()
        mono2Clone.addLiteral(mono2Literal)
        mono1Clone.addLiteral(mono2Literal, true) // removing negative exp variables
        
        var newCoeficiente = mono1Clone.coeficiente/mono2Clone.coeficiente
        console.log("New Coeficiente ", newCoeficiente)
        if(newCoeficiente%1 == 0 || decimals == true ){
            mono2Clone.coeficiente = 1
            mono1Clone.coeficiente = newCoeficiente
        }

        if(mono2Clone.hasVariables() == false && mono2Clone.coeficiente == 1){
            return mono1Clone
        }

        return new Fraction(new Polinomio([mono1Clone]), new Polinomio([mono2Clone]))
    }

    static RawValueToMonomio(value:any): Monomio{
        
        value = value.split('')
        var coeficiente:any = ''
        var literales:Literal = new Literal()
    
        while(QueryUtils.isNumeric(value[0]) || value[0] == '.'){
            
            coeficiente += value[0]
            value = value.slice(1, value.length)
        }
    
        if(coeficiente == ''){
            coeficiente = 1
        }
    
        while(QueryUtils.isNumeric(value[0]) == false && QueryUtils.isOperator(value[0]) == false && value.length > 0){
            let exp = undefined
            let literal:Variable = new Variable(value[0], 0)
            value = value.slice(1, value.length)
            
            if(value[0] == '^'){
                value = value.slice(1, value.length)
                while(QueryUtils.isNumeric(value[0])){
                    if(exp == undefined)
                        exp = ''
                    
                    exp += value[0]
                    value = value.slice(1, value.length)
    
                }
            }
    
            if(exp == undefined){
                exp = 1
            } else {
                exp = parseInt(exp)
            }
    
            literal.addExp(exp)
            literales.addVariable(literal)
    
        }
    
        return new Monomio(parseFloat(coeficiente), literales)
    
    }

}

export default Monomio