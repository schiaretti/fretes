import { useAuth } from '../../AuthContext/AuthContext.jsx'
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { FaBars, FaTimes, FaTruck, FaCar, FaPlusCircle, FaUserCog, FaSignOutAlt } from 'react-icons/fa'

function Logistica() {
  const location = useLocation()
  console.log('Rota atual dentro de Logistica:', location.pathname)
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)

  const toggleMenu = () => setMenuOpen(!menuOpen)

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-900 text-white shadow-md">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <h1 className="text-xl md:text-2xl font-bold">Sistema de Fretes</h1>

          <button
            onClick={toggleMenu}
            className="md:hidden text-white focus:outline-none"
            aria-label="Toggle menu"
          >
            {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>

          <div className="hidden md:flex items-center space-x-4">
            <span className="text-sm md:text-base">
              {user?.nome} ({user?.nivel})
            </span>
            <button
              onClick={logout}
              className="flex items-center bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded transition-colors"
              title="Sair"
            >
              <FaSignOutAlt className="mr-1" />
              <span className="hidden md:inline">Sair</span>
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row">
        {/* Sidebar Mobile */}
        {menuOpen && (
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="absolute inset-0 bg-black bg-opacity-50"
              onClick={toggleMenu}
            ></div>
            <div className="absolute left-0 top-0 h-full w-3/4 bg-white shadow-lg">
              <div className="p-4 border-b">
                <div className="flex justify-between items-center">
                  <h2 className="font-bold text-lg">Menu</h2>
                  <button onClick={toggleMenu}>
                    <FaTimes />
                  </button>
                </div>
                <div className="mt-2 text-sm">
                  Logado como: <span className="font-medium">{user?.nome}</span>
                </div>
              </div>

              <nav className="p-4">
                <ul className="space-y-2">
                  <NavItem
                    to="fretes"
                    icon={<FaTruck />}
                    label="Fretes Disponíveis"
                    onClick={toggleMenu}
                  />
                  <NavItem
                    to="novo-frete"
                    icon={<FaPlusCircle />}
                    label="Criar Novo Frete"
                    onClick={toggleMenu}
                  />
                  <NavItem
                    to="veiculos"
                    icon={<FaCar />}
                    label="Meus Veículos"
                    onClick={toggleMenu}
                  />
                  <NavItem
                    to="cadastro-veiculo"
                    icon={<FaPlusCircle />}
                    label="Cadastrar Veículo"
                    onClick={toggleMenu}
                  />
                  {user?.nivel === 'ADMIN' && (
                    <NavItem
                      to="/admin"
                      icon={<FaUserCog />}
                      label="Painel Admin"
                      onClick={toggleMenu}
                    />
                  )}
                </ul>

                <button
                  onClick={() => {
                    logout()
                    toggleMenu()
                  }}
                  className="mt-6 w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded transition-colors"
                >
                  <FaSignOutAlt className="mr-2" />
                  Sair
                </button>
              </nav>
            </div>
          </div>
        )}

        {/* Sidebar Desktop */}
        <aside className="hidden md:block md:w-64 bg-white rounded-lg shadow-md p-4 mr-6 h-fit">
          <div className="mb-6 p-2 border-b">
            <h2 className="font-bold text-lg">Bem-vindo</h2>
            <p className="text-sm text-gray-600">
              {user?.nome} ({user?.nivel})
            </p>
          </div>

          <nav>
            <ul className="space-y-1">
              <NavItem
                to="fretes"
                icon={<FaTruck />}
                label="Fretes Disponíveis"
              />
              <NavItem
                to="novo-frete"
                icon={<FaPlusCircle />}
                label="Criar Novo Frete"
              />
              <NavItem
                to="veiculos"
                icon={<FaCar />}
                label="Meus Veículos"
              />
              <NavItem
                to="cadastro-veiculo"
                icon={<FaPlusCircle />}
                label="Cadastrar Veículo"
              />
              {user?.nivel === 'ADMIN' && (
                <NavItem
                  to="/admin"
                  icon={<FaUserCog />}
                  label="Painel Admin"
                />
              )}
            </ul>
          </nav>
        </aside>

        {/* Conteúdo Principal */}
        <main className="flex-1">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="md:hidden p-4 border-b flex justify-between items-center">
              <div>
                <h2 className="font-bold">
                  {user?.nivel === 'ADMIN' ? 'Painel Admin' : 'Área do Motorista'}
                </h2>
                <p className="text-sm text-gray-600">
                  {user?.nome} ({user?.nivel})
                </p>
              </div>
              <button
                onClick={toggleMenu}
                className="text-blue-600 hover:text-blue-800"
              >
                <FaBars size={20} />
              </button>
            </div>

            <div className="p-4 md:p-6">
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function NavItem({ to, icon, label, onClick }) {
  return (
    <li>
      <Link
        to={to}
        onClick={onClick}
        className="flex items-center p-2 rounded hover:bg-blue-50 text-gray-700 hover:text-blue-600 transition-colors"
      >
        <span className="mr-2 text-blue-500">{icon}</span>
        {label}
      </Link>
    </li>
  )
}

export default Logistica