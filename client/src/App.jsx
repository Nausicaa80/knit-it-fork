import React, { useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form.jsx';
import ProjectList from './components/ProjectList.jsx';
import profile from './assets/profile.png';

function App() {
  const [projects, setProjects] = useState([]);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");
  const [isForm, setIsForm] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    // Fetch projects and videos when the component mounts or when isForm changes
    fetch("/api/projects")
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        return response.json();
      })
      .then(data => {
        setProjects(data);
      })
      .catch(error => {
        setError(error.message);
      });

    fetch("/api/tutorials")
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch tutorials');
        }
        return response.json();
      })
      .then(data => {
        setVideos(data);
      })
      .catch(error => {
        setError(error.message);
      });
  }, [isForm]); // Triggered when isForm changes

  const showForm = () => {
    setIsForm(!isForm);
  }

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  }

  return (
    <>
      <header>
        <div className="top">
          <button id="view-btn" onClick={showForm} className="button">
            {isForm ? 'projects' : 'add new'}  
          </button>
          <div className="rainbow-banner"></div> {/* Rainbow banner */}
          <button id="view-tutorials-btn" onClick={() => setSelectedVideo(null)} className="button">
            Tutorials
          </button>
          <img src={profile} alt={"profile image"} />
        </div>
        <div className="title">
          <h1>knit it!</h1>
        </div>
      </header>

      <div className="view">
        {isForm ? <Form createProject /> : selectedVideo ? (
          <iframe 
            width="560" 
            height="315" 
            src={selectedVideo.url} 
            title={selectedVideo.title}
            frameBorder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowFullScreen
          ></iframe>
        ) : (
          <ProjectList projects={projects} />
        )}
      </div>

      <div>
        <ul>
          {videos.map(tutorial => (
            <li key={tutorial.id} onClick={() => handleVideoClick(tutorial)}>
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