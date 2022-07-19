import QueryUtils from "../../../Utils/Utils";
import AFilter from "./AFilter";

class DeleteCloseUnopenedParentesisFilter extends AFilter {

    cleanQuery(): void {

        var rawQueryArray = this.query.split('')

        // Revisamos si hay parentesis de cierre sin abrir
        var parentesis = rawQueryArray.indexOf(')')
        while(parentesis != -1){
            let openParentesis = QueryUtils.getIndexOfOpenParentesis(rawQueryArray, parentesis)
            // Si no tiene cierre, eliminamos el parentesis
            // Si si tiene, revisamos si existe otro indice
            if(openParentesis == -1){
                rawQueryArray.splice(parentesis, 1)
                parentesis = rawQueryArray.indexOf(')')
            } else {
                let subIndex = rawQueryArray.slice(parentesis+1).indexOf(')') // buscamos un cierre en lo que queda de arreglo
                if(subIndex != -1) // si existe obtenemos el indice
                    parentesis += subIndex+1
                else
                    parentesis = -1
            }    
        }

        this._cleanQuery = rawQueryArray.join('')

    }

}

export default DeleteCloseUnopenedParentesisFilter