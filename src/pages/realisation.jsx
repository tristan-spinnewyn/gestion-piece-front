import React, {useState} from 'react';
import FormRea from "../components/realisation/formRea";
import TableRea from "../components/realisation/tableRea";
import OperationLst from "../components/realisation/operations/operationLst";

function Realisation(props) {
    const [change,setChange] = useState(0)
    return (
        <div className="container">
            <FormRea change={change} setChange={setChange}/>
            <TableRea change={change}/>
        </div>
    );
}

export default Realisation;