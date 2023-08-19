import Swal from 'sweetalert2'
import React, { useEffect,useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-icons/font/bootstrap-icons.css';




function TaxesAll() {
 
 const [taxes,setTaxes]=useState([])



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


useEffect(() => {
getTaxes()
},[] )

const [valeur,setValeur]=useState("");


const [message,setMessage]=useState("");






const nameInput=(e)=>{
    if(e.target.value ===""){
        setMessage("Veuillez saissir quelque chose !!");
    }

    else{
        setMessage(null)
        setValeur(e.target.value);
    }
    
}


const addTaxe = async (e)=> {
    e.preventDefault();
    let mytaxe=
    {
        Valeur:valeur
    }
   // setTaxes([mytaxe,...taxes]);
    try{
        const result =await axios.post("http://laravelapi.goualimed.com/public/api/AddTaxe",
        mytaxe,{ headers: { "Content-Type": "application/json" } 
        })
        if(result.status === 200){
           getTaxes()
            Swal.fire('Taxe a été ajoutée avec succés')
        }

    }
    catch(error){
        console.error(error)
        Swal.fire( error.toString())
    }

    setValeur("");
}








const deleteTaxe =async (id) =>{
    let myList=taxes.filter(taxe => taxe.id !== id)
    try{
        const result =await axios.delete(`http://laravelapi.goualimed.com/public/api/DeleteTaxe/${id}`)
        if(result.status === 200){
            Swal.fire('Taxe a été supprimée avec succés')
            setTaxes((prev)=>{
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
    <h2 className='text-center'>Liste des taxes</h2>  <br />

    <form onSubmit={addTaxe}>
        <div className="form-inline ">
            <label htmlFor="">Valeur taxe :  </label>
            <input type="text" defaultValue={ valeur } onSelect={nameInput}  className="form-control m-2"   ></input>
            
          
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
    
            { taxes.map(taxe => 
                (
                <tr key={taxe.id}>
                    <td>{taxe.Valeur}</td>
                    <td> <i className="bi bi-trash-fill" onClick={()=>deleteTaxe(taxe.id)}></i></td>        
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
 
 export default TaxesAll