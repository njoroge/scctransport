import React from 'react';
import { Link } from 'react-router-dom';

const CrewListPage = () => {
  return (
    <div>
      <h2>Crew Management</h2>
      <Link to="/crew/add">
        <button>Add New Crew Profile</button>
      </Link>
      <p>List of crew members will appear here...</p>
      {/* Placeholder for crew table/list */}
    </div>
  );
};

export default CrewListPage;
