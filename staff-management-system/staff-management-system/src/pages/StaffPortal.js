import React, { useState } from 'react';
import StaffProfile from '../components/staff-portal/StaffProfile';
import Attendance from '../components/staff-portal/Attendance';
import LeaveApplication from '../components/staff-portal/LeaveApplication';
import PaySlip from '../components/staff-portal/PaySlip';
import './StaffPortal.css';

const StaffPortal = () => {
  const [activeTab, setActiveTab] = useState('profile');

  const tabs = [
    { id: 'profile', name: 'View Profile', icon: 'fa-user', description: 'View and update personal information' },
    { id: 'attendance', name: 'Mark Attendance', icon: 'fa-calendar-check', description: 'Clock in/out and view attendance' },
    { id: 'leave', name: 'Apply Leave', icon: 'fa-calendar-plus', description: 'Apply for leave and track status' },
    { id: 'payslip', name: 'View Pay Slip', icon: 'fa-file-invoice-dollar', description: 'View salary details and history' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return <StaffProfile />;
      case 'attendance':
        return <Attendance />;
      case 'leave':
        return <LeaveApplication />;
      case 'payslip':
        return <PaySlip />;
      default:
        return <StaffProfile />;
    }
  };

  const getActiveTabConfig = () => {
    return tabs.find(tab => tab.id === activeTab) || tabs[0];
  };

  const activeTabConfig = getActiveTabConfig();

  return (
    <div className="container-fluid staff-portal">
      <div className="row">
        <div className="col-12">
          {/* Welcome Header */}
          <div className="staff-header mb-4">
            <div className="row align-items-center">
              <div className="col-md-8">
                <h1 className="display-6 text-primary">
                  <i className="fas fa-user-circle me-3"></i>
                  Staff Self-Service Portal
                </h1>
                <p className="lead text-muted">Manage your profile, attendance, leaves, and payslips</p>
              </div>
              <div className="col-md-4 text-end">
                <div className="staff-info-card">
                  <div className="d-flex align-items-center">
                    <div className="staff-avatar me-3">
                      <i className="fas fa-user fa-2x text-primary"></i>
                    </div>
                    <div>
                      <h6 className="mb-0">John Smith</h6>
                      <small className="text-muted">Software Engineer</small>
                      <br/>
                      <small className="text-muted">EMP001 • Technology Department</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="staff-tabs mb-4">
            <div className="row g-2">
              {tabs.map(tab => (
                <div key={tab.id} className="col-lg-3 col-md-6">
                  <button
                    className={`btn btn-lg w-100 text-start p-3 staff-tab-button ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <div className="d-flex align-items-center">
                      <i className={`fas ${tab.icon} me-3 fa-lg`}></i>
                      <div>
                        <div className="fw-bold">{tab.name}</div>
                        <small className="d-none d-md-block">{tab.description}</small>
                      </div>
                    </div>
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Active Tab Header */}
          <div className="tab-header mb-4">
            <div className="d-flex align-items-center">
              <i className={`fas ${activeTabConfig.icon} me-3 text-primary fa-2x`}></i>
              <div>
                <h3 className="mb-1">{activeTabConfig.name}</h3>
                <p className="text-muted mb-0">{activeTabConfig.description}</p>
              </div>
            </div>
          </div>

          {/* Content Area */}
          <div className="staff-content">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffPortal;