import NumberCoefficient from "../../../MathStructures/PrimitiveStructures/Coefficient/NumberCoefficient";
import Literal from "../../../MathStructures/PrimitiveStructures/Literal/Literal";
import Variable from "../../../MathStructures/PrimitiveStructures/Literal/Variable";
import Monomio from "../../../MathStructures/PrimitiveStructures/Monomio";
import QueryUtils from "../../../Utils/QueryUtils";
import AConstructor from "./AConstructor";

class MonomioConstructor extends AConstructor{

    product?: Monomio;

    construct(): void {
        var value:any = this.input.split('')
        var coeficiente:any = ''
        var literales:Literal = new Literal()
    
        while(QueryUtils.isNumeric(value[0]) || value[0] == '.'){
            
            coeficiente += value[0]
            value = value.slice(1, value.length)
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

        if(coeficiente == '' && literales.variables.length > 0)
            coeficiente = 1
        

        if(coeficiente == '' && literales.variables.length == 0)
            coeficiente = 0
    
        this.product = new Monomio(new NumberCoefficient(parseFloat(coeficiente)), literales)
        console.log(this.product)
    }

}

export default MonomioConstructor