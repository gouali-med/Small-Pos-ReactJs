import Swal from 'sweetalert2'
import React, { useEffect,useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';





function Sales() {
  const [ Sales,setSales]=useState([])
  const getAll =async ()=>{
    try{
        const result =await axios.get("http://laravelapi.goualimed.com/public/api/SaleAll"
        ,{ headers: { "Content-Type": "application/json" } 
        })
        if(result.status === 200){
        
          setSales(result.data)
        }



    }
    catch(error){
        console.error(error)
    }


}

  
useEffect(() => {
  getAll()
  },[] )

    return (
        <>
              
      <table className='table table-striped table-light'>
          <tbody>
              <tr >
                  <th>dateOperation</th>
                  <th>totalHT</th>
                  <th>totalTVA</th>
                  <th>totalTTC</th>

                  <th></th>



              </tr>
      
              { Sales.map((model,key) => 
                  (
                  <tr key={model.id}>
                      <td>{ model.DateOperation}</td>
                      <td>{model.TotalHT}</td>
                      <td>{model.TotalTVA}</td>
                      <td>{model.TotalTTC}</td>

                  </tr>
              )   
              )}
  
          </tbody>
      
  
      </table>
        </>
    
      )


}

 export default Sales