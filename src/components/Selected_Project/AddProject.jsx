export default function AddProject({ inputPref, title, type, handleChange }) {
  const Input = inputPref;

  return (
    <>
      <label className="my-8 text-start text-3xl font-bold text-stone-600">{title}</label>
      {Input === "textarea" ? (
        <Input
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
        ></Input>
      ) : (
        <Input
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
