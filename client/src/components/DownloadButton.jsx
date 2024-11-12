import React from 'react';
import axios from 'axios';
import { useToast } from '../context/ToastContext';
import * as XLSX from 'xlsx';

const DownloadButton = () => {
  const { showToast } = useToast();

  const handleDownload = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        showToast('No token found', 'error');
        return;
      }

      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/usersContacts`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        const transformedData = response.data.map(contact => ({
          ...contact,
          tags: contact.tags ? contact.tags.join(', ') : ''
        }));

        const worksheet = XLSX.utils.json_to_sheet(transformedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Contacts");
        XLSX.writeFile(workbook, "contacts.xlsx");
        showToast('Contacts downloaded successfully!', 'success');
      }
    } catch (error) {
      if (error.response?.status === 401) {
        showToast('Please login to download contacts', 'error');
      } else if (error.response?.data?.message) {
        showToast(error.response.data.message, 'error');
      } else {
        showToast('Error downloading contacts. Please try again.', 'error');
      }
      console.error('Error downloading contacts:', error);
    }
  };

  return (
    <button
      onClick={handleDownload}
      className="bg-sky-500 hover:bg-sky-600 text-white font-semibold px-6 py-2 rounded-lg shadow-md 
               transition-all duration-300 ease-in-out transform hover:scale-105 flex items-center gap-2"
    >
      <svg 
        className="w-5 h-5"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
      </svg>
      Download Contacts
    </button>
  );
};

export default DownloadButton;
