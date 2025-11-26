import { useContext, useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import { ToastAlerta } from "../../utils/ToastAlerta"

function Perfil() {
    const navigate = useNavigate()
    const { usuario } = useContext(AuthContext)

    useEffect(() => {
        if (usuario.token === "") {
            ToastAlerta("Você precisa estar logado", "info")
            navigate("/")
        }
    }, [usuario.token])

    return (
        <div className="min-h-screen bg-linear-to-br from-(--persian-rose-50) 
                       to-(--yellow-100) py-8 px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
                    
                    {/* Banner de Capa */}
                    <div className="relative">
                        <img
                            className="w-full h-72 object-cover"
                            src="https://i.imgur.com/ZZFAmzo.jpg"
                            alt="Capa do Perfil"
                        />
                        <div className="absolute inset-0 bg-linear-to-t 
                                      from-black/30 to-transparent"></div>
                    </div>

                    {/* Foto de Perfil */}
                    <div className="relative -mt-28 flex justify-center">
                        <img
                            className="rounded-full w-48 h-48 object-cover border-8 
                                     border-white shadow-2xl relative z-10"
                            src={usuario.foto}
                            alt={`Foto de perfil de ${usuario.nome}`}
                        />
                    </div>

                    {/* Informações do Usuário */}
                    <div className="text-center px-6 py-8">
                        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text 
                                     bg-linear-to-r from-(--persian-rose-700) 
                                     to-(--yellow-700) mb-2">
                            {usuario.nome}
                        </h1>
                        <p className="text-xl text-gray-600 mb-6 flex items-center 
                                    justify-center gap-2">
                            📧 {usuario.usuario}
                        </p>

                        {/* Cards de Informação */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8 mb-8">
                            <div className="bg-linear-to-br from-(--persian-rose-100) 
                                          to-(--persian-rose-200) p-6 rounded-2xl 
                                          shadow-lg hover:shadow-xl transition-all 
                                          duration-300 hover:scale-105">
                                <div className="text-4xl mb-2">✨</div>
                                <h3 className="text-lg font-bold text-(--persian-rose-800)">
                                    Postagens
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    Suas criações
                                </p>
                            </div>

                            <div className="bg-linear-to-br from-(--yellow-100) 
                                          to-(--yellow-200) p-6 rounded-2xl 
                                          shadow-lg hover:shadow-xl transition-all 
                                          duration-300 hover:scale-105">
                                <div className="text-4xl mb-2">🎨</div>
                                <h3 className="text-lg font-bold text-(--yellow-800)">
                                    Temas
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    Suas categorias
                                </p>
                            </div>

                            <div className="bg-linear-to-br from-(--persian-rose-200) 
                                          to-(--yellow-200) p-6 rounded-2xl 
                                          shadow-lg hover:shadow-xl transition-all 
                                          duration-300 hover:scale-105">
                                <div className="text-4xl mb-2">💫</div>
                                <h3 className="text-lg font-bold text-(--persian-rose-800)">
                                    Membro desde
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    2025
                                </p>
                            </div>
                        </div>

                        {/* Botões de Ação */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                            <Link
                                to="/atualizarperfil"
                                className="bg-linear-to-r from-(--persian-rose-500) 
                                         to-(--persian-rose-600) 
                                         hover:from-(--persian-rose-600) 
                                         hover:to-(--persian-rose-700) text-white 
                                         font-bold py-3 px-8 rounded-xl transition-all 
                                         duration-300 shadow-lg hover:shadow-xl 
                                         hover:scale-105 flex items-center justify-center gap-2"
                            >
                                ✏️ Editar Perfil
                            </Link>

                            <Link
                                to="/postagens"
                                className="bg-linear-to-r from-(--yellow-400) 
                                         to-(--yellow-600) 
                                         hover:from-(--yellow-600) 
                                         hover:to-(--yellow-400) text-white 
                                         font-bold py-3 px-8 rounded-xl transition-all 
                                         duration-300 shadow-lg hover:shadow-xl 
                                         hover:scale-105 flex items-center justify-center gap-2"
                            >
                                📚 Ver Minhas Postagens
                            </Link>
                        </div>

                        {/* Bio ou Descrição */}
                        <div className="mt-8 p-6 bg-linear-to-r from-(--persian-rose-50) 
                                      to-(--yellow-50) rounded-2xl">
                            <p className="text-gray-700 text-center italic">
                                ✨ "Expressando pensamentos e compartilhando ideias" ✨
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Perfil