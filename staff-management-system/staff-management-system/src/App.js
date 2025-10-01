import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import './App.css';

// Import pages
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Employees from './pages/Employees';
import Departments from './pages/Departments';
import ExecutiveBoard from './pages/ExecutiveBoard';
import Positions from './pages/Positions';
import HRManagement from './pages/HRManagement';
import FinanceManagement from './pages/FinanceManagement';
import ProjectManagement from './pages/ProjectManagement';
import Attendance from './pages/Attendance';
import StaffPortal from './pages/StaffPortal';

// Navigation Component
const Navigation = ({ userRole, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm">
      <div className="container">
        <span className="navbar-brand mb-0 h1">
          <i className="fas fa-building me-2"></i>
       CrewLink
        </span>
        
        <div className="navbar-nav ms-auto">
          {/* Executive Board Link */}
          {userRole === 'executive' && (
            <Link className="nav-link text-white me-3" to="/executive-board">
              <i className="fas fa-chart-line me-1"></i>
              Executive Board
            </Link>
          )}
          
          {/* Staff Portal Link */}
          {userRole === 'employee' && (
            <Link className="nav-link text-white me-3" to="/staff-portal">
              <i className="fas fa-user me-1"></i>
              Staff Portal
            </Link>
          )}
          
          {/* Administration Officer Link */}
          {userRole === 'administration' && (
            <Link className="nav-link text-white me-3" to="/employees">
              <i className="fas fa-users me-1"></i>
              Employees
            </Link>
          )}
          
          {/* Department Officer Link */}
          {userRole === 'department' && (
            <Link className="nav-link text-white me-3" to="/departments">
              <i className="fas fa-sitemap me-1"></i>
              Departments
            </Link>
          )}
          
          {/* HR Officer Link */}
          {userRole === 'hr' && (
            <Link className="nav-link text-white me-3" to="/hr-management">
              <i className="fas fa-user-tie me-1"></i>
              HR Management
            </Link>
          )}
          
          {/* Finance Officer Link */}
          {userRole === 'finance' && (
            <Link className="nav-link text-white me-3" to="/finance-management">
              <i className="fas fa-money-bill-wave me-1"></i>
              Payroll
            </Link>
          )}
          
          {/* Project Manager Link */}
          {userRole === 'project' && (
            <Link className="nav-link text-white me-3" to="/project-management">
              <i className="fas fa-project-diagram me-1"></i>
              Projects
            </Link>
          )}
          
          {/* Dashboard Link (Available for all roles except those with specific portals) */}
          {(userRole === 'executive' || userRole === 'employee') ? null : (
            <Link className="nav-link text-white me-3" to="/dashboard">
              <i className="fas fa-tachometer-alt me-1"></i>
              Dashboard
            </Link>
          )}
          
          {/* Positions Link (Available for multiple roles) */}
          {(userRole === 'executive' || userRole === 'administration' || userRole === 'hr') && (
            <Link className="nav-link text-white me-3" to="/positions">
              <i className="fas fa-briefcase me-1"></i>
              Positions
            </Link>
          )}
          
          {/* Attendance Link (Available for HR and Employees) */}
          {(userRole === 'hr' || userRole === 'employee') && (
            <Link className="nav-link text-white me-3" to="/attendance">
              <i className="fas fa-calendar-check me-1"></i>
              Attendance
            </Link>
          )}
          
          {/* User Role Display */}
          <span className="nav-link text-light me-3">
            <i className="fas fa-user-tag me-1"></i>
            Role: {userRole}
          </span>
          
          {/* Logout Button */}
          <button 
            className="btn btn-outline-light btn-sm"
            onClick={handleLogout}
          >
            <i className="fas fa-sign-out-alt me-1"></i>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = () => {
    const loggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const role = localStorage.getItem('userRole') || '';
    const name = localStorage.getItem('userName') || '';
    
    setIsLoggedIn(loggedIn);
    setUserRole(role);
    setUserName(name);
  };

  const handleLogin = (role, name) => {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('userRole', role);
    localStorage.setItem('userName', name);
    setIsLoggedIn(true);
    setUserRole(role);
    setUserName(name);
  };

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    setIsLoggedIn(false);
    setUserRole('');
    setUserName('');
  };

  // Function to determine default route based on user role
  const getDefaultRoute = () => {
    switch (userRole) {
      case 'executive':
        return '/executive-board';
      case 'employee':
        return '/staff-portal';
      case 'administration':
        return '/employees';
      case 'department':
        return '/departments';
      case 'hr':
        return '/hr-management';
      case 'finance':
        return '/finance-management';
      case 'project':
        return '/project-management';
      default:
        return '/dashboard';
    }
  };

  return (
    <Router>
      <div className="App">
        {/* Navigation Bar */}
        {isLoggedIn && userRole ? (
          <Navigation userRole={userRole} onLogout={handleLogout} />
        ) : (
          <nav className="navbar navbar-dark bg-primary">
            <div className="container">
              <span className="navbar-brand mb-0 h1">
                <i className="fas fa-building me-2"></i>
               CrewLink
              </span>
              <span className="navbar-text text-light">
                Please login to continue
              </span>
            </div>
          </nav>
        )}

        {/* Main Content Area */}
        <div className="container-fluid mt-3">
          <Routes>
            {/* Public Route */}
            <Route 
              path="/login" 
              element={
                isLoggedIn ? <Navigate to={getDefaultRoute()} replace /> : <Login onLoginSuccess={handleLogin} />
              } 
            />
            
            {/* Protected Routes */}
            <Route 
              path="/dashboard" 
              element={
                isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />
              } 
            />
            
            <Route 
              path="/staff-portal" 
              element={
                isLoggedIn && userRole === 'employee' ? <StaffPortal /> : <Navigate to="/login" replace />
              } 
            />
            
            <Route 
              path="/executive-board" 
              element={
                isLoggedIn && userRole === 'executive' ? <ExecutiveBoard /> : <Navigate to="/login" replace />
              } 
            />
            
            <Route 
              path="/employees" 
              element={
                isLoggedIn && (userRole === 'administration' || userRole === 'executive' || userRole === 'hr') ? <Employees /> : <Navigate to="/login" replace />
              } 
            />
            
            <Route 
              path="/departments" 
              element={
                isLoggedIn && (userRole === 'department' || userRole === 'executive') ? <Departments /> : <Navigate to="/login" replace />
              } 
            />
            
            <Route 
              path="/positions" 
              element={
                isLoggedIn && (userRole === 'executive' || userRole === 'administration' || userRole === 'hr') ? <Positions /> : <Navigate to="/login" replace />
              } 
            />
            
            <Route 
              path="/hr-management" 
              element={
                isLoggedIn && (userRole === 'hr' || userRole === 'executive') ? <HRManagement /> : <Navigate to="/login" replace />
              } 
            />
            
            <Route 
              path="/finance-management" 
              element={
                isLoggedIn && (userRole === 'finance' || userRole === 'executive') ? <FinanceManagement /> : <Navigate to="/login" replace />
              } 
            />
            
            <Route 
              path="/project-management" 
              element={
                isLoggedIn && (userRole === 'project' || userRole === 'executive') ? <ProjectManagement /> : <Navigate to="/login" replace />
              } 
            />
            
            <Route 
              path="/attendance" 
              element={
                isLoggedIn && (userRole === 'hr' || userRole === 'employee' || userRole === 'executive') ? <Attendance /> : <Navigate to="/login" replace />
              } 
            />
            
            {/* Default Route - Redirect based on user role */}
            <Route 
              path="/" 
              element={
                isLoggedIn && userRole ? (
                  <Navigate to={getDefaultRoute()} replace />
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
            
            {/* 404 Fallback */}
            <Route 
              path="*" 
              element={
                isLoggedIn ? (
                  <div className="container text-center mt-5">
                    <h1 className="text-danger">404 - Page Not Found</h1>
                    <p>The page you're looking for doesn't exist.</p>
                    <Link to={getDefaultRoute()} className="btn btn-primary">
                      Go to {userRole === 'employee' ? 'Staff Portal' : userRole === 'executive' ? 'Executive Board' : 'Dashboard'}
                    </Link>
                  </div>
                ) : (
                  <Navigate to="/login" replace />
                )
              } 
            />
          </Routes>
        </div>

        {/* Footer */}
        
      </div>
    </Router>
  );
}

export default App;