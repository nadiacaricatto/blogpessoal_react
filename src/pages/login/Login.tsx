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
            <div className="grid grid-cols-1 lg:grid-cols-2 h-screen place-items-center font-bold">
                <form className="flex justify-center items-center flex-col w-full max-w-md gap-6 p-8"
                    onSubmit={login}
                >
                    <h2 className="text-transparent bg-clip-text bg-linear-to-r 
                                 from-(--persian-rose-600) to-(--yellow-600) 
                                 text-5xl mb-4">
                        💫 Entrar
                    </h2>

                    <div className="flex flex-col w-full">
                        <label htmlFor="usuario" className="text-(--persian-rose-800) font-semibold">
                            👤 Usuário
                        </label>
                        <input
                            type="text"
                            id="usuario"
                            name="usuario"
                            placeholder="Digite seu usuário"
                            className="border-2 border-(--persian-rose-300) rounded-xl p-3
                                     focus:border-(--persian-rose-500) focus:outline-none
                                     transition-all duration-300"
                            value={usuarioLogin.usuario}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>

                    <div className="flex flex-col w-full">
                        <label htmlFor="senha" className="text-(--persian-rose-800)-semibold">
                            🔒 Senha
                        </label>
                        <input
                            type="password"
                            id="senha"
                            name="senha"
                            placeholder="Digite sua senha"
                            className="border-2 border-(--persian-rose-300) rounded-xl p-3
                                     focus:border-(--persian-rose-500) focus:outline-none
                                     transition-all duration-300"
                            value={usuarioLogin.senha}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                        />
                    </div>

                    <button
                        type="submit"
                        className="rounded-xl bg-linear-to-r from-(--persian-rose-500) 
                                 to-(--persian-rose-600) hover:from-(--persian-rose-600) 
                                 hover:to-(--persian-rose-700)-white w-full py-3 
                                 font-bold flex justify-center transition-all duration-300 
                                 shadow-lg hover:shadow-xl hover:scale-[1.02]"
                    >
                        {isLoading ? (
                            <ClipLoader color="#ffffff" size={24} />
                        ) : (
                            <span>✨ Entrar</span>
                        )}
                    </button>

                    <hr className="border-(--persian-rose-300) w-full" />

                    <p className="text-gray-700">
                        Ainda não tem uma conta?{" "}
                        <Link to="/cadastro" 
                            className="text-(--persian-rose-600) hover:text-(--persian-rose-800) 
                                     font-bold hover:underline transition-all">
                            Cadastre-se aqui! 🚀
                        </Link>
                    </p>
                </form>

                <div
                    className="bg-[url('https://i.imgur.com/ZZFAmzo.jpg')] lg:block hidden bg-no-repeat 
                              w-full min-h-screen bg-cover bg-center"
                ></div>
            </div>
        </>
    )
}

export default Login