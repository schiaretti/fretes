import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom'
import Cadastro from './pages/cadastro'
import Login from './pages/login'
import Logistica from './pages/logistica'
import { AuthProvider } from './AuthContext/AuthContext.jsx'
import PrivateRoute from './components/PrivateRoute.jsx'
import ListagemFretes from './pages/Listagem-Fretes/index.jsx'
import CadastroVeiculo from './pages/CadastroVeiculos/index.jsx'
import ListagemVeiculos from './pages/ListagemVeiculos/index.jsx'
import DashboardAdmin from './pages/DashboardAdmin/index.jsx'
import NovoFrete from './pages/NovoFrete/index.jsx'

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <header className='bg-blue-900 text-center text-white p-4 shadow-md'>
          <h1 className='text-2xl font-bold'>Sistema de Fretes</h1>
        </header>

        <main className="container mx-auto p-4">
          <Routes>
            {/* Rotas públicas */}
            <Route path='/cadastro-usuario' element={<Cadastro />} />
            <Route path='/' element={<Login />} />

            {/* Rota de Dashboard Admin (separada) */}
            <Route path='/admin' element={
              <PrivateRoute adminOnly={true}>
                <DashboardAdmin />
              </PrivateRoute>
            } />

            <Route path='/logistica' element={
              <PrivateRoute allowAdminAccess={true}>  
                <Logistica />
              </PrivateRoute>
            }>
              {/* Sub-rotas */}
              <Route index element={<Navigate to="fretes" replace />} />
              <Route path='fretes' element={<ListagemFretes />} />
              <Route path='veiculos' element={<ListagemVeiculos />} />
              <Route path='cadastro-veiculo' element={<CadastroVeiculo />} />
              <Route path='novo-frete' element={<NovoFrete />} />
            </Route>

            {/* Redirecionamento para páginas não encontradas */}
            <Route path='*' element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App