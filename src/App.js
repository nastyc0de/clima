import React,{Fragment,useState,useEffect} from 'react';
import Header from './components/Header';
import Formulario from './components/Formulario';
import Clima from './components/Clima';
import Error from './components/Error';


function App() {
  // state del formulario
  const [search, setSearch] = useState({
    ciudad:'',
    pais:''
  });
  const [consultar, setConsultar] = useState(false);
  const [resultado, setResultado] = useState({});
  const [error, setError] = useState(false);

  const{ ciudad, pais} = search;
  
  useEffect(() => {
    const consultarAPI = async() =>{

      if(consultar){
        const appId = '9402567ef07c715de280bb879e702f04';
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appId}`;
    
        const respuesta = await fetch(url);
        const resultado = await respuesta.json();

        setResultado(resultado);
        setConsultar(false);

        if (resultado.cod === "404") {
          setError(true);
        } else {
          setError(false);
        }
      }
      
    }
    consultarAPI();
  }, [consultar]);

  let componente;
  if (error) {
    componente = <Error mensaje="No hay resultados" />
  } else {
    componente = <Clima resultado={resultado} />
  }
  return (
    <Fragment>
      <Header
        titulo='Esta es una aplicacion de clima'
      />
      <div className="contenedor-form">
        <div className="container">
          <div className="row">
              <div className="col m6-s12">
                  <Formulario
                    search={search}
                    setSearch={setSearch}
                    setConsultar={setConsultar}
                  />
              </div>
              <div className="col m6-s12">
                  {componente}
              </div>
          </div>
        </div>
      </div>
    </Fragment>
    
  );
}

export default App;
