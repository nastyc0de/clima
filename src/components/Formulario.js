import React,{useState} from 'react';
import Error from './components/Error';

const Formulario = ({search, setSearch, setConsultar}) => {

    const [error, setError] = useState(false);

    // extract the city and country
    const {ciudad, pais} = search;
   
    // function that put the element into the state
    const handleChange = e =>{
        // update the state
        setSearch({
            ...search,
            [e.target.name]:e.target.value
        });
    }
    
    // When the user do a submit to the form
    const handleSubmit = e =>{
        e.preventDefault();
        
        // validate
        if (ciudad.trim()===''|| pais.trim()==='')  {
            setError(true);
            return;
        }
        setError(false);
        setConsultar(true);
    }
    return (
        <form
            onSubmit ={handleSubmit}
        >
            {error ? <Error mensaje="Ambos campos son obligatorios"/>:null}
            <div className="input-field col s12">
                <input
                    type="text"
                    name="ciudad"
                    id="ciudad"
                    value={ciudad}
                    onChange={handleChange}
                />
                <label htmlFor="ciudad">Ciudad: </label>
            </div>
            <div className="input-field col s12">
                <select
                    name="pais"
                    id="pais"
                    value={pais}
                    onChange={handleChange}  
                >
                    <option>Seleccione un país</option>
                    <option value="US">Estados Unidos</option>
                    <option value="BO">Bolivia</option>
                    <option value="MX">México</option>
                    <option value="AR">Argentina</option>
                    <option value="CO">Colombia</option>
                    <option value="CR">Costa Rica</option>
                    <option value="ES">España</option>
                    <option value="PE">Perú</option>
                </select>
                <label htmlFor="pais">País: </label>           
            </div>
            <div className="input-field col s12">
                <button 
                    type="submit"
                    className="waves-effect waves-light btn-large btn-block yellow accent-4">
                Buscar clima</button>
            </div>
        </form>
    );
}
 
export default Formulario;