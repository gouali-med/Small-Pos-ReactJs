import Swal from 'sweetalert2'
import React, { useEffect,useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';





function Categories() {


  const [Categories,setCategories]=useState([])
  const [Taxes,setTaxes]=useState([])

  const [Name,setName]=useState("")
  const [TaxeID,setTaxe]=useState(0)
  const [Picture,setPicture]=useState([])
  const [message,setMessage]=useState("")
  const [valideName,setValideName]=useState(0)
  const [valideTaxe,setValideTaxe]=useState(0)
  const [validePicture,setValidePicture]=useState(0)



  const getTaxes =async ()=>{
    
    try{
        const result =await axios.get("http://laravelapi.goualimed.com/public/api/TaxeAll"
        ,{ headers: { "Content-Type": "application/json" } 
        })
        if(result.status === 200){
          setTaxes(result.data)
        }

    }
    catch(error){
        console.error(error)
    }


}

  const getAll =async ()=>{
      try{
          const result =await axios.get("http://laravelapi.goualimed.com/public/api/CategoryAll"
          ,{ headers: { "Content-Type": "application/json" } 
          })
          if(result.status === 200){
       
            setCategories(result.data)
            await console.log(Categories)
          }
          getTaxes()
  
      }
      catch(error){
          console.error(error)
      }
  
  
  }

  useEffect(() => {
    getAll()
    },[] )
  

  const nameInput=(e)=>{
      if(e.target.value ===""){
          setMessage("Veuillez saissir quelque chose !!");
          setValideName(0);
      }
  
      else{
          setMessage(null)
          setName(e.target.value);
          setValideName(1);
      }
      
  }
  const taxeInput=(e)=>{
    if(e.target.value === "Veuillez selectionner un taxe"){
        setMessage("Veuillez saissir quelque chose !!");
        setValideTaxe(0);
    }

    else{
        setMessage(null)
        setTaxe(parseInt( e.target.value));
        console.log(e.target.value) ;
        setValideTaxe(1); 
      }
    
}
  const handleFileUpload = (e) => {

    if(e.target.value ===""){
      setMessage("Veuillez saissir quelque chose !!");
      setValidePicture(0); 
  }

  else{
      setMessage(null)
      const file = e.target.files[0];
      setPicture(file);
      const formData = new FormData();
      formData.append("Picture", Picture);

      setValidePicture(1); 

  }

  }; 
  
  const Add = async (e)=> {
    if(valideName === 0 || valideTaxe === 0 || validePicture === 0){
        e.preventDefault();
        setMessage("Veuillez saissir quelque chose !!");
    }
    else{
      e.preventDefault();
      let myCategory=
      {
        Picture,
        Name,
        taxe_id:TaxeID
      }
      await console.log(myCategory)

      try{
          const result =await axios.post("http://laravelapi.goualimed.com/public/api/AddCategory",
          myCategory,{
            headers: {
              "Content-Type": "multipart/form-data"
            },
          
          })
          if(result.status === 200){
            getAll()
              Swal.fire('Catégorie a été ajoutée avec succés')
              setName("")
              setMessage("")
              setPicture("")
            
          }
  
      }
      catch(error){
          console.error(error)
          Swal.fire( error.toString())
      }
  
      setName("")
      setMessage("")
      setPicture("")
    }
  
  }

  const Delete =async (id) =>{
      
      try{
          const result =await axios.delete(`http://laravelapi.goualimed.com/public/api/DeleteCategory/${id}`)
          if(result.status === 200){
              Swal.fire('Catégorie a été supprimée avec succés')
              let myList=Categories.filter(model => model.id !== id)
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
      <h2 className='text-center'>Liste des categories</h2>  <br />
      <form onSubmit={Add}>
          <div className="form-inline ">
              <label htmlFor="">Label :  </label>
              <input type="text" defaultValue={ Name } onSelect={nameInput}  className="form-control m-2"></input>
              
              <label htmlFor="">TaxeID :  </label>
              <select  value={ TaxeID } onChange={taxeInput}  className="form-control m-2">
                <option >Veuillez selectionner un taxe</option>
              { Taxes.map((model,key) => 
                  (
                  <option key={model.id} value={model.id}>{model.Valeur}</option>
                    
                 )   
              )}
              </select>
              
              <div>
              <label htmlFor="">Image :  </label>
                <input type="file" defaultValue={ Picture } onChange={handleFileUpload}  className="form-control m-2" accept="image/*" />
              </div>
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
                  <th>image</th>
                  <th></th>



              </tr>
      
              { Categories.map((model,key) => 
                  (
                  <tr key={model.id}>
                      <td>{model.Name}</td>
                      <td>
                        <img src={`http://laravelapi.goualimed.com/public/storage/${model.Picture}`} alt=""  width={60} /> 
                      </td>
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

 export default Categories