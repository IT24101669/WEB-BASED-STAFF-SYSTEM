import { Navigate } from 'react-router-dom';

const AuthGuard = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isLoggedIn') === 'true';
  const userRole = localStorage.getItem('userRole');
  
  // If not properly authenticated, redirect to login
  if (!isAuthenticated || !userRole) {
    // Clear any invalid data
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default AuthGuard;