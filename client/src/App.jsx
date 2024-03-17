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

  const handleFetchTutorials = () => {
    axios.get("/api/tutorials")
      .then(response => {
        setVideos(response.data);
      })
      .catch(error => {
        setError(error);
      });
  }

  useEffect(() => {
    // Fetch projects
    axios.get("/api/projects")
      .then(response => {
        setProjects(response.data);
      })
      .catch(error => {
        setError(error);
      });
    
    // Fetch videos
    handleFetchTutorials();
  }, [isForm]);

  const showForm = () => {
    setIsForm(!isForm);
  }

  useEffect(() => {
    // Fetch videos from the backend
    axios.get("/api/tutorials")
      .then(response => {
        setVideos(response.data);
      })
      .catch(error => {
        setError(error);
      });
  }, []);

  return (
    <>
      <header>
        <div className="top">
          <button id="view-btn" onClick={showForm}>
            {isForm ? 'projects' : 'add new'}  
          </button>
          <button id="view-tutorials-btn" onClick={handleFetchTutorials}>
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