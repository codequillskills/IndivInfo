import React, { useEffect } from "react";
import { Routes, Route, useNavigate, Navigate, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Info from "./pages/Info";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ToastProvider } from './context/ToastContext';

const AppContent = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  useEffect(() => {
    const expirationTime = localStorage.getItem("expirationTime");

    if (!userId || !token) {
      if (window.location.pathname !== '/register') {
        navigate("/login");
      }
      return;
    }

    if (expirationTime) {
      const currentTime = new Date().getTime();
      if (currentTime >= parseInt(expirationTime, 10)) {
        localStorage.clear();
        navigate("/login");
      }
    }
  }, [navigate]);

  return (
    <Routes>
      {userId && token ? (
        <>
          <Route path="/info" element={<Info />} />
          <Route path="/*" element={<Navigate to="/info" />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/*" element={<Navigate to="/login" />} />
        </>
      )}
    </Routes>
  );
};

const App = () => {
  return (
    <ToastProvider>
      <BrowserRouter>
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <AppContent />
      </BrowserRouter>
    </ToastProvider>
  );
};

export default App;
