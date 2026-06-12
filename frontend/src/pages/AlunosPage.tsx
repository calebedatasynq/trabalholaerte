import CrudPage from '../components/CrudPage'
import { alunosApi } from '../api/alunos'
import type { Aluno } from '../types'

export default function AlunosPage() {
  return (
    <CrudPage<Aluno>
      title="Alunos"
      idKey="matricula"
      fields={[
        { name: 'matricula', label: 'Matrícula', type: 'text', required: true, readOnlyOnEdit: true },
        { name: 'nome_aluno', label: 'Nome', type: 'text', required: true },
        { name: 'email', label: 'E-mail', type: 'email' },
        { name: 'nome_mae', label: 'Nome da mãe', type: 'text' },
        { name: 'endereco_id', label: 'ID do endereço', type: 'number' },
      ]}
      columns={[
        { key: 'matricula', label: 'Matrícula' },
        { key: 'nome_aluno', label: 'Nome' },
        { key: 'email', label: 'E-mail' },
        { key: 'nome_mae', label: 'Nome da mãe' },
        { key: 'endereco_id', label: 'Endereço ID' },
      ]}
      listar={alunosApi.listar}
      criar={alunosApi.criar}
      atualizar={(id, data) => alunosApi.atualizar(String(id), data)}
      deletar={(id) => alunosApi.deletar(String(id))}
    />
  )
}
