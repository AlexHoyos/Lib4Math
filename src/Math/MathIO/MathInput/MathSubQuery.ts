import TreeNode from "../../../BinaryTree/TreeNode"
import Operators from "../../Operators"
import QueryUtils from "../../Utils/Utils"

class MathSubQuery {

    subQuery:string
    queryNode: TreeNode

    constructor(subQuery: string){
        this.subQuery = subQuery
        this.generateTreeNode(new TreeNode( Operators[this.getOperator()] ))
    }

    private generateTreeNode(subNode:TreeNode|null):any {

        if(subNode?.left == null && subNode?.right == null){
            return subNode?.value
        }

    }

    private getOperator():string{

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
            while(operadorIdx != -1 && QueryUtils.isInsideParentesis(queryArray, operadorIdx)){
                operadorIdx = queryArray.slice(0, operadorIdx).lastIndexOf('^')
            }
        }

        return queryArray[operadorIdx]

    }

    getNode(){
        return this.queryNode
    }

}

export default MathSubQuery