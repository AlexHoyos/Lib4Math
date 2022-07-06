class Variable {

    letter:string
    exp:number

    constructor(letter:string, exp:number){
        this.letter = letter
        this.exp = exp
    }

    compareLetter(letter:string){
        return (this.letter == letter)
    }

    compare(variable:Variable){
        return (this.compareLetter(variable.letter) && this.exp == variable.exp)
    }

    addExp(exp:number){

        this.exp += exp

    }

    toggleExpSign(){
        this.exp *= -1
    }

    print(){

        if(this.exp == 1){
            return this.letter
        }else if (this.exp == 0){
            console.log("xd")
            return 1
        } else {
            return this.letter + '^{' + this.exp +"}"
        }
            
    }

    clone(){

        var variable = new Variable(this.letter, this.exp)
        return variable

    }

}

export default Variable