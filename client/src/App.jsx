import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import Form from './components/Form.jsx';
import ProjectList from './components/ProjectList.jsx';
import profile from './assets/profile.png';

function App() {
  const [projects, setProjects] = useState([]);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");
  const [isForm, setIsForm] = useState(false);

  useEffect(() => {
    // Fetch projects and videos when the component mounts or when isForm changes
    axios.get("/api/projects")
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        setError(error);
      });

    axios.get("/api/tutorials")
      .then(response => {
        setVideos(response.data);
      })
      .catch(error => {
        setError(error);
      });
  }, [isForm]); // Triggered when isForm changes

  const showForm = () => {
    setIsForm(!isForm);
  }

  return (
    <>
      <header>
  <div className="top">
    <button id="view-btn" onClick={showForm} className="button">
      {isForm ? 'projects' : 'add new'}  
    </button>
    <div className="rainbow-banner"></div> {/* Rainbow banner */}
    <button id="view-tutorials-btn" onClick={() => axios.get("/api/tutorials").then(response => setVideos(response.data)).catch(error => setError(error))} className="button">
      Tutorials
    </button>
    <img src={profile} alt={"profile image"} />
  </div>
  <div className="title">
    <h1>knit it!</h1>
  </div>
</header>

      <div className="view">
        {isForm ? <Form createProject /> : <ProjectList projects={projects} />}
      </div>

      <div>
        <ul>
          {videos.map(tutorial => (
            <li key={tutorial.id}>
              <p>Title: {tutorial.title}</p>
              <p>URL: {tutorial.url}</p>
              {/* Add more fields as needed */}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;