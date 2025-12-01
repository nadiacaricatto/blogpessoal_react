import { useContext, useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { AuthContext } from "../../contexts/AuthContext"
import { ToastAlerta } from "../../utils/ToastAlerta"
import { buscar } from "../../services/Service"
import type Postagem from "../../models/Postagem"
import type Tema from "../../models/Tema"

function Perfil() {
    const navigate = useNavigate()
    const { usuario, handleLogout } = useContext(AuthContext)
    const [postagens, setPostagens] = useState<Postagem[]>([])
    const [temas, setTemas] = useState<Tema[]>([])
    const [loading, setLoading] = useState(true)

    async function buscarPostagens() {
        try {
            await buscar("/postagens", setPostagens, {
                headers: { Authorization: usuario.token },
            })
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout()
            }
        }
    }

    async function buscarTemas() {
        try {
            await buscar("/temas", setTemas, {
                headers: { Authorization: usuario.token },
            })
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout()
            }
        }
    }

    useEffect(() => {
        if (usuario.token === "") {
            ToastAlerta("Você precisa estar logado", "info")
            navigate("/")
        } else {
            Promise.all([buscarPostagens(), buscarTemas()])
                .finally(() => setLoading(false))
        }
    }, [usuario.token])

    // Filtrar Posts Usuário Logado
    const minhasPostagens = postagens.filter(
        post => post.usuario?.id === usuario.id
    )

    const bioDefault = "Este usuário é do contra e não quis colocar uma frase motivacional 🙃"

    return (
        <div className="min-h-screen bg-gradient-to-br from-(--persian-rose-50) 
                       to-(--yellow-100) py-8 px-4">
            <div className="container mx-auto max-w-4xl">
                <div className="bg-white rounded-3xl overflow-hidden shadow-2xl">
                    
                    {/* Banner de Capa */}
                    <div className="relative">
                        <img
                            className="w-full h-72 object-cover"
                            src="https://i.imgur.com/AdJYxzD.jpg"
                            alt="Capa do Perfil"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t 
                                      from-black/30 to-transparent"></div>
                        
                        {/* Botão Editar Perfil */}
                        <Link
                            to="/atualizarusuario"
                            className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm
                                     hover:bg-white text-(--persian-rose-700) 
                                     font-semibold py-2 px-6 rounded-xl transition-all 
                                     duration-300 shadow-lg hover:shadow-xl 
                                     hover:scale-105 flex items-center gap-2 z-10"
                        >
                            ✏️ Editar Perfil
                        </Link>
                    </div>

                    {}
                    <div className="relative -mt-28 flex justify-center">
                        <div className="relative">
                            <img
                                className="rounded-full w-48 h-48 object-cover border-8 
                                         border-white shadow-2xl relative z-10"
                                src={usuario.foto}
                                alt={`Foto de perfil de ${usuario.nome}`}
                            />
                            
                            {/* Balãozinho */ }
                            <div className="absolute -right-32 top-12 z-20">
                                <div className="relative bg-gradient-to-r from-(--persian-rose-500) 
                                              to-(--yellow-500) text-white text-xs font-bold 
                                              px-4 py-2 rounded-2xl shadow-xl
                                              border-2 border-white whitespace-nowrap">
                                    💫 Membro desde 2025
                                    {}
                                    <div className="absolute left-0 top-1/2 -translate-x-2 
                                                  -translate-y-1/2 w-0 h-0 
                                                  border-t-[8px] border-t-transparent
                                                  border-b-[8px] border-b-transparent
                                                  border-r-[10px] border-r-(--persian-rose-500)">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Infos Usuário */}
                    <div className="text-center px-6 py-8 mt-4">
                        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text 
                                     bg-gradient-to-r from-(--persian-rose-700) 
                                     to-(--yellow-700) mb-2">
                            {usuario.nome}
                        </h1>
                        <p className="text-xl text-gray-600 mb-6 flex items-center 
                                    justify-center gap-2">
                            📧 {usuario.usuario}
                        </p>

                        {/* Cards */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8 mb-8 max-w-2xl mx-auto">
                            <div className="bg-gradient-to-br from-(--persian-rose-100) 
                                          to-(--persian-rose-200) p-6 rounded-2xl 
                                          shadow-lg hover:shadow-xl transition-all 
                                          duration-300 hover:scale-105">
                                <div className="text-4xl mb-2">✨</div>
                                <h3 className="text-3xl font-bold text-(--persian-rose-800)">
                                    {loading ? "..." : minhasPostagens.length}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    {minhasPostagens.length === 1 ? "Postagem" : "Postagens"}
                                </p>
                                {!loading && minhasPostagens.length === 0 && (
                                    <p className="text-xs text-gray-500 mt-2">
                                        Nenhuma postagem ainda
                                    </p>
                                )}
                            </div>

                            <div className="bg-gradient-to-br from-(--yellow-100) 
                                          to-(--yellow-200) p-6 rounded-2xl 
                                          shadow-lg hover:shadow-xl transition-all 
                                          duration-300 hover:scale-105">
                                <div className="text-4xl mb-2">🎨</div>
                                <h3 className="text-3xl font-bold text-(--yellow-800)">
                                    {loading ? "..." : temas.length}
                                </h3>
                                <p className="text-sm text-gray-600 mt-1">
                                    {temas.length === 1 ? "Tema" : "Temas"}
                                </p>
                                {!loading && temas.length === 0 && (
                                    <p className="text-xs text-gray-500 mt-2">
                                        Nenhum tema criado
                                    </p>
                                )}
                            </div>
                        </div>

                        {/* Bio / Frase Editável */}
                        <div className="mt-8 mb-6 p-6 bg-gradient-to-r from-(--persian-rose-50) 
                                      to-(--yellow-50) rounded-2xl border-2 border-(--yellow-200)">
                            <p className="text-gray-700 text-center italic text-lg">
                                ✨ "{usuario.bio?.trim() || bioDefault}" ✨
                            </p>
                        </div>

                        {/* Botões de Ação */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4 mt-8">
                            <Link
                                to="/cadastrarpostagem"
                                className="bg-gradient-to-r from-(--persian-rose-600) 
                                         to-(--persian-rose-700) 
                                         hover:from-(--persian-rose-700) 
                                         hover:to-(--persian-rose-800) text-white 
                                         font-bold py-3 px-8 rounded-xl transition-all 
                                         duration-300 shadow-lg hover:shadow-xl 
                                         hover:scale-105 flex items-center justify-center gap-2"
                            >
                                ✍️ Criar Postagem
                            </Link>

                            <Link
                                to="/postagens"
                                className="bg-gradient-to-r from-(--persian-rose-400) 
                                         to-(--persian-rose-500) 
                                         hover:from-(--persian-rose-500) 
                                         hover:to-(--persian-rose-600) text-white 
                                         font-bold py-3 px-8 rounded-xl transition-all 
                                         duration-300 shadow-lg hover:shadow-xl 
                                         hover:scale-105 flex items-center justify-center gap-2"
                            >
                                📚 Ver Todas as Postagens
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Perfil