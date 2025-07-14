import React from 'react';

const EmployeeList = ({ employees, onEdit, isLoading }) => {
  if (isLoading) {
    return <p>Loading employees...</p>;
  }

  if (employees.length === 0) {
    return <p>No employees found.</p>;
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Phone Number</th>
            <th>KRA PIN</th>
            <th>NSSF Number</th>
            <th>NHIF Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee._id}>
              <td>{employee.name}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
              <td>{employee.phoneNumber}</td>
              <td>{employee.idVerification?.kraPin}</td>
              <td>{employee.idVerification?.nssfNumber}</td>
              <td>{employee.idVerification?.nhifNumber}</td>
              <td>
                {onEdit && (
                  <button onClick={() => onEdit(employee)}>Edit</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;
