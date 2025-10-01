import React from 'react';

const PositionList = ({ positions, onEdit, onDelete, onDuplicate }) => {
  const getLevelBadge = (level) => {
    const colors = {
      'C-Level': 'danger',
      'Director': 'warning', 
      'Manager': 'info',
      'Senior': 'primary',
      'Junior': 'success',
      'Intern': 'secondary'
    };
    return colors[level] || 'dark';
  };

  const getStatusBadge = (status) => {
    const colors = {
      'Active': 'success',
      'Inactive': 'warning',
      'Archived': 'secondary'
    };
    return colors[status] || 'dark';
  };

  if (positions.length === 0) {
    return (
      <div className="text-center py-5">
        <i className="fas fa-briefcase fa-3x text-muted mb-3"></i>
        <h5 className="text-muted">No positions found</h5>
        <p className="text-muted">Create your first position to get started</p>
      </div>
    );
  }

  return (
    <div className="row">
      {positions.map(position => (
        <div key={position.id} className="col-lg-6 mb-3">
          <div className="card position-card h-100">
            <div className="card-header d-flex justify-content-between align-items-center">
              <h6 className="mb-0 text-primary">{position.title}</h6>
              <span className={`badge bg-${getLevelBadge(position.level)}`}>
                {position.level}
              </span>
            </div>
            <div className="card-body">
              <div className="mb-2">
                <small className="text-muted">Code:</small>
                <strong className="ms-2">{position.code}</strong>
              </div>
              <div className="mb-2">
                <small className="text-muted">Department:</small>
                <strong className="ms-2">{position.department}</strong>
              </div>
              <div className="mb-2">
                <small className="text-muted">Reports To:</small>
                <strong className="ms-2">{position.reportsTo || 'Top Level'}</strong>
              </div>
              <div className="mb-2">
                <small className="text-muted">Salary Range:</small>
                <strong className="ms-2 text-success">{position.salaryRange}</strong>
              </div>
              <div className="mb-3">
                <small className="text-muted">Responsibilities:</small>
                <p className="mb-0 small text-truncate">{position.responsibilities}</p>
              </div>
              
              <div className="d-flex justify-content-between align-items-center">
                <span className={`badge bg-${getStatusBadge(position.status)}`}>
                  {position.status}
                </span>
                <div className="action-buttons">
                  <button 
                    className="btn btn-sm btn-outline-primary btn-action"
                    onClick={() => onEdit(position)}
                    title="Edit Position"
                  >
                    <i className="fas fa-edit"></i>
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-info btn-action"
                    onClick={() => onDuplicate(position)}
                    title="Duplicate Position"
                  >
                    <i className="fas fa-copy"></i>
                  </button>
                  <button 
                    className="btn btn-sm btn-outline-danger btn-action"
                    onClick={() => onDelete(position.id)}
                    title="Delete Position"
                  >
                    <i className="fas fa-trash"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PositionList;