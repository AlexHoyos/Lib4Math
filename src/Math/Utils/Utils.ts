import Operators from "../Operators";

const QueryUtils = {

    getIndexOfCloseParentesis: function(queryArray:string[], index:number):number{

        let parentesis = 1;
        let closeIndex = -1

        for(let i = index+1; i<queryArray.length; i++){
            // Si encontramos el cierre lo guardamos en closeIndex y acabamos el programa
            if(queryArray[i] == ')' && parentesis == 1){
                closeIndex = i
                i=queryArray.length
            }

            if(queryArray[i] == '(')
                parentesis++
            if(queryArray[i] == ')')
                parentesis--
           
        }

        return closeIndex
    },

    getIndexOfOpenParentesis: function(queryArray:string[], index:number):number {

        let parentesis = 1;
        let openIndex = -1

        for(let i = index-1; i>-1; i--){
            // Si encontramos el cierre lo guardamos en closeIndex y acabamos el programa
            if(queryArray[i] == '(' && parentesis == 1){
                openIndex = i
                i=-1
            }

            if(queryArray[i] == '(')
                parentesis--
            if(queryArray[i] == ')')
                parentesis++
           
        }

        return openIndex
    },

    isInsideParentesis: function(queryArray:string[], index:number):boolean {

        return false

    },

    isNumeric: function(n:string):boolean {
        return !isNaN(parseFloat(n));
    },

    isOperator: function(o:Operators):boolean {
        return Object.values(Operators).includes(o)
    },

    isNextToChar: function(queryArray:string[], index:number):boolean{
        if(index == 0 || index >= queryArray.length )
            return false
        else
            return this.isNumeric(queryArray[index-1]) == false
    }

}

export default QueryUtils
export {QueryUtils as QueryUtils}