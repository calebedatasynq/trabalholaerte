import { apiClient } from './client'
import type { Aluno } from '../types'

export const alunosApi = {
  listar: () => apiClient.get<Aluno[]>('/alunos/'),
  buscar: (matricula: string) => apiClient.get<Aluno>(`/alunos/${matricula}`),
  criar: (data: Aluno) => apiClient.post<Aluno>('/alunos/', data),
  atualizar: (matricula: string, data: Aluno) =>
    apiClient.put<Aluno>(`/alunos/${matricula}`, data),
  deletar: (matricula: string) => apiClient.delete(`/alunos/${matricula}`),
}
