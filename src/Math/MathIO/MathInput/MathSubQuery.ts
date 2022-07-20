import TreeNode from "../../../BinaryTree/TreeNode"
import Polinomio from "../../MathStructures/ComplexStructures/Polinomio"
import MathStructure from "../../MathStructures/MathStructure"
import Operators from "../../MathStructures/Operators"
import QueryUtils from "../../Utils/QueryUtils"
import ResultStep from "../MathOutput/StepByStep/ResultStep"
import Algebra from "../../MathOperations/Algebra"
import DeleteParentesisShellFilter from "./InputFilters/DeleteParentesisShellFilter"
import MonomioConstructor from "./InputConstructor/MonomioConstructor"
import { FilterManager } from "./InputFilters/FilterManager"
import DeleteRepeatedPointFilter from "./InputFilters/DeleteRepeatedPointFilter"

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

        this.subQuery = FilterManager.setFilters(this.subQuery, [
            new DeleteParentesisShellFilter(),
            new DeleteRepeatedPointFilter()
        ])

        var queryArray = this.subQuery.split('')
        var operatorIdx:number = QueryUtils.getOperator(this.subQuery)
        if(operatorIdx != -1){

            let operator:any = queryArray[operatorIdx]
            let right = new MathSubQuery(queryArray.slice(operatorIdx+1).join('')).getQueryNode()
            let left = new MathSubQuery(queryArray.slice(0, operatorIdx).join('')).getQueryNode()
            this.queryNode = new TreeNode( operator as Operators, left, right )

        } else {

            let monomio = new MonomioConstructor(this.subQuery).product
            let polinomio = new Polinomio()
            if(monomio != undefined)
                polinomio.addMonomio(monomio)
            this.queryNode = new TreeNode(polinomio)

        }

        

    }

}

export default MathSubQuery