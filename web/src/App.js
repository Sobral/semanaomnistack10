import React, {useState, useEffect} from 'react';
import api from './services/api';

import './global.css';
import './Sidebar.css'
import './App.css';
import './Main.css';

function App() {
  const [github_username, setGithubUsername] = useState('');
  const [techs, setTechs] = useState('');

  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  async function handleAddDev(e){
    e.preventDefault();
    const response = await api.post('/devs', {
      github_username: github_username,
      techs: techs,
      latitude: latitude,
      longitude: longitude,
    });

    console.log(response.data);
    setGithubUsername('');
    setTechs('');
    setLongitude('');
    setLatitude('');
  }

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
      const {latitude, longitude} = position.coords;
      setLatitude(latitude);
      setLongitude(longitude);
      },
      (err)=>{
        console.log(err);
      },
      {
        timeout: 30000,
      }
    )
  }, []);

  return (
    <div id="app">
      <aside>
        <strong>Cadastrar</strong>
        <form onSubmit={handleAddDev}>
          <div className="input-block">
            <label htmlFor="github_username">Usuário do GitHub</label>
            <input name="github_username" id="github_username" required
            value={github_username}
            onChange={e => setGithubUsername(e.target.value)}
            
            ></input>
          </div>
          
          <div className="input-block">
            <label htmlFor="techs">Tecnologias</label>
            <input name="techs" id="techs" required
            value={techs}
            onChange={e => setTechs(e.target.value)}></input>
          </div>

          <div className="input-group">
            <div className="input-block">
              <label htmlFor="latitude">latitude</label>
              <input type="number" name="latitude" id="latitude" required value={latitude} onChange={e => setLatitude(e.target.value)}></input>
            </div>

            <div className="input-block">
              <label htmlFor="longitude">longitude</label>
              <input 
                type="number" 
                name="longitude" 
                id="longitude" required 
                value={longitude}
                onChange={e => setLongitude(e.target.value)}
                ></input>
            </div>

          </div>

          <button type="submit">Salvar</button>
        </form>
      </aside>
      <main>
        <ul>
          <li className="dev-item">
            <header>
              <img src="https://avatars1.githubusercontent.com/u/1907108?v=4" alt="Luciano Sobral"></img>
              <div className="user-info">
                <strong>Luciano Sobral</strong>
                <span>React, Nodejs, Python</span>

              </div>
            </header>
            <p>Desenvolvedor em progresso de Fullstack para criar MVPs</p>
            <a href="https://github.com/Sobral">Acessar perfil no Github</a>
          </li>
          <li className="dev-item">
            <header>
              <img src="https://avatars1.githubusercontent.com/u/1907108?v=4" alt="Luciano Sobral"></img>
              <div className="user-info">
                <strong>Luciano Sobral</strong>
                <span>React, Nodejs, Python</span>

              </div>
            </header>
            <p>Desenvolvedor em progresso de Fullstack para criar MVPs</p>
            <a href="https://github.com/Sobral">Acessar perfil no Github</a>
          </li >
          <li className="dev-item">
            <header>
              <img src="https://avatars1.githubusercontent.com/u/1907108?v=4" alt="Luciano Sobral"></img>
              <div className="user-info">
                <strong>Luciano Sobral</strong>
                <span>React, Nodejs, Python</span>

              </div>
            </header>
            <p>Desenvolvedor em progresso de Fullstack para criar MVPs</p>
            <a href="https://github.com/Sobral">Acessar perfil no Github</a>
          </li>

          <li className="dev-item">
            <header>
              <img src="https://avatars1.githubusercontent.com/u/1907108?v=4" alt="Luciano Sobral"></img>
              <div className="user-info">
                <strong>Luciano Sobral</strong>
                <span>React, Nodejs, Python</span>
              </div>
            </header>
            <p>Desenvolvedor em progresso de Fullstack para criar MVPs</p>
            <a href="https://github.com/Sobral">Acessar perfil no Github</a>
          </li>
        
        </ul>
      </main>
    </div>
  );
}

export default App;
