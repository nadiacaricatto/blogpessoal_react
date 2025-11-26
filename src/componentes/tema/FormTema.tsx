import { useContext, useEffect, useState, type ChangeEvent, type FormEvent } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ClipLoader } from "react-spinners"
import { AuthContext } from "../../contexts/AuthContext"
import type Tema from "../../models/Tema"
import { buscar, atualizar, cadastrar } from "../../services/Service"

function FormTema() {
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

    function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
        setTema({
            ...tema,
            [e.target.name]: e.target.value,
        })
    }

    async function gerarNovoTema(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()
        setIsLoading(true)

        if (id !== undefined) {
            try {
                await atualizar("/temas", tema, setTema, {
                    headers: { Authorization: token },
                })
                alert("O Tema foi atualizado com sucesso!")
            } catch (error: any) {
                if (error.toString().includes("401")) {
                    handleLogout()
                } else {
                    alert("Erro ao atualizar o tema!")
                }
            }
        } else {
            try {
                await cadastrar("/temas", tema, setTema, {
                    headers: { Authorization: token },
                })
                alert("O Tema foi cadastrado com sucesso!")
            } catch (error: any) {
                if (error.toString().includes("401")) {
                    handleLogout()
                } else {
                    alert("Erro ao cadastrar o tema!")
                }
            }
        }

        setIsLoading(false)
        retornar()
    }

    return (
        <div className="container flex flex-col items-center justify-center mx-auto py-8 px-4">
            <h1 className="text-4xl font-extrabold text-transparent bg-clip-text 
                          bg-linear-to-r from-(--yellow-600) 
                          to-(--persian-rose-600) text-center mb-8">
                {id === undefined ? "🎨 Criar Novo Tema" : "✏️ Atualizar Tema"}
            </h1>

            <form className="w-full max-w-2xl flex flex-col gap-6 bg-white 
                           p-8 rounded-2xl shadow-xl border-2 border-(--yellow-400)" 
                  onSubmit={gerarNovoTema}>
                
                <div className="flex flex-col gap-2">
                    <label htmlFor="descricao" className="font-bold text-(--persian-rose-800)">
                        📝 Descrição do Tema
                    </label>
                    <input
                        type="text"
                        placeholder="Ex: Pensamentos, Viagens, Receitas..."
                        name="descricao"
                        className="border-2 border-(--yellow-400) rounded-xl p-3
                                 focus:border-(--yellow-600) focus:outline-none
                                 transition-all duration-300"
                        value={tema.descricao}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => atualizarEstado(e)}
                    />
                </div>

                <button
                    className="rounded-xl text-white bg-linear-to-r 
                             from-(--yellow-400) to-(--yellow-600) 
                             hover:from-(--yellow-600) hover:to-(--yellow-400) 
                             w-full py-3 font-bold flex justify-center
                             transition-all duration-300 shadow-lg hover:shadow-xl
                             hover:scale-[1.02]"
                    type="submit"
                >
                    {isLoading ? (
                        <ClipLoader color="#ffffff" size={24} />
                    ) : (
                        <span>{id === undefined ? "✨ Criar Tema" : "💫 Atualizar Tema"}</span>
                    )}
                </button>
            </form>
        </div>
    )
}

export default FormTema