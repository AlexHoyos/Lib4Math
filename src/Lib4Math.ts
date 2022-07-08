import MathQuery from "./Math/MathIO/MathInput/MathQuery"

class Lib4math {

    rawQuery: string
    private mathQuery: MathQuery

    constructor(query: string){
        this.rawQuery = query
        this.mathQuery = new MathQuery(query)
    }

    getMathQuery(){
        return this.mathQuery
    }

    static inputQuery(query:string):Lib4math {
        return new Lib4math(query)
    }

}

console.log("lib4math v2 %cLoaded Correctly!", "color: #24E211;")

export default Lib4math
export {Lib4math as Lib4math}