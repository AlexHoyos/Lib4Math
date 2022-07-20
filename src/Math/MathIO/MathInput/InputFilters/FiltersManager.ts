import AFilter from "./AFilter"

const MANAGER = {

    setFilters: function(raw: string, filters: AFilter[]):string {

        var newString:string = raw

        filters.forEach( filter => {

            filter.setQuery(newString)
            newString = filter.getCleanQuery()

        })

        return newString
    }

}

export {MANAGER as FilterManager}