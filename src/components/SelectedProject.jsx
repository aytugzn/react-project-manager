import { useState } from "react";
import ProjectDetails from "./Selected_Project/ProjectDetails";
import logo from "/logo.png";

export default function SelectedProject({
  children,
  showForm,
  addProject,
  cancelProject,
  saveProject,
  showProjectDetails,
  handleProjectDelete,
  setProjects,
  setShowProjectDetails,
}) {
  const [allTasks, setAllTasks] = useState({});

  function handleClear(index) {
    setAllTasks((prev) => {
      return { ...prev, [showProjectDetails.title]: prev[showProjectDetails.title].filter((_, i) => i !== index) };
    });
  }

  function handleProjectDelete() {
    setAllTasks((prevTasks) => {
      const { [showProjectDetails.title]: removed, ...remaining } = prevTasks;
      return { ...remaining };
    });

    setProjects((prevProjects) => {
      return prevProjects.filter(
        (project) => project.title.trim().toLowerCase() !== showProjectDetails.title.trim().toLowerCase()
      );
    });
    setShowProjectDetails(null);
  }

  let mainClass = "flex w-3/4 flex-col mt-10 pt-20 ";

  if (!showForm && showProjectDetails !== null) {
    mainClass += "px-10 ";
  } else if (!showForm) {
    mainClass += "items-center";
  } else if (showForm) {
    mainClass += "px-10 ";
  }

  return (
    <main className={mainClass}>
      {showForm && (
        <div className="w-[100%] flex flex-col ">
          <p className="cursor-default justify-end flex gap-3">
            <button onClick={cancelProject} className="text-[19px] py-2 px-7 font-semibold">
              Cancel
            </button>
            <button
              type="submit"
              onClick={saveProject}
              className="py-2 px-7 bg-stone-900 text-white rounded-md text-[19px] font-semibold"
            >
              Save
            </button>
          </p>

          {children}
        </div>
      )}
      {!showForm && showProjectDetails === null && (
        <>
          <img src={logo} className="w-20 h-20" />
          <h1 className="my-8 text-center text-3xl font-bold text-stone-600">No Project Selected</h1>
          <p className="text-1xl text-stone-400 font-semibold text-[19px]">
            Select a project or get started with a new one
          </p>
          <button
            onClick={addProject}
            className="m-10 p-3 px-4 bg-stone-800 text-stone-400 rounded-md text-[18px] hover:text-stone-300 cursor-pointer"
          >
            Create new project
          </button>
        </>
      )}
      {!showForm && showProjectDetails !== null && (
        <ProjectDetails
          showProjectDetails={showProjectDetails}
          handleProjectDelete={handleProjectDelete}
          allTasks={allTasks}
          setAllTasks={setAllTasks}
          handleClear={handleClear}
        />
      )}
    </main>
  );
}
