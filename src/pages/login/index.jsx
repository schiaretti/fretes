import { Link, useNavigate } from "react-router-dom"
import { useRef } from "react"
import api from "../../services/api"

function Login() {


    const emailRef = useRef()
    const senhaRef = useRef()
    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()

        

        console.log(emailRef.current.value); // Acessa o valor do input
        console.log(senhaRef.current.value); // Acessa o valor do input

        if (!emailRef.current.value || !senhaRef.current.value) {
            alert('Por favor, preencha todos os campos.');
            return;
        }

        try {

            const {data:token} =
            await api.post('/login', {
                email: emailRef.current.value,
                senha: senhaRef.current.value
            })

            localStorage.setItem('token', token)

            navigate('/logistica')

        } catch (err) {
            alert = ('Usuário ou senha inválidos!')
        }

    }

    return (
        <div className="max-w-md mx-auto mt-10 bg-slate-500 p-8 border border-slate-400 rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">Login</h2>
            <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
               
                <input ref={emailRef} placeholder="Email" type="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none hover:bg-slate-200" />
                <input ref={senhaRef} placeholder="Senha" type="password" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none" />
                <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-md  hover:bg-blue-400 font-bold">Login</button>
            </form>
            <Link to="/cadastro-usuario" className="text-gray-900 hover:underline mt-4 block text-center">Não tem uma conta?Cadastre-se</Link>
        </div>
    )
}
export default Login