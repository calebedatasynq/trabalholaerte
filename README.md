# Trabalho AP2

Projeto fullstack com Django (backend) + React (frontend).

- **Backend:** Django 6, Django Ninja, MySQL, PostgreSQL
- **Frontend:** React 19, TypeScript, Vite

---

## Pré-requisitos

- [Python 3.14+](https://www.python.org/downloads/)
- [uv](https://docs.astral.sh/uv/getting-started/installation/) (gerenciador de pacotes Python)
- [Node.js 18+](https://nodejs.org/)
- MySQL rodando localmente
- PostgreSQL rodando localmente

---

## Backend

### 1. Entre na pasta do backend

```bash
cd backend
```

### 2. Instale as dependências

```bash
uv sync
```

### 3. Configure as variáveis de ambiente

Copie o arquivo de exemplo e preencha com seus dados:

```bash
cp .env.example .env
```

Abra o `.env` e ajuste:

```env
DJANGO_SECRET_KEY=coloque-uma-chave-secreta-aqui
DJANGO_DEBUG=True
DJANGO_ALLOWED_HOSTS=localhost,127.0.0.1

MYSQL_NAME=db_escola
MYSQL_HOST=localhost
MYSQL_PORT=3306
MYSQL_USER=root
MYSQL_PASSWORD=sua_senha_mysql

POSTGRES_NAME=db_biblioteca
POSTGRES_HOST=localhost
POSTGRES_PORT=5432
POSTGRES_USER=postgres
POSTGRES_PASSWORD=sua_senha_postgres

CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

### 4. Crie os bancos de dados

No MySQL:

```sql
CREATE DATABASE db_escola;
```

No PostgreSQL:

```sql
CREATE DATABASE db_biblioteca;
```

### 5. Suba o servidor

```bash
uv run python manage.py runserver
```

As tabelas serão criadas automaticamente na primeira execução.

O backend estará disponível em: `http://localhost:8000`

---

## Frontend

### 1. Entre na pasta do frontend

```bash
cd frontend
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

```bash
cp .env.example .env
```

### 4. Suba o servidor de desenvolvimento

```bash
npm run dev
```

O frontend estará disponível em: `http://localhost:5173`

---

## Rodando os dois ao mesmo tempo

Abra dois terminais e execute cada um no seu respectivo diretório:

| Terminal 1 (backend)                      | Terminal 2 (frontend) |
|-------------------------------------------|-----------------------|
| `cd backend`                              | `cd frontend`         |
| `uv run python manage.py runserver`       | `npm run dev`         |
