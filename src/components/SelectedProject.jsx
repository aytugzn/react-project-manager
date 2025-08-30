import { useState } from "react";
import ProjectDetails from "./Selected_Project/ProjectDetails";
import NoProjectSelected from "./NoProjectSelected";
import PopupModal from "./PopupModal";

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
  setInvalid,
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
        <>
          <div className="w-[100%] flex flex-col my-10">
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
          <PopupModal color={"red"} isTrue={invalid} handlePopup={handlePopup}>
            Please fill up all fields
          </PopupModal>
        </>
      )}
      {!showForm && showProjectDetails === null && <NoProjectSelected addProject={addProject} />}
      {!showForm && showProjectDetails !== null && (
        <ProjectDetails
          showProjectDetails={showProjectDetails}
          handleProjectDelete={handleProjectDelete}
          allTasks={allTasks}
          setAllTasks={setAllTasks}
          handleClear={handleClear}
          invalid={invalid}
          setInvalid={setInvalid}
          handlePopup={handlePopup}
        />
      )}
    </main>
  );
}
