import { Link, useNavigate } from "react-router-dom"
import { useRef } from "react"
import { useAuth } from "../../AuthContext/AuthContext.jsx"

function Login() {
  const emailRef = useRef()
  const senhaRef = useRef()
  const navigate = useNavigate()
  const { login } = useAuth()

  async function handleSubmit(event) {
    event.preventDefault()

    const email = emailRef.current.value
    const senha = senhaRef.current.value

    if (!email || !senha) {
      alert("Por favor, preencha todos os campos.")
      return
    }

    try {
      await login(email, senha)
      navigate("/logistica")
    } catch (err) {
      console.error("Erro ao fazer login:", err)
      alert(err.response?.data?.message || "Usuário ou senha inválidos!")
    }
  }

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-8 border border-gray-200 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
          <input
            id="email"
            ref={emailRef}
            type="email"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <div>
          <label htmlFor="senha" className="block text-sm font-medium text-gray-700 mb-1">Senha</label>
          <input
            id="senha"
            ref={senhaRef}
            type="password"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        
        <button 
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium transition-colors"
        >
          Entrar
        </button>
      </form>
      
      <div className="mt-4 text-center">
        <Link 
          to="/cadastro-usuario" 
          className="text-blue-600 hover:text-blue-800 hover:underline font-medium"
        >
          Não tem uma conta? Cadastre-se
        </Link>
      </div>
    </div>
  )
}

export default Login
