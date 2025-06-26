import React, { useEffect, useState } from "react";
import axios from "axios";
import './App.css'

function App() {
  const [tarefa, setTarefa] = useState([]);
  const [titulo, setTitulo] = useState("");

  const listar = () =>
    axios.get("http://localhost:8080/tarefas").then(res => setTarefa(res.data));

  const criar = () =>
    axios.post("http://localhost:8080/tarefas", { titulo, completo: false }).then(listar);

  const toggleTarefa = (tarefa) =>
    axios.put(`http://localhost:8080/tarefas/${tarefa.id}`, {
      titulo: tarefa.titulo,
      completo: !tarefa.completo,
    }).then(listar);

  const deleteTarefa = (id) =>
    axios.delete(`http://localhost:8080/tarefas/${id}`).then(listar);

  useEffect(() => {
    listar();
  }, []);

  return (
  <>
    <div className="container">
      <h1>To-Do List</h1>
      <input value={titulo} onChange={e => setTitulo(e.target.value)} placeholder="Digite sua tarefa" className="input" />
      <button onClick={criar} className="button">Adicionar</button>
        {tarefa.map(tarefa => (
          <ul className="list" key={tarefa.id}>
            <span
              className="tarefa"
              onClick={() => toggleTarefa(tarefa)}
              style={{
                textDecoration: tarefa.completo ? "line-through" : "none",
              }}
              >
              {tarefa.titulo}
            </span>
            <button className="buttonDel" onClick={() => deleteTarefa(tarefa.id)}>❌</button>
          </ul>
        ))}
    </div>
    <div className="footer">
        <span>Criado por Mateus Karl Peixoto</span>
        <strong>Jornada um site por dia</strong>
        <a href="https://github.com/KarlPeixoto/To-DoList.git" target="_blank" rel="noopener noreferrer">
        https://github.com/KarlPeixoto/To-DoList.git
        </a>
    </div>
  </>
    
  );
}

export default App;
