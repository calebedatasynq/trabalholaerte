import CrudPage from '../components/CrudPage'
import { notasApi } from '../api/notas'
import type { Nota } from '../types'

export default function NotasPage() {
  return (
    <CrudPage<Nota>
      title="Notas"
      idKey="id"
      fields={[
        { name: 'aluno_id', label: 'ID do aluno', type: 'number', required: true },
        { name: 'disciplina_id', label: 'ID da disciplina', type: 'number', required: true },
        { name: 'nota', label: 'Nota', type: 'number' },
      ]}
      columns={[
        { key: 'id', label: 'ID' },
        { key: 'aluno_id', label: 'Aluno ID' },
        { key: 'disciplina_id', label: 'Disciplina ID' },
        { key: 'nota', label: 'Nota' },
      ]}
      listar={notasApi.listar}
      criar={notasApi.criar}
      atualizar={(id, data) => notasApi.atualizar(Number(id), data)}
      deletar={(id) => notasApi.deletar(Number(id))}
    />
  )
}
