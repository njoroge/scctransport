import React from 'react';

const WelfareContributionsList = ({ contributions, onEdit, onDelete, isLoading }) => {
  if (isLoading) {
    return <p>Loading contributions...</p>;
  }

  if (!contributions || contributions.length === 0) {
    return <p>No welfare contributions found.</p>;
  }

  return (
    <div>
      <h4>Welfare Contributions History</h4>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Date</th>
            <th>Member Name</th>
            <th>Member ID</th>
            <th>Amount</th>
            <th>Type</th>
            <th>Payment Method</th>
            <th>Reference</th>
            <th>Recorded By</th>
            <th>Remarks</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contributions.map((contrib) => (
            <tr key={contrib._id}>
              <td>{new Date(contrib.contributionDate).toLocaleDateString()}</td>
              <td>{contrib.member ? contrib.member.name : 'N/A'}</td>
              <td>{contrib.member ? (contrib.member.memberId || 'N/A') : 'N/A'}</td>
              <td>{contrib.amount.toFixed(2)}</td>
              <td>{contrib.contributionType}</td>
              <td>{contrib.paymentMethod}</td>
              <td>{contrib.referenceNumber || '-'}</td>
              <td>{contrib.recordedBy ? contrib.recordedBy.name : 'N/A'}</td>
              <td>{contrib.remarks || '-'}</td>
              <td>
                <button onClick={() => onEdit(contrib)} style={{marginRight: '5px'}}>Edit</button>
                <button onClick={() => onDelete(contrib._id)} style={{backgroundColor: '#d9534f'}}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WelfareContributionsList;
