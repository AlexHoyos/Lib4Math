import QueryUtils from "../../../Utils/QueryUtils";
import AFilter from "./AFilter";

class DeleteOpenUnclosedParentesisFilter extends AFilter {

    cleanQuery(): void {

        var rawQueryArray = this.query.split('')
        var parentesis = rawQueryArray.indexOf('(')
        while(parentesis != -1){
            let closeParentesis = QueryUtils.getIndexOfCloseParentesis(rawQueryArray, parentesis)
            // Si no tiene cierre, eliminamos el parentesis
            if(closeParentesis == -1){
                rawQueryArray.splice(parentesis, 1)
                parentesis = rawQueryArray.indexOf('(')
            } else {
                let subIndex = rawQueryArray.slice(parentesis+1).indexOf('(') // buscamos una apertura en lo que queda de arreglo
                if(subIndex != -1) // si existe obtenemos el indice
                    parentesis += subIndex+1
                else
                    parentesis = -1
            }
        }

        this._cleanQuery = rawQueryArray.join('')

    }

}

export default DeleteOpenUnclosedParentesisFilter