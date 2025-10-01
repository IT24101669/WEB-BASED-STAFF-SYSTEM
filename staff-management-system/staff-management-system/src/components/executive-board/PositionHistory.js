import React, { useState } from 'react';

const PositionHistory = () => {
  const [filter, setFilter] = useState('all');
  
  const historyData = [
    {
      id: 1,
      position: 'Chief Technology Officer',
      action: 'Created',
      user: 'John Smith',
      timestamp: '2024-01-15 14:30:25',
      details: 'New CTO position created for technology department',
      changes: {
        title: { from: null, to: 'Chief Technology Officer' },
        department: { from: null, to: 'Technology' }
      }
    },
    {
      id: 2,
      position: 'Senior Developer',
      action: 'Updated',
      user: 'Sarah Johnson',
      timestamp: '2024-01-20 10:15:42',
      details: 'Updated salary range and responsibilities',
      changes: {
        salaryRange: { from: '$70,000 - $100,000', to: '$80,000 - $120,000' },
        responsibilities: { from: 'Basic development tasks', to: 'Full-stack development and mentoring' }
      }
    },
    {
      id: 3,
      position: 'Marketing Manager',
      action: 'Archived',
      user: 'Mike Wilson',
      timestamp: '2024-01-25 16:45:18',
      details: 'Position archived due to departmental restructuring',
      changes: {
        status: { from: 'Active', to: 'Archived' }
      }
    }
  ];

  const getActionBadge = (action) => {
    const colors = {
      'Created': 'success',
      'Updated': 'primary',
      'Archived': 'warning',
      'Deleted': 'danger'
    };
    return colors[action] || 'secondary';
  };

  const filteredHistory = filter === 'all' 
    ? historyData 
    : historyData.filter(record => record.action === filter);

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="mb-1">
            <i className="fas fa-history me-2 text-primary"></i>
            Position History & Audit Trail
          </h3>
          <p className="text-muted mb-0">Track all changes and modifications to positions</p>
        </div>
        <div>
          <select 
            className="form-select"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="all">All Actions</option>
            <option value="Created">Created</option>
            <option value="Updated">Updated</option>
            <option value="Archived">Archived</option>
          </select>
        </div>
      </div>

      <div className="history-timeline">
        {filteredHistory.map(record => (
          <div key={record.id} className="card mb-3">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start mb-2">
                <div>
                  <h6 className="mb-1 text-primary">{record.position}</h6>
                  <p className="mb-1 small">{record.details}</p>
                </div>
                <span className={`badge bg-${getActionBadge(record.action)}`}>
                  {record.action}
                </span>
              </div>
              
              <div className="mb-2">
                <small className="text-muted">
                  <i className="fas fa-user me-1"></i>
                  {record.user} • 
                  <i className="fas fa-clock me-1 ms-2"></i>
                  {record.timestamp}
                </small>
              </div>

              {Object.keys(record.changes).length > 0 && (
                <div className="changes-section mt-3 p-2 bg-light rounded">
                  <small className="text-muted d-block mb-2">Changes made:</small>
                  {Object.entries(record.changes).map(([field, change]) => (
                    <div key={field} className="change-item small mb-1">
                      <strong>{field}:</strong> 
                      <span className="text-danger ms-1">{change.from || 'Empty'}</span>
                      <i className="fas fa-arrow-right mx-2 text-muted"></i>
                      <span className="text-success">{change.to}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {filteredHistory.length === 0 && (
        <div className="text-center py-5">
          <i className="fas fa-history fa-3x text-muted mb-3"></i>
          <h5 className="text-muted">No history records found</h5>
          <p className="text-muted">No actions match your current filter</p>
        </div>
      )}

      <div className="card mt-4">
        <div className="card-header bg-light">
          <h6 className="mb-0">
            <i className="fas fa-chart-pie me-2"></i>
            Activity Summary
          </h6>
        </div>
        <div className="card-body">
          <div className="row text-center">
            <div className="col-3">
              <div className="border-end">
                <h5 className="text-success">{historyData.filter(r => r.action === 'Created').length}</h5>
                <small className="text-muted">Created</small>
              </div>
            </div>
            <div className="col-3">
              <div className="border-end">
                <h5 className="text-primary">{historyData.filter(r => r.action === 'Updated').length}</h5>
                <small className="text-muted">Updated</small>
              </div>
            </div>
            <div className="col-3">
              <div className="border-end">
                <h5 className="text-warning">{historyData.filter(r => r.action === 'Archived').length}</h5>
                <small className="text-muted">Archived</small>
              </div>
            </div>
            <div className="col-3">
              <h5 className="text-muted">{historyData.length}</h5>
              <small className="text-muted">Total</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PositionHistory;