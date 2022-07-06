import Variable from "./Variable"

class Literal {

    variables: Variable[]

    constructor(variables = []){
        this.variables = variables
    }

    addVariable(variable:Variable, fusion:boolean = false){
        this.variables.push(variable)
        if(fusion)
            this.fusionVariables()
    }

    fusionVariables(){

        for(let i = 0; i<this.variables.length; i++){

            for(let j = i+1; j<this.variables.length; j++){

                var variable = this.variables[i]
                var varToCompare = this.variables[j]

                if(variable.compareLetter(varToCompare.letter)){
                    this.variables[i].addExp(varToCompare.exp)
                    if(this.variables[i].exp == 0){
                        this.variables.splice(i, 1)
                        this.variables.splice(j-1, 1)
                        j--
                    } else {
                        this.variables.splice(j, 1)
                    }
                    
                }

            }

        }

    }

    hasVariable(variable:Variable, estrict = false){

        var HasVariable = false

        this.variables.forEach(ownVar => {

            if(estrict){

                if(ownVar.compare(variable))
                    HasVariable = true

            } else {

                if(ownVar.compareLetter(variable.letter))
                    HasVariable = true

            }

        })

        return HasVariable

    }

    toggleVariableExpSigns(){

        this.variables.forEach(variable => {
            variable.toggleExpSign()
        })

    }

    compare(literal:Literal){

        this.fusionVariables()
        literal.fusionVariables()

        if(literal.variables.length == this.variables.length){
            let hasAllVars = true
            
            this.variables.forEach(variable => {

                console.log("Literal has variable " + literal.hasVariable(variable, true))

                if(literal.hasVariable(variable, true) == false){
                    hasAllVars = false
                }
                    

            })

            return hasAllVars

        }

        return false

    }

    print(){
        var text = ""
        this.variables.forEach(variable => {
            text += variable.print()
        })
        return text
    }

    clone(){

        var literal = new Literal()
        this.variables.forEach(variable => {
            literal.addVariable(variable.clone())
        })
        return literal
    }

}

export default Literal