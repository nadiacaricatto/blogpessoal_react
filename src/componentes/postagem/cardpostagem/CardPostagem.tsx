import { Link } from 'react-router-dom'
import type Postagem from '../../../models/Postagem'

interface CardPostagensProps {
    postagem: Postagem
}

function CardPostagem({ postagem }: CardPostagensProps) {
    return (
        <div className='border-2 border-(--persian-rose-200)
            flex flex-col rounded-2xl overflow-hidden justify-between
            shadow-lg hover:shadow-2xl transition-all duration-300 
            hover:scale-[1.02] bg-white'>
                
            <div>
                <div className="flex w-full bg-gradient-to-r from-(--persian-rose-400) 
                               to-(--persian-rose-500)] py-3 px-4 items-center gap-4">
                    <img
                        src={postagem.usuario?.foto}
                        className='h-12 w-12 rounded-full border-2 border-white object-cover'
                        alt={postagem.usuario?.nome} 
                    />
                    <h3 className='text-lg font-bold text-white'>
                        {postagem.usuario?.nome}
                    </h3>
                </div>
                
                <div className='p-5'>
                    <h4 className='text-xl font-bold text-(--persian-rose-800) mb-2 uppercase'>
                        {postagem.titulo}
                    </h4>
                    <p className='text-gray-700 mb-3 leading-relaxed'>{postagem.texto}</p>
                    
                    <div className='flex flex-col gap-1 text-sm text-gray-600 mt-4'>
                        <p className='flex items-center gap-2'>
                            <span className='font-semibold text-(--persian-rose-600)'>🎨 Tema:</span> 
                            {postagem.tema?.descricao}
                        </p>
                        <p className='flex items-center gap-2'>
                            <span className='font-semibold text-(--persian-rose-600)'>📅 Data:</span> 
                            {new Intl.DateTimeFormat("pt-BR", {
                                dateStyle: 'full',
                                timeStyle: 'medium',
                            }).format(new Date(postagem.data))}
                        </p>
                    </div>
                </div>
            </div>
            
            <div className="flex">
                <Link to={`/editarpostagem/${postagem.id}`} 
                    className='w-full text-white bg-gradient-to-r from-(--yellow-400) 
                    to-(--yellow-600) hover:from-(--yellow-600)
                    hover:to-(--yellow-400) flex items-center justify-center py-3
                    font-semibold transition-all duration-300'>
                    <button>✏️ Editar</button>
                </Link>
                <Link to={`/deletarpostagem/${postagem.id}`}
                    className='text-white bg-gradient-to-r from-(--persian-rose-500) 
                    to-(--persian-rose-600) hover:from-(--persian-rose-600) 
                    hover:to-(--persian-rose-700) w-full flex items-center 
                    justify-center font-semibold transition-all duration-300'>
                    <button>🗑️ Deletar</button>
                </Link>
            </div>
        </div>
    )
}

export default CardPostagem