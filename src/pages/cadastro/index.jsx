import { Link } from "react-router-dom"
import { useRef } from "react"
import api from "../../services/api"

function Cadastro() {

    const nomeRef = useRef()
    const emailRef = useRef()
    const senhaRef = useRef()


    async function handleSubmit(event) {
        event.preventDefault()

        try {
            await api.post('/cadastro', {
                nome: nomeRef.current.value,
                email: emailRef.current.value,
                senha: senhaRef.current.value
            })
            alert('Usuário cadastrado com sucesso!')
        } catch (err) {
            alert('Erro ao cadastrar usuário!')
        }
  
    }

    return (
        <div className="max-w-md mx-auto mt-10 bg-slate-500 p-8 border border-slate-400 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Cadastro</h2>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <input ref={nomeRef} placeholder="Nome" type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none hover:bg-slate-200" />
                <input ref={emailRef} placeholder="Email" type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none hover:bg-slate-200" />
                <input ref={senhaRef} placeholder="Senha" type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md  hover:bg-blue-400 font-bold">Cadastre-se</button>
            </form>
            <Link to="/" className="text-gray-900 hover:underline mt-4 block text-center">Já tem uma conta?Faça login</Link>
        </div>
    )
}
export default Cadastro