import React from 'react';

const PayrollRecordsList = ({ records, onEdit, isLoading }) => {
  if (isLoading) {
    return <p>Loading payroll records...</p>;
  }

  if (!records || records.length === 0) {
    return <p>No payroll records found.</p>;
  }

  return (
    <div>
      <h4>Payroll History</h4>
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9em' }}>
        <thead>
          <tr>
            <th>Pay Period</th>
            <th>Crew Member</th>
            <th>Gross Pay</th>
            <th>Deductions</th>
            <th>Net Pay</th>
            <th>Payment Date</th>
            <th>Status</th>
            <th>Basis</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {records.map((record) => (
            <tr key={record._id}>
              <td>
                {new Date(record.payPeriodStartDate).toLocaleDateString()} - <br/>
                {new Date(record.payPeriodEndDate).toLocaleDateString()}
              </td>
              <td>{record.crewMember ? record.crewMember.name : 'N/A'}</td>
              <td>{record.grossPay.toFixed(2)}</td>
              <td>{record.deductionsTotal.toFixed(2)}</td>
              <td>{record.netPay.toFixed(2)}</td>
              <td>{new Date(record.paymentDate).toLocaleDateString()}</td>
              <td>{record.status}</td>
              <td>{record.basisOfPayment}</td>
              <td>
                <button onClick={() => onEdit(record)} style={{marginRight: '5px'}}>Edit/View</button>
                {/* Delete is usually not an option, but status change to Cancelled */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PayrollRecordsList;
