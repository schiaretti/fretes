import React, { useRef, useState, useEffect } from "react";
import api from "../../services/api";
import Trash from "../../assets/lixo.svg";

function Logistica() {
  const refs = {
    usuario: useRef(),
    cliente: useRef(),
    cidorigem: useRef(),
    ciddestino: useRef(),
    tonsaida: useRef(),
    tonchegada: useRef(),
    motorista: useRef(),
    placa: useRef(),
    adiantamento: useRef(),
    saldo: useRef(),
  };
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [fretes, setFretes] = useState([]);

  useEffect(() => {
    getFretes();
  }, []);

  async function handleSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);

    try {
      const data = Object.fromEntries(
        Object.entries(refs).map(([key, ref]) => [key, ref.current.value])
      );
      
      await api.post("/cadastro-fretes", data);
      console.log("Frete cadastrado com sucesso!");

      Object.values(refs).forEach((ref) => (ref.current.value = ""));
      getFretes();
    } catch (err) {
      console.error("Erro ao cadastrar frete:", err);
    } finally {
      setIsSubmitting(false);
    }
  }

  async function getFretes() {
    try {
      const response = await api.get("/listar-fretes");
      setFretes(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Erro ao buscar fretes:", error);
      setFretes([]);
    }
  }

  async function deleteFretes(id) {
    if (window.confirm("Tem certeza que deseja excluir este frete?")) {
      try {
        await api.delete(`/logistica/${id}`);
        console.log("Frete excluído com sucesso!");
        getFretes();
      } catch (error) {
        console.error("Erro ao deletar logística!", error);
      }
    }
  }

  return (
    <div className="flex flex-col max-w-2xl mx-auto mt-5 bg-white p-8 border border-gray-200 rounded-md shadow-lg items-center">
      <h2 className="text-2xl font-bold text-center mb-4">Cadastro de Fretes</h2>
      
      <form className="w-full flex flex-col gap-6" onSubmit={handleSubmit}>
        {Object.keys(refs).map((key) => (
          <input
            key={key}
            ref={refs[key]}
            placeholder={key.replace(/([A-Z])/g, " $1").trim()}
            type="text"
            className="rounded-md px-3 py-2 border border-gray-300 focus:outline-none"
            required
          />
        ))}
        
        <button
          type="submit"
          className={`w-full py-3 rounded-md font-medium text-white bg-sky-500 hover:bg-sky-600 focus:ring-4 focus:ring-sky-300 ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Salvando..." : "Salvar"}
        </button>
      </form>

      {fretes.length > 0 && (
        <div className="mt-5 bg-gray-100 p-8 border border-gray-200 rounded-md shadow-lg w-full">
          <h2 className="text-2xl font-bold text-center mb-6">Lista de Fretes</h2>
          {fretes.map((frete) => (
            <div key={frete.id} className="mb-4 p-4 bg-white border rounded shadow">
              {Object.keys(frete).map((key) => (
                <p key={key} className="font-semibold">
                  {key}: <span className="font-serif">{frete[key]}</span>
                </p>
              ))}
              <button onClick={() => deleteFretes(frete.id)} className="mt-2 text-red-500 hover:text-red-700">
                <img src={Trash} alt="Deletar" className="w-5 h-5 inline" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Logistica;
