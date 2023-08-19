import Swal from 'sweetalert2'
import React, { useRef,useEffect,useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './Pos.css';
import ReactToPrint from 'react-to-print';






function Pos() {

  const [Categories,setCategories]=useState([])
  const [Products,setProducts]=useState([])
  const [SelectedProducts,setSelectedProducts]=useState([])
  const [Details,setDetails]=useState([])


    const [Total_ht,setTotal_ht]=useState(0)
    const [Total_tva,setTotal_tva]=useState(0)
    const [Total_ttc,setTotal_ttc]=useState(0)


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

  const GetProductsByCategory=async (id)=>{
    try{
        const result =await axios.get(`http://laravelapi.goualimed.com/public/api/Product/${id}`
        ,{ headers: { "Content-Type": "application/json" } 
        })
        if(result.status === 200){
        
          setProducts(result.data.products)
        }



    }
    catch(error){
        console.error(error)
    }


}



  const Delete = (id) =>{
    let myList=SelectedProducts.filter(model => model.id != id)
    setSelectedProducts((prev)=>{
        console.log(prev)
        return myList
    })
}

const GetDetailsFromTable=()=>{
  SelectedProducts.forEach(element => {
    let detail={
      product_id:element.id,
      Quantite:element.quantity,
      Montant:element.montant_ttc,
      sale_id:0
      
    }
   
    setDetails((prevDetails) => [detail, ...prevDetails]);

  }
  
  );
}
const Valider =async (e) =>{
 e.preventDefault();
  GetDetailsFromTable();


  let mySale={
    TotalHT:Total_ht,
    TotalTVA:Total_tva,
    TotalTTC:Total_ttc,
    Solde:Total_ttc,
    Reste:0,
    client_id:1,
    user_id:1,
    type_payment_id:1,
    Details
  }


  try{
      const result =await axios.post("http://laravelapi.goualimed.com/public/api/AddSale",
      mySale,{ headers: { "Content-Type": "application/json" } 
      })
      if(result.status === 200){
        
         setSelectedProducts([])
         setTotal_ht(0)
         setTotal_tva(0)
         setTotal_ttc(0)
         await Swal.fire('Sale a été ajoutée avec succés')

      }

  }
  catch(error){
      console.error(error)
      Swal.fire( error.toString())
  }



}




  const GetTaxeByCategory =async (id)=>{
    try{
        const result =await axios.get(`http://laravelapi.goualimed.com/public/api/Category/${id}`
        ,{ headers: { "Content-Type": "application/json" } 
        })
        if(result.status === 200){
        
         return result.data
        }



    }
    catch(error){
        console.error(error)
    }


}

     const AddToTable = async (e)=>
    {

        e.preventDefault();
        const obj=Products.find(model=>model.id == e.currentTarget.id)
        const currentDateTime = new Date().toISOString();
        const formattedDateTime = new Date(currentDateTime).toISOString().replace(/\.\d{3}/, 'Z');

        let newObj={
        barCode:obj.BarCode,
        category_id:obj.category_id,
        id:obj.id,
        Name:obj.Name,
        picturePath:obj.PicturePath,
        Price:obj.Price,
        Price_with_tva:await parseFloat(obj.Price)+((parseFloat(obj.Price)* parseFloat(await GetTaxeByCategory(obj.category_id)) )/100)  ,
        tva_value:await ((parseFloat(obj.Price)* parseFloat(await GetTaxeByCategory(obj.category_id)) )/100)  ,
        PurchasPrice:obj.PurchasPrice,
        stockAlerte:obj.stockAlerte,
        uniteOfSale:obj.unite_of_sale_id,
        quantity:1,
        montant_ht:obj.Price,
        montant_tva:await ((parseFloat(obj.Price)* parseFloat(await GetTaxeByCategory(obj.category_id)) )/100)  * 1,
        montant_ttc:await parseFloat(obj.Price)+((parseFloat(obj.Price)* parseFloat(await GetTaxeByCategory(obj.category_id)) )/100)  * 1,
        }

        let mapped=SelectedProducts.map((element) => element.id)
        if(mapped.includes(obj.id)===true){
            return null;
        }
        
        setSelectedProducts([newObj,...SelectedProducts]);
        
        getTotal();
      
   

    }

    const getTotal=()=>{

        let total_ht=0;     
        let total_tva=0;     
        let total_ttc=0;     

          SelectedProducts.forEach(element => {
            total_ht+=element.montant_ht;
            total_tva+=element.montant_tva;
            total_ttc+=element.montant_ttc;

            
          });
          setTotal_ht(total_ht);
          setTotal_tva(total_tva);
          setTotal_ttc(total_ttc);
    }

  

  const incrimentQuantity=async (e)=>
  {
    let id= e.currentTarget.id;

      e.preventDefault();
      setSelectedProducts(product=>
        product.map((item)=>
        id==item.id ? {...item,
          quantity:item.quantity+1,
          montant_ht:(item.quantity+1)*item.Price,
          montant_tva: (item.quantity+1)*item.tva_value,
          montant_ttc:(item.quantity+1)*item.Price_with_tva,

        } :item
        )

      );
      getTotal();

        
}
  

const decrementQuantity=(e)=>
{
  let id= e.currentTarget.id;

    e.preventDefault();
    setSelectedProducts(product=>
      product.map((item)=>
      id==item.id ? {...item,quantity:(item.quantity==1? item.quantity:item.quantity-1),
        montant_ht:(item.quantity==1? item.montant_ht:(item.quantity-1)*item.Price),
        montant_tva:(item.quantity==1? item.montant_tva:(item.quantity-1)*item.tva_value),
        montant_ttc:(item.quantity==1? item.montant_ttc:(item.quantity-1)*item.Price_with_tva)

      } :item
      )

    );
    getTotal();

      
}


useEffect(() => {
  getTotal()
  },[SelectedProducts] )


useEffect(() => {
  GetDetailsFromTable()
  },[SelectedProducts] )

  useEffect(() => {
    getCategories()
    },[] )
  
      
  const componentRef = useRef();

    return (
        <>

            <div className="container">
                <div className="row">
                    <div className="col-6">
                    <div className='container d-flex border m-1 container_categories'>
                      <div className="row gallery">
                          { Categories?.map((model,key) => 
                            (
                              <div className='card1 col-md-3' key={key} id={model.id}onClick={()=>GetProductsByCategory(model.id)}>
                                  <div className="card-header "><h1 style={{fontSize:"8px"}}>{model.Name}</h1></div>
                                  <div className="card-body"> <img src={`http://laravelapi.goualimed.com/public/storage/${model.Picture}`} alt=""  width="100" height="40"/> </div>
                              </div>
                            )   
                          )}  
                      </div>
                    </div>

                    <div className='container d-flex border m-1'>
                    <div className="row">

                        { Products?.map((model,key) => 
                        (
                        <div className='card col-md-4 ' key={key} id={model.id} onClick={AddToTable}>
                            <div className="card-header "><span>{model.Name}</span></div>
                            <div className="card-body"> <img src={`http://laravelapi.goualimed.com/public/storage/${model.PicturePath}`} alt=""  width="100" /> </div>
                            <div className="card-footer">{model.Price} DHS</div>
                        </div>

                    )   
                    )}  
                        

                        

                    </div>
                        </div>
                    </div>

                    <div className="col-6">
                        
                        <div className='selected-table' ref={componentRef}>
                        <table className='table table-striped table-light' id='table'>
                        <tbody>
                        <tr >
                            <th>label</th>
                            <th>Price</th>
                            <th>Quatité</th>
                            <th>montant</th>

                            <th></th>




                        </tr>

                        { SelectedProducts.map((model,key) => 
                            (
                            <tr key={key} id={model.id}>
                                <td>{model.Name}</td>
                                <td>{model.Price} </td>
                                <td>
                                    <button className="in_decrement"  id={model.id} onClick={incrimentQuantity}>+</button>
                                    <input  style={{width:"40px"}}  value={model.quantity} readOnly />
                                    <button  className="in_decrement"  id={model.id} onClick={decrementQuantity}>-</button> 
                                </td>
                                <td>{model.montant_ttc} </td>
                                <td> <i className="bi bi-trash-fill" onClick={()=>Delete(model.id)}></i></td>  
                            </tr>
                        )   
                        )}

                        </tbody>

                        </table>

                        <div >
                            <div>Total HT : {Total_ht} dhs</div>
                            <div>Total TVA : {Total_tva}  dhs</div>
                            <div>Total TTC : {Total_ttc}  dhs</div>
                                <div className="text-center valider">
                                <button  className='valider' type='button' onClick={Valider}>Payer</button>
                                <ReactToPrint
                                  trigger={() => {

                                    return  <button>print</button>;
                                  }}
                                  content={() => componentRef.current}
                                />
                                </div>
                        </div>
                       
                        </div>
                    </div>

                </div>
            </div>
        </>
  
    )


}

 export default Pos