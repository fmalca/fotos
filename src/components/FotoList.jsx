import React  from 'react'

const FotoList = ({fotos, url}) => {
  return (
    <>
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
    </>
  );
}

export default FotoList
