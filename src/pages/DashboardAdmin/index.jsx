import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { useAuth } from '../../AuthContext/AuthContext.jsx'

const DashboardAdmin = () => {
  const [stats, setStats] = useState({
    totalFretes: 0,
    fretesDisponiveis: 0,
    fretesReservados: 0,
    fretesFinalizados: 0,
    percentualDisponivel: 0,
    percentualFinalizado: 0
  })
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const navigate = useNavigate()

  // Carrega estatísticas
  useEffect(() => {
    console.log('Carregando estatísticas...') // Debug
    const carregarEstatisticas = async () => {
      try {
        setLoading(true)
        const response = await api.get('/admin/estatisticas')
        console.log('Dados recebidos:', response.data) // Debug
        setStats(response.data)
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error)
        alert('Erro ao carregar estatísticas')
      } finally {
        setLoading(false)
      }
    }

    carregarEstatisticas()
  }, [])

  const handleNovoFrete = () => {
    console.log('Navegando para novo-frete...')
  navigate('/logistica/novo-frete', { 
   state: { fromDashboard: true } // Adicione state se necessário
  })
  }

  // Componente para os cards de estatística
  const StatCard = ({ title, value, borderColor, percent }) => (
    <div className={`bg-white p-4 rounded-lg shadow border-l-4 ${borderColor}`}>
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <div className="flex items-end">
        <p className="text-2xl font-bold mr-2">{value}</p>
        {percent !== undefined && (
          <span className="text-sm text-gray-500">{percent}%</span>
        )}
      </div>
    </div>
  )

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Dashboard Administrativo</h1>
      
      {/* Seção de Estatísticas */}
      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Carregando estatísticas...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <StatCard 
            title="Total de Fretes" 
            value={stats.totalFretes} 
            borderColor="border-blue-500" 
          />
          <StatCard 
            title="Disponíveis" 
            value={stats.fretesDisponiveis} 
            borderColor="border-green-500"
            percent={stats.percentualDisponivel}
          />
          <StatCard 
            title="Reservados" 
            value={stats.fretesReservados} 
            borderColor="border-yellow-500" 
          />
          <StatCard 
            title="Finalizados" 
            value={stats.fretesFinalizados} 
            borderColor="border-purple-500"
            percent={stats.percentualFinalizado}
          />
        </div>
      )}

      {/* Seção de Gerenciamento - Ajuste responsivo */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h2 className="text-xl font-semibold">Gerenciamento de Fretes</h2>
            <p className="text-gray-600 mt-1 sm:mt-0">
              Aqui você pode gerenciar os fretes da plataforma
            </p>
          </div>
          <button 
            onClick={handleNovoFrete}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md flex items-center w-full sm:w-auto justify-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Novo Frete
          </button>
        </div>

        <div className="mt-4 text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">
            Utilize o botão acima para criar um novo frete
          </p>
        </div>
      </div>
    </div>
  )
}

export default DashboardAdmin