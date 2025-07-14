import React from 'react';

const OtherDeductionsInput = ({ otherDeductions, setOtherDeductions }) => {
  const handleDeductionChange = (index, e) => {
    const updatedDeductions = otherDeductions.map((deduction, i) =>
      index === i ? { ...deduction, [e.target.name]: e.target.value } : deduction
    );
    setOtherDeductions(updatedDeductions);
  };

  const addDeduction = () => {
    setOtherDeductions([...otherDeductions, { type: '', amount: '', description: '' }]);
  };

  const removeDeduction = (index) => {
    const filteredDeductions = otherDeductions.filter((_, i) => i !== index);
    setOtherDeductions(filteredDeductions.length > 0 ? filteredDeductions : [{ type: '', amount: '', description: '' }]);
  };

  return (
    <div>
      <h4>Other Deductions</h4>
      {otherDeductions.map((deduction, index) => (
        <div key={index} style={{ border: '1px dashed #ccc', padding: '10px', marginBottom: '10px' }}>
          <input
            type="text"
            name="type"
            value={deduction.type}
            onChange={(e) => handleDeductionChange(index, e)}
            placeholder="Deduction Type"
          />
          <input
            type="number"
            name="amount"
            value={deduction.amount}
            onChange={(e) => handleDeductionChange(index, e)}
            placeholder="Amount"
            min="0"
            step="0.01"
          />
          <input
            type="text"
            name="description"
            value={deduction.description}
            onChange={(e) => handleDeductionChange(index, e)}
            placeholder="Description"
          />
          {otherDeductions.length > 1 && (
            <button type="button" onClick={() => removeDeduction(index)}>
              Remove
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={addDeduction}>
        Add Other Deduction
      </button>
    </div>
  );
};

export default OtherDeductionsInput;
