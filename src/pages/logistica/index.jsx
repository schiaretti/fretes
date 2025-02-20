import React, { useRef, useState, useEffect } from "react";
import api from "../../services/api";
import Trash from '../../assets/lixo.svg'


function Logistica() {
  const usuarioRef = useRef();
  const clienteRef = useRef();
  const cidorigemRef = useRef();
  const ciddestinoRef = useRef();
  const freteempRef = useRef();
  const fretemotRef = useRef();
  const produtoRef = useRef();
  const veiculoRef = useRef();
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
        await api.post("/cadastro-fretes", {
            usuario: usuarioRef.current.value,
            cliente: clienteRef.current.value,
            cidorigem: cidorigemRef.current.value,
            ciddestino: ciddestinoRef.current.value,
            freteemp: freteempRef.current.value,
            fretemot: fretemotRef.current.value,
            produto: produtoRef.current.value,
            veiculo: veiculoRef.current.value,
        });

        console.log("Frete cadastrado com sucesso!");

        // Limpar campos
        [
            usuarioRef,
            clienteRef,
            cidorigemRef,
            ciddestinoRef,
            freteempRef,
            fretemotRef,
            produtoRef,
            veiculoRef,
        ].forEach((ref) => (ref.current.value = ""));

        // Atualiza a lista de fretes após cadastrar
        getFretes();
    } catch (err) {
        console.error("Erro ao cadastrar frete:", err);
    } finally {
        setIsSubmitting(false);
    }
}

const [fretes, setFretes] = useState([]);

async function getFretes() {
    try {
        const response = await api.get('/listar-fretes');
        console.log('Resposta completa da API:', response.data);

        setFretes(response.data.fretes); // Atualiza a lista
    } catch (error) {
        console.error('Erro ao buscar fretes:', error);
    }
}

// Busca os fretes ao carregar a página
useEffect(() => {
    getFretes();
}, []);

async function deleteFretes(id) {
    try {
        const confirmDelete = window.confirm("Tem certeza que deseja excluir este frete?");
        if (confirmDelete) {
            await api.delete(`/logistica/${id}`);
            console.log("Frete excluído com sucesso!");

            // Atualiza a lista após exclusão
            getFretes();
        } else {
            console.log("Exclusão cancelada pelo usuário.");
        }
    } catch (error) {
        console.error("Erro ao deletar logística!", error);
    }
}

const usuarioLogado = localStorage.getItem(""); // Armazenado no localStorage após o login



  return (

    <div className="flex flex-col max-w-2xl mx-auto mt-5 bg-white p-8 border border-gray-200 rounded-md shadow-lg items-center">

      <h2 className="flex flex-col max-w-2xl mx-auto font-bold text-center border border-gray-200 bg-slate-200 p-8 text-2xl rounded-md shadow-lg">
        Cadastro de Fretes
      </h2>

      <form
        className="max-w-2xl flex flex-col gap-6 mt-6 p-6 border rounded-lg bg-white shadow-lg"
        onSubmit={handleSubmit}
      >
        <section>
          <h3 className="text-lg font-semibold text-slate-700 mb-2">Dados do Usuário</h3>
          <input
            ref={usuarioRef}
            placeholder="Usuário"
            type="text"
            className="rounded-md px-3 py-2 border border-slate-300 focus:outline-none"
            aria-label="Usuário"
            required
          />
          <input
            ref={clienteRef}
            placeholder="Cliente"
            type="text"
            className="rounded-md px-3 py-2 border border-slate-300 focus:outline-none"
            aria-label="Cliente"
            required
          />
        </section>

        <section>
          <h3 className="text-lg font-semibold text-slate-700 mb-2">Dados de Logística</h3>
          <input
            ref={cidorigemRef}
            placeholder="Cidade de Origem"
            type="text"
            className="rounded-md px-3 py-2 border border-slate-300 focus:outline-none "
            aria-label="Cidade de Origem"
            required
          />
          <input
            ref={ciddestinoRef}
            placeholder="Cidade de Destino"
            type="text"
            className="rounded-md px-3 py-2 border border-slate-300 focus:outline-none "
            aria-label="Cidade de Destino"
            required
          />
        </section>

        <section>
          <h3 className="text-lg font-semibold text-slate-700 mb-2">Frete</h3>
          <input
            ref={freteempRef}
            placeholder="Frete Empresa"
            type="text"
            className="rounded-md px-3 py-2 border border-slate-300 focus:outline-none "
            aria-label="Frete Empresa"
          />
          <input
            ref={fretemotRef}
            placeholder="Frete Motorista"
            type="text"
            className="rounded-md px-3 py-2 border border-slate-300 focus:outline-none "
            aria-label="Frete Motorista"
          />
        </section>

        <section>
          <h3 className="text-lg font-semibold text-slate-700 mb-2">Informações Adicionais</h3>
          <input
            ref={produtoRef}
            placeholder="Produto"
            type="text"
            className="rounded-md px-3 py-2 border border-slate-300 focus:outline-none "
            aria-label="Produto"
          />
          <input
            ref={veiculoRef}
            placeholder="Veículo"
            type="text"
            className="rounded-md px-3 py-2 border border-slate-300 focus:outline-none "
            aria-label="Veículo"
          />
        </section>

        <button
          type="submit"
          className={`w-full py-3 rounded-md font-medium text-white bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:ring-sky-300 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""
            }`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Salvando..." : "Salvar"}
        </button>
      </form>

      {fretes && fretes.length > 0 && fretes.map((frete) => {

        return (

          <div key={frete.id} className="flex flex-col max-w-2xl mx-auto mt-5 bg-gray-100 p-8 border border-gray-200 rounded-md shadow-lg items-center">
            <h2 className="text-2xl text-center font-bold mb-6 text-gray-950">Lista de Fretes</h2>
            <div>
              <ul className="space-y-2">
                <li>
                  <p className="font-semibold ">Usuário: <span className="font-serif">{frete.usuario}</span></p>
                  <p className="font-semibold ">Cliente: <span className="font-serif">{frete.cliente}</span></p>
                  <p className="font-semibold ">Origem: <span className="font-serif">{frete.cidorigem}</span></p>
                  <p className="font-semibold ">Destino: <span className="font-serif">{frete.ciddestino}</span></p>
                  <p className="font-semibold ">Frete Empresa: <span className="font-serif">{frete.freteemp}</span></p>
                  <p className="font-semibold ">Frete Motorista: <span className="font-serif">{frete.fretemot}</span></p>
                  <p className="font-semibold ">Produto: <span className="font-serif">{frete.produto}</span></p>
                  <p className="font-semibold ">Veículo: <span className="font-serif">{frete.veiculo}</span></p>
                </li>
              </ul>
            </div>

          
              <button
                key={frete.id} // O key deve estar no elemento raiz da iteração
                className="flex justify-center gap-2 border-none cursor-pointer mt-5 items-center "
                onClick={() => deleteFretes(frete.id)}
              >
                <img src={Trash} alt="Excluir"/> 
              </button>
          </div>
        );
      })}


    </div>
  );
}

export default Logistica;
