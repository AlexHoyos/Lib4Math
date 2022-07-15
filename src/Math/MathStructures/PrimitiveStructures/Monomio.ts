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