import { useState } from "react";
import ProjectDetails from "./Selected_Project/ProjectDetails";
import NoProjectSelected from "./NoProjectSelected";

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
  invalid,
  handlePopup,
}) {
  const [allTasks, setAllTasks] = useState({});

  function handleClear(index) {
    setAllTasks((prev) => {
      return { ...prev, [showProjectDetails.id]: prev[showProjectDetails.id].filter((_, i) => i !== index) };
    });
  }

  function handleProjectDelete() {
    setAllTasks((prevTasks) => {
      const { [showProjectDetails.id]: removed, ...remaining } = prevTasks;
      return { ...remaining };
    });

    setProjects((prevProjects) => {
      return prevProjects.filter((project) => project.id !== showProjectDetails.id);
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

          <div
            className={`mt-10 py-3 px-3 border border-red-700 bg-red-300 rounded text-red-700 flex justify-between transition-all duration-500 ease-in-out ${
              invalid ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
            }`}
          >
            <p className="inline-block">Please fill up all fields</p>
            <button onClick={handlePopup}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-x"
                viewBox="0 0 16 16"
              >
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
              </svg>
            </button>
          </div>
        </div>
      )}
      {!showForm && showProjectDetails === null && <NoProjectSelected addProject={addProject} />}
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
