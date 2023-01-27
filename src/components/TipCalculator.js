import React, { useState } from 'react';
import './TipCalculator.css'
  
const TipCalculator = () => {
  const [totalTips, setTotalTips] = useState(0);
  const [persons, setPersons] = useState([{ name: '', hours: 0 }]);
  
  function calculateShares() {
    let totalHours = 0;
    persons.forEach(person => {
      totalHours += person.hours
    });
    
    return persons.map(person => {
      const share = (totalTips / totalHours) * person.hours;
      return { ... person, share }
    })
  }

  const shares = calculateShares()
  
  return (
    <div>

      <h2 className="header"> TIP Calculator</h2>
      <div className='form'>
        <label>Total Tips:</label>
          <input
            className="input"
            type="number"
            value={totalTips}
            onChange={e => setTotalTips(e.target.value)}
          />
      </div>

      <form className="form" onSubmit={e => e.preventDefault()}>
        <ul className="shares">
          {persons.map((person, index) => (
            <li key={index}>
              <label>Name:</label>
              <input
                className="input"
                type="text"
                value={person.name}
                onChange={e => {
                  const newPersons = [...persons];
                  newPersons[index].name = e.target.value;
                  setPersons(newPersons);
                }}
              />
              <label>Hours Worked:</label>
              <input
                className="input"
                type="number"
                value={person.hours}
                onChange={e => {
                  const newPersons = [...persons];
                  newPersons[index].hours = e.target.value;
                  setPersons(newPersons);
                }}
              />
            </li>
          ))}
          <button 
            className="button"
            type="button" 
            onClick={() => setPersons([...persons, {name: "", hours: 0 }])}>
            Add Person
          </button>
        </ul>

      </form>
      <h2 className='form'>Shares</h2>
      <div className='form'>
        <ul className="shares">
          {shares.map((person, index) => (
            <li key={index}> 
              {person.name} : {person.share == 0 ? "" : person.share}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TipCalculator;