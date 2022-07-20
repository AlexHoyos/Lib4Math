import AFilter from "./AFilter"

class DeleteRepeatedPointFilter extends AFilter {

    cleanQuery(): void {
        
        while(this.query.includes('..')){
            this.query = this.query.replaceAll('..', '.')
        }
        
        this._cleanQuery = this.query

    }

}

export default DeleteRepeatedPointFilter