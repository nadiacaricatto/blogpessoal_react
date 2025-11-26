import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { Link, useNavigate } from "react-router-dom"
import type UsuarioLogin from "../../models/UsuarioLogin"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../../contexts/AuthContext"

function Login() {
    const navigate = useNavigate()
    const [usuarioLogin, setUsuarioLogin] = useState<UsuarioLogin>({} as UsuarioLogin)
    const { usuario, handleLogin, isLoading } = useContext(AuthContext)

    useEffect(() => {
        if (usuario.token !== ""){
            navigate('/home')
        }
    }, [usuario])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUsuarioLogin({
            ...usuarioLogin,
            [e.target.name]: e.target.value,
        })
    }

    function login(e: FormEvent<HTMLFormElement>){
        e.preventDefault();
        handleLogin(usuarioLogin);
    }

    return (
        <>
            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
                {/* Formulário com fundo gradiente mais quente */}
                <div className="flex justify-center items-center bg-gradient-to-br from-[#ffcaec] via-[#fef08a] to-[#ff9fda] p-8">
                    <form className="flex justify-center items-center flex-col w-full max-w-md gap-6 
                                   bg-white/80 backdrop-blur-sm p-10 rounded-3xl shadow-2xl"
                        onSubmit={login}
                    >
                        <h2 className="text-transparent bg-clip-text bg-gradient-to-r from-[#ef1381] to-[#ca8a04] text-5xl mb-4 font-extrabold">
                            💫 Entrar
                        </h2>

                        <div className="flex flex-col w-full">
                            <label htmlFor="usuario" className="text-[#ac0853] font-bold mb-2">
                                👤 Usuário
                            </label>
                            <input
                                type="text"
                                id="usuario"
                                name="usuario"
                                placeholder="Digite seu usuário"
                                className="border-2 border-[#ff9fda] rounded-xl p-3
                                         focus:border-[#fe36a4] focus:outline-none
                                         transition-all duration-300 bg-white"
                                value={usuarioLogin.usuario}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                        </div>

                        <div className="flex flex-col w-full">
                            <label htmlFor="senha" className="text-[#ac0853] font-bold mb-2">
                                🔒 Senha
                            </label>
                            <input
                                type="password"
                                id="senha"
                                name="senha"
                                placeholder="Digite sua senha"
                                className="border-2 border-[#ff9fda] rounded-xl p-3
                                         focus:border-[#fe36a4] focus:outline-none
                                         transition-all duration-300 bg-white"
                                value={usuarioLogin.senha}
                                onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                            />
                        </div>

                        <button
                            type="submit"
                            className="rounded-xl bg-gradient-to-r from-[#ff64c0] to-[#ef1381] 
                                     hover:from-[#fe36a4] hover:to-[#d00665] text-white 
                                     w-full py-3 font-bold flex justify-center transition-all duration-300 
                                     shadow-lg hover:shadow-xl hover:scale-[1.02]"
                        >
                            {isLoading ? (
                                <ClipLoader color="#ffffff" size={24} />
                            ) : (
                                <span>✨ Entrar</span>
                            )}
                        </button>

                        <hr className="border-[#ff9fda] w-full my-2" />

                        <p className="text-gray-700 text-center">
                            Ainda não tem uma conta?{" "}
                            <Link to="/cadastro" 
                                className="text-[#ef1381] hover:text-[#ac0853] 
                                         font-bold hover:underline transition-all">
                                Cadastre-se aqui! 🚀
                            </Link>
                        </p>
                    </form>
                </div>

                {/* Imagem lateral */}
                <div
                    className="bg-[url('https://i.imgur.com/yo9m2Xd.jpg')] lg:block hidden bg-no-repeat 
                              w-full h-full bg-cover bg-center"
                ></div>
            </div>
        </>
    )
}

export default Login