import { useState } from "react";

import AddProject from "./components/Selected_Project/AddProject";
import AsideBar from "./components/AsideBar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [showProjectDetails, setShowProjectDetails] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [invalid, setInvalid] = useState(false);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    due_date: "",
    id: "",
  });

  function addProjectButton() {
    setShowForm(true);
  }

  function cancelProjectAdd() {
    setShowForm(false);
  }

  function handlePopup() {
    setInvalid(false);
  }

  function handleChange(event) {
    const { name, value } = event.target;
      setNewProject((prevProjects) => {
        return { ...prevProjects, [name]: value };
      })
  }

  function applyProjectAdd() {
    const { title, description, due_date } = newProject;
    if (!title || !description || !due_date || title.trim() === "" || description.trim() === "") {
      setInvalid(true);
      setTimeout(() => {
        setInvalid(false);
      }, 3000);
      return;
    }
    const projectWithId = { ...newProject, id: Date.now() };
    setProjects((prevProjects) => {
      return [...prevProjects, projectWithId];
    });
    setNewProject({
      title: "",
      description: "",
      due_date: "",
      id: "",
    });
    setShowForm(false);
  }

  function handleProjectSelect(event) {
    const project = projects.find((project) => project.id === Number(event.target.id));
    setShowProjectDetails(project);
    setShowForm(false);
  }

  return (
    <div className="flex">
      <AsideBar handleProjectSelect={handleProjectSelect} addProject={addProjectButton} projects={projects} />

      <SelectedProject
        showProjectDetails={showProjectDetails}
        setShowProjectDetails={setShowProjectDetails}
        addProject={addProjectButton}
        cancelProject={cancelProjectAdd}
        saveProject={applyProjectAdd}
        showForm={showForm}
        setProjects={setProjects}
        invalid={invalid}
        handlePopup={handlePopup}
      >
        <AddProject handleChange={handleChange} title="Title" type="text" />
        <AddProject handleChange={handleChange} textarea title="Description" />
        <AddProject handleChange={handleChange} title="Due Date" type="date" />
      </SelectedProject>
    </div>
  );
}

export default App;
