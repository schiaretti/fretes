import { useAuth } from '../AuthContext/AuthContext.jsx'
import { Navigate, useLocation } from 'react-router-dom'

const PrivateRoute = ({ children, adminOnly = false, allowAdminAccess = false }) => {
  const { user, loading } = useAuth()
  const location = useLocation()

  // Debug (pode remover depois que tudo estiver funcionando)
  console.log('PrivateRoute - path:', location.pathname)
  console.log('User:', user)
  console.log('adminOnly:', adminOnly)
  console.log('allowAdminAccess:', allowAdminAccess)

  if (loading) {
    return <div className="text-center mt-8">Carregando...</div>
  }

  // Se não estiver logado, redireciona para login
  if (!user) {
    return <Navigate to="/" state={{ from: location }} replace />
  }

   // Se for admin e não for uma rota admin, redireciona para o dashboard
  // Exceto se allowAdminAccess for true (para rotas como /logistica/novo-frete)
  if (user.nivel === 'ADMIN' && !allowAdminAccess && !location.pathname.startsWith('/admin')) {
    return <Navigate to="/admin" replace />
  }

  // Se a rota é apenas para admin
  if (adminOnly) {
    return user.nivel === 'ADMIN'
      ? children
      : <Navigate to="/logistica/fretes" replace />
  } 

  // Se passou por todas as verificações, renderiza o conteúdo
  return children
}

export default PrivateRoute