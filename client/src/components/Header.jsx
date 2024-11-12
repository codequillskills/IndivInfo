import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [navItem, setNavItem] = useState("info");
  const navigate = useNavigate();

  useEffect(() => {
    console.log(navItem);
  }, [navItem]);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const handleNavigation = (item) => {
    setNavItem(item);
    if (item === "info") {
      navigate("/info");
    } else if (item === "logout") {
      handleLogout();
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <div className="bg-[#242332] text-white p-3 flex justify-between items-center">
        <h1 className="text-center font-bold text-3xl">IndivInfo</h1>

        {/* Desktop Navigation */}
        <div className="flex flex-wrap space-x-10 mq450:hidden">
          <button
            className="shadow-md p-2 bg-[#179749] rounded-lg uppercase"
            onClick={() => handleNavigation("info")}
          >
            Info
          </button>
          <button
            className="shadow-md p-2 bg-[#179749] rounded-lg uppercase"
            onClick={() => handleNavigation("logout")}
          >
            Logout
          </button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="mq450:block hidden" onClick={toggleMenu}>
          <div className="shadow-md p-2 rounded-lg flex flex-col space-y-2 cursor-pointer">
            {menuOpen ? (
              <span className="text-3xl font-bold">✕</span>
            ) : (
              <>
                <span className="w-8 h-0.5 bg-white"></span>
                <span className="w-8 h-0.5 bg-white"></span>
                <span className="w-8 h-0.5 bg-white"></span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Dropdown */}
      {menuOpen && (
        <div className="flex flex-col items-center bg-[#242332] text-white p-3 space-y-3 mq450:block hidden">
          <button
            className="shadow-md p-2 bg-[#179749] rounded-lg uppercase w-full text-center"
            onClick={() => handleNavigation("info")}
          >
            Info
          </button>
          <button
            className="shadow-md p-2 bg-[#179749] rounded-lg uppercase w-full text-center"
            onClick={() => handleNavigation("logout")}
          >
            Logout
          </button>
        </div>
      )}
    </>
  );
};

export default Header;
