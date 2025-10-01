import React, { useState } from 'react';
import PositionManagement from '../components/executive-board/PositionManagement';
import HierarchyManagement from '../components/executive-board/HierarchyManagement';
import RoleAccessControl from '../components/executive-board/RoleAccessControl';
import PositionHistory from '../components/executive-board/PositionHistory';
import EmployeeAlignment from '../components/executive-board/EmployeeAlignment';
import './ExecutiveBoard.css';

const ExecutiveBoard = () => {
  const [activeTab, setActiveTab] = useState('positions');

  const tabs = [
    { id: 'positions', name: 'Position Management', icon: 'fa-briefcase', description: 'Create, update and manage job positions' },
    { id: 'hierarchy', name: 'Reporting Hierarchy', icon: 'fa-sitemap', description: 'Define organizational structure and reporting lines' },
    { id: 'access', name: 'Role Access Control', icon: 'fa-shield-alt', description: 'Manage user permissions and system access' },
    { id: 'history', name: 'Position History', icon: 'fa-history', description: 'Track changes and audit trail' },
    { id: 'alignment', name: 'Employee Alignment', icon: 'fa-link', description: 'Align positions with employee profiles' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'positions':
        return <PositionManagement />;
      case 'hierarchy':
        return <HierarchyManagement />;
      case 'access':
        return <RoleAccessControl />;
      case 'history':
        return <PositionHistory />;
      case 'alignment':
        return <EmployeeAlignment />;
      default:
        return <PositionManagement />;
    }
  };

  const getActiveTabConfig = () => {
    return tabs.find(tab => tab.id === activeTab) || tabs[0];
  };

  const activeTabConfig = getActiveTabConfig();

  return (
    <div className="container-fluid executive-board">
      <div className="row">
        <div className="col-12">
          {/* Tab Navigation */}
          <div className="executive-tabs mb-4">
            <div className="row g-2">
              {tabs.map(tab => (
                <div key={tab.id} className="col-lg-2 col-md-4 col-sm-6">
                  <button
                    className={`btn btn-lg w-100 text-start p-3 tab-button ${activeTab === tab.id ? 'active' : ''}`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    <div className="d-flex align-items-center">
                      <i className={`fas ${tab.icon} me-2 fa-lg`}></i>
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
          <div className="executive-content">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExecutiveBoard;