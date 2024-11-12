import React, { useState } from 'react';
import axios from 'axios';
import { useToast } from '../../context/ToastContext';

const AddInfoButton = ({ onContactAdded }) => {
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phoneNumber: '',
    email: '',
    description: '',
    tags: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        showToast('No token found', 'error');
        return;
      }

      const tagsArray = formData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== '');

      const tokenPayload = JSON.parse(atob(token.split('.')[1]));
      const userId = tokenPayload.userId;

      const response = await axios.post(
        `${import.meta.env.VITE_SERVER_URL}/api/usersContacts`,
        {
          ...formData,
          tags: tagsArray,
          user: userId
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 201) {
        showToast('Contact added successfully!', 'success');
        setIsModalOpen(false);
        setFormData({
          name: '',
          phoneNumber: '',
          email: '',
          description: '',
          tags: ''
        });
        if (onContactAdded) onContactAdded(response.data);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        showToast('Please login to add contacts', 'error');
      } else if (error.response?.data?.message) {
        showToast(error.response.data.message, 'error');
      } else {
        showToast('Error adding contact. Please try again.', 'error');
      }
      console.error('Error adding contact:', error);
    }
  };

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
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
          <path d="M12 4v16m8-8H4" />
        </svg>
        Add Info
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4 z-50">
          <div className="bg-white rounded-lg p-8 w-full max-w-md shadow-xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Add New Contact</h2>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 px-4 py-2.5 transition duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 px-4 py-2.5 transition duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 px-4 py-2.5 transition duration-200"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 px-4 py-2.5 min-h-[100px] transition duration-200"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleChange}
                  className="mt-1 block w-full rounded-md border-2 border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500 px-4 py-2.5 transition duration-200"
                  placeholder="family, friend, work"
                />
              </div>
              <div className="flex justify-end space-x-4 mt-8">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-200 text-gray-700 px-6 py-2.5 rounded-md hover:bg-gray-300 transition duration-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-sky-500 text-white px-6 py-2.5 rounded-md hover:bg-sky-600 transition duration-200 font-medium"
                >
                  Add Contact
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddInfoButton;
