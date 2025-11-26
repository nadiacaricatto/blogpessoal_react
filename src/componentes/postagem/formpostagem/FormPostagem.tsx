import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import type Tema from "../../../models/Tema"
import { AuthContext } from "../../../contexts/AuthContext"
import { atualizar, buscar, cadastrar } from "../../../services/Service"
import type Postagem from "../../../models/Postagem"
import { ClipLoader } from "react-spinners"

function FormPostagem() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [temas, setTemas] = useState<Tema[]>([])
    const [tema, setTema] = useState<Tema>({id:0, descricao:'',})
    const [postagem, setPostagem] = useState<Postagem>({} as Postagem)
    const { id } = useParams<{ id: string }>()
    const { usuario, handleLogout } = useContext(AuthContext)
    const token = usuario.token

    async function buscarPostagemPorId(id:string) {
        try {
            await buscar(`/postagens/${id}`, setPostagem, {
                headers: { Authorization: token },
            })
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout()
            }
        } 
    }

    async function buscarTemaPorId(id: string) {
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

    async function buscarTemas() {
        try {
            await buscar(`/temas`, setTemas, {
                headers: { Authorization: token },
            })
        } catch (error: any) {
            if (error.toString().includes("401")) {
                handleLogout()
            }
        } 
    }

    useEffect(() => {
        if (token === "") {
            alert("Você precisa estar logado!")
            navigate("/")
        }
    }, [token])

    useEffect(() => {
        buscarTemas();
        if(id !== undefined){
            buscarPostagemPorId(id);
        }
    }, [id])

    useEffect(() => {
        setPostagem({
            ...postagem,
            tema: tema
        })
    }, [tema])

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setPostagem({
            ...postagem,
            [e.target.name]: e.target.value,
            tema: tema,
            usuario: usuario,
        })
    }

    function retornar() {
        navigate("/postagens")
    }

    async function gerarNovoPostagem(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar("/postagens", postagem, setPostagem, {
                    headers: { Authorization: token },
                })
                alert("Postagem atualizada com sucesso!")
            } catch (error: any) {
                if (error.toString().includes("401")) {
                    handleLogout()
                } else {
                    alert("Erro ao atualizar a Postagem!")
                }
            }
        } else {
            try {
                await cadastrar("/postagens", postagem, setPostagem, {
                    headers: { Authorization: token },
                })
                alert("A postagem foi cadastrada com sucesso!")
            } catch (error: any) {
                if (error.toString().includes("401")) {
                    handleLogout()
                } else {
                    alert("Erro ao cadastrar a Postagem!")
                }
            }
        }

        setIsLoading(false)
        retornar()
    }
    
    const carregandoTema = tema.descricao === ''

    return (
        <div className='container flex flex-col mx-auto items-center py-8 px-4'>
            <h1 className='text-4xl font-extrabold text-transparent bg-clip-text 
                          bg-linear-to-r from-(--persian-rose-600) 
                          to-(--yellow-600) text-center mb-8'>
                {id !== undefined ? "✏️ Editar Postagem" : "✨ Criar Nova Postagem"}
            </h1>

            <form className='flex flex-col w-full max-w-2xl gap-6 bg-white 
                           p-8 rounded-2xl shadow-xl border-2 border-(--persian-rose-200)' 
                  onSubmit={gerarNovoPostagem}>
                
                <div className='flex flex-col gap-2'>
                    <label htmlFor="titulo" className='font-bold text-(--persian-rose-800)'>
                        📝 Título da Postagem
                    </label>
                    <input 
                        type="text" 
                        placeholder="Ex: Minhas reflexões sobre..." 
                        name="titulo" 
                        required
                        className='border-2 border-(--persian-rose-300) rounded-xl p-3 
                                 focus:border-(--persian-rose-500) focus:outline-none
                                 transition-all duration-300'
                        value={postagem.titulo}
                        onChange={(e:ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label htmlFor="texto" className='font-bold text-(--persian-rose-800)'>
                        💭 Texto da Postagem
                    </label>
                    <input 
                        type="text" 
                        placeholder="Compartilhe seus pensamentos..." 
                        name="texto" 
                        className='border-2 border-(--persian-rose-300) rounded-xl p-3
                                 focus:border-(--persian-rose-500) focus:outline-none
                                 transition-all duration-300'
                        value={postagem.texto}
                        onChange={(e:ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>

                <div className='flex flex-col gap-2'>
                    <label className='font-bold text-(--persian-rose-800)'>
                        🎨 Tema da Postagem
                    </label>
                    <select 
                        name="tema" 
                        id='tema'
                        className='border-2 border-(--persian-rose-300) rounded-xl p-3
                                 focus:border-(--persian-rose-500) focus:outline-none
                                 transition-all duration-300 cursor-pointer'
                        onChange={(e) => buscarTemaPorId(e.currentTarget.value)}
                    >
                        <option value="" selected disabled>Selecione um Tema</option>
                        {temas.map((tema) => (
                            <option key={tema.id} value={tema.id}>{tema.descricao}</option>
                        ))}
                    </select>
                </div>

                <button 
                    type='submit'
                    className='rounded-xl disabled:bg-gray-300 disabled:cursor-not-allowed
                             bg-linear-to-r from-(--persian-rose-500) 
                             to-(--persian-rose-600) hover:from-(--persian-rose-600) 
                             hover:to-(--persian-rose-700) text-white font-bold 
                             w-full py-3 flex justify-center items-center gap-2
                             transition-all duration-300 shadow-lg hover:shadow-xl
                             hover:scale-[1.02]' 
                    disabled={carregandoTema}
                >
                    {isLoading ? (
                        <ClipLoader color="#ffffff" size={24} />
                    ) : (
                        <span>{id === undefined ? "✨ Publicar" : "💫 Atualizar"}</span>
                    )}
                </button>
            </form>
        </div>
    )
}

export default FormPostagem