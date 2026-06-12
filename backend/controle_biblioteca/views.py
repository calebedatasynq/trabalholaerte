from django.shortcuts import render

# Create your views here.
from ninja import Schema
from ninja_extra import route, api_controller
from controle_biblioteca.models import TbLivros, TbCategoria, TbEmprestimos
from typing import List, Optional
from django.shortcuts import get_object_or_404
from datetime import date


# Schemas
class CategoriaSchema(Schema):
    id: Optional[int] = None
    nome_categoria: str


class LivroSchema(Schema):
    id: Optional[int] = None
    titulo: str
    autor: Optional[str] = None
    preco: Optional[float] = None
    categoria_id: Optional[int] = None


class EmprestimoSchema(Schema):
    id: Optional[int] = None
    data_emprestimo: date
    data_devolucao: Optional[date] = None
    livro_id: int


# Controllers
@api_controller("/categorias")
class ControleCategoriaView:

    @route.get("/", response=List[CategoriaSchema])
    def listar_categorias(self):
        return TbCategoria.objects.all()

    @route.get("/{id}", response=CategoriaSchema)
    def consultar_categoria(self, id: int):
        return get_object_or_404(TbCategoria, id=id)

    @route.post("/", response=CategoriaSchema)
    def criar_categoria(self, payload: CategoriaSchema):
        return TbCategoria.objects.create(**payload.dict(exclude={"id"}))

    @route.put("/{id}", response=CategoriaSchema)
    def atualizar_categoria(self, id: int, payload: CategoriaSchema):
        categoria = get_object_or_404(TbCategoria, id=id)
        for key, value in payload.dict(exclude={"id"}).items():
            setattr(categoria, key, value)
        categoria.save()
        return categoria

    @route.delete("/{id}")
    def deletar_categoria(self, id: int):
        get_object_or_404(TbCategoria, id=id).delete()
        return {"status": "deletado"}


@api_controller("/livros")
class ControleLivrosView:

    @route.get("/", response=List[LivroSchema])
    def listar_livros(self):
        return TbLivros.objects.all()

    @route.get("/{id}", response=LivroSchema)
    def consultar_livro(self, id: int):
        return get_object_or_404(TbLivros, id=id)

    @route.post("/", response=LivroSchema)
    def criar_livro(self, payload: LivroSchema):
        return TbLivros.objects.create(**payload.dict(exclude={"id"}))

    @route.put("/{id}", response=LivroSchema)
    def atualizar_livro(self, id: int, payload: LivroSchema):
        livro = get_object_or_404(TbLivros, id=id)
        for key, value in payload.dict(exclude={"id"}).items():
            setattr(livro, key, value)
        livro.save()
        return livro

    @route.delete("/{id}")
    def deletar_livro(self, id: int):
        get_object_or_404(TbLivros, id=id).delete()
        return {"status": "deletado"}


@api_controller("/emprestimos")
class ControleEmprestimosView:

    @route.get("/", response=List[EmprestimoSchema])
    def listar_emprestimos(self):
        return TbEmprestimos.objects.all()

    @route.get("/{id}", response=EmprestimoSchema)
    def consultar_emprestimo(self, id: int):
        return get_object_or_404(TbEmprestimos, id=id)

    @route.post("/", response=EmprestimoSchema)
    def criar_emprestimo(self, payload: EmprestimoSchema):
        return TbEmprestimos.objects.create(**payload.dict(exclude={"id"}))

    @route.put("/{id}", response=EmprestimoSchema)
    def atualizar_emprestimo(self, id: int, payload: EmprestimoSchema):
        emprestimo = get_object_or_404(TbEmprestimos, id=id)
        for key, value in payload.dict(exclude={"id"}).items():
            setattr(emprestimo, key, value)
        emprestimo.save()
        return emprestimo

    @route.delete("/{id}")
    def deletar_emprestimo(self, id: int):
        get_object_or_404(TbEmprestimos, id=id).delete()
        return {"status": "deletado"}