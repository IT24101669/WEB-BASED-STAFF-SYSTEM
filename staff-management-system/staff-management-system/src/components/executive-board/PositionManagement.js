import React, { useState, useEffect } from 'react';
import PositionForm from './PositionForm';
import PositionList from './PositionList';

const PositionManagement = () => {
  const [positions, setPositions] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPosition, setEditingPosition] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const mockPositions = [
      {
        id: 1,
        title: 'Chief Executive Officer',
        code: 'CEO001',
        department: 'Executive',
        level: 'C-Level',
        reportsTo: null,
        salaryRange: '$150,000 - $300,000',
        responsibilities: 'Overall company leadership and strategy development',
        status: 'Active',
        createdDate: '2024-01-15',
        employees: [1]
      },
      {
        id: 2,
        title: 'Chief Technology Officer',
        code: 'CTO001',
        department: 'Technology',
        level: 'C-Level',
        reportsTo: 'Chief Executive Officer',
        salaryRange: '$120,000 - $250,000',
        responsibilities: 'Technology strategy and implementation oversight',
        status: 'Active',
        createdDate: '2024-01-20',
        employees: [2]
      },
      {
        id: 3,
        title: 'Senior Software Engineer',
        code: 'SSE001',
        department: 'Technology',
        level: 'Senior',
        reportsTo: 'Chief Technology Officer',
        salaryRange: '$80,000 - $120,000',
        responsibilities: 'Develop and maintain software applications',
        status: 'Active',
        createdDate: '2024-02-01',
        employees: [3]
      }
    ];
    setPositions(mockPositions);
  }, []);

  const handleAddPosition = (positionData) => {
    const newPosition = {
      id: Math.max(...positions.map(p => p.id), 0) + 1,
      ...positionData,
      createdDate: new Date().toISOString().split('T')[0],
      employees: []
    };
    setPositions([...positions, newPosition]);
    setShowForm(false);
  };

  const handleUpdatePosition = (positionData) => {
    setPositions(positions.map(pos => 
      pos.id === editingPosition.id ? { ...pos, ...positionData } : pos
    ));
    setEditingPosition(null);
    setShowForm(false);
  };

  const handleDeletePosition = (positionId) => {
    if (window.confirm('Are you sure you want to delete this position?')) {
      setPositions(positions.filter(pos => pos.id !== positionId));
    }
  };

  const handleDuplicatePosition = (position) => {
    const duplicatedPosition = {
      ...position,
      id: Math.max(...positions.map(p => p.id), 0) + 1,
      code: `${position.code}-COPY`,
      title: `${position.title} (Copy)`,
      employees: []
    };
    setPositions([...positions, duplicatedPosition]);
  };

  const filteredPositions = positions.filter(position => {
    if (filter === 'all') return true;
    return position.status === filter;
  });

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h3 className="mb-1">
            <i className="fas fa-briefcase me-2 text-primary"></i>
            Position Management
          </h3>
          <p className="text-muted mb-0">Create, update and manage organizational positions</p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => {
            setEditingPosition(null);
            setShowForm(true);
          }}
        >
          <i className="fas fa-plus me-2"></i>
          Create Position
        </button>
      </div>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-6">
          <div className="btn-group" role="group">
            <button
              type="button"
              className={`btn ${filter === 'all' ? 'btn-primary' : 'btn-outline-primary'}`}
              onClick={() => setFilter('all')}
            >
              All Positions
            </button>
            <button
              type="button"
              className={`btn ${filter === 'Active' ? 'btn-success' : 'btn-outline-success'}`}
              onClick={() => setFilter('Active')}
            >
              Active
            </button>
            <button
              type="button"
              className={`btn ${filter === 'Inactive' ? 'btn-warning' : 'btn-outline-warning'}`}
              onClick={() => setFilter('Inactive')}
            >
              Inactive
            </button>
          </div>
        </div>
        <div className="col-md-6 text-end">
          <span className="badge bg-light text-dark">
            {filteredPositions.length} positions found
          </span>
        </div>
      </div>

      {showForm && (
        <PositionForm
          position={editingPosition}
          onSubmit={editingPosition ? handleUpdatePosition : handleAddPosition}
          onCancel={() => {
            setShowForm(false);
            setEditingPosition(null);
          }}
        />
      )}

      <PositionList
        positions={filteredPositions}
        onEdit={(position) => {
          setEditingPosition(position);
          setShowForm(true);
        }}
        onDelete={handleDeletePosition}
        onDuplicate={handleDuplicatePosition}
      />
    </div>
  );
};

export default PositionManagement;