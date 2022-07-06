import Fraction from "./Fraction";
import MathStructure from "../MathStructure";
import Monomio from "../PrimitiveStructures/Monomio";

class Polinomio extends MathStructure{
    monomios: Monomio[]
    exp: number

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
                    this.monomios[i] = sum
                    this.monomios.splice(j, 1)
                }

            }

        }

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
        return poliCloned
    }

    static sum(poli1:Polinomio, poli2:Polinomio): Polinomio{

        var suma = poli1.clone()

        poli2.monomios.forEach(monomio => {
            suma.addMonomio(monomio)
        })
        suma.simplify()

        return suma

    }

    static subs(poli1:Polinomio, poli2:Polinomio): Polinomio{

        poli2.toggleMonoSigns()

        var resta = Polinomio.sum(poli1, poli2)
        return resta
    }

    static multp(poli1:Polinomio, poli2:Polinomio): Polinomio{

        var result = new Polinomio()

        poli1.monomios.forEach(mono1 => {

            poli2.monomios.forEach(mono2 => {

                result.addMonomio( Monomio.multp(mono1, mono2) )

            })

        })

        result.simplify()
        return result
    }

    static div(poli1:Polinomio, poli2:Polinomio): Polinomio | Fraction{

        if(poli1.monomios.length == 1 && poli2.monomios.length == 1){
            var result = new Polinomio()
            result.addMonomio( Monomio.div(poli1.monomios[0], poli2.monomios[0]) )
            return result
        }

        if(poli1.compareBase(poli2)){

            poli1.addExp( poli2.exp * -1 )

            if(poli1.exp == 0)
                poli1.monomios = [ new Monomio() ]

            return poli1

        } else {
            return new Fraction(poli1, poli2)
        }

    }

    static pow(poli1:Polinomio, poli2:Polinomio): Polinomio{

        var Exp = poli2.monomios[0].coeficiente

        var result = new Polinomio([ new Monomio() ])

        for(let i = 0; i<Exp; i++){
            result = Polinomio.multp(result, poli1)
        }

        return result

    }


}

export default Polinomio