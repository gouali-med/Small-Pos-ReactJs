import Swal from 'sweetalert2'
import React, { useEffect,useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import './Dashbord.css';




function Dashbord() {
 

    return (
        <>
            <div className="d-flex flex-row align-items-center justify-content-between m-5">

                <div className="card align-items-center" style={{width: "14rem",height:"10rem",borderRadius: "2em"}}>
                    <h2>
                    Nombre des ventes
                    </h2>
                    <h2> 22 </h2>
                </div>

                <div className="card align-items-center" style={{width: "14rem",height:"10rem",borderRadius: "2em"}}>
                    <h2>
                    Total des ventes
                    </h2>
                    <h2> 22</h2>
                </div>


                <div  className="card align-items-center text-center" style={{width: "14rem",height:"10rem",borderRadius: "2em"}}>
                    <h2>
                    les charges
                    </h2>
                    <h2>22 </h2>
                </div>
            </div>
        </>
    
      )


}

 export default Dashbord