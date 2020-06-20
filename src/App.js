import React, { useState, useEffect } from "react";
import api from './services/api';
import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title: `Repositório ${Date.now()}`,
      url: 'https://github.com/marinamsm/gostack-conceitos-nodejs',
      techs: ['Node', 'Express']
    });

    if(response.data) {
      setRepositories([...repositories, response.data]);
    }
  }

  async function handleRemoveRepository(id) {
    api.delete(`/repositories/${id}`).then(response => {
      if (response.status !== 204) {
        alert('Something went wrong :(');

        return;
      }

      const newReposList = repositories.filter(repo => repo.id !== id);
      setRepositories(newReposList);
    })
  }

  useEffect(() => {
    api.get('/repositories').then(response => {
      if (response.data) {
        setRepositories(response.data);
      }
    });
  }, [])

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            {repository.title}

            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
