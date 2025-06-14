import { Link } from "react-router-dom"
import { useRef, useState } from "react"
import api from "../../services/api"

function Cadastro() {
    const nomeRef = useRef()
    const emailRef = useRef()
    const senhaRef = useRef()
    const telefoneRef = useRef()
    const cpfRef = useRef()
    const [nivel, setNivel] = useState('MOTORISTA')

    async function handleSubmit(event) {
        event.preventDefault()

        try {
            await api.post('/cadastro-usuario', {
                nome: nomeRef.current.value,
                email: emailRef.current.value,
                senha: senhaRef.current.value,
                telefone: telefoneRef.current.value,
                cpf: cpfRef.current.value,
                nivel: nivel
            })
            alert('Usuário cadastrado com sucesso!')
        } catch (err) {
            console.error('Erro ao cadastrar usuário:', err)
            alert(err.response?.data?.message || 'Erro ao cadastrar usuário!')
        }
    }

    return (
        <div className="max-w-md mx-auto mt-10 bg-slate-500 p-8 border border-slate-400 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Cadastro</h2>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <input ref={nomeRef} placeholder="Nome" type="text" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none hover:bg-slate-200" />
                <input ref={emailRef} placeholder="Email" type="email" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none hover:bg-slate-200" />
                <input ref={senhaRef} placeholder="Senha" type="password" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
                <input ref={telefoneRef} placeholder="Telefone" type="text" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
                <input ref={cpfRef} placeholder="CPF" type="text" required className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
                
                <div className="flex flex-col gap-2">
                    <label className="text-gray-800">Nível de Acesso:</label>
                    <select 
                        value={nivel}
                        onChange={(e) => setNivel(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none"
                    >
                        <option value="MOTORISTA">Motorista</option>
                       
                    </select>
                </div>
                
                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-400 font-bold">Cadastre-se</button>
            </form>
            <Link to="/" className="text-gray-900 hover:underline mt-4 block text-center">Já tem uma conta? Faça login</Link>
        </div>
    )
}

export default Cadastro