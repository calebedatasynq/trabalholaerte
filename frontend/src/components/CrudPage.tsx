import { useCallback, useEffect, useState, type FormEvent } from 'react'
import type { AxiosResponse } from 'axios'

type FieldType = 'text' | 'number' | 'date' | 'email'

export interface FieldConfig {
  name: string
  label: string
  type: FieldType
  required?: boolean
  readOnlyOnEdit?: boolean
}

export interface ColumnConfig<T> {
  key: keyof T & string
  label: string
}

interface CrudPageProps<T extends object> {
  title: string
  idKey: keyof T & string
  fields: FieldConfig[]
  columns: ColumnConfig<T>[]
  listar: () => Promise<AxiosResponse<T[]>>
  criar: (data: T) => Promise<AxiosResponse<T>>
  atualizar: (id: string | number, data: T) => Promise<AxiosResponse<T>>
  deletar: (id: string | number) => Promise<AxiosResponse<unknown>>
}

function emptyForm(fields: FieldConfig[]): Record<string, string> {
  return Object.fromEntries(fields.map((f) => [f.name, '']))
}

function itemToForm<T extends object>(
  item: T,
  fields: FieldConfig[],
): Record<string, string> {
  return Object.fromEntries(
    fields.map((f) => {
      const value = (item as Record<string, unknown>)[f.name]
      return [f.name, value !== undefined && value !== null ? String(value) : '']
    }),
  )
}

function formToPayload<T extends object>(
  form: Record<string, string>,
  fields: FieldConfig[],
): T {
  const payload: Record<string, unknown> = {}

  for (const field of fields) {
    const raw = form[field.name]?.trim() ?? ''
    if (raw === '') continue

    if (field.type === 'number') {
      payload[field.name] = Number(raw)
    } else {
      payload[field.name] = raw
    }
  }

  return payload as T
}

export default function CrudPage<T extends object>({
  title,
  idKey,
  fields,
  columns,
  listar,
  criar,
  atualizar,
  deletar,
}: CrudPageProps<T>) {
  const [items, setItems] = useState<T[]>([])
  const [form, setForm] = useState<Record<string, string>>(() => emptyForm(fields))
  const [editingId, setEditingId] = useState<string | number | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const loadItems = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const response = await listar()
      setItems(response.data)
    } catch {
      setError('Erro ao carregar os dados. Verifique se a API está rodando.')
    } finally {
      setLoading(false)
    }
  }, [listar])

  useEffect(() => {
    void loadItems()
  }, [loadItems])

  function resetForm() {
    setForm(emptyForm(fields))
    setEditingId(null)
    setError(null)
  }

  function handleEdit(item: T) {
    setEditingId((item as Record<string, string | number>)[idKey])
    setForm(itemToForm(item, fields))
    setError(null)
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const payload = formToPayload<T>(form, fields)

      if (editingId !== null) {
        await atualizar(editingId, payload)
      } else {
        await criar(payload)
      }

      resetForm()
      await loadItems()
    } catch {
      setError('Erro ao salvar. Verifique os dados e tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  async function handleDelete(id: string | number) {
    if (!window.confirm('Deseja realmente excluir este registro?')) return

    setError(null)
    try {
      await deletar(id)
      if (editingId === id) resetForm()
      await loadItems()
    } catch {
      setError('Erro ao excluir o registro.')
    }
  }

  return (
    <section className="crud-page">
      <h2>{title}</h2>

      {error && <p className="error">{error}</p>}

      <form className="crud-form" onSubmit={handleSubmit}>
        <h3>{editingId !== null ? 'Editar' : 'Novo registro'}</h3>
        <div className="form-grid">
          {fields.map((field) => (
            <label key={field.name} className="form-field">
              <span>
                {field.label}
                {field.required && ' *'}
              </span>
              <input
                type={field.type}
                name={field.name}
                value={form[field.name] ?? ''}
                required={field.required}
                readOnly={editingId !== null && field.readOnlyOnEdit}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, [field.name]: e.target.value }))
                }
              />
            </label>
          ))}
        </div>
        <div className="form-actions">
          <button type="submit" disabled={saving}>
            {saving ? 'Salvando...' : editingId !== null ? 'Atualizar' : 'Criar'}
          </button>
          {editingId !== null && (
            <button type="button" className="btn-secondary" onClick={resetForm}>
              Cancelar
            </button>
          )}
        </div>
      </form>

      <div className="crud-table-wrapper">
        <h3>Lista</h3>
        {loading ? (
          <p>Carregando...</p>
        ) : items.length === 0 ? (
          <p>Nenhum registro encontrado.</p>
        ) : (
          <table className="crud-table">
            <thead>
              <tr>
                {columns.map((col) => (
                  <th key={col.key}>{col.label}</th>
                ))}
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => {
                const id = (item as Record<string, string | number>)[idKey]
                return (
                  <tr key={String(id)}>
                    {columns.map((col) => (
                      <td key={col.key}>
                        {String((item as Record<string, unknown>)[col.key] ?? '-')}
                      </td>
                    ))}
                    <td className="actions">
                      <button type="button" onClick={() => handleEdit(item)}>
                        Editar
                      </button>
                      <button
                        type="button"
                        className="btn-danger"
                        onClick={() => void handleDelete(id)}
                      >
                        Excluir
                      </button>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        )}
      </div>
    </section>
  )
}
