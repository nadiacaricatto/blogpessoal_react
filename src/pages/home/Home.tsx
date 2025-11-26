import { Link } from "react-router-dom"
import ModalPostagem from "../../componentes/postagem/modalpostagens/ModalPostagem"

function Home() {
    return (
        <div className="bg-linear-to-br from-(--persian-rose-100) 
                       via-(--persian-rose-200) to-(--yellow-200) 
                       flex justify-center min-h-[80vh]">
            <div className="container grid grid-cols-1 lg:grid-cols-2 text-gray-800 gap-8 p-8">
                
                {/* Coluna Esquerda - Conteúdo */}
                <div className="flex flex-col gap-6 items-center justify-center py-8">
                    <h2 className="text-5xl lg:text-6xl font-extrabold text-transparent 
                                 bg-clip-text bg-linear-to-r from-(--persian-rose-700) 
                                 to-(--yellow-700) text-center leading-tight">
                        Seja Bem-Vinde! ✨
                    </h2>
                    
                    <p className="text-xl lg:text-2xl text-center text-(--persian-rose-800) 
                                font-semibold leading-relaxed max-w-lg">
                        Expresse aqui seus pensamentos e opiniões 💭💗
                    </p>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6 w-full max-w-md">
                        <ModalPostagem />
                        
                        <Link to="/postagens"
                            className="bg-linear-to-r from-(--yellow-400) 
                                     to-(--yellow-600) hover:from-(--yellow-600) 
                                     hover:to-(--yellow-400) text-white font-bold 
                                     py-3 px-6 rounded-xl transition-all duration-300 
                                     shadow-lg hover:shadow-xl hover:scale-105 text-center
                                     border-2 border-white flex items-center justify-center gap-2">
                            📚 Ver Postagens
                        </Link>
                    </div>

                    <Link to="/temas"
                        className="text-(--persian-rose-600) hover:text-(--persian-rose-800) 
                                 font-semibold hover:underline transition-all text-lg mt-4">
                        🎨 Explorar Temas
                    </Link>
                </div>

                {/* Coluna Direita - Imagem */}
                <div className="flex justify-center items-center">
                    <img
                        src="https://i.imgur.com/VpwApCU.png"
                        alt="Ilustração da página home"
                        className="w-full max-w-lg rounded-3xl shadow-2xl 
                                 hover:scale-105 transition-transform duration-300"
                    />
                </div>
            </div>
        </div>
    )
}

export default Home