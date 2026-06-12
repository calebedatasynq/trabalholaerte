# Setup em nova máquina

## Pré-requisitos

- Python instalado
- Git instalado

## Passos

### 1. Clonar o repositório

```powershell
git clone <url-do-repositorio>
cd django_ap2
```

### 2. Criar e ativar o ambiente virtual

```powershell
cd backend
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

### 3. Instalar dependências

```powershell
pip install -r requirements.txt
```

### 4. Configurar variáveis de ambiente

Crie um arquivo `.env` dentro da pasta `backend` com o conteúdo:

```
DJANGO_SECRET_KEY=sua-chave-secreta-aqui
```

### 5. Rodar as migrações

```powershell
python manage.py makemigrations
python manage.py migrate
```

> **Obs:** O `makemigrations` só é necessário se você tiver alterado os models.
> Se está apenas configurando a máquina com o código existente, apenas o `migrate` é suficiente.

### 6. Iniciar o servidor

```powershell
python manage.py runserver
```
