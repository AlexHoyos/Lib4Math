import TreeNode from "./TreeNode"
class BinaryTree {

    head:TreeNode | null

    constructor(head:TreeNode | null=null){
        this.head = head
    }

    getHead(): TreeNode | null{
        return this.head
    }

}

export default BinaryTree