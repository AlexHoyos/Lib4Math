import ResultStep from "./ResultStep";

class StepByStep {

    private steps: ResultStep[]

    constructor(){
        this.steps = []
    }

    addStep(str:string, variables:string[] = []):void{

        for(let i = 0; i<variables.length; i++){
            str = str.replace('{'+i+'}', variables[i])
        }

        this.steps.push( new ResultStep(str) )

    }

    getSteps(): ResultStep[]{
        return this.steps
    }

}

export default StepByStep