import AConstant from "./AConstant";
import EulerConstant from "./EulerConstant";
import PIConstant from "./PIConstant";

var ConstantList: { [id: string] : AConstant; } = {};
ConstantList["PI"] = new PIConstant();
ConstantList["e"] = new EulerConstant();

export default ConstantList