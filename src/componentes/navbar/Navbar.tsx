import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {
  
  const navigate = useNavigate();
  
  const{ handleLogout } = useContext(AuthContext);

  function logout(){
    handleLogout();
    alert('O usuário foi desconectado com sucesso!');
    navigate('/');
  }
    
  return (
    <nav
      className="py-5 text-[1.1rem] font-semibold text-gray-800 bg-gradient-to-r 
                 from-[var(--yellow-200)] via-[var(--yellow-400)] to-[var(--yellow-600)] 
                 shadow-[0_-1px_14px_rgba(103,72,60,0.13)] tracking-wide"
    >
      <div className="container mx-auto flex justify-between items-center px-8">
        {/* Logo / Nome */}
        <Link
          to="/home"
          className="text-3xl font-extrabold text-white hover:scale-110 transition-transform duration-200"
        >
          Sphere ✦
        </Link>

        {/* Menu */}
        <div className="flex gap-8 text-white">
          <Link
            to="/explore"
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
            to="/cadastro"
            className="hover:text-gray-900 hover:bg-white/40 px-3 py-1 rounded-xl transition-all duration-300 hover:scale-105"
          >
            🚀 Hop In!
          </Link>

          <Link
            to="/perfil"
            className="hover:text-gray-900 hover:bg-white/40 px-3 py-1 rounded-xl transition-all duration-300 hover:scale-105"
          >
            💫 My Space
          </Link>

          <Link
            to="/logout"
            className="hover:text-gray-900 hover:bg-white/40 px-3 py-1 rounded-xl transition-all duration-300 hover:scale-105"
          >
            🌙 Log(Out)
          </Link>
        </div>
      </div>
    </nav>
  );

  <Link to='' onClick={logout} className="hover:underline">Sair</Link>
}



export default Navbar;
