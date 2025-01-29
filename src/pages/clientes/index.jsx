import { useRef } from "react"
import api from "../../services/api"

function CadastroClientes() {

    const nomeRef = useRef()
    const emailRef = useRef()
    const cnpjRef = useRef()
    const celularRef = useRef()
    const contatoRef = useRef()


    async function handleSubmit(event) {
        event.preventDefault()

        try {
            await api.post('/cadastroClientes', {
                nome: nomeRef.current.value,
                email: emailRef.current.value,
                cnpj: cnpjRef.current.value,
                celular: celularRef.current.value,
                contato: contatoRef.current.value
            })
            alert:('Cliente cadastrado com sucesso!')
        } catch (err) {
            alert:('Erro ao cadastrar cliente!')
        }
  
    }

    return (
        <div className="max-w-md mx-auto mt-10 bg-slate-500 p-8 border border-slate-400 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Cadastro de clientes</h2>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                <input ref={nomeRef} placeholder="Nome" type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none hover:bg-slate-200" />
                <input ref={emailRef} placeholder="Email" type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none hover:bg-slate-200" />
                <input ref={cnpjRef} placeholder="Cnpj" type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
                <input ref={celularRef} placeholder="Celular" type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none hover:bg-slate-200" />
                <input ref={contatoRef} placeholder="Contato" type="text" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none hover:bg-slate-200" />
                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md  hover:bg-blue-400 font-bold">Cadastar</button>
                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md  hover:bg-blue-400 font-bold">Editar</button>
                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md  hover:bg-blue-400 font-bold">Excluir</button>
            </form>
           
        </div>
    )
}
export default CadastroClientes