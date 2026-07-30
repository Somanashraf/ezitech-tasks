import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Fixed admin credentials
const ADMIN = {
  email: 'admin@wanderlux.com',
  password: 'admin123',
  role: 'admin',
  name: 'Admin User'
};

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registeredUsers, setRegisteredUsers] = useState(() => {
    const stored = localStorage.getItem('wanderlux_users');
    return stored ? JSON.parse(stored) : [];
  });

  // Load current user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('wanderlux_user');
    if (savedUser) {
      try {
        setCurrentUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Failed to parse saved user:', error);
        localStorage.removeItem('wanderlux_user');
      }
    }
    setLoading(false);
  }, []);

  // Save registered users to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('wanderlux_users', JSON.stringify(registeredUsers));
  }, [registeredUsers]);

  const signup = (name, email, password) => {
    // Check if admin email
    if (email.toLowerCase() === ADMIN.email.toLowerCase()) {
      return { success: false, message: 'This email is reserved for admin use' };
    }

    // Check if email already exists
    const emailExists = registeredUsers.some(
      u => u.email.toLowerCase() === email.toLowerCase()
    );

    if (emailExists) {
      return { success: false, message: 'Email already registered. Please login.' };
    }

    // Create new user
    const newUser = {
      id: `user-${Date.now()}`,
      name: name.trim(),
      email: email.toLowerCase(),
      password: password, // In production, this should be hashed
      role: 'user',
      createdAt: new Date().toISOString()
    };

    setRegisteredUsers(prev => [...prev, newUser]);
    return { success: true, message: 'Account created successfully!' };
  };

  const login = (email, password) => {
    // Check if admin
    if (email.toLowerCase() === ADMIN.email.toLowerCase() && password === ADMIN.password) {
      const userData = {
        email: ADMIN.email,
        name: ADMIN.name,
        role: ADMIN.role
      };
      setCurrentUser(userData);
      localStorage.setItem('wanderlux_user', JSON.stringify(userData));
      return { success: true, role: ADMIN.role };
    }

    // Check registered users
    const user = registeredUsers.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );

    if (user) {
      const userData = {
        email: user.email,
        name: user.name,
        role: user.role
      };
      setCurrentUser(userData);
      localStorage.setItem('wanderlux_user', JSON.stringify(userData));
      return { success: true, role: user.role };
    }

    return { success: false, message: 'Invalid email or password' };
  };

  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('wanderlux_user');
  };

  const value = {
    currentUser,
    login,
    logout,
    signup,
    loading,
    isAdmin: currentUser?.role === 'admin',
    isUser: currentUser?.role === 'user',
    isAuthenticated: !!currentUser,
    registeredUsers
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
