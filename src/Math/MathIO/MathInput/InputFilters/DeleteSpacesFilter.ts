import AFilter from "./AFilter";

class DeleteSpacesFilter extends AFilter {

    cleanQuery(): void {
        this._cleanQuery = this.query.replaceAll(' ', '')
    }

}

export default DeleteSpacesFilter