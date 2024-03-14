import { useEffect, useState } from 'react';
import './App.css';
import Form from './components/Form.jsx';
import ProjectList from './components/ProjectList.jsx';
import profile from './assets/profile.png';

function App() {
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState("");
  const [isForm, setIsForm] = useState(false);
  

  useEffect(() => {
    fetch("/api/projects")
      .then(res => res.json())
      .then(data => {
        setProjects(data);
      })
      .catch(error => {
        setError(error)
      });
  }, [isForm]);

  const showForm = () => [
    setIsForm(!isForm)
  ]


  return (
    <>
      <header>
        
        <div className="top">
          <button id="view-btn" onClick={showForm}>
            {isForm ? 'projects' : 'add new'}  
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
    </>
  )
}

export default App
