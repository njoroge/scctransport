import React from 'react';

const EarningsInput = ({ earnings, setEarnings }) => {
  const handleEarningChange = (index, e) => {
    const updatedEarnings = earnings.map((earning, i) =>
      index === i ? { ...earning, [e.target.name]: e.target.value } : earning
    );
    setEarnings(updatedEarnings);
  };

  const addEarning = () => {
    setEarnings([...earnings, { type: 'basic', amount: '', description: '' }]);
  };

  const removeEarning = (index) => {
    const filteredEarnings = earnings.filter((_, i) => i !== index);
    setEarnings(filteredEarnings.length > 0 ? filteredEarnings : [{ type: 'basic', amount: '', description: '' }]);
  };

  return (
    <div>
      <h4>Earnings</h4>
      {earnings.map((earning, index) => (
        <div key={index} style={{ border: '1px dashed #ccc', padding: '10px', marginBottom: '10px' }}>
          <select name="type" value={earning.type} onChange={(e) => handleEarningChange(index, e)}>
            <option value="basic">Basic</option>
            <option value="commission">Commission</option>
            <option value="overtime">Overtime</option>
            <option value="bonus">Bonus</option>
            <option value="allowance">Allowance</option>
          </select>
          <input
            type="number"
            name="amount"
            value={earning.amount}
            onChange={(e) => handleEarningChange(index, e)}
            placeholder="Amount"
            min="0"
            step="0.01"
          />
          <input
            type="text"
            name="description"
            value={earning.description}
            onChange={(e) => handleEarningChange(index, e)}
            placeholder="Description"
          />
          {earnings.length > 1 && (
            <button type="button" onClick={() => removeEarning(index)}>
              Remove
            </button>
          )}
        </div>
      ))}
      <button type="button" onClick={addEarning}>
        Add Earning
      </button>
    </div>
  );
};

export default EarningsInput;
