import React, { useState } from 'react';
import './TipCalculator.css'

const TipCalculator = () => {
  const [totalTips, setTotalTips] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [employeeName, setEmployeeName] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");

  // const handleTipChange = (event) => {
  //   setTotalTips(event.target.value);
  // };

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
    <div>
      <form>
        <input 
          type="number" 
          value={totalTips || ""} 
          onChange={handleTotalTipsChange} 
          placeholder="Total Tips" />
        <br />
        <br />
      </form>
      <form onSubmit={handleEmployeeSubmit}>
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
      {employees.map((employee) => (
        <div key={employee.employeeName}>
          {employee.employeeName}: {employee.hoursWorked} hours
          <button onClick={() => handleDelete(employee)}>Delete</button>
        </div>
      ))}
      <br />
      Total hours: {totalHours}
      <br />
      <br />
      Total tips per hour: {totalTips / totalHours}
      <br />
      <br />
      {employees.map((employee) => (
        <div key={employee.employeeName}>
          {employee.employeeName}: {((totalTips / totalHours) * employee.hoursWorked).toFixed(2)}
        </div>
      ))}
    </div>
  );
};

export default TipCalculator;
