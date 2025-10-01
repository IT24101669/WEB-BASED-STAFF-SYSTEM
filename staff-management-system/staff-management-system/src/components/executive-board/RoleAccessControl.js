import React, { useState } from 'react';

const RoleAccessControl = () => {
  const [roles, setRoles] = useState([
    {
      id: 1,
      name: 'Executive Board',
      description: 'Full system access for strategic management',
      permissions: {
        position_manage: true,
        hierarchy_view: true,
        reports_view: true,
        system_config: true,
        employee_manage: true,
        payroll_view: true
      },
      userCount: 3
    },
    {
      id: 2,
      name: 'Administration Officer',
      description: 'Employee and profile management access',
      permissions: {
        position_manage: false,
        hierarchy_view: true,
        reports_view: true,
        system_config: false,
        employee_manage: true,
        payroll_view: false
      },
      userCount: 5
    },
    {
      id: 3,
      name: 'Department Manager',
      description: 'Department-specific management access',
      permissions: {
        position_manage: false,
        hierarchy_view: true,
        reports_view: true,
        system_config: false,
        employee_manage: false,
        payroll_view: true
      },
      userCount: 8
    }
  ]);

  const permissionLabels = {
    position_manage: 'Manage Positions',
    hierarchy_view: 'View Hierarchy',
    reports_view: 'View Reports',
    system_config: 'System Configuration',
    employee_manage: 'Manage Employees',
    payroll_view: 'View Payroll'
  };

  const togglePermission = (roleId, permission) => {
    setRoles(roles.map(role => 
      role.id === roleId 
        ? { 
            ...role, 
            permissions: { 
              ...role.permissions, 
              [permission]: !role.permissions[permission] 
            } 
          } 
        : role
    ));
  };

  const getPermissionCount = (permissions) => {
    return Object.values(permissions).filter(Boolean).length;
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="mb-1">
            <i className="fas fa-shield-alt me-2 text-primary"></i>
            Role-Based Access Control
          </h3>
          <p className="text-muted mb-0">Manage user permissions and system access levels</p>
        </div>
        <button className="btn btn-primary">
          <i className="fas fa-save me-2"></i>
          Save Changes
        </button>
      </div>

      <div className="row">
        {roles.map(role => (
          <div key={role.id} className="col-lg-4 mb-4">
            <div className="card h-100">
              <div className="card-header bg-light d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-0">{role.name}</h6>
                  <small className="text-muted">{role.userCount} users</small>
                </div>
                <span className="badge bg-primary">
                  {getPermissionCount(role.permissions)} permissions
                </span>
              </div>
              <div className="card-body">
                <p className="small text-muted">{role.description}</p>
                
                <h6 className="mt-3">Permissions:</h6>
                <div className="permissions-list">
                  {Object.entries(permissionLabels).map(([key, label]) => (
                    <div key={key} className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={role.permissions[key]}
                        onChange={() => togglePermission(role.id, key)}
                        id={`${role.id}-${key}`}
                      />
                      <label className="form-check-label small" htmlFor={`${role.id}-${key}`}>
                        {label}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              <div className="card-footer">
                <div className="d-grid gap-2">
                  <button className="btn btn-outline-primary btn-sm">
                    <i className="fas fa-users me-2"></i>
                    Manage Users
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card mt-4">
        <div className="card-header bg-info text-white">
          <h6 className="mb-0">
            <i className="fas fa-chart-bar me-2"></i>
            Permission Overview
          </h6>
        </div>
        <div className="card-body">
          <div className="row">
            {Object.entries(permissionLabels).map(([key, label]) => (
              <div key={key} className="col-md-4 mb-3">
                <div className="d-flex justify-content-between align-items-center">
                  <span className="small">{label}</span>
                  <span className="badge bg-primary">
                    {roles.filter(role => role.permissions[key]).length} roles
                  </span>
                </div>
                <div className="progress" style={{height: '4px'}}>
                  <div 
                    className="progress-bar" 
                    style={{width: `${(roles.filter(role => role.permissions[key]).length / roles.length) * 100}%`}}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoleAccessControl;