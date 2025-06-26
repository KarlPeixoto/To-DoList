package back.site.todolist.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import back.site.todolist.domain.Tarefa;

public interface TarefaRepository extends JpaRepository<Tarefa, Long> {

}
