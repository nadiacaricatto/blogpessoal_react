import { BrowserRouter, Route, Routes } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import Footer from "./componentes/footer/Footer"
import Navbar from "./componentes/navbar/Navbar"
import DeletarPostagem from "./componentes/postagem/deletarpostagem/DeletarPostagem"
import FormPostagem from "./componentes/postagem/formpostagem/FormPostagem"
import ListaPostagens from "./componentes/postagem/listapostagens/ListaPostagens"
import DeletarTema from "./componentes/tema/DeletarTema"
import FormTema from "./componentes/tema/FormTema"
import ListaTemas from "./componentes/tema/ListaTemas"
import { AuthProvider } from "./contexts/AuthContext"
import Cadastro from "./pages/cadastro/Cadastro"
import Home from "./pages/home/Home"
import Login from "./pages/login/Login"
import AtualizarPerfil from "./pages/perfil/AtualizarPerfil"
import Perfil from "./pages/perfil/Perfil"

function App() {
	return (
		<>
			<AuthProvider>
				<ToastContainer />
				<BrowserRouter>
					<Navbar />
					<div className="min-h-[80vh]">
						<Routes>
							<Route path="/" element={<Login />} />
							<Route path="/home" element={<Home />} />
							<Route path="/cadastro" element={<Cadastro />} />
							<Route path="/temas" element={<ListaTemas />} />
							<Route path="/cadastrartema" element={<FormTema />} />
							<Route path="/editartema/:id" element={<FormTema />} />
							<Route path="/deletartema/:id" element={<DeletarTema />} />
							<Route path="/postagens" element={<ListaPostagens />} />
							<Route path="/cadastrarpostagem" element={<FormPostagem />} />
							<Route path="/editarpostagem/:id" element={<FormPostagem />} />
							<Route path="/deletarpostagem/:id" element={<DeletarPostagem />} />
							<Route path="/perfil" element={<Perfil />} />
							<Route path="/atualizarusuario" element={<AtualizarPerfil />} />
						</Routes>
					</div>
					<Footer />
				</BrowserRouter>
			</AuthProvider>
		</>
	)
}

export default App