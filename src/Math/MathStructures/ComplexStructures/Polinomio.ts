import Fraction from "./Fraction";
import MathStructure from "../MathStructure";
import Monomio from "../PrimitiveStructures/Monomio";
import ResultStep from "../../MathIO/MathOutput/ResultStep";
import Literal from "../PrimitiveStructures/Literal/Literal";
import Variable from "../PrimitiveStructures/Literal/Variable";
import Concat from "./Concat";
import MonomioOperations from "../../MathOperations/Algebra/MonomioOperations";

class Polinomio extends MathStructure{
    monomios: Monomio[]
    exp: number
    orderVariable: Variable|null = null

    constructor(monomios: Monomio[] = [], exp = 1){
        super()
        this.monomios = monomios
        this.exp = exp
    }

    print(){
        var text:string = ""
        var round:number = 1
        if(this.exp != 1)
            text += "{("

        this.monomios.forEach(monomio => {

            if(monomio.coeficiente < 0 || round == 1){
                text += monomio.print()
            } else if(monomio.coeficiente > 0){
                text += '+'+monomio.print()
            }

            round++

        })

        if(this.exp != 1)
            text += ")}^{"+this.exp+"}"

        if(this.exp == 0)
            text = "1"

        if(text=="")
            text = "0"

        return text

    }

    addExp(exp:number){
        this.exp += exp
    }

    addMonomio(monomio:Monomio, fusion = false) {
        this.monomios.push(monomio)
        if(fusion)
            this.simplify()
    }

    addMonomioList(monomios:Monomio[], fusion = false){
        monomios.forEach(monomio => {
            this.addMonomio(monomio, fusion)
        })
    }

    hasMonomio(monomio:Monomio){
        var HasMonomio = false
        this.monomios.forEach(mono => {

            if(mono.compare(monomio))
                HasMonomio = true
        })

        return HasMonomio

    }

    compareBase(poli:Polinomio){

        if(this.monomios.length == poli.monomios.length){

            var HasSameBase = true

            this.monomios.forEach(monomio => {

                if(poli.hasMonomio(monomio) == false){
                    HasSameBase = false
                }

            })

            return HasSameBase

        }

        return false

    }

    compare(): boolean {
        throw new Error("Method not implemented.");
    }

    simplify(){

        for(let i = 0; i<this.monomios.length; i++){

            for(let j = i+1; j<this.monomios.length; j++){

                var mono1 = this.monomios[i]
                var mono2 = this.monomios[j]
                var sum = MonomioOperations.sum(mono1, mono2)
                if(sum instanceof Monomio){

                    if(sum.coeficiente != 0){
                        this.monomios[i] = sum
                        this.monomios.splice(j, 1)
                    } else {
                        this.monomios.splice(j, 1)
                        this.monomios.splice(i, 1)
                    }
                    
                }

            }

        }

        this.orderAsc()

    }

    orderAsc(): void {
        if(this.monomios.length > 0){
            if(this.monomios[0].hasVariables()){
                this.orderVariable = this.monomios[0].literal.variables[0]
                this.monomios = this.orderQuicksortAsc(this.monomios, this.orderVariable)
            }
        }
        
    }

    hasVariable(variable:Variable, strict:boolean = false):boolean{
        var HasVariable = false

        this.monomios.forEach(monomio => {
            if(monomio.hasVariables()){

                if(monomio.literal.hasVariable(variable, strict)){
                    HasVariable = true
                }

            }
        })

        return HasVariable
    }

    isZero(){
        var isZero = true
        this.monomios.forEach(monomio => {
            if(monomio.isZero() == false)
                isZero = false
        })

        return isZero
    }

    orderQuicksortAsc(unsortedArray:Monomio[], variable:Variable): Monomio[]{

        // QUICKSORT
        var sortedArray:Monomio[] = []

        if(unsortedArray.length > 1){
            
            let pivotIdx:number = Math.floor(unsortedArray.length/2)
            let pivot:Monomio = unsortedArray[pivotIdx]
            var pivotExpValue = pivot.literal.getVarExpValue(variable)
            unsortedArray.splice(pivotIdx, 1)
            let higher: Monomio[] = this.orderQuicksortAsc( unsortedArray.filter(monomio => monomio.literal.getVarExpValue(variable) >= pivotExpValue), variable )
            let lower: Monomio[] = this.orderQuicksortAsc(unsortedArray.filter(monomio => monomio.literal.getVarExpValue(variable) < pivotExpValue), variable)
            sortedArray= [
                ...higher, pivot, ...lower
            ]
            return sortedArray
            
        }

        if(unsortedArray.length == 1)
            sortedArray = unsortedArray

        return sortedArray

    }

    toFraction(): Fraction {
        return new Fraction(this, new Polinomio([ new Monomio(1) ]))
    }

    toggleMonoSigns(){
        this.monomios.forEach(monomio => {
            monomio.toggleSign()
        })
    }

    toggleSign(): void {
        this.toggleMonoSigns()
    }

    clone(){
        var poliCloned = new Polinomio([], this.exp)
        this.monomios.forEach(mono => {
            poliCloned.addMonomio(mono.clone())
        })
        poliCloned.orderVariable = this.orderVariable
        return poliCloned
    }


}

export default Polinomio