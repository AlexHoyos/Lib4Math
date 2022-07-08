enum Operators {

    MULTP = "*",
    DIV = "/",
    SUM = "+",
    SUBS = "-",
    POW = "^",
}

function get(operator:string):Operators|null {
    if(operator == "+")
        return Operators.SUM
    if(operator == "-")
        return Operators.SUBS
    if(operator == "*")
        return Operators.MULTP
    if(operator == "/")
        return Operators.DIV
    if(operator == "^")
        return Operators.POW

    return null
    
}

export default Operators