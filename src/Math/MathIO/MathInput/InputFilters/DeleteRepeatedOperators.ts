import Operators from "../../../MathStructures/Operators";
import AFilter from "./AFilter";

class DeleteRepeatedOperators extends AFilter {

    cleanQuery(): void {

        // Limpiamos operadores repetidos
        Object.values(Operators).forEach(operator => {

            let dobleOperator = operator+operator

            while(this.query.includes(dobleOperator))
                this.query = this.query.replaceAll(dobleOperator, operator)

        })

        this._cleanQuery = this.query

    }

}

export default DeleteRepeatedOperators