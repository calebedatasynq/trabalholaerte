from django.shortcuts import render
#aqui esta as views(crud)
# Create your views here.
from ninja import Schema
from ninja_extra import route, api_controller
from controle_aluno.models import Aluno, Endereco, Disciplina, Nota
from typing import List, Optional
from django.shortcuts import get_object_or_404


class AlunoSchema(Schema):
    matricula: str
    nome_aluno: str
    email: Optional[str] = None
    nome_mae: Optional[str] = None
    endereco_id: Optional[int] = None


@api_controller("/alunos")
class ControleAlunosView:

    # READ - listar todos
    @route.get("/", response=List[AlunoSchema])
    def consultar_alunos(self):
        return Aluno.objects.all()

    # READ - buscar um
    @route.get("/{matricula}", response=AlunoSchema)
    def consultar_aluno(self, matricula: str):
        return get_object_or_404(Aluno, matricula=matricula)

    # CREATE
    @route.post("/", response=AlunoSchema)
    def criar_aluno(self, payload: AlunoSchema):
        aluno = Aluno.objects.create(**payload.dict())
        return aluno

    # UPDATE
    @route.put("/{matricula}", response=AlunoSchema)
    def atualizar_aluno(self, matricula: str, payload: AlunoSchema):
        aluno = get_object_or_404(Aluno, matricula=matricula)
        for key, value in payload.dict().items():
            setattr(aluno, key, value)
        aluno.save()
        return aluno

    # DELETE
    @route.delete("/{matricula}")
    def deletar_aluno(self, matricula: str):
        aluno = get_object_or_404(Aluno, matricula=matricula)
        aluno.delete()
        return {"status": "deletado"}

class NotaSchema(Schema):
    id: Optional[int] = None
    aluno_id: int
    disciplina_id: int
    nota: Optional[float] = None


@api_controller("/notas")
class ControleNotasView:

    @route.get("/", response=List[NotaSchema])
    def listar_notas(self):
        return Nota.objects.all()

    @route.get("/{id}", response=NotaSchema)
    def consultar_nota(self, id: int):
        return get_object_or_404(Nota, id=id)

    @route.post("/", response=NotaSchema)
    def criar_nota(self, payload: NotaSchema):
        return Nota.objects.create(**payload.dict(exclude={"id"}))

    @route.put("/{id}", response=NotaSchema)
    def atualizar_nota(self, id: int, payload: NotaSchema):
        nota = get_object_or_404(Nota, id=id)
        for key, value in payload.dict(exclude={"id"}).items():
            setattr(nota, key, value)
        nota.save()
        return nota

    @route.delete("/{id}")
    def deletar_nota(self, id: int):
        get_object_or_404(Nota, id=id).delete()
        return {"status": "deletado"}