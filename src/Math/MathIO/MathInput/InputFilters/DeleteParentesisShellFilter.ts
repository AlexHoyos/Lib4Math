import QueryUtils from "../../../Utils/Utils";
import AFilter from "./AFilter";

class DeleteParentesisShellFilter extends AFilter {

    cleanQuery(): void {

        var queryArray = this.query.split('')
        var openParentesis = queryArray.indexOf('(')
        var closeParentesis = QueryUtils.getIndexOfCloseParentesis(queryArray, openParentesis)

        while(openParentesis == 0 && closeParentesis == (queryArray.length-1)){
            queryArray.splice(closeParentesis, 1)
            queryArray.splice(openParentesis, 1)
            openParentesis = queryArray.indexOf('(')
            closeParentesis = QueryUtils.getIndexOfCloseParentesis(queryArray, openParentesis)
        }

        this._cleanQuery = queryArray.join('')

    }

}

export default DeleteParentesisShellFilter