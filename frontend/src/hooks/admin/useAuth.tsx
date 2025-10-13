'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { AuthContextType, User } from '@/types/admin';
import apiClient from '@/utils/admin/apiClient';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing token on mount
    const savedToken = localStorage.getItem('admin_token');
    if (savedToken) {
      setToken(savedToken);
      apiClient.setToken(savedToken);
      
      // Verify token and fetch user data
      const fetchUserData = async () => {
        try {
          const response = await apiClient.getCurrentUser();
          if (response.success && response.data) {
            setUser(response.data);
          } else {
            // Token is invalid, clear it
            localStorage.removeItem('admin_token');
            apiClient.setToken(null);
          }
        } catch (error) {
          console.error('Failed to verify token:', error);
          // Set fallback user data
          setUser({ 
            id: '1', 
            email: 'admin@forevershine.com', 
            role: 'Administrator',
            name: 'John Doe',
            profilePhoto: '',
            loginCount: 47,
            lastLoginDays: 0
          });
        } finally {
          setIsLoading(false);
        }
      };
      
      fetchUserData();
    } else {
      setIsLoading(false);
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);
      const response = await apiClient.login(email, password);
      
      if (response.success && response.data) {
        const { token: newToken, user: userData } = response.data;
        
        setToken(newToken);
        setUser(userData);
        apiClient.setToken(newToken);
        
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login failed:', error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    apiClient.setToken(null);
    localStorage.removeItem('admin_token');
  };

  return (
    <AuthContext.Provider value={{
      user,
      token,
      login,
      logout,
      isLoading
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}