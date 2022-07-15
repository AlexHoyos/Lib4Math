import PolinomiOperations from "../../MathOperations/Algebra/PolinomioOperations";
import MathStructure from "../MathStructure";
import Monomio from "../PrimitiveStructures/Monomio";
import Fraction from "./Fraction";
import Polinomio from "./Polinomio";

class Concat extends MathStructure {

    structures: MathStructure[]

    constructor(structures: MathStructure[] = []){
        super()
        this.structures = structures
    }

    print(): string {
        var text = ""
        var round = 1
        this.structures.forEach(structure => {
            if(structure.isZero() == false){
                if(round != 1)
                    text += "+"

                text += "("+structure.print()+")"
                round++
            }
        })

        return text
    }

    addStructure(structure: MathStructure){
        this.structures.push(structure)
    }
    simplify(): void {

        let NoConcats = this.structures.filter(structure => !(structure instanceof Concat))
        let concats = this.structures.filter(structure => structure instanceof Concat)

        var finalStructures:MathStructure[] = []
        concats.forEach(structure => {
            if(structure instanceof Concat){
                structure.simplify()
                finalStructures.push( ...structure.structures )
            }
        })

        this.structures = [...NoConcats, ...finalStructures]

        let NoPolinomios = this.structures.filter(structure => !(structure instanceof Polinomio))
        let polinomios = this.structures.filter(structure => structure instanceof Polinomio)

        let finalPolinom = new Polinomio()

        polinomios.forEach(polinomio => {
            if(polinomio instanceof Polinomio){
                finalPolinom = PolinomiOperations.sum(finalPolinom, polinomio)
            }
        })

        this.structures = [finalPolinom, ...NoPolinomios]

    }

    isZero(): boolean {
        return false
    }

    compare(a: MathStructure): boolean {
        throw new Error("Method not implemented.");
    }
    clone(): MathStructure {
        throw new Error("Method not implemented.");
    }
    toggleSign(): void {
        throw new Error("Method not implemented.");
    }
    toFraction(): Fraction {
        throw new Error("Method not implemented.");
    }

}

export default Concat