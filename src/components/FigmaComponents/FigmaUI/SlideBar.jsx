import { MdClose } from "react-icons/md";
import { Link } from "react-router-dom";

// 1. Configuration for directions
const slideConfig = {
  left: {
    container: "top-0 left-0 h-full w-[80%] max-w-[300px]",
    transformOpen: "translate-x-0",
    transformClose: "-translate-x-full",
  },
  right: {
    container: "top-0 right-0 h-full w-[80%] max-w-[300px]",
    transformOpen: "translate-x-0",
    transformClose: "translate-x-full",
  },
  top: {
    container: "top-0 left-0 w-full h-[80%] ",
    transformOpen: "translate-y-0",
    transformClose: "-translate-y-full",
  },
  bottom: {
    container: "bottom-0 left-0 w-full h-[80%] ",
    transformOpen: "translate-y-0",
    transformClose: "translate-y-full",
  },
};

function SlideBar({
  isOpen,
  onClose,
  direction = "left",
  children,
  title = "Menu",
  className = "",
}) {
  // Get the config for the requested direction
  const config = slideConfig[direction] || slideConfig.left;

  return (
    <>
      {/* 1. Backdrop Overlay */}
      <div
        className={` fixed inset-0 bg-black/50 z-60 transition-opacity duration-300 ${
          isOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
        onClick={onClose}
      />

      {/* 2. The Sliding Drawer */}
      <div
        className={`
          fixed bg-white z-70 shadow-2xl transition-transform duration-300 ease-in-out
          ${config.container}
          ${isOpen ? config.transformOpen : config.transformClose}
          ${className} 
        `}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4">
          <Link className="text-xl font-serif tracking-[0.2em] uppercase">
            {title}
          </Link>
          <button
            onClick={onClose}
            className="text-2xl p-1 hover:bg-gray-100 rounded-full"
          >
            <MdClose />
          </button>
        </div>

        {/* Content Body */}
        <nav className=" h-[calc(100%-64px)] overflow-y-auto">{children}</nav>
      </div>
    </>
  );
}

export default SlideBar;
