import React, {useState, useRef, useContext, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {ValuesContext} from '../../App';
import {data} from '../../data';
import './Add.css';

const Add = () => {

  const [departmentChosen, setDepartmentChosen] = useState();

  const [teamChosen, setTeamChosen] = useState();

  const {emailRef, nameRef, phoneRef, setAllEmployees, allEmployees} = useContext(ValuesContext);

  const selectedDept = data.employees[0].children.find((item)=>{
      return item.id === parseInt(departmentChosen);
  })

  const navigate = useNavigate();

  let arr = [];

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
    data.employees[0].children.forEach((item)=>{
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

  useEffect(()=>{
    setAllEmployees(data.employees);
  }, [data])

  useEffect(()=>{
    localStorage.setItem("Employees", JSON.stringify(data.employees));
  }, [allEmployees])

  return (
  <div className="singleEmployeeView">
  <form className="employeeDetails">
  <label className="fieldName" htmlFor="department">Department</label>
  <select className="dropdown" id="department" onChange={(e)=>{setDepartmentChosen(e.target.value); setTeamChosen()}}>
  <option value="null">Please select</option>
  <option value="2">HR</option>
  <option value="3">Engineering</option>
  <option value="4">Design</option>
  </select>
  {departmentChosen &&
  <div>
  <label className="fieldName" htmlFor="team">Team</label>
  <select className="dropdown" id="team" onChange={(e)=>{setTeamChosen(e.target.value)}}>
  <option value="null">Please select</option>
  {selectedDept.children.map((item)=>{
    return (<option key={item.id} value={item.id}>{item.name}</option>)
  })}
  </select>
  {teamChosen && 
  <div className="form">
  <label className="fieldName" htmlFor="name">Name</label>
  <input className="inputField" ref={nameRef} required type="text" name="name" id="name" maxLength="12"/><br />
  <label className="fieldName" htmlFor="email">Email</label>
  <input className="inputField" ref={emailRef} required type="email" name="email" id="email" /><br />
  <label className="fieldName" htmlFor="phone">Phone</label>
  <input className="inputField" ref={phoneRef} required type="number" name="phone" id="phone"/>
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
