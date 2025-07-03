import React, { useState, useEffect, useCallback, useContext } from 'react';
import WelfareContributionForm from '../components/welfare/WelfareContributionForm.jsx';
import WelfareContributionsList from '../components/welfare/WelfareContributionsList.jsx';
import welfareService from '../services/welfareService.js';
import { AuthContext } from '../context/AuthContext.jsx';

const WelfarePage = () => {
  const [contributions, setContributions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingContribution, setEditingContribution] = useState(null); // For editing

  const { user } = useContext(AuthContext); // To check roles for allowed actions

  const fetchContributions = useCallback(async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await welfareService.getAllContributions(); // Add filters later if needed
      setContributions(data);
    } catch (err) {
      setError(err.message || 'Failed to fetch contributions.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchContributions();
  }, [fetchContributions]);

  const handleContributionAddedOrUpdated = (newOrUpdatedContribution) => {
    if (editingContribution) { // It was an update
        setContributions(prev =>
            prev.map(c => c._id === newOrUpdatedContribution._id ? newOrUpdatedContribution : c)
        );
    } else { // It was a new addition
        setContributions(prev => [newOrUpdatedContribution, ...prev]);
    }
    setEditingContribution(null); // Clear editing state
    // fetchContributions(); // Or update state directly for better UX
  };

  const handleEdit = (contribution) => {
    setEditingContribution(contribution);
    window.scrollTo(0, 0); // Scroll to top to see the form
  };

  const clearEditingState = () => {
      setEditingContribution(null);
  }

  const handleDelete = async (contributionId) => {
    if (window.confirm('Are you sure you want to delete this contribution?')) {
      setIsLoading(true); // Or a specific deleting state
      try {
        await welfareService.deleteContribution(contributionId);
        setContributions(prev => prev.filter(c => c._id !== contributionId));
        // fetchContributions(); // Re-fetch after delete
      } catch (err) {
        setError(err.message || 'Failed to delete contribution.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Basic authorization check for displaying the form
  // More granular checks can be done within the form/service if needed
  const canManageWelfare = user && (user.role === 'admin' || user.role === 'route_marshal'); // route_marshal is placeholder for staff

  return (
    <div>
      <h2>Welfare Contributions Management</h2>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {canManageWelfare && (
        <WelfareContributionForm
            onContributionAdded={handleContributionAddedOrUpdated}
            editingContribution={editingContribution}
            clearEditing={clearEditingState}
        />
      )}

      <WelfareContributionsList
        contributions={contributions}
        onEdit={canManageWelfare ? handleEdit : null} // Only pass edit if authorized
        onDelete={canManageWelfare ? handleDelete : null} // Only pass delete if authorized
        isLoading={isLoading}
      />
    </div>
  );
};

export default WelfarePage;
