import BinaryTree from "../../../BinaryTree/BinaryTree"
import Operators from "../../Operators"
import QueryUtils from "../../Utils/Utils"
import MathSubQuery from "./MathSubQuery"

class MathQuery {

    rawQuery:string
    private queryTree:BinaryTree = new BinaryTree()

    constructor(rawQuery:string){
        this.rawQuery = rawQuery
        this.cleanRawQuery()
        this.createTree()
    }

    getQueryTree():BinaryTree {
        return this.queryTree
    }

    private createTree(){

        this.queryTree.head = new MathSubQuery(this.rawQuery).getNode() // Obtenemos la cabecera

    }

    private cleanRawQuery():void {

        //Removed blank spaces
        this.rawQuery.replaceAll(' ', '')

        var rawQueryArray = this.rawQuery.split('')

        // Revisamos si hay parentesis abiertos sin cerrar
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

        // Guardamos cambios
        this.rawQuery = rawQueryArray.join('')
        // Limpiamos operadores repetidos
        Object.values(Operators).forEach(operator => {

            let dobleOperator = operator+operator

            while(this.rawQuery.includes(dobleOperator))
                this.rawQuery = this.rawQuery.replaceAll(dobleOperator, operator)

        })

    }

}

export default MathQuery