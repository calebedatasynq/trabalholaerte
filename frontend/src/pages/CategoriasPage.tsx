import CrudPage from '../components/CrudPage'
import { categoriasApi } from '../api/categorias'
import type { Categoria } from '../types'

export default function CategoriasPage() {
  return (
    <CrudPage<Categoria>
      title="Categorias"
      idKey="id"
      fields={[{ name: 'nome_categoria', label: 'Nome da categoria', type: 'text', required: true }]}
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'nome_categoria', label: 'Nome' },
      ]}
      listar={categoriasApi.listar}
      criar={categoriasApi.criar}
      atualizar={(id, data) => categoriasApi.atualizar(Number(id), data)}
      deletar={(id) => categoriasApi.deletar(Number(id))}
    />
  )
}
