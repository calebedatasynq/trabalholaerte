import { Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/Layout'
import AlunosPage from './pages/AlunosPage'
import NotasPage from './pages/NotasPage'
import CategoriasPage from './pages/CategoriasPage'
import LivrosPage from './pages/LivrosPage'
import EmprestimosPage from './pages/EmprestimosPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/alunos" replace />} />
        <Route path="alunos" element={<AlunosPage />} />
        <Route path="notas" element={<NotasPage />} />
        <Route path="categorias" element={<CategoriasPage />} />
        <Route path="livros" element={<LivrosPage />} />
        <Route path="emprestimos" element={<EmprestimosPage />} />
      </Route>
    </Routes>
  )
}

export default App
