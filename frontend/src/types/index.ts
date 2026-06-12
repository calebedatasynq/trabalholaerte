export interface Aluno {
  matricula: string
  nome_aluno: string
  email?: string
  nome_mae?: string
  endereco_id?: number
}

export interface Nota {
  id?: number
  aluno_id: number
  disciplina_id: number
  nota?: number
}

export interface Categoria {
  id?: number
  nome_categoria: string
}

export interface Livro {
  id?: number
  titulo: string
  autor?: string
  preco?: number
  categoria_id?: number
}

export interface Emprestimo {
  id?: number
  data_emprestimo: string
  data_devolucao?: string
  livro_id: number
}
