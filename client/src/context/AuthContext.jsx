import React, { createContext, useContext } from 'react';
import useAuthStore from '../store/authStore';
import api from '../api/axiosInstance'; // Use the interceptor-configured api

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const user = useAuthStore(state => state.user);
  const token = useAuthStore(state => state.accessToken);
  const isLoading = useAuthStore(state => state.isLoading);
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);
  
  const loginStore = useAuthStore(state => state.login);
  const logoutStore = useAuthStore(state => state.logout);
  const completeUserProfileStore = useAuthStore(state => state.completeUserProfile);

  const login = async (email, password) => {
    return await loginStore(email, password);
  };

  const logout = () => {
    logoutStore();
  };

  const completeUserProfile = (isComplete) => {
    completeUserProfileStore(isComplete);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        isLoading,
        isAuthenticated,
        login,
        logout,
        completeUserProfile,
        api, 
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
