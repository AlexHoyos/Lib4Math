import TreeNode from "../../../../BinaryTree/TreeNode";
import Polinomio from "../../../MathStructures/ComplexStructures/Polinomio";
import Operators from "../../../MathStructures/Operators";
import QueryUtils from "../../../Utils/QueryUtils";
import DeleteParentesisShellFilter from "../InputFilters/DeleteParentesisShellFilter";
import DeleteRepeatedPointFilter from "../InputFilters/DeleteRepeatedPointFilter";
import { FilterManager } from "../InputFilters/FilterManager";
import MathSubQuery from "../MathSubQuery";
import AConstructor from "./AConstructor";
import MonomioConstructor from "./MonomioConstructor";

class TreeNodeConstructor extends AConstructor {

    product?: TreeNode;
    construct(): void {
        
        
        this.input = FilterManager.setFilters(this.input, [
            new DeleteParentesisShellFilter(),
            new DeleteRepeatedPointFilter()
        ])

        var queryArray = this.input.split('')
        var operatorIdx:number = QueryUtils.getOperator(this.input)
        if(operatorIdx != -1){

            let operator:any = queryArray[operatorIdx]
            let right = new MathSubQuery(queryArray.slice(operatorIdx+1).join('')).getQueryNode()
            let left = new MathSubQuery(queryArray.slice(0, operatorIdx).join('')).getQueryNode()
            this.product = new TreeNode( operator as Operators, left, right )

        } else {

            let monomio = new MonomioConstructor(this.input).product
            let polinomio = new Polinomio()
            if(monomio != undefined)
                polinomio.addMonomio(monomio)
            this.product = new TreeNode(polinomio)

        }

        

    }

}

export default TreeNodeConstructor