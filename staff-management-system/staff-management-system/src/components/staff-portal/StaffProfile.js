import React, { useState } from 'react';

const StaffProfile = () => {
  const [profile, setProfile] = useState({
    name: 'John Smith',
    employeeId: 'EMP001',
    email: 'john.smith@company.com',
    phone: '+1 (555) 123-4567',
    department: 'Technology',
    position: 'Software Engineer',
    joinDate: '2023-01-15',
    address: '123 Main Street, City, State 12345',
    emergencyContact: 'Mary Smith - +1 (555) 987-6543'
  });

  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({ ...profile });

  const handleEdit = () => {
    setEditData({ ...profile });
    setIsEditing(true);
  };

  const handleSave = () => {
    setProfile({ ...editData });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditData({ ...profile });
    setIsEditing(false);
  };

  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="mb-1">
            <i className="fas fa-user me-2 text-primary"></i>
            Personal Profile
          </h3>
          <p className="text-muted mb-0">View and update your personal information</p>
        </div>
        {!isEditing ? (
          <button className="btn btn-primary" onClick={handleEdit}>
            <i className="fas fa-edit me-2"></i>
            Edit Profile
          </button>
        ) : (
          <div>
            <button className="btn btn-success me-2" onClick={handleSave}>
              <i className="fas fa-save me-2"></i>
              Save Changes
            </button>
            <button className="btn btn-secondary" onClick={handleCancel}>
              <i className="fas fa-times me-2"></i>
              Cancel
            </button>
          </div>
        )}
      </div>

      <div className="row">
        <div className="col-md-6">
          <div className="staff-card card">
            <div className="card-header bg-light">
              <h6 className="mb-0">
                <i className="fas fa-id-card me-2"></i>
                Basic Information
              </h6>
            </div>
            <div className="card-body">
              {isEditing ? (
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label">Full Name</label>
                    <input type="text" className="form-control" name="name" value={editData.name} onChange={handleChange} />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={editData.email} onChange={handleChange} />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Phone</label>
                    <input type="text" className="form-control" name="phone" value={editData.phone} onChange={handleChange} />
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-3">
                    <strong>Full Name:</strong> {profile.name}
                  </div>
                  <div className="mb-3">
                    <strong>Employee ID:</strong> {profile.employeeId}
                  </div>
                  <div className="mb-3">
                    <strong>Email:</strong> {profile.email}
                  </div>
                  <div className="mb-3">
                    <strong>Phone:</strong> {profile.phone}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="col-md-6">
          <div className="staff-card card">
            <div className="card-header bg-light">
              <h6 className="mb-0">
                <i className="fas fa-briefcase me-2"></i>
                Employment Details
              </h6>
            </div>
            <div className="card-body">
              <div className="mb-3">
                <strong>Department:</strong> {profile.department}
              </div>
              <div className="mb-3">
                <strong>Position:</strong> {profile.position}
              </div>
              <div className="mb-3">
                <strong>Join Date:</strong> {profile.joinDate}
              </div>
            </div>
          </div>

          <div className="staff-card card mt-3">
            <div className="card-header bg-light">
              <h6 className="mb-0">
                <i className="fas fa-home me-2"></i>
                Contact Information
              </h6>
            </div>
            <div className="card-body">
              {isEditing ? (
                <div className="row g-3">
                  <div className="col-12">
                    <label className="form-label">Address</label>
                    <textarea className="form-control" name="address" value={editData.address} onChange={handleChange} rows="3" />
                  </div>
                  <div className="col-12">
                    <label className="form-label">Emergency Contact</label>
                    <input type="text" className="form-control" name="emergencyContact" value={editData.emergencyContact} onChange={handleChange} />
                  </div>
                </div>
              ) : (
                <>
                  <div className="mb-3">
                    <strong>Address:</strong> {profile.address}
                  </div>
                  <div className="mb-3">
                    <strong>Emergency Contact:</strong> {profile.emergencyContact}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="staff-card card mt-4">
        <div className="card-header bg-light">
          <h6 className="mb-0">
            <i className="fas fa-chart-bar me-2"></i>
            Quick Stats
          </h6>
        </div>
        <div className="card-body">
          <div className="row text-center">
            <div className="col-3">
              <div className="border-end">
                <h5 className="text-primary">98%</h5>
                <small className="text-muted">Attendance</small>
              </div>
            </div>
            <div className="col-3">
              <div className="border-end">
                <h5 className="text-success">15</h5>
                <small className="text-muted">Leave Days Left</small>
              </div>
            </div>
            <div className="col-3">
              <div className="border-end">
                <h5 className="text-info">12</h5>
                <small className="text-muted">Projects</small>
              </div>
            </div>
            <div className="col-3">
              <h5 className="text-warning">3</h5>
              <small className="text-muted">Years</small>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffProfile;