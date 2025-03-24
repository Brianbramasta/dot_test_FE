'use client';
import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface User {
  email: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

const mockUsers = [
  { email: 'user@example.com', password: 'password123' },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (email: string, password: string) => {
    const foundUser = mockUsers.find(u => u.email === email && u.password === password);
    if (!foundUser) throw new Error('Invalid credentials');
    
    const userData = { email: foundUser.email };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    router.push('/dashboard');
  };

  const register = async (email: string, password: string) => {
    if (mockUsers.some(u => u.email === email)) throw new Error('User already exists');
    
    mockUsers.push({ email, password });
    const userData = { email };
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
    router.push('/dashboard');
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    router.push('/login');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);