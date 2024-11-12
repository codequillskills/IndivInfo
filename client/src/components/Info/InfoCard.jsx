import React, { useState } from 'react';
import { FaEdit, FaTrash, FaSave, FaTimes, FaPhone, FaEnvelope, FaTag } from 'react-icons/fa';
import { MdDescription } from 'react-icons/md';
import axios from 'axios';
import { useToast } from '../../context/ToastContext';

const InfoCard = ({ id, name, phoneNumber, email, description, tags, onDelete, onEdit }) => {
  const { showToast } = useToast();
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [editData, setEditData] = useState({
    name,
    phoneNumber,
    email,
    description,
    tags: tags.join(', ')
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      setIsUpdating(true);
      const token = localStorage.getItem('token');
      if (!token) {
        showToast('Authentication required', 'error');
        return;
      }

      const tagsArray = editData.tags
        .split(',')
        .map(tag => tag.trim())
        .filter(tag => tag !== '');

      const response = await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/usersContacts/${id}`,
        {
          ...editData,
          tags: tagsArray
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 200) {
        showToast('Contact updated successfully', 'success');
        setIsEditing(false);
        if (onEdit) {
          onEdit(response.data);
        }
      }
    } catch (error) {
      showToast(error.response?.data?.message || 'Error updating contact', 'error');
      console.error('Error updating contact:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCancel = () => {
    setEditData({
      name,
      phoneNumber,
      email,
      description,
      tags: tags.join(', ')
    });
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        showToast('Authentication required', 'error');
        return;
      }

      const response = await axios.delete(
        `${import.meta.env.VITE_SERVER_URL}/api/usersContacts/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );

      if (response.status === 200) {
        showToast('Contact deleted successfully', 'success');
        if (onDelete) onDelete(id);
      }
    } catch (error) {
      showToast(error.response?.data?.message || 'Error deleting contact', 'error');
      console.error('Error deleting contact:', error);
    }
  };

  const getRandomGradient = () => {
    const gradients = [
      'from-purple-500 to-indigo-600',
      'from-emerald-400 to-cyan-500',
      'from-rose-400 to-pink-600',
      'from-amber-400 to-orange-500',
      'from-blue-400 to-violet-500'
    ];
    return gradients[Math.floor(Math.random() * gradients.length)];
  };

  const [gradient] = useState(getRandomGradient());

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300 overflow-hidden">
      {/* Enhanced Card Header */}
      <div className={`h-24 bg-gradient-to-r ${gradient} relative p-4`}>
        <div className="absolute -bottom-12 left-6">
          <div className="w-24 h-24 rounded-2xl bg-white p-2 shadow-lg transform rotate-45">
            <div className="w-full h-full rounded-xl flex items-center justify-center transform -rotate-45">
              <span className="text-2xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-green-500">
                {name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </span>
            </div>
          </div>
        </div>
        {!isEditing && (
          <div className="absolute top-4 right-4 flex space-x-2">
            <button
              onClick={() => setIsEditing(true)}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors duration-200"
            >
              <FaEdit className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors duration-200"
            >
              <FaTrash className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Enhanced Card Content */}
      <div className="pt-16 px-6 pb-6">
        {isEditing ? (
          <div className="space-y-4">
            <input
              type="text"
              name="name"
              value={editData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 truncate"
              placeholder="Name"
            />
            <div className="flex items-center space-x-2 group">
              <div className="p-2 rounded-lg bg-gray-50 group-focus-within:bg-blue-50 transition-colors duration-200">
                <FaPhone className="text-gray-400 group-focus-within:text-blue-500" />
              </div>
              <input
                type="text"
                name="phoneNumber"
                value={editData.phoneNumber}
                onChange={handleChange}
                className="flex-1 px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 truncate"
                placeholder="Phone Number"
              />
            </div>
            <div className="flex items-center space-x-2 group">
              <div className="p-2 rounded-lg bg-gray-50 group-focus-within:bg-blue-50 transition-colors duration-200">
                <FaEnvelope className="text-gray-400 group-focus-within:text-blue-500" />
              </div>
              <input
                type="email"
                name="email"
                value={editData.email}
                onChange={handleChange}
                className="flex-1 px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 truncate"
                placeholder="Email"
              />
            </div>
            <div className="flex items-start space-x-2 group">
              <div className="p-2 rounded-lg bg-gray-50 group-focus-within:bg-blue-50 transition-colors duration-200 mt-2">
                <MdDescription className="text-gray-400 group-focus-within:text-blue-500" />
              </div>
              <textarea
                name="description"
                value={editData.description}
                onChange={handleChange}
                className="flex-1 px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                placeholder="Description"
                rows="3"
              />
            </div>
            <div className="flex items-start space-x-2 group">
              <div className="p-2 rounded-lg bg-gray-50 group-focus-within:bg-blue-50 transition-colors duration-200 mt-2">
                <FaTag className="text-gray-400 group-focus-within:text-blue-500" />
              </div>
              <input
                type="text"
                name="tags"
                value={editData.tags}
                onChange={handleChange}
                className="flex-1 px-4 py-2 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 truncate"
                placeholder="Tags (comma-separated)"
              />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
              {name}
            </h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="p-2 rounded-lg bg-blue-50">
                  <FaPhone className="text-blue-500 w-4 h-4" />
                </div>
                <span className="text-gray-600 font-bold">{phoneNumber || '-'}</span>
              </div>
              <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="p-2 rounded-lg bg-purple-50">
                  <FaEnvelope className="text-purple-500 w-4 h-4" />
                </div>
                <span className="text-gray-600">{email || '-'}</span>
              </div>
              <div className="flex items-start space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                <div className="p-2 rounded-lg bg-green-50">
                  <MdDescription className="text-green-500 w-4 h-4" />
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
              </div>
              <div className="flex flex-wrap gap-2 mt-4">
                {tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 text-sm bg-gradient-to-r from-gray-50 to-gray-100 text-gray-600 rounded-full border border-gray-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Enhanced Action Buttons */}
        {isEditing && (
          <div className="flex justify-end space-x-3 mt-6">
            <button
              onClick={handleSave}
              disabled={isUpdating}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:from-green-600 hover:to-emerald-700 transition-all duration-200 disabled:opacity-50 flex items-center space-x-2"
            >
              <FaSave className="w-4 h-4" />
              <span>Save</span>
            </button>
            <button
              onClick={handleCancel}
              disabled={isUpdating}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-gray-500 to-gray-600 text-white hover:from-gray-600 hover:to-gray-700 transition-all duration-200 disabled:opacity-50 flex items-center space-x-2"
            >
              <FaTimes className="w-4 h-4" />
              <span>Cancel</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoCard;