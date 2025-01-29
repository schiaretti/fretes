import {BrowserRouter,Route,Routes,Navigate} from 'react-router-dom'
import Cadastro from './pages/cadastro'
import Login from './pages/login'
import Logistica from './pages/logistica'


function App() {
 

  return (
   
      <BrowserRouter>

    <header className='bg-blue-900 text-center text-white p-4 shadow-md rounded-md '>
      <h1 className='text-2xl font-bold text-center'>Sistema de fretes</h1>
    </header>

      <Routes>
        <Route path='/cadastro-usuario'element={<Cadastro/>}/>
        <Route path='/'element={<Login/>}/>
        <Route path='/logistica'element={<Logistica/>}/>
      </Routes>
       
      </BrowserRouter>
     
  ) 
}

export default App
