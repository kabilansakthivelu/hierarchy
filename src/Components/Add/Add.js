import React, {useState, useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import {data} from '../../data';
import './Add.css';

const Add = () => {

  const [departmentChosen, setDepartmentChosen] = useState();

  const [teamChosen, setTeamChosen] = useState();

  const selectedDept = data.employees[0].children.find((item)=>{
      return item.id === parseInt(departmentChosen);
  })

  const nameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();

  const navigate = useNavigate();

  const addMember = (e) =>{
    e.preventDefault();
    const email = emailRef.current.value;
    const phone  = phoneRef.current.value;
    const name = nameRef.current.value;
    if((email !== "") && (phone !== "") && (name !== "")){
    const newMember = {
      "id": new Date().getTime().toString(),
      "name": name,
      "phone": phone,
      "email": email,
      "designation": "Team Member",
    }
    data.employees[0].children.map((item)=>{
      if(item.id !== parseInt(departmentChosen)){
        return item;
      }
      else{
        return item.children.map((team)=>{
          if(team.id !== parseInt(teamChosen)){
            return team;
          }
          else{
            return team.children[0].children.push(newMember);
          }
        })
      }
    })
    navigate("/");
    }    
  }

  return (
  <div className="singleEmployeeView">
  <form className="employeeDetails">
  <label htmlFor="department">Department</label>
  <select id="department" onChange={(e)=>{setDepartmentChosen(e.target.value); setTeamChosen()}}>
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
  <div className="form">
  <label htmlFor="name">Name</label>
  <input ref={nameRef} required type="text" name="name" id="name" maxLength="10"/><br />
  <label htmlFor="email">Email</label>
  <input ref={emailRef} required type="email" name="email" id="email" /><br />
  <label htmlFor="phone">Phone</label>
  <input ref={phoneRef} required type="number" name="phone" id="phone"/>
  </div>
  }
  </div>
  }
  <br />
  <button className="homePageCTABtn" onClick={addMember}>Add a member</button>
  </form>
  </div>
  );
};

export default Add;
