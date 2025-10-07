import UserSidebar from "../components/UserNavbar";
import axios from "axios";
import { useState } from "react";
import { motion } from "framer-motion";

function EditBotInfo() {
  const [formData, setFormData] = useState({
    botName: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });
  
  const baseUrl = import.meta.env.VITE_API_URL;
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };
  
  async function changeBotName(e) {
    e.preventDefault();
    
    if (!formData.botName.trim()) {
      setMessage({ type: "error", text: "Bot name cannot be empty" });
      return;
    }
    
    setLoading(true);
    setMessage({ type: "", text: "" });
    
    try {
      const accessToken = localStorage.getItem('accessToken');
      
      if (!accessToken) {
        setMessage({ type: "error", text: "You are not authenticated. Please login again." });
        setLoading(false);
        return;
      }

      const response = await axios.put(`${baseUrl}/user/edit-bot-name`, formData, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
      
      setMessage({ type: "success", text: "Bot name updated successfully!" });
      setTimeout(() => {
        setFormData({ botName: "" });
      }, 2000);
    } catch (error) {
      setMessage({ 
        type: "error", 
        text: error.response?.data?.message || "Failed to update bot name" 
      });
    } finally {
      setLoading(false);
    }
  }
  
  return (
    <>
      <UserSidebar />
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-purple-50 lg:pl-20 overflow-x-hidden">
        <div className="p-4 lg:p-8">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex justify-center items-center"
          >
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-purple-900 mb-3 sm:mb-4 py-5">
              Edit Account Info
            </h1>
          </motion.div>
          
          <div className="flex justify-center items-center mt-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="w-full max-w-md"
            >
              <div className="bg-white rounded-2xl shadow-xl p-8 border border-purple-100">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg 
                      className="w-8 h-8 text-purple-600" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" 
                      />
                    </svg>
                  </div>
                  <p className="text-center text-gray-600 text-sm">
                    Update your bot's display name
                  </p>
                </div>

                <form onSubmit={changeBotName}>
                  <div className="mb-6">
                    <label 
                      htmlFor="botName" 
                      className="block text-gray-700 text-sm font-semibold mb-2"
                    >
                      Bot Name
                    </label>
                    <motion.input
                      whileFocus={{ scale: 1.01 }}
                      type="text"
                      id="botName"
                      name="botName"
                      value={formData.botName}
                      onChange={handleChange}
                      placeholder="Enter new bot name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent transition-all"
                      disabled={loading}
                    />
                  </div>
                  
                  {message.text && (
                    <motion.div 
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className={`mb-4 p-4 rounded-lg flex items-center gap-2 ${
                        message.type === "success" 
                          ? "bg-green-50 text-green-700 border border-green-200" 
                          : "bg-red-50 text-red-700 border border-red-200"
                      }`}
                    >
                      {message.type === "success" ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                      )}
                      <span className="font-medium">{message.text}</span>
                    </motion.div>
                  )}
                  
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    disabled={loading}
                    className="w-full bg-purple-900 text-white py-3 rounded-lg font-semibold hover:bg-purple-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Updating...
                      </span>
                    ) : (
                      "Update Bot Name"
                    )}
                  </motion.button>
                </form>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}

export default EditBotInfo;