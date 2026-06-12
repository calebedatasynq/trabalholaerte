import { apiClient } from './client'
import type { Livro } from '../types'

export const livrosApi = {
  listar: () => apiClient.get<Livro[]>('/livros/'),
  buscar: (id: number) => apiClient.get<Livro>(`/livros/${id}`),
  criar: (data: Livro) => apiClient.post<Livro>('/livros/', data),
  atualizar: (id: number, data: Livro) => apiClient.put<Livro>(`/livros/${id}`, data),
  deletar: (id: number) => apiClient.delete(`/livros/${id}`),
}
