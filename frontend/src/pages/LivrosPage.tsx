import CrudPage from '../components/CrudPage'
import { livrosApi } from '../api/livros'
import type { Livro } from '../types'

export default function LivrosPage() {
  return (
    <CrudPage<Livro>
      title="Livros"
      idKey="id"
      fields={[
        { name: 'titulo', label: 'Título', type: 'text', required: true },
        { name: 'autor', label: 'Autor', type: 'text' },
        { name: 'preco', label: 'Preço', type: 'number' },
        { name: 'categoria_id', label: 'ID da categoria', type: 'number' },
      ]}
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'titulo', label: 'Título' },
        { key: 'autor', label: 'Autor' },
        { key: 'preco', label: 'Preço' },
        { key: 'categoria_id', label: 'Categoria ID' },
      ]}
      listar={livrosApi.listar}
      criar={livrosApi.criar}
      atualizar={(id, data) => livrosApi.atualizar(Number(id), data)}
      deletar={(id) => livrosApi.deletar(Number(id))}
    />
  )
}
