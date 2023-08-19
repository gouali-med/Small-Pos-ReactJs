import Swal from 'sweetalert2'
import React, { useEffect,useState} from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.css';
import '../SideBar/SideBar.css';





function NavBar() {
    const [isOpen,setIsOpen]=useState(false)
    const toggle=()=>setIsOpen(!isOpen);
    return (
        <>
            <nav style={{background:"#2c586e"}}>
                <h1 style={{color:"#fff"}}>GM SALES</h1>
                <div style={{marginLeft:isOpen?"50px":"0px"}} className="bars"> <i onClick={toggle} className="bi bi-list"></i></div>
            </nav>
        </>
    
      )


}

 export default NavBar