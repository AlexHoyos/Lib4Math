abstract class AFilter {

    query:string = ""
    protected _cleanQuery:string = ""

    constructor(query:string = ""){
        this.query = query

        if(query != "")
            this.cleanQuery()

    }

    setQuery(query:string){
        this.query = query
        this.cleanQuery()
    }

    abstract cleanQuery():void
    getCleanQuery():string {
        return this._cleanQuery
    }

}

export default AFilter