import MathStructure from '../../MathStructures/MathStructure'
import ResultStep from './ResultStep'
class MathResult {

    queryExpresion:string
    result:MathStructure
    latexExpresion:string
    stepByStep:ResultStep[]

    constructor(query:string, result:MathStructure, stepbystep:ResultStep[] = []){
        this.queryExpresion = query
        this.result = result
        this.stepByStep = stepbystep
        this.latexExpresion = result.print()
    }

    getResult(){
        return this.result
    }

    addStep(step: ResultStep){
        this.stepByStep.push(step)
    }

}

export default MathResult