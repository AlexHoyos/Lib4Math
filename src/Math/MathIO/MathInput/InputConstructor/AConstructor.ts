abstract class AConstructor {

    protected input:string
    abstract product?:any // Final product

    constructor(input:string){
        this.input = input
        this.construct()
    }

    abstract construct():void

}

export default AConstructor