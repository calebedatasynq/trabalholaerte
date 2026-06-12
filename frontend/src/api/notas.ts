import { apiClient } from './client'
import type { Nota } from '../types'

export const notasApi = {
  listar: () => apiClient.get<Nota[]>('/notas/'),
  buscar: (id: number) => apiClient.get<Nota>(`/notas/${id}`),
  criar: (data: Nota) => apiClient.post<Nota>('/notas/', data),
  atualizar: (id: number, data: Nota) => apiClient.put<Nota>(`/notas/${id}`, data),
  deletar: (id: number) => apiClient.delete(`/notas/${id}`),
}
