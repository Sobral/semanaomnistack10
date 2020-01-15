import React from 'react';

import './global.css';
import './Sidebar.css'
import './App.css';

function App() {
  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do GitHub</label>
            <input name="github_username" id="github_username" required></input>
          </div>
          
          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input name="techs" id="techs" required></input>
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">latitude</label>
              <input name="latitude" id="latitude" required></input>
            </div>

            <div className="input-block">
              <label htmlFor="longitude">longitude</label>
              <input name="longitude" id="longitude" required></input>
            </div>

          </div>

          <button type="submit">Salvar</button>
        </form>
      </aside>
      <main>
        
      </main>
    </div>
  );
}

export default App;
