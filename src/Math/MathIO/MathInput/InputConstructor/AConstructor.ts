abstract class AConstructor {

    protected input:string
    abstract product?:any // Final product
    remainder:string

    constructor(input:string){
        this.input = input
        this.remainder = ""
        this.construct()
    }

    abstract construct():void

}

export default AConstructor