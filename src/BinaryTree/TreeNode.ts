import Operators from "../Math/Operators"
import MathStructure from "../Math/MathStructures/MathStructure"

class TreeNode {

    value:Operators | MathStructure
    left:TreeNode|null
    right:TreeNode|null


    constructor(value: Operators | MathStructure, left:TreeNode|null=null, right:TreeNode|null=null){
        this.value = value
        this.left = left
        this.right = right
    }

    insertLeft(node:TreeNode):void{
        this.left = node
    }

    insertRight(node:TreeNode):void{
        this.right = node
    }

    isOperation():boolean{
        return (JSON.stringify(this.value) in Operators)
    }

    isStructure():boolean{
        return (this.value instanceof MathStructure)
    }



}

export default TreeNode