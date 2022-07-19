abstract class AFilter {

    query:string
    protected _cleanQuery:string = ""

    constructor(query:string){
        this.query = query
        this.cleanQuery()
    }

    abstract cleanQuery():void
    getCleanQuery():string {
        console.log(this._cleanQuery)
        return this._cleanQuery
    }

}

export default AFilter