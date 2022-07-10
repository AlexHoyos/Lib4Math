import Fraction from "./Fraction";
import MathStructure from "../MathStructure";
import Monomio from "../PrimitiveStructures/Monomio";
import ResultStep from "../../MathIO/MathOutput/ResultStep";
import Literal from "../PrimitiveStructures/Literal/Literal";
import Variable from "../PrimitiveStructures/Literal/Variable";
import Concat from "./Concat";

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
                var sum = Monomio.sum(mono1, mono2)
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

    static sum(poli1:Polinomio, poli2:Polinomio, stepbystep:ResultStep[]=[]): Polinomio{

        var suma = poli1.clone()

        if(poli1.isZero())
            return poli2

        if(poli2.isZero())
            return poli1

        poli2.monomios.forEach(monomio => {
            suma.addMonomio(monomio)
        })
        suma.simplify()

        return suma

    }

    static subs(poli1:Polinomio, poli2:Polinomio, stepbystep:ResultStep[]=[]): Polinomio{

        poli2.toggleMonoSigns()

        var resta = Polinomio.sum(poli1, poli2)
        return resta
    }

    static multp(poli1:Polinomio, poli2:Polinomio, stepbystep:ResultStep[]=[]): Polinomio{

        var result = new Polinomio()

        poli1.monomios.forEach(mono1 => {

            poli2.monomios.forEach(mono2 => {

                result.addMonomio( Monomio.multp(mono1, mono2) )

            })

        })

        result.simplify()
        return result
    }

    static div(poli1:Polinomio, poli2:Polinomio, stepbystep:ResultStep[]=[]): Polinomio | Fraction | Concat{

        if(poli1.monomios.length == 1 && poli2.monomios.length == 1){
            var result:Monomio|Fraction = Monomio.div(poli1.monomios[0], poli2.monomios[0])
            if(result instanceof Monomio)
                return new Polinomio([result])
            else
                return result
        }

        if(poli1.monomios.length == 0 || poli2.monomios.length == 0){
            return new Polinomio([new Monomio(0)])
        }

        var poli1Clone:Polinomio = poli1.clone()
        var poli2Clone:Polinomio = poli2.clone()
        var variable:Variable|null = poli1.orderVariable

        if(variable instanceof Variable){

            variable = variable.clone()

            if(poli2Clone.hasVariable(variable) && poli2Clone.orderVariable instanceof Variable){

                if(!(poli2Clone.orderVariable.compareLetter(variable.letter)))
                    poli2Clone.orderQuicksortAsc(poli2Clone.monomios, variable)

                var numMon:Monomio = poli1Clone.monomios[0].clone()
                var divMon:Monomio = poli2Clone.monomios[0].clone()

                if(numMon.literal.hasVariable(variable)){
                    
                    if(numMon.literal.getVarExpValue(variable) >= divMon.literal.getVarExpValue(variable)){
                        var resultConcat: Concat = new Concat()
                        var resultDivTerm:Monomio|Fraction = Monomio.div(numMon, divMon, true)
                        if(resultDivTerm instanceof Monomio){
                            var additionToRemainder:Polinomio = Polinomio.multp(poli2Clone, new Polinomio([resultDivTerm]))
                            additionToRemainder.toggleSign()
                            var remainder: Polinomio = Polinomio.sum(poli1Clone, additionToRemainder)
                            resultConcat.addStructure(new Polinomio([resultDivTerm.clone()]))
                            resultConcat.addStructure(Polinomio.div(remainder.clone(), poli2Clone))
                            resultConcat.simplify()
                            return resultConcat
                        }
                    }

                }

            }
        }


        return new Fraction(poli1Clone, poli2Clone)

    }

    static pow(poli1:Polinomio, poli2:Polinomio, stepbystep:ResultStep[]=[]): Polinomio{

        var Exp = poli2.monomios[0].coeficiente

        var result = new Polinomio([ new Monomio() ])

        for(let i = 0; i<Exp; i++){
            result = Polinomio.multp(result, poli1)
        }

        return result

    }


}

export default Polinomio