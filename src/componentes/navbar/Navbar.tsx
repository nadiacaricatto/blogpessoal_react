import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {
  const navigate = useNavigate();
  const { usuario, handleLogout } = useContext(AuthContext);
  
  function logout() {
    handleLogout();
    alert('O usuário foi desconectado com sucesso!');
    navigate('/');
  }
  
  const isLoggedIn = usuario.token !== "";
    
  return (
    <nav
      className="py-5 text-[1.1rem] font-semibold text-gray-800 bg-gradient-to-r 
                 from-(--yellow-200) via-(--yellow-400) to-(--yellow-600) 
                 shadow-[0_-1px_14px_rgba(103,72,60,0.13)] tracking-wide"
    >
      <div className="container mx-auto flex justify-between items-center px-8">
        <Link
          to={isLoggedIn ? "/home" : "/"}
          className="text-3xl font-extrabold text-white hover:scale-110 transition-transform duration-200"
        >
          Sphere ✦
        </Link>
        
        <div className="flex gap-8 text-white items-center">
          {isLoggedIn ? (
            <>
              <Link
                to="/postagens"
                className="hover:text-gray-900 hover:bg-white/40 px-3 py-1 rounded-xl transition-all duration-300 hover:scale-105"
              >
                ✨ Explore
              </Link>
              <Link
                to="/temas"
                className="hover:text-gray-900 hover:bg-white/40 px-3 py-1 rounded-xl transition-all duration-300 hover:scale-105"
              >
                🎨 Moodboard
              </Link>
              <Link
                to="/cadastrartema"
                className="hover:text-gray-900 hover:bg-white/40 px-3 py-1 rounded-xl transition-all duration-300 hover:scale-105"
              >
                ➕ New Theme
              </Link>
              <Link
                to="/cadastrarpostagem"
                className="hover:text-gray-900 hover:bg-white/40 px-3 py-1 rounded-xl transition-all duration-300 hover:scale-105"
              >
                ✍️ New Post
              </Link>
              <Link
                to="/perfil"
                className="hover:text-gray-900 hover:bg-white/40 px-3 py-1 rounded-xl transition-all duration-300 hover:scale-105"
              >
                💫 My Space
              </Link>
              <button
                onClick={logout}
                className="hover:text-gray-900 hover:bg-white/40 px-3 py-1 rounded-xl transition-all duration-300 hover:scale-105"
              >
                🌙 Log(Out)
              </button>
            </>
          ) : (
            <Link
              to="/cadastro"
              className="hover:text-gray-900 hover:bg-white/40 px-3 py-1 rounded-xl transition-all duration-300 hover:scale-105"
            >
              🚀 Hop In!
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;