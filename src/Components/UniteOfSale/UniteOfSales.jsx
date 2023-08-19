import Swal from 'sweetalert2'
import React, { useEffect,useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';





function UniteOfSales() {
 

  const [uniteOfSales,setUniteOfSales]=useState([])



  const getAll =async ()=>{
      try{
          const result =await axios.get("http://laravelapi.goualimed.com/public/api/UniteOfSaleAll"
          ,{ headers: { "Content-Type": "application/json" } 
          })
          if(result.status === 200){
              setUniteOfSales(result.data)
          }
  
      }
      catch(error){
          console.error(error)
      }
  
  
  }
  
  
  useEffect(() => {
    getAll()
  },[] )
  
  const [Name,setName]=useState("");
  
  
  const [message,setMessage]=useState("");
  
  
  
  
  
  
  const nameInput=(e)=>{
      if(e.target.value ===""){
          setMessage("Veuillez saissir quelque chose !!");
      }
  
      else{
          setMessage(null)
          setName(e.target.value);
      }
      
  }
  
  
  const Add = async (e)=> {
      e.preventDefault();
      let myUniteOfSale=
      {
        Name
      }

      try{
          const result =await axios.post("http://laravelapi.goualimed.com/public/api/AddUniteOfSale",
          myUniteOfSale,{ headers: { "Content-Type": "application/json" } 
          })
          if(result.status === 200){
            getAll()
              Swal.fire('mode de réglement a été ajoutée avec succés')
          }
  
      }
      catch(error){
          console.error(error)
          Swal.fire( error.toString())
      }
  
      setName("");
  }
  
  
  
  
  
  
  
  
  const Delete =async (id) =>{
    
      let myList=uniteOfSales.filter(model => model.id !== id)
      try{
          const result =await axios.delete(`http://laravelapi.goualimed.com/public/api/DeleteUniteOfSale/${id}`)
          
          if(result.status === 200){
              Swal.fire(' Ce ype de réglement a été supprimée avec succés')
              getAll((prev)=>{
                  return myList
              })
          }
  
      }
      catch(error){
          console.error(error)
          Swal.fire( error.toString())
      }
  
  
  }
  
  
  
  
  
    return (
      <>
      <div className=' d-flex justify-content-center'>
  
  <br />
  <br />
  <div className='card w-50 p-3 m-5 d-inline-block'>
      <h2 className='text-center'>Liste des unités de vente</h2>  <br />
  
      <form onSubmit={Add}>
          <div className="form-inline ">
              <label htmlFor="">Label :  </label>
              <input type="text" defaultValue={ Name } onChange={nameInput}  className="form-control m-2"   ></input>
              
            
              {
                  message &&(
                      <div className="alert alert-danger">{message}</div>
                  )
              } 
              <div className='text-center m-3'>
              <button className='btn btn-success' type='submit' >Ajouter</button>
  
              </div>
          </div> 
      </form>
  
      <table className='table table-striped table-light'>
          <tbody>
              <tr >
                  <th>label</th>
                  <th></th>
  
              </tr>
      
              { uniteOfSales.map(model => 
                  (
                  <tr key={model.id}>
                      <td>{model.Name}</td>
                      <td> <i className="bi bi-trash-fill" onClick={()=>Delete(model.id)}></i></td>        
                  </tr>
              )   
              )}
  
          </tbody>
      
  
      </table>
  </div>
  
  </div>
      </>
  
    )

}

 export default UniteOfSales