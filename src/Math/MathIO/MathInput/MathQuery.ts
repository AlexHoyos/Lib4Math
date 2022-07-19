import BinaryTree from "../../../BinaryTree/BinaryTree"
import TreeNode from "../../../BinaryTree/TreeNode"
import Operators from "../../MathStructures/Operators"
import QueryUtils from "../../Utils/Utils"
import MathResult from "../MathOutput/MathResult"
import ResultStep from "../MathOutput/StepByStep/ResultStep"
import DeleteCloseUnopenedParentesisFilter from "./InputFilters/DeleteCloseUnopenedParentesisFilter"
import DeleteOpenUnclosedParentesisFilter from "./InputFilters/DeleteOpenUnclosedParentesisFilter"
import DeleteRepeatedOperators from "./InputFilters/DeleteRepeatedOperators"
import DeleteSpacesFilter from "./InputFilters/DeleteSpacesFilter"
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
            let resultado = this.mathSubQueryHead.resolveAlgebra(this.getQueryTree().getHead(),stepbystep = stepByStep)
            return new MathResult(this.rawQuery, resultado, stepByStep)
        }

        return null
    }

    private createTree(){

        this.mathSubQueryHead = new MathSubQuery(this.rawQuery)
        this.queryTree.head = this.mathSubQueryHead.getQueryNode()// Obtenemos la cabecera

    }

    private cleanRawQuery():void {

        // Removed blank spaces
        this.rawQuery = new DeleteSpacesFilter(this.rawQuery).getCleanQuery()

        // Remove Open/Unclosed Parentesis
        this.rawQuery = new DeleteOpenUnclosedParentesisFilter(this.rawQuery).getCleanQuery()

        // Remove Close/Unopened Parentesis
        this.rawQuery = new DeleteCloseUnopenedParentesisFilter(this.rawQuery).getCleanQuery()

        // Remove repeated operators
        this.rawQuery = new DeleteRepeatedOperators(this.rawQuery).getCleanQuery()

    }

}

export default MathQuery