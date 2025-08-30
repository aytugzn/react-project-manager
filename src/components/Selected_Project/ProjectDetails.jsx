import { useState } from "react";
import Tasks from "./Tasks";
import PopupModal from "../PopupModal";

export default function ProjectDetails({
  showProjectDetails,
  handleProjectDelete,
  allTasks,
  setAllTasks,
  handleClear,
  invalid,
  setInvalid,
  handlePopup,
}) {
  const [inputValue, setInputValue] = useState("");

  const formattedDate = new Date(showProjectDetails.due_date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  function handleTaskAdd() {
    if (!inputValue.trim()) {
      setInvalid(true);
      setTimeout(() => {
        setInvalid(false);
      }, 2000);
      return;
    }
    setAllTasks((prev) => {
      return { ...prev, [showProjectDetails.id]: [...(prev[showProjectDetails.id] || []), inputValue] };
    });
    setInputValue("");
  }

  function handleInputChange(event) {
    const value = event.target.value;
    setInputValue(value);
  }

  return (
    <div className="w-[90%] flex flex-col gap-[10px]">
      <div className="flex items-center justify-between w-full">
        <h2 className="text-3xl font-bold text-stone-700">{showProjectDetails.title}</h2>
        <button onClick={handleProjectDelete} className="text-[19px] tracking-wide text-stone-700">
          Delete
        </button>
      </div>
      <p className="text-[19px] text-stone-400 mb-1">{formattedDate}</p>
      <p className="whitespace-pre-wrap text-[19px] text-stone-700">{showProjectDetails.description}</p>
      <hr className=" border-stone-300 my-3 " />
      <h3 className="text-2xl font-bold text-stone-700">Tasks</h3>
      <div className="flex gap-[15px] mb-5">
        <input
          onChange={handleInputChange}
          value={inputValue}
          type="text"
          className="w-[16rem] bg-stone-200 rounded-[2px] h-[1.7rem] p-2"
        />
        <button onClick={handleTaskAdd} className="text-[17px]">
          Add Task
        </button>
      </div>

      {!allTasks?.[showProjectDetails.id]?.length && (
        <>
          <p className="text-[19px] mb-4">This project does not have any tasks yet.</p>
          <PopupModal color={"red"} isTrue={invalid} handlePopup={handlePopup}>
            Task cannot be empty!
          </PopupModal>
        </>
      )}

      {allTasks?.[showProjectDetails.id]?.length > 0 && (
        <Tasks
          allTasks={allTasks}
          project={showProjectDetails}
          handleClear={handleClear}
          color={"red"}
          isTrue={invalid}
          handlePopup={handlePopup}
        />
      )}
    </div>
  );
}
