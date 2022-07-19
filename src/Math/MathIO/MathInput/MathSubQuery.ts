import TreeNode from "../../../BinaryTree/TreeNode"
import Polinomio from "../../MathStructures/ComplexStructures/Polinomio"
import MathStructure from "../../MathStructures/MathStructure"
import Monomio from "../../MathStructures/PrimitiveStructures/Monomio"
import Operators from "../../MathStructures/Operators"
import QueryUtils from "../../Utils/Utils"
import ResultStep from "../MathOutput/StepByStep/ResultStep"
import Algebra from "../../MathOperations/Algebra"
import DeleteParentesisShellFilter from "./InputFilters/DeleteParentesisShellFilter"

class MathSubQuery {

    subQuery:string
    queryNode: TreeNode | null

    constructor(subQuery: string){
        this.subQuery = subQuery
        this.queryNode = null
        this.generateTreeNode()
    }

    getQueryNode(): TreeNode | null{
        return this.queryNode
    }

    resolveAlgebra(BinaryTree: TreeNode|null = this.queryNode, stepbystep:ResultStep[] = []): MathStructure{
        
        var calculator = Algebra.getCalculator()

        if(BinaryTree != null){

            if (BinaryTree.value instanceof MathStructure){
                return BinaryTree.value
            } else {
        
                var a: MathStructure
                var b: MathStructure
        
                if(BinaryTree.left instanceof TreeNode && BinaryTree.right instanceof TreeNode){
                    a = this.resolveAlgebra(BinaryTree.left, stepbystep)
                    b = this.resolveAlgebra(BinaryTree.right, stepbystep)
                
        
                    let operator = BinaryTree.value as Operators
                    
                    if(operator === Operators.DIV)
                        return calculator.div(a,b, stepbystep)
                    if(operator === Operators.MULTP)
                        return calculator.multp(a, b, stepbystep)
                    if(operator === Operators.SUM)
                        return calculator.sum(a, b, stepbystep)
                    if(operator === Operators.SUBS)
                        return calculator.subs(a,b, stepbystep)
                    if(operator === Operators.POW && b instanceof Polinomio)
                        return calculator.pow(a, b, stepbystep)
                    
                }
        
            }

        }

        return new Polinomio()

    }

    private generateTreeNode():void {

        this.subQuery = new DeleteParentesisShellFilter(this.subQuery).getCleanQuery()

        var queryArray = this.subQuery.split('')
        let openParentesis = queryArray.indexOf('(')
        let closeParentesis = QueryUtils.getIndexOfCloseParentesis(queryArray, openParentesis)

        var operatorIdx = this.getOperator()

        if(operatorIdx != -1){

            let operator:any = queryArray[operatorIdx]
            let right = new MathSubQuery(queryArray.slice(operatorIdx+1).join('')).getQueryNode()
            let left = new MathSubQuery(queryArray.slice(0, operatorIdx).join('')).getQueryNode()
            this.queryNode = new TreeNode( operator as Operators, left, right )

        } else {

            let monomio = Monomio.RawValueToMonomio(this.subQuery)
            let polinomio = new Polinomio()
            polinomio.addMonomio(monomio)
            this.queryNode = new TreeNode(polinomio)

        }

        

    }

    private getOperator():number{

        var queryArray = this.subQuery.split('')

        var operadorIdx = queryArray.lastIndexOf('+')
        while(operadorIdx != -1 && QueryUtils.isInsideParentesis(queryArray, operadorIdx)){
                operadorIdx = queryArray.slice(0, operadorIdx).lastIndexOf('+')
        }

        if(operadorIdx == -1){
            operadorIdx = queryArray.lastIndexOf('-')
            while(operadorIdx != -1 && QueryUtils.isInsideParentesis(queryArray, operadorIdx)){
                operadorIdx = queryArray.slice(0, operadorIdx).lastIndexOf('-')
            }
        }

        if(operadorIdx == -1){
            operadorIdx = queryArray.lastIndexOf('/')
            while(operadorIdx != -1 && QueryUtils.isInsideParentesis(queryArray, operadorIdx)){
                operadorIdx = queryArray.slice(0, operadorIdx).lastIndexOf('/')
            }
        }

        if(operadorIdx == -1){
            operadorIdx = queryArray.lastIndexOf('*')
            while(operadorIdx != -1 && QueryUtils.isInsideParentesis(queryArray, operadorIdx)){
                operadorIdx = queryArray.slice(0, operadorIdx).lastIndexOf('*')
            }
        }

        if(operadorIdx == -1){
            operadorIdx = queryArray.lastIndexOf('^')
            while(operadorIdx != -1 && (QueryUtils.isInsideParentesis(queryArray, operadorIdx) || QueryUtils.isNextToChar(queryArray, operadorIdx) )){
                operadorIdx = queryArray.slice(0, operadorIdx).lastIndexOf('^')
            }
        }

        return operadorIdx

    }

}

export default MathSubQuery