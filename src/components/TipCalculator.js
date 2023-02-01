import React, { useState } from 'react';
import { NumericFormat } from 'react-number-format';
import './TipCalculator.css'

const TipCalculator = () => {
  const [totalTips, setTotalTips] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [employeeName, setEmployeeName] = useState("");
  const [hoursWorked, setHoursWorked] = useState("");
  const [totalTipsError, setTotalTipsError] = useState("");
  const [employeeNameError, setEmployeeNameError] = useState("");
  const [hoursWorkedError, setHoursWorkedError] = useState("");

  // const handleTotalTipsChange = (e) => {
  //   const value = e.target.value;
  //   setTotalTips(value === 0 ? "" : value);
  // };

  const handleTotalTipsChange = (floatValue) => {
  setTotalTips(floatValue);
};


  const handleEmployeeSubmit = (event) => {
    event.preventDefault();
    setTotalTipsError("");
    setEmployeeNameError("");
    setHoursWorkedError("");
    if (!totalTips) {
      setTotalTipsError("Total tips can't be blank");
      return;
    }
    if (!employeeName || !employeeName.trim()) {
      setEmployeeNameError("Employee name can't be blank ");
      return;
    }
    if (!hoursWorked || isNaN(hoursWorked) || hoursWorked <= 0) {
      setHoursWorkedError("Hours worked can't be blank");
      return;
    }
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
      <h2 className="header">Jason's Tip Calculator</h2>
      <form className="input-form">
        <NumericFormat
          type="text"
          value={totalTips || ""}
          onValueChange={(values) => handleTotalTipsChange(values.floatValue)}
          thousandSeparator={true}
          prefix="£"
          placeholder="Total Tips"
        />
        {totalTipsError && <p className="error-message">{totalTipsError}</p>}
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
        {employeeNameError && <p className="error-message">{employeeNameError}</p>}
        <input
          type="number"
          name="hoursWorked"
          placeholder="Hours worked"
          value={hoursWorked}
          onChange={(e) => setHoursWorked(e.target.value)}
        />
        {hoursWorkedError && <p className="error-message">{hoursWorkedError}</p>}
        <button type="submit">Add Employee</button>
      </form>
      <br />
      <div className="display-results">
        <div>
          Total Hours: {totalHours}
        </div>
        <br />
        <div>
          Average Tips Per Hour: £{totalTips && totalHours ? (totalTips / totalHours).toFixed(2) : ""}
        </div>
      </div>
      <br/>
      <div className="display-results">
        {employees.map((employee) => (
          <div key={employee.employeeName} className="employee-item">
            {employee.employeeName}: {employee.hoursWorked} hours - £{((totalTips / totalHours) * employee.hoursWorked).toFixed(2)}
            <button onClick={() => handleDelete(employee) } type="delete" className="delete-btn">Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TipCalculator;
