import CrudPage from '../components/CrudPage'
import { emprestimosApi } from '../api/emprestimos'
import type { Emprestimo } from '../types'

export default function EmprestimosPage() {
  return (
    <CrudPage<Emprestimo>
      title="Empréstimos"
      idKey="id"
      fields={[
        { name: 'data_emprestimo', label: 'Data do empréstimo', type: 'date', required: true },
        { name: 'data_devolucao', label: 'Data de devolução', type: 'date' },
        { name: 'livro_id', label: 'ID do livro', type: 'number', required: true },
      ]}
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'data_emprestimo', label: 'Empréstimo' },
        { key: 'data_devolucao', label: 'Devolução' },
        { key: 'livro_id', label: 'Livro ID' },
      ]}
      listar={emprestimosApi.listar}
      criar={emprestimosApi.criar}
      atualizar={(id, data) => emprestimosApi.atualizar(Number(id), data)}
      deletar={(id) => emprestimosApi.deletar(Number(id))}
    />
  )
}
