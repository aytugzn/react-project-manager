import clsx from "clsx";

export default function PopupModal({ color, isTrue, handlePopup, children }) {
  const colorMap = {
    red: {
      border: "border-red-700",
      bg: "bg-red-300",
      text: "text-red-700",
    },
    green: {
      border: "border-green-700",
      bg: "bg-green-300",
      text: "text-green-700",
    },
  };

  const classes = colorMap[color];

  return (
    <div
      className={clsx(
        "py-3 px-3 border rounded flex justify-between transition-all duration-500 ease-in-out",
        classes.border,
        classes.bg,
        classes.text,
        isTrue ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
      )}
    >
      <p className="inline-block">{children}</p>
      <button onClick={handlePopup}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          className="bi bi-x"
          viewBox="0 0 16 16"
        >
          <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
        </svg>
      </button>
    </div>
  );
}
