import BinaryTree from "../../../BinaryTree/BinaryTree"
import TreeNode from "../../../BinaryTree/TreeNode"
import Polinomio from "../../MathStructures/ComplexStructures/Polinomio"
import Operators from "../../MathStructures/Operators"
import NumberCoefficient from "../../MathStructures/PrimitiveStructures/Coefficient/NumberCoefficient"
import Literal from "../../MathStructures/PrimitiveStructures/Literal/Literal"
import Variable from "../../MathStructures/PrimitiveStructures/Literal/Variable"
import Monomio from "../../MathStructures/PrimitiveStructures/Monomio"
import MathQuery from "./MathQuery"

describe('--- MATH QUERY TESTS ---', () => {

    test('case 1', () => {
        var poli1 = new Polinomio( [ new Monomio( new NumberCoefficient(1) ) ] )
        var poli2 = new Polinomio( [ new Monomio( new NumberCoefficient(1), new Literal([ new Variable('x', 1) ]) ) ] )
        var operator = Operators.SUM

        var left = new TreeNode(poli1)
        var right = new TreeNode(poli2)

        const expected = new BinaryTree(
            new TreeNode(
                operator,
                left,
                right
            )
        )

        const result = new MathQuery("1+x")

        expect(result.getQueryTree()).toMatchObject( expected )

    })

})