import { apiClient } from './client'
import type { Emprestimo } from '../types'

export const emprestimosApi = {
  listar: () => apiClient.get<Emprestimo[]>('/emprestimos/'),
  buscar: (id: number) => apiClient.get<Emprestimo>(`/emprestimos/${id}`),
  criar: (data: Emprestimo) => apiClient.post<Emprestimo>('/emprestimos/', data),
  atualizar: (id: number, data: Emprestimo) =>
    apiClient.put<Emprestimo>(`/emprestimos/${id}`, data),
  deletar: (id: number) => apiClient.delete(`/emprestimos/${id}`),
}
