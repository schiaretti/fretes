import { useAuth } from '../../src/AuthContext/AuthContext.jsx'
import { Navigate } from 'react-router-dom'

const PrivateRoute = ({ children, adminOnly = false }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return <div className="text-center mt-8">Carregando...</div>
  }

  // Se não estiver logado, redireciona para login
  if (!user) {
    return <Navigate to="/" />
  }

   if (!user) {
    // Guarda a rota atual para redirecionar após login
    return <Navigate to="/" state={{ from: location }} replace />
  }

  // Se a rota é apenas para admin e o usuário não é admin
  if (adminOnly && user.nivel !== 'ADMIN') {
    // Redireciona para a página inicial ou para outra rota permitida
    // Escolha UM redirecionamento apenas
    return <Navigate to="/logistica" />
    // Ou alternativamente:
    // return <Navigate to="/fretes" />
  }

  // Se passou por todas as verificações, renderiza o conteúdo
  return children
}

export default PrivateRoute