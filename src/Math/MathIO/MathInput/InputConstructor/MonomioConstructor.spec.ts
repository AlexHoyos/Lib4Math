import ConstantCoefficient from "../../../MathStructures/PrimitiveStructures/Coefficient/ConstantCoefficient"
import ConstantList from "../../../MathStructures/PrimitiveStructures/Coefficient/Constants/Constants.list"
import MixedCoefficient from "../../../MathStructures/PrimitiveStructures/Coefficient/MixedCoefficient"
import NumberCoefficient from "../../../MathStructures/PrimitiveStructures/Coefficient/NumberCoefficient"
import Literal from "../../../MathStructures/PrimitiveStructures/Literal/Literal"
import Variable from "../../../MathStructures/PrimitiveStructures/Literal/Variable"
import Monomio from "../../../MathStructures/PrimitiveStructures/Monomio"
import MonomioConstructor from "./MonomioConstructor"

describe('--- Monomio Constructor Tests ---', () => {

    test('case 1', () => {
        const expected = new Monomio( new NumberCoefficient(1), new Literal( [new Variable('x', 1)] )).print()
        const result = new MonomioConstructor('x').product?.print()
    
        expect(result).toEqual(expected)
    })
    
    test('case 2', () => {
        const expected = new Monomio(
            new ConstantCoefficient(ConstantList["PI"]),
            new Literal(
                [new Variable('x', 2)]
            )).print()
        const result = new MonomioConstructor('PIx^2').product?.print()
    
        expect(result).toEqual(expected)
    })
    
    test('case 3', () => {
    
        const expected = new Monomio(
            new MixedCoefficient([
                new NumberCoefficient(3),
                new ConstantCoefficient(ConstantList["PI"]),
                new ConstantCoefficient(ConstantList["e"])
            ]),
            new Literal(
                [
                    new Variable('x', 2),
                    new Variable('y', 1)
                ]
            )).print()
        const result = new MonomioConstructor('3PIex^2y').product?.print()
    
        expect(result).toEqual(expected)
    
    })
    
})