import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import payrollService from '../services/payrollService';

const PayslipPage = () => {
  const { id } = useParams();
  const [record, setRecord] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchRecord = async () => {
      setIsLoading(true);
      setError('');
      try {
        const data = await payrollService.getPayrollRecordById(id);
        setRecord(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch payroll record.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecord();
  }, [id]);

  if (isLoading) {
    return <p>Loading payslip...</p>;
  }

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (!record) {
    return <p>Payslip not found.</p>;
  }

  return (
    <div className="payslip-container">
      <h2>Payslip</h2>
      <div>
        <h3>Employee Details</h3>
        <p><strong>Name:</strong> {record.crewMember.name}</p>
        <p><strong>Email:</strong> {record.crewMember.email}</p>
        <p><strong>Role:</strong> {record.crewMember.role}</p>
      </div>
      <div>
        <h3>Pay Period</h3>
        <p>{new Date(record.payPeriodStartDate).toLocaleDateString()} - {new Date(record.payPeriodEndDate).toLocaleDateString()}</p>
      </div>
      <div>
        <h3>Earnings</h3>
        {record.earnings.map((earning, index) => (
          <p key={index}><strong>{earning.type}:</strong> {earning.amount.toFixed(2)}</p>
        ))}
        <p><strong>Gross Pay:</strong> {record.grossPay.toFixed(2)}</p>
      </div>
      <div>
        <h3>Deductions</h3>
        <h4>Statutory Deductions</h4>
        <p><strong>PAYE:</strong> {record.statutoryDeductions.paye.toFixed(2)}</p>
        <p><strong>NSSF:</strong> {record.statutoryDeductions.nssf.toFixed(2)}</p>
        <p><strong>SHIF:</strong> {record.statutoryDeductions.shif.toFixed(2)}</p>
        <p><strong>Affordable Housing Levy:</strong> {record.statutoryDeductions.affordableHousingLevy.toFixed(2)}</p>
        <h4>SACCO Deductions</h4>
        <p><strong>Shares:</strong> {record.saccoDeductions.shares.toFixed(2)}</p>
        <p><strong>Loan Repayment:</strong> {record.saccoDeductions.loanRepayment.toFixed(2)}</p>
        <p><strong>Member Deposits:</strong> {record.saccoDeductions.memberDeposits.toFixed(2)}</p>
        <h4>Other Deductions</h4>
        {record.otherDeductions.map((deduction, index) => (
          <p key={index}><strong>{deduction.type}:</strong> {deduction.amount.toFixed(2)}</p>
        ))}
        <p><strong>Total Deductions:</strong> {record.totalDeductions.toFixed(2)}</p>
      </div>
      <div>
        <h3>Net Pay</h3>
        <p><strong>Net Pay:</strong> {record.netPay.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default PayslipPage;
