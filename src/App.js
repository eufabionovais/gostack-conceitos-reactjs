import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    api.get("repositories").then(response => {
      setRepositories(response.data);
    })
  }, [])

  async function handleAddRepository() {
    const newRepository = {
      "title": "Desafio " + Date.now(),
      "url": "http://www.github.com/repositorio",
      "techs": ["ReactJs"]
    }

    const response = await api.post("/repositories", newRepository);

    var repository = response.data;

    setRepositories([...repositories, repository]);
    //console.log(projects)
  }

  async function handleRemoveRepository(id) {
    await api.delete("/repositories/" + id);

    const repositoriesListUpdated = repositories.filter(repositorie => repositorie.id !== id);
    setRepositories(repositoriesListUpdated)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map((repositorie) => {
            return (
              <li key={repositorie.id}>
                {repositorie.title}

                <button onClick={() => handleRemoveRepository(repositorie.id)}>
                  Remover
              </button>
              </li>
            )
          })
        }

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
