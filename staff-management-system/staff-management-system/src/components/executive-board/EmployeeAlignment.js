import React, { useState, useEffect } from 'react';

const EmployeeAlignment = () => {
  const [positions] = useState([
    { id: 1, title: 'Chief Executive Officer', code: 'CEO001', department: 'Executive' },
    { id: 2, title: 'Chief Technology Officer', code: 'CTO001', department: 'Technology' },
    { id: 3, title: 'Senior Developer', code: 'DEV001', department: 'Technology' }
  ]);

  const [employees] = useState([
    { id: 1, name: 'John Smith', email: 'john.smith@company.com', currentPosition: 'CEO001' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah.j@company.com', currentPosition: 'CTO001' },
    { id: 3, name: 'Mike Wilson', email: 'mike.w@company.com', currentPosition: null },
    { id: 4, name: 'Emily Davis', email: 'emily.d@company.com', currentPosition: null }
  ]);

  const [assignments, setAssignments] = useState({});

  useEffect(() => {
    // Initialize assignments
    const initialAssignments = {};
    positions.forEach(position => {
      initialAssignments[position.id] = employees
        .filter(emp => emp.currentPosition === position.code)
        .map(emp => emp.id);
    });
    setAssignments(initialAssignments);
  }, [positions, employees]);

  const toggleAssignment = (positionId, employeeId) => {
    setAssignments(prev => {
      const currentAssignments = prev[positionId] || [];
      const isAssigned = currentAssignments.includes(employeeId);
      
      if (isAssigned) {
        return {
          ...prev,
          [positionId]: currentAssignments.filter(id => id !== employeeId)
        };
      } else {
        // Remove from other positions
        const cleaned = Object.keys(prev).reduce((acc, posId) => ({
          ...acc,
          [posId]: prev[posId].filter(id => id !== employeeId)
        }), {});
        
        return {
          ...cleaned,
          [positionId]: [...currentAssignments, employeeId]
        };
      }
    });
  };

  const getEmployeeName = (employeeId) => {
    return employees.find(emp => emp.id === employeeId)?.name || 'Unknown';
  };

  const getAssignedEmployees = (positionId) => {
    return assignments[positionId] || [];
  };

  const saveAssignments = () => {
    // Here you would typically send the assignments to your backend
    console.log('Saving assignments:', assignments);
    alert('Employee assignments saved successfully!');
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="mb-1">
            <i className="fas fa-link me-2 text-primary"></i>
            Employee-Position Alignment
          </h3>
          <p className="text-muted mb-0">Align employee profiles with organizational positions</p>
        </div>
        <button className="btn btn-success" onClick={saveAssignments}>
          <i className="fas fa-save me-2"></i>
          Save Assignments
        </button>
      </div>

      <div className="alert alert-info">
        <i className="fas fa-info-circle me-2"></i>
        Assign employees to positions by checking the boxes. Each employee can only be assigned to one position.
      </div>

      <div className="row">
        {positions.map(position => (
          <div key={position.id} className="col-lg-6 mb-4">
            <div className="card employee-alignment-card h-100">
              <div className="card-header bg-light d-flex justify-content-between align-items-center">
                <div>
                  <h6 className="mb-0">{position.title}</h6>
                  <small className="text-muted">{position.department} • {position.code}</small>
                </div>
                <span className="badge bg-primary">
                  {getAssignedEmployees(position.id).length} assigned
                </span>
              </div>
              <div className="card-body">
                <h6 className="mb-3">Available Employees:</h6>
                <div className="employee-list" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                  {employees.map(employee => (
                    <div key={employee.id} className="form-check mb-2">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={getAssignedEmployees(position.id).includes(employee.id)}
                        onChange={() => toggleAssignment(position.id, employee.id)}
                        id={`pos-${position.id}-emp-${employee.id}`}
                      />
                      <label 
                        className="form-check-label d-flex justify-content-between w-100" 
                        htmlFor={`pos-${position.id}-emp-${employee.id}`}
                      >
                        <span>{employee.name}</span>
                        <small className="text-muted">{employee.email}</small>
                      </label>
                    </div>
                  ))}
                </div>

                {getAssignedEmployees(position.id).length > 0 && (
                  <div className="assigned-section mt-3">
                    <h6>Currently Assigned:</h6>
                    <div className="list-group">
                      {getAssignedEmployees(position.id).map(empId => (
                        <div key={empId} className="list-group-item py-2 d-flex justify-content-between align-items-center">
                          <div>
                            <i className="fas fa-user-check me-2 text-success"></i>
                            {getEmployeeName(empId)}
                          </div>
                          <button 
                            className="btn btn-sm btn-outline-danger"
                            onClick={() => toggleAssignment(position.id, empId)}
                          >
                            <i className="fas fa-times"></i>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="card mt-4">
        <div className="card-header bg-light">
          <h6 className="mb-0">
            <i className="fas fa-chart-bar me-2"></i>
            Assignment Summary
          </h6>
        </div>
        <div className="card-body">
          <div className="row text-center">
            <div className="col-4">
              <div className="border-end">
                <h5 className="text-primary">{employees.length}</h5>
                <small className="text-muted">Total Employees</small>
              </div>
            </div>
            <div className="col-4">
              <div className="border-end">
                <h5 className="text-success">
                  {employees.filter(emp => 
                    Object.values(assignments).flat().includes(emp.id)
                  ).length}
                </h5>
                <small className="text-muted">Assigned</small>
              </div>
            </div>
            <div className="col-4">
              <h5 className="text-warning">
                {employees.filter(emp => 
                  !Object.values(assignments).flat().includes(emp.id)
                ).length}
              </h5>
              <small className="text-muted">Unassigned</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeAlignment;