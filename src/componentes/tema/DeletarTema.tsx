import { useState, useContext, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../../contexts/AuthContext"
import type Tema from "../../models/Tema"
import { buscar, deletar } from "../../services/Service"

function DeletarTema() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [tema, setTema] = useState<Tema>({} as Tema)
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token
    const { id } = useParams<{ id: string }>()

    async function buscarTemaPorId() {
        try {
            await buscar(`/temas/${id}`, setTema, {
                headers: { Authorization: token },
            })
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout()
            }
        } 
    }

    useEffect(() => {
        if(id !== undefined){
            buscarTemaPorId();
        }
    }, [id])

    useEffect(() => {
        if (token === "") {
            alert("Você precisa estar logado!")
            navigate("/")
        }
    }, [token])

    function retornar() {
        navigate("/temas")
    }

    async function deletarTema(){
        setIsLoading(true);
        try{
            await deletar(`/temas/${id}`, {
                headers: { Authorization: token}
            })
            alert('Tema deletado com sucesso!')
        }catch(error: any){
            if(error.toString().includes('401')){
                handleLogout();
            }else{
                alert('Erro ao deletar o tema!')
            }
        }
        setIsLoading(false);
        retornar();
    }

    return (
        <div className='container w-full max-w-2xl mx-auto py-8 px-4'>
            <h1 className='text-4xl font-extrabold text-transparent bg-clip-text 
                          bg-linear-to-r from-(--persian-rose-600) 
                          to-(--persian-rose-800) text-center mb-4'>
                🗑️ Deletar Tema
            </h1>
            
            <p className='text-center font-semibold text-gray-700 mb-8 text-lg'>
                Você tem certeza de que deseja apagar o tema a seguir?
            </p>

            <div className='border-2 border-(--persian-rose-400) flex flex-col 
                          rounded-2xl overflow-hidden justify-between shadow-xl bg-white'>
                <header 
                    className='py-3 px-6 bg-linear-to-r from-(--persian-rose-500) 
                             to-(--persian-rose-600) text-white font-bold text-xl'>
                    🎨 Tema
                </header>
                
                <p className='p-8 text-3xl font-bold text-(--persian-rose-800) 
                            bg-linear-to-br from-(--persian-rose-50) 
                            to-white h-full text-center flex items-center justify-center'>
                    {tema.descricao}
                </p>

                <div className="flex">
                    <button 
                        className='text-white bg-linear-to-r from-gray-400 to-gray-500 
                                 hover:from-gray-500 hover:to-gray-600 w-full py-3 
                                 font-semibold transition-all duration-300'
                        onClick={retornar}    
                    >
                        ❌ Não
                    </button>
                    <button 
                        className='w-full text-white bg-linear-to-r 
                                 from-(--persian-rose-500) to-(--persian-rose-600) 
                                 hover:from-(--persian-rose-600) 
                                 hover:to-(--persian-rose-700) flex items-center 
                                 justify-center font-semibold transition-all duration-300'
                        onClick={deletarTema}
                    >
                        {isLoading ? (
                            <ClipLoader color="#ffffff" size={24} />
                        ) : (
                            <span>✅ Sim</span>                        
                        )}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default DeletarTema