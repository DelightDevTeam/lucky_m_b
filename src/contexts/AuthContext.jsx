import { createContext, useEffect, useState, useMemo } from "react";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../hooks/baseURL";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
  auth: null,
  user: null,
  updateProfile: () => {},
  updateLanguage: () => {},
});

const AuthContextProvider = ({ children }) => {
  const token = localStorage.getItem("token");
  const { data: userData, error } = useFetch(BASE_URL + "/user");
  const [profile, setProfile] = useState(null);
  const [language, setLanguage] = useState("en");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  useEffect(() => {
    if (userData) {
      setProfile(userData);
    }
  }, [userData]);
  
  useEffect(() => {
    if (error) {
      console.error("Failed to fetch user data:", error);
    }
  }, [error]);

  const updateProfile = (newProfile) => setProfile(newProfile);
  const updateLanguage = (newLanguage) => setLanguage(newLanguage);

  const value = useMemo(() => ({
    auth: token,
    user: profile,
    lan: language,
    updateProfile,
    updateLanguage,
  }), [token, profile, language]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthContext, AuthContextProvider };