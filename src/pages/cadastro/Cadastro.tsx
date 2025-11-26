import { useEffect, useState, type ChangeEvent, type FormEvent } from "react";
import type Usuario from "../../models/Usuario";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { cadastrarUsuario } from "../../services/Service";

export default function Cadastro() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [confirmarSenha, setConfirmarSenha] = useState<string>("");
    const [usuario, setUsuario] = useState<Usuario>({
        id: 0,
        nome: "",
        usuario: "",
        senha: "",
        foto: ""
    })

    useEffect(() => {
        if(usuario.id !== 0){
            retornar();
        }
    }, [usuario])

    function retornar(){
        navigate("/");
    }

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>){
        setUsuario({
            ...usuario,
            [e.target.name]: e.target.value
        })
    }

    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>){
        setConfirmarSenha(e.target.value);
    }

    async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        setIsLoading(true);

        if(confirmarSenha === usuario.senha && usuario.senha.length >= 8){
            try{
                await cadastrarUsuario(`/usuarios/cadastrar`, usuario, setUsuario);
                alert('Usuário cadastrado com sucesso!');
            }catch(error){
                alert('Erro ao cadastrar o usuário!');
            }
        }else{
            alert("Dados do usuário inconsistentes! Verifique as informações do cadastro.");
            setUsuario({
                ...usuario,
                senha: ''
            });
            setConfirmarSenha('');
        }

        setIsLoading(false);
    }

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
                <div
                    className="bg-[url('https://i.imgur.com/QMPrNDP.jpg')] lg:block hidden bg-no-repeat 
                              w-full min-h-screen bg-cover bg-center"
                ></div>

                <div className="flex justify-center items-center bg-gradient-to-br from-[#ffcaec] via-[#fef08a] to-[#ff9fda] w-full h-full p-8">
                    <form className="flex justify-center items-center flex-col w-full max-w-md gap-4 
                                   bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-2xl"
                        onSubmit={cadastrarNovoUsuario}
                    >
                        <h2 className="text-transparent bg-clip-text bg-gradient-to-r 
                                     from-(--persian-rose-600) to-(--yellow-600) 
                                     text-5xl mb-4">
                            ✨ Cadastrar
                        </h2>

                        <div className="flex flex-col w-full">
                            <label htmlFor="nome" className="text-(--persian-rose-800) font-semibold">
                                👤 Nome
                            </label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                placeholder="Digite seu nome"
                                className="border-2 border-(--persian-rose-300) rounded-xl p-3
                                         focus:border-(--persian-rose-500) focus:outline-none
                                         transition-all duration-300"
                                value={usuario.nome}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                        </div>

                        <div className="flex flex-col w-full">
                            <label htmlFor="usuario" className="text-(--persian-rose-800) font-semibold">
                                📧 Usuário
                            </label>
                            <input
                                type="text"
                                id="usuario"
                                name="usuario"
                                placeholder="Digite seu usuário"
                                className="border-2 border-(--persian-rose-300) rounded-xl p-3
                                         focus:border-(--persian-rose-500) focus:outline-none
                                         transition-all duration-300"
                                value={usuario.usuario}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                        </div>

                        <div className="flex flex-col w-full">
                            <label htmlFor="foto" className="text-(--persian-rose-800) font-semibold">
                                📸 Foto (URL)
                            </label>
                            <input
                                type="text"
                                id="foto"
                                name="foto"
                                placeholder="URL da sua foto"
                                className="border-2 border-(--persian-rose-300) rounded-xl p-3
                                         focus:border-(--persian-rose-500) focus:outline-none
                                         transition-all duration-300"
                                value={usuario.foto}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                        </div>

                        <div className="flex flex-col w-full">
                            <label htmlFor="senha" className="text-(--persian-rose-800) font-semibold">
                                🔒 Senha
                            </label>
                            <input
                                type="password"
                                id="senha"
                                name="senha"
                                placeholder="Mínimo 8 caracteres"
                                className="border-2 border-(--persian-rose-300) rounded-xl p-3
                                         focus:border-(--persian-rose-500) focus:outline-none
                                         transition-all duration-300"
                                value={usuario.senha}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                        </div>

                        <div className="flex flex-col w-full">
                            <label htmlFor="confirmarSenha" className="text-(--persian-rose-800) font-semibold">
                                🔑 Confirmar Senha
                            </label>
                            <input
                                type="password"
                                id="confirmarSenha"
                                name="confirmarSenha"
                                placeholder="Confirme sua senha"
                                className="border-2 border-(--persian-rose-300) rounded-xl p-3
                                         focus:border-(--persian-rose-500) focus:outline-none
                                         transition-all duration-300"
                                value={confirmarSenha}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
                            />
                        </div>

                        <div className="flex justify-around w-full gap-4 mt-4">
                            <button
                                type="reset"
                                className="rounded-xl text-white bg-gradient-to-r from-gray-400 
                                         to-gray-500 hover:from-gray-500 hover:to-gray-600 
                                         w-1/2 py-3 font-bold transition-all duration-300"
                                onClick={retornar}
                            >
                                ❌ Cancelar
                            </button>
                            <button
                                type="submit"
                                className="rounded-xl text-white bg-gradient-to-r 
                                         from-(--persian-rose-500) to-(--persian-rose-600) 
                                         hover:from-(--persian-rose-600) 
                                         hover:to-(--persian-rose-700) w-1/2 py-3 
                                         font-bold flex justify-center transition-all duration-300"
                            >
                                {isLoading ? (
                                    <ClipLoader color="#ffffff" size={24} />
                                ) : (
                                    <span>🚀 Cadastrar</span>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}