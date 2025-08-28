import logo from "../assets/no-projects.png";

export default function NoProjectSelected({ addProject }) {
  return (
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
  );
}
