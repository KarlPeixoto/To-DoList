import React, { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [tarefa, setTarefa] = useState([]);
  const [titulo, setTitulo] = useState("");

  const listar = () =>
    axios.get("http://localhost:8080/tarefas").then(res => setTarefa(res.data));

  const criar = () =>
    axios.post("http://localhost:8080/tarefas", { titulo, completo: false }).then(listar);

  const toggleTarefa = (tarefa) =>
    axios.put(`http://localhost:8080/tarefas/${tarefa.id}`, {
      ...completo,
      completo: !tarefa.completo,
    }).then(listar);

  const deleteTarefa = (id) =>
    axios.delete(`http://localhost:8080/tarefas/${id}`).then(listar);

  useEffect(() => {
    listar();
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h1>To-Do List</h1>
      <input value={titulo} onChange={e => setTitulo(e.target.value)} />
      <button onClick={criar}>Adicionar</button>
      <ul>
        {tarefa.map(tarefa => (
          <li key={tarefa.id}>
            <span
              onClick={() => toggleTarefa(tarefa)}
              style={{
                textDecoration: tarefa.completo ? "line-through" : "none",
                cursor: "pointer",
              }}
            >
              {tarefa.titulo}
            </span>
            <button onClick={() => deleteTarefa(tarefa.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
