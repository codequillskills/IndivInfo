import React, { useState, useEffect } from "react";
import axios from "axios";
import InfoCard from "./InfoCard";
import { FaUserAltSlash } from "react-icons/fa";
import { motion } from "framer-motion";

const InfoContainer = ({ searchQuery, refreshTrigger }) => {
  const [details, setDetails] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      if (!token) {
        setError('No authentication token found');
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
        console.log('Contacts fetched:', response.data);
        setDetails(response.data);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      if (error.response?.status === 401) {
        setError('Please login to view contacts');
      } else {
        setError('Error fetching contacts');
      }
    }
  };

  useEffect(() => {
    fetchData();
  }, [refreshTrigger]);

  const handleContactDeleted = (deletedId) => {
    setDetails(prev => prev.filter(contact => contact._id !== deletedId));
  };

  const handleContactEdited = (updatedContact) => {
    setDetails(prev => prev.map(contact => 
      contact._id === updatedContact._id ? updatedContact : contact
    ));
  };

  const handleContactAdded = (newContact) => {
    setDetails(prev => [...prev, newContact]);
  };

  const sortedDetails = details.sort((a, b) => {
    const nameComparison = a.name.localeCompare(b.name);
    if (nameComparison !== 0) {
      return nameComparison;
    }
    return a.phoneNumber.localeCompare(b.phoneNumber);
  });

  const filteredItems = sortedDetails.filter((person) => {
    if (!searchQuery) return true;
    
    const searchLower = searchQuery.toLowerCase();
    return (
      String(person._id).toLowerCase().includes(searchLower) ||
      person.name.toLowerCase().includes(searchLower) ||
      person.phoneNumber.toLowerCase().includes(searchLower) ||
      person.email.toLowerCase().includes(searchLower) ||
      person.description.toLowerCase().includes(searchLower) ||
      (person.tags && person.tags.some(tag => tag.toLowerCase().includes(searchLower)))
    );
  });

  return (
    <main className="flex-grow bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 p-4 overflow-y-auto flex items-center">
      {error && (
        <div className="text-red-500 text-center p-4">{error}</div>
      )}
      {filteredItems.length === 0 ? (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full flex flex-col items-center justify-center text-white"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, -5, 0]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse"
            }}
          >
            <FaUserAltSlash className="w-24 h-24 mb-4 opacity-80" />
          </motion.div>
          <h2 className="text-3xl font-bold mb-2">No Contacts Found</h2>
          <p className="text-lg text-gray-100 opacity-90">
            {searchQuery ? "Try adjusting your search criteria" : "Start by adding your first contact"}
          </p>
        </motion.div>
      ) : (
        <div className="grid gap-4 grid-cols-4 mq450:grid-cols-1 mq750:grid-cols-2 w-full">
          {filteredItems.map((item) => (
            <InfoCard
              key={item._id}
              id={item._id}
              name={item.name}
              phoneNumber={item.phoneNumber}
              email={item.email}
              description={item.description}
              tags={item.tags || []}
              onDelete={handleContactDeleted}
              onEdit={handleContactEdited}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default InfoContainer;
