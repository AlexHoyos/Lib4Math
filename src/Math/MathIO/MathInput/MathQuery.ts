import BinaryTree from "../../../BinaryTree/BinaryTree"
import TreeNode from "../../../BinaryTree/TreeNode"
import MathResult from "../MathOutput/MathResult"
import ResultStep from "../MathOutput/StepByStep/ResultStep"
import DeleteCloseUnopenedParentesisFilter from "./InputFilters/DeleteCloseUnopenedParentesisFilter"
import DeleteOpenUnclosedParentesisFilter from "./InputFilters/DeleteOpenUnclosedParentesisFilter"
import DeleteRepeatedOperatorsFilter from "./InputFilters/DeleteRepeatedOperatorsFilter"
import DeleteSpacesFilter from "./InputFilters/DeleteSpacesFilter"
import { FilterManager } from "./InputFilters/FilterManager"
import MathSubQuery from "./MathSubQuery"

class MathQuery {

    rawQuery:string
    private queryTree:BinaryTree = new BinaryTree()
    private mathSubQueryHead:MathSubQuery|null = null

    constructor(rawQuery:string){
        this.rawQuery = rawQuery
        this.cleanRawQuery()
        this.createTree()
    }

    getQueryTree():BinaryTree {
        return this.queryTree
    }

    resolveAlgebra():MathResult|null{

        var stepByStep:ResultStep[] = []

        if(this.getQueryTree().getHead() instanceof TreeNode && this.mathSubQueryHead instanceof MathSubQuery){
            let resultado = this.mathSubQueryHead.resolveAlgebra(this.getQueryTree().getHead(), stepByStep)
            return new MathResult(this.rawQuery, resultado, stepByStep)
        }

        return null
    }

    private createTree(){

        this.mathSubQueryHead = new MathSubQuery(this.rawQuery)
        this.queryTree.head = this.mathSubQueryHead.getQueryNode()// Obtenemos la cabecera

    }

    private cleanRawQuery():void {

        this.rawQuery = FilterManager.setFilters(this.rawQuery, [
            new DeleteSpacesFilter(), // Removed blank spaces
            new DeleteOpenUnclosedParentesisFilter(), // Remove Open/Unclosed Parentesis
            new DeleteCloseUnopenedParentesisFilter(), // Remove Close/Unopened Parentesis
            new DeleteRepeatedOperatorsFilter() // Remove repeated operators
        ])

    }

}

export default MathQuery