import React, { useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form.jsx';
import ProjectList from './components/ProjectList.jsx';
import profile from './assets/profile.png';
import Tutorials from './components/Tutorials.jsx';
import Error404 from './components/Error404.jsx';
import { Route, Routes, NavLink } from 'react-router-dom';

function App() {
  const [projects, setProjects] = useState([]);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState("");
  const [isForm, setIsForm] = useState(false);
  const [isTutorial, setIsTutorial] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    fetchProjects();
    fetchTutorials();
  }, [isForm, isTutorial]); // Fetch projects and tutorials whenever isForm or isTutorial changes

  function fetchProjects() {
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
  }

  const fetchTutorials = () => {
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
      .catch(err => {
        setError(err.message);
      });
  };

  const showForm = () => {
    setIsForm(!isForm);
  };

  const showTutorial = () => {
    setIsTutorial(!isTutorial);
  };

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
  };

  return (
    <>
      <header>
        <div className="top">
          <NavLink to="/form">Projects</NavLink>
          <NavLink to="/tutorials">Tutorials</NavLink>
          <img src={profile} alt="profile image" />
        </div>
        <div className="title">
          <h1>knit it!</h1>
        </div>
      </header>

      <Routes>
        <Route path="/form" element={isForm ? <Form createProject /> : <ProjectList projects={projects} />} />
        <Route path="/tutorials" element={<Tutorials />} />
        <Route path="*" element={<Error404/>}/> {/* Fixed */}
      </Routes>
    </>
  );
}

export default App;