import { Link } from 'react-router-dom'
import type Tema from '../../models/Tema'

interface CardTemaProps {
    tema: Tema
}

function CardTema({ tema }: CardTemaProps) {
    return (
        <div className='border-2 border-(--yellow-400) flex flex-col rounded-2xl 
                      overflow-hidden justify-between shadow-lg hover:shadow-2xl 
                      transition-all duration-300 hover:scale-[1.02] bg-white'>
            
            <header className='py-3 px-6 bg-gradient-to-r from-(--yellow-400) 
                             to-(--yellow-600) text-white font-bold text-xl
                             flex items-center gap-2'>
                🎨 Tema
            </header>
            
            <p className='p-8 text-2xl font-semibold text-(--persian-rose-800) 
                        bg-gradient-to-br from-(--yellow-200) to-white h-full 
                        flex items-center justify-center text-center'>
                {tema.descricao}
            </p>
            
            <div className="flex">
                <Link to={`/editartema/${tema.id}`}
                    className='w-full text-white bg-gradient-to-r from-(--persian-rose-400) 
                             to-(--persian-rose-500) hover:from-(--persian-rose-500) 
                             hover:to-(--persian-rose-600) flex items-center 
                             justify-center py-3 font-semibold transition-all duration-300'>
                    <button>✏️ Editar</button>
                </Link>
                <Link to={`/deletartema/${tema.id}`} 
                    className='text-white bg-gradient-to-r from-(--persian-rose-600) 
                             to-(--persian-rose-700) hover:from-(--persian-rose-700) 
                             hover:to-(--persian-rose-800) w-full flex items-center 
                             justify-center font-semibold transition-all duration-300'>
                    <button>🗑️ Deletar</button>
                </Link>
            </div>
        </div>
    )
}

export default CardTema