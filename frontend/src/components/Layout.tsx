import { NavLink, Outlet } from 'react-router-dom'

const navItems = [
  { to: '/alunos', label: 'Alunos' },
  { to: '/notas', label: 'Notas' },
  { to: '/categorias', label: 'Categorias' },
  { to: '/livros', label: 'Livros' },
  { to: '/emprestimos', label: 'Empréstimos' },
]

export default function Layout() {
  return (
    <div className="app">
      <header className="header">
        <h1>AP2 — Sistema Escolar</h1>
        <nav className="nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main className="main">
        <Outlet />
      </main>
    </div>
  )
}
