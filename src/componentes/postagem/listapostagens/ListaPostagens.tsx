import { useContext, useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { SyncLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Postagem from "../../../models/Postagem";
import { buscar } from "../../../services/Service";
import CardPostagem from "../cardpostagem/CardPostagem";

function ListaPostagens() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [postagens, setPostagens] = useState<Postagem[]>([])
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token
    
    useEffect(() => {
        if (token === '') {
            alert('Você precisa estar logado!')
            navigate('/')
        }
    }, [token])
    
    useEffect(() => {
        buscarPostagens()    
    }, [postagens.length])
    
    async function buscarPostagens() {
        try {
            setIsLoading(true)
            await buscar('/postagens', setPostagens, {
                headers: { Authorization: token }
            })
        } catch (error: any) {
            if (error.toString().includes('401')) {
                handleLogout()
            }
        } finally {
            setIsLoading(false)
        }
    }
    
    return (
        <div className="min-h-screen bg-gradient-to-br from-(--persian-rose-50) 
                       to-(--yellow-100) py-12 px-4">
            <div className="container mx-auto max-w-7xl">
                
                {/* Header da página */}
                <div className="text-center mb-12">
                    <h1 className="text-5xl font-extrabold text-transparent bg-clip-text 
                                 bg-gradient-to-r from-(--persian-rose-700) 
                                 to-(--yellow-700) mb-4">
                        ✨ Explore
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Descubra as histórias e pensamentos compartilhados
                    </p>
                </div>

                {/* Loading */}
                {isLoading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="text-center">
                            <SyncLoader
                                color="#d946a6"
                                size={20}
                            />
                            <p className="text-gray-600 mt-4 text-lg">
                                Carregando postagens...
                            </p>
                        </div>
                    </div>
                )}

                {}
                {(!isLoading && postagens.length === 0) && (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="bg-white rounded-3xl p-12 shadow-2xl 
                                      border-2 border-(--yellow-400) max-w-md text-center">
                            <div className="text-8xl mb-6">📭</div>
                            <h2 className="text-3xl font-bold text-transparent bg-clip-text 
                                         bg-gradient-to-r from-(--persian-rose-600) 
                                         to-(--yellow-600) mb-4">
                                Nenhuma postagem ainda
                            </h2>
                            <p className="text-gray-600 text-lg mb-8">
                                Seja o primeiro a compartilhar seus pensamentos e ideias!
                            </p>
                            <Link
                                to="/cadastrarpostagem"
                                className="inline-flex items-center gap-2 bg-gradient-to-r 
                                         from-(--persian-rose-500) to-(--persian-rose-600) 
                                         hover:from-(--persian-rose-600) 
                                         hover:to-(--persian-rose-700) text-white 
                                         font-bold py-3 px-8 rounded-xl transition-all 
                                         duration-300 shadow-lg hover:shadow-xl 
                                         hover:scale-105"
                            >
                                ✍️ Criar Primeira Postagem
                            </Link>
                        </div>
                    </div>
                )}

                {/* Grid de Postagens */}
                {(!isLoading && postagens.length > 0) && (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {postagens.map((postagem) => (
                            <CardPostagem key={postagem.id} postagem={postagem} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default ListaPostagens;