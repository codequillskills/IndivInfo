import { useState } from "react";
import Header from "../components/Header";
import InfoContainer from "../components/Info/InfoContainer";
import Footer from "../components/Footer";
import SearchBar from "../components/SearchBar";
import AddInfoButton from "../components/Info/AddInfoButton";
import DownloadButton from "../components/DownloadButton";

const Info = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleContactAdded = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-1 flex flex-col bg-gradient-to-br from-emerald-400 via-indigo-500 to-fuchsia-600">
        <div className="flex flex-col sm:flex-row justify-between items-center px-4 sm:px-6 py-4 gap-4">
          <div className="w-full sm:w-2/3">
            <SearchBar onSearch={setSearchQuery} />
          </div>
          <div className="flex items-center gap-2">
            <AddInfoButton onContactAdded={handleContactAdded} />
            <DownloadButton/>
          </div>
        </div>
        <InfoContainer searchQuery={searchQuery} refreshTrigger={refreshTrigger} />
      </div>
      <Footer />
    </div>
  );
};

export default Info;