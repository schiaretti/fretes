// src/pages/veiculos/ListagemVeiculos.jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import api from '../../services/api'
import { useAuth } from '../../AuthContext/AuthContext.jsx'
import { FaTrash } from 'react-icons/fa';

const ListagemVeiculos = () => {
  const [veiculos, setVeiculos] = useState([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()

  useEffect(() => {
    const carregarVeiculos = async () => {
      try {
        const response = await api.get('/veiculos')
        setVeiculos(response.data)
      } catch (error) {
        console.error('Erro ao carregar veículos:', error)
        alert('Erro ao carregar veículos')
      } finally {
        setLoading(false)
      }
    }

    carregarVeiculos()
  }, [])

  const excluirVeiculo = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este veículo?')) return

    try {
      await api.delete(`/veiculos/${id}`)
      setVeiculos(veiculos.filter(v => v.id !== id))
      alert('Veículo excluído com sucesso')
    } catch (error) {
      console.error('Erro ao excluir veículo:', error)
      alert('Erro ao excluir veículo')
    }
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Meus Veículos</h1>
        <Link
          to="/cadastro-veiculo"
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
        >
          <i className="fas fa-plus mr-2"></i> Adicionar Veículo
        </Link>
      </div>

      {loading ? (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Carregando veículos...</p>
        </div>
      ) : veiculos.length === 0 ? (
        <div className="text-center py-8 bg-gray-50 rounded-lg">
          <p className="text-gray-600 mb-4">Nenhum veículo cadastrado</p>
          <Link
            to="/cadastro-veiculo"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md inline-block"
          >
            Cadastrar primeiro veículo
          </Link>
        </div>
      ) : (
        <div className="bg-white shadow overflow-hidden sm:rounded-lg">
          <ul className="divide-y divide-gray-200">
            {veiculos.map(veiculo => (
              <li key={veiculo.id} className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="min-w-0 flex-1">
                      <div className="text-sm font-medium text-blue-600 truncate">
                        {veiculo.marca} {veiculo.modelo} - {veiculo.placa}
                      </div>
                      <div className="mt-1 text-sm text-gray-500">
                        <p>
                          <span className="font-medium">Tipo:</span> {veiculo.tipo} |
                          <span className="font-medium ml-2">Ano:</span> {veiculo.ano} |
                          <span className="font-medium ml-2">Capacidade:</span> {veiculo.capacidade} ton
                        </p>
                      </div>
                    </div>
                  </div>
                  <div>
                   <button
  onClick={() => excluirVeiculo(veiculo.id)}
  className="text-red-600 hover:text-red-900 mr-4 p-2 rounded-full hover:bg-red-50 transition-colors"
  title="Excluir veículo"
  aria-label="Excluir veículo"
>
  <FaTrash className="text-lg" />
</button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default ListagemVeiculos