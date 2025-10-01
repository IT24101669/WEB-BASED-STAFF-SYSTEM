import React, { useState, useEffect } from 'react';

const PositionForm = ({ position, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    code: '',
    department: '',
    level: '',
    reportsTo: '',
    salaryRange: '',
    responsibilities: '',
    status: 'Active'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (position) {
      setFormData({
        title: position.title || '',
        code: position.code || '',
        department: position.department || '',
        level: position.level || '',
        reportsTo: position.reportsTo || '',
        salaryRange: position.salaryRange || '',
        responsibilities: position.responsibilities || '',
        status: position.status || 'Active'
      });
    }
    setErrors({});
  }, [position]);

  const departments = ['Executive', 'Technology', 'HR', 'Finance', 'Marketing', 'Operations', 'Sales'];
  const levels = ['C-Level', 'Director', 'Manager', 'Senior', 'Junior', 'Intern'];
  const statusOptions = ['Active', 'Inactive', 'Archived'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Position title is required';
    if (!formData.code.trim()) newErrors.code = 'Position code is required';
    if (!formData.department) newErrors.department = 'Department is required';
    if (!formData.level) newErrors.level = 'Level is required';
    if (!formData.salaryRange.trim()) newErrors.salaryRange = 'Salary range is required';
    if (!formData.responsibilities.trim()) newErrors.responsibilities = 'Responsibilities are required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="card mb-4">
      <div className="card-header bg-primary text-white">
        <h5 className="mb-0">
          <i className="fas fa-briefcase me-2"></i>
          {position ? 'Update Position' : 'Create New Position'}
        </h5>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit}>
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-label">Position Title *</label>
              <input type="text" className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                name="title" value={formData.title} onChange={handleChange} />
              {errors.title && <div className="invalid-feedback">{errors.title}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label">Position Code *</label>
              <input type="text" className={`form-control ${errors.code ? 'is-invalid' : ''}`}
                name="code" value={formData.code} onChange={handleChange} />
              {errors.code && <div className="invalid-feedback">{errors.code}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label">Department *</label>
              <select className={`form-select ${errors.department ? 'is-invalid' : ''}`}
                name="department" value={formData.department} onChange={handleChange}>
                <option value="">Select Department</option>
                {departments.map(dept => <option key={dept} value={dept}>{dept}</option>)}
              </select>
              {errors.department && <div className="invalid-feedback">{errors.department}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label">Level *</label>
              <select className={`form-select ${errors.level ? 'is-invalid' : ''}`}
                name="level" value={formData.level} onChange={handleChange}>
                <option value="">Select Level</option>
                {levels.map(level => <option key={level} value={level}>{level}</option>)}
              </select>
              {errors.level && <div className="invalid-feedback">{errors.level}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label">Reports To</label>
              <input type="text" className="form-control"
                name="reportsTo" value={formData.reportsTo} onChange={handleChange}
                placeholder="Position title this role reports to" />
            </div>

            <div className="col-md-6">
              <label className="form-label">Salary Range *</label>
              <input type="text" className={`form-control ${errors.salaryRange ? 'is-invalid' : ''}`}
                name="salaryRange" value={formData.salaryRange} onChange={handleChange}
                placeholder="e.g., $50,000 - $80,000" />
              {errors.salaryRange && <div className="invalid-feedback">{errors.salaryRange}</div>}
            </div>

            <div className="col-md-6">
              <label className="form-label">Status</label>
              <select className="form-select" name="status" value={formData.status} onChange={handleChange}>
                {statusOptions.map(status => <option key={status} value={status}>{status}</option>)}
              </select>
            </div>

            <div className="col-12">
              <label className="form-label">Responsibilities *</label>
              <textarea className={`form-control ${errors.responsibilities ? 'is-invalid' : ''}`}
                name="responsibilities" rows="4" value={formData.responsibilities} onChange={handleChange}
                placeholder="Describe the main responsibilities..." />
              {errors.responsibilities && <div className="invalid-feedback">{errors.responsibilities}</div>}
            </div>
          </div>

          <div className="mt-4 d-flex gap-2">
            <button type="submit" className="btn btn-success">
              <i className="fas fa-save me-2"></i>
              {position ? 'Update Position' : 'Create Position'}
            </button>
            <button type="button" className="btn btn-secondary" onClick={onCancel}>
              <i className="fas fa-times me-2"></i>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PositionForm;