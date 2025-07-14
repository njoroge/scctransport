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
            <th>Statutory Deductions</th>
            <th>SACCO Deductions</th>
            <th>Other Deductions</th>
            <th>Total Deductions</th>
            <th>Net Pay</th>
            <th>Status</th>
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
              <td>
                PAYE: {record.statutoryDeductions.paye.toFixed(2)}<br/>
                NSSF: {record.statutoryDeductions.nssf.toFixed(2)}<br/>
                SHIF: {record.statutoryDeductions.shif.toFixed(2)}<br/>
                AHL: {record.statutoryDeductions.affordableHousingLevy.toFixed(2)}
              </td>
              <td>
                Shares: {record.saccoDeductions.shares.toFixed(2)}<br/>
                Loan: {record.saccoDeductions.loanRepayment.toFixed(2)}<br/>
                Deposits: {record.saccoDeductions.memberDeposits.toFixed(2)}
              </td>
              <td>
                {record.otherDeductions.map(d => `${d.type}: ${d.amount.toFixed(2)}`).join(<br/>)}
              </td>
              <td>{record.totalDeductions.toFixed(2)}</td>
              <td>{record.netPay.toFixed(2)}</td>
              <td>{record.status}</td>
              <td>
                <button onClick={() => onEdit(record)} className="btn btn-success btn-sm me-1">Edit/View</button>
                <a href={`/payslip/${record._id}`} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">Generate Payslip</a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PayrollRecordsList;
