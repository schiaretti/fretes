
// src/pages/veiculos/CadastroVeiculo.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../../services/api'
import { useAuth } from '../../AuthContext/AuthContext.jsx'

const CadastroVeiculo = () => {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [erro, setErro] = useState('')
  const [sucesso, setSucesso] = useState('')

  const [veiculo, setVeiculo] = useState({
    tipo: '',
    placa: '',
    marca: '',
    modelo: '',
    ano: '',
    capacidade: ''
  })

  const tiposVeiculos = [
    'Bitrem',
    'Rodotrem',
    'Ls',
    'Bicaçamba'
  ]
  

  const handleChange = (e) => {
    const { name, value } = e.target
    setVeiculo(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const validarPlaca = (placa) => {
    const regexPlaca = /^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/i
    return regexPlaca.test(placa)
  }

  const validarAno = (ano) => {
    const anoAtual = new Date().getFullYear()
    return ano >= 1950 && ano <= anoAtual + 1
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErro('')
    setSucesso('')

    // Validações
    if (!veiculo.tipo) {
      setErro('Selecione o tipo do veículo')
      return
    }

    if (!validarPlaca(veiculo.placa)) {
      setErro('Placa inválida. Use o formato ABC1D23 ou ABC1234')
      return
    }

    if (!veiculo.marca || veiculo.marca.length < 2) {
      setErro('Informe a marca do veículo')
      return
    }

    if (!veiculo.modelo || veiculo.modelo.length < 2) {
      setErro('Informe o modelo do veículo')
      return
    }

    if (!veiculo.ano || !validarAno(Number(veiculo.ano))) {
      setErro('Ano inválido. Deve estar entre 1950 e o ano atual + 1')
      return
    }

    if (!veiculo.capacidade || Number(veiculo.capacidade) <= 0) {
      setErro('Informe a capacidade em toneladas')
      return
    }

    try {
      setLoading(true)
      console.log('Enviando dados:', { // DEBUG
        ...veiculo,
        ano: Number(veiculo.ano),
        capacidade: Number(veiculo.capacidade),
        motoristaId: user.id
      })

      const response = await api.post('/veiculos', {
        ...veiculo,
        ano: Number(veiculo.ano),
        capacidade: Number(veiculo.capacidade)
      })

      console.log('Resposta da API:', response.data) // DEBUG

      setSucesso('Veículo cadastrado com sucesso!')
      setVeiculo({
        tipo: '',
        placa: '',
        marca: '',
        modelo: '',
        ano: '',
        capacidade: ''
      })

      setTimeout(() => {
        navigate('/meus-veiculos')
      }, 2000)

    } catch (error) {
      console.error('Erro detalhado:', { // DEBUG COMPLETO
        message: error.message,
        response: error.response?.data,
        status: error.response?.status,
        headers: error.response?.headers,
        request: error.request,
        config: error.config
      })

      // Tratamento específico de erros
      if (error.response?.data?.code === 'P2002') {
        setErro('Esta placa já está cadastrada no sistema!')
        return
      }

      if (error.response?.status === 400) {
        setErro(`Dados inválidos: ${error.response.data?.message || 'Verifique os campos'}`)
        return
      }

      if (error.response?.status === 401) {
        setErro('Sessão expirada. Faça login novamente.')
        return
      }

      if (!error.response) {
        setErro('Erro de conexão com o servidor')
        return
      }

      setErro(error.response.data?.message || 'Erro ao cadastrar veículo')
    } finally {
      setLoading(false)
    }
  }


  return (
    <div className="container mx-auto p-4">
      <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Cadastrar Veículo</h1>
          <button 
            onClick={() => navigate(-1)}
            className="text-gray-600 hover:text-gray-800"
          >
            <i className="fas fa-arrow-left mr-1"></i> Voltar
          </button>
        </div>

        {erro && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {erro}
          </div>
        )}

        {sucesso && (
          <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
            {sucesso}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">
              Tipo do Veículo <span className="text-red-500">*</span>
            </label>
            <select
              id="tipo"
              name="tipo"
              value={veiculo.tipo}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            >
              <option value="">Selecione um tipo</option>
              {tiposVeiculos.map(tipo => (
                <option key={tipo} value={tipo}>{tipo}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="placa" className="block text-sm font-medium text-gray-700 mb-1">
                Placa <span className="text-red-500">*</span>
              </label>
              <input
                id="placa"
                name="placa"
                type="text"
                value={veiculo.placa}
                onChange={handleChange}
                placeholder="ABC1D23 ou ABC1234"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 uppercase"
                maxLength={7}
                required
              />
            </div>

            <div>
              <label htmlFor="ano" className="block text-sm font-medium text-gray-700 mb-1">
                Ano <span className="text-red-500">*</span>
              </label>
              <input
                id="ano"
                name="ano"
                type="number"
                value={veiculo.ano}
                onChange={handleChange}
                min="1950"
                max={new Date().getFullYear() + 1}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="marca" className="block text-sm font-medium text-gray-700 mb-1">
                Marca <span className="text-red-500">*</span>
              </label>
              <input
                id="marca"
                name="marca"
                type="text"
                value={veiculo.marca}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="modelo" className="block text-sm font-medium text-gray-700 mb-1">
                Modelo <span className="text-red-500">*</span>
              </label>
              <input
                id="modelo"
                name="modelo"
                type="text"
                value={veiculo.modelo}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label htmlFor="capacidade" className="block text-sm font-medium text-gray-700 mb-1">
              Capacidade (toneladas) <span className="text-red-500">*</span>
            </label>
            <input
              id="capacidade"
              name="capacidade"
              type="number"
              step="0.01"
              min="0.1"
              value={veiculo.capacidade}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="pt-4">
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {loading ? (
                <>
                  <i className="fas fa-spinner fa-spin mr-2"></i> Cadastrando...
                </>
              ) : (
                'Cadastrar Veículo'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default CadastroVeiculo