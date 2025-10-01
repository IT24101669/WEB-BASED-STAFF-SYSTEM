import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const userRole = localStorage.getItem('userRole');
  const userName = localStorage.getItem('userName');
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect specific roles to their respective pages
    if (userRole === 'employee') {
      navigate('/staff-portal');
      return;
    }
    if (userRole === 'executive') {
      navigate('/executive-board');
      return;
    }
    if (userRole === 'department') {
      navigate('/departments');
      return;
    }
    if (userRole === 'administration') {
      navigate('/employees');
      return;
    }
    if (userRole === 'hr') {
      navigate('/hr-management');
      return;
    }
    if (userRole === 'finance') {
      navigate('/finance-management');
      return;
    }
    if (userRole === 'project') {
      navigate('/project-management');
      return;
    }
  }, [userRole, navigate]);

  // Role configurations for dashboard display
  const roleConfig = {
    admin: { 
      title: "Administrator Dashboard", 
      icon: "fa-user-shield",
      description: "Full system administration and management",
      features: [
        "User Management & Permissions",
        "System Configuration", 
        "Database Administration",
        "Security & Audit Logs"
      ],
      stats: [
        { label: "Total Users", value: "156", color: "primary" },
        { label: "Active Sessions", value: "23", color: "success" },
        { label: "System Alerts", value: "2", color: "warning" }
      ]
    }
  };

  const config = roleConfig[userRole] || { 
    title: "System Dashboard", 
    icon: "fa-tachometer-alt",
    description: "General system overview and navigation",
    features: [
      "System Overview & Analytics",
      "User Management & Settings",
      "Basic Reporting Features",
      "Help & Support Resources"
    ],
    stats: [
      { label: "Active Projects", value: "12", color: "primary" },
      { label: "Team Members", value: "45", color: "success" },
      { label: "System Uptime", value: "98%", color: "info" }
    ]
  };

  // Show loading spinner during redirect
  if (['employee', 'executive', 'department', 'administration', 'hr', 'finance', 'project'].includes(userRole)) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <h5>Redirecting to your workspace...</h5>
          <p className="text-muted">Please wait a moment</p>
          <div className="mt-3">
            <small className="text-muted">
              Redirecting {userRole} to {userRole === 'employee' ? 'Staff Portal' : 
              userRole === 'executive' ? 'Executive Board' : 
              userRole === 'department' ? 'Departments' : 
              userRole === 'administration' ? 'Employees' : 
              userRole === 'hr' ? 'HR Management' : 
              userRole === 'finance' ? 'Finance Management' : 'Project Management'}
            </small>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      {/* Welcome Header */}
      <div className="text-center mb-5">
        <div className="display-1 text-primary mb-3">
          <i className={`fas ${config.icon}`}></i>
        </div>
        <h1 className="text-primary">{config.title}</h1>
        <div className="row justify-content-center mt-3">
          <div className="col-lg-6">
            <div className="d-flex justify-content-center align-items-center gap-3">
              <span className="badge bg-secondary fs-6 p-2">
                <i className="fas fa-user me-2"></i>
                {userName || 'User'}
              </span>
              <span className="badge bg-primary fs-6 p-2">
                <i className="fas fa-user-tag me-2"></i>
                Role: {userRole || 'Unknown'}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Description Card */}
      <div className="row justify-content-center mb-4">
        <div className="col-lg-8">
          <div className="card shadow-sm mb-4">
            <div className="card-body text-center">
              <p className="text-muted mb-0">{config.description}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="row justify-content-center mb-5">
        <div className="col-lg-10">
          <div className="card shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">
                <i className="fas fa-cogs me-2"></i>
                Available Features
              </h5>
            </div>
            <div className="card-body">
              <div className="row g-3">
                {config.features.map((feature, index) => (
                  <div key={index} className="col-md-6">
                    <div className="d-flex align-items-center p-3 border rounded">
                      <div className="bg-primary text-white rounded-circle p-2 me-3">
                        <i className="fas fa-check"></i>
                      </div>
                      <span className="fw-medium">{feature}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="row justify-content-center">
        <div className="col-lg-10">
          <div className="card shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">
                <i className="fas fa-chart-bar me-2"></i>
                System Overview
              </h5>
            </div>
            <div className="card-body">
              <div className="row text-center">
                {config.stats.map((stat, index) => (
                  <div key={index} className="col-md-4">
                    <div className={index < config.stats.length - 1 ? "border-end" : ""}>
                      <h5 className={`text-${stat.color}`}>{stat.value}</h5>
                      <small className="text-muted">{stat.label}</small>
                    </div>
                  </div>
                ))}
              </div>

              {/* Quick Actions */}
              <div className="mt-4 pt-3 border-top">
                <h6 className="mb-3">Quick Actions</h6>
                <div className="row g-2">
                  <div className="col-md-3">
                    <button className="btn btn-outline-primary w-100">
                      <i className="fas fa-users me-2"></i>
                      Users
                    </button>
                  </div>
                  <div className="col-md-3">
                    <button className="btn btn-outline-success w-100">
                      <i className="fas fa-chart-line me-2"></i>
                      Reports
                    </button>
                  </div>
                  <div className="col-md-3">
                    <button className="btn btn-outline-info w-100">
                      <i className="fas fa-cog me-2"></i>
                      Settings
                    </button>
                  </div>
                  <div className="col-md-3">
                    <button className="btn btn-outline-warning w-100">
                      <i className="fas fa-question-circle me-2"></i>
                      Help
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="row justify-content-center mt-4">
        <div className="col-lg-10">
          <div className="card shadow-sm">
            <div className="card-header bg-light">
              <h5 className="mb-0">
                <i className="fas fa-clock me-2"></i>
                Recent Activity
              </h5>
            </div>
            <div className="card-body">
              <div className="list-group list-group-flush">
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <i className="fas fa-user-check text-success me-2"></i>
                    <span>System login successful</span>
                  </div>
                  <small className="text-muted">Just now</small>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <i className="fas fa-bell text-warning me-2"></i>
                    <span>Welcome to Staff Management System</span>
                  </div>
                  <small className="text-muted">2 minutes ago</small>
                </div>
                <div className="list-group-item d-flex justify-content-between align-items-center">
                  <div>
                    <i className="fas fa-info-circle text-info me-2"></i>
                    <span>Your dashboard is ready</span>
                  </div>
                  <small className="text-muted">5 minutes ago</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;