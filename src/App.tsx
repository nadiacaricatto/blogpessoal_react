import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import Cadastro from "./pages/cadastro/Cadastro"
import { AuthProvider } from "./contexts/AuthContext"
import Footer from "./componentes/footer/Footer"
import DeletarTema from "./componentes/tema/DeletarTema"
import FormTema from "./componentes/tema/FormTema"
import ListaTemas from "./componentes/tema/ListaTemas"
import Navbar from "./componentes/navbar/Navbar"
import FormPostagem from "./componentes/postagem/formpostagem/FormPostagem"
import ListaPostagens from "./componentes/postagem/listapostagens/ListaPostagens"


function App() {
  
  return (
    <>
	<AuthProvider>
		<BrowserRouter>
        <Navbar />
		<div className="min-h-[80vh]">
			<Routes>
				<Route path="/" element={<Login />} />
				<Route path="/home" element={< Home />} />
				<Route path="/login" element={< Login />} />
				<Route path="/cadastro" element={< Cadastro />} />
				<Route path="/temas" element={<ListaTemas />}/>
				<Route path="/cadastrartema" element={<FormTema />} />
				<Route path="/editartema/:id" element={<FormTema />} />
				<Route path="/deletartema/:id" element={<DeletarTema />} />
				<Route path="/postagens" element={<ListaPostagens />} />
				<Route path="/cadastrarpostagem" element={<FormPostagem />} />
				<Route path="/editarpostagem/:id" element={<FormPostagem />} />
			</Routes>
		</div>
		<Footer /> 
		
       
     </BrowserRouter>
	</AuthProvider>
     
      
    </>
   
  )
}

export default App

