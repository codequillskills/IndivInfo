import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-r from-red-400 to-red-600 p-4 shadow-lg flex justify-center items-center">
      <h1 className="text-2xl text-center text-white">
        &copy; CodeQuillSkills {currentYear}
      </h1>
    </footer>
  );
};

export default Footer;
