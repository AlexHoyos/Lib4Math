abstract class AExtractor {

    input:string = ""
    protected _extraction:string[] = []

    constructor(input:string = ""){
        this.input = input

        if(input != "")
            this.extract()

    }

    abstract extract():void
    getExtraction():string[] {
        return this._extraction
    }

}

export default AExtractor