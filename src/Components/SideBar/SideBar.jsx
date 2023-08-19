import Swal from 'sweetalert2'
import React, { useEffect,useState} from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/js/dist/dropdown';
import './SideBar.css';
import { NavLink } from 'react-router-dom';



function SideBar({children}) {
    const [isOpen,setIsOpen]=useState(false)
    const toggle=()=>setIsOpen(!isOpen);
    const menuItem=[
        {
            path:"/",
            name:"Tableau de bord",
            icon:(<i className="bi bi-speedometer2"></i>)
        },
        {
            path:"/Sales",
            name:"Ventes",
            icon:(<i className="bi bi-speedometer2"></i>)
        },
        {
            path:"/Products",
            name:"Produits",
            icon:(<i className="bi bi-layers"></i>)
        },
        {
            path:"/Categories",
            name:"Catégories",
            icon:(<i className="bi bi-tags"></i>)
        },
        {
            path:"/Taxes",
            name:"Taxes",
            icon:(<i className="bi bi-currency-exchange"></i>)
        },

        {
            path:"/PaymentsClient",
            name:"Réglements clients ",
            icon:(<i className="bi bi-wallet"></i>)
        },
   
        {
            path:"/Pos",
            name:"Pos",
            icon:(<i className="bi bi-receipt"></i>)
        },
        {
            path:"/TypePayment",
            name:"Types réglements",
            icon:(<i className="bi bi-cash-coin"></i>)
        },
        {
            path:"/UniteOfSales",
            name:"Unités de vente",
            icon:(<i className="bi bi-hdd-stack"></i>)
        }
        
    ]
    return(
        <>
        <nav>
            <h2 >GM SALES </h2>
             <i onClick={toggle} className="bi bi-list"></i>
        </nav>
        <div className='container1' >
            <div style={{width:isOpen?"200px":"50px"}} className="Sidebar">
                <div className="top_section">
                    <h2 style={{display:isOpen?"block":"none"}} className='logo'></h2>
                    {/* <div style={{marginLeft:isOpen?"50px":"0px"}} className="bars"> <i onClick={toggle} className="bi bi-list"></i></div> */}
                </div>
                {
                    menuItem.map((item,index)=>(
                        <NavLink to={item.path} key={index}  className={({ isActive }) => isActive ? "active" : "link" }>
                            <div className="icon">{item.icon}</div>
                            <div style={{display:isOpen?"block":"none"}} className='link_text'>{item.name}</div>

                        </NavLink>
                    ))
                }
            </div>
            <main>{children}</main>
        </div>
        </>
    )
}


export default SideBar