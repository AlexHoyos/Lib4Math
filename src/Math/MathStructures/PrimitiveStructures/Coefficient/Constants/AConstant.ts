abstract class AConstant {

    abstract value:number
    abstract char:string

    getValue():number{
        return this.value
    }
    getChar():string {
        return this.char
    }

}

export default AConstant