import BinaryTree from "../../../BinaryTree/BinaryTree"
import TreeNode from "../../../BinaryTree/TreeNode"
import Operators from "../../MathStructures/Operators"
import QueryUtils from "../../Utils/Utils"
import MathResult from "../MathOutput/MathResult"
import ResultStep from "../MathOutput/StepByStep/ResultStep"
import MathSubQuery from "./MathSubQuery"

class MathQuery {

    rawQuery:string
    private queryTree:BinaryTree = new BinaryTree()
    private mathSubQueryHead:MathSubQuery|null = null

    constructor(rawQuery:string){
        this.rawQuery = rawQuery
        this.cleanRawQuery()
        this.createTree()
    }

    getQueryTree():BinaryTree {
        return this.queryTree
    }

    resolveAlgebra():MathResult|null{

        var stepByStep:ResultStep[] = []

        if(this.getQueryTree().getHead() instanceof TreeNode && this.mathSubQueryHead instanceof MathSubQuery){
            let resultado = this.mathSubQueryHead.resolveAlgebra(this.getQueryTree().getHead(),stepbystep = stepByStep)
            return new MathResult(this.rawQuery, resultado, stepByStep)
        }

        return null
    }

    private createTree(){

        this.mathSubQueryHead = new MathSubQuery(this.rawQuery)
        this.queryTree.head = this.mathSubQueryHead.getQueryNode()// Obtenemos la cabecera

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