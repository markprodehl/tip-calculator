import React, { useState } from 'react';
import './TipCalculator.css'

const TipCalculator = () => {
  const [totalTips, setTotalTips] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [employeeName, setEmployeeName] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");

  const handleTotalTipsChange = (e) => {
    const value = e.target.value;
    setTotalTips(value === 0 ? "" : value);
  };

  const handleEmployeeSubmit = (event) => {
    event.preventDefault();
    setEmployees([...employees, { employeeName, hoursWorked }]);
    setTotalHours(totalHours + parseInt(hoursWorked));
    setEmployeeName("");
    setHoursWorked("");
  };

  const handleDelete = (employee) => {
    setEmployees(employees.filter((e) => e !== employee));
    setTotalHours(totalHours - employee.hoursWorked);
  };

  return (
    
    <div className="container">
      <h2>Jason's Tronk Calculator</h2>
      <form className="input-form">
        <input 
          type="number" 
          value={totalTips || ""} 
          onChange={handleTotalTipsChange} 
          placeholder="Total Tips" 
        />
      <br />
      </form>
      <br/>
      <form onSubmit={handleEmployeeSubmit} className="input-form">
        <input
          type="text"
          name="employeeName"
          placeholder="Employee name"
          value={employeeName}
          onChange={(e) => setEmployeeName(e.target.value)}
        />
        <input
          type="number"
          name="hoursWorked"
          placeholder="Hours worked"
          value={hoursWorked}
          onChange={(e) => setHoursWorked(e.target.value)}
        />
        <button type="submit">Add Employee</button>
      </form>
      <br />
      <div className="display-results">
        <div>
          Total Hours: {totalHours}
        </div>
        <br />
        <div>
          Average Tips Per Hour: £{(totalTips / totalHours).toFixed(2)}
        </div>
      </div>
      <br/>
      <div className="display-results">
        {employees.map((employee) => (
          <div key={employee.employeeName} className="employee-item">
            {employee.employeeName}: {employee.hoursWorked} hours - £{((totalTips / totalHours) * employee.hoursWorked).toFixed(2)}
            <button onClick={() => handleDelete(employee) } className="delete-btn">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TipCalculator;
