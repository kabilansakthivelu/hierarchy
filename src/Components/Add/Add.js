import React, {useState} from 'react';
import {data} from '../../data';
import './Add.css';

const Add = () => {

  const [departmentChosen, setDepartmentChosen] = useState();

  const [teamChosen, setTeamChosen] = useState();

  const selectedDept = data.employees[0].children.find((item)=>{
      return item.id === parseInt(departmentChosen);
  })

  return (
  <div>
  <form >
  <label htmlFor="department">Department</label>
  <select id="department" onChange={(e)=>{setDepartmentChosen(e.target.value)}}>
  <option value="null">Please select</option>
  <option value="2">HR</option>
  <option value="3">Engineering</option>
  <option value="4">Design</option>
  </select>
  {departmentChosen &&
  <div>
  <label htmlFor="team">Team</label>
  <select id="team" onChange={(e)=>{setTeamChosen(e.target.value)}}>
  <option value="null">Please select</option>
  {selectedDept.children.map((item)=>{
    return (<option key={item.id} value={item.id}>{item.name}</option>)
  })}
  </select>
  {teamChosen && 
  <div>
  <label htmlFor="name"></label>
  <input type="text" name="name" id="name" />
  <label htmlFor="email"></label>
  <input type="email" name="email" id="email" />
  <label htmlFor="phone"></label>
  <input type="number" name="phone" id="phone" />
  </div>
  }
  </div>
  }
  </form>
  </div>
  );
};

export default Add;
