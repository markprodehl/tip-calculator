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
          className="input-field"
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
          className="input-field"
        />
        <input
          type="number"
          name="hoursWorked"
          placeholder="Hours worked"
          value={hoursWorked}
          onChange={(e) => setHoursWorked(e.target.value)}
          className="input-field"
        />
        <button type="submit" className="add-btn">Add Employee</button>
      </form>
      <br />
      <div className="total-hours">
        Total Hours: {totalHours}
      </div>
      <br />
      <div className="total-tips-per-hour">
        Average Tips Per Hour: {totalTips / totalHours}
      </div>
      <br/>
      <div className="employee-list">
        {employees.map((employee) => (
          <div key={employee.employeeName} className="employee-item">
            {employee.employeeName}: {employee.hoursWorked} hours - {(totalTips / totalHours) * employee.hoursWorked}
            <button onClick={() => handleDelete(employee) } className="delete-btn">Delete</button>
          </div>
        ))}
      </div>
      {/* <br />
      <br /> */}
      {/* <div className="employee-tips">
        {employees.map((employee) => (
          <div key={employee.employeeName}>
            {employee.employeeName}: {(totalTips / totalHours) * employee.hoursWorked}
          </div>
        ))}
      </div> */}
    </div>
  );
};

export default TipCalculator;
