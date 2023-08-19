import Swal from 'sweetalert2'
import React, { useEffect,useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';





function Products() {


  const [ Products,setProducts]=useState([])
  const [Categories,setCategories]=useState([])
  const [UniteOfSales,setUniteOfSales]=useState([])

  const [BarCode,setBarCode]=useState("")
  const [PurchasPrice,setPurchasPrice]=useState("")
  const [Price,setPrice]=useState("")
  const [Picture,setPicture]=useState([])
  const [StockAlerte,setStockAlerte]=useState("")
  const [Name,setName]=useState("")
  const [UniteOfSaleID,setUniteOfSale]=useState(0)
  const [CategoryID,setCategory]=useState(0)


  const [message,setMessage]=useState("")

  const [valideName,setValideName]=useState(0)
  const [valideCategory,setValideCategory]=useState(0)
  const [validePicture,setValidePicture]=useState(0)
  const [ValidePrice,setValidePrice]=useState(0)


const ResetFields=()=>{
  setName("")
  setBarCode("")
  setPurchasPrice("")
  setPrice("")
  setStockAlerte("")
  setUniteOfSale("")
  setCategory("")
  setMessage("")
  setPicture("")
}

  const getCategories =async ()=>{
    
    try{
        const result =await axios.get("http://laravelapi.goualimed.com/public/api/CategoryAll"
        ,{ headers: { "Content-Type": "application/json" } 
        })
        if(result.status === 200){
          setCategories(result.data)
        }

    }
    catch(error){
        console.error(error)
    }


}

const getUniteOfSales =async ()=>{
    
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

  const getAll =async ()=>{
      try{
          const result =await axios.get("http://laravelapi.goualimed.com/public/api/ProductAll"
          ,{ headers: { "Content-Type": "application/json" } 
          })
          if(result.status === 200){
          
            setProducts(result.data)
        
          }
          getCategories()
          getUniteOfSales()

  
      }
      catch(error){
          console.error(error)
      }
  
  
  }
  
  useEffect(() => {
    getAll()
    },[] )

    useEffect(()=>{
      ResetFields()
    },[Products])
  
       
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
  const barcodeInput=(e)=>{
    if(e.target.value ===""){
        setMessage("Veuillez saissir quelque chose !!");
        setValideName(0);
    }

    else{
        setMessage(null)
        setBarCode(e.target.value);
        setValideName(1);
    }
    
}
const purchasePriceInput=(e)=>{
  if(e.target.value ===""){
      setMessage("Veuillez saissir quelque chose !!");
      setValideName(0);
  }

  else{
      setMessage(null)
      setPurchasPrice(e.target.value);
      setValideName(1);
  }
  
}
const priceInput=(e)=>{
  if(e.target.value ===""){
      setMessage("Veuillez saissir quelque chose !!");
      setValidePrice(0);
  }

  else{
      setMessage(null)
      setPrice(e.target.value);
      setValidePrice(1);
  }
  
}
const StockAlerteInput=(e)=>{
  if(e.target.value ===""){
      setMessage("Veuillez saissir quelque chose !!");
      setValideName(0);
  }

  else{
      setMessage(null)
      setStockAlerte(e.target.value);
      setValideName(1);
  }
  
}
const UniteOfSaleInput=(e)=>{
  if(e.target.value ==="-----"){
      setMessage("Veuillez saissir quelque chose !!");
      setValideName(0);
  }

  else{
      setMessage(null)
      setUniteOfSale(parseInt( e.target.value));
      setValideName(1);
  }
  
}

  const categoryInput=(e)=>{
    if(e.target.value === "-----"){
        setMessage("Veuillez saissir quelque chose !!");
        setValideCategory(0);
    }

    else{
        setMessage(null)
        setCategory(parseInt( e.target.value));
        console.log(e.target.value) ;
        setValideCategory(1); 
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
    if(valideName === 0 || valideCategory === 0 || validePicture === 0 || ValidePrice === 0){
        e.preventDefault();
        setMessage("Veuillez saissir quelque chose !!");
    }
    else{
      e.preventDefault();
      let myProduct=
      {
        BarCode ,
        PicturePath:Picture,
        Name ,
        category_id: CategoryID,
        unite_of_sale_id: UniteOfSaleID ,
        PurchasPrice ,
        Price ,
        StockAlerte 
      }
      await console.log(myProduct)

      try{
          const result =await axios.post("http://laravelapi.goualimed.com/public/api/AddProduct",
          myProduct,{
            headers: {
              "Content-Type": "multipart/form-data"
            },
          
          })
          if(result.status === 200){
            getAll()
              Swal.fire('produit a été ajoutée avec succés')
              ResetFields()
            
          }
  
      }
      catch(error){
          console.error(error)
          Swal.fire( error.toString())
      }
  

    }
  
  }
  const Delete =async (id) =>{
      
      try{
          const result =await axios.delete(`http://laravelapi.goualimed.com/public/api/DeleteProduct/${id}`)
          if(result.status === 200){
              Swal.fire('Catégorie a été supprimée avec succés')
              let myList=Products.filter(model => model.id !== id)
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
  <div className='container card w-50 p-3 m-5 d-inline-block'>
      <h2 className='text-center'>Liste des Products</h2>  <br />
      <form onSubmit={Add}>
          <div className="row">
             <div className="col-4 "><label htmlFor="">Label :  </label> <input type="text" defaultValue={ Name } onSelect={nameInput}  className="form-control m-2"></input></div>                        
            <div className="col-4 "><label htmlFor="">Bare à code :  </label> <input type="text" defaultValue={ BarCode } onSelect={barcodeInput}  className="form-control m-2"></input></div>
             <div className="col-4 "><label htmlFor="">Prix d'achat :  </label>  <input type="text" defaultValue={ PurchasPrice } onSelect={purchasePriceInput}  className="form-control m-2"></input></div>
          </div>
        <div className="row">
        <div className="col-4 "><label htmlFor="">Prix :  </label>  <input type="text" defaultValue={ Price } onSelect={priceInput}  className="form-control m-2"></input></div>
         <div className="col-4 "><label htmlFor="">stock d'alerte :  </label>    <input type="text" defaultValue={ StockAlerte } onSelect={StockAlerteInput}  className="form-control m-2"></input></div>
              
         <div className="col-4 ">
              <label htmlFor="">Catégorie :  </label>
              <select  value={ CategoryID } onChange={categoryInput}  className="form-control m-2">
                <option >-----</option>
                  { Categories.map((model,key) => 
                      (
                      <option key={model.id} value={model.id}>{model.Name}</option>
                        
                    )   
                  )}
              </select>
          </div>
        </div>
         <div className="row">
         <div className="col-4 ">
              <label htmlFor="">unité de vente :  </label>
              <select  value={ UniteOfSaleID } onChange={UniteOfSaleInput}  className="form-control m-2">
                <option >-----</option>
                  { UniteOfSales.map((model,key) => 
                      (
                      <option key={model.id} value={model.id}>{model.Name}</option>
                        
                    )   
                  )}
              </select>
          </div>
         <div className="col-4 ">
              <label htmlFor="">Image :  </label>
                <input type="file" defaultValue={ Picture } onChange={handleFileUpload}  className="form-control m-2" accept="image/*" />
              </div>
         </div>

              


              {
                  message &&(
                      <div className="alert alert-danger">{message}</div>
                  )
              } 
              <div className='text-center m-3'>
              <button className='btn btn-success' type='submit' >Ajouter</button>
  
              </div>
          
      </form>
  
      <table className='table table-striped table-light'>
          <tbody>
              <tr >
                  <th>label</th>
                  <th>image</th>
                  <th></th>



              </tr>
      
              { Products.map((model,key) => 
                  (
                  <tr key={model.id}>
                      <td>{model.Name}</td>
                      <td>
                        <img src={`http://laravelapi.goualimed.com/public/storage/${model.PicturePath}`} alt=""  width={60} /> 
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

 export default Products