import BinaryTree from "./BinaryTree/BinaryTree"
import TreeNode from "./BinaryTree/TreeNode"
import Polinomio from "./Math/MathStructures/ComplexStructures/Polinomio"
import MathStructure from "./Math/MathStructures/MathStructure"
import Literal from "./Math/MathStructures/PrimitiveStructures/Literal/Literal"
import Variable from "./Math/MathStructures/PrimitiveStructures/Literal/Variable"
import Monomio from "./Math/MathStructures/PrimitiveStructures/Monomio"
import Operators from "./Math/Operators"

class SuperCalcu {

    constructor(){
        
    }

    static calculate(rawExpresion:string){

        var queryArray = rawExpresion.split('')
        var expresionTree = new BinaryTree()
        expresionTree.head = SuperCalcu.processExpresion(queryArray)
        console.log(expresionTree.head)
        if(expresionTree.getHead() instanceof TreeNode){
            let resultado = SuperCalcu.resolve(expresionTree.head)
            console.log(resultado)
            console.log(resultado.print())
        }
    
    }
    
    static resolve(BinaryTree: TreeNode): MathStructure{
    
        if (BinaryTree.value instanceof MathStructure){
            return BinaryTree.value
        } else {
    
            var a:MathStructure
            var b: MathStructure
    
            if(BinaryTree.left instanceof TreeNode && BinaryTree.right instanceof TreeNode){
                a = SuperCalcu.resolve(BinaryTree.left)
                b = SuperCalcu.resolve(BinaryTree.right)
            
    
                let operator = BinaryTree.value
                /*
                if(operator == Operators.DIV)
                    return MathStructure.div(a,b)
                if(operator == '*')
                    return MathStructure.multp(a, b)
                if(operator == '+')
                    return MathStructure.sum(a, b)
                if(operator == '-')
                    return MathStructure.subs(a,b)
                if(operator == '^' && b instanceof Polinomio)
                    return MathStructure.pow(a, b)
                */
            }
    
        }
    
        return new Polinomio()
    
    }
    
    static processExpresion(expresion:string[]): TreeNode{
    
        var tmp = JSON.parse(JSON.stringify(expresion))
    
        var openIdx = tmp.indexOf("(")
        var closeIdx = SuperCalcu.getIndexOfCloseParentesis(tmp, openIdx)
    
       if(openIdx == 0 && closeIdx == (tmp.length-1)){
            tmp = tmp.slice(openIdx+1, closeIdx)
            expresion = expresion.slice(openIdx+1, closeIdx)
       }
    
        while(openIdx != -1){
    
            openIdx = tmp.indexOf("(")
            closeIdx = SuperCalcu.getIndexOfCloseParentesis(tmp, openIdx)
    
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
    
        if(operator == '^' && !SuperCalcu.isNumber(expresion[tmp.indexOf(operator)-1]) &&  expresion[tmp.indexOf(operator)-1] != ')')
            operator = undefined
    
        if(operator != undefined){
            value=operator
            if(tmp.indexOf(operator) != (tmp.length-1))
                right = SuperCalcu.processExpresion(expresion.slice((tmp.indexOf(operator)+1), (tmp.length)))
            if(tmp.indexOf(operator) != 0)
                left = SuperCalcu.processExpresion(expresion.slice(0, tmp.indexOf(operator)))
        } else {
    
            let monomio = SuperCalcu.RawValueToMonomio(expresion.join(''))
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
    
        while(SuperCalcu.isNumber(value[0])){
            
            coeficiente += value[0]
            value = value.slice(1, value.length)
        }
    
        if(coeficiente == ''){
            coeficiente = 1
        }
    
        while(SuperCalcu.isNumber(value[0]) == false && SuperCalcu.isOperator(value[0]) == false && value.length > 0){
            let exp = undefined
            let literal:Variable = new Variable(value[0], 0)
            value = value.slice(1, value.length)
            
            if(value[0] == '^'){
                value = value.slice(1, value.length)
                while(SuperCalcu.isNumber(value[0])){
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
    
        return new Monomio(coeficiente, literales)
    
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

console.log("XD")

export default SuperCalcu
export {SuperCalcu as SuperCalcu}