// src/pages/fretes/ListagemFretes.jsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { useAuth } from '../../AuthContext/AuthContext.jsx'

const ListagemFretes = () => {
    const [fretes, setFretes] = useState([])
    const [loading, setLoading] = useState(true)
    const [filtros, setFiltros] = useState({
        tipoVeiculo: '',
        origem: '',
        destino: ''
    })
    const { user } = useAuth()
    const navigate = useNavigate()

    // Buscar fretes ao carregar a página ou quando filtros mudam
    useEffect(() => {
        const carregarFretes = async () => {
            try {
                setLoading(true)
                const params = {
                    status: 'DISPONIVEL',
                    ...(filtros.tipoVeiculo && { tipoVeiculo: filtros.tipoVeiculo }),
                    ...(filtros.origem && { origem: filtros.origem }),
                    ...(filtros.destino && { destino: filtros.destino })
                }

                const response = await api.get('/fretes/disponiveis', { params })
                setFretes(response.data)
            } catch (error) {
                console.error('Erro ao carregar fretes:', error)
                alert('Erro ao carregar fretes disponíveis')
            } finally {
                setLoading(false)
            }
        }

        carregarFretes()
    }, [filtros])

    const handleInteresse = async (freteId) => {
        try {
            const response = await api.post(`/fretes/${freteId}/interesse`)
            alert('Frete reservado com sucesso!')
            // Atualizar lista removendo o frete reservado
            setFretes(fretes.filter(frete => frete.id !== freteId))
        } catch (error) {
            console.error('Erro ao reservar frete:', error)
            alert(error.response?.data?.message || 'Erro ao reservar frete')
        }
    }

    const formatarData = (dataString) => {
        if (!dataString) return 'A combinar'
        const options = { day: '2-digit', month: '2-digit', year: 'numeric' }
        return new Date(dataString).toLocaleDateString('pt-BR', options)
    }

    const formatarMoeda = (valor) => {
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(valor)
    }

    return (
        <div className="container mx-auto p-4">
            <div className="bg-white rounded-lg shadow-md p-6">
                <h1 className="text-2xl font-bold mb-6 text-gray-800">Fretes Disponíveis</h1>

                {/* Filtros */}
                <div className="bg-gray-50 p-4 rounded-lg mb-6">
                    <h2 className="text-lg font-semibold mb-3 text-gray-700">Filtrar Fretes</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Tipo de Veículo</label>
                            <select
                                value={filtros.tipoVeiculo}
                                onChange={(e) => setFiltros({ ...filtros, tipoVeiculo: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Todos</option>
                                <option value="Bitrem">Bitrem</option>
                                <option value="Rodotrem">Rodotrem</option>
                                <option value="Ls">Ls</option>
                                <option value={"Bicaçamba"}>Bicaçamba</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Origem</label>
                            <input
                                type="text"
                                placeholder="Cidade/Estado"
                                value={filtros.origem}
                                onChange={(e) => setFiltros({ ...filtros, origem: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Destino</label>
                            <input
                                type="text"
                                placeholder="Cidade/Estado"
                                value={filtros.destino}
                                onChange={(e) => setFiltros({ ...filtros, destino: e.target.value })}
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>
                    </div>
                </div>

                {/* Lista de Fretes */}
                {loading ? (
                    <div className="text-center py-8">
                        <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                        <p className="mt-2 text-gray-600">Carregando fretes...</p>
                    </div>
                ) : fretes.length === 0 ? (
                    <div className="text-center py-8 bg-gray-50 rounded-lg">
                        <p className="text-gray-600">Nenhum frete disponível com os filtros selecionados</p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {fretes.map((frete) => (
                            <div key={frete.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="font-bold text-lg text-blue-600">
                                            {frete.origemCidade}/{frete.origemEstado} → {frete.destinoCidade}/{frete.destinoEstado}
                                        </h3>
                                        <p className="text-gray-600 mt-1">{frete.cargaDescricao}</p>
                                    </div>
                                    <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                                        {formatarMoeda(frete.valor)}
                                    </span>
                                </div>

                                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                                    <div>
                                        <p className="text-gray-500">Veículo Requerido</p>
                                        <p className="font-medium">{frete.veiculoRequerido}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Data de Coleta</p>
                                        <p className="font-medium">{formatarData(frete.dataColeta)}</p>
                                    </div>
                                    <div>
                                        <p className="text-gray-500">Contato</p>
                                        <p className="font-medium">{frete.clienteNome} ({frete.whatsappContato})</p>
                                    </div>
                                </div>

                                <div className="mt-4 pt-4 border-t border-gray-200">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-gray-500">Endereços</p>
                                            <p className="text-sm">
                                                <span className="font-medium">Origem:</span> {frete.origemEndereco || 'Não informado'}
                                            </p>
                                            <p className="text-sm">
                                                <span className="font-medium">Destino:</span> {frete.destinoEndereco || 'Não informado'}
                                            </p>
                                        </div>

                                        {user?.nivel === 'MOTORISTA' && (
                                            <button
                                                onClick={() => handleInteresse(frete.id)}
                                                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors"
                                            >
                                                Demonstrar Interesse
                                            </button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ListagemFretes