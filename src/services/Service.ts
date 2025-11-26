import axios from "axios";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})

export const cadastrarUsuario = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados);
    setDados(resposta.data);
}

//Função para Logar
export const login = async (url: string, dados: Object, setDados: Function) => {
    const resposta = await api.post(url, dados);
    setDados(resposta.data);
}

//Função para Consultar com Token 
export const buscar = async (url: string, setDados: Function, header: Object) => { 
    const resposta = await api.get(url, header);
    setDados(resposta.data);
}

//Função para Cadastrar com Token
export const cadastrar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.post(url, dados, header);
    setDados(resposta.data);
}

//Função para Atualizar com Token
export const atualizar = async (url: string, dados: Object, setDados: Function, header: Object) => {
    const resposta = await api.put(url, dados, header);
    setDados(resposta.data);
}

//Função para Deletar com Token
export const deletar = async (url: string, header: Object) => {
    await api.delete(url, header);
}

