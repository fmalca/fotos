import React, { useState } from 'react'
import FotoListContainer from './FotoListContainer';

const Filter = () => {

    const today = new Date()
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); 
    const yyyy = today.getFullYear();     

    const [date, setDate] = useState(yyyy + "-" + mm + "-" +  dd)  

    const handleDate = (event) => {
        setDate(event.target.value)
    }

  return (
    <div>        
        <input type="date" value={date} onChange={handleDate} />
        <FotoListContainer date={date}/>
    </div>
  )
}

export default Filter