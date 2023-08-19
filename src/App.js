import logo from './logo.svg';
import './App.css';
import SideBar from './Components/SideBar/SideBar';
import Dashbord from './Components/Dashbord/Dashbord';
import Taxes from './Components/Taxes/Taxes';
import Categories from './Components/Categories/Categories';
import PaymentsClient from './Components/PaymentsClient/PaymentsClient';
import Products from './Components/Products/Products';
import Sales from './Components/Sales/Sales';
import TypePayment from './Components/TypesPayment/TypePayment';
import UniteOfSales from './Components/UniteOfSale/UniteOfSales';
import Pos from './Components/Pos/Pos';



import { BrowserRouter, Route,Routes } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
     <SideBar>
      <Routes>
        <Route path="/" element={ <Dashbord/>} />
        <Route path="/Taxes" element={ <Taxes/>} />
        <Route path="/Categories" element={ <Categories/>} />
        <Route path="/PaymentsClient" element={ <PaymentsClient/>} />
        <Route path="/Products" element={ <Products/>} />
        <Route path="/Sales" element={ <Sales/>} />
        <Route path="/TypePayment" element={ <TypePayment/>} />
        <Route path="/UniteOfSales" element={ <UniteOfSales/>} />
        <Route path="/Pos" element={ <Pos/>} />

        

      </Routes>
      </SideBar>
    </BrowserRouter>
     




  );
}

export default App;
