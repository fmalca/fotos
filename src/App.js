import { useEffect, useState } from "react";

function App() {
  const [obra, setObra] = useState(0)
  const [fotos, setFotos] = useState([])
  const [loading,setLoading] = useState(false); 
  
  
  const obraHandle = (event) => {    
    setObra(parseInt(event.target.value))
    //setLoading(true)
  }

  const today = new Date()
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = today.getFullYear(); 

  const todayFormat = yyyy + "-" + mm + "-" +  dd

  const [fecha,setFecha] = useState(todayFormat)
  const [fechaApi, setFechaApi] = useState(yyyy-mm-dd)

  const fechaHandle = (event) => {
    setFecha(event.target.value)
    setFechaApi(event.target.value.replace('-','').replace('-',''))
    //setLoading(true)
  }


  let sede = '*'

  if (obra===1) sede ='ate'
  if (obra===2) sede ='lima'
  if (obra===3) sede ='sjl'
  if (obra===4) sede ='terceros'

  const url = `http://solucionesmoviles2.entel.pe/adc/concyssa_sede_${sede}/rest/Api/Transaccion/` 
  const query = `${url}${fechaApi}`


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
    <div >
      <select onChange={obraHandle}>
        <option value="0">Seleccionar Obra</option>
        <option value="1">ATE</option>
        <option value="2">LIMA</option>
        <option value="3">SJL</option>
        <option value="4">CONTRATISTA</option>
      </select>
      <input type="date" value ={fecha} onChange={fechaHandle}/>
      {
        loading ?
          <h1>"Cargando....."</h1>
          :
          <div >
            {fotos.map((item) => (
              <div key={item.IdFoto}>
                <img
                  src={`${url}foto/${item.IdFoto}`}                  
                  alt="..."
                  height="400"
                  width="300"
                />
                <h3>{`IdFoto: ${item.IdFoto}`} </h3>
                <h6>{`${item.ValorControl}`} </h6>
              </div>
            ))
            }
          </div>
      }
      
    </div>
  );
}

export default App;
