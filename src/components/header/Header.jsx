const Header = ({ onExport }) => {
  return (
    <header
      className="flex flex-wrap bg-cyan-950 shadow-lg justify-between items-center rounded-3xl m-4 px-4 py-4"
      style={{ boxShadow: "0 4px 6px rgba(249, 251, 254, 0.2)" }}
    >
      <div className="flex items-center gap-3 flex-shrink-0 w-full sm:w-auto justify-center sm:justify-start mb-3 sm:mb-0">
        <img
          src="https://cdn-icons-png.flaticon.com/512/2830/2830305.png"
          alt="Logo"
          className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12"
        />
        <h1 className="mr-2 text-lg sm:text-xl md:text-2xl font-bold text-white whitespace-nowrap">
          شركة توصيل
        </h1>
      </div>

      <div className="ml-0 sm:ml-2 w-full sm:w-auto flex justify-center sm:justify-end">
        <button
          onClick={onExport}
          className="font-bold cursor-pointer bg-white text-cyan-950 border 
                     px-3 py-1 sm:px-4 sm:py-2 rounded-xl shadow 
                     hover:bg-white/50 hover:rounded-3xl hover:shadow-md hover:shadow-white/20 
                     transition-all duration-300 text-sm sm:text-base md:text-lg w-full sm:w-auto max-w-xs"
        >
          تحميل البيانات ⤓
        </button>
      </div>
    </header>
  );
};

export default Header;
