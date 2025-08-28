import { useState } from "react";

import AddProject from "./components/Selected_Project/AddProject";
import AsideBar from "./components/AsideBar";
import SelectedProject from "./components/SelectedProject";

function App() {
  const [showProjectDetails, setShowProjectDetails] = useState(null);

  const [showForm, setShowForm] = useState(false);
  const [projects, setProjects] = useState([]);
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    due_date: "",
  });

  function addProjectButton() {
    setShowForm(true);
  }

  function cancelProjectAdd() {
    setShowForm(false);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    if (name === "due_date") {
      const dateObj = new Date(value);
      const options = { month: "long", day: "numeric", year: "numeric" };
      const formatted = new Intl.DateTimeFormat("en-EN", options).format(dateObj);

      setNewProject((prevProjects) => {
        return { ...prevProjects, [name]: formatted };
      });
    } else {
      setNewProject((prevProjects) => {
        return { ...prevProjects, [name]: value };
      });
    }
  }

  function applyProjectAdd() {
    const { title, description, due_date } = newProject;
    if (!title || !description || !due_date) return;
    setProjects((prevProjects) => {
      return [...prevProjects, newProject];
    });
    setNewProject({
      title: "",
      description: "",
      due_date: "",
    });
    setShowForm(false);
  }

  function handleProjectSelect(event) {
    const project = projects.find((project) => project.title.toLowerCase().replace(/\s+/g, "") === event.target.id);
    setShowProjectDetails(project);
    setShowForm(false);
  }

  return (
    <>
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
        >
          <AddProject handleChange={handleChange} inputPref={"input"} title="Title" type="text" />
          <AddProject handleChange={handleChange} inputPref={"textarea"} title="Description" />
          <AddProject handleChange={handleChange} inputPref={"input"} title="Due Date" type="date" />
        </SelectedProject>
      </div>
    </>
  );
}

export default App;
