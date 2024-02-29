import {BrowserRouter,Routes,Route} from 'react-router-dom'

//  function components
import Main from './main'
import Header from './header';
import Footer from './footer'
import Signup from './Signup';
import ViewData from './viewdata';
import Addproduct from './addproduct';
import Viewproduct from './viewproduct';
import EditProduct from './editproduct';

function App() {
  return (
   <>
   <BrowserRouter>
   <Header/>
   <Routes>
    <Route path='/' element={<Main/>}></Route>
    <Route path='/signup' element={<Signup/>}></Route>
    <Route path='/viewdata' element={<ViewData/>}></Route>
    <Route path='/addproduct' element={<Addproduct/>}></Route>
    <Route path='/viewproduct' element={<Viewproduct/>}></Route>
    <Route path='/updateProduct/:id' element={<EditProduct/>}></Route>
   </Routes>
 <Footer/>
   </BrowserRouter>
   
   </>
  );
}

export default App;
