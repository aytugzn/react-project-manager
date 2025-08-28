export default function AddProject({ title, type, handleChange, textarea }) {
  return (
    <>
      <label className="my-8 text-start text-3xl font-bold text-stone-600">{title}</label>
      {textarea ? (
        <textarea
          onChange={handleChange}
          name={title.toLowerCase().replace(/\s+/g, "_")}
          style={{
            boxSizing: "border-box",
            backgroundColor: "#ECECEC",
            borderBottom: "solid 2px #D4D4D4",
            height: "5rem",
            resize: "none",
            padding: "10px",
          }}
          required
        ></textarea>
      ) : (
        <input
          onChange={handleChange}
          name={title.toLowerCase().replace(/\s+/g, "_")}
          style={{
            boxSizing: "border-box",
            backgroundColor: "#ECECEC",
            borderBottom: "solid 2px #D4D4D4",
            height: "3rem",
            padding: "10px",
          }}
          type={type}
          required
        />
      )}
    </>
  );
}
