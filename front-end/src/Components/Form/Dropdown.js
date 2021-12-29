import { useState } from "react";

import FormContext from '../../Pages/Usuários/CadastroAluno/FormContext'

const Dropdown = ({
    options
}) => {
    const [selectedOption, setSelectedOption] = useState(options[0].value);
    return (
        <FormContext.Provider value={selectedOption}> 
            <select
                value={selectedOption}
                className="dropdown"
                aria-label="Default select example"
                onChange={e => {
                    setSelectedOption(e.target.value)
                }}
            >
                {options.map(o =>
                    <option key={o.value} value={o.value} disabled={o.disabled}>{o.label}</option>
                )}
            </select>
        </FormContext.Provider>
    );
};
export default Dropdown;