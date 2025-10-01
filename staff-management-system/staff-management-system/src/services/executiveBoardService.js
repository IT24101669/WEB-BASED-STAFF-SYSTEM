// Mock service for Executive Board functionality
const executiveBoardService = {
  // Position Management
  getPositions: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const positions = JSON.parse(localStorage.getItem('positions') || '[]');
        resolve(positions);
      }, 500);
    });
  },

  savePosition: (position) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const positions = JSON.parse(localStorage.getItem('positions') || '[]');
        if (position.id) {
          // Update existing
          const index = positions.findIndex(p => p.id === position.id);
          if (index !== -1) {
            positions[index] = position;
          }
        } else {
          // Add new
          position.id = Date.now();
          positions.push(position);
        }
        localStorage.setItem('positions', JSON.stringify(positions));
        resolve(position);
      }, 300);
    });
  },

  deletePosition: (positionId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const positions = JSON.parse(localStorage.getItem('positions') || '[]');
        const filtered = positions.filter(p => p.id !== positionId);
        localStorage.setItem('positions', JSON.stringify(filtered));
        resolve(true);
      }, 300);
    });
  },

  // Role Access Control
  getRolePermissions: () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const permissions = JSON.parse(localStorage.getItem('rolePermissions') || '[]');
        resolve(permissions);
      }, 500);
    });
  },

  saveRolePermissions: (permissions) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        localStorage.setItem('rolePermissions', JSON.stringify(permissions));
        resolve(true);
      }, 300);
    });
  }
};

export default executiveBoardService;