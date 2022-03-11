import React, { useEffect, useState } from 'react'
import FotoList from './FotoList'
import Loading from './Loading'

const FotoListContainer = ({date}) => {
  const [fotos, setFotos] = useState([])
  const [loading, setLoading] = useState(false)
  
  const sede = "sjl"
  //const fijo = "/20/001/"        
  const url = `http://solucionesmoviles2.entel.pe/adc/concyssa_sede_${sede}/rest/Api/Transaccion/`   

  const dateApi = date.replace('-','').replace('-','')

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
      setLoading(true)  
      //setFotos([])      
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
        .finally(() => setLoading(false));
    }
  }, [query, sede]);

  return (
    <>
        { loading
            ?
            <Loading />
            :
            /*<h1>Hola</h1>*/
            <FotoList fotos={fotos} url = {url}/>
        }
    </>
  )
}

export default FotoListContainer