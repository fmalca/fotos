
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  const today = new Date()
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear();

  const todayFormatted = yyyy + "-" + mm + "-" +  dd
  
  const [fotos, setFotos] = useState([])
  const [obra, setObra] = useState(0)
  const [usuario, setUsuario] = useState('')
  const [sede, setSede] = useState('')
  const [fecha, setFecha] = useState(todayFormatted)
  const [dateApi, setDateApi] = useState(yyyy +  mm +  dd)
  const [loading,setLoading] = useState(false); 
   
  const procesaFecha = (event) => {
    setLoading(true)
    setFecha(event.target.value)
    setDateApi(event.target.value.replace('-','').replace('-',''))
  } 
  
  const procesaUsuario = (event) => {
    setLoading(true)
    setUsuario(event.target.value)
    console.log(usuario)
  }   

  const procesaObra = (event) => {    
      setLoading(true)
      const idSelected = parseInt(event.target.value);
      setObra(idSelected);      
      setSede(idSelected===1?"ate":idSelected===2?"lima":"sjl")
  };  

  
  //const usuario = "ATE060"

  const fijo = "/20/001/"  
   

  const url = `http://solucionesmoviles2.entel.pe/adc/concyssa_sede_${sede}/rest/Api/Transaccion/` 



  //const query = `http://solucionesmoviles2.entel.pe/adc/concyssa_sede_ate/rest/Api/Transaccion/${dateApi}/${usuario}${fijo}${usuario}`
  const query = `${url}${dateApi}`

  const extractIdFoto = (item) => {
    const {ListaEstados} = item
    const controles = ListaEstados[0]
    const {ListaControles} = controles
    const idFoto = ListaControles.filter((item)=>item.IdFoto !=="" )
    return idFoto
  }  
  
  useEffect(() => {
    if (sede !== "") {
      fetch(query)
        .then((response) => response.json())
        .then((data) => data["Contenido"])
        .then((contenido) => contenido.map((item) => extractIdFoto(item)))
        .then((fotos) => [].concat.apply([], fotos))
        .then((datos) => {
          setFotos(datos);
          console.log(query);
        })
        .catch((err) => console.log(err))
        .finally(setLoading(false));
    }
  }, [query, sede]);
  
  return (
    <>
      <div className="params">        
          <select id="obra" name="obra" value={obra} onChange={procesaObra}>
            <option value="1">ATE</option>
            <option value="2">LIMA</option>
            <option value="3">SJL</option>
            <option value="4">SUBCONTRATOS</option>
          </select>          
          <br />
          <input type="text" placeholder="Ingrese usuario" onChange={procesaUsuario} />
          <br />
          <input type="date" onChange={procesaFecha} value={fecha} />
         <br />        
      </div>

      {loading
        ? <h4>Cargando....</h4> 
        :     
          <div className="contenedor">
            {fotos.map((item) => (
              <div className="tarjeta" key={item.IdFoto}>
                <img
                  src={`${url}foto/${item.IdFoto}`}
                  className="card-img-top"
                  alt="..."
                  height="400"
                  width="300"
                />
                <h3>{`IdFoto: ${item.IdFoto}`} </h3>
                <h6>{`${item.ValorControl}`} </h6>
              </div>
            ))}
          </div>
      }
    </>
  );
}

export default App;
