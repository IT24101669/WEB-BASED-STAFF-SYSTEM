import React from 'react';

const HierarchyManagement = () => {
  const hierarchyData = {
    name: "Chief Executive Officer",
    title: "CEO",
    department: "Executive",
    children: [
      {
        name: "Chief Technology Officer",
        title: "CTO",
        department: "Technology",
        children: [
          {
            name: "Development Manager",
            title: "Manager",
            department: "Technology",
            children: [
              { name: "Senior Developer", title: "Senior", department: "Technology" },
              { name: "Junior Developer", title: "Junior", department: "Technology" }
            ]
          },
          {
            name: "IT Manager",
            title: "Manager",
            department: "Technology",
            children: [
              { name: "System Administrator", title: "Senior", department: "Technology" }
            ]
          }
        ]
      },
      {
        name: "Chief Financial Officer",
        title: "CFO",
        department: "Finance",
        children: [
          {
            name: "Finance Manager",
            title: "Manager",
            department: "Finance",
            children: [
              { name: "Accountant", title: "Senior", department: "Finance" }
            ]
          }
        ]
      },
      {
        name: "HR Director",
        title: "Director",
        department: "Human Resources",
        children: [
          {
            name: "Recruitment Manager",
            title: "Manager",
            department: "Human Resources",
            children: [
              { name: "HR Specialist", title: "Senior", department: "Human Resources" }
            ]
          }
        ]
      }
    ]
  };

  const renderNode = (node, level = 0) => (
    <div key={node.name} className="text-center mb-4">
      <div className="hierarchy-node mx-auto">
        <div className="fw-bold text-primary">{node.name}</div>
        <div className="text-muted small">{node.title}</div>
        <div className="small badge bg-secondary mt-1">{node.department}</div>
      </div>
      
      {node.children && node.children.length > 0 && (
        <>
          <div className="hierarchy-line"></div>
          <div className={`d-flex justify-content-center gap-4 mt-4 ${level > 0 ? 'ps-5' : ''}`}>
            {node.children.map(child => renderNode(child, level + 1))}
          </div>
        </>
      )}
    </div>
  );

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="mb-1">
            <i className="fas fa-sitemap me-2 text-primary"></i>
            Reporting Hierarchy
          </h3>
          <p className="text-muted mb-0">Visualize and manage organizational structure</p>
        </div>
        <div>
          <button className="btn btn-outline-primary me-2">
            <i className="fas fa-download me-2"></i>
            Export Chart
          </button>
          <button className="btn btn-primary">
            <i className="fas fa-sync me-2"></i>
            Refresh
          </button>
        </div>
      </div>

      <div className="hierarchy-container bg-light p-4 rounded">
        {renderNode(hierarchyData)}
      </div>

      <div className="mt-4">
        <h5>Organizational Chart Legend</h5>
        <div className="d-flex gap-3 flex-wrap">
          <span className="badge bg-danger">C-Level</span>
          <span className="badge bg-warning">Director</span>
          <span className="badge bg-info">Manager</span>
          <span className="badge bg-primary">Senior</span>
          <span className="badge bg-success">Junior</span>
          <span className="badge bg-secondary">Department</span>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-light">
              <h6 className="mb-0">
                <i className="fas fa-chart-bar me-2"></i>
                Hierarchy Statistics
              </h6>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-4">
                  <div className="border-end">
                    <h5 className="text-primary">4</h5>
                    <small className="text-muted">Executive Level</small>
                  </div>
                </div>
                <div className="col-4">
                  <div className="border-end">
                    <h5 className="text-success">6</h5>
                    <small className="text-muted">Managers</small>
                  </div>
                </div>
                <div className="col-4">
                  <h5 className="text-info">15</h5>
                  <small className="text-muted">Total Staff</small>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card">
            <div className="card-header bg-light">
              <h6 className="mb-0">
                <i className="fas fa-cogs me-2"></i>
                Hierarchy Management
              </h6>
            </div>
            <div className="card-body">
              <div className="d-grid gap-2">
                <button className="btn btn-outline-primary btn-sm">
                  <i className="fas fa-plus me-2"></i>
                  Add New Position
                </button>
                <button className="btn btn-outline-info btn-sm">
                  <i className="fas fa-edit me-2"></i>
                  Modify Structure
                </button>
                <button className="btn btn-outline-warning btn-sm">
                  <i className="fas fa-exchange-alt me-2"></i>
                  Reorganize
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card mt-4">
        <div className="card-header bg-info text-white">
          <h6 className="mb-0">
            <i className="fas fa-info-circle me-2"></i>
            Hierarchy Information
          </h6>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col-md-6">
              <h6>Department Distribution</h6>
              <ul className="list-unstyled">
                <li><span className="badge bg-primary me-2">Technology</span> 7 positions</li>
                <li><span className="badge bg-success me-2">Finance</span> 3 positions</li>
                <li><span className="badge bg-warning me-2">Human Resources</span> 3 positions</li>
                <li><span className="badge bg-info me-2">Executive</span> 1 position</li>
              </ul>
            </div>
            <div className="col-md-6">
              <h6>Level Distribution</h6>
              <ul className="list-unstyled">
                <li><span className="badge bg-danger me-2">C-Level</span> 3 positions</li>
                <li><span className="badge bg-warning me-2">Director</span> 1 position</li>
                <li><span className="badge bg-info me-2">Manager</span> 3 positions</li>
                <li><span className="badge bg-primary me-2">Senior</span> 4 positions</li>
                <li><span className="badge bg-success me-2">Junior</span> 1 position</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HierarchyManagement;