import { type ChangeEvent, type FormEvent, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../../contexts/AuthContext"
import type Usuario from "../../models/Usuario"
import { atualizar, buscar } from "../../services/Service"
import { ToastAlerta } from "../../utils/ToastAlerta"

function AtualizarPerfil() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [user, setUser] = useState<Usuario>({} as Usuario)
    const [confirmarSenha, setConfirmarSenha] = useState<string>("")
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token
    const id: string = usuario.id.toString()

    async function buscarUsuarioPorId() {
        try {
            await buscar(`/usuarios/${id}`, setUser, {
                headers: {
                    Authorization: token,
                },
            })
            setUser((prev) => ({ ...prev, senha: "" }))
            setConfirmarSenha("")
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout()
            } else {
                ToastAlerta("Usuário não encontrado!", "erro")
                retornar()
            }
        }
    }

    useEffect(() => {
        if (token === "") {
            ToastAlerta("Você precisa estar logado!", "info")
            navigate("/")
        }
    }, [token])

    useEffect(() => {
        setUser({} as Usuario)
        setConfirmarSenha("")
        setIsLoading(false)
    }, [])

    useEffect(() => {
        if (id !== undefined) {
            buscarUsuarioPorId()
        }
    }, [id])

    function retornar() {
        navigate("/perfil")
    }

    function sucesso() {
        handleLogout()
    }

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setUser({
            ...user,
            [e.target.name]: e.target.value,
        })
    }

    function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
        setConfirmarSenha(e.target.value)
    }

    async function atualizarUsuario(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (confirmarSenha === user.senha && user.senha.length >= 8) {
            try {
                await atualizar(`/usuarios/atualizar`, user, setUser, {
                    headers: {
                        Authorization: token,
                    },
                })
                ToastAlerta("Usuário atualizado! Efetue o Login Novamente!", "sucesso")
                sucesso()
            } catch (error: any) {
                if (error.toString().includes("401")) {
                    handleLogout()
                } else {
                    ToastAlerta("Erro ao atualizar o usuário!", "erro")
                    retornar()
                }
            }
        } else {
            ToastAlerta("Dados inconsistentes. Verifique as informações do usuário.", "erro")
            setUser({ ...user, senha: "" })
            setConfirmarSenha("")
        }
        setIsLoading(false)
    }

    return (
        <div className="min-h-screen bg-linear-to-br from-(--persian-rose-50) 
                       to-(--yellow-100) py-12 px-4">
            <div className="container mx-auto max-w-7xl">
                <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_2fr]">
                        
                        {/* Seção da foto */}
                        <div className="bg-linear-to-br from-(--persian-rose-400) 
                                      via-(--persian-rose-500) to-(--yellow-500) 
                                      p-8 flex flex-col items-center justify-center">
                            <div className="relative">
                                <img
                                    src={user.foto}
                                    alt={user.nome}
                                    className="w-48 h-48 object-cover rounded-full border-8 
                                             border-white shadow-2xl"
                                />
                                <div className="absolute bottom-4 right-4 w-8 h-8 bg-green-500 
                                              rounded-full border-4 border-white"></div>
                            </div>
                            <h2 className="text-white text-2xl font-bold mt-6 text-center">
                                {user.nome}
                            </h2>
                            <p className="text-white/90 text-base mt-2">{user.usuario}</p>
                        </div>

                        {/* Seção do formulário */}
                        <div className="p-8 lg:p-12">
                            <div className="mb-8">
                                <h1 className="text-4xl font-bold text-transparent bg-clip-text 
                                             bg-linear-to-r from-(--persian-rose-700) 
                                             to-(--yellow-700) mb-2">
                                    ✏️ Editar Perfil
                                </h1>
                                <p className="text-gray-600 text-lg">
                                    Atualize suas informações pessoais
                                </p>
                            </div>

                            <form onSubmit={atualizarUsuario} className="space-y-6">
                                <div className="space-y-2">
                                    <label htmlFor="nome" 
                                          className="block text-sm font-bold text-(--persian-rose-800)">
                                        👤 Nome Completo
                                    </label>
                                    <input
                                        type="text"
                                        id="nome"
                                        name="nome"
                                        placeholder="Digite seu nome completo"
                                        className="w-full px-4 py-3 border-2 border-(--persian-rose-300) 
                                                 rounded-xl focus:border-(--persian-rose-500) 
                                                 focus:outline-none transition-colors"
                                        value={user.nome || ""}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="usuario" 
                                          className="block text-sm font-bold text-(--persian-rose-800)">
                                        📧 E-mail
                                    </label>
                                    <input
                                        type="email"
                                        id="usuario"
                                        name="usuario"
                                        placeholder="seu@email.com"
                                        className="w-full px-4 py-3 border-2 border-gray-200 
                                                 rounded-xl bg-gray-50 cursor-not-allowed"
                                        disabled
                                        value={user.usuario || ""}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                    />
                                    <p className="text-xs text-gray-500">
                                        ⚠️ O e-mail não pode ser alterado
                                    </p>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="foto" 
                                          className="block text-sm font-bold text-(--persian-rose-800)">
                                        📸 URL da Foto de Perfil
                                    </label>
                                    <input
                                        type="url"
                                        id="foto"
                                        name="foto"
                                        placeholder="https://exemplo.com/foto.jpg"
                                        className="w-full px-4 py-3 border-2 border-(--persian-rose-300) 
                                                 rounded-xl focus:border-(--persian-rose-500) 
                                                 focus:outline-none transition-colors"
                                        value={user.foto || ""}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                        required
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="senha" 
                                          className="block text-sm font-bold text-(--persian-rose-800)">
                                        🔒 Nova Senha
                                    </label>
                                    <input
                                        type="password"
                                        id="senha"
                                        name="senha"
                                        placeholder="Mínimo 8 caracteres"
                                        className="w-full px-4 py-3 border-2 border-(--persian-rose-300) 
                                                 rounded-xl focus:border-(--persian-rose-500) 
                                                 focus:outline-none transition-colors"
                                        value={user.senha || ""}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                                        required
                                        minLength={8}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="confirmarSenha" 
                                          className="block text-sm font-bold text-(--persian-rose-800)">
                                        🔑 Confirmar Nova Senha
                                    </label>
                                    <input
                                        type="password"
                                        id="confirmarSenha"
                                        name="confirmarSenha"
                                        placeholder="Digite a senha novamente"
                                        className="w-full px-4 py-3 border-2 border-(--persian-rose-300) 
                                                 rounded-xl focus:border-(--persian-rose-500) 
                                                 focus:outline-none transition-colors"
                                        value={confirmarSenha}
                                        onChange={(e: ChangeEvent<HTMLInputElement>) => handleConfirmarSenha(e)}
                                        required
                                        minLength={8}
                                    />
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                    <button
                                        type="button"
                                        className="flex-1 px-6 py-3 bg-gray-200 text-gray-700 
                                                 font-bold rounded-xl hover:bg-gray-300 
                                                 transition-all duration-300"
                                        onClick={retornar}
                                    >
                                        ❌ Cancelar
                                    </button>
                                    <button
                                        type="submit"
                                        className="flex-1 px-6 py-3 bg-linear-to-r 
                                                 from-(--persian-rose-500) 
                                                 to-(--persian-rose-600) 
                                                 hover:from-(--persian-rose-600) 
                                                 hover:to-(--persian-rose-700) 
                                                 text-white font-bold rounded-xl shadow-lg 
                                                 hover:shadow-xl transition-all duration-300 
                                                 flex items-center justify-center gap-2
                                                 hover:scale-[1.02]"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            <ClipLoader color="#ffffff" size={24} />
                                        ) : (
                                            <span>💫 Atualizar Perfil</span>
                                        )}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AtualizarPerfil