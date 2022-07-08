import BinaryTree from "./BinaryTree/BinaryTree"
import TreeNode from "./BinaryTree/TreeNode"
import Polinomio from "./Math/MathStructures/ComplexStructures/Polinomio"
import MathCalculator from "./Math/MathStructures/MathCalculator"
import MathStructure from "./Math/MathStructures/MathStructure"
import Literal from "./Math/MathStructures/PrimitiveStructures/Literal/Literal"
import Variable from "./Math/MathStructures/PrimitiveStructures/Literal/Variable"
import Monomio from "./Math/MathStructures/PrimitiveStructures/Monomio"
import Operators from "./Math/Operators"

class Lib4math {

    constructor(){
        
    }

    static calculate(rawExpresion:string){

        var queryArray = rawExpresion.split('')
        var expresionTree = new BinaryTree()
        expresionTree.head = Lib4math.processExpresion(queryArray)
        if(expresionTree.getHead() instanceof TreeNode){
            let resultado = Lib4math.resolve(expresionTree.head)
            return resultado
        }

        return null
    
    }
    
    static resolve(BinaryTree: TreeNode): MathStructure{
    
        if (BinaryTree.value instanceof MathStructure){
            return BinaryTree.value
        } else {
    
            var a:MathStructure
            var b: MathStructure
    
            if(BinaryTree.left instanceof TreeNode && BinaryTree.right instanceof TreeNode){
                a = Lib4math.resolve(BinaryTree.left)
                b = Lib4math.resolve(BinaryTree.right)
            
    
                let operator = BinaryTree.value as Operators
                
                if(operator === Operators.DIV)
                    return MathCalculator.div(a,b)
                if(operator === Operators.MULTP)
                    return MathCalculator.multp(a, b)
                if(operator === Operators.SUM)
                    return MathCalculator.sum(a, b)
                if(operator === Operators.SUBS)
                    return MathCalculator.subs(a,b)
                if(operator === Operators.POW && b instanceof Polinomio)
                    return MathCalculator.pow(a, b)
                
            }
    
        }
    
        return new Polinomio()
    
    }
    
    static processExpresion(expresion:string[]): TreeNode{
    
        var tmp = JSON.parse(JSON.stringify(expresion))
    
        var openIdx = tmp.indexOf("(")
        var closeIdx = Lib4math.getIndexOfCloseParentesis(tmp, openIdx)
    
       if(openIdx == 0 && closeIdx == (tmp.length-1)){
            tmp = tmp.slice(openIdx+1, closeIdx)
            expresion = expresion.slice(openIdx+1, closeIdx)
       }
    
        while(openIdx != -1){
    
            openIdx = tmp.indexOf("(")
            closeIdx = Lib4math.getIndexOfCloseParentesis(tmp, openIdx)
    
            for(let i = openIdx; i<=closeIdx; i++){
                tmp[i] = 'x'
            }
    
            if(openIdx == -1){
                //TODO: ELIMINAR ( SOBRANTE
            }
        }
    
        var operator:any = "+"
        if(tmp.indexOf(operator) == -1){
            operator = "-"
            if(tmp.indexOf(operator) == -1){
                operator= "*"
                if(tmp.indexOf(operator) == -1){
                    operator="/"
                    if(tmp.indexOf(operator) == -1){
                        operator="^"
                        if(tmp.indexOf(operator) == -1){
                            operator = undefined
                        }
                    }
                }
            }
        }
        var left:any= null
        var right:any = null
        var value:any = 0
    
        if(operator == '^' && !Lib4math.isNumber(expresion[tmp.indexOf(operator)-1]) &&  expresion[tmp.indexOf(operator)-1] != ')')
            operator = undefined
    
        if(operator != undefined){
            value=operator
            if(tmp.indexOf(operator) != (tmp.length-1))
                right = Lib4math.processExpresion(expresion.slice((tmp.indexOf(operator)+1), (tmp.length)))
            if(tmp.indexOf(operator) != 0)
                left = Lib4math.processExpresion(expresion.slice(0, tmp.indexOf(operator)))
        } else {
    
            let monomio = Lib4math.RawValueToMonomio(expresion.join(''))
            let polinomio = new Polinomio()
            polinomio.addMonomio(monomio)
            value = polinomio
            
        }
    
        return new TreeNode(value, left, right)
    
    }
    
    
    static RawValueToMonomio(value:any): Monomio{
        value = value.split('')
        var coeficiente:any = ''
        var literales:Literal = new Literal()
    
        while(Lib4math.isNumber(value[0])){
            
            coeficiente += value[0]
            value = value.slice(1, value.length)
        }
    
        if(coeficiente == ''){
            coeficiente = 1
        }
    
        while(Lib4math.isNumber(value[0]) == false && Lib4math.isOperator(value[0]) == false && value.length > 0){
            let exp = undefined
            let literal:Variable = new Variable(value[0], 0)
            value = value.slice(1, value.length)
            
            if(value[0] == '^'){
                value = value.slice(1, value.length)
                while(Lib4math.isNumber(value[0])){
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
    
        return new Monomio(parseInt(coeficiente), literales)
    
    }
    
    static isNumber(char:string) {
        switch(parseInt(char)){
            case 1: case 2: case 3: case 4: case 5: case 6: case 7: case 8: case 9: case 0:
                return true
                break
            default:
                return false
        }
    
    }
    
    static isOperator(char:string) {
        switch(char){
            case '+':case '-': case '*': case '(': case ')': case '/': case '^':
                return true
                break
            default:
                return false;
        }
    }
    
    static getIndexOfCloseParentesis(queryArray:string[], index:number){
        let parentesis = 1;
        let closeIndex = -1
        for(let i = index+1; i<queryArray.length; i++){
            if(queryArray[i] == ')' && parentesis == 1){
                closeIndex = i
                i=queryArray.length
            }
            if(queryArray[i] == '(')
                parentesis++
            if(queryArray[i] == ')')
                parentesis--
           
        }
        return closeIndex
    }

}

console.log("lib4math v2 %cLoaded Correctly!", "color: #24E211;")

export default Lib4math
export {Lib4math as Lib4math}