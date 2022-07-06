import TreeNode from "./TreeNode"
class BinaryTree {

    head:TreeNode | null

    constructor(head=null){
        this.head = head
    }

    getHead(): TreeNode | null{
        return this.head
    }

}

export default BinaryTree