import { apiClient } from './client'
import type { Categoria } from '../types'

export const categoriasApi = {
  listar: () => apiClient.get<Categoria[]>('/categorias/'),
  buscar: (id: number) => apiClient.get<Categoria>(`/categorias/${id}`),
  criar: (data: Categoria) => apiClient.post<Categoria>('/categorias/', data),
  atualizar: (id: number, data: Categoria) =>
    apiClient.put<Categoria>(`/categorias/${id}`, data),
  deletar: (id: number) => apiClient.delete(`/categorias/${id}`),
}
